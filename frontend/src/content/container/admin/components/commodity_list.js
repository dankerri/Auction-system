import React , { Component }from 'react'
import { theUrl, tokenHeaders } from 'selfConfig'
import { connect } from 'react-redux'
import { Table, Popconfirm } from 'antd'
import Axios from 'axios';


class List extends Component {
    constructor(props) {
        super(props)
        this.getList = this.getList.bind(this)
        this.delItem = this.delItem.bind(this)

        this.state = {
            list: [],
            columns: [{
                title: 'Commodity ID',
                dataIndex: 'cid',
                key: 'cid',
              }, {
                title: 'Commodity Name',
                dataIndex: 'commodity_name',
                key: 'commodity_namne'
              }, {
                  title: 'Price',
                  dataIndex: 'price',
                  key: 'price'
              },{
                  title: 'Post Time',
                  dataIndex: 'post_time',
                  key: 'post_time'
              },{
                   title: 'Commodity Description',
                  dataIndex: 'commodity_desc',
                  key: 'commodity_desc'
              },{
                  title: 'Buyer',
                  dataIndex: 'buyer',
                  key: 'buyer'
              },
            //   {
            //     title: 'Action',
            //     key: 'action',
            //     render: (text, record) => (
            //         <Popconfirm title="Sure to delete?" onConfirm={() => this.delAdmin(record.id)}>
            //             <a href="javascript:;">Delete</a>
            //         </Popconfirm>
            //     ),
            //    }
             ],
        }
    }
    componentDidMount() {
        const url = theUrl + '/getSelledCommodityList'
        this.getList(url)
    }   

    getList = (url) => {
        Axios.get(url)
        .then( res => {
            this.setState({
                list: res.data
            })
        })
    }

    delItem = (key) => {
        // this.props.deleteItem(key)
    }

    render() {
        return(
            <div>
                
                <Table 
                    dataSource={this.state.list}
                    columns={this.state.columns}
                    rowKey={record => record.id}
                />
            </div>
        )
    }
}

export default List
