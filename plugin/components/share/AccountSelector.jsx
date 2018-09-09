const React = require('react')
const _ = require('../../library/utils')

module.exports = class AccountSelector extends React.Component {
  constructor(props) {
    super(props)

    const availableAccounts = []

    availableAccounts.push({
      id: this.props.user.id,
      name: this.props.user.name,
      avatar: this.props.user.avatar_url,
      isTeam: false
    })

    this.props.user.teams.forEach((team) => {
      availableAccounts.push({
        id: team.id,
        name: team.name,
        avatar: team.avatar_url,
        isTeam: true
      })
    })

    this.state = {
      selected: availableAccounts[0],
      available: availableAccounts,
      canChange: availableAccounts.length > 1,
      selectorActive: false
    }
  }

  toggleSelector() {
    if (!this.state.canChange) { return }

    this.setState({
      active: !this.state.active
    })
  }

  selectAccount(id) {
    this.setState({
      selected: this.state.available.find(account => account.id === id),
      active: false
    })

    const selectedAccount = (id === this.props.user.id ? null : id)
    this.props.selectedAccountChanged(selectedAccount)
  }

  render() {
    return (
      <div id="account-selector-container">
        <div onClick={this.toggleSelector.bind(this)} className={`current-account-toggle ${this.state.canChange ? 'toggleable' : ''} ${this.state.active ? 'active' : ''}`}>
          <div className="thumb-container">
            <img src={this.state.selected.avatar} alt={this.state.selected.name} />
          </div>
          <p className="name">
            <span className="label">Posting as</span>
            <span className="userName">{this.state.selected.name} &#9662;</span>
          </p>
        </div>

        {this.state.canChange && this.state.active ? (
          <div className={`account-selections`}>
            {this.state.available.map((account) => {
              return (
                <p onClick={this.selectAccount.bind(this, account.id)} key={account.id}>
                  <img src={account.avatar} alt={account.name} />
                  <span>{account.name}</span>
                </p>
              )
            })}
          </div>
        ) : (null)}
      </div>
    )
  }
}
