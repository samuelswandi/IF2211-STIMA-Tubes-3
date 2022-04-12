package controllers

import (
	"encoding/json"
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
	var riwayat []models.Riwayat
	defer cancel()
	var err error

	// extract body
	body := make(map[string]interface{})
	err = json.NewDecoder(c.Request().Body).Decode((&body))
	if err != nil {
		return newError(c, err)
	}

	Tanggal := body["tanggal"]
	NamaPenyakit := body["nama_penyakit"]
	var results *mongo.Cursor

	query := bson.M{}

	if Tanggal != "" {
		query["tanggal"] = Tanggal
	}

	if NamaPenyakit != "" {
		query["penyakit"] = NamaPenyakit
	}

	results, err = riwayatCollection.Find(ctx, query)

	defer results.Close(ctx)
	for results.Next(ctx) {
		var singleRiwayat models.Riwayat
		if err = results.Decode(&singleRiwayat); err != nil {
			return newError(c, err)
		}
		riwayat = append(riwayat, singleRiwayat)
	}

	return c.JSON(http.StatusOK, responses.Response{Status: http.StatusOK, Message: "success", Data: &echo.Map{"data": riwayat}})
}

func createRiwayat(c echo.Context) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var riwayat models.Riwayat
	if err := c.Bind(&riwayat); err != nil {
		return newError(c, err)
	}

	if err := validate.Struct(riwayat); err != nil {
		return newError(c, err)
	}

	riwayat.Tanggal = time.Now().Format("2006-01-02")
	_, err := riwayatCollection.InsertOne(ctx, riwayat)
	if err != nil {
		return newError(c, err)
	}

	return c.JSON(http.StatusOK, responses.Response{Status: http.StatusOK, Message: "success", Data: &echo.Map{"data": riwayat}})
}
