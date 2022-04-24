package main

import (
	"main/configs"
	"main/routes"
	"os"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	e := echo.New()

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"https://localhost:3000", "http://localhost:3000"},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
	}))

	//run database
	configs.ConnectDB()

	routes.UserRoute(e)

	port, _ := os.LookupEnv("PORT")
	e.Logger.Fatal(e.Start(":" + port))
}
