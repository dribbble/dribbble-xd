const React = require('react')

module.exports = class Dropdown extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div id="header-dropdown-container">
        <div className="trigger">
          <img className="dots" src="plugin/images/icon-dots-dark.png" />
        </div>
      </div>
    )
  }
}
