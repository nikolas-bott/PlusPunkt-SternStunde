import { House } from 'lucide-react'

interface SidebarItemProps {
  active?: boolean
  textContent?: string
  icon?: JSX.Element
  component: JSX.Element
  renewComponent: (component: JSX.Element) => void
}

export default function SidebarItem({
  active,
  textContent,
  icon,
  component,
  renewComponent
}: SidebarItemProps): JSX.Element {
  const background = active ? 'bg-[#5FA0C2]' : 'hover:bg-[#242f47] group-hover:bg-opacity-70'
  const iconBackground = active
    ? 'bg-[#95C7DD]'
    : 'bg-[#353C52] group-hover:bg-[#4a5170] transition-colors duration-300'
  const finalIcon = icon ? icon : <House></House>

  return (
    <div
      className={`rounded-3xl ${background} w-[100%] flex items-center justify-items-start p-2 transition-all cursor-pointer duration-300 transform hover:translate-x-1 group`}
      onClick={(): void => renewComponent(component)}
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
