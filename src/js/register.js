document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault(); // منع إعادة تحميل الصفحة

    // استرجاع المدخلات من المستخدم
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    // التحقق من أن الحقول ليست فارغة
    if (!username || !email || !password) {
        alert('All fields are required.');
        return;
    }

    // التحقق من وجود المستخدم بالفعل في localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(user => user.email === email)) {
        alert('Email is already registered. Please use a different email.');
        return;
    }

    // إضافة المستخدم الجديد إلى القائمة
    users.push({ username, email, password });
    localStorage.setItem('users', JSON.stringify(users));

    alert('Registration successful! You can now login.');
    window.location.href = 'index.html'; // توجيه المستخدم إلى صفحة تسجيل الدخول
});
