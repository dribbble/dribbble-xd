const React = require('react')
const shots = require('./shots')
const _ = require('../../library/utils')

module.exports = class Header extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      shot: _.pickRandom(shots)
    }
  }

  render() {
    return (
      <div id="login-header">
        <header className="container" style={{ backgroundColor: this.state.shot.backgroundColor }}>
          <a
            title={`${this.state.shot.title} by ${this.state.shot.user}`}
            href={this.state.shot.url}
            className="shot-image"
            style={{
              backgroundImage: `url('plugin/images/shots/${this.state.shot.filename}')`,
              backgroundSize: 'cover'
            }}
          />

          <div>
            <a className="logo" href={`${_.config.siteUrl}/?utm_source=xd-plugin`}>
              <img src={`plugin/images/dribbble-logo-large-${this.state.shot.logo}.png`} />
            </a>

            <div className={`info ${this.state.shot.theme}`}>
              <h1 style={{ color: this.state.shot.headingColor }}>What are you working on?</h1>
              <p style={{ color: this.state.shot.textColor }}>Dribbble is a community of designers sharing screenshots of their work, process, and projects.</p>
            </div>
          </div>

          <div className="border" />
        </header>

        <div className="spacer" />
      </div>
    )
  }
}
