package models

type TesDNA struct {
	Nama         string `json:"nama" validate:"required"`
	SequenceDNA  string `json:"sequence_dna" validate:"required"`
	NamaPenyakit string `json:"nama_penyakit" validate:"required"`
}

type Riwayat struct {
	Tanggal   string `json:"tanggal,omitempty"`
	Nama      string `json:"nama,omitempty" validate:"required"`
	Penyakit  string `json:"penyakit,omitempty" validate:"required"`
	Kemiripan string `json:"kemiripan,omitempty" validate:"required"`
	Prediksi  bool   `json:"prediksi,omitempty" validate:"required"`
}

type RiwayatRequest struct {
	Tanggal      string `json:"tanggal,omitempty"`
	NamaPenyakit string `json:"nama_penyakit,omitempty"`
}

type Penyakit struct {
	NamaPenyakit string `json:"nama_penyakit,omitempty" validate:"required"`
	SequenceDNA  string `json:"sequence_dna,omitempty" validate:"required"`
}
