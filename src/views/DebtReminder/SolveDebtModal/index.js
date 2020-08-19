import React from 'react'
import {Modal, Button, Form, Input, message} from 'antd'
import {api} from '../../../services'

const RecipientAccountModal = ({
  visible, handleSubmit, handleCancel, token
}) => {
  
  const generateOTP = async () => {
    const result = await api.post('user/otp', undefined, token)
    if (result.isSuccess) {
      message.success('OTP digits was send to your email!')
    }
    else {
      message.error(result.error.message)
    }
  }

  return (
    <div>
      <Modal
        visible={visible}
        title='OTP Verification'
        onCancel={handleCancel}
        footer={null}
      >
        <Form onFinish={handleSubmit}>
          <Form.Item
            label='Enter OTP digits: '
            name='otpDigits'
            rules={[
              {
                required: true,
                message: 'Please enter OTP digits!'
              },
              {
                len: 6,
                message: 'OTP must contain 6 digits!'
              }
            ]}
          >
            <Input
              type='number' min={0} max={999999}
              placeholder='OTP digits' />
          </Form.Item>
          <Form.Item>
            <Button type='ghost' onClick={generateOTP}>Generate OTP</Button>&nbsp;&nbsp;
            <Button type='primary' htmlType='submit' >Submit</Button>&nbsp;&nbsp;
            <Button type='danger' onClick={handleCancel}>Close</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default RecipientAccountModal
