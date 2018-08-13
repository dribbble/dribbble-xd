const uxp = require('uxp')
const Component = require('../../library/component')

module.exports = new Component({
  launchSite() {
    uxp.shell.openExternal('https://dribbble.com/?utm_source=xd-plugin')
  },

  styles() {
    return `
      #large-header-logo { }

      #large-header-logo img {
        width: 150px;
        height: 36.54px;
        margin-top: 9px;
      }
    `
  },

  content() {
    return `
      <div id="large-header-logo" click="launchSite">
        <img src="images/dribbble-logo-large-${this.args.shot().theme}.png" />
      </div>
    `
  }
})
