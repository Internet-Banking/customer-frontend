import React from 'react'
import styled from 'styled-components'
import Header from './Header'
import Sider from './Sider'
import 'antd/dist/antd.css' // from antd

const Wrapper = styled.section`
  height: 100vh;
`

const Layout = ({children}) => {
  return (
    <Wrapper>
      <Header/>
      <Sider/>
      {children}
    </Wrapper>
  )
}

export default Layout
