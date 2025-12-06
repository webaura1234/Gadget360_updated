export function Legal(type) {
  const content = {
    'legal': {
      title: 'LEGAL',
      body: `
        <p>Find our policies and legal documents below.</p>
        <ul style="margin-top: 20px; line-height: 2;">
          <li><a href="/terms" class="btn-link" data-link>Terms & Conditions</a></li>
          <li><a href="/privacy" class="btn-link" data-link>Privacy Policy</a></li>
          <li><a href="/shipping" class="btn-link" data-link>Shipping Policy</a></li>
          <li><a href="/refund" class="btn-link" data-link>Refund Policy</a></li>
          <li><a href="/accessibility" class="btn-link" data-link>Accessibility Statement</a></li>
        </ul>
      `
    },
    'terms': {
      title: 'TERMS & CONDITIONS',
      body: `
        <h3>Introduction</h3>
        <p>Welcome to GADGET360. By accessing this website, you agree to be bound by these terms and conditions.</p>
        <h3>Use of the Website</h3>
        <p>You may not use our products for any illegal or unauthorized purpose.</p>
        <h3>Purchases, Pricing & Payments</h3>
        <p>We reserve the right to refuse any order you place with us.</p>
      `
    },
    'privacy': {
      title: 'PRIVACY POLICY',
      body: `
        <h3>Information We Collect</h3>
        <p>We collect information you provide directly to us.</p>
        <h3>How We Use Your Information</h3>
        <p>We use the information we collect to provide, maintain, and improve our services.</p>
      `
    },
    'shipping': {
      title: 'SHIPPING POLICY',
      body: `
        <h3>Processing Time</h3>
        <p>All orders are processed within 1-2 business days.</p>
        <h3>Shipping Rates</h3>
        <p>Shipping charges for your order will be calculated and displayed at checkout.</p>
      `
    },
    'refund': {
      title: 'REFUND POLICY',
      body: `
        <h3>Eligibility for Refunds</h3>
        <p>Our policy lasts 30 days. If 30 days have gone by since your purchase, unfortunately we can’t offer you a refund or exchange.</p>
      `
    },
    'accessibility': {
      title: 'ACCESSIBILITY STATEMENT',
      body: `
        <h3>Our Commitment</h3>
        <p>GADGET360 is committed to ensuring digital accessibility for people with disabilities.</p>
      `
    }
  };

  const pageData = content[type] || content['legal'];

  return `
    <div class="container section" style="padding-top: 50px; max-width: 800px;">
      <h1 style="margin-bottom: 30px;">${pageData.title}</h1>
      <div class="legal-content">
        ${pageData.body}
      </div>
    </div>
  `;
}
