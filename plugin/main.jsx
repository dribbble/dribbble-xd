/**
 * The XD environment does not provide setTimeout/clearInterval at this time.
 * React uses these, so we need to stub them out for now. Hopefully we can
 * remove them soon.
 */
global.setTimeout = function(fn) { fn() }
global.clearTimeout = function() {}

const React = require('react')
const ReactDOM = require('react-dom')
const Dialog = require('./library/dialog')
const _ = require('./library/utils')
const style = require('./style.scss')

const ErrorModal = require('./components/error/ErrorModal.jsx')
const LoginModal = require('./components/login/LoginModal.jsx')
const ShareModal = require('./components/share/ShareModal.jsx')

const shareCommand = async function(s) {
  const selection = s.itemsIncludingLocked
  const selectedNode = selection[0]

  const dialog = new Dialog()
  dialog.el.style.width = '600px'
  dialog.el.style.backgroundColor = '#f4f4f4'

  const settings = await _.settings.access()
  const authToken = settings.get('authToken')
  const loggedIn = authToken != null

  let Component, props = {}

  if (!document.onLine) {
    Component = ErrorModal
    props = { type: 'notConnected' }
  } else if (!loggedIn) {
    Component = LoginModal
  } else if (!selectedNode) {
    Component = ErrorModal
    props = { type: 'noSelection' }
  } else if (selection.length > 1) {
    Component = ErrorModal
    props = { type: 'multipleSelection' }
  } else if (_.nodeNotAllowed(selectedNode)) {
    Component = ErrorModal
    props = { type: 'badNodeType', node: selectedNode }
  } else if (_.nodeTooSmall(selectedNode)) {
    Component = ErrorModal
    props = { type: 'tooSmall', node: selectedNode }
  } else {
    Component = ShareModal
    props = { node: selectedNode }
  }

  ReactDOM.render(<Component dialog={dialog} {...props} />, dialog.el)

  dialog.open()
}

module.exports = {
  commands: {
    share: shareCommand
  }
}
