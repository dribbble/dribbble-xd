const _ = require('./library/utils')
const Dialogue = require('./library/dialog')

const shareCommand = async function(selection) {
  const selectedNode = selection.itemsIncludingLocked[0]
  const dialog = new Dialogue()
  let dialogComponent = null
  let argData = {}

  const loggedIn = false

  if (!document.onLine) {
    dialogComponent = 'errors/not-connected'
  } else if (!loggedIn) {
    dialogComponent = 'login/login'
  } else if (!selectedNode) {
    dialogComponent = 'errors/no-selection'
  } else if (selection.itemsIncludingLocked.length > 1) {
    dialogComponent = 'errors/multiple-selection'
  } else if (_.nodeNotAllowed(selectedNode)) {
    dialogComponent = 'errors/bad-node-type'
    argData = { node: selectedNode }
  } else if (_.nodeTooSmall(selectedNode)) {
    dialogComponent = 'errors/too-small'
    argData = { node: selectedNode }
  } else {
    dialogComponent = 'share/loader'
    argData = { node: selectedNode }
  }

  dialog.el.style.width = '600px'
  dialog.el.style.backgroundColor = '#f4f4f4'
  dialog.setComponent(require(`./components/${dialogComponent}`), argData)

  dialog.open()
}

module.exports = {
  commands: {
    share: shareCommand
  }
}
