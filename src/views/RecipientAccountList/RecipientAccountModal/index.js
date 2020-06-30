import React from 'react'
import {Modal, Button, Form, Input} from 'antd'
import {CreditCardOutlined, UserAddOutlined} from '@ant-design/icons'

const RecipientAccountModal = ({
  visible, handleSubmit, handleCancel, modalMode
}) => {
  return (
    <div>
      <Modal
        visible={visible}
        title={modalMode === 'CREATE' ? 'Create recipient account' : 'Update recipient account'}
        onCancel={handleCancel}
        footer={null}
      >
        <Form onFinish={handleSubmit}>
          <Form.Item
            name='accountId'
            rules={[
              {
                required: true,
                message: 'Please input account ID!'
              }
            ]}
          >
            <Input
              prefix={<CreditCardOutlined className='site-form-item-icon' />}
              placeholder='Account ID'
            />
          </Form.Item>
          <Form.Item name='nickname'>
            <Input
              prefix={<UserAddOutlined className='site-form-item-icon' />}
              placeholder='Nickname'
            />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit' >Submit</Button>&nbsp;&nbsp;
            <Button type='danger' onClick={handleCancel}>Close</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default RecipientAccountModal
