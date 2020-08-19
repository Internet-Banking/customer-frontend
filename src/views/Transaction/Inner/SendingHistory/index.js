import moment from 'moment'
import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {Breadcrumb, Row, Table, Tag} from 'antd'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {api} from '../../../../services'

const Wrapper = styled.div`
  padding: 15px;
`

const SendingHistory = () => {
  const token = useSelector(state => state.user.token)
  const [data, setData] = useState([])

  const columns = [
    {
      title: 'Transaction ID',
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
      title: 'Fee Payer',
      dataIndex: 'feePayer',
      key: 'feePayer',
      align: 'center',
      render: (feePayer) => {
        if (feePayer === 'SENDER') {
          return (
            <Tag color='green'>
              SENDER
            </Tag>
          )
        }
        else {
          return (
            <Tag color='blue'>
              RECEIVER
            </Tag>
          )
        }
      }
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt) => moment(createdAt).format('DD/MM/YYYY HH:mm:ss')
    }
  ]

  useEffect(() => {
    const getData = async () => {
      const {data} = await api.get('transaction/inner?isSending=true', undefined, token)
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
        <Breadcrumb.Item>Inner Transaction</Breadcrumb.Item>
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
