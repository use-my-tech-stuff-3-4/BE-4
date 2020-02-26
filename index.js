const server = require('./server.js');
const port = process.env.PORT || 8082;

server.listen(port, () => console.log(`server listening on port ${port}`));
