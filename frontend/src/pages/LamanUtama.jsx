import React from 'react';
import { Container, Image, Col, Row } from 'react-bootstrap';
import ReactTypingEffect from 'react-typing-effect';

const LamanUtama = () => {
    return (
      <Container className="fade-in" style={{marginTop:"60px", paddingLeft:"10vw", paddingRight:"10vw"}}>
        <ReactTypingEffect text="WELCOME TO DNA-MATCHING" typingDelay="500" style={{marginBottom: "20px", fontSize: "3.5vw", color:"#31D580", fontWeight:"bolder"}}>
          WELCOME TO DNA-MATCHING
        </ReactTypingEffect>
        <p style={{fontSize:"2vw", marginBottom: "30px"}}>
          Choose Our Services
        </p>
        <Row style={{height:"30vh"}}>
          <Col sm={4}>
            <a href="/TambahPenyakit" className='button'>
              <Image src="./covid-test.png" width="80%" style={{marginBottom: "30px"}}/>
              <br/>
              <b style={{marginTop: "50px"}}>Tambah Penyakit</b>
            </a>
          </Col>
          <Col sm={4}>
            <a href="/TesDNA" className='button'>
              <Image src="./dna.png" width="80%" style={{marginBottom: "30px"}}/>
              <br/>
              <b style={{marginTop: "50px"}}>Tes DNA</b>
            </a>
          </Col>
          <Col sm={4}>
            <a href="/RiwayatPenyakit" className='button'>
              <Image src="./notes.png" width="80%" style={{marginBottom: "30px"}}/>
              <br/>
              <b style={{marginTop: "50px"}}>Cek Riwayat</b>
            </a>
          </Col>
        </Row>
      </Container>
    );
}

export default LamanUtama;
