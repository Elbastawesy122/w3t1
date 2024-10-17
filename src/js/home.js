const cartIcon = document.getElementById('cartIcon');
const buttonlog = document.getElementById('buttonlog');

const products = [
    { id: 1, name: 'Seafood Noodles', image: '../image/menu1.png', price: 250 },
    { id: 2, name: 'Sushi', image: '../image/menu2.png', price: 350 },
    { id: 3, name: 'Meat Noodles', image: '../image/menu3.png', price: 250 },
    { id: 4, name: 'Fried Dumplings', image: '../image/menu4.png', price: 250 },
    { id: 5, name: 'Sushi Smoked salmon', image: '../image/menu5.png', price: 350 },
    { id: 6, name: 'Curry Soup', image: '../image/menu6.png', price: 500 }
];

function renderProducts() {
    const productList = document.getElementById('productList');
    productList.innerHTML = products.map(product => `
        <div class="card">
            <img src="${product.image}" alt="${product.name}">
            <div class="card-body">
                <h1>${product.name}</h1>
                <p class="my-3 text-[#928D8D] font-bold">${product.price}$</p>
                <button onclick="addToCart(${product.id})" class="py-3 px-7 bg-[#D90429] font-bold text-white rounded">Add to Cart</button>
            </div>
        </div>
    `).join('');
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
}

window.onload = function() {
    if (!localStorage.getItem('user')) {
        window.location.href = 'index.html';
    } else {
        renderProducts();
    }
};

cartIcon.addEventListener('click', function() {
    window.location.href = 'cart.html';
});

buttonlog.addEventListener('click', function() {
    localStorage.removeItem('user');
    window.location.href = 'index.html';
    alert("REALY");
});
