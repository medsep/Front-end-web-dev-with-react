import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Input, Button, 
    Col, Row, Modal, ModalHeader, ModalBody, Form, FormGroup, Label} from 'reactstrap';
import {Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {Control, LocalForm, Errors} from 'react-redux-form';
import {Link} from 'react-router-dom';

const required = (val) => val && val. length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component{
    constructor(props){
        super(props);
        this.state={
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmitComment = this.handleSubmitComment.bind(this);
    }

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmitComment(event){
        this.toggleModal();
            alert("Your Name " + this.yourname.value);
        event.preventDefault();
    }

    handleSubmitComment(values){
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
    }

    validate(yourname){
        const errors={
            yourname:'',
        };
        if (this.state.touched.yourname && yourname.length < 3)
        errors.yourname = 'First Name should be >= 3 characters';
        else if (this.state.touched.yourname && yourname.length > 15)
        errors.yourname = 'First Name should be <= 15 characters';

        return errors;
    }
    
        render(){
            return(
                <div className="container">
                <LocalForm onSubmit={(values) => this.handleSubmitComment(values)}>
                <Button  outline color="secondary" onClick={this.toggleModal}>
                <span className="fa fa-pencil fa-lg"></span>Submit Comment</Button>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmitComment(values)}>
                            <FormGroup>
                                <Label htmlFor="rating">Rating</Label>
                                <Row className="form-group">
                                <Col md={12}>
                                <Control.select model=".rating" name="rating" className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    </Control.select>
                                    </Col>
                                    </Row>
                            </FormGroup>
                            
                            <FormGroup>
                            <Label htmlFor="yourname" >Your Name</Label>
                            <Row className="form-group">
                            <Col md={12}>
                                    <Control.text model=".yourname" id="yourname" name="yourname"
                                        placeholder="Your Name" className="form-control" 
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                         <Errors className="text-danger"
                                         model=".yourname"
                                         show="touched"
                                         messages={{
                                             required: 'Required',
                                             minLength: 'Must be greater than 2 characters',
                                             maxLength: 'Must be 15 characters or less'
                                         }}/>
                                </Col>
                                </Row>
                        </FormGroup>

                        <FormGroup>
                        <Label htmlFor="message">Comment</Label>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Control.textarea model=".message" id="message" name="message"
                                    rows="6" className="form-control"/>
                                </Col>
                                </Row>
                            </FormGroup>
                        <Button type="submit" value="submit" color="primary" className="primary">Submit</Button>
                    </LocalForm>
                </ModalBody>
                </Modal>
                </LocalForm>
                </div>
            );
        
    }
}

   //user defined components always start with capital letters
    function RenderDish ({dish}) {
        if (dish != null)
            return (
                <Card className="col-12 col-md-5 m-1">
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                        </CardBody>
                </Card>
            );
        else
            return (
                <div></div>
            );
    }

    function RenderComments({comments}) {
        if (comments.length != 0) {
            return (
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    {comments.map(comment => (
                        <ul className="list-unstyled">
                            <li>
                                <p>{comment.comment}</p>
                                <p>-- {comment.author} , {new Intl.DateTimeFormat('en-AU',{year:'numeric', month:'short', day:'2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                                
                             </li>                               
                        </ul>
                    )
                    )}
                    <CommentForm/>
                </div>
            );
        }
        else {
            return (
                <div></div>
            );
        }
    }
   
    const DishDetail= (props)=> {
        if (props.dish !=null) 
        return(
            <div className="container">
                <div className="row">
                  <Breadcrumb>
                  <BreadcrumbItem><Link to = '/menu'>Menu</Link></BreadcrumbItem>
                  <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                  </Breadcrumb>
                  <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                  </div>
                </div>
                <div className="row">
                    <RenderDish dish= {props.dish} />
                   <RenderComments comments ={props.comments} />
                </div>
            </div>
         );
      
        return (
            <div></div>
            );
    }

export default DishDetail;