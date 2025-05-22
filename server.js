const express = require("express");
const path = require("path");

const app = express();
const server = require("http").createServer(app); // define o protocolo http
const io = require("socket.io")(server); // define o sevirdor wss

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, 'public'));
app.engine('html', require("ejs").renderFile)
app.set("view engine", "hmtl");

app.use("/", (req, res) => {
    res.render("index.html")
});

let messages = [];

io.on("connection", socket=>{
    console.log(`Socket conectado: ${socket.id} `);

    socket.emit("previousMessages", messages);

    socket.on("sendMessage", data => {
        messages.push(data);
        socket.broadcast.emit("recivedMessage", data)
    });
});

app.listen(3000, function(){
    console.log("Servidor rodando na URL http://localhost:3000")
    });