import React from "react";
import axios from "axios";
import "../style/style.css";
import Navigation from "./Navigation";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import { PieChart } from "react-minimal-pie-chart";

class TesDNA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tanggal: "",
      printedNama: "",
      printedPenyakit: "",
      namaPengguna: "",
      sequenceDNA: "",
      namaPenyakit: "",
    };
    this.URL = "http://localhost:35783";
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
    const today = new Date().toISOString().slice(0, 10);

    axios({
      method: "post",
      url: this.URL + "/buatRiwayat",
      data: {
        tanggal: this.state.tanggal,
        nama: this.state.namaPengguna,
        namapenyakit: this.state.namaPenyakit,
        kemiripan: "",
        prediksi: true,
      },
    }).then((response) => {
      alert("Tes telah selesai!");
    });
    this.setState({ printedNama: this.state.namaPengguna });
    this.setState({ printedPenyakit: this.state.namaPenyakit });
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
              {this.state.tanggal} / {this.state.printedNama} /{" "}
              {this.state.printedPenyakit} / True (DUMMY)
            </p>
            <PieChart
              data={[
                { title: "Cocok", value: 10, color: "#04CC9D" },
                { title: "Tidak Cocok", value: 90, color: "#09919E" },
              ]}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default TesDNA;
