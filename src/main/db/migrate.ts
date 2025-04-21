import { sqlite } from './client'
import { app } from 'electron'
import path from 'path'
import fs from 'fs'

// Determine the correct path to the migrations folder
const migrationsFolder = path.join(app.getAppPath(), 'drizzle')

// Create migrations tracking table if it doesn't exist
function setupMigrationsTable(): void {
  try {
    sqlite.exec(`
      CREATE TABLE IF NOT EXISTS _migrations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `)

    // Check if existing tables need to be recorded in the migrations table
    // This helps with the first run after implementing migration tracking
    const tables = sqlite
      .prepare(
        "SELECT name FROM sqlite_master WHERE type='table' AND name NOT IN ('_migrations', 'sqlite_sequence')"
      )
      .all()

    if (tables.length > 0 && !isMigrationApplied('0000_goofy_psylocke.sql')) {
      console.log('Found existing tables but no migration record. Recording initial migration...')
      recordMigration('0000_goofy_psylocke.sql')
    }
  } catch (error) {
    console.error('Error setting up migrations table:', error)
    throw error
  }
}

// Check if a migration has already been applied
function isMigrationApplied(migrationName: string): boolean {
  try {
    const result = sqlite
      .prepare('SELECT COUNT(*) as count FROM _migrations WHERE name = ?')
      .get(migrationName)
    return result.count > 0
  } catch (error) {
    // If the _migrations table doesn't exist yet, no migrations have been applied
    return false
  }
}

// Record that a migration has been applied
function recordMigration(migrationName: string): void {
  sqlite.prepare('INSERT INTO _migrations (name) VALUES (?)').run(migrationName)
}

// Execute a SQL statement safely, ignoring specific errors like "table already exists"
function safeExec(sql: string): void {
  try {
    sqlite.exec(sql)
  } catch (error: any) {
    // Ignore "table already exists" errors
    if (error.message && error.message.includes('already exists')) {
      console.log('Ignoring "already exists" error for statement:', sql.substring(0, 50) + '...')
    } else {
      throw error
    }
  }
}

// Run migrations using manual SQL execution
export async function runMigrations(): Promise<void> {
  console.log('Checking for database migrations...')

  // Ensure the migrations folder exists
  if (!fs.existsSync(migrationsFolder)) {
    console.warn(
      `Migrations folder not found at ${migrationsFolder}. Skipping migrations. Ensure the 'drizzle' folder is included in your build output.`
    )
    return // Exit if migrations folder doesn't exist
  }

  try {
    console.log(`Looking for migrations in: ${migrationsFolder}`)

    // Set up the migrations tracking table
    setupMigrationsTable()

    // Get all SQL files from the migrations folder
    const migrationFiles = fs
      .readdirSync(migrationsFolder)
      .filter((file) => file.endsWith('.sql'))
      .sort() // Ensure they're executed in the correct order

    let migrationsApplied = 0

    // Read and execute each migration file
    for (const migrationFile of migrationFiles) {
      // Skip migrations that have already been applied
      if (isMigrationApplied(migrationFile)) {
        console.log(`Migration ${migrationFile} already applied, skipping...`)
        continue
      }

      const filePath = path.join(migrationsFolder, migrationFile)
      console.log(`Applying migration: ${migrationFile}`)

      // Read the SQL file content
      const sqlContent = fs.readFileSync(filePath, 'utf8')

      // Split the content into individual statements
      const statements = sqlContent
        .split(/(--> statement-breakpoint|;)\s*\n/)
        .filter((stmt) => stmt.trim() && !stmt.includes('statement-breakpoint'))
        .map((stmt) => stmt.trim())
        .filter((stmt) => stmt !== ';')
        .map((stmt) => (stmt.endsWith(';') ? stmt : `${stmt};`))

      try {
        // Start a transaction for this migration
        sqlite.exec('BEGIN TRANSACTION;')

        // Execute each statement separately using the raw SQLite instance
        for (const statement of statements) {
          if (statement.trim()) {
            console.log(`Executing SQL statement: ${statement.substring(0, 50)}...`)
            safeExec(statement)
          }
        }

        // Record the migration as applied
        recordMigration(migrationFile)
        migrationsApplied++

        // Commit the transaction
        sqlite.exec('COMMIT;')
      } catch (error) {
        // Rollback the transaction if any statement fails
        sqlite.exec('ROLLBACK;')
        console.error(`Error executing migration ${migrationFile}:`, error)
        throw error
      }
    }

    if (migrationsApplied > 0) {
      console.log(`Applied ${migrationsApplied} new migrations successfully`)
    } else {
      console.log('No new migrations to apply')
    }
  } catch (error) {
    console.error('Migration failed:', error)
    throw new Error(`Migration failed: ${error instanceof Error ? error.message : String(error)}`)
  }
}
