import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import RiwayatPenyakit from '../pages/RiwayatPenyakit';
import TambahPenyakit from '../pages/TambahPenyakit';
import TentangKami from '../pages/TentangKami';
import LamanUtama from '../pages/LamanUtama';
import TesDNA from '../pages/TesDNA';
import Footer from '../pages/Footer';


const App = () => {
  return (
    <div className="App">
      <body class="d-flex flex-column min-vh-100">
        <Routes>
          <Route path="/" element={<LamanUtama/>} />
          <Route path="/TentangKami" element={<TentangKami />} />
          <Route path="/TambahPenyakit" element={<TambahPenyakit />} />
          <Route path="/RiwayatPenyakit" element={<RiwayatPenyakit />} />
          <Route path="/TesDNA" element={<TesDNA />} />
        </Routes>
      </body>
      <Footer />
    </div>
  );
}

export default App;
