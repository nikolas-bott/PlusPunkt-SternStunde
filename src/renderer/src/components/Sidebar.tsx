import { House, GraduationCap, BookMarked, Calendar1 } from 'lucide-react'

export default function Sidebar(): JSX.Element {
  return <SidebarItemGroup></SidebarItemGroup>
}

interface SidebarItemProps {
  active?: boolean
  textContent?: string
  icon?: JSX.Element
}

export function SidebarItem({ active, textContent, icon }: SidebarItemProps): JSX.Element {
  const background = active ? 'bg-[#5FA0C2]' : 'bg-gray-800'
  const iconBackground = active ? 'bg-[#95C7DD]' : 'bg-[#353C52]'
  const finalIcon = icon ? icon : <House></House>

  return (
    <div className={`rounded-3xl ${background} w-5/6 flex items-center justify-items-start p-2`}>
      <div className={`${iconBackground} rounded-4xl p-3`}>
        {finalIcon && <div className="text-white">{finalIcon}</div>}
      </div>
      <div className="text-white text-2xl font-bold pl-4">{textContent}</div>
    </div>
  )
}
export function SidebarItemGroup(): JSX.Element {
  return (
    <div className="flex flex-col gap-2">
      <SidebarItem active={true} textContent="Home" icon={<House></House>}></SidebarItem>
      <SidebarItem
        active={false}
        textContent="Grades"
        icon={<GraduationCap></GraduationCap>}
      ></SidebarItem>
      <SidebarItem
        active={false}
        textContent="Homework"
        icon={<BookMarked></BookMarked>}
      ></SidebarItem>
      <SidebarItem
        active={false}
        textContent="Calander"
        icon={<Calendar1></Calendar1>}
      ></SidebarItem>
    </div>
  )
}

export function SidebarProfile(): JSX.Element {
  return <h1>SidebarItemGroupTitle</h1>
}
export function SidebarSettings(): JSX.Element {
  return <h1>SidebarItemGroupContent</h1>
}
