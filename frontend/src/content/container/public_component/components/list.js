import React , { Component }from 'react'
import { theUrl, tokenHeaders } from 'selfConfig'
import { connect } from 'react-redux'
import { Table, Popconfirm } from 'antd'


class List extends Component {
    constructor(props) {
        super(props)
        this.getList = this.getList.bind(this)
        this.delAdmin = this.delAdmin.bind(this)

        this.state = {
            url: theUrl + '/adminList',
            columns: [{
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
              }, {
                title: 'Username',
                dataIndex: 'username',
                key: 'username',
              }, {
                title: 'Phone',
                dataIndex: 'phone',
                key: 'phone',
            }, {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <Popconfirm title="Sure to delete?" onConfirm={() => this.delAdmin(record.id)}>
                        <a href="javascript:;">Delete</a>
                    </Popconfirm>
                ),
            }],
        }
    }
    componentDidMount() {
        this.getList(this.state.url)
    }   

    getList = (getAdminList) => {
    
        fetch(getAdminList, {
            headers: tokenHeaders(localStorage.getItem("token")),
            method: 'get',
        })
        .then(res => { return res.json() })
        .then(res => {
            this.props.init(res)
            // Debugging
            // console.log(res)
        })
        .catch(e=> {
            console.log("token expired")
            
        })
    }

    delAdmin = (key) => {
        this.props.deleteAdmin(key)
    }

    render() {
        return(
            <div>
                
                <Table 
                    dataSource={this.props.list}
                    columns={this.state.columns}
                    rowKey={record => record.id}
                />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    deleteAdmin : id => dispatch({
        type: 'DEL_ITEM',
        id
    }),
    init: res => dispatch({
        type: 'INIT',
        res
    })
})

const mapStateToProps = state => ({
    list: state.list
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(List);


