import { Spin } from 'antd'

export default function Loading({ onClose }: { onClose?: () => void }): JSX.Element {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center z-[60] backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div className="p-80" onClick={(e) => e.stopPropagation()}>
        <div className="bg-[#d1b8b8b4] rounded-full p-6 flex">
          <Spin size="large" className="z-20" />
          <div className="text-[#283249] text-2xl font-bold ml-4">Loading</div>
        </div>
      </div>
    </div>
  )
}
