import React, {useState, useEffect} from 'react'
import {Modal, Form, Input, message} from 'antd'
import {useSelector, useDispatch} from 'react-redux'
import {LockOutlined} from '@ant-design/icons'
import {changePassword} from './actions'

const ChangePassword = ({isModalVisible, setIsModalVisible}) => {
  const [isLoading, setIsLoading] = useState(false)
  const error = useSelector(state => state.error)
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  
  const onChangePassword = (value) => {
    setIsLoading(true)
    value && dispatch(changePassword(value.currentPassword, value.newPassword, onChageSuccess))
  }

  const onChageSuccess = (msg) => {
    setIsLoading(false)
    message.success(msg)
    setIsModalVisible(false)
    form.resetFields()
  }

  useEffect(() => {
    error && message.error(error) && setIsLoading(false)
  }, [error])

  return (
    <Modal
      title='Change Password'
      visible={isModalVisible}
      confirmLoading={isLoading}
      onCancel={() => setIsModalVisible(false)}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            onChangePassword(values)
          })
          .catch(info => {})
      }}
    >
      <Form form={form}>
        <Form.Item
          name='currentPassword'
          rules={[
            {
              required: true,
              message: 'Please input your current password'
            }
          ]}
        >
          <Input
            prefix={<LockOutlined className='site-form-item-icon' />}
            type='password'
            placeholder='Current Password' />
        </Form.Item>
        <Form.Item
          name='newPassword'
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
          name='retypeNewPassword'
          dependencies={['newPassword']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please retype your new password!'
            },
            ({getFieldValue}) => ({
              validator(rule, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(Error('Passwords do not match'))
              }
            })
          ]}
        >
          <Input
            prefix={<LockOutlined className='site-form-item-icon' />}
            type='password'
            placeholder='Retype new Password' />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ChangePassword
