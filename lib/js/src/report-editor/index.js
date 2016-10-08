import { receiver, sender } from '../../lib/hub'
import { API, registerAPI } from '../../lib//api'
import reportConfiguration from '../../lib//api-configuration/report'
import { bind } from 'decko'
import Fa from '../../lib//components/fa'
import { Condition } from '../../lib/models/condition'
import Report  from '../../lib/models/report'

registerAPI(reportConfiguration)

window.ReportEditorRunner = class {
  static run (dom, params) {
    ReactDOM.render(<ReportEditor {...params}/>, dom)
  }
}

@receiver
@sender
class ReportEditor extends React.Component {
  componentWillMount () {
    this.takeInState(this.props)
    this.setState({ condition: Condition.Waiting })
  }

  takeInState (rawParams) {
    let { id: reportId, reportGroupId, name, sections, timing } = new Report(rawParams)
    this.setState({ reportId, reportGroupId, name, sections, timing })
  }

  get isPersisted () {
    return !!this.state.reportId
  }

  get sendTargetAPI () {
    return this.isPersisted
      ? API.updateReport
      : API.createReport
  }

  listen (to) {
    to('updateItems', (items) => this.setState({ items }))
    to('updateTiming', (timing) => this.setState({ timing }))
    to('changeName', (name) => this.setState({ name }))

    to('changeRaw', (...args) => this.changeSpecifySection(...args))
  }

  changeSpecifySection (sectionId, raw) {
    let sections = this.state.sections.map((s) => {
      if (s.sectionId === sectionId) {
        s.raw = raw
      }
      return s
    })

    this.setState({ sections })
  }

  @bind
  changeName (e) {
    this.dispatch('changeName', e.target.value)
  }

  @bind
  submit () {
    this.setState({ condition: Condition.Submitting })

    let { reportId: report_id, reportGroupId: report_group_id, name, items } = this.state
    this.sendTargetAPI({ report_id, report_group_id, name, items })
      .then((params) => {
        this.takeInState(params)
        this.setState({ condition: Condition.Waiting })
      })
      .catch((failure) => {
        console.log('fail', failure)
        this.setState({ condition: Condition.Waiting })
      })
  }

  render () {
    return this.isPersisted
      ? this.fulItemForm
      : this.onlyNameForm
  }

  get submitButton () {
    if (this.state.condition === Condition.Submitting) {
      return <button className="submitting-button" disabled={true}><Fa icon="spinner" animation="pulse"/>Sending...</button>
    }

    return this.state.id
      ? <button className="submit-button" onClick={this.submit}><Fa icon="save"/>Update!</button>
      : <button className="submit-button" onClick={this.submit}><Fa icon="save"/>Create!</button>
  }

  get onlyNameForm () {
    let { name } = this.state

    return <div className="report-editor">
      <section className="form-section">
        <h1 className="form-label">Report name</h1>
        <input type="text" value={name} placeholder="name required." onChange={this.changeName}/>
      </section>
      <section className="submit-section">
        {this.submitButton}
      </section>
    </div>
  }


  get fulItemForm () {
    return <div className="full-report-form">
      {this.onlyNameForm}
      <div className="report-editor">
        {this.state.sections.map(({ name, sectionId, raw, html }) => <ReportSectionEditor {...{ name, sectionId, raw, html }}/>)}
        <section className="submit-section">
          {this.submitButton}
        </section>
      </div>
    </div>
  }
}

@sender
class ReportSectionEditor extends React.Component {
  @bind
  changeRaw (e) {
    this.dispatch('changeRaw', this.props.sectionId, e.target.value)
  }

  render () {
    let { name, raw, html } = this.props
    return <div>
      <h1>{name}</h1>
      <textarea onChange={this.changeRaw}>{raw}</textarea>
      <section>{html}</section>
    </div>
  }
}