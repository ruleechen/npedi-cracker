# Npedi Cracker
A cracker local server for slide code verification of xxx.com

Environment
------------
- Install [Nodejs](https://nodejs.org/) v8.x.x

Start Server
------------
- Open **start.cmd** to start the server, default listen on port **6001**
- Message "**Server is listening on http&#58;//localhost:6001**" will prompt on server started.

Call Service
------------
Send http **POST** request with json body to **http&#58;//localhost:6001/json**
```json
{
  "ground": "...",
  "brick": "...",
  "top": 29
}
```
- **ground**: is the ground base64 image data.
- **brick**: is the brick base64 image data.
- **top**: is the offset value of brick in ground.

Service Response
------------
```json
{
    "x": 167,
    "confidence": 1
}
```
- **x**: is the crack value.
- **confidence**: is the confidence of current crack, ranging 0.1 ~ 1, while 1 means 100% matched.
