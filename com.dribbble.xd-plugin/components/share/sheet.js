const _ = require('../../library/utils')
const Component = require('../../library/component')

module.exports = new Component({
  header: require('../header/header'),
  footer: require('./footer'),
  preview: require('./preview'),

  submitTrigger() {
    let formData = _.serialize(this.refs.shotForm, { hash: true })
    // TODO: implement this!
    console.log(formData)
  },

  styles() {
    return `
      #main {
        display: flex;
        flex-direction: row;
      }

      #left-column {
        flex: 0 0 240px;
      }

      #right-column {
        flex: 1 0 0;
        padding-left: 25px;
      }

      .row {
        display: flex;
        flex-direction: row;
      }

      input[type="checkbox"] {
        margin-right: 10px;
      }

      input[type="checkbox"] + span {
        position: relative;
        top: -2px;
      }

      input[type="text"],
      textarea {
        background-color: #fff;
        border-radius: 2px;
      }

      textarea {
        height: 100px;
      }

      .field-label {
        margin: 0;
        margin-left: 5px;
        margin-bottom: 1px;
        font-size: 12px;
        color: #707070;
      }

      .field-label + input {
        margin-bottom: 10px;
      }
    `
  },

  content() {
    return `
      <div load="header"></div>

      <form id="main" method="dialog" ref="shotForm">
        <div id="left-column">
          <div load="preview" passargs></div>

          <label class="row">
            <input type="checkbox" name="low_profile" value="true" />
            <span>Hide from my profile</span>
          </label>
        </div>

        <div id="right-column">
          <label>
            <span class="field-label">Title</span>
            <input id="title-field" type="text" name="title" placeholder="Title of your shot" value="${this.args.node.name}" />
          </label>

          <label>
            <span class="field-label">Tags</span>
            <input type="text" name="tags" placeholder="adobe-xd" />
          </label>

          <label>
            <span class="field-label">Description</span>
            <textarea name="description" placeholder="Tell us about your process and how you arrived at this design"></textarea>
          </label>
        </div>
      </form>

      <div load="footer" passargs receives="submitTrigger"></div>
    `
  }
})
