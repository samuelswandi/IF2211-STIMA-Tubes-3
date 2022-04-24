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
	e.POST("/cariRiwayat", controllers.GetRiwayat)
	e.POST("/buatRiwayat", controllers.CreateRiwayat)
	e.POST("/buatPenyakit", controllers.CreatePenyakit)
}
