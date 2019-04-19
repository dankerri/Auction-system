import React, { Component } from 'react'
import { theUrl, dateTimeToDate } from 'selfConfig'
import { 
    Card, Icon,
    Button, Modal, Popconfirm, message
} from 'antd'
import Zmage from 'react-zmage'
import { relativeTimeRounding } from 'moment';

class EditCard extends Component {
    constructor(props) {
        super(props)
        this.handleOk = this.handleOk.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.showModal = this.showModal.bind(this)

        this.state = {
            visible: false,
            cateIcon: [
                {name: 'Others', icon: <Icon type="bars" /> },
                {name: '书籍', icon:<Icon type="book" /> },
                {name: '电子产品', icon:<Icon type="thunderbolt" /> },
                {name: '外快', icon:<Icon type="pay-circle" /> },
            ]
        }
    }

    showModal() {
        this.setState({
          visible: true,
        });
      }
    
    handleOk(e) {
    console.log(e);
    this.setState({
        visible: false,
    });
    }

    handleCancel(e) {
    console.log(e);
    this.setState({
        visible: false,
    });
    }
    
    render() {
        const { item } = this.props
        const { cateIcon } = this.state

        return(
            <Card
            key={item.cid}
            hoverable
            style={{ width: "100%", marginTop: 50, padding: "20px", }}
            cover={<LoadZamge pic_num={item.pic_num} cid={item.cid}/>}
            actions={[ <EditIcon showModal={this.showModal}/>, <DeleteIcon cid={item.cid}/>]}
            > 
              {/* information */}
              <div>
                <h5>{dateTimeToDate(item.post_time)}</h5>
                <h1>{item.commodity_name}</h1>
                <h5 style={{ color: '#F22F08'}}>Price: {item.price}</h5>
                <h5>{item.post}</h5>
                <h5 style={{ color: "#0ABDA0" }}>Seller: {item.neckname?item.neckname:item.username}</h5>
                <h5>Categorys: {cateIcon[item.category].icon } {cateIcon[item.category].name}</h5>
                <h2 style={{ color: 'gray'}}>{item.commodity_des}</h2>
                <h5>Phone: {item.phone}</h5>
              </div>
    
              {/* contact */}
              <div style={{display: "flex",
                          justifyContent: "center",
                          alignItems: "center"
                         }}
              >
               {/* <img 
                style={{ height: "20rem"}}
                src={`${theUrl}/user/${item.username}_wx.jpg`} /> */}
               
              </div>
    
              {/* <h5>cid: {item.cid}</h5> */}
    
              <Modal
                title="Basic Modal"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
              >
                  <h1>Hello world</h1>
              </Modal>
            </Card>
        )
    }

}


// pass a picture set into Zmage component.
class LoadZamge extends Component {
    constructor(props) {
      super(props)
      this.state = {
        set: [],
        pic_num : this.props.pic_num,
        cid : this.props.cid
      }
  
      this.getPicList = this.getPicList.bind(this)
    }
  
    componentDidMount() {
      const { pic_num, cid } = this.props
      this.getPicList(pic_num, cid)
    }
  
    getPicList = async (pic_num, cid) => {
      let list = []
      for(var i = 0; i < pic_num; i++) {
        list[i] = await { src: theUrl+`/commodity/${cid}_${i}.jpg`}
      }
  
      await this.setState({
        set: list
      })
    }
  
    render() {
  
      return(
        <Zmage
          style={{heigth: "10rem", weight: "100%", overflow: "hidden"}}
          src={theUrl+`/commodity/${this.state.cid}_0_thumb.jpg`}
          set={this.state.set}
          // preset="mobile"
        />
      )
    }
}

const EditIcon = ({showModal})=> {
    return (<Icon type="edit" onClick={showModal}/>)
}

const DeleteIcon = ({cid}) => {
    const confirm = (e) => {
        const url = theUrl+'/deleteCommodity'
        fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            method: 'post',
            body: JSON.stringify({
                cid: cid
            })
        })
        .then(res=>{ return res.json()})
        .then(res=>{
            if(res.edit){
                message.success("You already deleted the commodity card " + cid)
                window.location.reload(true)
            } else {
                message.error("Delete Failed")
            }
        })
    }
    return(
        <Popconfirm
            title="Are you sure delete this commodity card?"
            onConfirm={confirm}
        >
            <Icon type="delete" />
        </Popconfirm>
    )
}

export default EditCard;

