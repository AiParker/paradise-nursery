document.addEventListener('DOMContentLoaded', () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItemsContainer = document.getElementById('cart-items');
  const totalItemsEl = document.getElementById('total-items');
  const totalCostEl = document.getElementById('total-cost');

  function renderCart() {
    cartItemsContainer.innerHTML = '';
    let totalItems = 0;
    let totalCost = 0;

    cart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      totalItems += item.quantity;
      totalCost += itemTotal;

      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-details">
          <h3>${item.name}</h3>
          <p>$${item.price} each</p>
          <p>Total: $${itemTotal.toFixed(2)}</p>
        </div>
        <div class="cart-controls">
          <button class="decrease">−</button>
          <span>${item.quantity}</span>
          <button class="increase">+</button>
          <button class="delete">❌</button>
        </div>
      `;

      // Controls
      const [decreaseBtn, increaseBtn, deleteBtn] = div.querySelectorAll('button');

      increaseBtn.addEventListener('click', () => {
        item.quantity++;
        saveAndRender();
      });

      decreaseBtn.addEventListener('click', () => {
        if (item.quantity > 1) {
          item.quantity--;
        } else {
          cart.splice(cart.indexOf(item), 1);
        }
        saveAndRender();
      });

      deleteBtn.addEventListener('click', () => {
        cart.splice(cart.indexOf(item), 1);
        saveAndRender();
      });

      cartItemsContainer.appendChild(div);
    });

    totalItemsEl.textContent = totalItems;
    totalCostEl.textContent = totalCost.toFixed(2);
    document.getElementById('cart-count').textContent = totalItems;
  }

  function saveAndRender() {
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  }

  renderCart();

  document.querySelector('.checkout').addEventListener('click', () => {
    alert("Thank you for your purchase! (Checkout simulation)");
    localStorage.removeItem('cart');
    window.location.href = "index.html";
  });
});
