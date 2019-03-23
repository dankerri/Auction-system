import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Input, Button, Upload, Icon, Select,  message, } from 'antd'
import { Link,Route } from 'react-router-dom'
import reqwest from 'reqwest'

import { theUrl , tokenHeaders } from 'selfConfig'
import { PreRoute, UploadWeChat } from '../../public_component/index'

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
                path={"/user_profile/postedCommodity/newPost"   }
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
            username: this.props.location.state.username,
            payload: []
        }

        this.handleSubmit = this.handleSubmit.bind(this)
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

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values)=> {
            if(!err) {
                console.log(values)
            }
        })
    }

    render() {
        const {payload} = this.state
        const { getFieldDecorator } = this.props.form
        const { TextArea } = Input 
        const { Option } = Select 
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
                    <Demo />
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
                    rules: [{required: true, message: '商品价格不能为空'}]
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
                <Select value="others">
                    <Option value="book">书籍</Option>
                    <Option value="elect">电子产品</Option>
                    <Option value="job">外快</Option>
                    <Option value="others">others</Option>
                </Select>
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

const LivingPostList = () => {
    return (
        <h1>Living Commodity List</h1>
    )
}

// =================================================================================================
// test part

class Demo extends React.Component {
    state = {
      fileList: [],
      uploading: false,
    }
  
    handleUpload = () => {
      const { fileList } = this.state;
      const formData = new FormData();
      fileList.forEach((file) => {
        formData.append('pic', file);
      });
  
      this.setState({
        uploading: true,
      });
  
      // You can use any AJAX library you like
      reqwest({
        url: theUrl+'/uploadCommodityPic',
        method: 'post',
        processData: false,
        data: formData,
        success: () => {
          this.setState({
            uploading: false,
          });
          message.success('upload successfully.');
        },
        error: () => {
          this.setState({
            uploading: false,
          });
          message.error('upload failed.');
        },
      });
    }
  
    render() {
      const { uploading, fileList } = this.state;
      const props = {
        onRemove: (file) => {
          this.setState((state) => {
            const index = state.fileList.indexOf(file);
            const newFileList = state.fileList.slice();
            newFileList.splice(index, 1);
            return {
              fileList: newFileList,
            };
          });
        },
        beforeUpload: (file) => {
          this.setState(state => ({
            fileList: [...state.fileList, file],
          }));
          return false;
        },
        fileList,
      };
  
      return (
        <div>
          <Upload {...props}>
            <Button>
              <Icon type="upload" /> Select File
            </Button>
          </Upload>
          <Button
            type="primary"
            onClick={this.handleUpload}
            disabled={fileList.length === 0}
            loading={uploading}
            style={{ marginTop: 16 }}
          >
            {uploading ? 'Uploading' : 'Start Upload' }
          </Button>
        </div>
      );
    }
  }
  











// ================================================================================================







const mapStateToProps = state => ({
    auth: state.auth
})
const PostCommodity =  connect(mapStateToProps )(postCommodity)
const NewPost = Form.create({ name: 'create_new_post' })(newPost)

export default PostCommodity