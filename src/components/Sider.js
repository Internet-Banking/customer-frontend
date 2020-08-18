import React, {useState} from 'react'
import {Layout, Menu} from 'antd'
import {createFromIconfontCN, UnorderedListOutlined} from '@ant-design/icons'
import {Link} from 'react-router-dom'

const IconFont = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/font_1861342_tzhyny0yr8l.js'
  ]
})

const {SubMenu} = Menu
const {Sider: AntdSider} = Layout

const Sider = () => {
  const [isCollapsed, setIsCollapsed] = useState(true)

  return (
    <AntdSider style={{minHeight: '110%', float: 'left', marginRight: '20px'}}
      collapsible collapsed={isCollapsed}
      onCollapse={() => setIsCollapsed(!isCollapsed)}>
      <Menu theme='dark' defaultSelectedKeys={['1']} mode='inline'>
        <Menu.Item key='1' icon={<IconFont type='icon-profile'/>}>
          <Link to='/profile'>Profile</Link>
        </Menu.Item>
        <Menu.Item key='2' icon={<UnorderedListOutlined />}>
          <Link to='/account'>Account List</Link>
        </Menu.Item>
        <Menu.Item key='4' icon={<IconFont type='icon-receiver'/>}>
          <Link to='/recipient_account'>Recipient Account List</Link>
        </Menu.Item>
        <SubMenu key='sub1' icon={<IconFont type='icon-transfer'/>} title='Transaction'>
          <SubMenu key='sub3' title='Inner Transaction'>
            <Menu.Item key='5'>
              <Link to='/inner_transaction/create'>Create</Link>
            </Menu.Item>
            <Menu.Item key='6'>
              <Link to='/inner_transaction/receiving_history'>Receiving History</Link>
            </Menu.Item>
            <Menu.Item key='7'>
              <Link to='/inner_transaction/sending_history'>Sending History</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key='sub4' title='Outer Transaction'>
            <Menu.Item key='8'>
              <Link to='/outer_transaction/create'>Create</Link>
            </Menu.Item>
            <Menu.Item key='9'>
              <Link to='/outer_transaction/receiving_history'>Receiving History</Link>
            </Menu.Item>
            <Menu.Item key='10'>
              <Link to='/outer_transaction/sending_history'>Sending History</Link>
            </Menu.Item>
          </SubMenu>
        </SubMenu>
        <SubMenu key='sub2' icon={<IconFont type='icon-Notes'/>} title='Debt Reminder'>
          <Menu.Item key='11'>
            <Link to='/debt_reminder/create'>Create Debt Reminder</Link>
          </Menu.Item>
          <Menu.Item key='12'>
            <Link to='/debt_reminder/receiving_history'>Receiving History</Link>
          </Menu.Item>
          <Menu.Item key='13'>
            <Link to='/debt_reminder/sending_history'>Sending History</Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </AntdSider>
  )
}

export default Sider
