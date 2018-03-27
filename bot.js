var TelegramBot = require('node-telegram-bot-api'),

    bot = new TelegramBot("KEY", { polling: true });

var options = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: 'AC', callback_data: '1' },{ text: '+', callback_data: '2' },{ text: '-', callback_data: '3' }],
	  [{ text: '7', callback_data: '4' },{ text: '8', callback_data: '5' },{ text: '9', callback_data: '6' }],
	  [{ text: '4', callback_data: '7' },{ text: '5', callback_data: '8' },{ text: '6', callback_data: '9' }],
	  [{ text: '1', callback_data: '10' },{ text: '2', callback_data: '11' },{ text: '3', callback_data: '12' }],
	  [{ text: ' ', callback_data: '13' },{ text: '0', callback_data: '14' },{ text: '=', callback_data: '15' }]
    ]
  })
};

var ch=' ';
var a1=0;
var b=false;
bot.onText(/\/start/, function (msg, match) {
	bot.sendMessage(msg.chat.id,'Weclome to Calculator bot!');
  bot.sendMessage(msg.chat.id, '0', options);
});
bot.on('callback_query', function onCallbackQuery(callbackQuery) {
const action = callbackQuery.data;
  const msg = callbackQuery.message;
  const opts = {
    chat_id: msg.chat.id,
    message_id: msg.message_id,
	reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: 'AC', callback_data: '1' },{ text: '+', callback_data: '2' },{ text: '-', callback_data: '3' }],
	  [{ text: '7', callback_data: '4' },{ text: '8', callback_data: '5' },{ text: '9', callback_data: '6' }],
	  [{ text: '4', callback_data: '7' },{ text: '5', callback_data: '8' },{ text: '6', callback_data: '9' }],
	  [{ text: '1', callback_data: '10' },{ text: '2', callback_data: '11' },{ text: '3', callback_data: '12' }],
	  [{ text: ' ', callback_data: '13' },{ text: '0', callback_data: '14' },{ text: '=', callback_data: '15' }]
    ]
  })
  };


  if (action === '1') {
   bot.editMessageText('0', opts,options);
   ch=' ';
   b=false;
   a1=0;
  }
  if (action === '2') {
	ch='+';
	a1=parseInt(msg.text,10);
	b=true;
  }
  if (action === '3') {
	ch='-';
	a1=parseInt(msg.text,10);
	b=true;
  }
  if (action === '15') {
	  if (ch === '+'){
		var num=a1+parseInt(msg.text,10); 
        bot.editMessageText(num.toString(), opts,options);
	    a1=0;
        ch=' ';	
		b=false;
	  }
	  if (ch === '-'){
		var num=a1-parseInt(msg.text);   
		
		bot.editMessageText(num.toString(), opts,options);
	    a1=0;
	    ch=' ';
		b=false;
	  }
  }
  if (action === '4') {
	if (msg.text === '0' || b) {
	bot.editMessageText('7', opts,options);
	b=false;
	} else {
	bot.editMessageText(msg.text+'7', opts,options);
	}
  }
  if (action === '5') {
	if (msg.text=== '0' || b) {
	bot.editMessageText('8', opts,options);
	b=false;
	} else{
	bot.editMessageText(msg.text+'8', opts,options);
	}
  }
  if (action === '6') {
	if (msg.text=== '0' || b) {
	bot.editMessageText('9', opts,options);
	b=false;
	} else{
	bot.editMessageText(msg.text+'9', opts,options);
	}
  }
  if (action === '7' ) {
	if (msg.text=== '0' || b) {
	bot.editMessageText('4', opts,options);
	b=false;
	} else{
	bot.editMessageText(msg.text+'4', opts,options);
	}
  }
  if (action === '8') {
	if (msg.text=== '0' || b) {
	bot.editMessageText('5', opts,options);
	b=false;
	} else{
	bot.editMessageText(msg.text+'5', opts,options);
	}
  }
  if (action === '9') {
	if (msg.text=== '0' || b) {
	bot.editMessageText('6', opts,options);
	b=false;
	} else{
	bot.editMessageText(msg.text+'6', opts,options);
	}
  }
  if (action === '10') {
	if (msg.text=== '0' || b) {
	bot.editMessageText('1', opts,options);
	b=false;
	} else{
	bot.editMessageText(msg.text+'1', opts,options);
	}
  }
  if (action === '11') {
	if (msg.text=== '0' || b) {
	bot.editMessageText('2', opts,options);
	b=false;
	} else{
	bot.editMessageText(msg.text+'2', opts,options);
	}
  }
  if (action === '12') {
	if (msg.text=== '0' || b) {
	bot.editMessageText('3', opts,options);
	b=false;
	} else{
	bot.editMessageText(msg.text+'3', opts,options);
	}
  }
  if (action === '14') {
	if (msg.text=== '0' || b) {
	bot.editMessageText('0', opts,options);
	} else{
	bot.editMessageText(msg.text+'0', opts,options);
	}
  }
});