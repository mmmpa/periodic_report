import {mixinTakeInParams} from '../../lib/utils/take-in-params'

@mixinTakeInParams
export default class Section {
  constructor ({ id, name, raw, html, section_id: sectionId } = {}) {
    this.takeInParams({ id, name, raw, html, sectionId })
  }
}