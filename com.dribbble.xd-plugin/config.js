/**
 * Hey you! These keys are specific to this plugin. Want to build your own?
 * Get started with the Dribbble API here: http://developer.dribbble.com/
 */
const clientKey = "62deac8a106c866b6047c864a24cdab7f0d03b6330e0099bfeda45eac6a1b8b5"
const clientSecret = "cc8419b4279e3f2d75cc8268c1a129027a3d5b7a813f574d5ceca5da6c68f10b"

/**
 * IMPORTANT: at this time production is not ready to
 * interact with this plugin
 */
// const oauthUrl = "https://dribbble.com/oauth"
// const apiUrl = "https://api.dribbble.com/v2/"
const oauthUrl = "http://localhost:3000/oauth"
const apiUrl = "https://api.localhost:3000/v2/"

// Dribbble requires a shot to
// be at least 400x300 pixels
const dimensionReqs = {
  width: 400,
  height: 300
}

const allowedNodeTypes = [
  'Artboard',
  'Rectangle',

  // this isn't a real node type, but we'll
  // use it for creating a string
  'Image',

  // The following cannot be exported because
  // they don't return correct properties
  // like Width and Height
  //
  // 'Group',
  // 'Text',
  // 'Path',
  // 'Ellipse',
  // 'Line',
  // 'Text'
]

module.exports = {
  clientKey,
  clientSecret,
  oauthUrl,
  apiUrl,
  dimensionReqs,
  allowedNodeTypes
}
