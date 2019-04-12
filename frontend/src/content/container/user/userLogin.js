import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { theUrl } from 'selfConfig'

const mapStateToProps = state => ({
    auth: state.auth
})

const mapDispatchToProps = dispatch => ({
    login: (username, level, id) => {dispatch({
        type: 'LOGIN',
        username: username,
        level: level,
        id: id
    })}
})

const Login = (props) => {
    let username = ''
    let password = ''

    var login = (e) => {
        e.preventDefault()

        const url=theUrl+"/userLogin"
        fetch(url, {
            headers: {
                'Accept':'appliction/json',
                'Content-Type':'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                username: username.value,
                password: password.value
            })
        })
        .then(res=> { return res.json() })
        .then(res=> {

            // save token to redux
            props.login(res.username, res.level, res.id)

            // save token at browser
            localStorage.setItem('token', res.token)
            localStorage.setItem('level', res.level)
            localStorage.setItem('username', res.username)
            localStorage.setItem('id', res.id)

            props.history.push("/user_profile")

        })
        .catch(e=> {
            alert("login failed, check your username or password")
        })
    }
    

    return (
        <form onSubmit={login} >
            <Link to="/junk">Back to Junk.</Link>
            <h1>User Login</h1>
            <label>
                <input 
                type="text" 
                placeholder="username" 
                ref={ input => username = input }
                />
            </label>
            <label>
                <input 
                type="password"
                placeholder="password"
                ref={ input => password = input }
                />
            </label>
            <input type="submit" value="login"/>
        </form>
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)