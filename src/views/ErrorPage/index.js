import React from 'react'
import {Button, Empty} from 'antd'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`

const ErrorPage = () => {
  return (
    <Wrapper>
      <Empty imageStyle={{height: 200}} description='' />
      <Link to='/'>
        <Button type='primary'>Back to Home Page</Button>
      </Link>
    </Wrapper>
  )
}

export default ErrorPage
