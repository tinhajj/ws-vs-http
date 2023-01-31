package http

import (
	"net/http"
	"strconv"
	"versus/cache"
)

func HandleFB(w http.ResponseWriter, r *http.Request) {
	params := r.URL.Query()
	param := params.Get("multiple")
	multiple, _ := strconv.Atoi(param)

	block := cache.GetBlock(multiple, cache.FlatBuffer)
	w.Write(block)
}

func HandleJSON(w http.ResponseWriter, r *http.Request) {
	params := r.URL.Query()
	param := params.Get("multiple")
	multiple, _ := strconv.Atoi(param)

	block := cache.GetBlock(multiple, cache.JSON)
	w.Header().Set("Content-Type", "application/json")
	w.Write(block)
}
