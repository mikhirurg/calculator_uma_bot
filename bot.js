const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const xhr = new XMLHttpRequest();
var token = 'BOT_TOKEN';
var keyboard=JSON.stringify({
    inline_keyboard: [
      [{ text: 'AC', callback_data: '10' },{ text: '%2B', callback_data: '11' },{ text: '-', callback_data: '12' }],
	  [{ text: '7', callback_data: '7' },{ text: '8', callback_data: '8' },{ text: '9', callback_data: '9' }],
	  [{ text: '4', callback_data: '4' },{ text: '5', callback_data: '5' },{ text: '6', callback_data: '6' }],
	  [{ text: '1', callback_data: '1' },{ text: '2', callback_data: '2' },{ text: '3', callback_data: '3' }],
	  [{ text: ' ', callback_data: '13' },{ text: '0', callback_data: '0' },{ text: '=', callback_data: '14' }]
    ]
});
  
var keyboard_plus=JSON.stringify({
    inline_keyboard: [
      [{ text: 'AC', callback_data: '10' },{ text: '%E2%9E%95', callback_data: '11' },{ text: '-', callback_data: '12' }],
	  [{ text: '7', callback_data: '7' },{ text: '8', callback_data: '8' },{ text: '9', callback_data: '9' }],
	  [{ text: '4', callback_data: '4' },{ text: '5', callback_data: '5' },{ text: '6', callback_data: '6' }],
	  [{ text: '1', callback_data: '1' },{ text: '2', callback_data: '2' },{ text: '3', callback_data: '3' }],
	  [{ text: ' ', callback_data: '13' },{ text: '0', callback_data: '0' },{ text: '=', callback_data: '14' }]
    ]
});
var keyboard_minus=JSON.stringify({
    inline_keyboard: [
      [{ text: 'AC', callback_data: '10' },{ text: '%2B', callback_data: '11' },{ text: '%E2%9E%96', callback_data: '12' }],
	  [{ text: '7', callback_data: '7' },{ text: '8', callback_data: '8' },{ text: '9', callback_data: '9' }],
	  [{ text: '4', callback_data: '4' },{ text: '5', callback_data: '5' },{ text: '6', callback_data: '6' }],
	  [{ text: '1', callback_data: '1' },{ text: '2', callback_data: '2' },{ text: '3', callback_data: '3' }],
	  [{ text: ' ', callback_data: '13' },{ text: '0', callback_data: '0' },{ text: '=', callback_data: '14' }]
    ]
});
function sleep(ms) {
    ms += new Date().getTime();
    while (new Date() < ms){}
} 
function send_get_request(url){
	xhr.open("GET", url, false);
	xhr.send();
    return xhr.responseText;
}
function send_push_request(url){
	xhr.open("POST", url, false);
	xhr.send();
	return xhr.responseText;
}
function handle_action(action,user){
	if (parseInt(action)>=0 && parseInt(action)<10){
		if (user.variable=='0' || user.znak){
			user.variable=action;
			user.znak=false;
		} else {
			user.variable+=action; 
		}
		url = "https://api.telegram.org/bot"+token+"/editMessageText?chat_id="+user.id+"&message_id="+(user.key_id+1)+"&text="+user.variable+"&reply_markup="+keyboard;
		send_get_request(url);
	} else if (action=='10'){
		user.variable='0';
		user.ovariable='0';
		user.action=0;
		url = "https://api.telegram.org/bot"+token+"/editMessageText?chat_id="+user.id+"&message_id="+(user.key_id+1)+"&text="+user.variable+"&reply_markup="+keyboard;
		send_get_request(url);
	} else if (action=='11'){
		user.ovariable=user.variable;
		url = "https://api.telegram.org/bot"+token+"/editMessageReplyMarkup?chat_id="+user.id+"&message_id="+(user.key_id+1)+"&reply_markup="+keyboard_plus;
		user.action=11;
		user.znak=true;
		send_get_request(url);
	} else if (action=='12'){
		user.ovariable=user.variable;
		user.action=12;
		url = "https://api.telegram.org/bot"+token+"/editMessageReplyMarkup?chat_id="+user.id+"&message_id="+(user.key_id+1)+"&reply_markup="+keyboard_minus;
		user.znak=true;
		send_get_request(url);
	} else if (action=='14'){
		if (user.action==11){
		    var answer = parseInt(user.variable,10) + parseInt(user.ovariable,10);
			user.variable=answer+'';
		}
		if (user.action==12){
			var answer = parseInt(user.ovariable,10) - parseInt(user.variable,10);
			user.variable=answer+'';
		}
		user.action=0;
		user.ovariable='0';
	    url = "https://api.telegram.org/bot"+token+"/editMessageText?chat_id="+user.id+"&message_id="+(user.key_id+1)+"&text="+user.variable+"&reply_markup="+keyboard;
		send_get_request(url);
	}
}

var users = new Map();
var offset=0;
var url = "https://api.telegram.org/bot"+token+"/getUpdates?offset=-1";
update_id = 0;
var button_id=0;
var chat_id=0;
var key_id=0;
while (true){
	sleep(25);
	url = "https://api.telegram.org/bot"+token+"/getUpdates?offset=-1";
	json=send_get_request(url);
	jsoner = JSON.parse(json); 
	if (jsoner.result.length==0) continue;
	reply = jsoner.result[0];
	
	if (update_id!=reply.update_id){
	    update_id=reply.update_id;	
	    if (!('callback_query' in reply)){
	        chat_id=reply.message.chat.id;
		    if (reply.message.text==='/start'){
				var userId = reply.message.from.id;
				if (!users.has(userId)){
					var user = new Object();
					user.id = userId;
					user.variable='0';
					user.ovariable='0';
					user.action=0;
					user.chat_id=chat_id;
					user.znak = false;
		            url = "https://api.telegram.org/bot"+token+"/sendMessage?chat_id="+user.id+"&text=0&reply_markup="+keyboard;
		            send_push_request(url);
				    url = "https://api.telegram.org/bot"+token+"/getUpdates";
				    json = send_get_request(url);
				    jsoner =  JSON.parse(json);
				    reply = jsoner.result[0];
				    user.key_id= reply.message.message_id;
					users.set(userId,user);
				}
	        }
	    } else {
	       var action = reply.callback_query.data;
		   var userId = reply.callback_query.from.id;
		   var user = users.get(userId);
		   if (user!=null){
		       handle_action(action,user);
		  }
		  action='0';
	    }
    }
}