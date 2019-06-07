import React, { Component } from 'react'
import axios from 'axios'

import { Link } from 'react-router-dom'

import { Button } from 'antd'

import { theUrl, theSocket,tokenHeaders } from 'selfConfig'
import ShowCard from '../public_component/components/showCard'
import Countdown from 'react-countdown-now'
import { connect } from 'react-redux'


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
      if(res.data[0].price) {
        this.setState({
          price: res.data[0].price,
          buyer: res.data[0].buyer
        })
      }
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
          <span style={{ color: "blue"}}>{this.state.price}</span>
          <div>
            <span>Belongs to Mr.</span>
            <span style={{ color: "blue"}}>{this.state.buyer?this.state.buyer:'Nobody'}</span>
          </div>
        </div>
        <Button size="large" onClick={this.liftStep(5)}>+5</Button>
        <Button size="large" onClick={this.liftStep(10)}>+10</Button>
        <Button size="large" onClick={this.liftStep(50)}>+50</Button>
        <Button size="large" onClick={this.liftStep(100)}>+100</Button>
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
    this.stopAuction = this.stopAuction.bind(this)
  }

  componentDidMount() {
    this.updateCommodityInfo()
  }

  // save commodity information into state
  updateCommodityInfo() {
    axios.get(theUrl+'/commodityList')
    .then(res=>{
      if(res.data[0]) {
        this.setState({
          item: res.data[0],
          price: res.data[0].price,
          buyer: res.data[0].buyer
        })
      }

    })
  }

  stopAuction(cid) {
    // console.log("cid = " + cid)
    const url = theUrl+'/end'
    axios.post(url, {
      cid: cid
    })
    console.log("yeeeeep")
    console.log(cid)
  }
  
  render() {

    // format time string for Countdown component
    let { item }  = this.state
    let theDate = new Date(item.post_time)
    let start = theDate.getTime()

    socket.on('updateFormServer', data =>{
      this.setState({
        price: data.price,
        buyer: data.buyerz
      })
    })

    const renderer = ({ hours, minutes, seconds, completed }) => {
      if (completed) {
        // Render a completed state 
        axios.post(theUrl+'/end', {
          cid: item.cid
        })


        return(
          <div>
            <div style={{ fontSize:"30px"}}>
              <span>FINAL PRICE: </span>
              <span style={{ color: "red"}}>{ this.state.price }¥</span>
            </div>
            <div style={{ fontSize:"30px"}}>
              <span>Belogns to </span>
              <span style={{ color: "red"}}>Mr.{ this.state.buyer }</span>
            </div>
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

    if(item.price) {
      return(
        <div style={{textAlign:'center'}}>
          <ShowCard item={item}/>
          <Countdown 
            date={start + 1000*60*60 } 
            renderer={renderer}
          />
          <Button  type="danger" onClick={()=>{this.stopAuction(item.cid)} }>stop</Button>
        </div>
      )
    } else {
      return(<h1>目前没有拍卖</h1>) 
    }
  }
}

export default App