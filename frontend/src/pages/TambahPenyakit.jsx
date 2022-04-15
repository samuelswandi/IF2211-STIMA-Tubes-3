import React from 'react';
import Navigation from './Navigation';
import { Button, Container, Form } from "react-bootstrap";

export default class TambahPenyakit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sequenceDNA: null,
      namaPenyakit: "",
    };
  }

  onChange = (e) => {
    this.setState({namaPenyakit: e.target.value});
  }

  onUpload = async(e) => {
    const reader = new FileReader();
    reader.onload = async(e) => {
      const text = e.target.result;
      const validPattern = /[^AGCT]/g;
      const check = text.match(validPattern);
      if (check === null) {
        this.setState({sequenceDNA: text});
      }
      else {
        alert("Invalid DNA sequence pattern");
        this.setState({sequenceDNA: null});
      }
    };
    reader.readAsText(e.target.files[0]);
  }

  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    this.setState({namaPenyakit:""});
  }

  render() {
    return (
      <div width="100%">
        <Navigation/>
        <Container style={{marginTop:"50px", marginBottom: "60px", fontSize: "40px", fontWeight:"bolder"}}>
            TAMBAHKAN PENYAKIT
        </Container>
        <Container style={{marginLeft:"25%", width: "50%", padding: "40px", borderRadius: "20px", boxShadow: "0px 1px 8px 3px rgba(0, 0, 0, 0.25)"}}>
          <Form>
            <Form.Group className='mb-3' controlId='formFile'>
              <Form.Label>Sequence DNA</Form.Label>
              <Form.Control 
                type='file' 
                accept='.txt'
                onChange={this.onUpload}
              />
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
