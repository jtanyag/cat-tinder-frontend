import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import {
  Col,
  Grid,
  PageHeader,
  Row
} from 'react-bootstrap'
import Cats from './pages/Cats'
import NewCat from './pages/NewCat'
import CatProfile from './pages/CatProfile'
import './App.css'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      apiUrl: "http://localhost:3000",
      cats: [],
      newCatSuccess: false,
      errors: null
    }
  }

  componentWillMount(){
    fetch(`${this.state.apiUrl}/cats`)
    .then((rawResponse) =>{
      return rawResponse.json()
    })
    .then((parsedResponse)=>{
      this.setState({cats: parsedResponse.cats})
    })
  }

  handleNewcat(params){
    fetch(`${this.state.apiUrl}/cats`,
      {
        body: JSON.stringify(params),  // <- we need to stringify the json for fetch
        headers: {  // <- We specify that we're sending JSON, and expect JSON back
          'Content-Type': 'application/json'
        },
        method: "POST"  // <- Here's our verb, so the correct endpoint is invoked on the server
      }
    )
    .then((rawResponse)=>{
      return rawResponse.json()
    })
    .then((parsedResponse) =>{
      if(parsedResponse.errors){ // <- Check for any server side errors
        this.setState({errors: parsedResponse.errors})
      }else{
        const cats = Object.assign([], this.state.cats)
        cats.push(parsedResponse.cat) // <- Add the new cat to our list of cats
        this.setState({
          cats: cats,  // <- Update cats in state
          errors: null, // <- Clear out any errors if they exist
          newCatSuccess: true
        })
      }
    })
  }

  render() {

    const {cats, newCatSuccess} = this.state

    if (newCatSuccess) {
      this.setState({newCatSuccess: undefined})
    }

    return (
      <Router>
        <div>
            <Route exact path="/" render={props => (
                 <Grid>
                   <PageHeader>
                     <Row>
                       <Col xs={12}>
                       	<img className='App-logo' src='./images/cat-tinder-logo.png'/>
						<span className='header-title'>Cat Tinder </span>
					   </Col>
                     </Row>
                   </PageHeader>
                   <NewCat
                      onSubmit={this.handleNewcat.bind(this)}
                      errors={this.state.errors && this.state.errors.validations}
                   />
                     {this.state.newCatSuccess &&
                     <Redirect to="/cats" />
                      }
                 </Grid>
               )} />

               <Route path="/CatProfile/:id" render={props => (
                    <Grid>
                      <PageHeader>
                        <Row>
                          <Col xs={12}>
                          <img className='App-logo' src='../images/cat-tinder-logo.png'/>
                           <span className='header-title'>Cat Tinder | Profile View</span>
                          </Col>
                        </Row>
                      </PageHeader>
                      <CatProfile {...props} />
                    </Grid>
                  )} />

          <Route exact path="/cats" render={props => (
            <Grid>
              <PageHeader>
                <Row>
                  <Col xs={12}>
                  <img className='App-logo' src='./images/cat-tinder-logo.png'/>
                    <span className='header-title'>Cat Tinder</span>
                  </Col>
                </Row>
              </PageHeader>
              <Cats cats={this.state.cats} />
              {this.state.newCatSuccess &&
                <Redirect to="/" />
              }
            </Grid>
          )} />
        </div>
      </Router>
    );
  }
}

export default App;
