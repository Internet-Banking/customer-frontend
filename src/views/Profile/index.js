import React, {useState} from 'react'
import styled from 'styled-components'
import {Breadcrumb, Avatar, Row, Col, Button} from 'antd'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import DefaultAvatar from '../../assets/images/advisor.png'
import ChangePassword from './ChangePassword'

const Wrapper = styled.div`
  padding: 15px;
`

const Profile = () => {
  const user = useSelector(state => state.user.info)
  const [isModalVisible, setIsModalVisible] = useState(false)

  return (
    <Wrapper>
      <ChangePassword isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible}/>
      <Breadcrumb>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to='/'>My profile</Link>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Row>
        <Col span={8} />
        <Col span={9} style={{padding: '10px', border: '2px solid black', borderRadius: '10px'}}>
          <Avatar src={DefaultAvatar} size={156} style={{transform: 'translateX(75%)'}}/>
          <Row style={{marginBottom: '5px', fontSize: '24px'}}>
            {`ID: ${user ? user.id : 'N/A'}`}
          </Row>
          <Row style={{marginBottom: '5px', fontSize: '24px'}}>
            {`Username: ${user ? user.username : 'N/A'}`}
          </Row>
          <Row style={{marginBottom: '5px', fontSize: '24px'}}>
            {`Name: ${user ? user.name : 'N/A'}`}
          </Row>
          <Row style={{marginBottom: '5px', fontSize: '24px'}}>
            {`Email: ${user ? user.email : 'N/A'}`}
          </Row>
          <Row style={{marginBottom: '5px', fontSize: '24px'}}>
            {`Phone: ${user ? user.phone : 'N/A'}`}
          </Row>
          <Button
            type='primary'
            style={{transform: 'translateX(85%)'}}
            onClick={() => setIsModalVisible(true)}>
            Change Password
          </Button>
        </Col>
        <Col span={7}/>
      </Row>
    </Wrapper>
  )
}

export default Profile
