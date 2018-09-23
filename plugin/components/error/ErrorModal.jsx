const React = require('react')
const config = require('../../library/config')
const _ = require('../../library/utils')
const Header = require('../header/Header.jsx')
const CloseFooter = require('../common/CloseFooter.jsx')

const errorMessages = {
  notConnected() {
    return 'Whoops! It looks like you’re not connected to the internet.'
  },
  noSelection() {
    return `You’ll need to first select an ${_.toSentence(config.allowedNodeTypes)} from the Layers panel.`
  },
  multipleSelection() {
    return 'You’ve selected more than one Layer. Please select one and try again.'
  },
  badNodeType() {
    return `Sorry, we can’t currently export a ${this.props.node.constructor.name} layer. Please choose an ${_.toSentence(config.allowedNodeTypes)} from the Layers panel.`
  },
  badSize() {
    return `Your selection is ${this.props.node.width}px × ${this.props.node.height}px. Dribbble requires Shots to be ${config.dimensionReqs.small.width}px × ${config.dimensionReqs.small.height}px or ${config.dimensionReqs.large.width}px × ${config.dimensionReqs.large.height}px.`
  }
}

module.exports = class ErrorModal extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div id="errors">
        <Header dialog={this.props.dialog} type={this.props.type === 'notConnected' ? 'connection' : 'error'} />
        <p className="message">{errorMessages[this.props.type].call(this)}</p>
        <CloseFooter dialog={this.props.dialog} />
      </div>
    )
  }
}
