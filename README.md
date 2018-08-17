# Dribbble Plugin for Adobe XD

### What you'll need

- [Currently] API pre-release build #5 or greater of Adobe XD
- Node >=6.11.5
- Yarn

### Setting up
The plugins path is specific to your platform:

- macOS: `~/Library/Application\ Support/Adobe/Adobe\ XD\ CC\ \(Prerelease\)/`
- Windows: `C:\Users\%USERNAME%\AppData\Local\Packages\Adobe.CC.XD.Prerelease_adky2gkssdxte\LocalState\`

Ensure a folder named `plugins` exists at that location.

Currently XD will not support symlinking the plugin folder, so for now you'll have to clone the repo to this location. After cloning, rename the folder to `com.dribbble.xd-plugin`.

### Developing

- Install dependencies with: `yarn install`
- Watch and automatically rebuild with `yarn watch`
- Since you're building the plugin in-place, you can open XD and run it
- `CMD` + `Shift` + `R` to reload the plugin after you've made changes

**Note:** Building the plugin will generate a `main.js` file. You probably shouldn't manually edit it, but instead make changes inside the `plugin` directory.

---

<img width="641" alt="screen shot 2018-08-15 at 9 53 35 am" src="https://user-images.githubusercontent.com/6392049/44161154-5bff3280-a071-11e8-8e7f-dd323e4dceb7.png">
<img width="624" alt="screen shot 2018-08-15 at 9 53 13 am" src="https://user-images.githubusercontent.com/6392049/44161155-5bff3280-a071-11e8-89b9-289fbb34e6a2.png">
<img width="645" alt="screen shot 2018-08-15 at 9 52 40 am" src="https://user-images.githubusercontent.com/6392049/44161156-5bff3280-a071-11e8-9ee1-7a387d059687.png">
<img width="630" alt="screen shot 2018-08-15 at 9 54 43 am" src="https://user-images.githubusercontent.com/6392049/44161152-5b669c00-a071-11e8-9ec7-18aedb1e896f.png">
<img width="626" alt="screen shot 2018-08-15 at 9 53 57 am" src="https://user-images.githubusercontent.com/6392049/44161153-5bff3280-a071-11e8-825d-81e00c395fea.png">
