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
    {"id": "AZKA", "png": azkapng, "jpg": azkajpg, "quotes": "\"Hidup cuman sekali tapi VTuber sampai mati\""},
    {"id": "DHIKA (Male, 20)", "png": dhikapng, "jpg": dhikajpg, "quotes": "\"Sekali VTuber hidup sampai mati tapi\""},
    {"id": "SEMI", "png": semipng, "jpg": semijpg, "quotes": "\"Hidup VTuber tapi sekali mati sampai\""},
  ]

  const [rotation, setRotation] = React.useState({
    focus: images[1], 
    unfocused1: images[0],
    unfocused2: images[2]
  }) 

  let key = Math.random();
  const { focus, unfocused1, unfocused2 } = rotation;

  const rotateUnfocused1 = (e) => {
    rotateImage(1);
  }

  const rotateUnfocused2 = (e) => {
    rotateImage(2);
  }

  React.useEffect(() => {
    key = Math.random();
  }, [focus, unfocused1, unfocused2])
  
  const rotateImage = async (id) => {
    const temp = focus;
    if (id === 1) {
      setRotation({
        ...rotation,
        focus: unfocused1,
        unfocused1: temp,
      })
    }
    else {
      setRotation({
        ...rotation,
        focus: unfocused2,
        unfocused2: temp,
      })
    }
  };

  return (
    <div>
      <div className='elips bottom left medium'/>
      <div className='elips top right big'/>
      <Navigation/>
      <Container key={key} className='boxpad tentang'>
        <img className='focus bounce-in' src={ focus["png"] } alt=""/>
        <b className='focus bounce-in'>{focus["id"]}</b>
        <p className='focus bounce-in'>{focus["quotes"]}</p>
      </Container>
      <Row>
        <Col>
          <div className='image left' onClick={rotateUnfocused1}>
            <img className='unfocused' src={ unfocused1["jpg"] } alt=""/>
          </div>
        </Col>
        <Col>
          <div className='image' onClick={rotateUnfocused2}>
            <img className='unfocused' src={ unfocused2["jpg"] } alt=""/>
          </div>
        </Col>
      </Row>
    </div>
    );
}

export default TentangKami;

