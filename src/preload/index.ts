import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { join } from 'path'

// Custom APIs for renderer
const api = {
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
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
