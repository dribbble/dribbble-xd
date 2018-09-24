const React = require('react')
const _ = require('../../library/utils')
const Tip = require('../common/Tip.jsx')
const TokenField = require('../common/TokenField.jsx')

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

          <label className="checkbox-container">
            <input type="checkbox" name="low_profile" value="true" />
            <span>
              Hide from my default profile
              <Tip position="right" text="Shots that are hidden from your default profile stream are called “Low Profile” shots. These shots are visible via a menu on your profile." />
            </span>
          </label>
        </div>

        <div className="right-column">
          <label className="text-field-container">
            <span>Title</span>
            <input ref="titleField" type="text" name="title" placeholder="Title of your shot" defaultValue={this.props.node.name} onChange={this.props.setTitleState} onKeyPress={this.handleKeyPress.bind(this)} />
          </label>

          <label className="text-field-container">
            <span>
              Tags
              <Tip position="left" text="Comma-separated, maximum 12 tags allowed." />
            </span>
            <TokenField name="tags" placeholder="adobexd, awesome design" onKeyPress={this.handleKeyPress.bind(this)} />
          </label>

          <label className="text-field-container">
            <span>
              Description
              <Tip position="left" text="URLs are automatically hyperlinked. Line breaks and paragraphs are automatically generated. a, em, strong and code HTML tags are accepted." />
            </span>
            <textarea name="description" placeholder="Tell us about your process and how you arrived at this design"></textarea>
          </label>
        </div>
      </form>
    )
  }
}
