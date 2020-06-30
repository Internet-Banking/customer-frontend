import React from 'react'
import {useSelector} from 'react-redux'
import {Table} from 'antd'
import styled from 'styled-components'
import {api} from '../../services'
import moment from 'moment'

const Wrapper = styled.main`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  margin-left: 70px;
  position: absolute;
  z-index: 1000;
`

const AccountListPage = () => {
  const token = useSelector(state => state.user.token)
  const [data, setData] = React.useState([])

  const columns = [
    {
      title: 'Account ID',
      dataIndex: 'id',
      key: 'id',
      align: 'center'
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      key: 'balance'
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type'
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt) => moment(createdAt).format('DD/MM/YYYY HH:mm:ss')
    }
  ]

  React.useEffect(() => {
    const getData = async () => {
      const {data} = await api.get('user/account', undefined, token)
      if (data) {
        setData(data.payload)
      }
    }
    getData()
  }, [token])

  return (
    <Wrapper>
      <Table dataSource={data} pagination={false} columns={columns} />
    </Wrapper>
  )
}

export default AccountListPage
