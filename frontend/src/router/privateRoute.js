import { Route, Redirect } from "react-router-dom"
import React from 'react'
import { connect } from "react-redux"

const PrivateRoute = ({ component: Component, auth, level, loginPage, ...rest }) => (
	<Route {...rest} render={props=>{
		// console.log("logged: "+auth.logged + ", level: "+auth.level)
		if( auth.logged && ( auth.level == level ) ) {
			return <Component {...props} />
		} else {
			return <Redirect to={"/"+loginPage} />
		}
	}} />
)

const mapStateToProps = state => ({
	auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute);
