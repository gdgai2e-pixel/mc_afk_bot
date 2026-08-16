const http = require('http');
const mineflayer = require('mineflayer');

// 1. Создаем веб-сервер для прохождения проверки порта на Render
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Огурчик-бот работает круглосуточно!');
}).listen(process.env.PORT || 3000);

// 2. Функция запуска Майнкрафт-бота
function createBot() {
    const bot = mineflayer.createBot({
        host: '0gyrs4ik.aternos.me', 
        port: 29093,       
        username: 'Ogyrchik_AFK', 
        version: false // Автоматическое определение версии сервера
    });

    bot.on('spawn', () => {
        console.log('Огурчик-бот успешно подключился и держит сервер онлайн!');
        // Бот подпрыгивает каждые 5 секунд против АФК-системы
        setInterval(() => {
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 500);
        }, 5000);
    });

    bot.on('end', () => {
        console.log('Бот отключился. Повторное подключение через 10 секунд...');
        setTimeout(createBot, 10000);
    });

    bot.on('error', (err) => console.log('Ошибка подключения:', err));
}

createBot();
