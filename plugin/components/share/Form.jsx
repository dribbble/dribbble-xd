const React = require('react')
const _ = require('../../library/utils')

module.exports = class Form extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.setTitleState(this.refs.titleField.value)
  }

  handleKeyPress(event) {
    if (event.key == 'Enter') {
      this.props.submitShot()
    }
  }

  render() {
    return (
      <form id="shot-form" ref="shotForm">
        { this.props.selectedAccount ? (
          <input type="hidden" name="team_id" value={this.props.selectedAccount} />
        ) : null }

        <div className="left-column">
          { this.props.preview }
        </div>

        <div className="right-column">
          <label className="text-field-container">
            <span>Title</span>
            <input ref="titleField" type="text" name="title" placeholder="Title of your shot" defaultValue={this.props.node.name} onChange={this.props.setTitleState} onKeyPress={this.handleKeyPress.bind(this)} />
          </label>

          <label className="text-field-container">
            <span>Tags</span>
            <input name="tags" placeholder="adobexd, awesome design" onKeyPress={this.handleKeyPress.bind(this)} />
          </label>

          <label className="text-field-container">
            <span>Description</span>
            <textarea name="description" placeholder="Tell us about your process and how you arrived at this design"></textarea>
          </label>

          <label className="checkbox-container">
            <input type="checkbox" name="low_profile" value="true" />
            <span>Hide from my default profile</span>
          </label>
        </div>
      </form>
    )
  }
}
