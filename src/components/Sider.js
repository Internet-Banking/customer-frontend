import React, {useState} from 'react'
import {Layout, Menu} from 'antd'
import {createFromIconfontCN} from '@ant-design/icons'
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
    <AntdSider style={{minHeight: '100%', float: 'left', marginRight: '20px'}}
      collapsible collapsed={isCollapsed}
      onCollapse={() => setIsCollapsed(!isCollapsed)}>
      <Menu theme='dark' defaultSelectedKeys={['1']} mode='inline'>
        <Menu.Item key='1' icon={<IconFont type='icon-profile'/>}>
          <Link to='/'>Profile</Link>
        </Menu.Item>
        <Menu.Item key='2' icon={<IconFont type='icon-payment'/>}>
          Account List
        </Menu.Item>
        <Menu.Item key='3' icon={<IconFont type='icon-transaction'/>}>
          Transaction
        </Menu.Item>
        <Menu.Item key='4' icon={<IconFont type='icon-receiver'/>}>
          Receiver List
        </Menu.Item>
        <SubMenu key='sub1' icon={<IconFont type='icon-transfer'/>} title='Transfer'>
          <Menu.Item key='5'>Intra Bank</Menu.Item>
          <Menu.Item key='6'>Inter Bank</Menu.Item>
        </SubMenu>
        <SubMenu key='sub2' icon={<IconFont type='icon-Notes'/>} title='Debt Reminder'>
          <Menu.Item key='7'>Create</Menu.Item>
          <Menu.Item key='8'>Dept List</Menu.Item>
        </SubMenu>
      
      </Menu>
    </AntdSider>
  )
}

export default Sider
