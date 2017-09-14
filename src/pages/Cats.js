import React, { Component } from 'react';
import {
  Col,
  ListGroup,
  ListGroupItem,
  Row
} from 'react-bootstrap'

class Cats extends Component {
  render() {
    return (
      <div>
        <div>
          <h3>All the Cats</h3>
        </div>
        <div>
          <Row>
            <Col xs={12}>
              <ListGroup>
                {this.props.cats.map((cat, index) =>{
                  return (
                    <ListGroupItem
                      key={index}
                      header={
                        <h4>
                          <span className='cat-name'>
                            <a href={'/CatProfile/' + cat.id}>
								{cat.name}
							</a>
                          </span>
                            <small className='cat-age'> {cat.age} years old </small>
                            <small className='cat-city'>{cat.city} </small>
                        </h4>
                      }>
                      <span className='cat-enjoys'>
                        {cat.enjoys}
                      </span>
                    </ListGroupItem>
                  )
                })}
              </ListGroup>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
export default Cats
