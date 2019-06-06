import React, { Component } from 'react'
import { theUrl, dateTimeToDate } from 'selfConfig'
import { Card, Icon } from 'antd'
import Zmage from 'react-zmage'

const ShowCard = ({item}) => {

    return(
        <Card
        key={item.cid}
        hoverable
        style={{ width: "100%", marginTop: 50, padding: "20px", }}
        cover={<LoadZamge pic_num={item.pic_num} cid={item.cid}/>}
        > 
          {/* information */}
          <div>
            <h5>cid: {item.cid}</h5>
            <h5>{dateTimeToDate(item.post_time)}</h5>
            
            <h1>{item.commodity_name}</h1>
            <h2 style={{ color: 'gray'}}>{item.commodity_desc}</h2>
            
            
          </div>
        </Card>
    )
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

export default ShowCard;