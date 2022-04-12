package controllers

import (
	"github.com/labstack/echo/v4"
)

func CekDNA(c echo.Context) error {
	return nil
	// ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	// defer cancel()

	// body := make(map[string]interface{})
	// err := json.NewDecoder(c.Request().Body).Decode((&body))
	// if err != nil {
	// 	return newError(c, err)
	// }

	// NamaPenyakit := body["nama_penyakit"]
	// DNAUser := body["sequence_dna"]

	// arrayOfPenyakit := getPenyakit()
	// for _, v := range arrayOfPenyakit {
	// 	if v.NamaPenyakit == NamaPenyakit {
	// 		// KMP
	// 		err := KMP(DNAUser, v.SequenceDNA)
	// 		if err != nil {
	// 			return newError(c, err)
	// 		}
	// 		// BM
	// 		err = BM(DNAUser, v.SequenceDNA)
	// 		if err != nil {
	// 			return newError(c, err)
	// 		}
	// 	}
	// }

	// return c.JSON(http.StatusOK, responses.Response{Status: http.StatusOK, Message: "success", Data: &echo.Map{"data": penyakit}})
}

func KMP(DNAUser string, DNAPenyakit string) error {
	// check penyakit dulu, cari dari getPenyakit
	// nanti return array of []models.Penyakit,
	// looping ke array of []models.Penyakit,
	// cari yang namaPenyakitnya sesuai dengan namaPenyakit yang diinputkan
	// kalo bener, return json true,
	// sama buat riwayat pake CreateRiwayat
	return nil
}

func BM(DNAUser string, DNAPenyakit string) error {
	return nil
}
