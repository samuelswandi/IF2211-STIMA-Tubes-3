import React from 'react';
import Navigation from './Navigation';
import { Button, Container, Form } from "react-bootstrap";

export default class TambahPenyakit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      namaPenyakit: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange = (e) => {
    this.setState({namaPenyakit: e.target.value});
  }

  onSubmit = (e) => {
    console.log(this.state.namaPenyakit);
    e.preventDefault();
    this.setState({namaPenyakit:''});
  }

  render() {
    return (
      <div>
        <Navigation/>
        <Container style={{marginTop:"60px", paddingLeft:"20vw", paddingRight:"20vw"}}>
          <Container style={{marginBottom: "60px", fontSize: "40px", fontWeight:"bolder"}}>
            TAMBAHKAN PENYAKIT
          </Container>
          <Form>
            <Form.Group className='mb-3' controlId='formFile'>
              <Form.Label>Sequence DNA</Form.Label>
              <Form.Control type='file'/>
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicText'>
              <Form.Label>Nama Penyakit</Form.Label>
              <Form.Control 
                type='text' 
                value={this.state.namaPenyakit}
                placeholder='Nama Penyakit'
                onChange={this.onChange}
              />
            </Form.Group>
            <Button 
              type='submit' 
              variant='outline-success'
              onClick={this.onSubmit}
            >
                Upload
            </Button>
          </Form>
        </Container>
      </div>
    );
  }
}
