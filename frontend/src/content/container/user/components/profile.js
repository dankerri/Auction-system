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
    }

    handleSubmit(e) {
        e.preventDefault();
        const url = theUrl + '/editUserProfile'
        const payload = this.props.list.payload
        const auth = this.props.auth

        this.props.form.validateFields((err, values)=> {
            if (!err) {
                fetch(url, {
                    headers: tokenHeaders(localStorage.getItem('token')),
                    method: 'POST',
                    body: JSON.stringify({
                        username: payload.username,
                        neckname: values.neckname,
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

    componentDidMount() {
        this.props.dispatch({type: 'GET_PROFILE', username: this.props.auth.username})
    }

    render() {
        const { getFieldDecorator } = this.props.form
        const { list, auth } = this.props
            if( !list.loading && list.payload ) {
                return (
                    <Form layout="" onSubmit={this.handleSubmit} style={{ width: "300px"}}>
                        <Form.Item>
                            <UploadWeChat
                                username={auth.username}
                            />
                        </Form.Item>
                        
                        <Form.Item label="Username: ">
                            <label> { list.payload.username } </label>
                        </Form.Item>

                        <Form.Item label="Neck name: ">
                        {getFieldDecorator('neckname', {
                            rules: [{ required: true, message: 'Please input your neckname!' }]
                        })(
                            <Input placeholder={list.payload.neckname}  />
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

