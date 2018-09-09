const React = require('react')
const _ = require('../../library/utils')

module.exports = class Preview extends React.Component {
  constructor(props) {
    super(props)

    this.MAX_IMAGE_WIDTH = 220
  }

  render() {
    return (
      <div id="shot-preview">
        <img
          src={`data:image/png;base64,${this.props.imageData}`}
          style={{ height: (this.MAX_IMAGE_WIDTH * this.props.height) / this.props.width }}
        />
      </div>
    )
  }
}
