import { LAYOUT } from '../utils/constants'
import { getDate } from '../utils/helperMethod'

export default function DefaultHeading({ title = 'Heading' }: { title: string }): JSX.Element {
  return (
    <div className={LAYOUT.HEADING.DEFAULT_DIV}>
      <h1 className={LAYOUT.HEADING.DEFAULT_H1}>{title}</h1>
      <div className="bg-primary-dark px-4 py-2 rounded-full">
        <span>{getDate()}</span>
      </div>
    </div>
  )
}
