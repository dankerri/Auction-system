import React from 'react'
import { connect } from 'react-redux'
import { Link, Route } from 'react-router-dom'
import {
    Layout, Menu, Avatar
} from 'antd';


// self
import { theUrl } from 'selfConfig'
import { LogoutButton, PreRoute } from '../public_component/index'
import Profile from './components/profile'



// ===================================================================================================

// Get image from static source server
const staticAdminUrl = theUrl+'/user'


// page
// const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const Dashboard  = ({auth, match}) => {
    
    return(
        <div>
            <Layout>
                <Header>

                    <Menu
                        theme="dark"
                        mode="horizontal"
                        style={{ lineHeight: '64px' }}
                    >
                    {/* set default avator , temperatly */}
                    <Menu.Item key="2"><Link to="/">HomePage</Link></Menu.Item>
                    <Avatar src={staticAdminUrl+"/default.png"} />
                    <Menu.Item key="1">{auth.username}</Menu.Item>
                    {/* <Menu.Item key="3"><Link to="/junk">Junk</Link></Menu.Item> */}
                    <Menu.Item key="4"><LogoutButton /></Menu.Item>
                    </Menu>
                </Header>
                    <Content style={{paddingTop:"120px", paddingLeft:"20px"}}>
                        <Profile />
                    </Content>
            </Layout>
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(Dashboard);




