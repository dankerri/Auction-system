import React, { Component } from 'react'
import { theUrl, tokenHeaders } from 'selfConfig'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { 
  Card, Collapse, Comment, Tooltip, List, Button, Avatar, Form, Input, 
  Layout, Menu, Breadcrumb, Icon
} from 'antd'
const TextArea = Input.TextArea
const {
  Header, Content, Footer, Sider
} = Layout
const { SubMenu } = Menu

// monitor data
const data = [
  {
    actions: [<span>Reply to</span>],
    author: 'Han Solo',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    content: (
      <p>We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.</p>
    ),
    datetime: (
      <Tooltip title={moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')}>
        <span>{moment().subtract(1, 'days').fromNow()}</span>
      </Tooltip>
    ),
  },
  {
    actions: [<span>Reply to</span>],
    author: 'Han Solo',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    content: (
      <p>We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.</p>
    ),
    datetime: (
      <Tooltip title={moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}>
        <span>{moment().subtract(2, 'days').fromNow()}</span>
      </Tooltip>
    ),
  },
];
const Editor = ({
  onChange, onSubmit, submitting, value,
}) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        // loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Add Comment
      </Button>
    </Form.Item>
  </div>)


// import component
const Panel = Collapse.Panel;

class App extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.dispatch({type: 'HOME_INIT'})
  }


  handleSubmit = () => {
    if (!this.state.value) {
      return;
    }
  }

  render() {
    const list = this.props.list
    if( !list.loading && list.payload ) {
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
          {list.payload.map((item, index)=> {
              return <Card
              key={item.id}
              hoverable
              style={{ width: 240, marginTop: 50 }}
              cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
              >
              <h1>{item.commodity_name}</h1>
              <h5 style={{ color: '#F22F08'}}>Price: {item.price}</h5>
              <h5>{item.post}</h5>
              <h5 style={{ color: "#0ABDA0" }}>Seller: {item.username}</h5>
              <h2 style={{ color: 'gray'}}>{item.commodity_des}</h2>
              </Card>})
          }
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
const Com = ({payload}) => {
  return (
    payload.map((item)=>{
      return <h1>{item.commodity_name}</h1>
    })
  )
}

const mapStateToProps = state => ({
  list: state.list,
  auth: state.auth
})


export default connect(
  mapStateToProps,
)(App);
