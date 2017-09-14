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
			cat: undefined
		}
	}

	componentWillMount() {
		// this.props.match.params.id // cat ID
		// fetch cat based on ID
		const params = this.props.match.params.id

		fetch(`${this.state.apiUrl}/cats`,
	      {
	        headers: {  // <- We specify that we're sending JSON, and expect JSON back
	          'Content-Type': 'application/json'
	        },
	        method: "POST"  // <- Here's our verb, so the correct endpoint is invoked on the server
	      }
	    )
	    .then((params)=>{
	      return params.json()
	    })

		   console.log(params);
	    }

	render() {
		const { cat } = this.state

		if(cat === undefined) {
			return (<h1 className="wrangling">Wrangling Cats...</h1>)
		} else {
			return (<h1>{cat.id}</h1>)
		}
	}
}

export default CatProfile
