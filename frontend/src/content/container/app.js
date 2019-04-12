import { theUrl, tokenHeaders } from 'selfConfig'
import CardList from './user/components/cardList'
import { LogoutButton } from './public_component/index'


import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Route } from 'react-router-dom'
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

    const theRoutes = [
      {
        path: '/junk/books',
        component: ()=>(<CardList payload={payload}  category={1}/>)
      },
      {
        path: '/junk/elect',
        component: ()=>(<CardList payload={payload}  category={2}/>)
      },
      {
        path: '/junk/partTime',
        component: ()=>(<CardList payload={payload}  category={3}/>)
      },
      {
        path: '/junk/others',
        component: ()=>(<CardList payload={payload}  category={0}/>)
      }
    ]

    if( !loading ) {
      return(
      <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['0']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="home"><Link to="/">Home</Link></Menu.Item>
          <SubMenu title={<span className="submenu-title-wrapper"><Icon type="shopping" /><Link to="/junk">Junk</Link></span>}>
              <Menu.Item key="setting:1"><Link to="/junk/books">书籍</Link></Menu.Item>
              <Menu.Item key="setting:2"><Link to="/junk/elect">电子产品</Link></Menu.Item>
              <Menu.Item key="setting:3"><Link to="/junk/partTime">外快</Link></Menu.Item>
              <Menu.Item key="setting:4"><Link to="/junk/others">Others</Link></Menu.Item>
          </SubMenu>
          <Menu.Item key="profile"><Link to="/user_profile">Profile</Link></Menu.Item>
          <Menu.Item key="signup"><Link to="/signup">Signup</Link></Menu.Item>
          <Menu.Item key="logout"><LogoutButton /></Menu.Item>

        </Menu>
      </Header>

      <Content style={{ padding: '65px 24px', minHeight: 280, background: '#ECECEC', }}>
        <Route 
        path="/junk" 
        exact={true}
        // if category = 1, show all commodity
        component={()=>(<CardList payload={payload}  category={-1}/>)}/>
        
        {theRoutes.map((route, index)=>{
          return <Route 
            path={route.path} 
            component={route.component} 
            key={index}
            />
        })}
        
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
