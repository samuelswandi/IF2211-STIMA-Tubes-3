import React from 'react';
import Navigation from './Navigation';
import { Container, Row, Col } from 'react-bootstrap';
import azkapng from '../assets/azka.png';
import dhikapng from '../assets/dhika.png';
import semipng from '../assets/semi.png';
import azkajpg from '../assets/azka.JPG';
import dhikajpg from '../assets/dhika.JPG';
import semijpg from '../assets/semi.JPG';


const TentangKami = () => {
  const images = [
    {"id": "AZKA", "png": azkapng, "jpg": azkajpg, "quotes": "Hidup cuman sekali tapi VTuber sampai mati"},
    {"id": "DHIKA (Male, 20)", "png": dhikapng, "jpg": dhikajpg, "quotes": "Sekali VTuber hidup sampai mati tapi"},
    {"id": "SEMI", "png": semipng, "jpg": semijpg, "quotes": "Hidup VTuber tapi sekali mati sampai"},
  ]

  const [highlight, setHighlight] = React.useState(images[1])
  const [image1, setImage1] = React.useState(images[0])
  const [image2, setImage2] = React.useState(images[2])

  const rotateImage1 = (e) => {
    rotateImage(1);
  }

  const rotateImage2 = (e) => {
    rotateImage(2);
  }

  const rotateImage = (id) => {
    const temp = highlight;
    if (id === 1) {
      setHighlight(image1);
      setImage1(temp);
    }
    else {
      setHighlight(image2);
      setImage2(temp);
    }
  };

  return (
    <div>
      <Navigation/>
      <Container style={{
        marginTop:"120px", 
        position: "relative",
        width: "65%", 
        height: "18vw", 
        paddingTop: "3vw",
        borderRadius: "50px", 
        textAlign: "left",
        boxShadow: "0px 1px 8px 3px rgba(0, 0, 0, 0.25)"}}
      >
        <img src={ highlight["png"] } alt="" style={{height: "25vw", position: "absolute", bottom: "0", left: "0", borderRadius: "50px"}}/>
        <b style={{marginLeft: "35%", fontSize: "2.5vw", fontWeight: "bold"}}>{highlight["id"]}</b>
        <p style={{marginLeft: "35%", paddingTop:"3%", fontSize: "1.5vw"}}>{highlight["quotes"]}</p>
      </Container>
      <Row>
        <Col>
          <div style={{
            marginTop:"30px",
            marginLeft: "35%",
            width: "65%", 
            height: "130px", 
            borderRadius: "50px", 
            boxShadow: "0px 1px 8px 3px rgba(0, 0, 0, 0.25)"}}
            onClick={rotateImage1}
          >
            <img src={ image1["jpg"] } alt="" style={{width: "100%", height: "100%", objectFit: "cover", borderRadius:"50px"}}/>
          </div>
        </Col>
        <Col>
          <div style={{
            marginTop:"30px", 
            width: "65%", 
            height: "130px", 
            borderRadius: "50px", 
            boxShadow: "0px 1px 8px 3px rgba(0, 0, 0, 0.25)"}}
            onClick={rotateImage2}
          >
            <img src={ image2["jpg"] } alt="" style={{width: "100%", height: "100%", objectFit: "cover", borderRadius:"50px"}}/>
          </div>
        </Col>
      </Row>
    </div>
    );
}

export default TentangKami;

