const fs = require('uxp').storage.localFileSystem

module.exports = class {
  constructor() {
    this.settingsFileName = 'dribbble-xd-settings.json'
    this.defaultSettings = {
      authToken: null
    }
  }

  access() {
    return new Promise((resolve, reject) => {
      fs.getDataFolder().then((folder) => {
        this.pluginDataFolder = folder

        this.pluginDataFolder.getEntry(this.settingsFileName).then((file) => {
          this.settingsFile = file

          this.settingsFile.read().then((data) => {
            this.settingsData = JSON.parse(data)
            resolve(this)
          }).catch((error) => {
            reject(error)
          })
        }).catch((error) => {
          const notFound = error.toString().includes('not found')

          if (!notFound) {
            reject(error)
          }

          this.pluginDataFolder.createEntry(this.settingsFileName).then((file) => {
            this.settingsFile = file
            this.settingsData = this.defaultSettings

            this.save().then(() => {
              resolve(this)
            })
          })
        })
      }).catch((error) => {
        reject(error)
      })
    })
  }

  get(key, fallback) {
    return this.settingsData[key] || fallback
  }

  set(key, value) {
    return new Promise((resolve, reject) => {

      console.log(this.settingsData)

      console.log(key, value)
      this.settingsData[key] = value

      this.save().then(() => {
        resolve(this)
      }).catch((error) => {
        reject(error)
      })
    })
  }

  save() {
    return new Promise((resolve, reject) => {
      const data = JSON.stringify(this.settingsData, null, 2)

      this.settingsFile.write(data).then(() => {
        resolve(this)
      }).catch((error) => {
        reject(error)
      })
    })
  }
}
