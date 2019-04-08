import React from 'react'
import { connect } from 'react-redux'
import { Link, Route } from 'react-router-dom'
import {
    Layout, Menu, Avatar
} from 'antd';


// self
import { theUrl } from 'selfConfig'
import { LogoutButton, PreRoute } from '../public_component/index'
import CommodityList from './components/commodity_list'
import Profile from './components/profile'
import postedCommodity from './components/postCommodity'
import Upload from './components/upload'


// ===================================================================================================

// route config
const routes = [
    {
        path: '/profile',
        component: Profile
    },
    {
        path: '/message',
        component: Upload
    },
    {
        path: '/postedCommodity',
        component: postedCommodity
    },
    // {
    //     path: '/expiredCommodity',
    //     component: CommodityList
    // },
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
                    <Sider 
                    breakpoint="lg"
                    collapsedWidth="0" 
                    width={200} style={{ background: '#fff' }} >                    
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                    >
                        <Menu.Item key="1"><Link to="/user_profile/postedCommodity">Posted Commodity</Link></Menu.Item>
                        <Menu.Item key="2"><Link to="/user_profile/profile">Profile</Link></Menu.Item>
                        <Menu.Item key="3"><Link to="/user_profile/message">Message</Link></Menu.Item>
                        {/* <Menu.Item key="4"><Link to="/user_profile/expiredCommodity">Expired Commodity</Link></Menu.Item> */}
                        <Menu.Item key="5"><Link to="/user_profile/wantedCommodity">Wanted Commodity</Link></Menu.Item>
                    </Menu>
                    </Sider>

                    <Content style={{paddingTop:"120px", paddingLeft:"20px"}}>
                        <Route exact={true} path="/user_profile/" component={postedCommodity} />
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




