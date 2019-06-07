import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Input, Button, Upload, Icon, Select, Modal, message, } from 'antd'
import { Link,Route } from 'react-router-dom'

import { theUrl , tokenHeaders, dateToDateTime  } from 'selfConfig'
import UserPostList from './userPostList'


 
// page structor
const postCommodity = ({match, auth}) => {
    return(
        <div>
            {/* post commodity area */}
            <Button type="primary">
                <Link 
                    to={{
                        pathname: "/root_dashboard/admin/newPost",
                        state: {
                            username: auth.username
                        }
                    }}
                >Create New Post</Link>
            </Button>
            <Route 
                path={"/root_dashboard/admin/newPost"}
                component={NewPost}
            />

            {/* Show and manage commodity cards area */}
            <UserPostList username={auth.username} />
        </div>
    )
}


// An form that can post commodity card
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
        this.setState({
            loading: false,
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
              console.log(values)

              const url = theUrl + '/uploadPic'
              
              fetch(url, {
                headers: tokenHeaders(localStorage.getItem("token")),
                method: 'POST',
                body: JSON.stringify({
                  commodity_name: values.commodity_name,
                  price: values.price,
                  desc: values.desc,
                  category: values.category,
                  cardPic: values.uploadPics,
                })
              })
              .then(res => res.json())
              .then(res => {
                  if(res.post) {
                    this.props.history.replace("/root_dashboard/admin")
                    window.location.replace("/root_dashboard/admin")
                  } else {
                      message.error("create commodity card failed")
                  }
              })
            }
        })
    }


    render() {
        const { getFieldDecorator } = this.props.form
        const { TextArea } = Input 

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
                
                <Form.Item label="Commodity">
                {getFieldDecorator('commodity_name', {
                    rules: [{required: true, message: '商品名不能为空'}]
                })(
                    <Input />
                )}
                </Form.Item>
                <Form.Item label="Price ￥">
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

                <Form.Item label="Description">
                {getFieldDecorator('desc', {
                    rules: [{required: true, message: '商品描述不能为空'}]
                })(
                    <TextArea />
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