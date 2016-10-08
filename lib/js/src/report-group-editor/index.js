import { receiver, sender } from '../../lib/hub'
import { API, registerAPI } from '../../lib//api'
import reportGroupConfiguration from '../../lib//api-configuration/report-group'
import { bind } from 'decko'
import Fa from '../../lib//components/fa'
import { Condition } from '../../lib/models/condition'

registerAPI(reportGroupConfiguration)

window.ReportGroupEditorRunner = class {
  static run (dom, params) {
    ReactDOM.render(<ReportGroupEditor {...params}/>, dom)
  }
}

@receiver
@sender
class ReportGroupEditor extends React.Component {
  componentWillMount () {
    this.takeInState(this.props)
    this.setState({ condition: Condition.Waiting })
  }

  get sendTargetAPI () {
    return this.state.id
      ? API.updateReportGroup
      : API.createReportGroup
  }

  get submitButton () {
    if (this.state.condition === Condition.Submitting) {
      return <button className="submitting-button" disabled={true}><Fa icon="spinner" animation="pulse"/>Sending...</button>
    }

    return this.state.id
      ? <button className="submit-button" onClick={this.submit}><Fa icon="save"/>Update!</button>
      : <button className="submit-button" onClick={this.submit}><Fa icon="save"/>Create!</button>
  }

  takeInState (rawParams) {
    let { id, name, report_items:items, timing } = rawParams
    this.setState({ id, name, items, timing })
  }

  listen (to) {
    to('updateItems', (items) => this.setState({ items }))
    to('updateTiming', (timing) => this.setState({ timing }))
    to('changeName', (name) => this.setState({ name }))
  }

  @bind
  changeName (e) {
    this.dispatch('changeName', e.target.value)
  }

  @bind
  submit () {
    this.setState({ condition: Condition.Submitting })

    let { id, name, items, timing } = this.state
    items = items.filter((i) => !i.del)
    this.sendTargetAPI({ id, name, items, timing })
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
    let { name, items, timing } = this.state
    let { dayOfWeek } = this.props

    return <div className="report-group-editor">
      <div className="column-row">
        <div className="column2">
          <section className="form-section">
            <h1 className="form-label">Report group name</h1>
            <input type="text" value={name} placeholder="name required." onChange={this.changeName}/>
          </section>
          <section className="form-section">
            <h1 className="form-label">When put in a period</h1>
            <TimingSelector {...{ timing, dayOfWeek }}/>
          </section>
        </div>
        <div className="column2">
          <section className="form-section">
            <h1 className="form-label">Sections in a report</h1>
            <ItemList {...{ items }}/>
          </section>
        </div>
      </div>
      <section className="submit-section">
        {this.submitButton}
      </section>
    </div>
  }
}


@sender
class ItemList extends React.Component {
  componentWillMount () {
    this.componentWillReceiveProps(this.props)
  }

  componentWillReceiveProps (props) {
    this.setState({ items: props.items.concat() })
  }

  get items () {
    let { items } = this.state

    if (items.length <= 1) {
      return <ul className="report-item-list">
        <li className="report-item">
          <div className="control">
            <button className="move-button up" disabled={true}><Fa icon="arrow-up"/></button>
            <button className="move-button down" disabled={true}><Fa icon="arrow-down"/></button>
          </div>
          <div className="input">
            <input type="text" className="report-item-name" value="Not display a title on a report has just one section." placeholder="no name" disabled={true}/></div>
        </li>
      </ul>
    }

    return <ul className="report-item-list">
      {items.map(({ id, name, root, del }, index) => {
        return <li className="report-item" key={this.generateKey(id, index)}>
          <div className="control">
            <button className="move-button up" onClick={() => this.itemMove(index, -1)}><Fa icon="arrow-up"/></button>
            <button className="move-button down" onClick={() => this.itemMove(index, +1)}><Fa icon="arrow-down"/></button>
          </div>
          <div className="input">
            <input type="text" className="report-item-name" value={name} placeholder="no name"
                   onChange={(e) => this.changeItem(index, e)}/></div>
          <div className="delete">{this.detectDeleteButton(id, root, del, index)}</div>
        </li>
      })}
    </ul>
  }

  generateKey (id, index) {
    if (id && id !== '') {
      return 'id' + id
    } else {
      return index
    }
  }

  detectDeleteButton (id, root, del, index) {
    if (root) {
      return <span>Required.</span>
    }

    return id
      ? <label><span className="input-input"><input type="checkbox" value={id} checked={del} onChange={(e) => this.toggleItem(index, e)}/></span><span className="input-label">Delete on update</span></label>
      : <span><button className="delete-button" onClick={() => this.deleteItem(index)}><Fa icon="trash"/>Remove</button></span>
  }

  @bind
  inform () {
    this.dispatch('updateItems', this.state.items.concat())
    //this.props.onChange(this.state.items.concat())
  }

  @bind
  changeItem (index, e) {
    let items = this.state.items.concat()
    items[index].name = e.target.value
    console.log(items)
    this.setState({ items }, this.inform)
  }

  @bind
  deleteItem (index) {
    let items = this.state.items.concat()
    items.splice(index, 1)
    this.setState({ items }, this.inform)
  }

  @bind
  addItem () {
    let items = this.state.items.concat()
    items.push({ id: '', name: '' })
    this.setState({ items }, this.inform)
  }

  @bind
  toggleItem (index, e) {
    let items = this.state.items.concat()
    items[index].del = e.target.checked
    this.setState({ items }, this.inform)
  }

  @bind
  itemMove (index, direction) {

  }

  render () {
    return <div className="item-list">
      {this.items}
      <button class="add-button" onClick={this.addItem}>
        <Fa icon="plus-circle"/>
        Add a section
      </button>
    </div>
  }
}

@sender
class TimingSelector extends React.Component {
  componentWillMount () {
    let { timing, dayOfWeek } = this.props

    if (!timing) {
      return this.setState({ timing: dayOfWeek[0], dayNumber: 1 })
    }

    isNaN(+timing)
      ? this.setState({ timing, dayNumber: 1 })
      : this.setState({ timing: 'number', dayNumber: timing })
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
      ? this.dispatch('updateTiming', timing)
      : this.dispatch('updateTiming', dayNumber)
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
      <label className="day-number" key="dayNumber">
        <span className="input-input">
          <input type="radio" value="number" checked={timing === 'number'}
                 onChange={this.changeRadio}/>
        </span>
        <span className="input-label day-number-input">
          <input type="text" value={dayNumber} disabled={timing !== 'number'}
                 onChange={this.changeDayNumber}/> th of every month
        </span>
      </label>
    </div>
  }
}