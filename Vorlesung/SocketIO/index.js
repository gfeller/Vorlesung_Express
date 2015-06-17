var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});



<accomodation>
  <hotel info="http://example/hotel/0928374" price="200"/>
  <guest-house info="http://example/guest-h/7082" price="87"/>
</accomodation>


<accomodation>
  <hotel id="0928374" price="200"/>
  <guest-house id="7082" price="87"/>
</accomodation>


<accomodation>  
        <hotel info="http://example/hotel/0928374" price="200"/> 
        <guest-house info="http://example/guest-h/7082" price="87"/>
		<links>
			<link rel="book" href='https://example/book/0928374' method='post'/>			
		<links>
</accomodation>
