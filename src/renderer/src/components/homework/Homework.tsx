import HomeWorkHeader from './HomeworkHeader'
import DefaultHeading from '../shared/DefaultHeading'
import { LAYOUT } from '../utils/constants'

export default function Homework(): JSX.Element {
  return (
    <div className={LAYOUT.DEFAULT_DIV}>
      <DefaultHeading title="Homework" />
      <div className="flex flex-col gap-4 h-full ]">
        <HomeWorkHeader></HomeWorkHeader>
        <div></div>
      </div>
    </div>
  )
}
