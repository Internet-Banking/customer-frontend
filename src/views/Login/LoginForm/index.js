import React, {useEffect, useState} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Form, Input, Button, Checkbox, message} from 'antd'
import {UserOutlined, LockOutlined} from '@ant-design/icons'
import ReCAPTCHA from 'react-google-recaptcha'
import styled from 'styled-components'
import {GOOGLE_RECAPTCHA_CLIENT_KEY} from '../../../constants'
import {submitLogin} from './actions'
import ForgotPassword from '../ForgotPassword'

const Span = styled.span`
  color: #1890ff;
  :hover {
    cursor:pointer;
    color: #40a9ff;
  }
`

const LoginForm = ({history}) => {
  const error = useSelector(state => state.error)
  const token = useSelector(state => state.user.token)
  const [recaptchaToken, setRecaptcha] = useState(null)
  const [isForgotPassword, setIsForgotPassword] = useState(false)

  const dispatch = useDispatch()
  const onFinish = values => {
    dispatch(submitLogin(values, recaptchaToken))
  }
  const onChange = (value) => {
    setRecaptcha(value)
  }

  // Effect when log in successfully
  useEffect(() => {
    token && history.replace('/')
  }, [token])

  useEffect(() => {
    error && message.error(error)
  }, [error, isForgotPassword])

  if (isForgotPassword) {
    return (
      <ForgotPassword
        setIsVisible={setIsForgotPassword}
      />
    )
  }

  return (
    <Form
      name='normal_login'
      className='login-form'
      initialValues={{
        remember: true
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name='username'
        rules={[
          {
            required: true,
            message: 'Please input your Username!'
          }
        ]}
      >
        <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Username' />
      </Form.Item>
      <Form.Item
        name='password'
        rules={[
          {
            required: true,
            message: 'Please input your Password!'
          }
        ]}
      >
        <Input
          prefix={<LockOutlined className='site-form-item-icon' />}
          type='password'
          placeholder='Password'
        />
      </Form.Item>

      <ReCAPTCHA
        style={{marginBottom: '10px'}}
        sitekey={GOOGLE_RECAPTCHA_CLIENT_KEY}
        onChange={onChange}
      />

      <Form.Item>
        <Form.Item name='remember' valuePropName='checked' noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Span style={{margin: '0 10px'}} className='login-form-forgot'
          onClick={() => setIsForgotPassword(true)}>
          Forgot password
        </Span>
      </Form.Item>

      <Form.Item>
        <Button type='primary' htmlType='submit' className='login-form-button'>
          Log in
        </Button>
        <Link style={{margin: '0 20px'}} to='/user/register'>Register now!</Link>
      </Form.Item>
    </Form>
  )
}

export default withRouter(LoginForm)
