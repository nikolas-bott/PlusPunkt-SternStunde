import { ElectronAPI } from '@electron-toolkit/preload'

// Import interfaces from data service
interface Subject {
  id: number
  name: string
  abbreviation: string
  room: string
  category: string
  color: string
  teacherName: string | null
  teacherEmail: string | null
}

interface Exam {
  id: number
  title: string
  date: number
  type: string
  status: 'open' | 'done'
  grade: number | null
  subjectId: number
}

interface Homework {
  id: number
  title: string
  description: string
  dueDate: number
  status: 'open' | 'done'
  subjectId: number
}

interface AllData {
  subjects: Subject[]
  exams: Exam[]
  homework: Homework[]
}

interface ApiInterface {
  getServerPort: () => Promise<number>
  getAllSubjects: () => Promise<Subject[]>
  getAllExams: () => Promise<Exam[]>
  getAllHomework: () => Promise<Homework[]>
  getAllData: () => Promise<AllData>
  getSubjectById: (id: number) => Promise<Subject | null>
  getExamById: (id: number) => Promise<Exam | null>
  getExamsBySubjectId: (subjectId: number) => Promise<Exam[]>
  getHomeworkBySubjectId: (subjectId: number) => Promise<Homework[]>
  getHomeworkById: (id: number) => Promise<Homework | null>
  fetchData: (endpoint: string) => Promise<any>
  postData: (endpoint: string, data: any) => Promise<any>
  updateData: (endpoint: string, data: any) => Promise<any>
  deleteData: (endpoint: string) => Promise<any>
  path: {
    join: (...args: string[]) => string
  }
}
// get-exams-by-subject-id

interface IpcResponse<T> {
  success: boolean
  error?: string
  data: T
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: ApiInterface
  }
}
