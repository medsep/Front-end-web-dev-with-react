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
                     <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody></CardBody>
                
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
       
    return (
      <div className="row">
        <div className="col-12 col-md-5 m-1">
        {this.renderDish(this.props.selectedDish)}
        </div>
        
      </div>
      )
};


}


export default DishDetail;