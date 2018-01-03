'use strict';

const octah_bot = require('node-telegram-bot-api');
const request = require('request');
const fs = require('fs');
const token = '377771807:AAEDvXb35OMO0M6Yg7qJ-5h9EuwYhi-35Ss';
const bot = new octah_bot(token, { polling: true });

bot.onText(/\/help (.+)/, (msg, [source, match]) => {
  const { chat: { id }} = msg;
  bot.sendMessage(id, match);
});

bot.onText(/\/start/, (msg) => {

  bot.sendMessage(msg.chat.id, "Welcome", {
    "reply_markup": {
      "keyboard": [["Курс", "Second sample"], ["Keyboard"], ["I'm robot"]]
    }
  });

});

bot.on('message', msg => {
  const userId = msg.from.id;
  const _messageText = msg.text;
  const userMessage = _messageText.toLowerCase();

  if (userMessage === 'привет') {
    bot.sendMessage(userId, 'Привет я твой телеграм бот');
  } else if (userMessage === 'курс') {
    request('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5', function (error, response, body) {
      if (!error && response.statusCode === 200) {
        const data = JSON.parse(body);
        data.forEach(function (value, index) {
          bot.sendMessage(userId, (`Валюта: ${value.ccy} | Код национальной валюты: ${value.base_ccy} | Покупка: ${value.buy}`));
        });
      }

    });
  }

});

