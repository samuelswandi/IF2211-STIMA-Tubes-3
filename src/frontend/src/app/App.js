import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import RiwayatPenyakit from '../components/RiwayatPenyakit';
import TambahPenyakit from '../components/TambahPenyakit';
import TentangKami from '../components/TentangKami';
import LamanUtama from '../components/LamanUtama';
import TesDNA from '../components/TesDNA';
import Footer from '../components/Footer';


const App = () => {
  return (
    <div className="App">
      <div className="d-flex flex-column min-vh-100">
        <Routes>
          <Route path="/" element={<LamanUtama/>} />
          <Route path="/TentangKami" element={<TentangKami />} />
          <Route path="/TambahPenyakit" element={<TambahPenyakit />} />
          <Route path="/RiwayatPenyakit" element={<RiwayatPenyakit />} />
          <Route path="/TesDNA" element={<TesDNA />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
