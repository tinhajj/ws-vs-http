package cache

import (
	"encoding/json"
	"math/rand"
	"versus/block"

	flatbuffers "github.com/google/flatbuffers/go"
)

type Kind int

const (
	JSON Kind = iota
	FlatBuffer
)

var letters = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")

type store struct {
	jsons map[int][]byte
	fbs   map[int][]byte
}

var cache *store = &store{
	jsons: map[int][]byte{},
	fbs:   map[int][]byte{},
}

func GetBlock(multiple int, kind Kind) []byte {
	_, ok := cache.jsons[multiple]
	if !ok {
		makeBlock(multiple)
	}

	if kind == JSON {
		return cache.jsons[multiple]
	}

	if kind == FlatBuffer {
		return cache.fbs[multiple]
	}

	panic("unable to load block from cache")
}

func makeBlock(multiple int) {
	names := []string{}
	for i := 0; i < multiple; i++ {
		names = append(names, randomString(20))
	}
	fb := makeFB(names)
	j := makeJSON(names)

	cache.fbs[multiple] = fb
	cache.jsons[multiple] = j
}

func makeJSON(names []string) []byte {
	b, _ := json.Marshal(struct {
		ID    int
		Names []string
	}{
		ID:    30,
		Names: names,
	})

	return b
}

func makeFB(names []string) []byte {
	builder := flatbuffers.NewBuilder(0)
	b := block.BlockT{
		Id:    30,
		Names: names,
	}
	builder.Finish(b.Pack(builder))
	return builder.FinishedBytes()
}

func randomString(n int) string {
	b := make([]rune, n)
	for i := range b {
		b[i] = letters[rand.Intn(len(letters))]
	}
	return string(b)
}
