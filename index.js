import TelegramApi from 'node-telegram-bot-api';

const token = '6239813035:AAFMiOEEMDYqrUvqfYZCvXUlpPqTHyjg0J8';

const bot = new TelegramApi(token, {polling:true});

function randomchik(min, max){
    return Math.floor(Math.random() * (max - min) + min);
}

function otvet(){
    const arr = [
        `Че тебя надо от меня?`, 
        `Отстань!`, 
        `Вот ты докапался!`, 
        `Иди гуляй!`, 
        `Сам такой!`,
        `А ты знаеш Максима?`,
        `Тебе что там скучно что ли?`,
    ];
    return  arr[randomchik(0, arr.length)];
}


bot.on('message', async msg => {
    const text = msg.text;
    const name = msg.chat.first_name;
    const chatid = msg.chat.id;

    const opt =  {reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: '1', callback_data: '1' }],
          [{ text: '2', callback_data: '2' }],
          [{ text: '3', callback_data: '3' }]
        ]
      })
    };
    await bot.sendSticker(chatid, 'https://chpic.su/_data/stickers/m/mematvar/mematvar_024.webp');
   
    await bot.sendMessage(chatid, otvet(), opt)
   
});


bot.on('callback_query', async msg => {
   const chatid = msg.message.chat.id;
   console.log(msg)
    if(msg.data === '2'){
       await bot.sendMessage(chatid, otvet());
    }
})
