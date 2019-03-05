import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { theUrl } from 'selfConfig'
import { LogoutButton } from '../public_component/index'

// Get image from static source server
const staticAdminUrl = theUrl+'/admin'

const AdminDashboard  = ({auth}) => {
    
    return(
        <div className="wrap">
            <div className="info">
                <LogoutButton />
                <img  src={staticAdminUrl+"/admin.jpg"}  alt="avatar" />
                <h1>Admin DashBoard</h1>
                <h2>{ auth.username }</h2>
                <h2>{ auth.level }</h2>
                <Link to="/">TO HOMEPAGE</Link>            
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(AdminDashboard);
