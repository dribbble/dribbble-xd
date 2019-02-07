const React = require('react')

module.exports = class CloseFooter extends React.Component {
  constructor(props) {
    super(props)
  }

  dismissDialog() {
    this.props.dialog.close()
  }

  render() {
    return (
      <footer id="close-footer">
        <div className="spacer"></div>
        <button uxp-variant="cta" onClick={this.dismissDialog.bind(this)}>Okay</button>
      </footer>
    )
  }
}
