import React, {useEffect} from 'react'
import {Switch, Route} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {initApp} from './actions'

import Login from '../views/Login'
import {Layout} from '../components'

const App = () => {
  const token = useSelector(state => state.user.token)

  const dispatch = useDispatch()
  useEffect(() => {
    // Dispatch INIT_APP only once when loading a page
    // to sync token and userInfo
    dispatch(initApp())
  }, [])

  return (
    <div>
      <Switch>
        <Route exact path= '/login' component={Login}/>

        {/* Components were wrapped with layout */}
        <Layout>
          <Route exact path= '/'/>
        </Layout>
      </Switch>
    </div>
  )
}

export default App
