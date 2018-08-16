const React = require('react')
const Header = require('./Header.jsx')
const Actions = require('./Actions.jsx')

module.exports = class LoginModal extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Header />
        <Actions dialog={this.props.dialog} />
      </div>
    )
  }
}
