import Subject from '../subject/Subject'
import Home from '../dashboard-home/Home'
import Calander from '../calander/Calander'
import { useState } from 'react'
import Homework from '../homework/Homework'
import SidebarItem from './SidebarItem'
import { House, GraduationCap, BookMarked, Calendar1 } from 'lucide-react'
import { SidebarTabs } from '../utils/constants'

interface SidebarProps {
  renewComponent?: (component: JSX.Element) => void
}

export default function SidebarItemGroup({ renewComponent }: SidebarProps): JSX.Element {
  const [activeItem, setActiveItem] = useState<string>('Home')

  const handleRenewComponent = (component: JSX.Element, itemName: string): void => {
    if (renewComponent) {
      renewComponent(component)
      setActiveItem(itemName)
    }
  }

  return (
    <div className="flex flex-col gap-4 items-center">
      {SidebarTabs.map((tab) => (
        <SidebarItem
          key={tab.name}
          active={activeItem === tab.name}
          textContent={tab.name}
          icon={<tab.icon />}
          component={<tab.component />}
          renewComponent={(component) => handleRenewComponent(component, tab.name)}
        />
      ))}
    </div>
  )
}
