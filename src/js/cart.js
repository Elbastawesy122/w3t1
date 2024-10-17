function renderCart() {
    const user = localStorage.getItem('user');
    if (!user) return;

    let cart = JSON.parse(localStorage.getItem(`cart_${user}`)) || [];
    const cartList = document.getElementById('cartList');
    const totalPrice = document.getElementById('totalPrice');

    const groupedCart = cart.reduce((acc, product) => {
        const existingProduct = acc.find(item => item.id === product.id);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            acc.push({ ...product, quantity: 1 });
        }
        return acc;
    }, []);

    cartList.innerHTML = groupedCart.map((product) => `
        <div class="box flex justify-between items-center">
            <img src="${product.image}" alt="${product.name}">
            <div class="text">${product.name} - $${product.price} x ${product.quantity}</div>
            <button class="" onclick="removeFromCart(${product.id})">Remove</button>
        </div>
    `).join('');

    const total = groupedCart.reduce((sum, product) => sum + (product.price * product.quantity), 0);
    totalPrice.textContent = `Total: $${total}`;
}

function addToCart(productId) {
    const user = localStorage.getItem('user');
    if (!user) {
        alert("Please login first!");
        return;
    }

    let cart = JSON.parse(localStorage.getItem(`cart_${user}`)) || [];
    const product = products.find(p => p.id === productId);

    cart.push(product);
    localStorage.setItem(`cart_${user}`, JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
    renderCart();
}

function removeFromCart(productId) {
    const user = localStorage.getItem('user');
    if (!user) return;

    let cart = JSON.parse(localStorage.getItem(`cart_${user}`)) || [];

    const productIndex = cart.findIndex(product => product.id === productId);

    if (productIndex !== -1) {
        cart.splice(productIndex, 1);
        localStorage.setItem(`cart_${user}`, JSON.stringify(cart));
        renderCart();
    }
}

window.onload = function() {
    if (!localStorage.getItem('user')) {
        window.location.href = 'index.html';
    } else {
        renderCart();
    }
};
