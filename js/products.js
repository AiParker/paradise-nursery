const products = [
  { id: 1, name: 'Lavender', price: 10, image: '/Images/lavender.png' },
  { id: 2, name: 'Mint', price: 8, image: '/Images/mint.png' },
  { id: 3, name: 'Aloe Vera', price: 12, image: '/Images/aloe-vera.png' },
  { id: 4, name: 'Neem', price: 11, image: '/Images/neem.png' },
  { id: 5, name: 'Fern', price: 9, image: '/Images/fern.png' },
  { id: 6, name: 'Snake Plant', price: 14, image: '/Images/snake-plant.png' }
];

document.addEventListener('DOMContentLoaded', () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
  }

  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
      const card = e.target.closest('.product-card');
      const id = Number(card.dataset.id);
      const product = products.find(p => p.id === id);
      const existing = cart.find(item => item.id === id);

      if (existing) {
        existing.quantity++;
      } else {
        cart.push({ ...product, quantity: 1 });
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount();
    });
  });

  updateCartCount();
});
