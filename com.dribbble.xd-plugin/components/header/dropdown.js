const Component = require('../../library/component')

module.exports = new Component({
  toggle() {
    console.log("Toggle dropdown")
  },

  styles() {
    return `
      #dropdown-trigger {
        display: block;
        padding: 10px;
        position: absolute;
        top: -2px;
        right: 70px;
      }

      #dropdown-dots {
        width: 22px;
        height: 5.5px;
      }
    `
  },

  content() {
    return `
      <div id="dropdown-trigger" click="toggle">
        <img id="dropdown-dots" src="images/icon-dots-dark.png" />
      </div>
    `
  }
})
