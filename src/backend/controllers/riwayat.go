package controllers

import (
	"fmt"
	"main/configs"
	"main/models"
	"main/responses"
	"net/http"
	"time"

	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/net/context"
)

var riwayatCollection *mongo.Collection = configs.GetCollection(configs.DB, "riwayat")
var validate = validator.New()

func GetRiwayat(c echo.Context) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	var riwayat models.RiwayatRequest
	var hasilRiwayat []models.Riwayat
	defer cancel()
	var err error

	// extract body
	if err := c.Bind(&riwayat); err != nil {
		return newError(c, err)
	}

	Tanggal := riwayat.Tanggal
	NamaPenyakit := riwayat.NamaPenyakit
	var results *mongo.Cursor

	query := bson.M{}
	if NamaPenyakit != "" {
		query["namapenyakit"] = riwayat.NamaPenyakit
	}

	if len(Tanggal) == 7 {
		// if the format is yyyy-mm
		// so we loop for a WHOLE MONTH
		for i := 0; i < 31; i++ {
			query["tanggal"] = fmt.Sprintf("%s-%02d", Tanggal, i+1)
			results, err = riwayatCollection.Find(ctx, query)
			if err != nil {
				return newError(c, err)
			}

			//reading from the db in an optimal way
			defer results.Close(ctx)
			for results.Next(ctx) {
				var singleRiwayat models.Riwayat
				if err = results.Decode(&singleRiwayat); err != nil {
					return newError(c, err)
				}
				hasilRiwayat = append(hasilRiwayat, singleRiwayat)
			}
		}
	} else if len(riwayat.Tanggal) == 5 {
		// if the format is mm-dd
		// so we loop for a WHOLE YEAR
		// KARENA BARU DIBANGUN 2022, JADI CUMAN CEK TAHUN 2022 YA GES YA
		query["tanggal"] = fmt.Sprintf("2022-%s", Tanggal)
		results, err = riwayatCollection.Find(ctx, query)
		if err != nil {
			return newError(c, err)
		}

		defer results.Close(ctx)
		for results.Next(ctx) {
			var singleRiwayat models.Riwayat
			if err = results.Decode(&singleRiwayat); err != nil {
				return newError(c, err)
			}
			hasilRiwayat = append(hasilRiwayat, singleRiwayat)
		}
	} else {
		if Tanggal != "" {
			query["tanggal"] = riwayat.Tanggal
		}

		results, err = riwayatCollection.Find(ctx, query)
		if err != nil {
			return newError(c, err)
		}

		defer results.Close(ctx)
		for results.Next(ctx) {
			var singleRiwayat models.Riwayat
			if err = results.Decode(&singleRiwayat); err != nil {
				return newError(c, err)
			}
			hasilRiwayat = append(hasilRiwayat, singleRiwayat)
		}
	}

	return c.JSON(http.StatusOK, responses.Response{Status: http.StatusOK, Message: "success", Data: &echo.Map{"data": hasilRiwayat}})
}

func CreateRiwayat(c echo.Context) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	var tesDNA models.TesDNA
	var riwayat models.Riwayat

	if err := c.Bind(&tesDNA); err != nil {
		return newError(c, err)
	}

	res := cekDNA(tesDNA.NamaPenyakit, tesDNA.SequenceDNA, tesDNA.JenisProsedur)
	if res.Similarity == -1 {
		return c.JSON(http.StatusOK, responses.Response{Status: http.StatusOK, Message: "error", Data: &echo.Map{"data": "Nama penyakit tidak ditemukan, harap tambahkan pada tab TAMBAH PENYAKIT"}})
	}

	riwayat.Tanggal = time.Now().Format("2006-01-02")
	riwayat.Nama = tesDNA.Nama
	riwayat.NamaPenyakit = tesDNA.NamaPenyakit
	riwayat.Kemiripan = fmt.Sprintf("%2.f ", res.Similarity) + "%"
	riwayat.Prediksi = res.Verdict

	_, err := riwayatCollection.InsertOne(ctx, riwayat)
	if err != nil {
		return newError(c, err)
	}

	return c.JSON(http.StatusOK, responses.Response{Status: http.StatusOK, Message: "success", Data: &echo.Map{"data": riwayat}})
}
