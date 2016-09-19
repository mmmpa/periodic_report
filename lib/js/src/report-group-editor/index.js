import { API, registerAPI } from '../../lib//api'
import reportGroupConfiguration from '../../lib//api-configuration/report-group'
import { bind } from 'decko'

registerAPI(reportGroupConfiguration)

window.ReportGroupEditorRunner = class {
  static run (dom, params) {
    ReactDOM.render(<ReportGroupEditor {...params}/>, dom)
  }
}

class ReportGroupEditor extends React.Component {
  componentWillMount () {
    this.takeInState(this.props)
  }

  get sendTargetAPI () {
    return this.state.id
      ? API.updateReportGroup
      : API.createReportGroup
  }

  get submitButton () {
    return this.state.id
      ? <button className="submit-button" onClick={this.submit}>update!</button>
      : <button className="submit-button" onClick={this.submit}>create!</button>
  }

  takeInState (rawParams) {
    let { id, name, report_items:items, timing } = rawParams
    this.setState({ id, name, items, timing })
  }

  @bind
  changeTiming (timing) {
    this.setState({ timing })
  }

  @bind
  changeItems (items) {
    this.setState({ items })
  }

  @bind
  changeName (e) {
    this.setState({ name: e.target.value })
  }

  @bind
  submit () {
    let { id, name, items, timing } = this.state
    items = items.filter((i) => !i.del)
    this.sendTargetAPI({ id, name, items, timing })
      .then((params) => this.takeInState(params))
      .catch((failure) => console.log('fail', failure))
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
            <TimingSelector {...{ timing, dayOfWeek, onChange: this.changeTiming }}/>
          </section>
        </div>
        <div className="column2">
          <section className="form-section">
            <h1 className="form-label">Sections in a report</h1>
            <ItemList {...{ items, onChange: this.changeItems }}/>
          </section>
        </div>
      </div>
      <section className="submit-section">
        {this.submitButton}
      </section>
    </div>
  }
}

class ItemList extends React.Component {
  componentWillMount () {
    this.setState({ items: this.props.items.concat() })
  }

  componentWillReceiveProps (props) {
    this.setState({ items: props.items.concat() })
  }

  get items () {
    let { items } = this.state

    if (items.length <= 1) {
      return <p>not display title on just one item.</p>
    }

    return <ul className="report-item-list">
      {items.map(({ id, name, root, del }, index) => {
        return <li className="report-item" key={this.generateKey(id, index)}>
          <div className="control">
            <button className="move-button" onClick={() => this.itemMove(index, -1)}>up</button>
            <button className="move-button" onClick={() => this.itemMove(index, +1)}>down</button>
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
      return <span>required.</span>
    }

    return id
      ? <label><span className="input-input"><input type="checkbox" value={id} checked={del} onChange={(e) => this.toggleItem(index, e)}/></span><span className="input-label">delete on update</span></label>
      : <span><button className="delete-button" onClick={() => this.deleteItem(index)}>delete</button></span>
  }

  @bind
  inform () {
    this.props.onChange(this.state.items.concat())
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
      <button class="add-button" onClick={this.addItem}>add</button>
    </div>
  }
}

class TimingSelector extends React.Component {
  componentWillMount () {
    let { timing, dayOfWeek } = this.props

    if (!timing) {
      return this.setState({ timing: dayOfWeek[0], dayNumber: 1 })
    }

    console.log()

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