const React = require('react')

module.exports = class Tip extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    // Disabled for now
    return (null)

    return (
      <span className="tool-tip">
        <img src="plugin/images/icon-help-circle.png" />
        <p className={this.props.position}>{this.props.text}</p>
      </span>
    )
  }
}
