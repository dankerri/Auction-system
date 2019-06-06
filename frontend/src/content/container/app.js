
import React, { Component } from 'react'
import axios from 'axios'

import { theUrl, theSocket,tokenHeaders } from 'selfConfig'
import ShowCard from './user/components/showCard'
import Countdown from 'react-countdown-now'

var io = require('socket.io-client');
const socket = io(theSocket)


// import { connect } from 'react-redux'
// import { Link, Route } from 'react-router-dom'
// // import moment from 'moment'

// const item = {
//   cid: 37,
//   pic_num: 1,
//   price: '200',
//   post_time: '2019-06-06 07:58:00',
//   commmodity_name: 'my cup',
//   commodity_desc: 'This cup was uesd by Mea, It\'s very precious.'
// }

class Auction extends Component {
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
        price: res.data[0].price
      })
    })
  }

  liftStep(n){
    return () => {
      socket.emit('updateFromUser', {
        price: this.state.price + n
      })
      axios.post(theUrl+'/price', {
        price: this.state.price + n
      })
    }
  }
  

  render() {
    socket.on('updateFromServer', data =>{
      this.setState({ price: data.price})
    })
    
    return(
      <div style={{ fontSize:'40px'}}>
        <div>
          <span>PRICE: </span>
          <span style={{ color: "red"}}>{this.state.price}</span>
        </div>
        <button onClick={this.liftStep(5)}>+5</button>
        <button onClick={this.liftStep(10)}>+10</button>
        <button onClick={this.liftStep(50)}>+50</button>
        <button onClick={this.liftStep(100)}>+100</button>
      </div>
    )
  }
}





class App extends Component {
  constructor() {
    super()
    this.state= {
      item: {}
    }
    this.getCommodity = this.getCommodity.bind(this)
  }

  componentDidMount() {
    this.getCommodity()
  }

  // save commodity information into state
  getCommodity() {
    axios.get(theUrl+'/commodityList')
    .then(res=>{
      this.setState({
        item: res.data[0]
      })
    })
  }
  
  render() {
    let { item }  = this.state
    let theDate = new Date(item.post_time)
    let start = theDate.getTime()

    const renderer = ({ hours, minutes, seconds, completed }) => {
      if (completed) {
        // Render a completed state
        return(
          <div>
            <h1>FINAL PRICE: { this.state.item.price }</h1>
            <h1>拍卖结束</h1>
          </div>
        ) 
      } else {
        // Render a countdown
        return( 
          <div>
            <Auction />
            <h2>距离拍卖结束还有</h2>
            <h1>{hours}h:{minutes}m:{seconds}s</h1>
          </div>
        )
      }
    }

    return(
      <div style={{textAlign:'center'}}>
        <ShowCard item={item}/>
        <Countdown 
          date={start + 1000*60*60*24 } 
          renderer={renderer}
        />
      </div>
    )
  }
}

export default App