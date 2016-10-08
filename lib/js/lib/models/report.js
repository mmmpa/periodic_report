import {mixinTakeInParams} from '../../lib/utils/take-in-params'
import Section from './section'

@mixinTakeInParams
export default class Report {
  constructor({id, name, report_group_id: reportGroupId, timing, report_items, sections} = {}) {
    this.takeInParams({id, name, reportGroupId, timing})
    this.sections = sections.map((s) => new Section(s))
    console.log(this)
  }
}