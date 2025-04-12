import { House, GraduationCap, BookMarked, Calendar1, Bolt, UserPen, Sun } from 'lucide-react'
import image from '../assets/avatar-1295399_640.png'

export default function Sidebar(): JSX.Element {
  return (
    <aside className="">
      <div className="flex flex-col gap-12 rounded-3xl h-[calc(100vh-50px)] m-5 bg-[#15243B] w-1/5 p-4">
        <div>
          <SidebarProfile></SidebarProfile>
        </div>
        <div className="flex-grow">
          <SidebarItemGroup></SidebarItemGroup>
        </div>
        <div className="-m-4">
          <SidebarSettings></SidebarSettings>
        </div>
      </div>
    </aside>
  )
}

interface SidebarItemProps {
  active?: boolean
  textContent?: string
  icon?: JSX.Element
}

export function SidebarItem({ active, textContent, icon }: SidebarItemProps): JSX.Element {
  const background = active ? 'bg-[#5FA0C2]' : ''
  const iconBackground = active ? 'bg-[#95C7DD]' : 'bg-[#353C52]'
  const finalIcon = icon ? icon : <House></House>

  return (
    <div className={`rounded-3xl ${background} w-[100%] flex items-center justify-items-start p-2`}>
      <div className={`${iconBackground} rounded-4xl p-3`}>
        {finalIcon && <div className="text-white">{finalIcon}</div>}
      </div>
      <div className="text-white text-2xl font-bold pl-4">{textContent}</div>
    </div>
  )
}
export function SidebarItemGroup(): JSX.Element {
  return (
    <div className="flex flex-col gap-2 items-center">
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
  return (
    <div className="flex items-center justify-baseline gap-4">
      <div className="w-[80px]">
        <img src={image} className="rounded-3xl"></img>
      </div>
      <div>
        <p className="text-white text-3xl font-semibold">Jorge Jesús</p>
      </div>
    </div>
  )
}
export function SidebarSettings(): JSX.Element {
  return (
    <div className="bg-[#353C52] h-[150px] rounded-3xl flex gap-2 text-white items-center justify-around pl-4 pr-4">
      <Sun className="w-9 h-9"></Sun>
      <UserPen className="w-9 h-9"></UserPen>
      <Bolt className="w-9 h-9"></Bolt>
    </div>
  )
}
