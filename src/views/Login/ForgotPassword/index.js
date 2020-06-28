import React, {useEffect, useState} from 'react'
import {withRouter} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Form, Input, Button, message} from 'antd'
import styled from 'styled-components'
import {LockOutlined, KeyOutlined, MailOutlined} from '@ant-design/icons'
import {sendOtp, changePassword} from './actions'

const Wrapper = styled.div`
  transform: translate(30vw, 30vh);
  width: 60vw;
`

const BtnWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
`

const ForgotPassword = ({history, setIsVisible = () => {}}) => {
  const token = useSelector(state => state.user.token)
  const [isOtpSent, setIsOtpSent] = useState(false)
  const [isOtpValid, setIsOtpValid] = useState(false)
  const [email, setEmail] = useState('')

  const dispatch = useDispatch()
  const onSendOtp = value => {
    value && dispatch(sendOtp(value.email, setIsOtpSent)) && setEmail(value.email)
  }

  const onChangePassword = value => {
    value && dispatch(changePassword(email, value.otp, value.password, setIsOtpValid))
  }

  useEffect(() => {
    token && history.replace('/')
  }, [token])

  useEffect(() => {
    isOtpSent && message.success('OTP was sent')
  }, [isOtpSent])

  useEffect(() => {
    isOtpValid &&
      message.success('Your password is changed successfully, please login again') &&
        setIsVisible(false)
  }, [isOtpValid])

  if (isOtpSent) {
    return (
      <Wrapper>
        <Form className='forgot-form' onFinish={onChangePassword}>
          <Form.Item
            name='password'
            rules={[
              {
                required: true,
                message: 'Please input your new password'
              }
            ]}
          >
            <Input
              prefix={<LockOutlined className='site-form-item-icon' />}
              type='password'
              placeholder='New Password' />
          </Form.Item>
          <Form.Item
            name='otp'
            rules={[
              {
                required: true,
                message: 'Please input your otp'
              }
            ]}
          >
            <Input
              prefix={<KeyOutlined className='site-form-item-icon' />}
              placeholder='OTP'
            />
          </Form.Item>
          <Form.Item style={{display: 'flex', justifyContent: 'space-evenly'}}>
            <BtnWrapper>
              <Button type='primary' htmlType='submit' className='login-form-button'>
                Change password
              </Button>
              <Button type='primary' className='login-form-button'
                onClick={() => setIsOtpSent(false)}>
                Resend OTP
              </Button>
            </BtnWrapper>
          </Form.Item>
        </Form>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <Form className='forgot-form' onFinish={onSendOtp}>
        <Form.Item
          name='email'
          rules={[
            {
              type: 'email',
              message: 'The input is not valid email'
            },
            {
              required: true,
              message: 'Please input your email'
            }
          ]}
        >
          <Input
            prefix={<MailOutlined className='site-form-item-icon' />}
            placeholder='Email' />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit' className='login-form-button'>
            Send OTP
          </Button>
        </Form.Item>
      </Form>
    </Wrapper>
  )
}

export default withRouter(ForgotPassword)
