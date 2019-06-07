import React , { Component }from 'react'
import { theUrl, tokenHeaders } from 'selfConfig'
import { connect } from 'react-redux'
import { Table, Popconfirm } from 'antd'

class List extends Component {
    constructor(props) {
        super(props)
        this.delAdmin = this.delAdmin.bind(this)

        this.state = {
            url: theUrl + '/commodityList',
            columns: [{
                title: 'Commodity ID',
                dataIndex: 'cid',
                key: 'com_id',
              }, {
                title: 'Commodity Name',
                dataIndex: 'commodity_name',
                key: 'commodity_namne'
              }, {
                  title: 'Price',
                  dataIndex: 'price',
                  key: 'price'
              },{
                title: 'Seller ID',
                dataIndex: 'seller_id',
                key: 'seller_id',
              }, {
                  title: 'Seller',
                  dataIndex: 'username',
                  key: 'username'
              }, {
                  title: 'Post Time',
                  dataIndex: 'post_time',
                  key: 'post_time'
              }, {
                  title: 'Commodity Description',
                  dataIndex: 'commodity_des',
                  key: 'commodity_des'
              }, {
                title: 'Categoray',
                dataIndex: 'category',
                key: 'category',
            }, {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <Popconfirm title="Sure to delete?" onConfirm={() => this.delAdmin(record.id)}>
                        <a href="javascript:;">Delete</a>
                    </Popconfirm>
                ),
            }],
            loading: true,
            payload: []
        }
    }

    async componentDidMount() {
        const { url } = this.state
        const payload = await fetch(url, {
            headers: tokenHeaders(localStorage.getItem("token")),
            method: 'get',
        })
        .then(res => { return res.json() })

        this.setState({
            loading: false,
            payload: payload
        })
    }   

    async delAdmin(id) {
        const newPayload = await this.state.payload.filter(element => element.id !== id)
        this.setState({
            payload: newPayload
        })
    }

    render() {
        const { loading, payload, columns } = this.state
        if (loading) {
            return <h1>Loading</h1>
        }
        else {
            return(
                <div>
                    
                    <Table 
                        dataSource={payload}
                        columns={columns}
                        rowKey={record => record.id}
                    />
                </div>
            )
        }
    }
}


const mapStateToProps = state => ({
    list: state.list
})
export default connect(
    mapStateToProps,
)(List);


