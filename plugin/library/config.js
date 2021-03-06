module.exports = {
  platformIdentifier: 'xd',

  apiKey: API_CLIENT_KEY,
  siteUrl: SITE_URL,
  apiUrl: API_URL,
  helpUrl: `https://help.dribbble.com/`,

  dimensionReqs: {
    min: {
      width: 400,
      height: 300
    },
    max: {
      width: 1600,
      height: 1200
    }
  },

  allowedNodeTypes: [
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
}
