const shots = require('./shots')
const _ = require('../../library/utils')
const Component = require('../../library/component')

module.exports = new Component({
  logo: require('./logo'),

  beforeRender() {
    this.shot = _.pickRandom(shots)
  },

  shot() {
    return this.shot
  },

  styles(args) {
    return `
      #login-header-container {
        position: absolute;
        top: 0;
        left: 0;
        background-color: ${this.shot.backgroundColor};
        width: 100%;
        height: 233px;
        padding: 30px 40px 29px 40px;
        border-top: 3px solid #EA4C89;
      }

      #login-header-image {
        position: absolute;
        top: 0;
        right: 0;
        width: 308px;
        height: 230px;
        background-image: url('images/shots/${this.shot.filename}');
        background-size: contain;
      }

      #info {
        width: 300px;
        margin-top: 25px;
      }

      #info.light h1 {
        color: #fff;
      }

      #info.light p {
        color: #fff;
      }

      #info.dark h1 {
        color: #444;
      }

      #info.dark p {
        color: #555555;
      }

      #info h1 {
        font-size: 18px;
        font-weight: 700;
      }

      #info p {
        margin-top: 10px;
        font-size: 15px;
        line-height: 2px;
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
        height: 200px;
        margin-bottom: 30px;
      }
    `
  },

  content() {
    return `
      <header id="login-header-container">
        <div id="login-header-image" title="${this.shot.title} by ${this.shot.user}"></div>
        <div load="logo" receives="shot"></div>

        <div id="info" class="${this.shot.theme}">
          <h1>What are you working on?</h1>
          <p>Dribbble is a community of designers sharing screenshots of their work, process, and projects.</p>
        </div>

        <div id="header-border"></div>
      </header>

      <div id="header-spacer"></div>
    `
  }
})
