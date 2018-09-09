const React = require('react')
const shots = require('./shots')
const _ = require('../../library/utils')
const uxp = require('uxp')

module.exports = class Header extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      shot: _.pickRandom(shots)
    }
  }

  launchSite() {
    uxp.shell.openExternal('https://dribbble.com/?utm_source=xd-plugin')
  }

  launchShot() {
    uxp.shell.openExternal(this.state.shot.url)
  }

  render() {
    return (
      <div id="login-header">
        <header className="container" style={{ backgroundColor: this.state.shot.backgroundColor }}>
          <a
            title={`${this.state.shot.title} by ${this.state.shot.user}`}
            onClick={this.launchShot.bind(this)}
            className="shot-image"
            style={{
              backgroundImage: `url('plugin/images/shots/${this.state.shot.filename}')`,
              backgroundSize: 'cover'
            }}
          />

          <div className="logo" onClick={this.launchSite}>
            <img src={`plugin/images/dribbble-logo-large-${this.state.shot.logo}.png`} />
          </div>

          <div className={`info ${this.state.shot.theme}`}>
            <h1 style={{ color: this.state.shot.headingColor }}>What are you working on?</h1>
            <p style={{ color: this.state.shot.textColor }}>Dribbble is a community of designers sharing screenshots of their work, process, and projects.</p>
          </div>

          <div className="border" />
        </header>

        <div className="spacer" />
      </div>
    )
  }
}
