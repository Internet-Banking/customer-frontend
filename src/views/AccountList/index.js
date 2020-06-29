import React from 'react'
import {Button} from 'antd'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`

const AccountListPage = () => {
  return (
    <Wrapper>
      <Link to='/'>
        <Button type='primary'>Account list page</Button>
      </Link>
    </Wrapper>
  )
}

export default AccountListPage
