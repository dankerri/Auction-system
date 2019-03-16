import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
    Layout, Menu, Avatar
} from 'antd';


// self
import { theUrl } from 'selfConfig'
import { LogoutButton, PreRoute } from '../public_component/index'
import CommodityList from './components/commodity_list'
import Profile from './components/profile'
import postedCommodity from './components/postCommodity'


// ===================================================================================================

// route config
const routes = [
    {
        path: '/profile',
        component: Profile
    },
    {
        path: '/message',
        component: CommodityList
    },
    {
        path: '/postedCommodity',
        component: postedCommodity
    },
    {
        path: '/wantedCommodity',
        component: CommodityList
    }
]

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
                    <Avatar src={staticAdminUrl+"/default.png"} />
                    <Menu.Item key="1">{auth.username}</Menu.Item>
                    <Menu.Item key="2"><Link to="/">HomePage</Link></Menu.Item>
                    <Menu.Item key="3"><LogoutButton /></Menu.Item>
                    </Menu>
                </Header>

                <Layout>
                    <Sider width={200} style={{ background: '#fff' }} >                    
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                    >
                        <Menu.Item key="1"><Link to="/user_profile/profile">Profile</Link></Menu.Item>
                        <Menu.Item key="2"><Link to="/user_profile/message">Message</Link></Menu.Item>
                        <Menu.Item key="3"><Link to="/user_profile/postedCommodity">Posted Commodity</Link></Menu.Item>
                        <Menu.Item key="4"><Link to="/user_profile/wantedCommodity">Wanted Commodity</Link></Menu.Item>
                    </Menu>
                    </Sider>

                    <Content style={{paddingLeft:"20px"}}>
                        {routes.map((route, index) => (
                            <PreRoute 
                                key={index}
                                match={match} 
                                route={route} 
                            />
                        ))}
                    </Content>
                </Layout>
            </Layout>
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(Dashboard);




