import React from 'react';
import Navigation from './Navigation';
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import { PieChart } from "react-minimal-pie-chart";


export default class TesDNA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tanggal: "",
      tempNama: "",
      tempPenyakit: "",
      namaPengguna: "",
      sequenceDNA: null,
      namaPenyakit: ""
    };
  }

  onChangePengguna = (e) => {
    this.setState({namaPengguna: e.target.value});
  }

  onChangePenyakit = (e) => {
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
    }
    reader.readAsText(e.target.files[0]);
  }

  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    const today = new Date().toISOString().slice(0, 10);
    this.setState({tanggal: today});
    this.setState({tempNama: this.state.namaPengguna});
    this.setState({tempPenyakit: this.state.namaPenyakit});
    this.setState({namaPengguna:""});
    this.setState({namaPenyakit:""});
  }

  render() {
    return (
      <div>
        <Navigation/>
        <Row>
          <Col sm={6}>
            <Container style={{marginTop:"100px", marginBottom: "60px", fontSize: "35px", fontWeight:"bolder"}}>
                TES DNA
            </Container>
            <Container style={{marginLeft:"20%", width: "60%", padding: "40px", borderRadius: "20px", boxShadow: "0px 1px 8px 3px rgba(0, 0, 0, 0.25)"}}>
              <Form>
                <Form.Group className='mb-3' controlId='formBasicText'>
                  <Form.Label>Nama Pengguna</Form.Label>
                  <Form.Control 
                    type='text' 
                    placeholder='Nama Pengguna'
                    value={this.state.namaPengguna}
                    onChange = {this.onChangePengguna}
                  />
                </Form.Group>
                <Form.Group className='mb-3' controlId='formFile'>
                  <Form.Label>Sequence DNA</Form.Label>
                  <Form.Control 
                    type='file' 
                    accept='.txt'
                    onChange={this.onUpload}
                  />
                </Form.Group>
                <Form.Group className='mb-3' controlId='formBasicText'>
                  <Form.Label>Prediksi Penyakit</Form.Label>
                  <Form.Control 
                    type='text' 
                    placeholder='Nama Penyakit'
                    value={this.state.namaPenyakit}
                    onChange={this.onChangePenyakit}
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
          </Col>
          <Col sm={6}>
            <Container style={{marginTop:"130px", marginBottom:"10px", fontSize: "20px", zIndex:"0"}}>
                Hasil Tes
            </Container>
            <p>{this.state.tanggal} / {this.state.tempNama} / {this.state.tempPenyakit} / True (DUMMY)</p>
            <PieChart
              style={{width:"40%", marginTop: "-5vw"}}
              data={[
                {title:'Cocok', value: 10, color: '#04CC9D'},
                {title:'Tidak Cocok', value: 90, color: '#09919E'}
              ]}
            />
          </Col>
        </Row>
      </div>
      );
  }
}

