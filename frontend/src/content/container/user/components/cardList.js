import React , { Component }from 'react'
import { theUrl, tokenHeaders } from 'selfConfig'
import { 
    Card, Collapse, Comment, Tooltip, List, Button, Avatar, Form, Input, 
    Layout, Menu, Breadcrumb, Icon,
    Carousel,
    Modal,
    Row, Col
  } from 'antd'
import Zmage from 'react-zmage'
import { throws } from 'assert';

class PostCard extends Component {
    constructor(props) {
      super(props)
      this.state = {
        visible: false
      }

      this.showModal = this.showModal.bind(this)
      this.handleOk = this.handleOk.bind(this)
      this.handleCancel = this.handleCancel.bind(this)
      // this.getPicList = this.getPicList.bind(this)
    }

    showModal = () => {
      this.setState({
        visible: true,
      });
    }
  
    handleOk = (e) => {
      console.log(e);
      this.setState({
        visible: false,
      });
    }
  
    handleCancel = (e) => {
      console.log(e);
      this.setState({
        visible: false,
      });
    }
  
  
    render() {
      let { payload, username } = this.props
    
      return(
        <Row gutter={16 + 32} type="flex" justify="center">{
        payload.map((item)=> {
            return <Col  xs={24} xl={6}>
            <Card
            key={item.cid}
            hoverable
            style={{ width: "100%", marginTop: 50, padding: "20px", }}
            cover={<LoadZamge pic_num={item.pic_num} cid={item.cid}/>}
            >              
              {/* information */}
              <div>
                <h5>post time: {item.post_time}</h5>
                <h1>{item.commodity_name}</h1>
                <h5 style={{ color: '#F22F08'}}>Price: {item.price}</h5>
                <h5>{item.post}</h5>
                <h5 style={{ color: "#0ABDA0" }}>Seller: {item.neckname?item.neckname:item.username}</h5>
                <h5>Categorys: {item.category}</h5>
                <h2 style={{ color: 'gray'}}>{item.commodity_des}</h2>
                <h5>Phone: {item.phone}</h5>
              </div>

              {/* contact */}
              <div style={{display: "flex",
                          justifyContent: "center",
                          alignItems: "center"
                         }}
              >
               <img 
                style={{ height: "400px"}}
                src={`${theUrl}/user/${item.username}_wx.jpg`} />
               
              </div>
            </Card></Col>})
        }
        </Row>
      )
    }
    
}

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


export default PostCard;
  