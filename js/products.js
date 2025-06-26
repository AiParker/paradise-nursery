const products = [
  { id: 1, name: 'Lavender', price: 10, image: 'paradise-nursery/Images/lavender.jpg' },
  { id: 2, name: 'Mint', price: 8, image: 'paradise-nursery/Images/mint.jpg' },
  { id: 3, name: 'Aloe Vera', price: 12, image: 'paradise-nursery/Images/aloe-vera.jpg' },
  { id: 4, name: 'Neem', price: 11, image: 'paradise-nursery/Images/neem.jpg' },
  { id: 5, name: 'Fern', price: 9, image: 'paradise-nursery/Images/fern.jpg' },
  { id: 6, name: 'Snake Plant', price: 14, image: 'paradise-nursery/Images/snake-plant.jpg' }
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
