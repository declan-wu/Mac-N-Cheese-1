import React, { Component } from 'react';
import { connect } from 'react-redux';
import menuData from '../menu.data';
import './styling/MenuCategory.css'

import Button from "react-bootstrap/Button";
import Dropdown from 'react-bootstrap/Dropdown';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Image from "react-bootstrap/Image";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons'

class menu extends Component {
  constructor(props) {
    super(props);

    console.log(this.props.match.params.restaurant);

    this.state = {
      restaurant: this.props.match.params.restaurant,
      menulist: menuData[this.props.match.params.restaurant].menu,
      menuOnDisplay: menuData[this.props.match.params.restaurant].menu[0].name,
      menuItems: menuData[this.props.match.params.restaurant].menu[0].items,
      idx: 0
    }
  }

  handleClick(idx) {
    this.setState({
      ...this.state,
      menuOnDisplay: this.state.menulist[idx].name,
      menuItems: this.state.menulist[idx].items,
      idx: idx
    })
  }
  onSortUp() {
    let sorted = [...this.state.menuItems].sort((a, b) => {
      return a.price - b.price;
    });
    this.setState({
      menuItems: sorted
    });
  }
  onSortDown() {
    let sorted = [...this.state.menuItems].sort((a, b) => {
      return b.price - a.price;
    });
    this.setState({
      menuItems: sorted
    });
  }

  render() {
    return (
      <div>
        <div className="header">
          <Image
            src='/pinks.jpg'
            style={{
              display: "block",
              margin: "auto",
              width: "158px",
              height: "148px",
            }}
            rounded
          />
          <Dropdown as={ButtonGroup}  style={{"margin-right": "10px"}}>
            <Button variant="success">All Menus</Button>
            <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
            <Dropdown.Menu>
              {
                this.state.menulist.map((menu, idx) => (
                  <Dropdown.Item onClick={() => this.handleClick(idx)} id={idx} >{menu.name.toUpperCase()}</Dropdown.Item>
                ))
              }
            </Dropdown.Menu>
          </Dropdown>
          <div style={{"font-weight": "bold"}}>Sort by price:</div>
          <Button style={{"margin-right": "10px"}} onClick={this.onSortUp.bind(this)}>ascending <FontAwesomeIcon icon={faSortUp} /></Button>
          <Button onClick={this.onSortDown.bind(this)}>descending <FontAwesomeIcon icon={faSortDown} /></Button>
        </div>
        
        <div className='category'>
        {
          this.state.menuItems
          .map(({ name, imageUrl, price, description, id }) => (
              <div key={id}>
                <Card style={{ padding: "30px" }}>
                  <Row>
                    <Col xs={3} md={2}>
                      <Card.Header>
                        <Image
                          src={imageUrl}
                          style={{
                            display: "block",
                            margin: "auto",
                            width: "158px",
                            height: "148px",
                          }}
                          rounded
                        />
                      </Card.Header>
                    </Col>
                    <Col xs={12} md={8}>
                      <Card.Title style={{ "font-size": "30px" }}>{name.charAt(0).toUpperCase() + name.slice(1)}</Card.Title>
                      <Card.Title style={{ "font-size": "30px" }}>
                        Price: <Badge variant="info">$ {price}</Badge>{" "}
                      </Card.Title>
                      <Card.Text style={{ "font-size": "25px" }}>{description}</Card.Text>
                    </Col>
                  </Row>
                </Card>
              </div>
            )
          )
        }
      </div>

      </div>
    ) 
  }
}

export default connect()(menu);