import React from 'react';
import Navigation from './Navigation';
import { Container, Table, Form, Button } from 'react-bootstrap';

const RiwayatPenyakit = () => {
  const [query, setQuery] = React.useState("");

  // dummy data
  const [result, setResult] = React.useState([
    {no: 1, tanggal: "2008-08-08", namaPengguna: "Ujang", namaPenyakit: "Panu", hasil: "True"},
    {no: 2, tanggal: "2007-07-07", namaPengguna: "Mang Ujang", namaPenyakit: "Panu", hasil: "True"},
    {no: 3, tanggal: "2006-06-06", namaPengguna: "Poppi", namaPenyakit: "Panu", hasil: "True"},
    {no: 4, tanggal: "2005-05-05", namaPengguna: "Ula", namaPenyakit: "Panu", hasil: "True"},
    {no: 5, tanggal: "2004-04-04", namaPengguna: "Melani", namaPenyakit: "Panu", hasil: "True"},
    {no: 6, tanggal: "2003-03-03", namaPengguna: "Pacar Melani", namaPenyakit: "Panu", hasil: "True"},
    {no: 7, tanggal: "2002-02-02", namaPengguna: "Ibu Melani", namaPenyakit: "Panu", hasil: "True"},
  ]);

  const handleSubmit = (e) => {
    setQuery(e.target.value);
    console.log(query); // SEND QUERY
    // setResult(hasil query)
    setQuery("");
  }

  return (
    <div style={{marginBottom:"70px"}}>
      <Navigation/>
      <Container style={{marginTop:"50px", marginBottom: "35px", fontSize: "35px", fontWeight:"bolder"}}>
          RIWAYAT TES
      </Container>
      <Container style={{width: "35%"}}>
        <Form>
          <Form.Group className='mb-3' controlId='formBasicText'>
              <Form.Control
                style={{borderRadius:"30px", textAlign:"center"}}
                type='text' 
                value={query}
                placeholder='Tanggal/Nama Penyakit'
                onChange={(e) => setQuery(e.target.value)}
              />
          </Form.Group>
          <Button 
              style={{marginBottom: "40px"}}
              type='submit' 
              variant='outline-success'
              onClick={handleSubmit}
              disabled={(query === "")}
            >
                CARI
            </Button>
        </Form>
      </Container>
      <Container style={{justifyContent:"center", padding: "20px", width: "80%", borderRadius: "20px", boxShadow: "0px 1px 8px 3px rgba(0, 0, 0, 0.25)"}}>
        <Table responsive="sm">
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
            {result.map(item => {
              return (
                <tr key={item.no}>
                  <td>{item.no}</td>
                  <td>{item.tanggal}</td>
                  <td>{item.namaPengguna}</td>
                  <td>{item.namaPenyakit}</td>
                  <td>{item.hasil}</td>
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

