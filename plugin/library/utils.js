// === Begin environment setup

/**
 * The XD environment does not provide setTimeout or clearTimeout.
 * React uses these, so we need to stub them out for now.
 */
window.setTimeout = function(fn) { fn() }
window.clearTimeout = function() {}

/**
 * The XD environment does not provide btoa, atob, Blob, or FormData.
 * Polyfill them until they are supported.
 */
const { btoa, atob } = require('Base64')
window.btoa = btoa
window.atob = atob

require('../vendor/blob')
require('../vendor/formdata')

// === End environment setup

const serialize = require('../vendor/serialize')
const storage = require('./storage')
const config = require('./config')
const uxp = require('uxp')
const os = require('os')
const app = require('application')

// What platform are we on?
const platformMac = os.platform() === 'darwin'
const platformWin = os.platform() === 'win10'

/**
 * Check against our internal dimension requirements
 * to see if the selection dimensions are too small
 */
const nodeTooSmall = function(node) {
  return (
    node.width < config.dimensionReqs.min.width ||
    node.height < config.dimensionReqs.min.height
  )
}

/**
 * Check against our internal dimension requirements
 * to see if the selection dimensions are too large
 */
const nodeTooLarge = function(node) {
  return (
    node.width > config.dimensionReqs.max.width ||
    node.height > config.dimensionReqs.max.height
  )
}

/**
 * Check against our internal dimension requirements
 * to see if the selection dimensions are not the accepted ratio
 */
const nodeBadRatio = function(node) {
  const allowedRatio = config.dimensionReqs.min.width / config.dimensionReqs.min.height
  const actualRatio = node.width / node.height
  return allowedRatio !== actualRatio
}

/**
 * Check against our internal list of Node types
 * to ensure we can export the node correctly
 */
const nodeNotAllowed = function(node) {
  return config.allowedNodeTypes.indexOf(node.constructor.name) < 0
}

/**
 * Convert an array of strings in to a sentence
 */
const toSentence = function(array, lastSeparator='or') {
  return array.reduce((prev, curr, i) => {
    return prev + curr + ((i===array.length-2) ? `, ${lastSeparator} ` : ', ')
  }, '').slice(0, -2)
}

/**
 * Generate a random string
 */
const randomString = function() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

/**
 * Pick a random element from an array
 */
const pickRandom = function(array) {
  return array[Math.floor(Math.random() * array.length)]
}

/**
 * Using the XD Plugin API, save a selection node
 * to the local filesystem temporarily, then open
 * and read it, and finally convert it to a base64
 * string and resolve the promise with it
 */
const imageBase64FromNode = async function(node) {
  const tempFolder = await uxp.storage.localFileSystem.getTemporaryFolder()
  const shotFile = await tempFolder.createEntry(`${randomString()}.png`, {
    overwrite: true
  })

  return new Promise(function(resolve, reject) {
    app.createRenditions([{
      node: node,
      outputFile: shotFile,
      type: app.RenditionType.PNG,
      scale: 1
    }]).then(async function(renditions) {
      const buffer = await renditions[0].outputFile.read({
        format: uxp.storage.formats.binary
      })

      let binaryData = ''
      let bytes = new Uint8Array(buffer)
      let byteLength = bytes.byteLength

      for (var i = 0; i < byteLength; i++) {
        binaryData += String.fromCharCode(bytes[i])
      }

      resolve(window.btoa(binaryData))
    }).catch(function(error) {
      reject(error)
    })
  })
}

/**
 * Wrapper for Fetch that will retry X number of times
 */
const retriableFetch = (url, options={}, config={ retries: 5 }) => {
  const retry = function(resolve, reject) {
    config.retries = config.retries - 1
    retriableFetch(url, options, config)
      .then(resolve)
      .catch(reject)
  }

  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();
    req.onload = () => {
      if (req.status === 200) {
        try {
          return resolve(req.response);
        } catch (err) {
          reject(`nope`)
        }
      } else {
        reject(`still nope`)
      }
    }
    req.onerror = reject;
    req.onabort = reject;
    req.open('GET', url, true);
    req.setRequestHeader('Authorization', options.headers.Authorization);
    req.responseType = 'json';
    req.send(options.headers);
  })
}

/**
 * Serialize an object (one level deep) in to URL params
 */
const serializeObject = function(obj) {
  return Object.keys(obj).map((key) => {
    return `${key}=${encodeURIComponent(obj[key])}`
  }).join('&')
}

/**
 * Convert a base64 string in a Blob according to the data and contentType.
 *
 * @param b64Data {String} Pure base64 string without contentType
 * @param contentType {String} the content type of the file i.e (image/jpeg - image/png - text/plain)
 * @param sliceSize {Int} SliceSize to process the byteCharacters
 * @see http://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
 * @return Blob
 */
const b64toBlob = function(b64Data, contentType='', sliceSize=512) {
  const byteCharacters = atob(b64Data)
  const byteArrays = []

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize)

    const byteNumbers = new Array(slice.length)
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }

    const byteArray = new Uint8Array(byteNumbers)
    byteArrays.push(byteArray)
  }

  return new Blob(byteArrays, { type: contentType })
}

const nodeContains = function(node, el) {
  while (el = el.parentNode) {
    if (el === node) return true
  }
  return false
}

module.exports = {
  serialize,
  config,
  platformMac,
  platformWin,
  nodeTooSmall,
  nodeTooLarge,
  nodeBadRatio,
  nodeNotAllowed,
  toSentence,
  randomString,
  pickRandom,
  imageBase64FromNode,
  retriableFetch,
  serializeObject,
  storage,
  b64toBlob,
  nodeContains,
}
