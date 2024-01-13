const app = require('express')();
const axios = require('axios');
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "*",
  },
});

const port = 3000

const back_url = 'http://leadback.abdullajonsoliyev.uz/';

app.get("/update", (req, res) => {
  io.emit('update');
  res.send("ok");
});
app.listen(3001, () => console.log(`Started server at http://localhost:3001!`));

// Lister server
server.listen(port, () => {
  console.log(`Server was working on port ${port}`);
});

// Sockent events
io.sockets.on('connection', (socket) => {
  socket.on('authorization', (user_token) => {

    let userToken = user_token.user_token;
    let socket_id = socket.id;
    axios.get(`${back_url}api/admin/socket_id/${userToken}/${socket_id}`)
      .then(function (response) {
        // console.log(response);
        // console.log('update id');
      })
      .catch(function (error) {
        console.log(error);
      });
  });


  // Disconnect
  socket.on('disconnect', () => {
    console.log(`${socket.id} was disconnected`);
  });


});
