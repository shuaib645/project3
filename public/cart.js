const cartItemsContainer = document.getElementById('cart-items');
const totalContainer = document.getElementById('total');
const sendBillButton = document.getElementById('send-bill');

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Display cart items
function displayCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        cartItemsContainer.innerHTML += `
            <p>${index + 1}. ${item.name} - $${item.price}</p>
        `;
    });

    totalContainer.textContent = `Total: $${total}`;
}

sendBillButton.addEventListener('click', () => {
    const message = cart.map(item => `${item.name}: $${item.price}`).join('\n');
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const whatsappMessage = encodeURIComponent(`Your Bill:\n${message}\n\nTotal: $${total}`);
    window.open(`https://wa.me/?text=${whatsappMessage}`, '_blank');
});

displayCart();
