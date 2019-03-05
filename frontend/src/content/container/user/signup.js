import React from 'react'
import {
    Form, Input, Button
} from 'antd';
import { theUrl } from 'selfConfig'


const Signup = (props) => {

    let comfirmDirty = false

    const { getFieldDecorator } = props.form
    
    const handleSubmit = (e) => {
        e.preventDefault()

        props.form.validateFields((err, values)=>{
            if( !err ) {
                const url = theUrl + '/signup'
                fetch(url, {
                    headers: {
                        'Accept':'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify({
                        username: values.email,
                        password: values.password
                    })
                })
                .then( res => { return res.json() })
                .then( res => {
                    if ( res.signup ) {
                        props.history.push("/user_login")
                    } else {
                        props.history.push("/signup")
                    }
                })
            }
        })
    }

    const validateEmail = (email) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return true
        } else {
            return false
        }
    }

    const checkemail = (rule, value, callback) => {
        // check email format
        if( !validateEmail(value) ) {
            callback("This is not a valid email")
        }

        // check db if username repeats 
        const url= theUrl+'/duplicationCheck'
        fetch(url, {
            headers: {
                'Accept':'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                username: value,
            })
        })
        .then(res => { return res.json() })
        .then(res => {
            console.log(res.existence)
            if (res.existence) {
                callback('useranem existence')
            } else {
                callback()
            }
        })
    }

    const validateToNextPassword = (rule, value, callback) => {
        const form = props.form
        if ( value && comfirmDirty) {
            form.validataFields(['confirm'], { force: true })
        }
        callback()
    }

    const compareToFirstPassword = (rules, value, callback) => {
        const form = props.form
        if( value && value !== form.getFieldValue('password')) {
            callback('Two password that you entry are inconsistent')
        } else {
            callback()
        }
    }
    return(
        <Form onSubmit={handleSubmit}>
            <Form.Item>
            {getFieldDecorator('email', {
                rules: [{
                    required: true, message: 'Please input your username'
                }, {
                    validator: checkemail
                }],
                validateTrigger: 'onBlur'
            })
            (<Input placeholder="email"/>)}
            </Form.Item>

            <Form.Item>
            {getFieldDecorator('password', {
                rules: [{
                    required : true, message: 'Please input your message'
                }, {
                    validator: validateToNextPassword
                }]
            })(<Input type="password" placeholder="password"/>)}
            </Form.Item>

            <Form.Item>
            {getFieldDecorator('confirm',{
                rules: [{
                    required: true, message: 'Please input your password again'
                }, {
                    validator: compareToFirstPassword
                }]
            })(<Input type="password" placeholder="input password again"/>)}
            </Form.Item>

            <Form.Item>
            <Button tpye="primary" htmlType="submit">sign up</Button>
            </Form.Item>
        </Form>
    )
}


export default Form.create({name: 'normal_login'})(Signup)