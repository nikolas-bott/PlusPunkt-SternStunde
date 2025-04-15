import image from '../../assets/profile-avatar.png'

export default function SidebarProfile(): JSX.Element {
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
