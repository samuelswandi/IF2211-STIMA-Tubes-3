package controllers

import (
	"main/responses"
	"net/http"

	"github.com/labstack/echo/v4"
)

func newError(c echo.Context, err error) error {
	return c.JSON(http.StatusInternalServerError, responses.Response{Status: http.StatusInternalServerError, Message: "error", Data: &echo.Map{"data": err.Error()}})
}
