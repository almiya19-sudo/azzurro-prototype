// === AZZURRO TRADE - MAIN JS ===

document.addEventListener('DOMContentLoaded', function() {
    
    // === МОБИЛЬНОЕ МЕНЮ ===
    const initMobileMenu = () => {
        const header = document.querySelector('.header');
        const nav = document.querySelector('.nav');
        
        // Создаем кнопку бургер-меню для мобильных
        if (window.innerWidth <= 768) {
            if (!document.querySelector('.mobile-menu-btn')) {
                const menuBtn = document.createElement('button');
                menuBtn.className = 'mobile-menu-btn';
                menuBtn.innerHTML = '☰';
                menuBtn.style.cssText = `
                    background: none;
                    border: none;
                    color: white;
                    font-size: 24px;
                    cursor: pointer;
                    display: block;
                `;
                
                menuBtn.addEventListener('click', () => {
                    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
                    nav.style.flexDirection = 'column';
                    nav.style.position = 'absolute';
                    nav.style.top = '100%';
                    nav.style.left = '0';
                    nav.style.right = '0';
                    nav.style.backgroundColor = '#003366';
                    nav.style.padding = '20px';
                });
                
                header.querySelector('.container').appendChild(menuBtn);
            }
        }
    };

    // === ИНТЕРАКТИВНАЯ КАРТА ===
    const initMap = () => {
        const markers = document.querySelectorAll('.city-marker');
        
        markers.forEach(marker => {
            marker.addEventListener('click', function() {
                const city = this.dataset.city;
                console.log('Выбран город:', city);
                
                // Анимация при клике
                this.style.transform = 'scale(1.3)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 300);
            });
        });
    };

    // === AI ЧАТ ВИДЖЕТ ===
    const initAIChat = () => {
        // Создаем кнопку чата
        const chatWidget = document.createElement('div');
        chatWidget.className = 'ai-chat-widget';
        chatWidget.title = 'AI-ассистент Azzurro';
        
        // Создаем окно чата (скрыто по умолчанию)
        const chatWindow = document.createElement('div');
        chatWindow.className = 'ai-chat-window';
        chatWindow.style.cssText = `
            position: fixed;
            bottom: 90px;
            right: 20px;
            width: 350px;
            height: 500px;
            background: white;
            border-radius: 15px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            display: none;
            flex-direction: column;
            z-index: 9998;
            overflow: hidden;
            font-family: Arial, sans-serif;
        `;
        
        chatWindow.innerHTML = `
            <div class="chat-header" style="
                background: linear-gradient(135deg, #003366 0%, #004080 100%);
                color: white;
                padding: 15px 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            ">
                <div>
                    <strong>🤖 AI-ассистент</strong>
                    <div style="font-size: 12px; opacity: 0.8;">Azzurro Trade</div>
                </div>
                <button class="close-chat" style="
                    background: none;
                    border: none;
                    color: white;
                    font-size: 20px;
                    cursor: pointer;
                ">×</button>
            </div>
            <div class="chat-messages" style="
                flex: 1;
                padding: 20px;
                overflow-y: auto;
                background: #f5f5f5;
            ">
                <div class="message bot" style="
                    background: white;
                    padding: 12px 15px;
                    border-radius: 15px 15px 15px 5px;
                    margin-bottom: 10px;
                    max-width: 80%;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                ">
                    Здравствуйте! Я AI-ассистент Azzurro Trade. Чем могу помочь? 🚢
                </div>
            </div>
            <div class="chat-input" style="
                padding: 15px;
                background: white;
                border-top: 1px solid #eee;
                display: flex;
                gap: 10px;
            ">
                <input type="text" placeholder="Введите сообщение..." style="
                    flex: 1;
                    padding: 10px 15px;
                    border: 1px solid #ddd;
                    border-radius: 20px;
                    outline: none;
                ">
                <button class="send-btn" style="
                    background: #FF6B35;
                    color: white;
                    border: none;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    cursor: pointer;
                    font-size: 18px;
                ">➤</button>
            </div>
        `;
        
        document.body.appendChild(chatWidget);
        document.body.appendChild(chatWindow);
        
        // Открытие/закрытие чата
        chatWidget.addEventListener('click', () => {
            chatWindow.style.display = chatWindow.style.display === 'flex' ? 'none' : 'flex';
            if (chatWindow.style.display === 'flex') {
                chatWindow.style.flexDirection = 'column';
            }
        });
        
        // Закрытие по кнопке
        chatWindow.querySelector('.close-chat').addEventListener('click', () => {
            chatWindow.style.display = 'none';
        });
        
        // Отправка сообщения
        const sendMessage = () => {
            const input = chatWindow.querySelector('input');
            const message = input.value.trim();
            
            if (message) {
                const messagesContainer = chatWindow.querySelector('.chat-messages');
                
                // Добавляем сообщение пользователя
                const userMsg = document.createElement('div');
                userMsg.className = 'message user';
                userMsg.style.cssText = `
                    background: #003366;
                    color: white;
                    padding: 12px 15px;
                    border-radius: 15px 15px 5px 15px;
                    margin-bottom: 10px;
                    max-width: 80%;
                    margin-left: auto;
                    text-align: right;
                `;
                userMsg.textContent = message;
                messagesContainer.appendChild(userMsg);
                
                input.value = '';
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
                
                // Имитация ответа бота (в реальности здесь будет интеграция с n8n)
                setTimeout(() => {
                    const botMsg = document.createElement('div');
                    botMsg.className = 'message bot';
                    botMsg.style.cssText = `
                        background: white;
                        padding: 12px 15px;
                        border-radius: 15px 15px 15px 5px;
                        margin-bottom: 10px;
                        max-width: 80%;
                        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                    `;
                    
                    // Простая логика ответов для демо
                    const responses = {
                        'привет': 'Здравствуйте! Чем могу помочь?',
                        'цена': 'Для расчета стоимости услуги мне нужно узнать тип судна и объем работ. Позвоните нам: +7 (978) 088-23-45',
                        'сервис': 'Мы предоставляем полный спектр сервисных услуг: ремонт двигателей, электрики, корпуса. Перейдите на страницу "Сервис" для подробностей.',
                        'экстренный': 'Для срочного выезда позвоните: +7 (978) 088-23-45 (круглосуточно)',
                        'контакт': 'Тел: +7 (978) 088-23-45\nEmail: trade@azzurro-online.com\nVK: vk.com/azzurrogroup'
                    };
                    
                    let response = 'Спасибо за обращение! Наш менеджер свяжется с вами. Для быстрой связи звоните: +7 (978) 088-23-45';
                    
                    for (const key in responses) {
                        if (message.toLowerCase().includes(key)) {
                            response = responses[key];
                            break;
                        }
                    }
                    
                    botMsg.textContent = response;
                    messagesContainer.appendChild(botMsg);
                    messagesContainer.scrollTop = messagesContainer.scrollHeight;
                }, 1000);
            }
        };
        
        chatWindow.querySelector('.send-btn').addEventListener('click', sendMessage);
        chatWindow.querySelector('input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    };

    // === ОБРАБОТКА ФОРМ ===
    const initForms = () => {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Собираем данные формы
                const formData = new FormData(form);
                const data = Object.fromEntries(formData);
                
                console.log('Форма отправлена:', data);
                
                // Показываем уведомление
                showNotification('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
                
                form.reset();
            });
        });
    };

    // === УВЕДОМЛЕНИЯ ===
    const showNotification = (message) => {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #003366;
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.3);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    };

    // === ПЛАВНАЯ ПРОКРУТКА ===
    const initSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    };

    // === АНИМАЦИИ ПРИ СКРОЛЛЕ ===
    const initScrollAnimations = () => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Анимируем карточки при скролле
        const cards = document.querySelectorAll('.service-card, .eng-card, .brokerage-card, .category-card');
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    };

    // === ИНИЦИАЛИЗАЦИЯ ===
    initMobileMenu();
    initMap();
    initAIChat();
    initForms();
    initSmoothScroll();
    initScrollAnimations();

    // Обработка изменения размера окна
    window.addEventListener('resize', () => {
        initMobileMenu();
    });

    console.log('🚢 Azzurro Trade сайт загружен');
});
