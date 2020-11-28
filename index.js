const { Plugin } = require('powercord/entities')

module.exports = class QuickToggleThemes extends Plugin {
  async startPlugin () {
    this._themesEnabled = true
    document.addEventListener('keydown', this.onKeyDownWrapper.bind(this))
  }

  pluginWillUnload () { document.removeEventListener(this.onKeyDownWrapper.bind(this)) }

  onKeyDown (e) {
    if (e.code !== 'F7') return
    powercord.styleManager.themes.forEach(v => v.entityID && powercord.styleManager[this._themesEnabled ? 'disable' : 'enable'](v.entityID))

    let moduleManager = powercord.pluginManager.get('pc-moduleManager')
    if (this._themesEnabled)
      document.querySelector('#powercord-quickcss').remove()
    else moduleManager._loadQuickCSS.bind(moduleManager)()

    this._themesEnabled = !this._themesEnabled
  }

  onKeyDownWrapper (e) { this.onKeyDown(e) }
}
