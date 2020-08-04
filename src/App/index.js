import React, {useEffect} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {initApp} from './actions'
import {auth} from '../services'
import ErrorPage from '../views/ErrorPage'
import AccountListPage from '../views/AccountList'
import RecipientAccountListPage from '../views/RecipientAccountList'
import Login from '../views/Login'
import Profile from '../views/Profile'
import InnerReceivingHistory from '../views/Transaction/Inner/ReceivingHistory'
import InnerSendingHistory from '../views/Transaction/Inner/SendingHistory'
import OuterReceivingHistory from '../views/Transaction/Outer/ReceivingHistory'
import OuterSendingHistory from '../views/Transaction/Outer/SendingHistory'
import {Layout} from '../components'
import InnerTransactionPage from '../views/Transaction/Inner'
import OuterTransactionPage from '../views/Transaction/Outer'

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
        <Route
          path= '/recipient_account'
          render={() => (token ? <RecipientAccountListPage/> : <Redirect to='/' />)}/>
        <Route
          path= '/inner_transaction/create'
          render={() => (token ? <InnerTransactionPage/> : <Redirect to='/' />)}/>
        <Route
          path= '/inner_transaction/receiving_history'
          render={() => (token ? <InnerReceivingHistory/> : <Redirect to='/' />)}/>
        <Route
          path= '/inner_transaction/sending_history'
          render={() => (token ? <InnerSendingHistory/> : <Redirect to='/' />)}/>
        <Route
          path= '/outer_transaction/create'
          render={() => (token ? <OuterTransactionPage/> : <Redirect to='/' />)}/>
        <Route
          path= '/outer_transaction/receiving_history'
          render={() => (token ? <OuterReceivingHistory/> : <Redirect to='/' />)}/>
        <Route
          path= '/outer_transaction/sending_history'
          render={() => (token ? <OuterSendingHistory/> : <Redirect to='/' />)}/>
      </Layout>
      <Route path='/404' component={ErrorPage} />
      <Redirect from='*' to='/404' />
    </Switch>
  )
}

export default App
