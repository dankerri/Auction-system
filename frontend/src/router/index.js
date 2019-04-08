import React from 'react'

// self
import PrivateRoute from './privateRoute'
import App from '../content/container/app'
import RootLogin from '../content/container/admin/rootLogin'
import AdminLogin from '../content/container/admin/adminLogin'
import UserLogin from '../content/container/user/userLogin'
import RootDashboard from '../content/container/admin/rootDashboard'
import AdminDashboard from '../content/container/admin/adminDashboard'
import UserProfile from '../content/container/user/userProfile'
import Signup from '../content/container/user/signup'

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'


export default () => {
    return (
        <Router>
            <div>
                <Switch>
                <Route exact path="/" component={()=>(<h1>homepage</h1>)} />
                
                {/* login page and protected page */}
                <Route path="/root_login" component={RootLogin} />
                <Route path="/admin_login" component={AdminLogin} />
                <Route path="/user_login" component={UserLogin} />
                {/* -1 means normal user, 0 means root, 1 means admin */}
                <PrivateRoute path="/root_dashboard" component={RootDashboard} level={0} loginPage={"root_login"} />
                <PrivateRoute path="/admin_dashboard" component={AdminDashboard} level={1} loginPage={"admin_login"} />
                <PrivateRoute path="/user_profile" component={UserProfile} level={-1} loginPage={"user_login"}/>

                <Route path="/junk" component={App} />


                <Route path="/signup" component={Signup}/>

                <Redirect  to="/" />
                </Switch>
            </div>
        </Router>
    )
}

  