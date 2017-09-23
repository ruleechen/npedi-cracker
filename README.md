# Npedi-Cracker
A cracker local server for slide code verification of xxx.com

Start Server
------------
Open *start.cmd* to start the server, default listen on port 6001

Call Service
------------
Send *POST* request with form data (x-www-form-urlencoded)
- ground = (ground base64 image data)
- brick  = (brick base64 image data)
- top    = (offset value of brick in ground)

Service Response
------------
```json
{
    "x": 167,
    "confidence": 1
}
```
- x: is the crack value
- confidence: is the confidence of current crack, range (0.1 - 1), 1 means 100% matched
