const Component = require('../../library/component')

module.exports = new Component({
  MAX_IMAGE_WIDTH: 220,

  styles() {
    return `
      #preview-container {
        width: 240px;
        margin-bottom: 15px;
        border: 1px solid #E1E1E1;
        border-radius: 4px;
        padding: 10px;
      }

      #preview {
        width: 220px;
        height: ${this.args.node.height * (this.config.MAX_IMAGE_WIDTH / this.args.node.width)}px;
      }
    `
  },

  content() {
    return `
      <div id="preview-container">
        <img id="preview" src="data:image/png;base64,${this.args.imageData}" />
      </div>
    `
  }
})
