interface subject {
  name: string
  color: string
}

export default function SubjectBadge({ name, color }: subject): JSX.Element {
  return (
    <div className="flex items-center">
      <div className="rounded-3xl p-2 pl-3 pr-3 mr-2" style={{ backgroundColor: color }}>
        <span className="text-white text-lg font-bold">{name.toUpperCase()}</span>
      </div>
    </div>
  )
}
