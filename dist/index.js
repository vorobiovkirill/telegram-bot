'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var octah_bot = require('node-telegram-bot-api');
var request = require('request');
var fs = require('fs');
var token = '377771807:AAEDvXb35OMO0M6Yg7qJ-5h9EuwYhi-35Ss';
var bot = new octah_bot(token, { polling: true });

bot.onText(/\/help (.+)/, function (msg, _ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      source = _ref2[0],
      match = _ref2[1];

  var id = msg.chat.id;

  bot.sendMessage(id, match);
});

bot.onText(/\/start/, function (msg) {

  bot.sendMessage(msg.chat.id, "Welcome", {
    "reply_markup": {
      "keyboard": [["Курс", "Second sample"], ["Keyboard"], ["I'm robot"]]
    }
  });
});

bot.on('message', function (msg) {
  var userId = msg.from.id;
  var _messageText = msg.text;
  var userMessage = _messageText.toLowerCase();

  if (userMessage === 'привет') {
    bot.sendMessage(userId, 'Привет я твой телеграм бот');
  } else if (userMessage === 'курс') {
    request('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5', function (error, response, body) {
      if (!error && response.statusCode === 200) {
        var data = JSON.parse(body);
        data.forEach(function (value, index) {
          bot.sendMessage(userId, '\u0412\u0430\u043B\u044E\u0442\u0430: ' + value.ccy + ' | \u041A\u043E\u0434 \u043D\u0430\u0446\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u043E\u0439 \u0432\u0430\u043B\u044E\u0442\u044B: ' + value.base_ccy + ' | \u041F\u043E\u043A\u0443\u043F\u043A\u0430: ' + value.buy);
        });
      }
    });
  }
});