import React from "react";
import "../style/style.css";
import { Container, Nav, Navbar } from "react-bootstrap";

const Navigation = () => {
  return (
    <Navbar fixed="top" expand="sm" variant="dark">
      <Container fluid style={{ fontSize: "20px", color: "white" }}>
        <Navbar.Brand href="/">
          <b>KHDunia</b>
        </Navbar.Brand>
        <Nav>
          <Nav.Link href="/TambahPenyakit">Tambah Penyakit</Nav.Link>
          <Nav.Link href="/TesDNA">Tes DNA</Nav.Link>
          <Nav.Link href="/RiwayatPenyakit">Riwayat Penyakit</Nav.Link>
          <Nav.Link href="/TentangKami">Tentang Kami</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navigation;
