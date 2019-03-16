import React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import { Button, Upload, Icon } from 'antd'

import { theUrl } from 'selfConfig'

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


// Upload avatar
const uploadButton = (
    <div>
      <Icon type={false ? 'loading' : 'plus'} />
      <div className="ant-upload-text">Upload</div>
    </div>
);
const UploadAvatar = () => (
    <Upload
    name="avatar"
    listType="picture-card"
    className="avatar-uploader"
    showUploadList={false}
    action={theUrl+"/upload"}
    onChange={() => {}}
    >
         {false ? <img src={"imageUrl"} alt="avatar" /> : uploadButton}
    </Upload>
)

// package all compoents
export { 
    LogoutButton,
    PreRoute,
    UploadAvatar
}
