import { ElectronAPI } from '@electron-toolkit/preload'

interface ApiInterface {
  getServerPort: () => Promise<number>
  fetchData: (endpoint: string) => Promise<any>
  postData: (endpoint: string, data: any) => Promise<any>
  updateData: (endpoint: string, data: any) => Promise<any>
  deleteData: (endpoint: string) => Promise<any>
  path: {
    join: (...args: string[]) => string
  }
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: ApiInterface
  }
}
