/*
* index
*/

const server = require('./src/server');

const instance = server.create();

const port = 6001;

console.log(`Server is listening on http://localhost:${port}`);

instance.listen(port);
