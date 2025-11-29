export function OrderSuccess() {
  return `
    <div class="container text-center" style="padding: 100px 0;">
      <div style="display: inline-flex; align-items: center; justify-content: center; width: 80px; height: 80px; background-color: var(--color-success); color: #000; border-radius: 50%; margin-bottom: 30px;">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
      </div>
      <h1 style="margin-bottom: 20px;">Thank You For Your Order!</h1>
      <p style="font-size: 1.2rem; color: var(--color-text-muted); margin-bottom: 40px;">Your order has been placed successfully. You will receive an email confirmation shortly.</p>
      <a href="/" class="btn btn-primary" data-link>Continue Shopping</a>
    </div>
  `;
}
