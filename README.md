# Dribbble Plugin for Adobe XD

### What you'll need

- [Currently] API pre-release build #5 or greater of Adobe XD
- To link `com.dribbble.xd-plugin` to the path XD requires plugins to exist at.

### Setting up
The plugins path is specific to your platform:

- macOS: `~/Library/Application\ Support/Adobe/Adobe\ XD\ CC\ \(Prerelease\)/`
- Windows: `C:\Users\%USERNAME%\AppData\Local\Packages\Adobe.CC.XD.Prerelease_adky2gkssdxte\LocalState\`

Ensure a folder named `plugins` exists at that location.

**This does not work yet!**

For now, copy the folder over to your plugins directory manually, work out of it, and copy back your changes. A fix for symbolic links should be coming in the next build end of August.

~From there you'll want to create a symbolic link from the current directory to that plugins directory:~

```bash
ln -s "$(pwd)"/com.dribbble.xd-plugin "YOUR_XD_PLUGINS_PATH"
```

### Developing

- You need Node >=6.11.5 and Yarn
- Install dependencies with: `yarn install`
- Watch and automatically rebuild with `yarn watch`

Building the plugin will generate a `main.js` file. You probably shouldn't manually edit it, but instead make changes inside the `plugin` directory.

---

<img width="641" alt="screen shot 2018-08-15 at 9 53 35 am" src="https://user-images.githubusercontent.com/6392049/44161154-5bff3280-a071-11e8-8e7f-dd323e4dceb7.png">
<img width="624" alt="screen shot 2018-08-15 at 9 53 13 am" src="https://user-images.githubusercontent.com/6392049/44161155-5bff3280-a071-11e8-89b9-289fbb34e6a2.png">
<img width="645" alt="screen shot 2018-08-15 at 9 52 40 am" src="https://user-images.githubusercontent.com/6392049/44161156-5bff3280-a071-11e8-9ee1-7a387d059687.png">
<img width="630" alt="screen shot 2018-08-15 at 9 54 43 am" src="https://user-images.githubusercontent.com/6392049/44161152-5b669c00-a071-11e8-9ec7-18aedb1e896f.png">
<img width="626" alt="screen shot 2018-08-15 at 9 53 57 am" src="https://user-images.githubusercontent.com/6392049/44161153-5bff3280-a071-11e8-825d-81e00c395fea.png">
