import { cart } from '../cart.js';
import { createIcons, X, Trash2, Plus, Minus } from 'lucide';

export function CartModal() {
    const itemsHtml = cart.items.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" class="cart-item-img">
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <p class="cart-item-price">₹${item.price.toFixed(2)}</p>
        <div class="cart-item-controls">
          <div class="quantity-control">
            <button class="btn-qty" data-action="decrease" data-id="${item.id}">
              <i data-lucide="minus" style="width: 12px;"></i>
            </button>
            <span>${item.quantity}</span>
            <button class="btn-qty" data-action="increase" data-id="${item.id}">
              <i data-lucide="plus" style="width: 12px;"></i>
            </button>
          </div>
          <button class="btn-remove" data-action="remove" data-id="${item.id}">
            <i data-lucide="trash-2" style="width: 16px;"></i>
          </button>
        </div>
      </div>
    </div>
  `).join('');

    return `
    <div class="cart-overlay" id="cart-overlay">
      <div class="cart-drawer">
        <div class="cart-header">
          <h2>Your Cart (${cart.count})</h2>
          <button class="btn-close-cart" id="close-cart">
            <i data-lucide="x"></i>
          </button>
        </div>
        
        <div class="cart-body">
          ${cart.items.length === 0 ? `
            <div class="empty-cart">
              <p>Your cart is empty</p>
              <button class="btn btn-primary" id="start-shopping">Start Shopping</button>
            </div>
          ` : `
            <div class="cart-items-list">
              ${itemsHtml}
            </div>
          `}
        </div>

        ${cart.items.length > 0 ? `
          <div class="cart-footer">
            <div class="cart-total">
              <span>Subtotal</span>
              <span>₹${cart.total.toFixed(2)}</span>
            </div>
            <button class="btn btn-primary btn-block" id="checkout-btn">CHECKOUT</button>
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

export function initCartIcons() {
    createIcons({
        icons: { X, Trash2, Plus, Minus }
    });
}
