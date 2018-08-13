const uxp = require('uxp')
const Component = require('../../library/component')

module.exports = new Component({
  launchSite() {
    uxp.shell.openExternal('https://dribbble.com/?utm_source=xd-plugin')
  },

  styles() {
    return `
      #header-logo {
        flex: 0 0 78px;
      }

      #header-logo img {
        width: 78px;
        height: 19px;
      }
    `
  },

  content() {
    return `
      <div id="header-logo" click="launchSite">
        <img src="images/dribbble-logo.png" />
      </div>
    `
  }
})
