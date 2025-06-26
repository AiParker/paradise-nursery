// main.js – shared script for updating cart icon across pages

document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
});

function updateCartCount() {
  const cartCountEl = document.getElementById('cart-count');
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCountEl.textContent = totalItems;
}
