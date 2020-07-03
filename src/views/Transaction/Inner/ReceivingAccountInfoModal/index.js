import React from 'react'
import {Modal, Button} from 'antd'

const ReceivingAccountInfoModal = ({accountInfo, visible, handleCancel}) => {
  return (
    <Modal
      visible={visible}
      title='Receiving Account Information'
      onCancel={handleCancel}
      footer={[
        <Button type='danger' onClick={handleCancel}>Close</Button>
      ]}
    >
      Account ID: <strong>{accountInfo.id}</strong>
      <br/>
      Account owner name: <strong>{accountInfo['user.name']}</strong>
      <br/>
      Account owner email: <strong>{accountInfo['user.email']}</strong>
      <br/>
      Account owner phone: <strong>{accountInfo['user.phone']}</strong>
      <br/>
    </Modal>
  )
}

export default ReceivingAccountInfoModal
