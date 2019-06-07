import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
    Layout, Menu, Avatar
} from 'antd';


// self
import { theUrl } from 'selfConfig'
import { LogoutButton, PreRoute } from '../public_component/index'
// import List from './components/list'
import PostCommodity from '../public_component/components/postCommodity'
import UserList from './components/user_list'
import CommodityList from './components/commodity_list'
import Activing from './activing'


// ===================================================================================================

// route config
const routes = [
    {
        path: '/activing',
        component: Activing
    },
    {
        path: '/admin',
        component: PostCommodity
    },
    {
        path: '/user',
        component: UserList
    },
    {
        path: '/commodity',
        component: CommodityList
    }
]

// Get image from static source server
const staticAdminUrl = theUrl+'/admin'


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
                    <Avatar src={staticAdminUrl+"/"+auth.username+".jpg"} />
                    <Menu.Item key="1">{auth.username}</Menu.Item>
                    <Menu.Item key="2">{auth.level}</Menu.Item>
                    <Menu.Item key="3"><Link to="/">HomePage</Link></Menu.Item>
                    <Menu.Item key="4"><LogoutButton /></Menu.Item>
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
                        <Menu.Item key="1"><Link to="/root_dashboard/activing">Activing</Link></Menu.Item>
                        <Menu.Item key="2"><Link to="/root_dashboard/admin">Post</Link></Menu.Item>
                        <Menu.Item key="3"><Link to="/root_dashboard/user">User</Link></Menu.Item>
                        <Menu.Item key="4"><Link to="/root_dashboard/commodity">History</Link></Menu.Item>
                    </Menu>
                    </Sider>

                    <Content style={{ padding: "2rem"}}>
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

