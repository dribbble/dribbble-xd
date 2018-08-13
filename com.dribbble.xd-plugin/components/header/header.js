const Component = require('../../library/component')

module.exports = new Component({
  logo: require('./logo'),
  dropdown: require('./dropdown'),
  title: require('./title'),

  styles() {
    return `
      #dialog-header {
        position: absolute;
        top: 0;
        left: 0;
        background-color: #fff;
        width: 100%;
        padding: 25px 40px 23px 40px;
        border-top: 3px solid #EA4C89;
      }

      #header-top {
        display: flex;
        flex-direction: row;
      }

      #header-logo-container { }

      #header-util-container {
        flex: 1 0 0;
        text-align: right;
      }

      #header-border {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 1px;
        background-color: #E5E5E5;
      }

      #header-spacer {
        height: 80px;
        margin-bottom: 30px;
      }
    `
  },

  content() {
    return `
      <header id="dialog-header">
        <div id="header-top">
          <div id="header-logo-container">
            <div load="logo"></div>
          </div>

          <div id="header-util-container">
            <div load="dropdown"></div>
          </div>
        </div>

        <div load="title"></div>

        <div id="header-border"></div>
      </header>

      <div id="header-spacer"></div>
    `
  }
})
