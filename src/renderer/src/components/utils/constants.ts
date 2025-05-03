import { House, GraduationCap, BookMarked, Calendar1 } from 'lucide-react'
import Home from '../dashboard-home/Home'
import Subject from '../subject/Subject'
import Homework from '../homework/Homework'
import Calander from '../calander/Calander'

export const LAYOUT = {
  DEFAULT_DIV: 'h-[calc(100vh-50px)] w-full flex flex-col overflow-y-auto md:overflow-visible',
  HEADING: {
    DEFAULT_DIV: 'p-4 md:p-6 lg:p-8 flex items-center justify-between',
    DEFAULT_H1: 'text-2xl md:text-3xl lg:text-6xl font-bold'
  }
}
export const SidebarTabs = [
  {
    name: 'Home',
    icon: House,
    component: Home
  },
  {
    name: 'Subjects',
    icon: GraduationCap,
    component: Subject
  },
  {
    name: 'Homework',
    icon: BookMarked,
    component: Homework
  },
  {
    name: 'Calander',
    icon: Calendar1,
    component: Calander
  }
]
