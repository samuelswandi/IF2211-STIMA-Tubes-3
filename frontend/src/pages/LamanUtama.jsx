import React from 'react';
import { Container, Image } from 'react-bootstrap';
import ReactTypingEffect from 'react-typing-effect';

const LamanUtama = () => {
    return (
      <Container className="fade-in" style={{marginTop:"60px", paddingLeft:"10vw", paddingRight:"10vw"}}>
        <ReactTypingEffect text="WELCOME TO DNA-MATCHING" typingDelay="1000" style={{marginBottom: "20px", fontSize: "40px", color:"#31D580", fontWeight:"bolder"}}>
          WELCOME TO DNA-MATCHING
        </ReactTypingEffect>
        <p style={{fontSize:"25px", marginBottom: "50px"}}>
          Choose Our Services
        </p>
        <div class="row" style={{height:"30vh"}}>
        <div className="col">
            <a href="/TambahPenyakit" className='button'>
              <Image src="./covid-test.png" width="100%" style={{marginBottom: "30px"}}/>
              <b style={{marginTop: "50px"}}>Tambah Penyakit</b>
            </a>
          </div>
          <div className="col">
            <a href="/TesDNA" className='button'>
              <Image src="./dna.png" width="100%" style={{marginBottom: "30px"}}/>
              <b style={{marginTop: "50px"}}>Tes DNA</b>
            </a>
          </div>
          <div className="col">
            <a href="/RiwayatPenyakit" className='button'>
              <Image src="./notes.png" width="100%" style={{marginBottom: "30px"}}/>
              <b style={{marginTop: "50px"}}>Cek Riwayat</b>
            </a>
          </div>
        </div>
          {/* <CardGroup>
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
          </CardGroup> */}
      </Container>
    );
}

export default LamanUtama;