const React = require('react')
const _ = require('../../library/utils')
const TokenField = require('../common/TokenField.jsx')

module.exports = class Form extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.setTitleState(this.refs.titleField.value)
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
            <span>Hide from my default profile</span>
          </label>
        </div>

        <div className="right-column">
          <label className="text-field-container">
            <span>Title</span>
            <input ref="titleField" type="text" name="title" placeholder="Title of your shot" defaultValue={this.props.node.name} onChange={this.props.setTitleState} />
          </label>

          <label className="text-field-container">
            <span>
              Tags
            </span>
            <TokenField name="tags" placeholder="adobexd" />
          </label>

          <label className="text-field-container">
            <span>Description</span>
            <textarea name="description" placeholder="Tell us about your process and how you arrived at this design"></textarea>
          </label>
        </div>
      </form>
    )
  }
}
