const _ = require('../../library/utils')
const Component = require('../../library/component')

module.exports = new Component({
  header: require('../header/header'),
  sheet: require('./sheet'),

  onRender() {
    _.imageBase64FromNode(this.args.node).then((result) => {
      this.args.dialog.setComponent(this.config.sheet, {
        node: this.args.node,
        imageData: result
      })
    })
  },

  styles() {
    return `
      #loading-container {
        position: relative;
        width: 100%;

        /**
         * I don't like this, but you can't modify the height of
         * the modal after it's opened, so we need to set this in
         * preparation for the sheet content
         */
        height: 303px;
      }

      #loading-image {
        width: 32px;
        height: 32px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -16px;
        margin-left: -16px;
      }
    `
  },

  content() {
    return `
      <div load="header"></div>

      <div id="loading-container">
        <img id="loading-image" src="images/processing.gif" />
      </div>
    `
  }
})
