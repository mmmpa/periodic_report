import { bind } from 'decko'

require("codemirror/addon/mode/overlay.js");
require("codemirror/addon/display/placeholder.js");
require("codemirror/mode/xml/xml.js");
require("codemirror/mode/markdown/markdown.js");
require("codemirror/mode/gfm/gfm.js");
require("codemirror/mode/javascript/javascript.js");
require("codemirror/mode/css/css.js");
require("codemirror/mode/htmlmixed/htmlmixed.js");
require("codemirror/mode/clike/clike.js");
require("codemirror/mode/meta.js");

import * as CodeMirror from 'codemirror'
let elementCount = 0

export default class EditorComponent extends React.Component {
  shouldComponentUpdate (p, s) {
    return false;
  }

  componentWillMount () {
    this.setState({
      elementId: `cm-${elementCount += 1}`,
      markdown: this.props.markdown
    })
  }

  componentDidMount () {
    this.cm = CodeMirror.fromTextArea(document.querySelector('#' + this.state.elementId), {
      lineNumbers: true,
      mode: "gfm",
      lineWrapping: true
    });
    this.cm.on('change', (e)=> this.props.onChange(e.doc.getValue()));
    this.cm.setValue(this.state.markdown);
  }

  @bind
  focus () {
    this.cm.focus()
  }

  render () {
    return <div class="cm-wrapper" onClick={this.focus}><textarea id={this.state.elementId} placeholder={this.props.placeholder} value={this.state.markdown}/><div className="cm-line"></div></div>
  }
}