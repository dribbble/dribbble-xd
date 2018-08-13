# Dribble Plugin for Adobe XD

# Development

To load the plugin for development, you'll need link it to the path XD requires plugins to exist at.

XD loads plugins from a plugins folder in specific storage location:

- macOS: `~/Library/Application\ Support/Adobe/Adobe\ XD\ CC\ \(Prerelease\)/`
- Windows: `C:\Users\%USERNAME%\AppData\Local\Packages\Adobe.CC.XD.Prerelease_adky2gkssdxte\LocalState\`

Ensure a folder named `plugins` exists at that location. From there you'll want to create a symbolic link from the current directory to that plugins directory:

```bash
ln -s "$(pwd)"/com.dribbble.xd-plugin "YOUR_XD_PLUGINS_PATH"
```
