import React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import { Button, Upload, Icon, message } from 'antd'

import { theUrl } from 'selfConfig'
// ==========================================================================================================
// authorization situation
// use this button to log out.
const logoutButton = props => {
    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('level')
        localStorage.removeItem('username')
        localStorage.removeItem('id')
        props.dispatch({
            type: 'LOGOUT'
        })
    }
    return(
        <Button type="danger" onClick={logout}>logout</Button>
    )
}
const LogoutButton =  connect()(logoutButton)


// HOC, get url string from route
const PreRoute = ({ match, route}) => (
    <Route 
        path={`${match.url}`+route.path}
        component={route.component}
    />
)

// ==============================================================================================================================
// profile
// check if image exists, return true if exists
function imageExists(image_url){

    var http = new XMLHttpRequest();

    http.open('HEAD', image_url, false);
    http.send();

    return http.status != 404;
}
const CheckImage = ({url}) => {
    
    const defaultUrl = theUrl+'/user/default.png'
    
    if( imageExists(url) ) {
        return(<img src={url} />)
    } else {
        return(<img src={defaultUrl} />)
    } 
} 

// Upload Wechat Qrcode
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  
  function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
      message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
  }
  
  class UploadWeChat extends React.Component {
    constructor(props) {
        super(props)
    }
    state = {
      loading: false,
    };
  
    handleChange = (info) => {
      if (info.file.status === 'uploading') {
        this.setState({ loading: true });
        return;
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl => this.setState({
          imageUrl,
          loading: false,
        }));
      }
    }
  
    render() {
      const uploadButton = (
        <div>
          <Icon type={this.state.loading ? 'loading' : 'plus'} />
          <div className="ant-upload-text">Upload</div>
        </div>
      );
      const imageUrl = this.state.imageUrl;
      return (
        <Upload
          name="wechat"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action={theUrl+"/upload"}
          beforeUpload={beforeUpload}
          onChange={this.handleChange}
          data={{username: this.props.username}}
        >
          {imageUrl ? <img src={imageUrl} alt="avatar" /> : <CheckImage url={`${theUrl}/user/${this.props.username}_wx.jpg`}/>}
        </Upload>
      );
    }
  }

// package all compoents
export { 
    LogoutButton,
    PreRoute,
    UploadWeChat
}
