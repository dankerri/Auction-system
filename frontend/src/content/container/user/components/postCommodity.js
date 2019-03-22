import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Input, Button } from 'antd'
import { Link,Route } from 'react-router-dom'

import { theUrl , tokenHeaders } from 'selfConfig'
import { PreRoute } from '../../public_component/index'

class  NewPost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            username: this.props.location.state.username,
            payload: []
        }
    }

    async componentDidMount() {
        const url = theUrl + '/userProfile'

        const payload = await fetch(url, {
            headers: tokenHeaders(localStorage.getItem("token")),
            method: 'POST',
            body: JSON.stringify({
            username: this.state.username
            })
        }).then( res => res.json() )
        
        this.setState({
            loading: false,
            payload: payload[0]
        })
    }

    render() {
        const {payload} = this.state
        return(
            <Form>
                <Form.Item label="username">{payload.username}</Form.Item>
                <Form.Item label="phone number">{payload.phone}</Form.Item>
                <Form.Item label="Wechat">
                    <img src={`${theUrl}/user/${payload.username}_wx.jpg`} />
                </Form.Item>
                <Form.Item>
                    <Input placeholder="commodity"/>
                </Form.Item>
                <Form.Item>
                    <Input placeholder="price"/>
                </Form.Item>

                <Form.Item>
                    <Input placeholder="description" />
                </Form.Item>
            </Form>
        )
    }
}

const LivingPostList = () => {
    return (
        <h1>Living Commodity List</h1>
    )
}



const postCommodity = ({match, auth}) => {
    return(
        <div>
            <Link 
                to={{
                    pathname: "/user_profile/postedCommodity/newPost",
                    state: {
                        username: auth.username
                    }
                }}
            >Create New Post</Link>
            <Route 
                path={"/user_profile/postedCommodity/newPost"}
                component={NewPost}
            />
            <LivingPostList />
        </div>
    )
}
const mapStateToProps = state => ({
    auth: state.auth
})
const PostCommodity = connect(mapStateToProps )(postCommodity)

export default PostCommodity