package main

import (
	"fmt"
	"net/http"

	vhttp "versus/http"
	"versus/ws"
)

func main() {
	fs := http.FileServer(http.Dir("./html"))
	http.Handle("/", fs)

	// http
	http.HandleFunc("/api/http/fb", vhttp.HandleFB)
	http.HandleFunc("/api/http/json", vhttp.HandleJSON)

	// ws
	http.HandleFunc("/api/ws/fb", ws.HandleFB)
	http.HandleFunc("/api/ws/json", ws.HandleJSON)

	fmt.Println("Start")
	err := http.ListenAndServe("127.0.0.1:8000", nil)
	if err != nil {
		fmt.Println(err)
	}
}
