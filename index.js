const mineflayer = require('mineflayer');

function createBot() {
    const bot = mineflayer.createBot({
        host: '0gyrs4ik.aternos.me', 
        port: 29093,       
        username: 'Ogyrchik_AFK', // Имя вашего бота на сервере
        version: false            // Скрипт сам автоматически определит версию сервера
    });

    bot.on('spawn', () => {
        console.log('Огурчик-бот успешно подключился и держит сервер онлайн!');
        // Бот подпрыгивает каждые 5 секунд, имитируя активность против АФК-системы
        setInterval(() => {
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 500);
        }, 5000);
    });

    bot.on('end', () => {
        console.log('Бот отключился. Попытка перезапуска через 10 секунд...');
        setTimeout(createBot, 10000);
    });

    bot.on('error', (err) => console.log('Ошибка подключения:', err));
}

createBot();
