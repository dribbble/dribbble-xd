const React = require('react')
const Header = require('../header/Header.jsx')

module.exports = class ShareModal extends React.Component {
  constructor(props) {
    super(props)

    this.onDoneClick = (e) => {
      this.props.dialog.close()
    }
  }

  render() {
    return (
      <div id="share-sheet">
        <Header type="share" />
        <p>Share</p>
        <footer>
          <button type="submit" uxp-variant="cta" onClick={this.onDoneClick}>Done</button>
        </footer>
      </div>
    )
  }
}
