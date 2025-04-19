import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { startServer } from './server'
import { runMigrations } from './db/migrate'
import { setupIpcHandlers } from './ipc-handlers'
import fs from 'fs'
import path from 'path'

// Keep a global reference of the server port
let serverPort: number

function createWindow(): BrowserWindow {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: true,
      allowRunningInsecureContent: false
    }
  })

  mainWindow.webContents.openDevTools()

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  return mainWindow
}

// This method will be called when Electron has finished initialization
async function initializeApp(): Promise<void> {
  try {
    // Set app user model id for windows
    electronApp.setAppUserModelId('com.electron')

    // Run database migrations
    console.log('Running database migrations...')
    await runMigrations()
    console.log('Database migrations completed')

    // Start the express server
    console.log('Starting the Express server...')
    serverPort = await startServer()
    console.log(`Express server started on port ${serverPort}`)

    // Set up IPC handlers
    setupIpcHandlers()

    // Create the main window after server is ready
    const mainWindow = createWindow()

    // Expose the server port to renderer
    ipcMain.handle('get-server-port', () => serverPort)

    app.on('activate', function () {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
  } catch (error) {
    console.error('Failed to initialize application:', error)
    dialog.showErrorBox(
      'Application Error',
      `Failed to start the application. Error: ${error instanceof Error ? error.message : String(error)}`
    )
    app.quit()
  }
}

// This flag will be set to true to force recreate the database on next run
// Set this to true when you change your schema structure
const RESET_DATABASE = false

app.whenReady().then(async () => {
  // Reset database if needed (useful when schema changes)
  if (RESET_DATABASE) {
    try {
      const dbPath = path.join(app.getPath('userData'), 'app.db')
      if (fs.existsSync(dbPath)) {
        console.log('Resetting database...')
        fs.unlinkSync(dbPath)
        console.log('Database reset successfully')
      }
    } catch (error) {
      console.error('Error resetting database:', error)
    }
  }

  // Default open or close DevTools by F12 in development
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  await initializeApp()
})

// Quit when all windows are closed, except on macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
