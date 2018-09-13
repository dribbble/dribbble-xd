const pckg = require('./package.json')
const fs = require('fs')
const archiver = require('archiver')

const output = fs.createWriteStream(`${__dirname}/${pckg.name}.${pckg.version}.xdx`)
const archive = archiver('zip', {
  zlib: { level: 9 }
})

output.on('close', function() {
  console.log(archive.pointer() + ' total bytes')
})

archive.on('warning', function(error) {
  if (error.code === 'ENOENT') {
    console.log('WARNING', error)
  } else {
    throw error
  }
})

archive.on('error', function(error) {
  throw error
})

archive.pipe(output)

archive.append(fs.createReadStream(__dirname + '/manifest.json'))
archive.append(fs.createReadStream(__dirname + '/main.js'))
archive.directory('plugin/images/*/**')

archive.finalize()
