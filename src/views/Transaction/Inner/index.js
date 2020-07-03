import React from 'react'
import {useSelector} from 'react-redux'
import {Button, Form, Input, Select, message, Radio, Checkbox} from 'antd'
import styled from 'styled-components'
import {api} from '../../../services'
import keyMirror from 'key-mirror'
import ReceivingAccountInfoModal from './ReceivingAccountInfoModal'

const Wrapper = styled.div`
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`

const FormFooter = styled.div`
  margin-left: 300px;
`

const SELECT_REC_ACC_MODE = keyMirror({
  FROM_LIST: null,
  NEW: null
})

const InnerTransactionPage = () => {
  const token = useSelector(state => state.user.token)
  const [amount, setAmount] = React.useState(0)
  const [accountList, setAccountList] = React.useState(null)
  const [recAccList, setRecAccList] = React.useState(null)
  const [selectRecAccMode, setSelectRecAccMode] = React.useState(SELECT_REC_ACC_MODE.FROM_LIST)
  const [receivingAccountId, setReceivingAccountId] = React.useState(null)
  const [receivingAccountInfo, setReceivingAccountInfo] = React.useState(null)
  const [modalVisibility, setModalVisibility] = React.useState(false)
  const [doesSaveNewRecAcc, setDoesSaveNewRecAcc] = React.useState(true)

  React.useEffect(() => {
    const getData = async () => {
      const resultGetAccList = await api.get('user/account', undefined, token)
      if (resultGetAccList.isSuccess) {
        setAccountList(resultGetAccList.data.payload)
      }
      const resultGetRecAccList = await api.get('user/recipient_account', undefined, token)
      if (resultGetRecAccList.isSuccess) {
        setRecAccList(resultGetRecAccList.data.payload)
      }
    }
    getData()
  }, [token, setAccountList])

  const generateOTP = async () => {
    const result = await api.post('user/otp', undefined, token)
    if (result.isSuccess) {
      message.success('OTP digits was send to your email!')
    }
    else {
      message.error(result.error.message)
    }
  }

  const handleSubmit = async (values) => {
    const result = await api.post('transaction/inner', values, token)
    if (result.isSuccess) {
      message.success('Transaction was made successfully!')
      if (selectRecAccMode === SELECT_REC_ACC_MODE.NEW && doesSaveNewRecAcc === true) {
        // eslint-disable-next-line max-len
        const resultCreateRecipientAcc = await api.post('user/recipient_account', {accountId: receivingAccountId}, token)
        if (resultCreateRecipientAcc.isSuccess) {
          message.success('This account was saved!')
        }
        else {
          message.error(resultCreateRecipientAcc.error.message)
        }
      }
    }
    else {
      message.error(result.error.message)
    }
  }

  const onRadioChange = (e) => {
    setSelectRecAccMode(e.target.value)
  }
  
  const onRecAccInputChange = (e) => {
    setReceivingAccountId(selectRecAccMode === SELECT_REC_ACC_MODE.FROM_LIST ? e : e.target.value)
  }

  const onCheckBoxChange = (e) => {
    setDoesSaveNewRecAcc(e.target.checked)
  }

  const onRecAccButtonClick = async () => {
    if (receivingAccountId) {
      // eslint-disable-next-line max-len
      const result = await api.get(`account/${receivingAccountId}/include-user-info`, undefined, token)
      if (result.isSuccess) {
        setReceivingAccountInfo(result.data.payload)
        setModalVisibility(true)
      }
      else {
        message.error(result.error.message)
      }
    }
    else {
      message.error('Please enter receiving account ID!')
    }
  }

  const cancelModal = () => {
    setModalVisibility(false)
  }

  return (
    <Wrapper>
      <Form
        labelCol={{span: 5}}
        wrapperCol={{span: 8}}
        onFinish={handleSubmit}>
        <h1>User information</h1>
        <br />
        <Form.Item
          label='Select payment account ID: '
          name='sendingAccountId'
          rules={[
            {
              required: true,
              message: 'Please select sending account ID!'
            }
          ]}
        ><Select>
            {accountList
              ? accountList
                .filter((account) => account.type === 'PAYMENT')
                .map((account, index) => {
                  return <Select.Option key={index} value={account.id}>{account.id}</Select.Option>
                }) : null}
          </Select>
        </Form.Item>
        <h1>
          Receiver information&nbsp;&nbsp;&nbsp;
          <Radio.Group onChange={onRadioChange} value={selectRecAccMode}>
            <Radio value={SELECT_REC_ACC_MODE.FROM_LIST}>Choose from recipient account list</Radio>
            <Radio value={SELECT_REC_ACC_MODE.NEW}>Enter new account ID</Radio>
          </Radio.Group>
          <Button type='primary' onClick={onRecAccButtonClick}>
            Get receiving account information
          </Button>
        </h1>
        <br />
        {selectRecAccMode === SELECT_REC_ACC_MODE.FROM_LIST
          ? <Form.Item
            label={'Select reveiver\'s account ID: '}
            name='receivingAccountId'
            rules={[
              {
                required: true,
                message: 'Please select receiving account ID!'
              }
            ]}
          >
            <Select onChange={onRecAccInputChange} placeholder='Receiving account ID'>
              {recAccList
                ? recAccList.map((recAcc, index) => {
                  return (
                    <Select.Option key={index} value={recAcc.accountId}>
                      {recAcc.accountId}
                    </Select.Option>
                  )
                }) : null}
            </Select>
          </Form.Item>
          : <Form.Item
            label={'Enter reveiver\'s account ID: '}
            name='receivingAccountId'
            rules={[
              {
                required: true,
                message: 'Please enter receiving account ID!'
              }
            ]}>
            <Input
              type='number'
              onChange={onRecAccInputChange}
              placeholder='Receiving account ID'
            />
          </Form.Item>
        }
        {selectRecAccMode === SELECT_REC_ACC_MODE.NEW
          ? <Form.Item label='Save this account for next transaction: '>
            <Checkbox checked={doesSaveNewRecAcc} onChange={onCheckBoxChange} />
          </Form.Item>
          : null}
        <h1>Transaction information</h1>
        <br />
        <Form.Item
          label={'Enter transaction amount: '}
          name='amount'
          rules={[
            {
              required: true,
              message: 'Please enter the amount of transaction!'
            }
          ]}
        >
          <Input
            type='number'
            step={1000}
            placeholder='Transaction amount'
            onChange={(e) => {
              setAmount(e.target.value)
            }}
          />
        </Form.Item>
        <Form.Item label='Interpretation'>
          <strong>{amount.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</strong> VND
        </Form.Item>
        <Form.Item
          label={'Enter transaction content: '}
          name='content'
          rules={[
            {
              required: true,
              message: 'Please enter the content of transaction!'
            }
          ]}
        >
          <Input placeholder='Transaction content' />
        </Form.Item>
        
        <Form.Item
          label='Select transaction fee payer: '
          name='feePayer'
          rules={[
            {
              required: true,
              message: 'Please select transaction fee payer!'
            }
          ]}
        >
          <Select>
            <Select.Option value='SENDER'>Sender</Select.Option>
            <Select.Option value='RECEIVER'>Receiver</Select.Option>
          </Select>
        </Form.Item>
        <h1>
          OTP Verification&nbsp;&nbsp;&nbsp;
          <Button type='primary' onClick={generateOTP}>Generate OTP</Button>
        </h1>
        <br />
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
          <FormFooter>
            <Button type='primary' htmlType='submit' >Submit</Button>&nbsp;&nbsp;
          </FormFooter>
        </Form.Item>
      </Form>
      {receivingAccountInfo
        ? <ReceivingAccountInfoModal
          visible={modalVisibility}
          accountInfo={receivingAccountInfo}
          handleCancel={cancelModal}
        />
        : null}
    </Wrapper>
  )
}

export default InnerTransactionPage
