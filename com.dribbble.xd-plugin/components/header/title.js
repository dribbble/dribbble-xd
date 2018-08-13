const Component = require('../../library/component')

module.exports = new Component({
  styles() {
    return `
      #header-title {
        display: flex;
        flex-direction: row;
        margin-top: 13px;
      }

      #header-title img {
        width: 24px;
        height: 18px;
        flex: 0 0 24px;
        margin-top: 6px;
      }

      #header-title span {
        margin-left: 9px;
        font-size: 24px;
        font-weight: 700;
        color: #444;
      }
    `
  },

  content() {
    return `
      <p id="header-title">
        <img src="images/upload-cloud.png" />
        <span>Share this selection</span>
      </p>
    `
  }
})
