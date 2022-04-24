package routes

import (
	"main/controllers"
	"net/http"

	"github.com/labstack/echo/v4"
)

func UserRoute(e *echo.Echo) {
	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, from KHDunia!")
	})
	e.GET("/getRiwayat", controllers.GetRiwayat)
	e.POST("/createPenyakit", controllers.CreatePenyakit)
}
