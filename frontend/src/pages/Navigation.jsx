import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';

function Navigation() {
  return (
    <Navbar fixed='top' expand='sm' variant='dark' style={{height:"80px"}}>
		<Container fluid>
			<Navbar.Brand href='/' style={{padding: "15px", fontSize: "25px"}}><b>KHDunia</b></Navbar.Brand>
			<Nav>
					<Nav.Link href='/TesDNA'>Tes DNA</Nav.Link>
					<Nav.Link href='/TambahPenyakit'>Tambah Penyakit</Nav.Link>
					<Nav.Link href='/RiwayatPenyakit' >Riwayat Penyakit</Nav.Link>
					<Nav.Link href='/TentangKami'>Tentang Kami</Nav.Link>
			</Nav>
		</Container>
    </Navbar>
  );
}


export default Navigation;