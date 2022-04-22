import React from 'react';
import '../style/style.css';
import { Container, Image, Col, Row } from 'react-bootstrap';
import ReactTypingEffect from 'react-typing-effect';

const LamanUtama = () => {
    return (
      <div>
        <div className='elips top left medium'/>
        <div className='elips bottom right big'/>
        <Container className='homepage'>
          <ReactTypingEffect 
            className='typingtext' 
            text='WELCOME TO DNA-MATCHING' 
            typingDelay='700' 
            speed='70'
          />
          <p className='subtext fade-in'>
            Choose Our Services
          </p>
          <Row className='fade-in'>
            <Col sm={4}>
              <a href="/TambahPenyakit" className='button'>
                <Image className='main' src="./covid-test.png"/>
                <br/>
                <b className='main'>Tambah Penyakit</b>
              </a>
            </Col>
            <Col sm={4}>
              <a href="/TesDNA" className='button'>
                <Image className='main' src="./dna.png"/>
                <br/>
                <b className='main'>Tes DNA</b>
              </a>
            </Col>
            <Col sm={4}>
              <a href="/RiwayatPenyakit" className='button'>
                <Image className='main' src="./notes.png"/>
                <br/>
                <b className='main'>Cek Riwayat</b>
              </a>
            </Col>
          </Row>
        </Container>
      </div>
    );
}

export default LamanUtama;
