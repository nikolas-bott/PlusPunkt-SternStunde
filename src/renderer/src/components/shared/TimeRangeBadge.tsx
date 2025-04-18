interface TimeRangeBadgeProps {
  startDate: string
  state: 'neg' | 'pos' | 'neutral'
  fontSize?: string
  padding?: string
}

export default function TimeRangeBadge({
  startDate,
  state,
  fontSize = 'text-sm',
  padding = 'px-2 py-1'
}: TimeRangeBadgeProps): JSX.Element {
  return (
    <span
      className={`${state + '-card'} ${fontSize} ${padding} font-bold ml-2  rounded-full whitespace-nowrap overflow-hidden text-ellipsis`}
      style={{
        maxWidth: '100px'
      }}
      title="Last Month"
    >
      {startDate}
    </span>
  )
}
