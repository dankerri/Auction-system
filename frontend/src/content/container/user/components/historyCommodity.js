import { theUrl, tokenHeaders } from 'selfConfig'
import CardList from './cardList'
import ShowCard from './showCard'


import React, { Component } from 'react'
import { connect } from 'react-redux'
// import moment from 'moment'
import { 
  Input, 
  Layout, 
} from 'antd'
const TextArea = Input.TextArea
const { Header, Content, Footer, Sider } = Layout








class HistroyCommodity extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      payload: [],
    }
  }

  async componentDidMount() {
    const url = theUrl+'/commodityList';
    const payload = await fetch(url, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        method: 'post',
        body: JSON.stringify({
            status: -1,
            username: this.props.auth.username
        })
    })
    .then( res => res.json() )
    this.setState({
      loading: false,
      payload: payload,
    })
  }


  render() {
    
    const { loading, payload } = this.state
   
    if( !loading ) {
        return (<CardList payload={payload} component={ShowCard} />)
    } else {
      return(
        <h1>Loading</h1>
      )
    }
  }
  
}



const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps
)(HistroyCommodity)
