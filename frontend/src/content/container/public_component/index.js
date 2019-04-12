import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'
import { Button, Upload, Icon, message } from 'antd'

import { theUrl } from 'selfConfig'
// ==========================================================================================================
// authorization situation
// use this button to log out and direct to login page
class TheLogoutButton extends Component{
    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this)
    }
    
    logout (){
        localStorage.removeItem('token')
        localStorage.removeItem('level')
        localStorage.removeItem('username')
        localStorage.removeItem('id')
        this.props.dispatch({
            type: 'LOGOUT'
        })
    }

    render() {
        if( this.props.auth.logged ) {
            return(
                <Button type="danger" onClick={this.logout}>
                Logout
                </Button>
            )
        } else {
            return(
                <Button type="danger">
                    <Link to="/user_login">Login</Link>
                </Button>
            )
        }
    }
}

const mapAuthToButton = state => ({
    auth: state.auth
})
const LogoutButton =  connect(
    mapAuthToButton
)(TheLogoutButton)


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
