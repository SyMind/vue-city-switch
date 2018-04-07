import CitySwitch from './CitySwitch'
import options from './options'

const plugin = {
  install (Vue, opt) {
    options.extend(opt)
    Vue.component(CitySwitch.name, CitySwitch)
  }
}

export default plugin
