
import React, { Component } from 'react';

import { Card, CardImg, CardText, CardBody, CardTitle, BreadcrumbItem, Breadcrumb, Button, ModalBody, Modal, ModalHeader, Col, Label, Row } from 'reactstrap';

import { Link } from 'react-router-dom';

import ReactDOM from 'react-dom';

import { Control, LocalForm, Errors } from 'react-redux-form'

const required = (val) => val && val.length;

const maxLength = (len) => (val) => !(val) || (val.length <= len);

const minLength = (len) => (val) => !(val) || (val.length >= len);

class CommentForm extends Component {

constructor(props) {

super(props);

this.state = {

isModalOpen: false

};

this.toggleModal = this.toggleModal.bind(this);

this.handleSubmit = this.handleSubmit.bind(this);

}

handleSubmit(values) {

this.props.addComment(this.props.dishId,ReactDOM.findDOMNode(this.select).value, values.yourname, values.message);

}

toggleModal() {

this.setState({ isModalOpen: !this.state.isModalOpen });

}

render() {

return (

<>

<Button outline onClick={this.toggleModal}>

<span className="fa fa-pencil">

</span> Submit Comment

</Button>

<Modal isOpen={this.state.isModalOpen} toggle={this.state.toggleModal}>

<ModalHeader toggle={this.state.toggleModal}>Submit Comment</ModalHeader>

<ModalBody>

<LocalForm onSubmit={(values) => this.handleSubmit(values)}>

<Row className="form-group">

<Label htmlFor="rating" md={2}>Rating</Label>

<Col md={10}>

<Control.select model=".rating" id="rating" name="rating"

className="form-control" ref={select => { this.select = select }}>

<option selected value="1">1</option>

<option value="2">2</option>

<option value="3">3</option>

<option value="4">4</option>

<option value="5">5</option>

</Control.select>

</Col>

</Row>

<Row className="form-group">

<Label htmlFor="yourname" md={2}>Your Name</Label>

<Col md={10}>

<Control.text model=".yourname" id="yourname" name="yourname"

placeholder="Your Name"

className="form-control"

validators={{

required, minLength: minLength(3),

maxLength: maxLength(15)

}}

/>

<Errors className="text-danger"

model=".yourname" show="touched"

messages={{

required: 'Required',

minLength: 'Must be greater than 2 characters',

maxLength: 'Must be 15 characters or less'

}} />

</Col>

</Row>

<Row className="form-group">

<Label htmlFor="message" md={2}>Comment</Label>

<Col md={10}>

<Control.textarea model=".message" id="message" name="message"

rows="6"

className="form-control"

></Control.textarea>

</Col>

</Row>

<Row className="form-group">

<Col md={{ size: 10, offset: 2 }}>

<Button type="submit" color="primary">Submit</Button>

</Col>

</Row>

</LocalForm>

</ModalBody>

</Modal>

</>

);

}

}

function RenderDish({ dish }) {

console.log('Dishdetail Compo render is invoked');

return (

<Card>

<CardImg width="100%" src={dish.image} alt={dish.name} />

<CardBody>

<CardTitle heading>{dish.name}</CardTitle>

<CardText>{dish.description}</CardText>

</CardBody>

</Card>

);

}

function RenderComments({ comments, addComment, dishId }) {

if (comments != null) {

const comm = comments.map((comment) =>

<li key={comment.id}>

<p>{comment.comment}</p>

<p>-- {comment.author} {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</p>

</li>);

return (

<div>

<ul className="list-unstyled">

{comm}

</ul>

<CommentForm dishId={dishId} addComment={addComment} />

</div>);

}

else {

return (

<div></div>

)

}

}

const DishDetail = (props) => {

if (props.dish != null) {

return (

<div className="container">

<div className="row">

<Breadcrumb>

<BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>

<BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>

</Breadcrumb>

<div className="col-12">

<h3>Menu</h3>

<hr />

</div>

</div>

<div className="row">

<div className="col-12 col-md-5 m-1">

<RenderDish dish={props.dish} />

</div>

<div className="col-12 col-md-5 m-1">

<h4>Comments</h4>

<RenderComments comments={props.comments}

addComment={props.addComment} dishId={props.dish.id} />