
// Проверяем, если пользователь авторизован
window.onload = function() {
    checkUserStatus();
};

// Проверка состояния пользователя (вход/выход)
function checkUserStatus() {
    const userName = localStorage.getItem('userName');
    const loginBtn = document.getElementById('login-btn');
    const userInfo = document.getElementById('user-info');
    const userNameDisplay = document.getElementById('user-name');

    if (userName) {
        loginBtn.style.display = 'none'; // Скрыть кнопку входа
        userInfo.style.display = 'block'; // Показать данные пользователя
        userNameDisplay.textContent = userName; // Показать имя пользователя
    } else {
        loginBtn.style.display = 'block'; // Показать кнопку входа
        userInfo.style.display = 'none'; // Скрыть данные пользователя
    }
}

// Логика выхода
function logout() {
    localStorage.removeItem('userName'); // Удалить имя пользователя из localStorage
    checkUserStatus(); // Обновить интерфейс
}

// Логика входа (заполняется после входа пользователя)
function login(userName) {
    localStorage.setItem('userName', userName); // Сохраняем имя пользователя в localStorage
    checkUserStatus(); // Обновляем интерфейс
}

// Логика регистрации
function register(userName) {
    // Здесь можно добавить код для регистрации пользователя
    login(userName);
}
