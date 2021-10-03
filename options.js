module.exports = {
    // Кнопки для угадывания числа. Передаём третьим параметром в метод "sendMessage"
    // Это создаём кнопки в боте для угадывания числа, которое загадал бот
    gameOptions: {
        // Так получается 4 ряда и в четвёртом ряду 1 кнопка
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [
                    {text: '1', callback_data: '1'},
                    {text: '2', callback_data: '2'},
                    {text: '3', callback_data: '3'},
                ],
                [
                    {text: '4', callback_data: '4'},
                    {text: '5', callback_data: '5'},
                    {text: '6', callback_data: '6'},
                ],
                [
                    {text: '7', callback_data: '7'},
                    {text: '8', callback_data: '8'},
                    {text: '9', callback_data: '9'},
                ],
                [
                    {text: '0', callback_data: '0'},
                ],
            ],
        }),
    },

    // Для начала игры заново, после ответа
    againOptions: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: 'Играть ещё раз', callback_data: '/again'}],
            ],
        }),
    },
};