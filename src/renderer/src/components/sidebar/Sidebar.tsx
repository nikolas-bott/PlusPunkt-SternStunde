import SidebarItemGroup from './SidebarItemGroup'
import SidebarProfile from './SidebarProfile'
import SidebarSettings from './SidebarSettings'

interface SidebarProps {
  renewComponent?: (component: JSX.Element) => void
}
export default function Sidebar({ renewComponent }: SidebarProps): JSX.Element {
  return (
    <aside>
      <div className="flex flex-col gap-12 rounded-3xl h-[calc(100vh-50px)]  bg-[#15243B] p-4 m-5 shadow-lg transition-all hover:shadow-xl hover:shadow-blue-900/20">
        <div>
          <SidebarProfile></SidebarProfile>
        </div>
        <div className="flex-grow">
          <SidebarItemGroup renewComponent={renewComponent}></SidebarItemGroup>
        </div>
        <div className="-m-4">
          <SidebarSettings></SidebarSettings>
        </div>
      </div>
    </aside>
  )
}
