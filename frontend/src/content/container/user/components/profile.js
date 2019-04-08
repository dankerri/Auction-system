import React, { Component } from  'react'
import { connect } from 'react-redux'
import { Form, Input, Button, message, Upload, Icon } from 'antd'
import { Route } from 'react-router-dom'

import { theUrl, tokenHeaders } from 'selfConfig'
import { UploadWeChat } from '../../public_component/index'


class Profile extends Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleEvent = this.handleEvent.bind(this)

        this.state = {
            username: this.props.auth.username,
            loading: true,
            payload: []
        }
    }

    handleSubmit(e) {
        // e.preventDefault();
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
                        neckname: values.neckname,
                        phone: values.phone,
                        uid: auth.id,
                        cardPic: values.uploadPics
                    })
                })
                .then(res=> { return res.json() })
                .then( res => {
                    if(res.edit) {
                        message.success("edit success")
                        this.setState({payload: { 
                            username: res.username,
                            neckname: res.neckname,
                            phone: res.phone
                        }})

                        message.success("edit successed")
                    } else {
                        message.error("edit failded")
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

        // get fileList in upload component
        handleEvent(e)  {
            // this.props.form.setFieldsValue({uploadComTest: fileList}); ???
            
            if (!e || !e.fileList) {
              return e;
            }
            
            const { fileList } = e;
            // console.log("handleEvent: ", fileList);
            return fileList;
        }

    render() { 
        const { getFieldDecorator } = this.props.form
        const { username, payload, loading } = this.state
        // upload configs
        const props = {
            action: theUrl+"/createCard",
            listType: "picture",
        };

            if( !loading ) {
                return (
                    <div>
                    <h5>Wechat</h5>
                    <img src={theUrl+`/user/${payload.username}_wx.jpg`} />
                    <Form layout="" onSubmit={this.handleSubmit} style={{ width: "300px"}}>
                        <Form.Item>
                        {getFieldDecorator('uploadPics', {
                            valuePropName: 'fileList',
                            getValueFromEvent: this.handleEvent,
                            rules: [{
                            required: true , message:'add picture'
                            }]
                        })(
                            <Upload name="logo" {...props}>
                            <Button type="ghost">
                                <Icon type="upload" /> 更换微信
                            </Button>
                            </Upload>
                        )}
                        </Form.Item>
                        
                        <Form.Item label="Phone Number: ">
                        {getFieldDecorator('phone',{
                            initialValue: payload.phone,
                        })(
                            <Input />
                        )}
                        </Form.Item>
                        
                        <Form.Item label="Username: ">
                            <label> { payload.username } </label>
                        </Form.Item>

                        <Form.Item label="Neck name: ">
                        {getFieldDecorator('neckname', {
                            initialValue: payload.neckname,
                        })(
                            <Input />
                        )}
                        </Form.Item>
                        <Form.Item>
                        <Button 
                            type="primary"
                            htmlType="submit"
                            >Update change</Button>
                        </Form.Item>
                    </Form>
                    </div>
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

