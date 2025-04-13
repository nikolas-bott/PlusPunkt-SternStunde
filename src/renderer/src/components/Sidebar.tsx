import { House, GraduationCap, BookMarked, Calendar1, Bolt, UserPen, Sun } from 'lucide-react'
import image from '../assets/avatar-1295399_640.png'

export default function Sidebar(): JSX.Element {
  return (
    <aside className="">
      <div className="flex flex-col gap-12 rounded-3xl h-[calc(100vh-50px)] m-5 bg-[#15243B] p-4 shadow-lg transition-all hover:shadow-xl hover:shadow-blue-900/20">
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
  const background = active ? 'bg-[#5FA0C2]' : 'hover:bg-[#242f47] group-hover:bg-opacity-70'
  const iconBackground = active
    ? 'bg-[#95C7DD]'
    : 'bg-[#353C52] group-hover:bg-[#4a5170] transition-colors duration-300'
  const finalIcon = icon ? icon : <House></House>

  return (
    <div
      className={`rounded-3xl ${background} w-[100%] flex items-center justify-items-start p-2 transition-all cursor-pointer duration-300 transform hover:translate-x-1 group`}
    >
      <div className={`${iconBackground} rounded-4xl p-3 transition-all duration-300`}>
        {finalIcon && (
          <div
            className={`text-white ${!active && 'group-hover:text-yellow-200'} transition-colors duration-300`}
          >
            {finalIcon}
          </div>
        )}
      </div>
      <div
        className={`text-white text-2xl font-bold pl-4 transition-all duration-300 ${!active && 'group-hover:text-yellow-200'}`}
      >
        {textContent}
      </div>
    </div>
  )
}
export function SidebarItemGroup(): JSX.Element {
  return (
    <div className="flex flex-col gap-4 items-center">
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
    <div className="flex items-center justify-baseline gap-4 p-2 transition-all duration-300 rounded-xl cursor-pointer hover:bg-[#1e2f4a]">
      <div className="w-[80px] overflow-hidden rounded-3xl transition-transform duration-300 hover:scale-105">
        <img src={image} className="rounded-3xl transform transition-all hover:-rotate-3"></img>
      </div>
      <div>
        <p className="text-white text-3xl font-semibold transition-all duration-300 hover:text-yellow-200">
          Jorge Jesús
        </p>
      </div>
    </div>
  )
}
export function SidebarSettings(): JSX.Element {
  return (
    <div className="bg-[#353C52] h-[120px] rounded-3xl flex gap-2 text-white items-center justify-around pl-4 pr-4 transition-all duration-300 hover:bg-[#414863]">
      <Sun className="w-9 h-9 transition-all duration-300 hover:text-yellow-300 hover:rotate-45 transform cursor-pointer"></Sun>
      <UserPen className="w-9 h-9 transition-all duration-300 hover:text-blue-300 hover:scale-110 transform cursor-pointer"></UserPen>
      <Bolt className="w-9 h-9 transition-all duration-300 hover:text-purple-300 hover:-rotate-12 transform cursor-pointer"></Bolt>
    </div>
  )
}
