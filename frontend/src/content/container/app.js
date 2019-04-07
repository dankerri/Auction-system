import { theUrl, tokenHeaders } from 'selfConfig'
import CardList from './user/components/cardList'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
// import moment from 'moment'
import { 
  Input, 
  Layout, Menu, Icon
} from 'antd'
const TextArea = Input.TextArea
const { Header, Content, Footer, Sider } = Layout



class App extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      loading: true,
      payload: [],
    }
  }

  async componentDidMount() {
    const url = theUrl+'/commodityList';
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
    const SubMenu = Menu.SubMenu;
    const MenuItemGroup = Menu.ItemGroup;
    if( !loading ) {
      return(
      <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['home']}
          style={{ lineHeight: '64px' }}
        >
          <SubMenu title={<span className="submenu-title-wrapper"><Icon type="shopping" />Category</span>}>
              <Menu.Item key="setting:1">书籍</Menu.Item>
              <Menu.Item key="setting:2">电子产品</Menu.Item>
              <Menu.Item key="setting:3">外快</Menu.Item>
              <Menu.Item key="setting:4">others</Menu.Item>
          </SubMenu>
          <Menu.Item key="profile"><Link to="/user_profile">Profile</Link></Menu.Item>
          <Menu.Item key="signup"><Link to="/signup">Signup</Link></Menu.Item>
          <Menu.Item key="home"><Link to="/">Home</Link></Menu.Item>

        </Menu>
      </Header>

      <Content style={{ padding: '65px 24px', minHeight: 280, background: '#ECECEC', }}>
        <CardList payload={payload} username={this.props.auth.username}/>
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
