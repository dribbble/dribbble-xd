# Dribbble Plugin for Adobe XD

### What you'll need

- [Adobe XD >= 13](https://www.adobe.com/products/xd.html)
- Node >= 6.11
- Yarn >= 1.9

### Setting up
The plugins path is specific to your platform:

- macOS: `~/Library/Application\ Support/Adobe/Adobe\ XD\ CC\ \(Prerelease\)/`
- Windows: `C:\Users\%USERNAME%\AppData\Local\Packages\Adobe.CC.XD.Prerelease_adky2gkssdxte\LocalState\`

Ensure a folder named `develop` exists at that location.

Currently XD will not support symlinking the plugin folder, so for now you'll have to clone the repo to this location. **This can be fixed by migrating to xdpm. PRs welcome.**

### Developing

- Install dependencies with: `yarn install`
- Watch and automatically rebuild with `yarn watch`
- Since you're building the plugin in-place, you can open XD and run it
- `CMD` + `Shift` + `R` to reload the plugin after you've made changes

**Note:** Building the plugin will generate a `main.js` file. Don't modify this file itself.
