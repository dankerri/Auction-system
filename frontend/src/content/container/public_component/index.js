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
 

// ===================================================================================================================================
// package all compoents
export { 
    LogoutButton,
    PreRoute,
}
