import MissModule from '@/components/ModuleMissing'

export default file => () => {
  return import(/* webpackChunkName: "[request]" */ '@/views/' + file)
    .then(module => {
      return module.default
    })
    .catch(e => {
      return MissModule
    })
}
