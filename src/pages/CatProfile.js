import React, { Component } from 'react';
import {
  Col,
  ListGroup,
  ListGroupItem,
  Row
} from 'react-bootstrap'

class CatProfile extends Component {
	constructor(props) {
		super(props)
		this.state = {
			apiURL: "http://localhost:3000",
			id: this.props.location.pathname
		}
	}

	componentWillMount() {
		fetch(`${this.state.apiUrl}${this.state.id}`)
		.then((rawResponse)=>{
			return rawResponse.json()
		})
		.then((jsonresp)=>{
			this.setState(
				{
					name: jsonresp[0].name,
					age: jsonresp[0].age,
					enjoys: jsonresp[0].enjoys,
					city: jsonresp[0].city
				}
			)
		})
	}


	render() {
		return (
			<div>
			<p>Name: {this.state.name}</p>
			<p>Age: {this.state.age}</p>
			<p>City: {this.state.city}</p>
			<p>Enjoys: {this.state.enjoys}</p>
		)
	}
}

export default CatProfile
