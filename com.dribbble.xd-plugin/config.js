const platformIdentifier = 'adobexd'

// const siteUrl = "https://dribbble.com/oauth"
// const apiUrl = "https://api.dribbble.com/v2/"
const siteUrl = "http://localhost:3000"
const apiUrl = "http://api.localhost:3000/v2"

// Dribbble requires a shot to
// be at least 400x300 pixels
const dimensionReqs = {
  width: 400,
  height: 300
}

const allowedNodeTypes = [
  'Artboard',
  'Rectangle',

  // This isn't a real node type, but we'll
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
  platformIdentifier,
  siteUrl,
  apiUrl,
  dimensionReqs,
  allowedNodeTypes
}
