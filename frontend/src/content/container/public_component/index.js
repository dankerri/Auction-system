import React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import { Button } from 'antd'

// use this button to log out.
const logoutButton = props => {
    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('level')
        localStorage.removeItem('username')
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


// package all compoents
export { 
    LogoutButton,
    PreRoute
}
