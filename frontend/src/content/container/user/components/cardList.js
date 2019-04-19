// Accept payload
// Accept category to filter category
// Accept styled card component to show data


import React , { Component }from 'react'
import { 
    Icon,
    Row, Col
  } from 'antd'






class PostCard extends Component {
    constructor(props) {
      super(props)
    }

    render() {
      let { payload, category, component: StyleCard } = this.props

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
  