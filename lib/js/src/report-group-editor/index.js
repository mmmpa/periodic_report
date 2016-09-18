import API from '../../lib//api'
import { bind } from 'decko'

window.ReportGroupEditorRunner = class {
  static run (dom, params) {
    ReactDOM.render(<ReportGroupEditor {...params}/>, dom)
  }
}

class ReportGroupEditor extends React.Component {
  componentWillMount () {
    this.setState({
      name: '',
      timing: '',
      items: []
    })
  }

  @bind
  changeTiming (timing) {
    console.log(timing)
    this.setState({ timing })
  }

  render () {
    let { dayOfWeek } = this.props

    return <div className="report-group-editor">
      <section className="form-section">
        <h1 className="form-label">Report group name</h1>
      </section>
      <section className="form-section">
        <h1 className="form-label">Timing to put in a period</h1>
        <TimingSelector {...{ dayOfWeek, onChange: this.changeTiming }}/>
      </section>
      <section className="form-section">
        <h1 className="form-label">Items in a report</h1>
      </section>
    </div>
  }
}

class TimingSelector extends React.Component {
  componentWillMount () {
    this.setState({
      timing: '',
      dayNumber: 10
    })
  }

  get days () {
    let { timing } = this.state

    return this.props.dayOfWeek.map((day) => {
      return <label key={day}>
        <span className="input-input"><input type="radio" value={day} checked={timing === day} onChange={this.changeRadio}/></span>
        <span className="input-label">{day}</span>
      </label>
    })
  }

  @bind
  inform () {
    let { timing, dayNumber } = this.state
    this.props.dayOfWeek.indexOf(timing) >= 0
      ? this.props.onChange(timing)
      : this.props.onChange(dayNumber)
  }

  @bind
  changeRadio (e) {
    this.setState({ timing: e.target.value }, this.inform)
  }

  @bind
  changeDayNumber (e) {
    let { dayNumber } = this.state
    let nextDayNumber = +e.target.value

    isNaN(nextDayNumber)
      ? this.setState({ dayNumber })
      : this.setState({ dayNumber: nextDayNumber }, this.inform)
  }

  render () {
    let { timing, dayNumber } = this.state

    return <div className="timing-selector">
      {this.days}
      <label key="dayNumber">
        <span className="input-input">
          <input type="radio" value="number" checked={timing === 'number'}
                 onChange={this.changeRadio}/>
        </span>
        <span className="input-label">
          <input type="text" value={dayNumber} disabled={timing !== 'number'}
                 onChange={this.changeDayNumber}/>日
        </span>
      </label>
    </div>
  }
}