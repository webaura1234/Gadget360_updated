export class Cart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('gadget360_cart')) || [];
        this.listeners = [];
    }

    get count() {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
    }

    get total() {
        return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    addItem(product, quantity = 1, options = {}) {
        const color = options.color || 'Default';
        const existingItem = this.items.find(item => item.id === product.id && (item.color || 'Default') === color);
        if (existingItem) {
            existingItem.quantity += parseInt(quantity);
        } else {
            this.items.push({ ...product, quantity: parseInt(quantity), color });
        }
        this.save();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.save();
    }

    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = quantity;
            if (item.quantity <= 0) {
                this.removeItem(productId);
            } else {
                this.save();
            }
        }
    }

    clear() {
        this.items = [];
        this.save();
    }

    save() {
        localStorage.setItem('gadget360_cart', JSON.stringify(this.items));
        this.notify();
    }

    subscribe(callback) {
        this.listeners.push(callback);
    }

    notify() {
        this.listeners.forEach(callback => callback(this));
    }
}

export const cart = new Cart();
