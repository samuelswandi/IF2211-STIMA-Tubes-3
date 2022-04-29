package models

type TesDNA struct {
	Nama          string `json:"nama" validate:"required"`
	SequenceDNA   string `json:"sequencedna" validate:"required"`
	NamaPenyakit  string `json:"namapenyakit" validate:"required"`
	JenisProsedur string `json:"jenisprosedur" validate:"required"`
}

type Riwayat struct {
	Tanggal      string `json:"tanggal"`
	Nama         string `json:"nama" validate:"required"`
	NamaPenyakit string `json:"namapenyakit" validate:"required"`
	Kemiripan    string `json:"kemiripan"`
	Prediksi     bool   `json:"prediksi"`
}

type RiwayatRequest struct {
	Tanggal      string `json:"tanggal"`
	NamaPenyakit string `json:"namapenyakit"`
}

type Penyakit struct {
	NamaPenyakit string `json:"namapenyakit,omitempty" validate:"required"`
	SequenceDNA  string `json:"sequencedna,omitempty" validate:"required"`
}
