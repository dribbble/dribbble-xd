const React = require('react')
const _ = require('../../library/utils')
const Header = require('../header/Header.jsx')

module.exports = class ShareModal extends React.Component {
  constructor(props) {
    super(props)

    this.MAX_IMAGE_WIDTH = 220

    this.state = {
      loading: true,
      imageData: null
    }
  }

  componentDidMount() {
    _.imageBase64FromNode(this.props.node).then((result) => {
      this.setState({
        loading: false,
        imageData: result
      })

      this.forceUpdate()
    })
  }

  dismissDialog() {
    this.props.dialog.close()
  }

  submitShot() {
    let formData = _.serialize(this.refs.shotForm, { hash: true })
    // TODO: implement this!
    console.log(formData)
  }

  render() {
    return (
      <div id="share-sheet">
        <Header type="share" />

        { this.state.loading ? (
          <div className="loading-container">
            <img className="loading-image" src="plugin/images/processing.gif" />
          </div>
        ) : (
          <div>
            <form method="dialog" ref="shotForm">
              <div className="left-column">
                <div className="preview">
                  <img src={`data:image/png;base64,${this.state.imageData}`} style={{ height: this.props.node.height * (this.MAX_IMAGE_WIDTH / this.props.node.width) }} />
                </div>

                <label className="row">
                  <input type="checkbox" name="low_profile" value="true" />
                  <span>Hide from my profile</span>
                </label>
              </div>

              <div className="right-column">
                <label>
                  <span className="field-label">Title</span>
                  <input type="text" name="title" placeholder="Title of your shot" value={this.props.node.name} />
                </label>

                <label>
                  <span className="field-label">Tags</span>
                  <input type="text" name="tags" placeholder="adobe-xd" />
                </label>

                <label>
                  <span className="field-label">Description</span>
                  <textarea name="description" placeholder="Tell us about your process and how you arrived at this design"></textarea>
                </label>
              </div>
            </form>

            <footer>
              <div className="spacer"></div>
              <button onClick={this.dismissDialog.bind(this)}>Cancel</button>
              <button onClick={this.submitShot.bind(this)} uxp-variant="cta">Share to Dribbble</button>
            </footer>
          </div>
        ) }
      </div>
    )
  }
}
