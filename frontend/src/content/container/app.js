import { theUrl, tokenHeaders } from 'selfConfig'
import PostCard from './user/components/postCard'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { 
  Card, Collapse, Comment, Tooltip, List, Button, Avatar, Form, Input, 
  Layout, Menu, Breadcrumb, Icon,
  Carousel
} from 'antd'
const TextArea = Input.TextArea
const { Header, Content, Footer, Sider } = Layout



class App extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      loading: true,
      payload: []
    }
  }

  async componentDidMount() {
    const url = 'http://localhost:5000/commodityList';
    const payload = await fetch(url).then( res => res.json() )
    this.setState({
      loading: false,
      payload: payload
    })
  }


  handleSubmit = () => {
    if (!this.state.value) {
      return;
    }
  }

  render() {
    const { loading, payload } = this.state
    if( !loading ) {
      return(
      <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['3']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="1"><Link to="/user_profile">Profile</Link></Menu.Item>
          <Menu.Item key="2"><Link to="/signup">Signup</Link></Menu.Item>
          <Menu.Item key="3"><Link to="/">Home</Link></Menu.Item>

        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Layout style={{ padding: '24px 0', background: '#fff' }}>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%' }}
            >
                <Menu.Item key="1">书籍</Menu.Item>
                <Menu.Item key="2">电子产品</Menu.Item>
                <Menu.Item key="3">外快</Menu.Item>
                <Menu.Item key="4">others</Menu.Item>
            </Menu>
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280, background: '#ECECEC', }}>
            <PostCard payload={payload} username={this.props.auth.username}/>
          </Content> 
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Nangua ©2018 Created by Danker
      </Footer>
      </Layout>)
    } else {
      return(
        <h1>Loading</h1>
      )
    }
  }
  
}



const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps
)(App)
