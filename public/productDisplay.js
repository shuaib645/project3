import { db, collection, getDocs } from './firebaseConfig.js';

const productList = document.getElementById('product-list');
const searchBar = document.getElementById('search-bar');
let allProducts = [];

// Fetch and display products
async function fetchProducts() {
    const productsRef = collection(db, 'products');
    const snapshot = await getDocs(productsRef);

    allProducts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    displayProducts(allProducts);
}

function displayProducts(products) {
    productList.innerHTML = '';
    products.forEach(product => {
        const item = document.createElement('div');
        item.classList.add('product-item');
        item.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Price: $${product.price}</p>
            <button onclick="addToCart('${product.id}', '${product.name}', ${product.price})">Add to Cart</button>
        `;
        productList.appendChild(item);
    });
}

window.addToCart = (id, name, price) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ id, name, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart!');
};

// Search products
searchBar.addEventListener('input', () => {
    const filtered = allProducts.filter(product =>
        product.name.toLowerCase().includes(searchBar.value.toLowerCase())
    );
    displayProducts(filtered);
});

window.onload = fetchProducts;
