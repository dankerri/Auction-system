import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Input, Button, Upload, Icon, Select, Modal, message, } from 'antd'
import { Link,Route } from 'react-router-dom'

import { theUrl , tokenHeaders } from 'selfConfig'
import LivingPostList from './livingPostList'
// page structor
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


class  newPost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            // location.state is passed by <Link>
            username: this.props.location.state.username,
            payload: []
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleEvent = this.handleEvent.bind(this)
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

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values)=> {
            if(!err) {

              console.log(this.state.payload)
              console.log(values)

              const {payload} = this.state
              const url = theUrl + '/uploadPic'
              // generate date in Mysql Datetime format
              var date = new Date()
              date = date.getUTCFullYear() + '-' +
                    ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
                    ('00' + date.getUTCDate()).slice(-2) + ' ' + 
                    ('00' + date.getUTCHours()).slice(-2) + ':' + 
                    ('00' + date.getUTCMinutes()).slice(-2) + ':' + 
                    ('00' + date.getUTCSeconds()).slice(-2);
              
              fetch(url, {
                headers: tokenHeaders(localStorage.getItem("token")),
                method: 'POST',
                body: JSON.stringify({
                  uid: payload.uid,
                  commodity: values.commodity,
                  price: values.price,
                  des: values.des,
                  post_time: date,
                  category: values.category,
                  cardPic: values.uploadPics,
                  phone: values.phone
                })
              })
              .then(res => res.json())
              .then(res => {
                  if(res.post) {
                    this.props.history.replace("/user_profile/postedCommodity")
                  } else {
                      message.error("create commodity card failed")
                  }
              })
            }
        })
    }


    render() {
        const {payload} = this.state
        const { getFieldDecorator } = this.props.form
        const { TextArea } = Input 
        const { Option } = Select 

        // upload configs
        const props = {
            action: theUrl+"/createCard",
            listType: "picture",
            // onChange: this.handleUpload,
            beforeUpload:　(file)　=> {
                const isJPG = file.type === 'image/jpeg';
                if (!isJPG) {
                  message.error('You can only upload JPG file!');
                }
                const isLt2M = file.size / 1024 / 1024 < 5;
                if (!isLt2M) {
                  message.error('Image must smaller than 5MB!');
                }
                return isJPG && isLt2M;
            }
        };

        return(
            <Form onSubmit={this.handleSubmit}>
                {/* personal information */}
                <Form.Item label="phone number">
                {getFieldDecorator('phone', {
                    initialValue: payload.phone,
                })(
                    <Input 
                        username={payload.username}
                    />
                )}
                </Form.Item>
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
                        <Icon type="upload" /> Click to upload
                    </Button>
                    </Upload>
                )}
                </Form.Item>
                
                <Form.Item label="commodity">
                {getFieldDecorator('commodity', {
                    rules: [{required: true, message: '商品名不能为空'}]
                })(
                    <Input />
                )}
                </Form.Item>
                <Form.Item label="price">
                {getFieldDecorator('price', {
                    rules:[{
                        required:true,
                        pattern: new RegExp(/^[1-9]\d*$/, "g"),
                        message: '商品价格的格式错误'
                    }]
                })(
                    <Input />
                )}
                </Form.Item>

                <Form.Item label="description">
                {getFieldDecorator('des', {
                    rules: [{required: true, message: '商品描述不能为空'}]
                })(
                    <TextArea />
                )}
                </Form.Item>

                <Form.Item label="分类">
                {getFieldDecorator('category', {
                    initialValue: "1",
                    rules: [{required: true, message: '商品描述不能为空'}]
                })(
                  <Select>
                    <Option value="1">书籍</Option>
                    <Option value="2">电子产品</Option>
                    <Option value="3">外快</Option>
                    <Option value="0">others</Option>
                  </Select>
                )}
                </Form.Item>

                <Form.Item>
                    <Button 
                        type="primary"
                        htmlType="submit"
                    >Create Now!</Button>
                </Form.Item>
            </Form>
        )
    }
}

// it should be read as an component

const mapStateToProps = state => ({
    auth: state.auth
})
const PostCommodity =  connect(mapStateToProps)(postCommodity)
const NewPost = Form.create({ name: 'create_new_post' })(newPost)

export default PostCommodity