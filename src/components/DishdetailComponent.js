import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle } from 'reactstrap';

class DishDetail extends Component{
    constructor(props) {
    super(props);
    this.state={

    }
    }

    renderDish(dish) {
        if (dish != null){
            return(
                <Card>
                    <CardTitle>{dish.name}</CardTitle>
                     <CardText>{dish.description}</CardText>
                </Card>
            );
    }
        else{
            return(
                <div></div>
            );
    }
}


    render() {
        const menu = this.props.dishes.map((dish) =>{
        return (
          <div  className="col-12 col-md-5 m-1">
            <Card>
              <CardImg width="100%" src={this.props.selectedDish.image} alt={this.props.selectedDish.name} />
              <CardBody>
                  <CardTitle>{this.props.selectedDish.name}</CardTitle>
                  <CardText>{this.props.selectedDish.description}</CardText>
                </CardBody>
                </Card>
          </div>
          
        })
    };

}

export default DishDetail;