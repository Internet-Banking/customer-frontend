import React, {useEffect} from 'react'
import {Switch, Route, Redirect, withRouter} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {initApp} from './actions'

import Login from '../views/Login'
import {Layout} from '../components'

const App = () => {
  const token = useSelector(state => state.user.token)
  console.log('token before dispatch', token)

  const dispatch = useDispatch()
  useEffect(() => {
    console.log('dispatching')
    dispatch(initApp())
  })
  console.log('token after dispatch', token)

  return (
    <div>
      <Switch>
        <Route exact path= '/login' component={Login}/>

        {/* Components were wrapped with layout */}
        <Layout>
          <Route exact path= '/' component={Login}/>
        </Layout>
      </Switch>
    </div>
  )
}

export default App
