import { mixinTakeInParams } from '../utils/take-in-params'
import Section from './section'
import { toCamel } from '../utils/normalize-params'

@mixinTakeInParams
export default class Report {
  constructor (params = {}) {
    let { id, name, reportGroupId, sections } = toCamel(params)
    this.takeInParams({ id, name, reportGroupId })
    this.sections = sections.map((s) => new Section(s))
    console.log(this)
  }
}