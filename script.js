// script.js

const gamesData = [
    {
        id: 'gta5',
        title_ua: 'GTA V',
        title_en: 'GTA V',
        genre_ua: 'Action',
        genre_en: 'Action',
        price: 349,
        oldPrice: 1199,
        image: 'https://upload.wikimedia.org/wikipedia/en/a/a5/Grand_Theft_Auto_V.png',
        trailer: 'https://www.youtube-nocookie.com/embed/QkkoHAzjnUs'
    },
    {
        id: 'cyberpunk',
        title_ua: 'Cyberpunk 2077',
        title_en: 'Cyberpunk 2077',
        genre_ua: 'RPG',
        genre_en: 'RPG',
        price: 799,
        oldPrice: 1999,
        image: 'https://upload.wikimedia.org/wikipedia/en/9/9f/Cyberpunk_2077_box_art.jpg',
        trailer: 'https://www.youtube-nocookie.com/embed/qIcTM8WXFjk'
    },
    {
        id: 'forza',
        title_ua: 'Forza Horizon 5',
        title_en: 'Forza Horizon 5',
        genre_ua: 'Гонки',
        genre_en: 'Racing',
        price: 599,
        oldPrice: 1599,
        image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1551360/header.jpg',
        trailer: 'https://www.youtube-nocookie.com/embed/eyJuhcQfA5w'
    },
    {
        id: 'rdr2',
        title_ua: 'Red Dead Redemption 2',
        title_en: 'Red Dead Redemption 2',
        genre_ua: 'Action',
        genre_en: 'Action',
        price: 699,
        oldPrice: 1699,
        image: 'https://upload.wikimedia.org/wikipedia/en/4/44/Red_Dead_Redemption_II.jpg',
        trailer: 'https://www.youtube-nocookie.com/embed/eaW0tYpxyp0'
    },
    {
        id: 'witcher3',
        title_ua: 'Відьмак 3: Дика Полювання',
        title_en: 'The Witcher 3: Wild Hunt',
        genre_ua: 'RPG',
        genre_en: 'RPG',
        price: 499,
        oldPrice: 1499,
        image: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Witcher_3_cover_art.jpg',
        trailer: 'https://www.youtube-nocookie.com/embed/c0i88t0Kacs'
    }
];

const translations = {
    ua: {
        games_title: 'Ігри',
        table_title: 'Таблиця ігор',
        table_game: 'Гра',
        table_genre: 'Жанр',
        table_price: 'Ціна',
        trailer_title: 'Трейлер',
        contacts_title: 'Контакти',
        contact_email_label: 'Email:',
        order_title: 'Форма замовлення',
        order_submit: 'Замовити',
        order_cancel: 'Скасувати',
        order_name_placeholder: 'Ім’я',
        order_email_placeholder: 'Email',
        order_game_placeholder: 'Виберіть гру',
        buy_button: 'Купити',
        order_success: 'Дякуємо за замовлення! Ми зв’яжемося з вами найближчим часом.',
        lang_ua: 'UA',
        lang_en: 'EN',
    },
    en: {
        games_title: 'Games',
        table_title: 'Games Table',
        table_game: 'Game',
        table_genre: 'Genre',
        table_price: 'Price',
        trailer_title: 'Trailer',
        contacts_title: 'Contacts',
        contact_email_label: 'Email:',
        order_title: 'Order Form',
        order_submit: 'Order',
        order_cancel: 'Cancel',
        order_name_placeholder: 'Name',
        order_email_placeholder: 'Email',
        order_game_placeholder: 'Select a game',
        buy_button: 'Buy',
        order_success: 'Thank you for your order! We will contact you soon.',
        lang_ua: 'UA',
        lang_en: 'EN',
    }
};

let currentLang = 'ua';

// Elements
const gamesGrid = document.getElementById('games-grid');
const tableBody = document.getElementById('table-body');
const trailerVideo = document.getElementById('trailer-video');
const orderSection = document.getElementById('order-section');
const orderForm = document.getElementById('order-form');
const orderSuccess = document.getElementById('order-success');
const orderCancelBtn = document.getElementById('order-cancel');
const orderGameSelect = document.getElementById('order-game');
const langButtons = {
    ua: document.getElementById('btn-ua'),
    en: document.getElementById('btn-en')
};

function renderGames() {
    gamesGrid.innerHTML = '';
    gamesData.forEach(game => {
        const card = document.createElement('div');
        card.className = 'game-card';

        card.innerHTML = `
            <img class="game-image" src="${game.image}" alt="${getText(game, 'title')}" />
            <div>
                <h3 class="game-title">${getText(game, 'title')}</h3>
                <div class="price">
                    <span class="old-price">${game.oldPrice} грн</span>
                    <span>${game.price} грн</span>
                </div>
                <button class="btn-buy">${translations[currentLang].buy_button}</button>
            </div>
        `;

        // Клік на кнопку "Купити"
        card.querySelector('.btn-buy').addEventListener('click', () => {
            openOrderForm(game.id);
        });

        gamesGrid.appendChild(card);
    });
}

function renderTable() {
    tableBody.innerHTML = '';
    gamesData.forEach(game => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${getText(game, 'title')}</td>
            <td>${getText(game, 'genre')}</td>
            <td>${game.price} грн</td>
        `;
        tableBody.appendChild(tr);
    });
}

function openOrderForm(gameId) {
    orderForm.style.display = 'block';
    orderSuccess.style.display = 'none';
    orderSection.style.display = 'block';
    orderForm.reset();

    // Вибрати гру в селекті
    orderGameSelect.value = gameId;
}

function closeOrderForm() {
    orderSection.style.display = 'none';
}

function getText(game, key) {
    if (key === 'title') {
        return currentLang === 'ua' ? game.title_ua : game.title_en;
    }
    if (key === 'genre') {
        return currentLang === 'ua' ? game.genre_ua : game.genre_en;
    }
    return '';
}

function renderOrderGameOptions() {
    orderGameSelect.innerHTML = `<option value="" disabled selected>${translations[currentLang].order_game_placeholder}</option>`;
    gamesData.forEach(game => {
        const option = document.createElement('option');
        option.value = game.id;
        option.textContent = getText(game, 'title');
        orderGameSelect.appendChild(option);
    });
}

function updateTrailer(gameId) {
    const game = gamesData.find(g => g.id === gameId);
    if (game) {
        trailerVideo.src = game.trailer + '?autoplay=1&mute=1';
    }
}

// Переклад інтерфейсу
function translatePage() {
    // Тексти з data-key
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if (translations[currentLang][key]) {
            el.textContent = translations[currentLang][key];
        }
    });

    // Placeholder у формі
    document.getElementById('order-name').placeholder = currentLang === 'ua' ? 'Ім’я' : 'Name';
    document.getElementById('order-email').placeholder = 'Email';

    // Кнопки мови
    langButtons.ua.classList.toggle('active', currentLang === 'ua');
    langButtons.en.classList.toggle('active', currentLang === 'en');

    // Оновити гри, таблицю, опції
    renderGames();
    renderTable();
    renderOrderGameOptions();

    // Оновити текст кнопок форми
    document.querySelector('#order-form button[type="submit"]').textContent = translations[currentLang].order_submit;
    document.querySelector('#order-cancel span').textContent = translations[currentLang].order_cancel;
}

function setupLanguageSwitch() {
    langButtons.ua.addEventListener('click', () => {
        if (currentLang !== 'ua') {
            currentLang = 'ua';
            translatePage();
        }
    });
    langButtons.en.addEventListener('click', () => {
        if (currentLang !== 'en') {
            currentLang = 'en';
            translatePage();
        }
    });
}

// Обробник форми
orderForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = orderForm.name.value.trim();
    const email = orderForm.email.value.trim();
    const gameId = orderForm.game.value;

    if (!name || !email || !gameId) {
        alert(currentLang === 'ua' ? 'Будь ласка, заповніть всі поля.' : 'Please fill in all fields.');
        return;
    }

    // Імітуємо успішне замовлення
    orderSuccess.style.display = 'block';
    orderSuccess.textContent = translations[currentLang].order_success;
    orderForm.style.display = 'none';
});

// Кнопка скасування
orderCancelBtn.addEventListener('click', () => {
    closeOrderForm();
});

window.onload = () => {
    translatePage();
    setupLanguageSwitch();
};