import React, { Component } from 'react';
import DishDetail from './DishdetailComponent';
import {Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle} from 'reactstrap';
import { Media } from 'reactstrap';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDish: null
                }
            }

            onDishSelect(dish){
                this.setState({selectedDish: dish});
            }
        
    

            //this is the main render method   
            render() {
                const menu = this.props.dishes.map((dish) => {
                return (
                  <div key={dish.id} className="col-12 col-md-5 m-1">
                    <Card onClick={()=> this.onDishSelect(dish)}>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardImgOverlay>
                        <CardTitle>{dish.name}</CardTitle>
                        </CardImgOverlay>
                    </Card>
                  </div>
                );
            });
    
            return (
              <div className="container">
                <div className="row">
                     {menu}
                </div>
                <div className="row">
                    <DishDetail selectedDish={this.state.selectedDish}/>
                </div>
              </div>
            );
        }
    }

export default Menu;