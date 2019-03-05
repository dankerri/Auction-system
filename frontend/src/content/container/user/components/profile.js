import React, { Component } from  'react'
import { connect } from 'react-redux'
import { theUrl, tokenHeaders } from 'selfConfig'
import { Form, Input } from 'antd'



const fetechData = () => {
    return dispatch => {  
        dispatch(fetechDataBegin())
        return fetch(theUrl + '/userProfile', {
            headers: tokenHeaders(localStorage.getItem("token")),
            method: 'post',
            body: JSON.stringify({
                username: localStorage.getItem("username")
            })
        })
        .then( res => res.json() )
        .then(json => {
            dispatch(fetechDataSuccess(json))
            return json;
        })
        .catch(err => {
            console.log(err)
        })
    }
}
const fetechDataBegin = () => ({
    type: 'FETECH_DATA_BEGIN'
})
const fetechDataSuccess = (json) => ({
    type: 'FETECH_DATA_SUCCESS',
    payload: json
})



class Profile extends Component {
    constructor(props) {
        super(props)
        // this.initPage = this.initPage.bind(this)
    }

    componentDidMount() {
        // this.initPage(this.state.url)
        this.props.dispatch(fetechData())
    }

    render() {
        const { getFieldDecorator } = this.props.form
        const { list, auth } = this.props
            if( list.loading ) {
                return <div>Loding</div>
            }
            
            return (
                <Form>
                    <Form.Item label="Username: ">
                        <label> { list.username } </label>
                    </Form.Item>

                    <Form.Item label="Neck name: ">
                    {getFieldDecorator('neckname', {})(
                        <Input placeholder={list.neckname}  />
                        // <label>{list.neckname}</label>
                    )}
                    </Form.Item> 
                </Form>
            )


    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    list: state.list
})

const theProfile = Form.create({ name: 'normal_login' })(Profile);

export default connect(
    mapStateToProps
)(theProfile)


