import {mixinTakeInParams} from '../utils/take-in-params'
import {toSnake} from '../utils/normalize-params'

@mixinTakeInParams
export default class Section {
  constructor ({ id, name, raw, html, section_id: sectionId } = {}) {
    this.takeInParams({ id, name, raw, html, sectionId })
  }
}