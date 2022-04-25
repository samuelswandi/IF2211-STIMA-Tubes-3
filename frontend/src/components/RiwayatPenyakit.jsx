import React from "react";
import axios from "axios";
import "../style/style.css";
import Navigation from "./Navigation";
import { Container, Table, Form, Button } from "react-bootstrap";

const RiwayatPenyakit = () => {
  const URL = "http://localhost:35783";
  const [query, setQuery] = React.useState("");
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
  
  const months = {
    "januari": "01",
    "februari": "02",
    "maret": "03",
    "april": "04",
    "mei": "05",
    "juni": "06",
    "juli": "07",
    "agustus": "08",
    "september": "09",
    "oktober": "10",
    "november": "11",
    "desember": "12"
  }
    
  const handleSubmit = (e) => {
    e.preventDefault();
    const validDate = /(\s*)\d\d\d\d-\d\d-\d\d(\s*)/;
    let date = "";
    let namaPenyakit = "";
    if (validDate.test(query)) {
      date = (query.match(validDate))[0].replace(/\s/g, '');;
      namaPenyakit = query.replace(validDate, "");
    }
    else {
      const isAllNum = /^\d+$/;
      let day = "";
      let month = "";
      let year = "";
      const words = query.split(/[\s]/);
      words.forEach((word) => {
        if (isAllNum.test(word)) {
          (word.length === 2) ? day = word : year = word;
        }
        else {
          const checkMonth = word.toLowerCase();
          if (checkMonth in months) {
            month = months[checkMonth];
          }
          else {
            if (namaPenyakit !== "") namaPenyakit += " ";
            namaPenyakit += word;
          }
        }
      })
      date = year;
      if (year && month) date += "-";
      date += month;
      if (month && day) date += "-";
      date += day;
    }
    
    axios({
      method: "post",
      url: URL + "/cariRiwayat",
      data: {
        tanggal: date,
        namapenyakit: namaPenyakit,
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

    setQuery("");
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
              value={query}
              placeholder="Tanggal / Nama Penyakit"
              onChange={(e) => setQuery(e.target.value)}
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
