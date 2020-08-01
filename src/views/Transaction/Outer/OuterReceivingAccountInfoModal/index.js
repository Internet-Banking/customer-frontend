import React from 'react'
import {Modal, Button} from 'antd'

const OuterReceivingAccountInfoModal = ({bank, accountInfo, visible, handleCancel}) => {
  return (
    <Modal
      visible={visible}
      title='Receiving Account Information'
      onCancel={handleCancel}
      footer={[
        <Button type='danger' onClick={handleCancel}>Close</Button>
      ]}
    >
      Bank: <strong>{bank}</strong>
      <br/>
      Account ID: <strong>{accountInfo.receivingAccountId}</strong>
      <br/>
      {accountInfo.name && <> Account owner name: <strong>{accountInfo.name}</strong> </>}
      <br/>
      {accountInfo.email && <> Account owner email: <strong>{accountInfo.email}</strong></>}
      <br/>
      {accountInfo.phone && <> Account owner phone: <strong>{accountInfo.phone}</strong> </>}
      <br/>
    </Modal>
  )
}

export default OuterReceivingAccountInfoModal
