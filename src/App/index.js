import React, {useEffect} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {initApp} from './actions'
import {auth} from '../services'

import Login from '../views/Login'
import Profile from '../views/Profile'
import {Layout} from '../components'

const App = () => {
  const token = useSelector(state => state.user.token) || auth.getToken()

  const dispatch = useDispatch()
  useEffect(() => {
    // Dispatch INIT_APP only once when loading a page
    // to sync token and userInfo
    dispatch(initApp())
  }, [])

  return (
    <div>
      <Switch>
        <Route
          exact path= '/login'
          render={() => (!token ? <Login/> : <Redirect to='/' />)}/>/>

        <Layout>
          {/* Components were wrapped with layout */}
          <Route
            path= '/'
            render={() => (token ? <Profile/> : <Redirect to='/login' />)}/>
        </Layout>
      </Switch>
    </div>
  )
}

export default App
