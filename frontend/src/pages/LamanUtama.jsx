import React from 'react';
import {Card, CardGroup, Container } from "react-bootstrap";
import Footer from './Footer';

function LamanUtama() {
  return (
    <Container style={{marginTop:"60px", paddingLeft:"10vw", paddingRight:"10vw"}}>
      <Container style={{marginBottom: "20px", fontSize: "40px", color:"#31D580", fontWeight:"bolder"}}>
        WELCOME TO DNA-MATCHING
      </Container>
      <p style={{fontSize:"25px", marginBottom: "15px"}}>
        Choose Our Services
      </p>
      <Container>
        <CardGroup>
          <Card>
            <Card.Img variant="top" src="./covid-test.png"/>
            <Card.Body>
              <Card.Title>Tambah Penyakit</Card.Title>
              <Card.Text>
                Menambah penyakit baru dengan mengunggah sequence DNA
              </Card.Text>
            </Card.Body>
            <a href="/TambahPenyakit" class="btn" style={{backgroundColor: "#26CD8A", color: "white"}}>Click Here</a>
          </Card>
          <Card>
            <Card.Img variant="top" src="./dna.png" />
            <Card.Body>
              <Card.Title>Tes DNA</Card.Title>
              <Card.Text>
                Membuktikan dugaan penyakit yang diidap melalui pengecekan DNA
              </Card.Text>
            </Card.Body>
            <a href="/TesDNA" class="btn" style={{backgroundColor: "#26CD8A", color: "white"}}>Click Here</a>
          </Card>
          <Card>
            <Card.Img variant="top" src="./notes.png" />
            <Card.Body>
              <Card.Title>Cek Riwayat</Card.Title>
              <Card.Text>
                Melihat riwayat penyakit yang pernah dicek di KHDunia
              </Card.Text>
            </Card.Body>
            <a href="/RiwayatPenyakit" class="btn" style={{backgroundColor: "#26CD8A", color: "white"}}>Click Here</a>
          </Card>
        </CardGroup>
      </Container>
    </Container>
  );
}



export default LamanUtama;