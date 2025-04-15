import { LAYOUT } from '../utils/constants'
import CalanderComponent from './CalanderCoponent'
import DefaultHeading from '../shared/DefaultHeading'

export default function Calander(): JSX.Element {
  return (
    <div className={LAYOUT.DEFAULT_DIV}>
      <DefaultHeading title="Calander" />

      <div>
        <CalanderComponent></CalanderComponent>
      </div>
    </div>
  )
}
