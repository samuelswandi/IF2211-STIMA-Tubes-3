import React from "react";
import axios from "axios";
import "../style/style.css";
import Navigation from "./Navigation";
import { Container, Table, Form, Button } from "react-bootstrap";

const RiwayatPenyakit = () => {
  const URL = "http://localhost:35783";
  const [queryDate, setQueryDate] = React.useState("");
  const [queryName, setQueryName] = React.useState("");
  const [result, setResult] = React.useState([]);

  React.useEffect(() => {
    axios({
      method: "post",
      url: URL + "/cariRiwayat",
      data: {
        tanggal: "",
        namapenyakit: "",
      },
    }).then((response) => {
      if (!response.data.data.data) {
        setResult([
          { no: 0, nama: "-", tanggal: "-", namapenyakit: "-", prediksi: 0.0 },
        ]);
      } else {
        let count = 1;
        response.data.data.data.forEach((element) => {
          element.no = count;
          count++;
        });
        setResult(response.data.data.data);
      }
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("date: " + queryDate);
    console.log("nama: " + queryName);

    axios({
      method: "post",
      url: URL + "/cariRiwayat",
      data: {
        tanggal: queryDate,
        namapenyakit: queryName,
      },
    }).then((response) => {
      if (!response.data.data.data) {
        setResult([
          { no: 0, nama: "-", tanggal: "-", namapenyakit: "-", prediksi: "-" },
        ]);
      } else {
        let count = 1;
        response.data.data.data.forEach((element) => {
          element.no = count;
          count++;
        });
        setResult(response.data.data.data);
      }
    });

    setQueryDate("");
    setQueryName("");
  };

  return (
    <div>
      <div className="elips big center border-right" />
      <div className="elips medium top border-left" />
      <Navigation />
      <Container className="title riwayat">RIWAYAT TES</Container>
      <Container className="searchbar">
        <Form
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <Form.Group
            className="mb-3"
            controlId="formBasicText"
            style={{ width: "100%" }}
          >
            <Form.Control
              size="lg"
              type="text"
              value={queryName}
              placeholder="Nama Penyakit"
              onChange={(e) => setQueryName(e.target.value)}
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="formBasicText"
            style={{ width: "100%" }}
          >
            <Form.Control
              size="lg"
              type="date"
              value={queryDate}
              placeholder="Tanggal"
              onChange={(e) => setQueryDate(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" onClick={(e) => handleSubmit(e)}>
            CARI
          </Button>
        </Form>
      </Container>
      <Container className="boxpad riwayat">
        <Table responsive="sm" className="table-text">
          <thead>
            <tr>
              <th>No.</th>
              <th>Tanggal</th>
              <th>Nama Pengguna</th>
              <th>Nama Penyakit</th>
              <th>Hasil Tes DNA</th>
            </tr>
          </thead>
          <tbody>
            {result.map((data) => {
              return (
                <tr key={data.no}>
                  <td>{data.no}</td>
                  <td>{data.tanggal}</td>
                  <td>{data.nama}</td>
                  <td>{data.namapenyakit}</td>
                  <td>{data.prediksi.toString()}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default RiwayatPenyakit;
