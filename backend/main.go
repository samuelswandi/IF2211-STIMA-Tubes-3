package main

import (
	"main/configs"
	"main/routes"

	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()

	//run database
	configs.ConnectDB()

	routes.UserRoute(e)

	e.Logger.Fatal(e.Start(":6000"))
}
