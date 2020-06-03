import {createStore, applyMiddleware, compose} from 'redux'
import rootReducer from './reducers'
import DevTools from './devTools'
import {phase} from './utils'
import {Phases} from './constants'

const enhancer = compose(
//   // Middleware you want to use in development:
  applyMiddleware(phase(Phases)),
  // Required! Enable Redux DevTools with the monitors you chose
  DevTools.instrument()
)

export default function configureStore(initialState) {
  // Note: only Redux >= 3.1.0 supports passing enhancer as third argument.
  // See https://github.com/reactjs/redux/releases/tag/v3.1.0
  const store = createStore(rootReducer, initialState, enhancer)

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (module.hot) {
    module.hot.accept('./reducers', () =>
      store.replaceReducer(
        require('./reducers') /*.default if you use Babel 6+ */
      )
    )
  }

  return store
}
