import React from "react";
import axios from "axios";
import "../style/style.css";
import Navigation from "./Navigation";
import { Button, Container, Form } from "react-bootstrap";

class TambahPenyakit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sequencedna: "",
      namapenyakit: "",
    };
    this.URL = "http://localhost:12392";
  }

  onChange = (e) => {
    this.setState({ namapenyakit: e.target.value });
  };

  onUpload = async (e) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      const validPattern = /[^AGCT]/g;
      const check = text.match(validPattern);
      if (check === null) {
        this.setState({ sequencedna: text });
      } else {
        alert("Invalid DNA sequence pattern");
        this.setState({ sequencedna: "" });
      }
    };
    reader.readAsText(e.target.files[0]);
  };

  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    axios({
      method: "post",
      url: this.URL + "/buatPenyakit",
      data: this.state,
    }).then(() => {
      alert("Penyakit Berhasil Ditambahkan");
    });
    this.setState({ namapenyakit: "", sequencedna: "" });
  };

  render() {
    return (
      <div>
        <div className="elips medium center border-left" />
        <div className="elips big center bottom" />
        <div className="elips small top border-right" />
        <Navigation />
        <Container className="title tambah">TAMBAHKAN PENYAKIT</Container>
        <Container className="boxpad tambah">
          <Form>
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
              <Form.Label>Nama Penyakit</Form.Label>
              <Form.Control
                size="lg"
                type="text"
                value={this.state.namapenyakit}
                placeholder="Nama Penyakit"
                onChange={this.onChange}
              />
            </Form.Group>
            <Button
              type="submit"
              onClick={this.onSubmit}
              disabled={
                this.state.namapenyakit === "" || this.state.sequencedna === ""
              }
            >
              Upload
            </Button>
          </Form>
        </Container>
      </div>
    );
  }
}

export default TambahPenyakit;
