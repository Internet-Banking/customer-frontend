import moment from 'moment'
import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {Breadcrumb, Row, Table, Button, message, Tag} from 'antd'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {api} from '../../../services'
import {DeleteOutlined} from '@ant-design/icons'

const Wrapper = styled.div`
  padding: 15px;
`

const ActionWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const SendingHistory = () => {
  const token = useSelector(state => state.user.token)
  const [data, setData] = useState([])

  const deleteDebtReminder = async (id) => {
    const result = await api.delete(`debtReminder/${id}`, undefined, token)
    if (result.isSuccess) {
      message.success('Delete successfully!')
      const newData = data.filter((reminder) => reminder.id !== id)
      setData(newData)
    }
    else {
      message.error(result.error.message)
    }
  }

  const columns = [
    {
      title: 'Debt Reminder ID',
      dataIndex: 'id',
      key: 'id',
      align: 'center'
    },
    {
      title: 'Sending Account ID',
      dataIndex: 'sendingAccountId',
      key: 'sendingAccountId'
    },
    {
      title: 'Receiving Account ID',
      dataIndex: 'receivingAccountId',
      key: 'receivingAccountId'
    },
    {
      title: 'Status',
      dataIndex: 'isSolved',
      key: 'isSolved',
      align: 'center',
      render: (isSolved) => {
        if (isSolved) {
          return (
            <Tag color='green'>
              Already solved
            </Tag>
          )
        }
        else {
          return (
            <Tag color='red'>
              Not solved yet
            </Tag>
          )
        }
      }
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount'
    },
    {
      title: 'Content',
      dataIndex: 'content',
      key: 'content'
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt) => moment(createdAt).format('DD/MM/YYYY HH:mm:ss')
    },
    {
      title: 'Actions',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      // eslint-disable-next-line react/no-multi-comp
      render: (id, row, index) => (
        <ActionWrapper>
          <Button
            type='primary'
            onClick={() => deleteDebtReminder(id)}
            shape='circle'
            icon={<DeleteOutlined />}
            size={10}
          />
        </ActionWrapper>
      )
    }
  ]

  useEffect(() => {
    const getData = async () => {
      const {data} = await api.get('debtReminder/all?isSending=true', undefined, token)
      if (data) {
        setData(data.payload.rows)
      }
    }
    getData()
  }, [token])

  return (
    <Wrapper>
      <Breadcrumb>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Debt Reminder</Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to='/'>Sending History</Link>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Row>
        <Table dataSource={data} pagination={false} columns={columns} />
      </Row>
    </Wrapper>
  )
}

export default SendingHistory
