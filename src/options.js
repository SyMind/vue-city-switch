let options = {}

export default {
  extend(opt) {
    options = Object.assign(options, opt)
  },

  get (key) {
    return options[key]
  }
}
