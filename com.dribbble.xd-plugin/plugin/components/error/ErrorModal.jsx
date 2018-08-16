const React = require('react')

module.exports = class ErrorModal extends React.Component {
  constructor(props) {
    super(props)

    this.onDoneClick = (e) => {
      this.props.dialog.close()
    }
  }

  render() {
    return (
      <div>
        <p>Error</p>
        <footer>
          <button type="submit" uxp-variant="cta" onClick={this.onDoneClick}>Done</button>
        </footer>
      </div>
    )
  }
}
