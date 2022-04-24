import React from 'react';
import axios from 'axios';
import '../style/style.css';
import Navigation from './Navigation';
import { Container, Table, Form, Button } from 'react-bootstrap';

const RiwayatPenyakit = () => {
  const URL = "https://localhost:6000";
  const [query, setQuery] = React.useState("");
  const [result, setResult] = React.useState([
    {no: 1, tanggal: "2008-08-08", namaPengguna: "Ujang", namaPenyakit: "Panu", hasil: "True"},
    {no: 2, tanggal: "2007-07-07", namaPengguna: "Mang Ujang", namaPenyakit: "Panu", hasil: "True"},
    {no: 3, tanggal: "2006-06-06", namaPengguna: "Poppi", namaPenyakit: "Panu", hasil: "True"},
    {no: 4, tanggal: "2005-05-05", namaPengguna: "Ula", namaPenyakit: "Panu", hasil: "True"},
    {no: 5, tanggal: "2004-04-04", namaPengguna: "Melani", namaPenyakit: "Panu", hasil: "True"},
    {no: 6, tanggal: "2003-03-03", namaPengguna: "Pacar Melani", namaPenyakit: "Panu", hasil: "True"},
    {no: 7, tanggal: "2002-02-02", namaPengguna: "Ibu Melani", namaPenyakit: "Panu", hasil: "True"},
  ]);

  React.useEffect(() => {
    axios.get(URL, {
      data : {
        tanggal : "",
        nama_penyakit: ""
      }
    })
    .then(response => {
      console.log(response)
    })
  }, [result])

  const handleSubmit = (e) => {
    setQuery(e.target.value)   
    console.log(query); 

      // var data = {
      //   tanggal : "",
      //   nama_penyakit : ""
      // }

      // data[tanggal] = query[0]
      // data[nama_penyakit] = query[1]

      // axios.POST(URL, data)
      //   .then(response => {
      //     setResult(response)
      //   })

    setQuery("");
  }

  return (
    <div>
      <div className='elips big center border-right'/>
      <div className='elips medium top border-left'/>
      <Navigation/>
      <Container className='title riwayat'>
          RIWAYAT TES
      </Container>
      <Container className='searchbar'>
        <Form>
          <Form.Group className='mb-3' controlId='formBasicText'>
              <Form.Control
                size='lg'
                type='text' 
                value={query}
                placeholder='Tanggal/Nama Penyakit'
                onChange={(e) => setQuery(e.target.value)}
              />
          </Form.Group>
          <Button 
            type='submit' 
            onClick={handleSubmit}
            disabled={(query === "")}
          >
            CARI
          </Button>
        </Form>
      </Container>
      <Container className='boxpad riwayat'>
        <Table responsive="sm" className='table-text'>
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
            {result.map(data => {
              return (
                <tr key={data.no}>
                  <td>{data.no}</td>
                  <td>{data.tanggal}</td>
                  <td>{data.namaPengguna}</td>
                  <td>{data.namaPenyakit}</td>
                  <td>{data.hasil}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}


export default RiwayatPenyakit;

