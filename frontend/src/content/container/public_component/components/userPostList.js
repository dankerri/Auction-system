import React, { Component } from 'react'
import { connect } from 'react-redux'
import { theUrl } from 'selfConfig'


import EditCard from './editCard'
import CardList from './cardList'

class UserPostList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            payload: [],
            username: this.props.username 
        }
    }

    async componentDidMount() {
        const url = theUrl+'/getCommodityList';
        // const payload = await fetch(url).then( res => res.json() )
        const payload = await fetch(url)
        .then( res => res.json() )
        
        this.setState({
          loading: false,
          payload: payload,
        })

        // this.setState({
        //   loading: false,
        //   payload: payload.filter(item=>{return item.username === this.state.username})
        // })
    }

    render() {
        const { payload } = this.state
        return(
            <div>
                <h1>Living Post List</h1>
                <CardList payload={payload} category={-1} component={EditCard} />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps)(UserPostList)