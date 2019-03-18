import React, { Component } from  'react'
import { connect } from 'react-redux'
import { Form, Input, Button } from 'antd'
import { Route } from 'react-router-dom'

import { theUrl, tokenHeaders } from 'selfConfig'
import { UploadWeChat } from '../../public_component/index'


class Profile extends Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.state = {
            username: this.props.auth.username,
            loading: true,
            payload: []
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const url = theUrl + '/editUserProfile'
        const { payload, username} = this.state
        const { auth } = this.props

        this.props.form.validateFields((err, values)=> {
            if (!err) {
                fetch(url, {
                    headers: tokenHeaders(localStorage.getItem('token')),
                    method: 'POST',
                    body: JSON.stringify({
                        username: username,
                        neckname: payload.neckname,
                        id: auth.id
                    })
                })
                .then(res=> { return res.json() })
                .then( res => {
                    if(res.edit) {
                        alert("edit success")
                        this.props.dispatch({ type: 'GET_PROFILE_SUCCESS', payload: { 
                            username: res.username,
                            neckname: res.neckname,
                            id: res.id
                        }})
                    } else {
                        alert("edit failded")
                    }
                })
            }
        })
    }

    async componentDidMount() {

        const url = theUrl + '/userProfile'

        const payload = await fetch(url, {
            headers: tokenHeaders(localStorage.getItem("token")),
            method: 'POST',
            body: JSON.stringify({
            username: this.props.auth.username
            })
        }).then( res => res.json() )
        
        this.setState({
            loading: false,
            payload: payload[0]
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form
        const { username, payload, loading } = this.state
            if( !loading ) {
                return (
                    <Form layout="" onSubmit={this.handleSubmit} style={{ width: "300px"}}>
                        <Form.Item>
                            <UploadWeChat
                                username={username}
                            />
                        </Form.Item>
                        
                        <Form.Item label="Username: ">
                            <label> { payload.username } </label>
                        </Form.Item>

                        <Form.Item label="Neck name: ">
                        {getFieldDecorator('neckname', {
                            rules: [{ required: true, message: 'Please input your neckname!' }]
                        })(
                            <Input placeholder={payload.neckname}  />
                        )}
                        </Form.Item>
                        <Form.Item>
                        <Button 
                            type="primary"
                            htmlType="submit"
                            >Update change</Button>
                        </Form.Item>
                    </Form>
                )
            }
            else {
                return <h1>Loading</h1>
            }


    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    list: state.list
})

const theProfile = Form.create({ name: 'normal_login' })(Profile);

export default connect(
    mapStateToProps
)(Form.create({ name:'edit_profile'})(
theProfile))

