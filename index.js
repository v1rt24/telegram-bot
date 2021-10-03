// Подключаем пакет
const TelegramBot = require('node-telegram-bot-api');

// Подключаем кнопки
const {gameOptions, againOptions} = require('./options');

// Прописываем токен бота
const TOKEN = '2027616945:AAGLGf9Ei4m_A0_F_8KHswI5PwVjRBkfkSI';

// Создаём бота
const bot = new TelegramBot(TOKEN, {polling: true});

// ================ Для игры "Угадай число" / Используем в команде '/game'
// Делаем типа БД. Сюда бот будет помещать загаданное число
const chats = {};

// Начало игры
const startGame = async (chatId) => {
    await bot.sendMessage(chatId, 'Сейчас я загадаю число от 0 до 9, а ты попробуй её угадать!');
    const randomNumber = Math.floor(Math.random() * 10); // бот загадывает число
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, 'Отгадывай', gameOptions);
};
// ================ /Для игры "Угадай число"

// Команды нашего бота. Устанавливаем команды нашему боту
bot.setMyCommands([
    {command: '/start', description: 'Начальное приветствие'},
    {command: '/info', description: 'Получить информацию о пользователе'},
    {command: '/game', description: 'Игра угадай число'},
]);

// Вешаем слушатель события на обработку полученных сообщений
/*bot.on('message', async msg => {
    // console.log(msg); // для просмотра всего что приходит. Отправляем сообщения из телеграма(нашего бота)
    const chatId = msg.chat.id; // id чата
    const text = msg.text; // получаем отправленные сообщения из бота в телеграме

    // Отправляем сообщение в бот, т.е. это ответ бота на наше сообщение
    // bot.sendMessage(chatId, `Ты написал мне сообщение: ${text}`);

    // Когда нажимаем на "/start" или сами пропишем в поле сообщения "/start"
    if (text === '/start') {
        // отправляем стикер. Ссылка на все стикеры: https://tlgrm.ru/stickers   -открываем нужный стикер в новом окне браузера и копируем ссылку
        // Так можно отправлять картинки, аудио, видео и другие форматы
        await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/321/481/32148119-505b-3b47-91f0-98885daa8341/1.webp');

        // отправляем сообщение пользователю
        await bot.sendMessage(chatId, 'Добро пожаловать!');
    }

    // Команда "/info"
    if (text === '/info') {
        await bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name} ${msg.from.last_name}`);
    }

    // Игра "Угадай число"
    if (text === '/game') {
        await bot.sendMessage(chatId, 'Сейчас я загадаю число от 0 до 9, а ты попробуй её угадать!');
        const randomNumber = Math.floor(Math.random() * 10);
        chats[chatId] = randomNumber;
        return bot.sendMessage(chatId, 'Отгадывай', gameOptions);
    }
});*/


// Функция будет запускать наше приложение (необязательно).
// Если отправим несуществующую команду либо текст (что является одним и тем же) которого нет в условиях, то бот ничего не ответит.
// Чтобы бот что-то отвечал на несуществующую команду, то нужно вместо "await" прописать "return", чтобы после отработки команды(условия) дальнейшее выполнение завершалось
const start = () => {
    bot.on('message', async msg => {
        // console.log(msg); // для просмотра всего что приходит. Отправляем сообщения из телеграма(нашего бота)
        const chatId = msg.chat.id; // id чата
        const text = msg.text; // получаем отправленные сообщения из бота в телеграме

        // Отправляем сообщение в бот, т.е. это ответ бота на наше сообщение
        // bot.sendMessage(chatId, `Ты написал мне сообщение: ${text}`);

        // Когда нажимаем на "/start" или сами пропишем в поле сообщения "/start"
        if (text === '/start') {
            // отправляем стикер. Ссылка на все стикеры: https://tlgrm.ru/stickers   -открываем нужный стикер в новом окне браузера и копируем ссылку
            // Так можно отправлять картинки, аудио, видео и другие форматы
            await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/321/481/32148119-505b-3b47-91f0-98885daa8341/1.webp');

            // отправляем сообщение пользователю
            return bot.sendMessage(chatId, 'Добро пожаловать!');
        }

        // Команда "/info"
        if (text === '/info') {
            return bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name} ${msg.from.last_name} / ${msg.from.username}`);
        }

        // Игра "Угадай число"
        if (text === '/game') {
            return startGame(chatId);
            // return await startGame(chatId); // "await" прописывать не обязательно, т.к. делаем возврат, т.е. ждать не надо, т.к. после ответа остановится дальнейшее выполнение
        }

        // Прописываем на тот случай, если ввели несуществующую команду/текст (прописывается в самом конце, после всех условий / команд)
        return bot.sendMessage(chatId, 'Я тебя не понимаю, попробуй ещё раз!');
    });

    // Функция обратного вызова для игры "Угадай число"
    // Отслеживание кликов на кнопки. Нажимаем на кнопку и приходит ответ
    bot.on('callback_query', async msg => {
        console.log(msg);
        console.log(chats['490896576']);

        const data = msg.data; // получаем значение кнопки по которой нажали в телеграм боте
        const chatId = msg.message.chat.id; // получаем id чата. Либо так: const chatId = msg.chat.id;

        await bot.sendMessage(chatId, `Ты выбрал цифру ${data}`);

        // Начало игры
        if (data === '/again') {
            return startGame(chatId);
            // return await startGame(chatId); // "await" прописывать не обязательно, т.к. делаем возврат, т.е. ждать не надо, т.к. после ответа остановится дальнейшее выполнение
        }

        // Ответ пользователя
        if (+data === chats[chatId]) {
            return await bot.sendMessage(chatId, `Поздравляю, ты отгадал загаданное число ${chats[chatId]}`, againOptions);
        } else {
            return await bot.sendMessage(chatId, `Не угадал. Бот загадал число ${chats[chatId]}`, againOptions);
        }
    });
};

start();





















