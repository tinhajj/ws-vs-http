package ws

import (
	"log"
	"net/http"
	"strconv"
	"versus/cache"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{} // use default options

func HandleFB(w http.ResponseWriter, r *http.Request) {
	c, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Print("failed to upgrade:", err)
		return
	}
	defer func() {
		c.Close()
	}()

	for {
		mt, msg, err := c.ReadMessage()

		if err != nil {
			log.Println("read:", err)
			break
		}

		multiple, _ := strconv.Atoi(string(msg))

		err = c.WriteMessage(mt, cache.GetBlock(multiple, cache.FlatBuffer))

		if err != nil {
			log.Println("write:", err)
			break
		}
	}
}

func HandleJSON(w http.ResponseWriter, r *http.Request) {
	c, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Print("failed to upgrade:", err)
		return
	}
	defer func() {
		c.Close()
	}()

	for {
		mt, msg, err := c.ReadMessage()

		if err != nil {
			log.Println("read:", err)
			break
		}

		multiple, _ := strconv.Atoi(string(msg))

		err = c.WriteMessage(mt, cache.GetBlock(multiple, cache.JSON))

		if err != nil {
			log.Println("write:", err)
			break
		}
	}
}
