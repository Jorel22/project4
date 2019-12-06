document.addEventListener('DOMContentLoaded', () => {

    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);
	//'http://127.0.0.1:5000'
	//console.log(socket)


	function ingresa_user(user1) {
		console.log(user1)
		document.querySelector('#register_user').onclick = () => {
			//var user1 = document.querySelector('#user_name').value 
			//console.log(user1);
			localStorage.setItem('user', user1);
			//alert(user1);
			socket.emit('submit_user', {'user': user1});
		};
	return False;
	};
	
	function add_new_channel(channel){
		document.querySelector('#channel_button').onclick = () => {
			socket.emit('add_channel_server',{"channel":channel});	
		};
	};

	function add_message(message) {
		//console.log(user1)
		document.querySelector('#send_button').onclick = () => {
			//console.log(user1);
			//localStorage.setItem('user', user1);
			//alert(user1);
		socket.emit('recv_message_server', {"user": user1,"message":message});
		};
	//return False;
	};
	
	function select_channel(){

	};


socket.on('connect', () => {
	//console.log("Connected")
	//socket.emit('saludar', {'saludo': "I connected!"});
	var user = localStorage.getItem('user');
	if (user === null){ 
		ingresa_user(user);
		document.querySelector('#register_user').disabled=true;
		document.querySelector('#user_name').disabled=true;
	}
	else {
		user2=localStorage.getItem('user')
		document.querySelector('#register_user').disabled=true;
		document.querySelector('#user_name').value=user2;
		document.querySelector('#user_name').disabled=true;
		socket.emit('user_loged',user2);
	}
});

socket.on('create_channel', () => {
	var new_channel = document.querySelector('#channel_name').value 
	add_new_channel(new_channel);
	console.log("New channel added")

});

socket.on('load_channels', (data) => {
    document.querySelector('h2').innerHTML="Welcome " + data["users"][0];
	var option = document.createElement('option');
    var x = document.querySelector('#listofchannels');
	for (let i=0;i < data["channels"].length;i++) {
		var option = document.createElement('option');
		option.text = data["channels"][i];
		//option.innerHTML = channel;
		//document.querySelector('#listofchannels').append(option);
		x.add(option);
	}
	console.log("channels loaded");
});
	



socket.on('add use', () => {

	
});	

socket.on('send_message',() =>{
		var d = new Date();

		var minute = d.getMinutes().toString();
		var mesok = (minute < 10) ? '0' + minute : minute;
		var hora = d.getHours().toString() + ":" + mesok;  //hora en formato : hh:mm
		
		var message1 = document.querySelector('#message').value ;
		add_message(message1);
	emit ('recv_message_server',)
});

socket.on('update_messages', data => {
        
    });


socket.on('request_messages_channel_user', () => { //envia la solicitu para recibir mensajes de un channel
		document.querySelector('#listofchannels').onchange = () => {
		console.log("change of selector detected");
		var combo = document.querySelector("#listofchannels");
		var selected = combo.options[combo.selectedIndex].text;
		socket.emit('load_messages_channel_server',selected);
		};
});


socket.on('show_messages', (messages_list) => {
	var x = document.querySelector('#listofmessages');
	console.log("now let us charge the list");
	for (message in messages_list){
		var new_messsage = document.createElement('li');
		new_message.text = message;
		//option.innerHTML = channel;
		//document.querySelector('#listofchannels').append(option);
		x.add(new_message);
	}


});

});