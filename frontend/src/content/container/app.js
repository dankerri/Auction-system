
import React, { Component } from 'react'
import axios from 'axios'

import { theUrl, theSocket,tokenHeaders } from 'selfConfig'
import ShowCard from './user/components/showCard'
import Countdown from 'react-countdown-now'
import { connect } from 'react-redux'
import { LogoutButton } from './public_component/index'


var io = require('socket.io-client');
const socket = io(theSocket)


class auction extends Component {
  constructor(props) {
    super(props)
    this.state = {
      price: ''
    }

    this.liftStep = this.liftStep.bind(this)
  }

  componentDidMount() {
    axios.get(theUrl+'/commodityList')
    .then(res=>{
      this.setState({
        price: res.data[0].price,
        buyer: res.data[0].buyer
      })
      console.log(this.props.auth)
    })
  }

  liftStep(n){
      return (e) => {
        e.preventDefault();
        const { auth } = this.props
        if(auth.username) {
          socket.emit('updateFromUser', {
            price: this.state.price + n,
            buyer: auth.username
          })
          axios.post(theUrl+'/price', {
            price: this.state.price + n,
            buyer: auth.username
          })
        } else {
          window.location.replace("/user_login")
        }
      }
  }
  

  render() {
    socket.on('updateFromServer', data =>{
      this.setState({ 
        price: data.price,
        buyer: data.buyer
      })
    })
    
    return(
      <div>
        <div style={{ fontSize:'40px'}}>
          <span>PRICE: </span>
          <span style={{ color: "red"}}>{this.state.price}</span>
          <span>, Mr.{this.state.buyer?this.state.buyer:'Nobody'}</span>
        </div>
        <button onClick={this.liftStep(5)}>+5</button>
        <button onClick={this.liftStep(10)}>+10</button>
        <button onClick={this.liftStep(50)}>+50</button>
        <button onClick={this.liftStep(100)}>+100</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})
const Auction = connect(mapStateToProps)(auction)





class App extends Component {
  constructor() {
    super()
    this.state= {
      item: {}
    }
    this.updateCommodityInfo = this.updateCommodityInfo.bind(this)
  }

  componentDidMount() {
    this.updateCommodityInfo()
  }

  // save commodity information into state
  updateCommodityInfo() {
    axios.get(theUrl+'/commodityList')
    .then(res=>{
      this.setState({
        item: res.data[0],
        price: res.data[0].price,
        buyer: res.data[0].buyer
      })
    })
  }
  
  render() {
    let { item }  = this.state
    let theDate = new Date(item.post_time)
    let start = theDate.getTime()
    socket.on('updateFormServer', data =>{
      this.setState({
        price: data.price,
        buyer: data.buyer
      })
    })

    const renderer = ({ hours, minutes, seconds, completed }) => {
      if (completed) {
        // Render a completed state 
        return(
          <div>
            <h1>FINAL PRICE: { this.state.price }, Mr.{ this.state.buyer }</h1>
            <h1>拍卖结束</h1>
          </div>
        ) 
      } else {
        // Render a countdown
        return( 
          <div>
            <Auction />
            <h2 style={{marginTop: '5rem'}}>距离拍卖结束还有</h2>
            <h1>{hours}h:{minutes}m:{seconds}s</h1>
          </div>
        )
      }
    }

    return(
      <div style={{textAlign:'center'}}>
        <ShowCard item={item}/>
        <Countdown 
          date={start + 1000*60*60*6 + 1000*60*10.5 } 
          renderer={renderer}
        />
        <LogoutButton />
      </div>
    )
  }
}

export default App