benchmark tool to help compare websockets and http speed as well as json and flatbuffers

instructions
```
go run .
```
1. go to localhost:8000
1. choose data type, this will be the encoding of what is received from the server.
1. enter number of tries, this is the number of request to send to the server and the number of responses to get back.
1. enter multiple, this is the size of the array in the payload from the server. the server builds this array once, and uses it for all subsequent tests.  this means that the first benchmark for a particular multiple will be slower than subsequent benchmarks.
1. hit start for the protocol you want to test

note: the client side code is in the html folder and it is already built
