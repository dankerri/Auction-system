// display data and pictures as cards.
// Accept payload and category
import React , { Component }from 'react'
// import {  tokenHeaders, dateTimeToDate } from 'selfConfig'
import { 
    Icon,
    Row, Col
  } from 'antd'
import StyleCard from './styleCard'
// import Zmage from 'react-zmage'
// import { throws } from 'assert';

class PostCard extends Component {
    constructor(props) {
      super(props)
    }


    render() {
      let { payload, category } = this.props
    
      // filter commodity, in default return all commodity
      let filterPayload
      if( !category ) {
        filterPayload = payload
      } else { 
        filterPayload = payload.filter(item=>{ return item.category === category })
      }

      return(
        <Row gutter={16 + 32} type="flex" justify="left">{
          filterPayload.map((item)=> {
            return <Col  xs={24} xl={6}>

              <StyleCard item={item} />
            
            </Col>})
        }
        </Row>
      )
    }
    
}

export default PostCard;
  