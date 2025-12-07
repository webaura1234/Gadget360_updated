export function Legal(type) {
  const content = {
    'legal': {
      title: 'LEGAL',
      body: `
        <div class="info-section">
          <p>Find our policies and legal documents below.</p>
          <ul>
            <li><a href="/terms" data-link>Terms & Conditions</a></li>
            <li><a href="/privacy" data-link>Privacy Policy</a></li>
            <li><a href="/shipping" data-link>Shipping Policy</a></li>
            <li><a href="/refund" data-link>Refund Policy</a></li>
            <li><a href="/accessibility" data-link>Accessibility Statement</a></li>
          </ul>
        </div>
      `
    },
    'terms': {
      title: 'TERMS & CONDITIONS',
      body: `
        <div class="info-section">
          <h3>Introduction</h3>
          <p>Welcome to GADGET360. By accessing this website, you agree to be bound by these terms and conditions.</p>
        </div>
        <div class="info-section">
          <h3>Use of the Website</h3>
          <p>You may not use our products for any illegal or unauthorized purpose.</p>
        </div>
        <div class="info-section">
          <h3>Purchases, Pricing & Payments</h3>
          <p>We reserve the right to refuse any order you place with us.</p>
        </div>
      `
    },
    'privacy': {
      title: 'PRIVACY POLICY',
      body: `
        <div class="info-section">
          <h3>Information We Collect</h3>
          <p>We collect information you provide directly to us.</p>
        </div>
        <div class="info-section">
          <h3>How We Use Your Information</h3>
          <p>We use the information we collect to provide, maintain, and improve our services.</p>
        </div>
      `
    },
    'shipping': {
      title: 'SHIPPING POLICY',
      body: `
        <div class="info-section">
          <h3>Processing Time</h3>
          <p>All orders are processed within 1-2 business days.</p>
        </div>
        <div class="info-section">
          <h3>Shipping Rates</h3>
          <p>Shipping charges for your order will be calculated and displayed at checkout.</p>
        </div>
      `
    },
    'refund': {
      title: 'REFUND POLICY',
      body: `
        <div class="info-section">
          <h3>Eligibility for Refunds</h3>
          <p>Our policy lasts 30 days. If 30 days have gone by since your purchase, unfortunately we can't offer you a refund or exchange.</p>
        </div>
      `
    },
    'accessibility': {
      title: 'ACCESSIBILITY STATEMENT',
      body: `
        <div class="info-section">
          <h3>Our Commitment</h3>
          <p>GADGET360 is committed to ensuring digital accessibility for people with disabilities.</p>
        </div>
      `
    }
  };

  const pageData = content[type] || content['legal'];

  return `
    <div class="info-page">
      <div class="info-page-container">
        <div class="info-page-header">
          <h1 class="info-page-title">${pageData.title}</h1>
        </div>
        <div class="info-page-content">
          ${pageData.body}
        </div>
      </div>
    </div>
  `;
}
