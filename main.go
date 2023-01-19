package main

import (
	"fmt"
	"log"
	"net/http"
	"strings"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{} // use default options

func main() {
	fs := http.FileServer(http.Dir("./html"))
	http.Handle("/", fs)
	http.HandleFunc("/api/small", small)
	http.HandleFunc("/api/big", big)

	http.HandleFunc("/api/ws", echo)

	err := http.ListenAndServe(":8000", nil)
	if err != nil {
		fmt.Println(err)
	}
}

func small(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "smol")
}

func big(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, strings.Repeat("big", 1000))
}

func echo(w http.ResponseWriter, r *http.Request) {
	c, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Print("upgrade:", err)
		return
	}
	fmt.Println("connected")
	defer func() {
		c.Close()
		fmt.Println("disconnected")
	}()

	for {
		mt, _, err := c.ReadMessage()
		if err != nil {
			log.Println("read:", err)
			break
		}
		err = c.WriteMessage(mt, []byte("smol"))
		if err != nil {
			log.Println("write:", err)
			break
		}
	}
}
