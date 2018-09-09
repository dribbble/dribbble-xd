const React = require('react')

module.exports = class TokenField extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    // new _.tokenfield({
    //   el: this.refs.field
    // })
  }

  render() {
    return (
      <input ref="field" type="text" {...this.props} />
    )
  }
}
