import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import DevTools from './devTools'
import * as serviceWorker from './serviceWorker'
import configureStore from './store'

// import css here
import 'antd/dist/antd.css' // from antd
import './index.css'

// import views here
import Layout from './components/Layout'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    {/* <TodoApp /> */}
    <Layout/>
    <DevTools/>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
