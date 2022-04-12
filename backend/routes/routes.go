package routes

import (
	"main/controllers"

	"github.com/labstack/echo/v4"
)

func UserRoute(e *echo.Echo) {
	//All routes related to users comes here
	// e.POST("/cekHasilTesDNA", controllers.CekDNA)
	e.POST("/getRiwayat", controllers.GetRiwayat)
	e.POST("/createPenyakit", controllers.CreatePenyakit)
}
