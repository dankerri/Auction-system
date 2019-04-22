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
      let { payload, category } = this.props
      this.state = {
        payload: [],
        category: ' '
      }
    }

    static getDerivedStateFromProps(props, state) {
      return {
        payload: props.payload,
        category: props.category,
        loding: false
      }
    }


    render() {
      if (!this.state.loding) {
        let { component: StyleCard } = this.props
        let { payload, category} = this.state


        // filter commodity,  If category = -1 , it returns all commodity
        let filterPayload        
        if( category < 0 ) {
          filterPayload = payload
        } else { 
          filterPayload = payload.filter(item=>{ return item.category === category })
        }
  
        return(
          <Row gutter={16 + 32} type="flex" justify="left">{
            filterPayload.map((item)=> {
              return <Col  xs={24} xl={6} >
  
                <StyleCard item={item} key={item.cid}/>
              
              </Col>})
          }
          </Row>
        )
      } else {
        console.log(this.state.loading)
        return <h1>Loding</h1>
      }    
    }
    
}

export default PostCard;
  