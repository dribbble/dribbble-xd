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

To get started, set up an `.env` file with the following keys (fill in the values yourself):

```
SITE_URL=
API_URL=
API_CLIENT_KEY=
DEV_BASIC_AUTH= // optional
```

- Install dependencies with: `yarn install`
- Watch and automatically rebuild with `yarn watch`
- Since you're building the plugin in-place, you can open XD and run it
- `CMD` + `Shift` + `R` to reload the plugin after you've made changes

**Note:** Building the plugin will generate a `main.js` file. Don't modify this file itself.

### Creating releases

This will change in the future but for now just do the following:

- Version bump in `package.json`
- Delete your build folder and run `npm run dist` to get an installable build of the plugin
- [Create a Release](https://github.com/dribbble/dribbble-xd/releases/new)
