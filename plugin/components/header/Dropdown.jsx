const React = require('react')
const _ = require('../../library/utils')

module.exports = class Dropdown extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      active: false
    }
  }

  toggleMenu() {
    this.setState({ active: !this.state.active })
  }

  logout() {
    _.storage.destroy('authToken').then(() => {
      _.storage.destroy('userDetails').then(() => {
        this.props.dialog.close()
      })
    })
  }

  render() {
    return (
      <div id="header-dropdown-container" ref="container">
        <div className={`trigger ${this.state.active ? 'active' : ''}`} onClick={this.toggleMenu.bind(this)}>
          <img className="dots" src={`plugin/images/icon-dots-dark.png`} />
        </div>

        { this.state.active ? (
          <nav id="dropdown-navigation">
            <ul>
              <li><p onClick={this.logout.bind(this)}>Log out</p></li>
              <li><a href={`${_.config.siteUrl}/account`}>Account settings…</a></li>
              <li className="divider"><a href={_.config.helpUrl}>Support…</a></li>
              <li><a href={_.config.siteUrl}>Visit Dribbble…</a></li>
            </ul>
          </nav>
        ) : null }
      </div>
    )
  }
}
