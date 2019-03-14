import React, { Component } from  'react'
import { connect } from 'react-redux'
import { theUrl, tokenHeaders } from 'selfConfig'
import { Form, Input, Button } from 'antd'


class Profile extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.dispatch({type: 'GET_PROFILE', username: this.props.auth.username})
    }

    render() {
        const { getFieldDecorator } = this.props.form
        const { list } = this.props
            if( !list.loading && list.payload ) {
                return (
                    <Form>
                        <Form.Item label="Username: ">
                            <label> { list.payload[0].username } </label>
                        </Form.Item>

                        <Form.Item label="Neck name: ">
                        {getFieldDecorator('neckname', {})(
                            <Input placeholder={list.payload[0].neckname}  />
                        )}
                        </Form.Item> 

                        <Form.Item>
                            <Button type="primary">Update change</Button>
                        </Form.Item>
                    </Form>
                )
            }
            else {
                return <h1>Loading</h1>
            }


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


