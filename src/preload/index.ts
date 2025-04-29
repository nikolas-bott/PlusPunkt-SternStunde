import { contextBridge, ipcRenderer } from 'electron'

// Expose a limited API to the renderer process
contextBridge.exposeInMainWorld('api', {
  // Get server port from main process
  getServerPort: async (): Promise<number> => {
    return await ipcRenderer.invoke('get-server-port')
  },

  // Path utilities that can be used in renderer
  path: {
    join: (...args: string[]): string => {
      return join(...args)
    }
  },
  // Direct database access methods
  getAllSubjects: async () => {
    try {
      const response = await ipcRenderer.invoke('get-all-subjects')
      if (!response.success) {
        throw new Error(response.error || 'Failed to fetch subjects')
      }
      return response.data
    } catch (error) {
      console.error('Error fetching subjects:', error)
      throw error
    }
  },

  getAllExams: async () => {
    try {
      const response = await ipcRenderer.invoke('get-all-exams')
      if (!response.success) {
        throw new Error(response.error || 'Failed to fetch exams')
      }
      return response.data
    } catch (error) {
      console.error('Error fetching exams:', error)
      throw error
    }
  },

  getAllHomework: async () => {
    try {
      const response = await ipcRenderer.invoke('get-all-homework')
      if (!response.success) {
        throw new Error(response.error || 'Failed to fetch homework')
      }
      return response.data
    } catch (error) {
      console.error('Error fetching homework:', error)
      throw error
    }
  },

  getAllData: async () => {
    try {
      const response = await ipcRenderer.invoke('get-all-data')
      if (!response.success) {
        throw new Error(response.error || 'Failed to fetch all data')
      }
      return response.data
    } catch (error) {
      console.error('Error fetching all data:', error)
      throw error
    }
  },

  // API request helpers
  fetchData: async (endpoint: string) => {
    try {
      const port = await ipcRenderer.invoke('get-server-port')
      console.log(`Fetching from http://localhost:${port}${endpoint}`)

      const response = await fetch(`http://localhost:${port}${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        mode: 'cors'
      })

      if (!response.ok) {
        const errorText = await response.text().catch(() => 'No error details')
        throw new Error(
          `Request failed with status ${response.status}: ${response.statusText}\n${errorText}`
        )
      }

      return await response.json()
    } catch (error) {
      console.error(`Error fetching data from ${endpoint}:`, error)
      throw error
    }
  },

  postData: async (endpoint: string, data: any) => {
    try {
      const port = await ipcRenderer.invoke('get-server-port')
      console.log(`Posting to http://localhost:${port}${endpoint}`, data)

      const response = await fetch(`http://localhost:${port}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(data),
        mode: 'cors'
      })

      if (!response.ok) {
        const errorText = await response.text().catch(() => 'No error details')
        throw new Error(
          `Request failed with status ${response.status}: ${response.statusText}\n${errorText}`
        )
      }

      return await response.json()
    } catch (error) {
      console.error(`Error posting data to ${endpoint}:`, error)
      throw error
    }
  },

  updateData: async (endpoint: string, data: any) => {
    try {
      const port = await ipcRenderer.invoke('get-server-port')
      console.log(`Updating at http://localhost:${port}${endpoint}`, data)

      const response = await fetch(`http://localhost:${port}${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(data),
        mode: 'cors'
      })

      if (!response.ok) {
        const errorText = await response.text().catch(() => 'No error details')
        throw new Error(
          `Request failed with status ${response.status}: ${response.statusText}\n${errorText}`
        )
      }

      return await response.json()
    } catch (error) {
      console.error(`Error updating data at ${endpoint}:`, error)
      throw error
    }
  },

  deleteData: async (endpoint: string) => {
    try {
      const port = await ipcRenderer.invoke('get-server-port')
      console.log(`Deleting at http://localhost:${port}${endpoint}`)

      const response = await fetch(`http://localhost:${port}${endpoint}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        mode: 'cors'
      })

      if (!response.ok) {
        const errorText = await response.text().catch(() => 'No error details')
        throw new Error(
          `Request failed with status ${response.status}: ${response.statusText}\n${errorText}`
        )
      }

      return await response.json()
    } catch (error) {
      console.error(`Error deleting data at ${endpoint}:`, error)
      throw error
    }
  }
})
