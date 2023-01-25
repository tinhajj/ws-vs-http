package main

import (
	"fmt"
	"log"
	"net/http"
	"strconv"
	"strings"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{} // use default options
var blocks = map[int]string{}

func main() {
	fs := http.FileServer(http.Dir("./html"))
	http.Handle("/", fs)
	http.HandleFunc("/api/block", handler)
	http.HandleFunc("/api/ws", echo)

	err := http.ListenAndServe(":8000", nil)
	if err != nil {
		fmt.Println(err)
	}
}

func handler(w http.ResponseWriter, r *http.Request) {
	params := r.URL.Query()
	fmt.Fprintf(w, block(params.Get("multiple")))
}

func block(input string) string {
	multiple, _ := strconv.Atoi(input)
	val, ok := blocks[multiple]
	if !ok {
		fmt.Println("caching block multiple:", multiple)
		blocks[multiple] = strings.Repeat("BLOCK", multiple)
		val = blocks[multiple]
	}
	return val
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
		mt, msg, err := c.ReadMessage()
		if err != nil {
			log.Println("read:", err)
			break
		}

		err = c.WriteMessage(mt, []byte(block(string(msg))))

		if err != nil {
			log.Println("write:", err)
			break
		}
	}
}
