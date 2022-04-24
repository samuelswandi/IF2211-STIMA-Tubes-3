package controllers

import (
	"main/configs"
	"main/models"
	"main/responses"
	"net/http"
	"time"

	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/net/context"
)

var penyakitCollection *mongo.Collection = configs.GetCollection(configs.DB, "penyakit")

func GetPenyakit(c echo.Context) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	var penyakit []models.Penyakit
	defer cancel()

	results, err := penyakitCollection.Find(ctx, bson.M{})

	if err != nil {
		return newError(c, err)
	}

	//reading from the db in an optimal way
	defer results.Close(ctx)
	for results.Next(ctx) {
		var singlePenyakit models.Penyakit
		if err = results.Decode(&singlePenyakit); err != nil {
			return newError(c, err)
		}
		penyakit = append(penyakit, singlePenyakit)
	}

	return c.JSON(http.StatusOK, responses.Response{Status: http.StatusOK, Message: "success", Data: &echo.Map{"data": penyakit}})
}

func CreatePenyakit(c echo.Context) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var penyakit models.Penyakit
	if err := c.Bind(&penyakit); err != nil {
		return newError(c, err)
	}

	if err := validate.Struct(penyakit); err != nil {
		return newError(c, err)
	}

	_, err := penyakitCollection.InsertOne(ctx, penyakit)
	if err != nil {
		return newError(c, err)
	}

	return c.JSON(http.StatusOK, responses.Response{Status: http.StatusOK, Message: "success", Data: &echo.Map{"data": penyakit}})
}


func getPenyakit(nama string) models.Penyakit {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var penyakit models.Penyakit
	err := penyakitCollection.FindOne(ctx, bson.M{"nama_penyakit": nama}).Decode(&penyakit)
	if err != nil {
		return penyakit
	}

	return penyakit
}
