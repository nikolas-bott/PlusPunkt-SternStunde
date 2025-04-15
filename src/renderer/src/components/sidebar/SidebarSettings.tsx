import { Sun, UserPen, Bolt } from 'lucide-react'

export default function SidebarSettings(): JSX.Element {
  return (
    <div className="bg-[#353C52] h-[120px] rounded-3xl flex gap-2 text-white items-center justify-around pl-4 pr-4 transition-all duration-300 hover:bg-[#414863]">
      <Sun className="w-9 h-9 transition-all duration-300 hover:text-yellow-300 hover:rotate-45 transform cursor-pointer"></Sun>
      <UserPen className="w-9 h-9 transition-all duration-300 hover:text-blue-300 hover:scale-110 transform cursor-pointer"></UserPen>
      <Bolt className="w-9 h-9 transition-all duration-300 hover:text-purple-300 hover:-rotate-12 transform cursor-pointer"></Bolt>
    </div>
  )
}
