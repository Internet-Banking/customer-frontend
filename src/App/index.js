import React, {useEffect} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {initApp} from './actions'
import {auth} from '../services'
import ErrorPage from '../views/ErrorPage'
import AccountListPage from '../views/AccountList'
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
    <Switch>
      <Route
        exact path= '/'
        render={() => token ? <Redirect to='/profile' /> : <Login/>}/>
      <Layout>
        {/* Components were wrapped with layout */}
        <Route
          path= '/profile'
          render={() => (token ? <Profile/> : <Redirect to='/' />)}/>
        <Route
          path= '/account'
          render={() => (token ? <AccountListPage/> : <Redirect to='/' />)}/>
      </Layout>
      <Route path='/404' component={ErrorPage} />
      <Redirect from='*' to='/404' />
    </Switch>
  )
}

export default App
