import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Input, Button, 
    Col, Row, Modal, ModalHeader, ModalBody, Form, FormGroup, Label} from 'reactstrap';
import {Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {Control, LocalForm, Errors} from 'react-redux-form';
import {Link} from 'react-router-dom';
import {Loading} from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import {FadeTransform, Fade, Stagger} from 'react-animation-components';

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
    }

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values){
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.message);
    }

    validate(author){
        const errors={
            author:'',
        };
        if (this.state.touched.author && author.length < 3)
        errors.author = 'First Name should be >= 3 characters';
        else if (this.state.touched.author && author.length > 15)
        errors.author = 'First Name should be <= 15 characters';

        return errors;
    }
    
        render(){
            return(
                <React.Fragment>
                    
                <Button  outline color="secondary" onClick={this.toggleModal}>
                <span className="fa fa-pencil fa-lg"></span>Submit Comment</Button>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>

                                <FormGroup>
                                <Label htmlFor="rating">Rating</Label>
                                <Row className="form-group">
                                <Col md={12}>
                                <Control.select model=".rating" name="rating" className="form-control">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                </Control.select>
                                </Col>
                                </Row>
                                </FormGroup>
                            
                            <FormGroup>
                            <Label htmlFor="author" >Your Name</Label>
                            <Row className="form-group">
                            <Col md={12}>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Your Name" className="form-control" 
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                         <Errors className="text-danger"
                                         model=".author"
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
                </React.Fragment>
            );
        
    }
}

   //user defined components always start with capital letters
    function RenderDish ({dish}) {
        if (dish != null)
            return (
                <Card className="col-12 col-md-5 m-1">
                    <FadeTransform in transformProps={{exitTransform: 'scale(0.5) translateY(-50%)'}}>
                    <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                    <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                    </CardBody>                
                    </FadeTransform>
                </Card>
            );
    }

    function RenderComments({comments, postComment, dishId}) {
        if (comments != null) {
            return (
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        <Stagger in>
                    {comments.map(comment => {
                        return (
                            <Fade in>
                            <li key = {comment.id}>
                                <p>{comment.comment}</p>
                                <p>-- {comment.rating} , {comment.author} , {new Date(comment.date).toLocaleDateString('default', {month: 'long', day: 'numeric', year: 'numeric'})}</p>
                            </li>
                            </Fade>                               
                                );
                   })}
                        </Stagger>
                   </ul>
                    <CommentForm dishId={dishId} postComment={postComment}/>
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
        if (props.isLoading){
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            )
        }
        else if (props.errMess){
            return(
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            )
        }
        else if (props.dish !=null) 
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
                   <RenderComments comments ={props.comments}
                   postComment={props.postComment}
                   dishId={props.dish.id} />
                </div>
            </div>
         );
      
        return (
            <div></div>
            );
    }

export default DishDetail;

