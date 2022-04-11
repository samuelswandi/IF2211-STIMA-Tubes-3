package routes

import (
	"main/controllers"

	"github.com/labstack/echo/v4"
)

func UserRoute(e *echo.Echo) {
	//All routes related to users comes here
	e.POST("/createUsers", controllers.CreateUser)
	e.GET("/getAllUsers", controllers.GetAllUsers)
}
