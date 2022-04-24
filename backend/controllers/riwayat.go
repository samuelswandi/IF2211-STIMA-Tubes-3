package controllers

import (
	"fmt"
	"main/configs"
	"main/models"
	"main/responses"
	"net/http"
	"strconv"
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

	if Tanggal != "" {
		query["tanggal"] = riwayat.Tanggal
	}

	if NamaPenyakit != "" {
		query["namapenyakit"] = riwayat.NamaPenyakit
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
	fmt.Println(hasilRiwayat)

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

	if err := validate.Struct(tesDNA); err != nil {
		return newError(c, err)
	}

	res := cekDNA(tesDNA.NamaPenyakit, tesDNA.SequenceDNA, "KMP")
	riwayat.Tanggal = time.Now().Format("2006-01-02")
	riwayat.Nama = tesDNA.Nama
	riwayat.NamaPenyakit = tesDNA.NamaPenyakit
	riwayat.Kemiripan = fmt.Sprintf("%f %", res.Similarity)
	riwayat.Prediksi = res.Verdict


	_, err := riwayatCollection.InsertOne(ctx, riwayat)
	if err != nil {
		return newError(c, err)
	}

	return c.JSON(http.StatusOK, responses.Response{Status: http.StatusOK, Message: "success", Data: &echo.Map{"data": riwayat}})
}
