import React from "react";
import axios from "axios";
import "../style/style.css";
import Navigation from "./Navigation";
import { Button, Container, Form, Row, Col } from "react-bootstrap";

class TesDNA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tanggal: "",
      printedNama: "",
      printedPenyakit: "",
      kemiripan: "",
      hasil: "",
      namaPengguna: "",
      namaPenyakit: "",
      sequenceDNA: "",
    };
    this.URL = "https://sxf-dnamatching-backend.herokuapp.com";
  }

  onChangePengguna = (e) => {
    this.setState({ namaPengguna: e.target.value });
  };

  onChangePenyakit = (e) => {
    this.setState({ namaPenyakit: e.target.value });
  };

  onUpload = async (e) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      const validPattern = /[^AGCT]/g;
      const check = text.match(validPattern);
      if (check === null) {
        this.setState({ sequenceDNA: text });
      } else {
        alert("Invalid DNA sequence pattern");
        this.setState({ sequenceDNA: "" });
      }
    };
    reader.readAsText(e.target.files[0]);
  };

  onSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: this.URL + "/buatRiwayat",
      data: {
        nama: this.state.namaPengguna,
        namapenyakit: this.state.namaPenyakit,
        sequencedna: this.state.sequenceDNA,
      },
    }).then((response) => {
      if (response.data.message === "error") {
        alert(response.data.data.data);
      } else {
        this.setState({ tanggal: response.data.data.data.tanggal + " / " });
        this.setState({ printedNama: response.data.data.data.nama + " / " });
        this.setState({ printedPenyakit: response.data.data.data.namapenyakit + "   " });
        this.setState({ kemiripan: response.data.data.data.kemiripan });
        alert("Tes telah selesai!");
      }
    });
    // ini buat ngosongin tampilan
    this.setState({ namaPengguna: "" });
    this.setState({ namaPenyakit: "" });
  };

  render() {
    return (
      <div>
        <div className="elips big top border-right" />
        <div className="elips medium bottom left" />
        <div className="elips small center top" />
        <Navigation />
        <Row>
          <Col sm={6}>
            <Container className="title tes">TES DNA</Container>
            <Container className="boxpad tes">
              <Form>
                <Form.Group className="mb-5" controlId="formBasicText">
                  <Form.Label>Nama Pengguna</Form.Label>
                  <Form.Control
                    size="lg"
                    type="text"
                    placeholder="Nama Pengguna"
                    value={this.state.namaPengguna}
                    onChange={this.onChangePengguna}
                  />
                </Form.Group>
                <Form.Group className="mb-5" controlId="formFile">
                  <Form.Label>Sequence DNA</Form.Label>
                  <Form.Control
                    style={{ alignItems: "center" }}
                    size="lg"
                    type="file"
                    accept=".txt"
                    onChange={this.onUpload}
                  />
                </Form.Group>
                <Form.Group className="mb-5" controlId="formBasicText">
                  <Form.Label>Prediksi Penyakit</Form.Label>
                  <Form.Control
                    size="lg"
                    type="text"
                    placeholder="Nama Penyakit"
                    value={this.state.namaPenyakit}
                    onChange={this.onChangePenyakit}
                  />
                </Form.Group>
                <Button
                  type="submit"
                  onClick={this.onSubmit}
                  disabled={
                    this.state.namaPengguna === "" ||
                    this.state.namaPenyakit === "" ||
                    this.state.sequenceDNA === ""
                  }
                >
                  Upload
                </Button>
              </Form>
            </Container>
          </Col>
          <Col sm={6}>
            <Container className="subtitle">Hasil Tes</Container>
            <p className="result">
              {this.state.tanggal} {this.state.printedNama}
              {this.state.printedPenyakit} {this.state.hasil}
              <br />
              <br />
              Kemiripan:
            </p>
            <p className="similarity">{this.state.kemiripan}</p>
          </Col>
        </Row>
      </div>
    );
  }
}

export default TesDNA;
