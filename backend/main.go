package main

import (
	"os"
	"main/configs"
	"main/routes"

	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()

	//run database
	configs.ConnectDB()

	routes.UserRoute(e)

	port, _ := os.LookupEnv("PORT")
	e.Logger.Fatal(e.Start(":" + port))
	// https://localhost:6000/
}
