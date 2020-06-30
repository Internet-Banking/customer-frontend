import React from 'react'
import {useSelector} from 'react-redux'
import {Table, Button, message} from 'antd'
import {DeleteOutlined, EditOutlined, PlusOutlined} from '@ant-design/icons'
import styled from 'styled-components'
import {api} from '../../services'
import keyMirror from 'key-mirror'
import RecipientAccountModal from './RecipientAccountModal'

const MODAL_MODE = keyMirror({
  CREATE: null,
  EDIT: null
})

const Wrapper = styled.main`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  margin-left: 70px;
  position: absolute;
  z-index: 1000;
`

const RecipientAccountListPage = () => {
  const token = useSelector(state => state.user.token)
  const [data, setData] = React.useState([])
  const [visible, setVisible] = React.useState(false)
  const [modalMode, setModalMode] = React.useState(MODAL_MODE.CREATE)
  const [updateRecAccIndex, setUpdateRecAccIndex] = React.useState(null)

  React.useEffect(() => {
    const getData = async () => {
      const {data} = await api.get('user/recipient_account', undefined, token)
      if (data) {
        setData(data.payload)
      }
    }
    getData()
  }, [token])

  const deleteRecipientAccount = async (id) => {
    const result = await api.delete(`user/recipient_account/${id}`, undefined, token)
    if (result.isSuccess) {
      message.success('Delete successfully!')
      const newData = data.filter((employee) => employee.id !== id)
      setData(newData)
    }
    else {
      message.error(result.error.message)
    }
  }

  const openCreateModal = () => {
    setModalMode(MODAL_MODE.CREATE)
    setVisible(true)
  }
  
  const openUpdateModal = (index) => {
    setUpdateRecAccIndex(index)
    setModalMode(MODAL_MODE.UPDATE)
    setVisible(true)
  }

  const closeModal = () => {
    setVisible(false)
  }

  const submitModal = async (values) => {
    if (modalMode === MODAL_MODE.CREATE) {
      const result = await api.post('user/recipient_account', values, token)
      if (result.isSuccess) {
        message.success('Create recipient account successfully!')
        const newData = data.concat([result.data.payload])
        setData(newData)
      }
      else {
        message.error(result.error.message)
      }
    }
    else {
      // eslint-disable-next-line max-len
      const result = await api.put(`user/recipient_account/${data[updateRecAccIndex].id}`, values, token)
      if (result.isSuccess) {
        message.success('Update recipient account successfully!')
        const newData = data.map((employee, index) => {
          if (index === updateRecAccIndex) {
            return result.data.payload
          }
          return employee
        })
        setData(newData)
      }
      else {
        message.error(result.error.message)
      }
    }
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      align: 'center'
    },
    {
      title: 'Account ID',
      dataIndex: 'accountId',
      key: 'accountId',
      align: 'center'
    },
    {
      title: 'Nickname',
      dataIndex: 'nickname',
      key: 'nickname'
    },
    {
      title: 'Actions',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      // eslint-disable-next-line react/no-multi-comp
      render: (id, row, index) => (
        <div>
          <Button
            type='primary'
            onClick={() => deleteRecipientAccount(id)}
            shape='circle'
            icon={<DeleteOutlined />}
            size={10}
          />&nbsp;&nbsp;
          <Button
            type='primary'
            onClick={() => openUpdateModal(index)}
            shape='circle'
            icon={<EditOutlined />}
            size={10}
          />
        </div>
      )
    }
  ]

  return (
    <Wrapper><br/>
      <Button onClick={() => openCreateModal()} icon={<PlusOutlined />} type='primary'>
        Create recipient account
      </Button>
      <br/>
      <Table dataSource={data} pagination={false} columns={columns} />
      <RecipientAccountModal
        visible={visible}
        handleCancel={closeModal}
        handleSubmit={submitModal}
        modalMode={modalMode}
      />
    </Wrapper>
  )
}

export default RecipientAccountListPage
