export function Help() {
  return `
    <div class="help-page">
      <section class="hero-section" style="height: 300px; background-image: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=1600');">
        <div class="hero-content">
          <h1>HELP CENTER</h1>
          <p>We’re here to help you with orders, shipping, returns and more.</p>
          <div class="search-bar" style="margin-top: 20px; max-width: 500px; margin-left: auto; margin-right: auto;">
            <input type="text" placeholder="Search our help articles..." style="width: 100%; padding: 15px; border-radius: 30px; border: 1px solid #2A2A2A; background: #111; color: #fff;">
          </div>
        </div>
      </section>

      <div class="container section">
        <div class="category-grid" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));">
          <div class="category-card" style="height: 150px;">Orders & Payments</div>
          <div class="category-card" style="height: 150px;">Shipping & Delivery</div>
          <div class="category-card" style="height: 150px;">Returns & Refunds</div>
          <div class="category-card" style="height: 150px;">Account & Login</div>
          <div class="category-card" style="height: 150px;">Product Information</div>
        </div>
      </div>

      <div class="container section">
        <h2 class="text-center" style="margin-bottom: 30px;">FREQUENTLY ASKED QUESTIONS</h2>
        <div class="faq-list" style="max-width: 800px; margin: 0 auto;">
          <details style="margin-bottom: 15px; border-bottom: 1px solid #333; padding-bottom: 10px;">
            <summary style="font-weight: 600; cursor: pointer; padding: 10px 0;">How can I track my order?</summary>
            <p style="padding-top: 10px; color: #aaa;">You can track your order by logging into your account or using the tracking link sent to your email.</p>
          </details>
          <details style="margin-bottom: 15px; border-bottom: 1px solid #333; padding-bottom: 10px;">
            <summary style="font-weight: 600; cursor: pointer; padding: 10px 0;">What is your return policy?</summary>
            <p style="padding-top: 10px; color: #aaa;">We accept returns within 30 days of purchase. Items must be unused and in original packaging.</p>
          </details>
          <details style="margin-bottom: 15px; border-bottom: 1px solid #333; padding-bottom: 10px;">
            <summary style="font-weight: 600; cursor: pointer; padding: 10px 0;">How long does shipping take?</summary>
            <p style="padding-top: 10px; color: #aaa;">Standard shipping takes 3-5 business days. Express shipping is available.</p>
          </details>
        </div>
      </div>

      <div class="container section contact-section" style="max-width: 600px; margin: 0 auto; text-align: center;">
        <h2>Still need help?</h2>
        <p class="text-muted" style="margin-bottom: 20px;">Reach out to our support team.</p>
        <form class="newsletter-form">
          <div class="input-group" style="flex-direction: column;">
            <input type="text" placeholder="Name" required>
            <input type="email" placeholder="Email" required>
            <input type="text" placeholder="Subject" required>
            <textarea placeholder="Message" rows="5" style="padding: 10px; border: 1px solid var(--color-border); border-radius: 8px; background-color: var(--color-bg-card); color: var(--color-text-main);"></textarea>
            <button type="submit" class="btn btn-primary">SEND MESSAGE</button>
          </div>
        </form>
      </div>
    </div>
  `;
}
