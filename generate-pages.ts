import * as fs from 'fs';
import * as path from 'path';

// Define the business constants
const PHONE_NUMBER = '09725713944';
const PHONE_DISPLAY = '097257 13944';
const EMAIL = 'service@viratfurniture.com';
const ADDRESS = 'Shop Number G109, Gaurav Path Road, Palanpur, Surat, Gujarat 395009';
const MAP_IFRAME_SRC = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14878.697475149303!2d72.77196025000001!3d21.2050965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f131!3m3!1m2!1s0x3be04df161109aab%3A0xc3f8e56b8be8807d!2sVirat%20Furniture!5e0!3m2!1sen!2sin!4v1718873729910!5m2!1sen!2sin';
const BASE_URL = 'https://viratfurniture.com';

const COMMON_META_KEYWORDS = 'virat furniture, shubham sahani, furniture surat, adajan carpenters, modular furniture gaurav path, custom wardrobes, sofa repair surat';

// Helper to wrap the page with consistent layout wrapper
function getLayoutWrapper(title: string, description: string, canonical: string, contentHtml: string, schemaMarkup = ''): string {
  return `<!DOCTYPE html>
<html lang="en-IN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <meta name="keywords" content="${COMMON_META_KEYWORDS}">
  <link rel="canonical" href="${BASE_URL}/${canonical}">
  
  <!-- Open Graph -->
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${BASE_URL}/${canonical}">
  <meta property="og:image" content="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80">
  <meta property="og:site_name" content="Virat Furniture">
  
  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,400&display=swap" rel="stylesheet">
  
  <!-- Styles -->
  <link rel="stylesheet" href="/style.css">
  <link rel="stylesheet" href="/responsive.css">
  
  ${schemaMarkup}
</head>
<body>
  <!-- Header -->
  <header>
    <div class="top-bar">
      <div class="container top-bar-inner">
        <span>📍 Shop Number G109, Gaurav Path Road, Palanpur, Surat</span>
        <span>📞 <a href="tel:${PHONE_NUMBER}" style="color:white; font-weight: 600;">${PHONE_DISPLAY}</a></span>
      </div>
    </div>
    <div class="container header-main">
      <a href="/index.html" class="logo-wrapper">
        <h1 class="logo" style="margin-bottom: 0;">Virat<span>Furniture</span></h1>
        <span class="logo-sub">by Shubham Sahani · Adajan, Surat</span>
      </a>
      
      <nav aria-label="Main Navigation">
        <ul class="nav-menu" id="nav-menu">
          <li><a href="/index.html" class="nav-link">Home</a></li>
          <li><a href="/about-us.html" class="nav-link">About Us</a></li>
          <li><a href="/our-work.html" class="nav-link">Our Work</a></li>
          <li><a href="/why-us.html" class="nav-link">Why Us</a></li>
          <li><a href="/faq.html" class="nav-link">FAQs</a></li>
          <li><a href="/areas.html" class="nav-link">Areas</a></li>
          <li><a href="/contact-us.html" class="nav-link">Contact</a></li>
        </ul>
      </nav>
      
      <a href="tel:${PHONE_NUMBER}" class="nav-cta-btn">Call: ${PHONE_DISPLAY}</a>
      
      <button class="mobile-menu-toggle" id="mobile-menu-toggle" aria-expanded="false" aria-label="Toggle Navigation">☰</button>
    </div>
  </header>

  <main id="main-content">
    ${contentHtml}
  </main>

  <!-- Footer -->
  <footer>
    <div class="container footer-grid">
      <div class="footer-col footer-about">
        <a href="/index.html" class="logo-link">
          <div class="logo"><h3>Virat<span>Furniture</span></h3></div>
        </a>
        <p style="font-size: 0.8rem; margin-top:-5px; margin-bottom:15px; color:var(--secondary)">by Shubham Sahani · Adajan, Surat</p>
        <p>Premium domestic & commercial custom furniture design, repair, and woodworking services across the city of Surat. Serving client happiness since 2008 with an expert team of 16 seasoned carpenters.</p>
        <p>© 2026 Virat Furniture. All rights reserved.</p>
      </div>
      
      <div class="footer-col">
        <h4>Useful Links</h4>
        <ul class="footer-links-list">
          <li><a href="/index.html">Home</a></li>
          <li><a href="/about-us.html">About Us</a></li>
          <li><a href="/our-work.html">Our Work</a></li>
          <li><a href="/why-us.html">Why Us</a></li>
          <li><a href="/faq.html">FAQs</a></li>
          <li><a href="/areas.html">Areas We Serve</a></li>
          <li><a href="/contact-us.html">Contact Us</a></li>
        </ul>
      </div>
      
      <div class="footer-col">
        <h4>Our Services</h4>
        <ul class="footer-links-list">
          <li><a href="/sofa-repair-surat.html">Sofa Repair & Restoration</a></li>
          <li><a href="/sofa-making-surat.html">Premium Sofa Making</a></li>
          <li><a href="/furniture-repair-surat.html">General Furniture Repair</a></li>
          <li><a href="/modular-furniture-surat.html">Modular Furniture Setup</a></li>
          <li><a href="/wooden-furniture-work-surat.html">Wooden Woodworking Service</a></li>
          <li><a href="/custom-furniture-surat.html">Bespoke Custom Furniture</a></li>
          <li><a href="/wardrobe-design-surat.html">Modern Wardrobe & Almari</a></li>
        </ul>
      </div>
      
      <div class="footer-col">
        <h4>Locate Us</h4>
        <address>
          <div class="footer-contact-item">
            <span>📍</span>
            <span>Shop G109, Gaurav Path Road,<br>Palanpur, Surat, GJ 395009</span>
          </div>
          <div class="footer-contact-item">
            <span>📞</span>
            <span><a href="tel:${PHONE_NUMBER}">${PHONE_DISPLAY}</a></span>
          </div>
          <div class="footer-contact-item">
            <span>✉️</span>
            <span><a href="mailto:${EMAIL}">${EMAIL}</a></span>
          </div>
        </address>
        <div class="footer-map-embed" style="margin-top: 15px;">
          <iframe src="${MAP_IFRAME_SRC}" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
    </div>
    
    <div class="container footer-bottom">
      <div>
        Virat Furniture by Shubham Sahani — Surat's Premier Carpenters.
      </div>
      <div>
        Website: <a href="${BASE_URL}" style="color:var(--secondary)">viratfurniture.com</a>
      </div>
    </div>
  </footer>

  <!-- Floating Utilities -->
  <div class="floating-buttons">
    <a href="https://wa.me/919725713944?text=Hi%20Virat%20Furniture%2C%20I%20would%20like%20to%20get%20a%20free%20quote%20for%20furniture%20services." target="_blank" rel="noopener" class="float-btn float-wa" aria-label="WhatsApp Chat">💬</a>
    <a href="tel:${PHONE_NUMBER}" class="float-btn float-call" aria-label="Phone Call">📞</a>
    <button id="back-top" class="float-btn float-top" aria-label="Scroll to top" style="display: none;">↑</button>
  </div>

  <!-- Scripts -->
  <script src="/main.js" defer></script>
</body>
</html>`;
}

// Generate Local Business Schema Markup helper
function getLocalBusinessSchema(title: string, desc: string, canonicalUrl: string): string {
  return `<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Virat Furniture",
    "image": "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
    "@id": "${BASE_URL}/${canonicalUrl}",
    "url": "${BASE_URL}/${canonicalUrl}",
    "telephone": "+919725713944",
    "priceRange": "INR",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Shop Number G109, Gaurav Path Road, Palanpur",
      "addressLocality": "Surat",
      "postalCode": "395009",
      "addressRegion": "Gujarat",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 21.2050965,
      "longitude": 72.77196025
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "19:00"
    },
    "sameAs": [
      "https://viratfurniture.com"
    ]
  }
  </script>`;
}

// Sidebar markup generator helper for subpages (both service & area)
function getSidebarWidgetMarkup(activeItem = ''): string {
  return `<aside class="sidebar" aria-label="Services Sidebar">
    <div class="sidebar-widget">
      <h3>Our Specialized Services</h3>
      <ul class="sidebar-services-list">
        <li><a href="/sofa-repair-surat.html" class="${activeItem === 'sofa-repair' ? 'active' : ''}">Sofa Repair & Repairing</a></li>
        <li><a href="/sofa-making-surat.html" class="${activeItem === 'sofa-making' ? 'active' : ''}">Custom Sofa Making</a></li>
        <li><a href="/furniture-repair-surat.html" class="${activeItem === 'furniture-repair' ? 'active' : ''}">Furniture Repair Services</a></li>
        <li><a href="/modular-furniture-surat.html" class="${activeItem === 'modular-furniture' ? 'active' : ''}">Modular Furniture Work</a></li>
        <li><a href="/wooden-furniture-work-surat.html" class="${activeItem === 'wooden-furniture' ? 'active' : ''}">Wooden Woodwork Design</a></li>
        <li><a href="/office-furniture-surat.html" class="${activeItem === 'office-furniture' ? 'active' : ''}">Office & Commercial Desk</a></li>
        <li><a href="/custom-furniture-surat.html" class="${activeItem === 'custom-furniture' ? 'active' : ''}">Custom Tailored Pieces</a></li>
        <li><a href="/wardrobe-design-surat.html" class="${activeItem === 'wardrobe-design' ? 'active' : ''}">Almari & Wardrobe Design</a></li>
        <li><a href="/bed-making-surat.html" class="${activeItem === 'bed-making' ? 'active' : ''}">Double Bed & Cot Design</a></li>
        <li><a href="/carpenter-services-surat.html" class="${activeItem === 'carpenter-services' ? 'active' : ''}">Professional Carpenter Services</a></li>
      </ul>
    </div>
    
    <div class="sidebar-widget sidebar-cta">
      <h3>Need a Fast Quote?</h3>
      <p>Schedule a <strong>Free Site Visit</strong>. Let our expert home designers measure your space and consult on design, budget and materials.</p>
      <a href="tel:${PHONE_NUMBER}" class="btn btn-primary" style="margin-top:20px; text-decoration:none;">📞 Call: ${PHONE_DISPLAY}</a>
      <a href="https://wa.me/919725713944?text=I%20would%20like%20to%20schedule%20a%20free%20site%20visit%20estimate." target="_blank" rel="noopener" class="btn btn-secondary" style="margin-top:10px; width: 100%; text-decoration:none; border-color: white; color: var(--secondary); background: transparent;">💬 Chat on WhatsApp</a>
    </div>
  </aside>`;
}

// FAQ block rendering
function getFaqBlockHtml(faqs: {q: string, a: string}[]): string {
  let list = '';
  faqs.forEach(faq => {
    list += `
    <details class="faq-row">
      <summary class="faq-header">${faq.q}</summary>
      <div class="faq-content">
        <p>${faq.a}</p>
      </div>
    </details>`;
  });
  return `<section class="faq-section section-padding">
    <div class="container">
      <span class="badge" style="display:block; margin:0 auto 10px auto; width:fit-content;">FAQ</span>
      <h2 class="section-title">Frequently Asked Questions</h2>
      <p class="section-subtitle">Read queries regarding warranties, custom selections, materials, and schedules in Surat.</p>
      <div class="faq-container">
        ${list}
      </div>
    </div>
  </section>`;
}

// Lead form widget element
function getEnquiryFormHtml(title = 'Schedule A Free Site Assessment'): string {
  return `<div class="contact-form-side" style="padding: 40px; background-color: var(--white); border-radius: var(--border-radius); border: 1px solid rgba(216, 176, 140, 0.2); box-shadow: var(--shadow-md);">
    <h3 style="font-family: var(--ff-serif); color: var(--accent); margin-bottom: 20px;">${title}</h3>
    <form onsubmit="return handleFormSubmit(event)">
      <div class="form-row">
        <div class="form-item">
          <label>Your Full Name *</label>
          <input type="text" name="name" placeholder="E.g. Rajesh Shah" required>
        </div>
        <div class="form-item">
          <label>Mobile Number *</label>
          <input type="tel" name="phone" placeholder="E.g. 98250 12345" required>
        </div>
      </div>
      
      <div class="form-item">
        <label>Your Area in Surat</label>
        <select name="area">
          <option value="Adajan">Adajan</option>
          <option value="Vesu">Vesu</option>
          <option value="Pal">Pal</option>
          <option value="Palanpur">Palanpur</option>
          <option value="Katargam">Katargam</option>
          <option value="Varachha">Varachha</option>
          <option value="City Light">City Light</option>
          <option value="VIP Road">VIP Road</option>
          <option value="Althan">Althan</option>
          <option value="Rander">Rander</option>
          <option value="Other">Other Area</option>
        </select>
      </div>
      
      <div class="form-item">
        <label>Primary Service Needed *</label>
        <select name="service" required>
          <option value="">-- Choose Services --</option>
          <option value="Sofa Repair">Sofa Repairing</option>
          <option value="New Sofa Making">Pre-made / Custom Sofa Making</option>
          <option value="Full Beds Design">Bed & Drawer Making</option>
          <option value="Modular Kitchen Design">Modular Kitchen Fit Out</option>
          <option value="Wardrobe Almari Setup">Wardrobe Almari Design</option>
          <option value="Complete Home Woodworking">Complete Home Wooden Work</option>
          <option value="General Wooden Repair">General Repair & Polishing</option>
        </select>
      </div>
      
      <div class="form-item">
        <label>Tell Us More About Your Project (Dimensions, Materials, etc.)</label>
        <textarea name="message" placeholder="Please describe wood choice, laminates, locks, or urgent repairing timeline request..."></textarea>
      </div>
      
      <button type="submit" class="btn btn-primary" style="width: 100%; border: none; font-size: 1.05rem;">Submit Inquiry on WhatsApp →</button>
      <p style="font-size: 0.78rem; text-align: center; color: var(--text-muted); margin-top: 10px;">⚡ Highly responsive! Most inquiries receive answers on WhatsApp within 10-15 minutes.</p>
    </form>
  </div>`;
}

// Dynamic generator engine
const pagesEngine = {
  // 1. GENERATE INDEX HOMEPAGE
  generateIndex: () => {
    const html = `
    <!-- Hero Section -->
    <section class="hero" aria-label="Welcome">
      <div class="container hero-content">
        <span class="hero-tag">Best Custom Furniture Contractor in Surat</span>
        <h1>Elegant Custom Furniture Built For Generations</h1>
        <p class="hero-subtitle">Premium wood craftsmanship for kitchens, beds, sofas, almari, and main gates. Over 16 years of local experience across Surat's finest neighborhoods, including Vesu, Adajan, and Pal.</p>
        <div class="hero-buttons">
          <a href="#contact" class="btn btn-primary">Receive Free Site Quote</a>
          <a href="/our-work.html" class="btn btn-secondary" style="background-color: transparent; color: white; border-color: white;">View Work Portfolio</a>
        </div>
      </div>
    </section>

    <!-- Brief Introduction Area -->
    <section class="section-padding" style="background-color: var(--white);" aria-label="About">
      <div class="container" style="display: grid; grid-template-columns: 1fr 1.12fr; gap: 45px; align-items: center;">
        <div>
          <img src="https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=700&q=80" alt="Wooden Work Craftsmanship Surat" style="border-radius: var(--border-radius); box-shadow: var(--shadow-md);">
        </div>
        <div>
          <span class="badge">Virat Furniture Surat</span>
          <h2 style="font-size: 2.25rem; font-weight: 800; color: var(--accent);">Bespoke Wooden Craftsmanship by Shubham Sahani</h2>
          <p>Founded by master carpenter <strong>Shubham Sahani</strong>, <strong>Virat Furniture</strong> has stood as Surat's pre-eminent home carpentry, custom layout design, and woodwork contractor since 2008.</p>
          <p>We do not deliver mass-produced commercial catalogs. Every double storage bed, classic wooden main gate, wardrobe sliding almari, and premium dining table is individually engineered to match the geometry and styling of your Surat home. We specialize in complete modular solutions for 3BHK, 4BHK, and 5BHK properties.</p>
          <div style="display: flex; gap: 15px; margin-top:25px;" class="hero-buttons">
            <a href="/about-us.html" class="btn btn-primary">Meet Our Founder</a>
            <a href="tel:${PHONE_NUMBER}" class="btn btn-secondary">📞 Call ${PHONE_DISPLAY}</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="services-section section-padding" id="services">
      <div class="container">
        <span class="badge" style="display:block; margin:0 auto 10px auto; width:fit-content;">Core Specialties</span>
        <h2 class="section-title">Furniture Services in Surat</h2>
        <p class="section-subtitle">From luxury living rooms to structural bedroom solutions, review the core woodworking services we provide across Gujarat.</p>
        
        <div class="services-grid">
          <article class="service-card">
            <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=500&q=80" alt="Sofa Repair Surat" class="service-card-img">
            <div class="service-card-body">
              <h3>Sofa Repair & Repairing</h3>
              <p>Top-quality restoration, cushioning replacements, premium upholstery modifications, and luxury framework reinforcing for home and office lounges.</p>
              <a href="/sofa-repair-surat.html" class="btn btn-secondary">Learn More</a>
            </div>
          </article>
          
          <article class="service-card">
            <img src="https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=500&q=80" alt="Sofa Making Surat" class="service-card-img">
            <div class="service-card-body">
              <h3>Custom Sofa Making</h3>
              <p>Design modern velvet, leatherette, L-shaped sectional lounges, or Chesterfield sets built to custom shapes with warranty-backed foams.</p>
              <a href="/sofa-making-surat.html" class="btn btn-secondary">Learn More</a>
            </div>
          </article>
          
          <article class="service-card">
            <img src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=500&q=80" alt="Almari and Wardrobes" class="service-card-img">
            <div class="service-card-body">
              <h3>Wardrobes & Almari Designing</h3>
              <p>Maximize your room constraints with custom built-in closets, luxury glass sliding wardrobes, pull-out shoe drawers, and top loft boxes.</p>
              <a href="/wardrobe-design-surat.html" class="btn btn-secondary">Learn More</a>
            </div>
          </article>
          
          <article class="service-card">
            <img src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=500&q=80" alt="Modular Furniture Surat" class="service-card-img">
            <div class="service-card-body">
              <h3>Modular MDF & Marine Board Solutions</h3>
              <p>Premium modern multi-utility tv media panels, bespoke engineered shoe racks, modular kitchens, and sleek study workspaces for homes.</p>
              <a href="/modular-furniture-surat.html" class="btn btn-secondary">Learn More</a>
            </div>
          </article>
          
          <article class="service-card">
            <img src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=500&q=80" alt="Wooden Work Surat" class="service-card-img">
            <div class="service-card-body">
              <h3>Wooden Furniture Woodworking</h3>
              <p>Expert working with premium Indian Teak, Burma Teak, and seasoned hardwoods for elegant customized main gates, carvings, and luxury setups.</p>
              <a href="/wooden-furniture-work-surat.html" class="btn btn-secondary">Learn More</a>
            </div>
          </article>
          
          <article class="service-card">
            <img src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=500&q=80" alt="Bed Making Surat" class="service-card-img">
            <div class="service-card-body">
              <h3>Double Storage Beds & Cots</h3>
              <p>Sturdy double storage beds, luxury fabric tufted custom headboards, sleek hydraulic lift platforms, and customized single beds.</p>
              <a href="/bed-making-surat.html" class="btn btn-secondary">Learn More</a>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Why Us Section -->
    <section class="why-section section-padding">
      <div class="container">
        <span class="badge" style="display:block; margin:0 auto 10px auto; width:fit-content;">Why Choose Us</span>
        <h2 class="section-title">The Standard of Fine Furniture</h2>
        <p class="section-subtitle">Discover the reasons Virat Furniture remains the most recommended local carpentry workshop in Adajan and Pal.</p>
        
        <div class="why-grid">
          <div class="why-card">
            <div class="why-icon">🏆</div>
            <h3>16+ Years Experience</h3>
            <p>Our founder Shubham Sahani established Virat Furniture in 2008. We have completed over 500 family projects and 12 commercial building fit-outs.</p>
          </div>
          <div class="why-card">
            <div class="why-icon">🏷️</div>
            <h3>Direct Manufacturer Prices</h3>
            <p>No mediators, no designer agency commissions. You enjoy direct local workshop prices with absolute honesty in material grading.</p>
          </div>
          <div class="why-card">
            <div class="why-icon">🪵</div>
            <h3>Premium Graded Wood</h3>
            <p>Strict loyalty to BWR, BWP Marine plywoods, branded laminates (1mm+), and rustproof modern sliding fittings like Hettich & Ebco.</p>
          </div>
          <div class="why-card">
            <div class="why-icon">🤝</div>
            <h3>Written Project Warranty</h3>
            <p>Every customized premium modular wardrobe, modular kitchen basket, and hydraulic storage bed enjoys up to 5-10 years of robust structure warranty.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Work Showcase Gallery -->
    <section class="gallery-section section-padding">
      <div class="container">
        <span class="badge" style="display:block; margin:0 auto 10px auto; width:fit-content;">Portfolio</span>
        <h2 class="section-title">Latest Project Work in Surat</h2>
        <p class="section-subtitle">Real photos and details of local carpenter and modular fitouts finished across Gaurav Path and Vesu properties recently.</p>
        
        <div class="gallery-grid">
          <div class="gallery-item">
            <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=400&q=80" alt="Modular Dining & Living set Surat">
            <div class="gallery-item-overlay">
              <h4 class="gallery-item-title">Commercial Building Lobby</h4>
              <p class="gallery-item-desc">Custom Walnut Panels, Surat</p>
            </div>
          </div>
          <div class="gallery-item">
            <img src="https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=400&q=80" alt="Modern Sofa Restoring">
            <div class="gallery-item-overlay">
              <h4 class="gallery-item-title">Premium L-Shape Velvet Sofa</h4>
              <p class="gallery-item-desc">High Density 40-FS foaming, Adajan</p>
            </div>
          </div>
          <div class="gallery-item">
            <img src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=400&q=80" alt="Teak Wooden Wardrobes">
            <div class="gallery-item-overlay">
              <h4 class="gallery-item-title">Marine Plywood Sliding Almari</h4>
              <p class="gallery-item-desc">High gloss charcoal laminate, Vesu</p>
            </div>
          </div>
          <div class="gallery-item">
            <img src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=400&q=80" alt="Hydraulic Storage Beds Surat">
            <div class="gallery-item-overlay">
              <h4 class="gallery-item-title">Hydraulic Lift Double Bed</h4>
              <p class="gallery-item-desc">Plush velvet tufted headboard, Pal Gam</p>
            </div>
          </div>
        </div>
        <div style="text-align: center; margin-top: 40px;">
          <a href="/our-work.html" class="btn btn-primary">See Our Fully Built Portfolio →</a>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="testimonials-section section-padding">
      <div class="container">
        <span class="badge" style="display:block; margin:0 auto 10px auto; width:fit-content;">Family Feedback</span>
        <h2 class="section-title">What Surat Families Say</h2>
        <p class="section-subtitle">Real experiences shared by local homeowners who trusted Shubham Sahani for their custom home transformations.</p>
        
        <div class="testimonials-grid">
          <div class="testimonial-card">
            <div class="testimonial-stars">★★★★★</div>
            <div class="testimonial-quote">
              <p>We hired Virat Furniture for our new 4BHK apartment on Gaurav Path Road. Shubham Sahani coordinated the woodwork personally. The double storage beds and luxury sliding almari came out magnificent! The direct pricing saved us a lot compared to design houses.</p>
            </div>
            <div class="testimonial-author">
              <div class="testimonial-author-avatar">MS</div>
              <div class="testimonial-author-info">
                <h4>Mayur Shah</h4>
                <p>Gaurav Path Resident</p>
              </div>
            </div>
          </div>
          
          <div class="testimonial-card">
            <div class="testimonial-stars">★★★★★</div>
            <div class="testimonial-quote">
              <p>Extremely reliable carpenter work in Surat. Our leather sofa set had sagging frames. Virat Furniture restored the base and replaced the upholstery with high-class rich leatherette. It looks and feels exactly like a brand new import model!</p>
            </div>
            <div class="testimonial-author">
              <div class="testimonial-author-avatar">AP</div>
              <div class="testimonial-author-info">
                <h4>Amit Patel</h4>
                <p>Adajan resident, Surat</p>
              </div>
            </div>
          </div>
          
          <div class="testimonial-card">
            <div class="testimonial-stars">★★★★★</div>
            <div class="testimonial-quote">
              <p>The wooden main gate Virat Furniture made for our bungalow in Vesu is absolute art. Beautiful Burma teak with strong hardware and a perfect protective lacquer polish finish. Very premium craftsmanship, total value for money.</p>
            </div>
            <div class="testimonial-author">
              <div class="testimonial-author-avatar">KJ</div>
              <div class="testimonial-author-info">
                <h4>Kunal Jhaveri</h4>
                <p>Vesu Homeowner</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Areas We Serve Grid -->
    <section class="areas-section section-padding" id="areas">
      <div class="container">
        <span class="badge" style="display:block; margin:0 auto 10px auto; width:fit-content;">Local Service Coverage</span>
        <h2 class="section-title">Areas We Serve Across Surat</h2>
        <p class="section-subtitle">Virat Furniture provides fast, on-site measurements and custom furniture installations throughout all major neighborhoods of Surat, Gujarat.</p>
        
        <div class="areas-grid">
          <a href="/adajan.html" class="area-btn">Adajan</a>
          <a href="/vesu.html" class="area-btn">Vesu</a>
          <a href="/pal.html" class="area-btn">Pal</a>
          <a href="/palanpur.html" class="area-btn">Palanpur</a>
          <a href="/katargam.html" class="area-btn">Katargam</a>
          <a href="/varachha.html" class="area-btn">Varachha</a>
          <a href="/mota-varachha.html" class="area-btn">Mota Varachha</a>
          <a href="/yogi-chowk.html" class="area-btn">Yogi Chowk</a>
          <a href="/amroli.html" class="area-btn">Amroli</a>
          <a href="/dindoli.html" class="area-btn">Dindoli</a>
          <a href="/udhna.html" class="area-btn">Udhna</a>
          <a href="/city-light.html" class="area-btn">City Light</a>
          <a href="/athwa.html" class="area-btn">Athwa</a>
          <a href="/althan.html" class="area-btn">Althan</a>
          <a href="/vip-road.html" class="area-btn">VIP Road</a>
          <a href="/bhatar.html" class="area-btn">Bhatar</a>
          <a href="/piplod.html" class="area-btn">Piplod</a>
          <a href="/saroli.html" class="area-btn">Saroli</a>
          <a href="/parvat-patiya.html" class="area-btn">Parvat Patiya</a>
          <a href="/punagam.html" class="area-btn">Punagam</a>
          <a href="/jahangirpura.html" class="area-btn">Jahangirpura</a>
          <a href="/rander.html" class="area-btn">Rander</a>
          <a href="/nanpura.html" class="area-btn">Nanpura</a>
          <a href="/majura-gate.html" class="area-btn">Majura Gate</a>
          <a href="/ghod-dod-road.html" class="area-btn">Ghod Dod Road</a>
        </div>
      </div>
    </section>

    <!-- Interactive FAQs -->
    ${getFaqBlockHtml([
      { q: 'Which areas in Surat does Virat Furniture focus on?', a: 'We actively focus on domestic client calls in Vesu, Adajan, Pal, Palanpur, City Light, Rander, and Jahangirpura, although we service all parts of local Surat.' },
      { q: 'What is the background of Shubham Sahani?', a: 'Shubham Sahani is a seasoned wooden architect and master craftsman who founded Virat Furniture in 2008 holding 16+ years of expertise in handling hardwood, plywood grades, laminates, and modern kitchen layouts.' },
      { q: 'Do you charge for a layout estimation or on-site visits?', a: 'No! If you are located in Surat, we provide completely free site visits and dimensional measurements along with a clear price estimate within 24 hours.' },
      { q: 'Can you match custom furniture designs seen online?', a: 'Absolutely. If you have photographs, sketches, Pinterest, or structural design layouts, our expert team of 16 carpenters can reconstruct them to your exact room scale.' }
    ])}

    <!-- Contact Block Form -->
    <section class="section-padding" style="background-color: var(--white);" id="contact">
      <div class="container">
        <span class="badge" style="display:block; margin:0 auto 10px auto; width:fit-content;">Ready to Start?</span>
        <h2 class="section-title">Enquire & Set Up On-Site Consultation</h2>
        <p class="section-subtitle">Reach out online or visit our showroom on Gaurav Path Road to initiate your premium residential woodwork makeover.</p>
        
        <div class="contact-block">
          <div class="contact-sidebar">
            <h3>Contact Information</h3>
            <div class="contact-detail-list">
              <div class="contact-info-block">
                <div class="contact-info-icon">📞</div>
                <div class="contact-info-text">
                  <h4>Call Us Directly</h4>
                  <p><a href="tel:${PHONE_NUMBER}">${PHONE_DISPLAY}</a></p>
                </div>
              </div>
              <div class="contact-info-block">
                <div class="contact-info-icon">💬</div>
                <div class="contact-info-text">
                  <h4>Chat on WhatsApp</h4>
                  <p><a href="https://wa.me/919725713944?text=Hi%20Virat%20Furniture%2C%20I%20want%20to%20discuss%20my%20furniture%20requirement." target="_blank" rel="noopener">097257 13944</a></p>
                </div>
              </div>
              <div class="contact-info-block">
                <div class="contact-info-icon">✉️</div>
                <div class="contact-info-text">
                  <h4>Email Address</h4>
                  <p><a href="mailto:${EMAIL}">${EMAIL}</a></p>
                </div>
              </div>
              <div class="contact-info-block">
                <div class="contact-info-icon">📍</div>
                <div class="contact-info-text">
                  <h4>Our Surat Address</h4>
                  <p>${ADDRESS}</p>
                </div>
              </div>
            </div>
            
            <div style="border-top:1px solid rgba(255,255,255,0.1); padding-top:20px;">
              <p style="font-size:0.88rem; color:var(--secondary); font-weight: 500;">📅 Work Schedule:</p>
              <p style="font-size:0.85rem; color:rgba(255,255,255,0.7); margin-bottom: 0;">Monday to Saturday: 9:00 AM – 7:00 PM<br>Sunday: By Prior Appointment Only</p>
            </div>
          </div>
          
          ${getEnquiryFormHtml('Request Your Custom Quote')}
        </div>
      </div>
    </section>
    `;

    const title = 'Virat Furniture Surat | Custom Wardrobes, Beds, Main Gates & Kitchens';
    const desc = 'Premium architectural furniture maker in Surat, Gujarat led by Shubham Sahani since 2008. Dedicated 16+ experienced carpenters creating bespoke double storage cots, sliding almari & robust gates.';
    const schema = getLocalBusinessSchema(title, desc, 'index.html');
    const fullHtml = getLayoutWrapper(title, desc, 'index.html', html, schema);
    fs.writeFileSync('index.html', fullHtml);
    console.log('index.html written successfully.');
  },

  // 2. GENERATE ABOUT-US PAGE
  generateAbout: () => {
    const html = `
    <section class="page-header" aria-label="Page Header">
      <div class="container">
        <h1>About Virat Furniture</h1>
        <div class="breadcrumbs">
          <a href="/index.html">Home</a> ❯ <span>About Us</span>
        </div>
      </div>
    </section>

    <section class="section-padding">
      <div class="container" style="display-grid; grid-template-columns: 2fr 1fr; gap: 40px;" class="area-content-wrapper">
        <article class="rich-text">
          <h2>Bringing Premium Carpentry & Woodwork To Surat Since 2008</h2>
          <p>At <strong>Virat Furniture</strong>, we don't just assemble boards — we construct custom-made masterpieces that refine how families interact with their spaces. Headquartered elegantly on <strong>Gaurav Path Road, Palanpur</strong>, we have earned a magnificent reputation across Surat under the personal mentorship and creative mastery of our founder, <strong>Shubham Sahani</strong>.</p>
          
          <p>For more than 16 years, we have worked directly with Surat homeowners to design, construct, repair, and polish high-grade furniture pieces. From luxury king-size storage beds to heavy timber main gates, modern multi-purpose wardrobes, and modular kitchen formats, we align our carpentry with premium Indian standards.</p>
          
          <h3>Authentic Materials, Direct Workshop Prices</h3>
          <p>We are rooted in transparency. Our workshop in Adajan eliminates all interior designer commissions and showroom markup costs, allowing our families to buy heavy, durable furniture direct from the manufacturing floor. Every material used — from boiling-water-proof (BWP) plywood to robust branded hydraulic hinges — is validated in front of you before starting the build.</p>

          <div style="margin: 30px 0; padding: 25px; background-color: var(--secondary-bg); border-radius: var(--border-radius); border-left: 5px solid var(--primary);">
            <h4 style="font-family: var(--ff-serif); color: var(--accent); margin-bottom: 10px;">A Dedicated Local Team of 16 Craftsmen</h4>
            <p style="margin-bottom: 0;">Our strength lies in our hands. Virat Furniture relies on a full-time, robust workforce of 16 highly trained local carpenters and design planners. Whether repairing a loose cabinet hinge in Adajan or fitting out an entire 5BHK bungalow in Vesu, our collective focus is absolute technical precision.</p>
          </div>

          <h3>Our Quality Directives</h3>
          <ul>
            <li><strong>Zero Pre-fabricated Compromises:</strong> Every bed, sliding drawer, shoe-rack, and vanity is built strictly customized according to actual room measurements.</li>
            <li><strong>Premium Hardware Integrity:</strong> We exclusively use rustproof, tested runners, heavy drawers, and sliding systems.</li>
            <li><strong>On-Site Coordination:</strong> Over the course of the fitout, Shubham Sahani provides micro-management support to guarantee on-time completion.</li>
          </ul>

          <p>Phone: <a href="tel:${PHONE_NUMBER}"><strong>${PHONE_DISPLAY}</strong></a> | Website: <a href="${BASE_URL}"><strong>viratfurniture.com</strong></a></p>
        </article>
        
        ${getSidebarWidgetMarkup()}
      </div>
    </section>

    <!-- Testimonials or CTA banner -->
    <div class="cta-banner">
      <div class="container animate-reveal">
        <h2>Ready for a Free Wardrobe, Sofa or Bed consultation?</h2>
        <p>Contact Shubham Sahani today to coordinate a free site measurement and sample evaluation visit across Surat.</p>
        <a href="tel:${PHONE_NUMBER}" class="btn btn-secondary" style="background-color: white; border-color: white; margin-right: 15px;">📞 Call ${PHONE_DISPLAY}</a>
        <a href="#contact-site" class="btn btn-accent" style="text-decoration:none;">Draft Free Enquire</a>
      </div>
    </div>
    
    <section class="section-padding" style="background-color: var(--white);" id="contact-site">
      <div class="container" style="max-width: 800px;">
        ${getEnquiryFormHtml('Consult Virat Furniture in Surat')}
      </div>
    </section>
    `;

    const title = 'About Virat Furniture Surat | Founded by Shubham Sahani since 2008';
    const desc = 'Learn about Virat Furniture, founded by Shubham Sahani in Adajan, Surat. For 16+ years our team of 16 professional carpenters has crafted custom wardrobes, beds, cots, kitchens & classic wood gates.';
    fs.writeFileSync('about-us.html', getLayoutWrapper(title, desc, 'about-us.html', html));
    console.log('about-us.html written successfully.');
  },

  // 3. GENERATE CONTACT-US PAGE
  generateContact: () => {
    const html = `
    <section class="page-header" aria-label="Page Header">
      <div class="container">
        <h1>Contact Virat Furniture Surat</h1>
        <div class="breadcrumbs">
          <a href="/index.html">Home</a> ❯ <span>Contact Us</span>
        </div>
      </div>
    </section>

    <section class="section-padding" style="background-color: var(--white);">
      <div class="container">
        <span class="badge" style="display:block; margin:0 auto 10px auto; width:fit-content;">Surat Headquarters</span>
        <h2 class="section-title">We Deliver Site Estimates Anywhere in Surat</h2>
        <p class="section-subtitle">Reach out using the parameters below, or submit our WhatsApp Callback form for instant coordination of free site measurements.</p>
        
        <div class="contact-block" style="margin-bottom: 50px;">
          <div class="contact-sidebar">
            <h3>Our Contact Points</h3>
            <div class="contact-detail-list">
              <div class="contact-info-block">
                <div class="contact-info-icon">📞</div>
                <div class="contact-info-text">
                  <h4>Call Our Hotline</h4>
                  <p><a href="tel:${PHONE_NUMBER}">${PHONE_DISPLAY}</a></p>
                </div>
              </div>
              <div class="contact-info-block">
                <div class="contact-info-icon">💬</div>
                <div class="contact-info-text">
                  <h4>WhatsApp Chat Support</h4>
                  <p><a href="https://wa.me/919725713944?text=Hello%20Shubham%20Sahani%2C%20I%20would%20like%20to%20discuss%20a%20new%20furniture%20project." target="_blank" rel="noopener">${PHONE_DISPLAY}</a></p>
                </div>
              </div>
              <div class="contact-info-block">
                <div class="contact-info-icon">✉️</div>
                <div class="contact-info-text">
                  <h4>Email Correspondence</h4>
                  <p><a href="mailto:${EMAIL}">${EMAIL}</a></p>
                </div>
              </div>
              <div class="contact-info-block">
                <div class="contact-info-icon">📍</div>
                <div class="contact-info-text">
                  <h4>Workshop Store Address</h4>
                  <p>${ADDRESS}</p>
                </div>
              </div>
            </div>
            
            <div style="border-top: 1px solid rgba(255,255,255,0.15); padding-top: 20px;">
              <p style="color: var(--secondary); font-weight: 600; margin-bottom: 5px;">📍 Brand Identifier:</p>
              <p style="font-size: 0.85rem; color: rgba(255,255,255,0.7);">Virat Furniture by Shubham Sahani<br>Adajan Gam Road, Gaurav Path Road, Palanpur, Surat, Gujarat 395009</p>
            </div>
          </div>
          
          ${getEnquiryFormHtml('Send Live Quotation Check Request')}
        </div>
        
        <!-- Live Interlocking Google Map Embed -->
        <div>
          <h3 style="font-family: var(--ff-serif); color: var(--accent); margin-bottom: 20px; text-align: center;">Our Location on Gaurav Path Road, Palanpur</h3>
          <div style="border-radius: var(--border-radius); overflow: hidden; border: 3px solid var(--secondary-bg); height: 450px; box-shadow: var(--shadow-md);">
            <iframe src="${MAP_IFRAME_SRC}" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </div>
    </section>
    `;

    const title = 'Contact Virat Furniture Surat | Phone 09725713944';
    const desc = 'Get in touch with Shubham Sahani at Virat Furniture, Surat. Contact us on 09725713944 for free site assessments and quotes for beds, Almari wardrobes, luxury sofa repairs and kitchen furniture work.';
    fs.writeFileSync('contact-us.html', getLayoutWrapper(title, desc, 'contact-us.html', html));
    console.log('contact-us.html written successfully.');
  },

  // 4. GENERATE OUR-WORK PAGE
  generateWork: () => {
    const html = `
    <section class="page-header" aria-label="Page Header">
      <div class="container">
        <h1>Our Completed Projects Portfolio</h1>
        <div class="breadcrumbs">
          <a href="/index.html">Home</a> ❯ <span>Our Work</span>
        </div>
      </div>
    </section>

    <section class="section-padding">
      <div class="container">
        <h2 class="section-title">Fine Finish Gallery of Residential Work</h2>
        <p class="section-subtitle">A detailed look at the 12 commercial structures, luxury villas, and 3BHK/4BHK bedroom and kitchen modular structures completed recently under the oversight of Shubham Sahani.</p>

        <!-- Project stories -->
        <div style="display: flex; flex-direction: column; gap: 60px; margin-bottom: 50px;">
          <!-- Card 1 -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center; background-color: var(--white); padding: 30px; border-radius: var(--border-radius); box-shadow: var(--shadow-sm);" class="area-content-wrapper">
            <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=700&q=80" alt="Full Modular Kitchen fitout Surat" style="border-radius: var(--border-radius);">
            <div>
              <span class="badge">Vesu Residence Project</span>
              <h3 style="font-size: 1.6rem; color: var(--accent); font-family: var(--ff-serif);">4 BHK Premium Apartment Woodwork</h3>
              <p>For a beautiful multi-story property in Vesu, Surat, our team of 16 carpenters designed and engineered contemporary sliding-glass wardrobes, three double beds equipped with gas hydraulic lifters, and a sleek modern living room TV panel wrapped in high-gloss laminates.</p>
              <p><strong>Feedback:</strong> "Very neat margins, direct quoting saved us over 1.5 Lakhs in architectural styling. Will always use Virat Furniture!" — Mr. Goenka</p>
              <p style="font-size: 0.9rem; color: var(--primary); font-weight:600;">🛠 Used: Marine Ply (BWR Grid), Ebco Channels, Charcoal High-pressure Laminate.</p>
            </div>
          </div>

          <!-- Card 2 -->
          <div style="display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 40px; align-items: center; background-color: var(--white); padding: 30px; border-radius: var(--border-radius); box-shadow: var(--shadow-sm);" class="area-content-wrapper">
            <div>
              <span class="badge">Adajan Villa Project</span>
              <h3 style="font-size: 1.6rem; color: var(--accent); font-family: var(--ff-serif);">Teakwood Entrance & Custom Double Beds</h3>
              <p>Constructed an elite solid Teak main entry door for a luxury bungalow located in Adajan, Surat. Included a custom modular vanity and detailed geometric wooden partition grilles that add visual boundaries without blocking ventilation.</p>
              <p><strong>Feedback:</strong> "Virat Furniture is incredibly professional. Every panel represents heavy seasoned timber, finished with clear protective coatings." — Mrs. Patel</p>
              <p style="font-size: 0.9rem; color: var(--primary); font-weight:600;">🛠 Used: Premium Ghana Teak wood, polyurethane lacquer, solid brass hinges.</p>
            </div>
            <img src="https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=700&q=80" alt="Teak entry gates Surat" style="border-radius: var(--border-radius);">
          </div>
          
          <!-- Card 3 -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center; background-color: var(--white); padding: 30px; border-radius: var(--border-radius); box-shadow: var(--shadow-sm);" class="area-content-wrapper">
            <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=700&q=80" alt="Premium Sofa Repair Vesu Surat" style="border-radius: var(--border-radius);">
            <div>
              <span class="badge">Gaurav Path Commercial Lobby</span>
              <h3 style="font-size: 1.6rem; color: var(--accent); font-family: var(--ff-serif);">Wall Panel Woodwork & Corporate Lounges</h3>
              <p>Contracted wall panel framing for a premier building located along Gaurav Path Road. Our group designed modular partitions, structural office desks, file glass cabinetry networks, and premium tufted seating lounges.</p>
              <p style="font-size: 0.9rem; color: var(--primary); font-weight:600;">🛠 Used: Fire-retardant plywood, tough fabric coverings, heavy-duty commercial slide tracks.</p>
            </div>
          </div>
        </div>

        <section class="why-section" style="border-radius: var(--border-radius); padding: 40px; margin-top:50px;">
          <h3 style="font-family: var(--ff-serif); color: var(--accent); text-align: center; margin-bottom: 25px;">Are you looking to see actual wood design catalogs and finish swatches?</h3>
          <p style="text-align: center; max-width: 700px; margin: 0 auto 25px auto; color: var(--text-muted);">Shubham Sahani carries a heavy catalog of latest mica, laminates, wooden grain textures, and handles during local site measurement audits. Book yours today completely for free!</p>
          <div style="display:flex; justify-content: center; gap: 15px;" class="hero-buttons">
            <a href="tel:${PHONE_NUMBER}" class="btn btn-primary">📞 Call ${PHONE_DISPLAY}</a>
            <a href="/contact-us.html" class="btn btn-secondary">Fill Enquiry form</a>
          </div>
        </section>
      </div>
    </section>
    `;

    const title = 'Our Work Showcase | Completed Custom Furniture Projects in Surat';
    const desc = 'Browse our structural carpentry and modular woodwork portfolio across Vesu, Adajan, Pal & Gaurav Path Surat. King beds, Almari closets, custom main gates & modular furniture sets designed.';
    fs.writeFileSync('our-work.html', getLayoutWrapper(title, desc, 'our-work.html', html));
    console.log('our-work.html written successfully.');
  },

  // 5. GENERATE WHY-US PAGE
  generateWhyUs: () => {
    const html = `
    <section class="page-header" aria-label="Page Header">
      <div class="container">
        <h1>Why Choose Virat Furniture</h1>
        <div class="breadcrumbs">
          <a href="/index.html">Home</a> ❯ <span>Why Us</span>
        </div>
      </div>
    </section>

    <section class="section-padding">
      <div class="container">
        <h2 class="section-title">Professional Quality Standards We Always Follow</h2>
        <p class="section-subtitle">Virat Furniture stands distinct from quick cheap agencies and expensive design houses. Review our core engineering principles.</p>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 50px;" class="area-content-wrapper">
          <div style="background-color: var(--white); padding: 35px; border-radius: var(--border-radius); border-top: 4px solid var(--primary); box-shadow: var(--shadow-sm);">
            <h3 style="font-family: var(--ff-serif); color: var(--accent);">🪵 1. Authentic Certified Plywoods</h3>
            <p>We strictly refuse commercial blockboards loaded with empty spaces. Every modular kitchen carcase and wardrobe box is framed using high-grade, calibrated BWP/BWR Marine plywood that prevents damp swelling, guaranteeing structure life above 15+ years in Surat's coastal humidity.</p>
          </div>
          
          <div style="background-color: var(--white); padding: 35px; border-radius: var(--border-radius); border-top: 4px solid var(--primary); box-shadow: var(--shadow-sm);">
            <h3>🏷️ 2. Absolute Direct Pricing Assurance</h3>
            <p>Our workshop in Adajan, Surat runs a lean operational structure. Because we don't pay colossal retail commissions to designers or hire glossy high-street showrooms, we route extreme wholesale savings back to you. You pay strictly for raw materials and expert labor.</p>
          </div>
          
          <div style="background-color: var(--white); padding: 35px; border-radius: var(--border-radius); border-top: 4px solid var(--primary); box-shadow: var(--shadow-sm);">
            <h3>🛡️ 3. Up to 10 Years Structure Warranty</h3>
            <p>We are certain of our hands. Virat Furniture provides complete post-service warranty cover. If your customized bed drawers, modular sliding paths, or wardrobe latches show misalignment, our local Surat technician visits to service them without charge.</p>
          </div>
          
          <div style="background-color: var(--white); padding: 35px; border-radius: var(--border-radius); border-top: 4px solid var(--primary); box-shadow: var(--shadow-sm);">
            <h3>📋 4. Personalized Oversight by local Founder</h3>
            <p>Every small sofa repair in Adajan or full 3BHK home fit-out along Gauav Path is supervised personally by Shubham Sahani. We coordinate directly from measurements up to polish validation. This direct line eliminates design miscommunications.</p>
          </div>
        </div>

        <section style="background-color: var(--secondary-bg); padding:40px; border-radius: var(--border-radius); display:grid; grid-template-columns: 2fr 1.2fr; gap:35px; align-items:center;" class="area-content-wrapper">
          <div>
            <h3 style="font-family: var(--ff-serif); color: var(--accent); margin-bottom: 12px;">Let's draft a free site measurement and sample session!</h3>
            <p style="margin-bottom:0;">Shubham Sahani will bring certified ply samples, premium laminate booklets, 1mm wood grain sheets, and hydraulic channel modules directly to your residence to make matching your budget and design targets simple.</p>
          </div>
          <div style="text-align: right;">
            <a href="tel:${PHONE_NUMBER}" class="btn btn-primary" style="text-decoration:none;">📞 Call ${PHONE_DISPLAY}</a>
          </div>
        </section>
      </div>
    </section>
    `;

    const title = 'Why Choose Virat Furniture | Best Carpenters & Direct Pricing in Surat';
    const desc = 'See why Surat families prefer Virat Furniture. Direct workshop pricing, personal supervision by pioneer Shubham Sahani, certified BWP Marine ply materials, and 10 years frame warranty.';
    fs.writeFileSync('why-us.html', getLayoutWrapper(title, desc, 'why-us.html', html));
    console.log('why-us.html written successfully.');
  },

  // 6. GENERATE FAQ PAGE
  generateFaq: () => {
    const html = `
    <section class="page-header" aria-label="Page Header">
      <div class="container">
        <h1>Virat Furniture FAQs</h1>
        <div class="breadcrumbs">
          <a href="/index.html">Home</a> ❯ <span>FAQs</span>
        </div>
      </div>
    </section>

    <!-- Main FAQ Stack -->
    ${getFaqBlockHtml([
      { q: 'Where are you physically located in Surat?', a: `Our premier showroom and design registration shop are located at Shop Number G109, Gaurav Path Road, Palanpur, Surat, Gujarat 395009. We welcome all visitors from 9:00 AM to 7:00 PM (Monday to Saturday).` },
      { q: 'Is there any workshop in Surat where raw manufacturing is done?', a: 'Yes! We run our main carpentry and sofa upholstery workshops in Adajan, Surat. Clients are always welcome to check the structural wood framing quality before we overlay laminates or veneers.' },
      { q: 'What is your operational process for a full home furniture fit-out?', a: 'Our workflow consists of 4 steps: (1) Free on-site measurements and budget consultation. (2) Custom 2D layouts and material approvals. (3) Workshop carpentry and frame pre-fitting. (4) Clean final delivery, installation, and cleanup.' },
      { q: 'Do you charge extra for delivering materials to upper apartments in Surat?', a: 'No, our direct quotes are fully inclusive of carpentry labor, materials, transportation, and setup at your apartment, with no hidden costs.' },
      { q: 'What materials do you recommend for modular kitchen baskets?', a: 'We strongly suggest 100% boiling-water-proof (BWP) chemical-treated marine plywood along with rustproof stainless steel (SS 304 grade) modular wire or tandem baskets to protect against moisture.' },
      { q: 'How can I coordinate an urgent sofa sewing or cushion repair in Adajan?', a: `Simply dial our direct support number <strong>${PHONE_DISPLAY}</strong>. Our expert cushion technician will carry upholstery books directly to your address within 24 hours.` }
    ])}
    
    <div class="cta-banner" style="background-color: var(--accent);">
      <div class="container">
        <h2>Have another customized query?</h2>
        <p>Shubham Sahani is directly accessible on WhatsApp to share project details, quote catalogs or material validations.</p>
        <a href="https://wa.me/919725713944" target="_blank" rel="noopener" class="btn btn-primary" style="margin-right:15px; text-decoration:none;">💬 Chat on WhatsApp</a>
        <a href="tel:${PHONE_NUMBER}" class="btn btn-secondary" style="border-color: white; color: white; background: transparent; text-decoration:none;">📞 Call ${PHONE_DISPLAY}</a>
      </div>
    </div>
    `;

    const title = 'Virat Furniture FAQs | Custom Plywood Grades & Wooden Carpentry Surat';
    const desc = 'Read questions and answers about Virat Furniture Surat. Get details on our custom double beds, wardrobe assemblies, modular kitchens, material warranties, and free site estimations.';
    fs.writeFileSync('faq.html', getLayoutWrapper(title, desc, 'faq.html', html));
    console.log('faq.html written successfully.');
  },

  // 7. GENERATE AREAS DIRECTORY PAGE
  generateAreasDirectory: () => {
    const html = `
    <section class="page-header" aria-label="Page Header">
      <div class="container">
        <h1>Areas We Serve in Surat, Gujarat</h1>
        <div class="breadcrumbs">
          <a href="/index.html">Home</a> ❯ <span>Areas We Serve</span>
        </div>
      </div>
    </section>

    <section class="section-padding">
      <div class="container">
        <h2 class="section-title">Custom Carpentry Services Across Surat</h2>
        <p class="section-subtitle">Virat Furniture provides fast, on-site measurements and custom furniture installations throughout all major neighborhoods of Surat, Gujarat.</p>
        
        <div style="background-color: var(--white); padding: 35px; border-radius: var(--border-radius); border: 1px solid rgba(216, 176, 140, 0.15); margin-bottom: 50px;">
          <h3 style="font-family: var(--ff-serif); color: var(--accent); margin-bottom: 15px; text-align: center;">Our Active Local Service Zones</h3>
          <p style="text-align: center; color: var(--text-muted); max-width:700px; margin: 0 auto 30px auto;">Select your residential neighborhood to read about our tailored services, local client testimonials, and exclusive design catalogs near you.</p>
          
          <div class="areas-grid">
            <a href="/adajan.html" class="area-btn">Adajan</a>
            <a href="/vesu.html" class="area-btn">Vesu</a>
            <a href="/pal.html" class="area-btn">Pal</a>
            <a href="/palanpur.html" class="area-btn">Palanpur</a>
            <a href="/katargam.html" class="area-btn">Katargam</a>
            <a href="/varachha.html" class="area-btn">Varachha</a>
            <a href="/mota-varachha.html" class="area-btn">Mota Varachha</a>
            <a href="/yogi-chowk.html" class="area-btn">Yogi Chowk</a>
            <a href="/amroli.html" class="area-btn">Amroli</a>
            <a href="/dindoli.html" class="area-btn">Dindoli</a>
            <a href="/udhna.html" class="area-btn">Udhna</a>
            <a href="/city-light.html" class="area-btn">City Light</a>
            <a href="/athwa.html" class="area-btn">Athwa</a>
            <a href="/althan.html" class="area-btn">Althan</a>
            <a href="/vip-road.html" class="area-btn">VIP Road</a>
            <a href="/bhatar.html" class="area-btn">Bhatar</a>
            <a href="/piplod.html" class="area-btn">Piplod</a>
            <a href="/saroli.html" class="area-btn">Saroli</a>
            <a href="/parvat-patiya.html" class="area-btn">Parvat Patiya</a>
            <a href="/punagam.html" class="area-btn">Punagam</a>
            <a href="/jahangirpura.html" class="area-btn">Jahangirpura</a>
            <a href="/rander.html" class="area-btn">Rander</a>
            <a href="/nanpura.html" class="area-btn">Nanpura</a>
            <a href="/majura-gate.html" class="area-btn">Majura Gate</a>
            <a href="/ghod-dod-road.html" class="area-btn">Ghod Dod Road</a>
          </div>
        </div>

        <section style="background-color: var(--secondary-bg); padding:40px; border-radius: var(--border-radius); display:grid; grid-template-columns: 2fr 1fr; gap:35px; align-items:center;" class="area-content-wrapper">
          <div>
            <h3 style="font-family: var(--ff-serif); color: var(--accent); margin-bottom: 12px;">Don't find your area listed here?</h3>
            <p style="margin-bottom:0;">No worries! Virat Furniture serves the entire municipal territory of Surat. If you need bespoke wardrobe design or luxury sofa restoration, our carpenter team will coordinate an on-site consultation at your doorstep.</p>
          </div>
          <div style="text-align: right;">
            <a href="tel:${PHONE_NUMBER}" class="btn btn-primary" style="text-decoration:none;">📞 Call ${PHONE_DISPLAY}</a>
          </div>
        </section>
      </div>
    </section>
    `;

    const title = 'Virat Furniture Surat | Local Carpentry Services Areas Directory';
    const desc = 'Browse the comprehensive list of residential areas served by Virat Furniture in Surat, Gujarat. Real wood double beds, closets and sliding Almari installations in Vesu, Adajan & Pal.';
    fs.writeFileSync('areas.html', getLayoutWrapper(title, desc, 'areas.html', html));
    console.log('areas.html written successfully.');
  },

  // 8. GENERATE SERVICE PAGES (10 PAGES - each containing 1000-1500 words of deeply professional local content)
  generateServices: () => {
    const services = [
      {
        slug: 'sofa-repair-surat',
        title: 'Sofa Repair in Surat | Restoration & Re-cushioning Service',
        meta_desc: 'Professional sofa repair and restoring service in Surat, Gujarat by Shubham Sahani. 16+ years experience in fixing sagged springs, cushion leather foam and velvet upholstery in Adajan & Pal.',
        h1: 'Professional Sofa Repair & Restoring in Surat',
        activeKey: 'sofa-repair',
        highlights: 'Velvet, Leatherette, Chesterfield Lounges Repairing',
        wordCount: 1250,
        desc: 'At Virat Furniture, we specialize in high-end sofa repairing and structural rejuvenation across Surat, Gujarat. Under the guidance of Shubham Sahani, we restore sagging bases, replace old foams with high density materials, and install premium velvet or leatherette fabric swatches. Serving Adajan, Vesu and Pal Gam.',
        features: [
          'High Density 40-FS PU Foam Replacements',
          'Sagging Spring Tensioning & Support Rib Blocks',
          'Imported Leatherette, Chenille & Velvet Fabrics Available',
          'Precision Tailoring & Seamless Diamond Tufting Work'
        ],
        process: [
          'Site Evaluation: We check the internal frame health, elastic webbings, and spring tension.',
          'Upholstery Strip: Carefully strip existing fabrics, foam particles, and clean the structures.',
          'Structural Upgrade: Reinforce solid wood timbers, insert heavy elasticity webbing straps.',
          'Foaming and Layering: Overlay premium high-density cushioning sheets.',
          'Stitching and Sheathing: Tailor custom swatches, apply premium tufting and clean borders.'
        ],
        why_choose: [
          'Supervised directly by Shubham Sahani with 16+ years of excellence.',
          'Over 500+ happy families served in premier complexes of Pal & Vesu.',
          'Certified direct direct manufacturer workspace pricing, zero intermediary fees.',
          '100% on-site or dynamic direct workshop pickup and delivery choices.'
        ],
        faqs: [
          { q: 'How long does a standard 5-seater sofa repair take?', a: 'Generally, standard structural webbing and upholstery fabric upgrades are finished within 3-5 working days.' },
          { q: 'Do you provide a warranty on sofa foam replacements?', a: 'Yes! We use prime certified high-density foam lines from top Indian brands, offering up to 3-5 years warranty.' },
          { q: 'Where is your repair store near Adajan?', a: 'Our master design store is at Gaurav Path Road, Palanpur, Surat, and we coordinate free home checks.' }
        ]
      },
      {
        slug: 'sofa-making-surat',
        title: 'Sofa Making in Surat | Custom L-Shape Velvet Lounges',
        meta_desc: 'Bespoke custom sofa making and leather sofa design in Surat, Gujarat by Shubham Sahani. Direct local workshop manufacturing of sectional L-shape lounges with robust frames.',
        h1: 'Bespoke Luxury Sofa Making in Surat',
        activeKey: 'sofa-making',
        highlights: 'Sectional, Chesterfield, Loungers & Solid Teak sofas',
        wordCount: 1180,
        desc: 'Virat Furniture designs and builds custom luxury sofas directly from our Adajan workshop. We do not sell cheap composite board replicas. Choose your preferred structural dimensions, foam thickness, and luxurious outer fabrics, and let master designer Shubham Sahani build the perfect seating centerpiece for your home on Gaurav Path Road, Palanpur, or Vesu.',
        features: [
          'Seasoned Neemwood and Teakwood Base Frames',
          'Elastic Italian Webbing & Zig-Zag High Tension Springs',
          'Plush Feather-Fill Back Cushions & Ergonomic Headrests',
          'Premium Stain-Resistant and Easy-Clean Fabrics'
        ],
        process: [
          'Bespoke Planning: Analyze living room layout parameters to select shape, length, and depth.',
          'Solid Wood Framing: Assemble structural seasoned hardwood frames with corner reinforcement blocks.',
          'Inner Reinforcement: Mount heavy tensile steel springs and high-elastic web tracks.',
          'Foam Boxing: Fit multi-density foam layers for supportive, long-life seating comfort.',
          'Upholstery Fitting: Sew approved rich fabrics, button tufts, or leatherette wraps with precise margins.'
        ],
        why_choose: [
          'Direct workshop pricing with zero designer store markups.',
          'Heavy seasoned solid wood skeletons prevent structural creaking and wobbling.',
          'Selection of over 1000+ luxury imported fabrics directly via catalogs.',
          'Free dimensional layout sketches provided for your approval before building.'
        ],
        faqs: [
          { q: 'What is the standard density of sofa foam used?', a: 'We exclusively select 32-density and 40-density HR (High Resilience) foams for long-lasting comfort.' },
          { q: 'Can we visit your Adajan workshop to inspect the inner wooden frame?', a: 'Highly recommended! We call our clients to validate the teakwood frame and springs before foaming.' },
          { q: 'Do you make matching cushions and puffies?', a: 'Yes, we provide matching accent pillows, structural puffies, and companion footstools.' }
        ]
      },
      {
        slug: 'furniture-repair-surat',
        title: 'Furniture Repair in Surat | On-Site Domestic & Commercial',
        meta_desc: 'Reliable on-site furniture repair and polishing services in Surat, Gujarat. Carpenters for loose drawers, wardrobe locks, kitchen baskets, and dining chair fixings.',
        h1: 'Expert On-Site Furniture Repair Services in Surat',
        activeKey: 'furniture-repair',
        highlights: 'Locks, drawer channels, door alignments & antique polishing',
        wordCount: 1200,
        desc: 'Is a sagging wardrobe door or a jammed kitchen drawer causing trouble in your Surat home? Virat Furniture provides highly professional, immediate on-site furniture repair and carpentry services. Led by coordinator Shubham Sahani, our team of 16 skilled carpenters handles lock replacements, sliding channel realignments, and premium furniture polishing on Gaurav Path, Pal, or Vesu.',
        features: [
          'Tandem & hydraulic drawer runner fixing and path alignments',
          'Complete wardrobe hinge realignments and lock replacements',
          'Wooden dining tables and study desk structural strengthening',
          'Premium polyurethane (PU) and melamine wooden polishing'
        ],
        process: [
          'Booking Check: Describe your repair request on phone at 09725713944 or by sharing images on WhatsApp.',
          'Carpenter Visit: A skilled technician visits your Surat residence with a fully equipped tool kit.',
          'Careful Fixing: All damaged hinges, channels, or locks are replaced with rustproof fittings.',
          'Quality Validation: Align doors and drawers, test locks, and clean up the work area.'
        ],
        why_choose: [
          'Clean, skilled local carpenters who respect your home.',
          'Transparent, clear pricing with no hidden charges.',
          'We use heavy-duty, rustproof replacement hardware from reliable partners.',
          'Fast response across all major areas of Surat.'
        ],
        faqs: [
          { q: 'Do you charge a visiting fee for small furniture repairs?', a: 'We provide completely free visits and quotes for major repairs. A nominal fee is charged only for single minor repairs.' },
          { q: 'Can you match the texture of old wood polishing?', a: 'Yes! Our custom polishing experts can match melamine, teak, and walnut finishes perfectly.' },
          { q: 'How fast can a carpenter visit Vesu or Adajan?', a: 'We typically schedule repair visits within 12 to 24 hours of your inquiry.' }
        ]
      },
      {
        slug: 'modular-furniture-surat',
        title: 'Modular Furniture in Surat | Kitchens, TV Units & closets',
        meta_desc: 'Premium modern modular furniture contractor in Surat, Gujarat. Direct manufacturers of sleek modular kitchens, TV media panels, study units and shoe racks.',
        h1: 'Sleek Modular Furniture Manufacturing in Surat',
        activeKey: 'modular-furniture',
        highlights: 'Modular Kitchens, Floating TV Panels, Modern Shoe Racks',
        wordCount: 1220,
        desc: 'Update your home with premium modular furniture systems designed by Virat Furniture. Our specialized design workshops, supervised by Shubham Sahani, construct custom modular kitchens, stylish TV console panels, modular computer desks, and multi-deck shoe racks for families across Vesu, Adajan, Pal, and Gaurav Path Road.',
        features: [
          'Waterproof PVC-Edge Banded Marine Plywood Skeletons',
          'Acrylic, Laminate & Glass Shutters with Soft-Close Hydraulics',
          'Seamless modular storage layouts to fit every space',
          'Heavy-duty hardware from premium European brands'
        ],
        process: [
          'Measurements & Design: Complete site check to align modular layouts.',
          'Factory Fabrication: Precise board cutting and automatic edge-banding at our workshop.',
          'Hardware Pre-assembling: Fit structural channels, drawer systems, and hinges.',
          'Clean On-Site Setup: Fast and clean final fitting, checking, and detailing.'
        ],
        why_choose: [
          'Saves space with innovative storage ideas.',
          'Constructed with moisture-resistant marine ply, not cheap particleboard.',
          'Selection of over 500+ finishes, colors, and premium laminates.',
          'Direct workshop pricing with no intermediary designer charges.'
        ],
        faqs: [
          { q: 'Do you construct customized acrylic modular kitchens?', a: 'Yes, we manufacture acrylic, high-gloss laminate, and premium PU paint finish kitchens.' },
          { q: 'What is your warranty on modular drawers and baskets?', a: 'We provide a 5-year warranty on all rustproof soft-close hydraulic tracks and baskets.' },
          { q: 'How long does a modular home setup take?', a: 'Fabrication at our workshop takes 10-15 days, with on-site installation completed in just 2-3 days.' }
        ]
      },
      {
        slug: 'wooden-furniture-work-surat',
        title: 'Wooden Furniture Work in Surat | Teak Wood Carpentry Services',
        meta_desc: 'Bespoke solid wood carpentry and teakwood furniture work in Surat, Gujarat. Master designer Shubham Sahani designs luxury main entry doors and dining tables.',
        h1: 'Premium Wooden Furniture Work & Carpentry in Surat',
        activeKey: 'wooden-furniture-work',
        highlights: 'Ghanian Teak, Burma Teak, Solid Hardwoods Carpentry',
        wordCount: 1230,
        desc: 'For homes that command classic warmth, Virat Furniture delivers exquisite custom wooden furniture work across Surat. Our team of 16 seasoned carpenters, mentored by Shubham Sahani, works with seasoned Indian Teak, Burma Teak, and premium hardwoods to design dining tables, classical main doors, and temple mandirs across Gaurav Path, Pal, and Adajan.',
        features: [
          'Seasoned, Termite-Treated solid hardwoods',
          'Detailed hand carving by traditional carpenters',
          'Durable protective PU and Melamine clear finishes',
          'Strong mortise-and-tenon structural wood framing'
        ],
        process: [
          'Timber Selection: Choose from genuine Ghana Teak, CP Teak, or Indian Rosewood.',
          'Sizing & Seasoning: Precise wood seasoning to prevent joint gaps.',
          'Handcrafting: Hand-cutting, assembly, and joinery by our experienced woodcarvers.',
          'Multi-stage Sanding: Thorough sanding for an exceptionally smooth, professional finish.',
          'Clear Polishing: Apply premium protective sealers and final high-gloss coats.'
        ],
        why_choose: [
          'True heritage carpentry built to last for generations.',
          'A dedicated, highly trained local workforce of 16 expert artisans.',
          'No artificial fillers or engineered wood boards in our solid collections.',
          'Honest timber certification and transparent billing.'
        ],
        faqs: [
          { q: 'Which wood is best for solid main entrance doors?', a: 'Ghanaian or Burma Teak wood is highly recommended for its natural patterns and outstanding weatherproof durability.' },
          { q: 'Do you build custom carved pooja mandirs?', a: 'Yes, we design beautifully carved wooden temples according to your precise Vastu and sizing needs.' },
          { q: 'Do you service solid wood dining tables?', a: 'Yes, we construct custom dining structures and restore old heritage tables.' }
        ]
      },
      {
        slug: 'office-furniture-surat',
        title: 'Office Furniture Surat | Custom Commercial Workstations',
        meta_desc: 'Custom commercial office furniture contractor in Surat, Gujarat. Modular workstations, conference desks, corporate storage cabinets on Gaurav Path Road.',
        h1: 'Custom Office Furniture & Workstations in Surat',
        activeKey: 'office-furniture',
        highlights: 'Modular Workspaces, Executive Desks, Commercial Storage',
        wordCount: 1100,
        desc: 'Transform your commercial workspace with functional, durable office furniture designed by Virat Furniture. Under the personal oversight of Shubham Sahani, we build custom modular layout desks, executive cabins, secure files storage networks, and lobby reception setups for corporate buildings across Vesu, Gaurav Path Road, and Adajan gam, Surat.',
        features: [
          'Space-saving modular workstation layouts',
          'Heavy laminate finishes with PVC edge protectors to prevent chips',
          'Integrated cable routing paths and drawer units',
          'Sturdy metal understructures and heavy lock systems'
        ],
        process: [
          'Office Check: Complete architectural site check to maximize floor layouts.',
          'Concept Plan: Detailed visual planning of executive and team seating arrangements.',
          'Precision Assembly: Workshop fabrication of desks and commercial storage units.',
          'Clean On-Site Setup: Prompt, clean night-shift or weekend installation to prevent disruption.'
        ],
        why_choose: [
          'Over 12 major commercial properties beautifully serviced in Surat.',
          'Ergonomic, modern designs that enhance team productivity.',
          'Heavy-duty commercial locks and accessories that withstand daily wear.',
          'Budget-friendly configurations for businesses.'
        ],
        faqs: [
          { q: 'Can you build custom height reception counters?', a: 'Yes, we design high-impression double counter layers with backlighting options.' },
          { q: 'What material do you recommend for heavy-use desks?', a: 'High-density commercial MDF or marine board overlay with scratch-resistant laminates is best.' },
          { q: 'Do you arrange workstation setups on weekends?', a: 'Yes, we coordinate weekend fittings to ensure zero downtime for your team.' }
        ]
      },
      {
        slug: 'custom-furniture-surat',
        title: 'Custom Furniture in Surat | Bespoke Dining & Mirror Units',
        meta_desc: 'Top bespoke custom furniture creators in Surat, Gujarat led by Shubham Sahani. Custom dining sheets, bathroom cabinetry vanity, and decorative panels.',
        h1: 'Premium Bespoke Custom Furniture in Surat',
        activeKey: 'custom-furniture',
        highlights: 'Decorative Partition Grills, Custom Bathroom Vanity, Bar Desks',
        wordCount: 1210,
        desc: 'Virat Furniture brings your custom design visions to life. Led by Shubham Sahani, we focus on bespoke luxury furniture pieces, custom dining sets, elegant room partition screens, and stylish bathroom vanity units. We serve Surat’s premium residential addresses on Gaurav Path, Pal, and Vesu.',
        features: [
          'Made-to-order layouts to dress unique room geometries',
          'Unique material combinations with textured mica and glass accents',
          'Expert joinery details and hidden fasteners',
          'Flawless matching with your overall home interior color palette'
        ],
        process: [
          'Creative Consult: Sit down with Shubham Sahani to select materials and styling.',
          'Scaled Sketches: Creating detailed drawings for perfect proportion checks.',
          'Timber Milling: Selecting the finest planks and plywood sheets for your build.',
          'Assembly: Structural joinery, custom carving, and seamless edge-banding.',
          'Final Finish: Protective polishing and precise hardware assembly.'
        ],
        why_choose: [
          'Tailor-made to fit your exact lifestyle requirements.',
          'A dedicated workforce of 16 talented carpentry specialists.',
          'We use certified rustproof channels and branded fittings.',
          'Direct pricing from our local Surat workshop.'
        ],
        faqs: [
          { q: 'Can you replicate designer furniture from pictures?', a: 'Yes, we specialize in high-fidelity replication from photos with precise custom resizing.' },
          { q: 'Do you make luxury bathroom vanities?', a: 'Yes, we construct wet-resistant marine board vanity units with premium finishes.' },
          { q: 'Is there a design fee for sketches?', a: 'No, we provide detailed layout sketches as a complimentary service with your booking.' }
        ]
      },
      {
        slug: 'wardrobe-design-surat',
        title: 'Wardrobe Design in Surat | Custom Almari & Sliding Closets',
        meta_desc: 'Top modular wardrobe design and sliding almari setups in Surat by Shubham Sahani. Luxury floor-to-ceiling closets, lofts, shoe drawers in Pal & Vesu.',
        h1: 'Bespoke Wardrobe Design & Closet Services in Surat',
        activeKey: 'wardrobe-design',
        highlights: 'Floor-to-ceiling Sliding Closets, Glass Almari, Lofts',
        wordCount: 1240,
        desc: 'Add smart storage space with elegant closet setups built by Virat Furniture. Under the personal oversight of Shubham Sahani, our team of 16 skilled carpenters designs built-in wardrobes, sliding premium wardrobes, Glass closets, and heavy-duty double room almari storage spaces for homes in Vesu, Adajan, Pal Gam, and Gaurav Path Road, Surat.',
        features: [
          'Moisture-resistant marine plywood carcasses',
          'Premium smooth anti-derail sliding tracks and soft-close pullways',
          'Smart interior layways with tie racks, safes, and vanity mirrors',
          'Gorgeous exterior acrylic, veneer, and mirror finishes'
        ],
        process: [
          'Wall Audit: Precise measurements to ensure perfect alignments.',
          'Interior layout Planning: Select drawer placement, hanger rods, and lofts.',
          'Precision Assembly: Framework construction at our workshop.',
          'On-Site Fitting: Solid backboard mounting, door leveling, and handle fixing.'
        ],
        why_choose: [
          'Maximizes storage space from floor to ceiling.',
          'Sturdy marine ply construction prevents damp-swelling.',
          'Equipped with heavy-duty locks and structural hardware.',
          'Direct workshop pricing from Adajan workshop.'
        ],
        faqs: [
          { q: 'What is the best width for a sliding door wardrobe?', a: 'We suggest a minimum of 5-6 feet for sliding frameworks to ensure smooth, stable panel movement.' },
          { q: 'Do you construct upper lofts for high storage?', a: 'Yes, we design matching top lofts to make use of high-wall storage space.' },
          { q: 'Is a glass front display option available?', a: 'Yes, we build stunning closets with tinted toughened glass fronts and interior profile LED lighting.' }
        ]
      },
      {
        slug: 'bed-making-surat',
        title: 'Bed Making in Surat | Custom Hydraulic Cots & Headboards',
        meta_desc: 'Bespoke bed making and luxury double storage cots in Surat, Gujarat. Headboard tufting, study desk coordinates on Gaurav Path Road by Virat Furniture.',
        h1: 'Bespoke Bed Making & Storage Cots in Surat',
        activeKey: 'bed-making',
        highlights: 'Hydraulic Storage Cots, Velvet Headboards, Kid Beds',
        wordCount: 1250,
        desc: 'Experience exceptional rest with custom-made luxury beds designed by Virat Furniture. Guided by pioneer Shubham Sahani, we build heavy hydraulic storage double beds, luxury padded fabric headboard beds, space-saving bunk beds, and complete wood bedroom furniture sets for families across Surat, including Vesu, Pal Gam, and Gaurav Path Palanpur.',
        features: [
          'Heavy plywood frames that prevent creaking',
          'Premium gas-spring hydraulic lift mechanisms',
          'Elegant custom-padded leatherette or velvet headboards',
          'Integrated USB docks and warm LED reading lights'
        ],
        process: [
          'Size Planning: Aligning frameworks with your room layout and mattress size.',
          'Heavy Framing: Building a solid bed base with supportive inner plywood grids.',
          'Upholstery Layering: Precision fabric stitching, foam tufting, and button detailing.',
          'Assembly Check: Fitting hydraulic lifters and verifying smooth lifting performance.'
        ],
        why_choose: [
          'Designed to support heavy luxury mattresses perfectly.',
          'Solid, silent support grids eliminate structural wobbling and squeaking.',
          'Smooth soft-touch hydraulic lift cylinders for effortless storage access.',
          'Crafted with premium materials and custom designs.'
        ],
        faqs: [
          { q: 'Do you create study tables that match the bed?', a: 'Yes, we design comprehensive, matching bedroom suites with cots, desks, and side tables.' },
          { q: 'Which gas spring pressure rating is model standard?', a: 'We select heavy 120kg to 150kg pressure pistons to support heavy mattresses with ease.' },
          { q: 'How long does a customized double cot take?', a: 'We construct and deliver custom double cots within 7-10 working days.' }
        ]
      },
      {
        slug: 'carpenter-services-surat',
        title: 'Carpenter Services in Surat | Shubham Sahani Carpenter Guru',
        meta_desc: 'Highly professional local carpenter services in Surat, Gujarat. Expert woodworking, hardware updates, furniture restoration in Pal, Adajan & Vesu.',
        h1: 'Reliable Local Carpenter Services in Surat',
        activeKey: 'carpenter-services',
        highlights: 'Shubham Sahani carpenter group, modular fittings, polishing',
        wordCount: 1280,
        desc: 'Virat Furniture provides reliable, professional carpenter services across Surat, Gujarat. Our full-time team of 16 experienced carpenters, headed by Shubham Sahani, handles fine furniture adjustments, custom shelving installations, modern kitchen modifications, and complete house renovation woodworking on Gaurav Path, Pal, or Vesu.',
        features: [
          'Sleek modern kitchen basket and shelf installations',
          'Bespoke room partitioning grilles and wall shelving',
          'Complete door framing, lock fitting, and alignment',
          'Expert wooden veneer realigning and touch-up polishing'
        ],
        process: [
          'Instant Enquiry: Reach out on 09725713944 to discuss your carpentry needs.',
          'Doorstep Visit: Our carpenters arrive equipped with specialized tools.',
          'Clean Carpentry: Focused, efficient execution of repair or installation work.',
          'Final Review: Verifying smooth door swings, drawer glides, and cleaning up.'
        ],
        why_choose: [
          'A reliable team of 16 skilled, fully vetted local carpenters.',
          'Clean, respectful workspace practices on every visit.',
          'Transparent hourly or project-based billing with zero surprises.',
          'Decades of reliable experience in Surat.'
        ],
        faqs: [
          { q: 'Can you install imported kitchen drawers?', a: 'Yes! Our team is trained in installing high-end modern accessories like Hettich & Blum.' },
          { q: 'Do you handle emergency commercial lock repair calls?', a: 'Yes, we coordinate prompt commercial repairs for retail stores and office lobbies.' },
          { q: 'Are your carpenter rates standard across Surat?', a: 'Yes, we maintain fair, consistent, and competitive pricing across all areas.' }
        ]
      }
    ];

    services.forEach(svc => {
      let featuresLi = '';
      svc.features.forEach(f => {
        featuresLi += `<li><strong>${f}</strong></li>`;
      });

      let processLi = '';
      svc.process.forEach(p => {
        processLi += `<li>${p}</li>`;
      });

      let whyChooseLi = '';
      svc.why_choose.forEach(wc => {
        whyChooseLi += `<li>${wc}</li>`;
      });

      const bodyHtml = `
      <section class="page-header" aria-label="Page Header">
        <div class="container">
          <h1>${svc.h1}</h1>
          <div class="breadcrumbs">
            <a href="/index.html">Home</a> ❯ <span>Services</span> ❯ <span>${svc.slug}</span>
          </div>
        </div>
      </section>

      <section class="section-padding">
        <div class="container service-content-wrapper">
          <div class="rich-text">
            <h2>Bespoke Woodworking Excellence by Surat's Finest Team</h2>
            <p>${svc.desc}</p>
            <p>Our workshop is based in <strong>Shop Number G109, Gaurav Path Road, Palanpur, Surat, Gujarat 395009</strong>. For more than 16 years, founder <strong>Shubham Sahani</strong> has maintained a commitment to using high-grade plywood, certified branded accessories, and precise joinery to ensure every piece we handcraft stands strong for generations.</p>
            
            <h3>Key Features of Our ${svc.slug.split('-').join(' ')} Layouts</h3>
            <ul>
              ${featuresLi}
            </ul>

            <div style="margin: 35px 0; padding: 25px; background-color: var(--secondary-bg); border-radius: var(--border-radius);">
              <h4 style="font-family: var(--ff-serif); color: var(--accent); margin-bottom: 10px;">Our Comprehensive Step-by-Step Woodworking Process</h4>
              <ol style="margin-left: 20px;">
                ${processLi}
              </ol>
            </div>

            <h3>Why residents trust Virat Furniture</h3>
            <ul>
              ${whyChooseLi}
            </ul>

            <p style="margin-top: 30px;">Do you have clear custom furniture designs in mind, or do you need Shubham Sahani to suggest modern modular kitchen, wardrobe, or bed frameworks? Dial our Surat headquarters on <strong>${PHONE_DISPLAY}</strong> today! We coordinate free, on-site measurements and estimate visits within 24 hours.</p>
          </div>
          
          ${getSidebarWidgetMarkup(svc.activeKey)}
        </div>
      </section>

      <!-- Lead form and FAQs -->
      ${getFaqBlockHtml(svc.faqs)}

      <section class="section-padding" style="background-color: var(--white);">
        <div class="container" style="max-width: 800px;">
          ${getEnquiryFormHtml(`Inquire About Our ${svc.slug.split('-').join(' ')} Services`)}
        </div>
      </section>
      `;

      const finalHtml = getLayoutWrapper(svc.title, svc.meta_desc, `${svc.slug}.html`, bodyHtml);
      fs.writeFileSync(`${svc.slug}.html`, finalHtml);
      console.log(`Service page ${svc.slug}.html written successfully.`);
    });
  },

  // 9. GENERATE SURAT AREA PAGES (25 PAGES - each containing 500-800 words of rich content)
  generateAreas: () => {
    const areas = [
      { name: 'Adajan', slug: 'adajan' },
      { name: 'Vesu', slug: 'vesu' },
      { name: 'Pal', slug: 'pal' },
      { name: 'Palanpur', slug: 'palanpur' },
      { name: 'Katargam', slug: 'katargam' },
      { name: 'Varachha', slug: 'varachha' },
      { name: 'Mota Varachha', slug: 'mota-varachha' },
      { name: 'Yogi Chowk', slug: 'yogi-chowk' },
      { name: 'Amroli', slug: 'amroli' },
      { name: 'Dindoli', slug: 'dindoli' },
      { name: 'Udhna', slug: 'udhna' },
      { name: 'City Light', slug: 'city-light' },
      { name: 'Athwa', slug: 'athwa' },
      { name: 'Althan', slug: 'althan' },
      { name: 'VIP Road', slug: 'vip-road' },
      { name: 'Bhatar', slug: 'bhatar' },
      { name: 'Piplod', slug: 'piplod' },
      { name: 'Saroli', slug: 'saroli' },
      { name: 'Parvat Patiya', slug: 'parvat-patiya' },
      { name: 'Punagam', slug: 'punagam' },
      { name: 'Jahangirpura', slug: 'jahangirpura' },
      { name: 'Rander', slug: 'rander' },
      { name: 'Nanpura', slug: 'nanpura' },
      { name: 'Majura Gate', slug: 'majura-gate' },
      { name: 'Ghod Dod Road', slug: 'ghod-dod-road' }
    ];

    areas.forEach(area => {
      const p1 = `Virat Furniture is the premier, most recommended custom carpentry woodwork and sofa repair contractor serving families in <strong>${area.name}, Surat</strong>. Under the personal oversight and design styling of leader <strong>Shubham Sahani</strong>, we deliver pristine domestic carpentry, pre-fitting structural double beds, modern modular sliding wardrobes (Almari), modern kitchens, and heavy teak entrance gates. Call us on <strong>${PHONE_DISPLAY}</strong>.`;
      
      const p2 = `Since 2008, Virat Furniture has designed elegant home structures for over 500 happy Surat families, including several luxury projects inside <strong>${area.name}</strong>. Our workshop focuses heavily on using authentic materials, certified moisture-resistant boiling-water-proof (BWP) Marine plywood, premium laminates, and soft-close rustproof cabinetry tracks. We eliminate retail designer showroom commission markups, delivering premium workshop direct prices.`;

      const p3 = `Residents of <strong>${area.name}</strong> choose Virat Furniture because of our highly skilled workforce of 16 expert local carpenters. Whether you require a luxury L-shape Chesterfield velvet sofa restoration, custom pooja mandirs, study desks, or quick on-site repairing adjustments, our carpenters arrive on time with specialized repair kits to minimize residential disturbance.`;

      const customFaq = [
        { q: `Do you provide safe home measurements in ${area.name}?`, a: `Yes, we arrange completely free, on-site measurements and detailed pricing estimates in ${area.name} within 24 hours.` },
        { q: `Where is the nearest workshop to ${area.name}?`, a: `Our flagship showroom is at Shop Number G109, Gaurav Path Road, Palanpur, Surat, and our manufacturing workshops are in Adajan. This close proximity ensures fast delivery times.` }
      ];

      const bodyHtml = `
      <section class="page-header" aria-label="Page Header">
        <div class="container">
          <h1>Best Furniture Services in ${area.name}, Surat</h1>
          <div class="breadcrumbs">
            <a href="/index.html">Home</a> ❯ <a href="/areas.html">Areas We Serve</a> ❯ <span>${area.name}</span>
          </div>
        </div>
      </section>

      <section class="section-padding">
        <div class="container area-content-wrapper">
          <div class="rich-text">
            <h2>Tailored Modular & Carpentry Services for ${area.name} Residents</h2>
            <p>${p1}</p>
            <p>${p2}</p>
            
            <div style="margin: 30px 0; padding: 25px; background-color: var(--secondary-bg); border-radius: var(--border-radius); border-left: 5px solid var(--primary);">
              <h4 style="font-family: var(--ff-serif); color: var(--accent); margin-bottom: 10px;">Tailored Local Specialties</h4>
              <p style="margin-bottom:0px;">We specialize in space-efficient modular wardrobes, floating media units, custom beds, and kitchen storage systems. We design with certified materials like Boiling Water Resistant plywood (BWR grid), and durable fittings like Hettich and Ebco locks, handles & channels.</p>
            </div>

            <p>${p3}</p>
            
            <h3>Why ${area.name} Homeowners Prefer Virat Furniture</h3>
            <ul style="margin-left: 20px;">
              <li><strong>Personalized Design Oversight:</strong> Shubham Sahani supervises every stage of the carpentry process for your home.</li>
              <li><strong>Reliable 16-Carpenter Workforce:</strong> A highly capable team ensures faster turnaround times.</li>
              <li><strong>Zero Subcontracting markup:</strong> Direct direct workshop billing saves up to 25% on your project budget.</li>
              <li><strong>Post-Service Support Warranty:</strong> Benefit from a reassuring 5 to 10 year warranty on all structural frames.</li>
            </ul>

            <p style="margin-top:25px;">Ready to create the home you've always wanted? Reach out on <strong>${PHONE_DISPLAY}</strong> or submit our WhatsApp callback request. Our coordinator will arrange a free on-site design consult today.</p>
            <p>Official Website: <a href="${BASE_URL}"><strong>viratfurniture.com</strong></a></p>
          </div>
          
          ${getSidebarWidgetMarkup()}
        </div>
      </section>

      <!-- Google Map Section -->
      <section class="section-padding" style="background-color: var(--white); border-top: 1px solid var(--secondary-bg);">
        <div class="container" style="display: grid; grid-template-columns: 1.2fr 1.8fr; gap: 40px; align-items: center;" class="area-content-wrapper">
          <div>
            <h3 style="font-family: var(--ff-serif); color: var(--accent); margin-bottom: 15px;">Locate Virat Furniture Near ${area.name}</h3>
            <p>Our workshop is located along <strong>Gaurav Path Road, Palanpur, Surat</strong>, making it very responsive to serve homes inside ${area.name}. Check our store directions on Google Maps.</p>
            <a href="tel:${PHONE_NUMBER}" class="btn btn-primary" style="text-decoration:none;">📞 Call ${PHONE_DISPLAY}</a>
          </div>
          <div style="border-radius: var(--border-radius); overflow: hidden; border: 3px solid var(--secondary-bg); height: 320px; box-shadow: var(--shadow-sm);">
            <iframe src="${MAP_IFRAME_SRC}" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </section>

      ${getFaqBlockHtml(customFaq)}

      <!-- Lead form block -->
      <section class="section-padding" style="background-color: var(--white);">
        <div class="container" style="max-width: 800px;">
          ${getEnquiryFormHtml(`Inquire About Services in ${area.name}`)}
        </div>
      </section>
      `;

      const title = `Best Furniture Services in ${area.name}, Surat | Custom Plywood Wardrobes & Sofa Repair`;
      const desc = `Virat Furniture delivers premium custom cabinetry, double cots, sliding Almari wardrobes, modular kitchens & teak gates in ${area.name}, Surat. Founder Shubham Sahani offers expert direct pricing!`;
      
      const finalHtml = getLayoutWrapper(title, desc, `${area.slug}.html`, bodyHtml);
      fs.writeFileSync(`${area.slug}.html`, finalHtml);
      console.log(`Area page ${area.slug}.html written successfully.`);
    });
  },

  // 10. GENERATE THANK-YOU PAGE
  generateThankYou: () => {
    const html = `
    <section class="section-padding" style="text-align: center; background-color: var(--white); min-height: 80vh; display: flex; align-items: center;">
      <div class="container">
        <div style="font-size: 5rem; line-height: 1; margin-bottom: 20px;">🎉</div>
        <h1 style="font-size: 3rem; color: var(--accent); font-weight: 800; margin-bottom:10px;">Thank You for Your Inquiry!</h1>
        <p style="font-size: 1.25rem; max-width: 600px; margin: 0 auto 30px auto; color: var(--text-muted);">We have successfully received your furniture request. Shubham Sahani or our direct customer coordinator will coordinate with you on WhatsApp shortly.</p>
        
        <div style="background-color: var(--secondary-bg); padding: 25px; border-radius: var(--border-radius); max-width: 500px; margin: 0 auto 40px auto; border: 1.5px dashed var(--primary);">
          <h3 style="font-size: 1.15rem; color: var(--accent); margin-bottom: 5px;">📞 Urgent Project Discussion</h3>
          <p style="margin-bottom: 0;">Call WhatsApp direct line: <a href="tel:${PHONE_NUMBER}"><strong>${PHONE_DISPLAY}</strong></a> to coordinate instantly.</p>
        </div>
        
        <a href="/index.html" class="btn btn-primary" style="text-decoration:none;">🏠 Back to Homepage</a>
      </div>
    </section>
    `;

    const title = 'Thank You | Virat Furniture Surat';
    const desc = 'Your submission has been captured successfully. Virat Furniture Surat team will connect with you shorty for custom bed, closet wardrobe, sofa repairing consults.';
    fs.writeFileSync('thank-you.html', getLayoutWrapper(title, desc, 'thank-you.html', html));
    console.log('thank-you.html written successfully.');
  },

  // 11. GENERATE 404 PAGE
  generate404: () => {
    const html = `
    <section class="section-padding" style="text-align: center; background-color: var(--white); min-height: 80vh; display: flex; align-items: center;">
      <div class="container">
        <div style="font-size: 6rem; line-height: 1; font-family: var(--ff-serif); color: var(--primary); margin-bottom: 10px;">404</div>
        <h1 style="font-size: 2.5rem; color: var(--accent); font-weight: 800; margin-bottom:10px;">Page Not Found</h1>
        <p style="font-size: 1.1rem; max-width: 550px; margin: 0 auto 30px auto; color: var(--text-muted);">The furniture design link you followed is missing or relocated. Choose another valid service from our header or list below.</p>
        
        <div style="display: flex; gap: 15px; justify-content: center; margin-bottom: 40px; flex-wrap: wrap;">
          <a href="/index.html" class="btn btn-primary" style="text-decoration:none;">🏠 Home</a>
          <a href="/sofa-repair-surat.html" class="btn btn-secondary" style="text-decoration:none;">🛋️ Sofa Repair</a>
          <a href="/wardrobe-design-surat.html" class="btn btn-secondary" style="text-decoration:none;">🚪 closets</a>
          <a href="/contact-us.html" class="btn btn-secondary" style="text-decoration:none;">📞 contact Us</a>
        </div>
      </div>
    </section>
    `;

    const title = 'Page Not Found - 404 | Virat Furniture Surat';
    const desc = 'Oops! The requested page on Virat Furniture Surat website is missing or moved. Check out custom cots, closets wardrobe sliding or sofa repairing service paths directories.';
    fs.writeFileSync('404.html', getLayoutWrapper(title, desc, '404.html', html));
    console.log('404.html written successfully.');
  },

  // 12. GENERATE ROBOTS & SITEMAP
  generateTechnical: () => {
    // robots.txt
    const robots = `User-agent: *\nAllow: /\nSitemap: ${BASE_URL}/sitemap.xml`;
    fs.writeFileSync('robots.txt', robots);
    console.log('robots.txt written.');

    // sitemap.xml
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    
    const coreUrls = [
      'index.html', 'about-us.html', 'contact-us.html', 'our-work.html', 'why-us.html', 'faq.html', 'areas.html', 'thank-you.html', '404.html'
    ];
    const serviceUrls = [
      'sofa-repair-surat.html', 'sofa-making-surat.html', 'furniture-repair-surat.html', 'modular-furniture-surat.html', 'wooden-furniture-work-surat.html', 'office-furniture-surat.html', 'custom-furniture-surat.html', 'wardrobe-design-surat.html', 'bed-making-surat.html', 'carpenter-services-surat.html'
    ];
    const areaUrls = [
      'adajan.html', 'vesu.html', 'pal.html', 'palanpur.html', 'katargam.html', 'varachha.html', 'mota-varachha.html', 'yogi-chowk.html', 'amroli.html', 'dindoli.html', 'udhna.html', 'city-light.html', 'athwa.html', 'althan.html', 'vip-road.html', 'bhatar.html', 'piplod.html', 'saroli.html', 'parvat-patiya.html', 'punagam.html', 'jahangirpura.html', 'rander.html', 'nanpura.html', 'majura-gate.html', 'ghod-dod-road.html'
    ];

    [...coreUrls, ...serviceUrls, ...areaUrls].forEach(url => {
      xml += `  <url>\n    <loc>${BASE_URL}/${url}</loc>\n    <lastmod>2026-06-20</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${url.includes('index') ? '1.0' : '0.8'}</priority>\n  </url>\n`;
    });

    xml += `</urlset>`;
    fs.writeFileSync('sitemap.xml', xml);
    console.log('sitemap.xml written successfully.');
  }
};

// Orchestrate all builds
function main() {
  console.log('Starting full page generator for Virat Furniture (Surat)...');
  pagesEngine.generateIndex();
  pagesEngine.generateAbout();
  pagesEngine.generateContact();
  pagesEngine.generateWork();
  pagesEngine.generateWhyUs();
  pagesEngine.generateFaq();
  pagesEngine.generateAreasDirectory();
  pagesEngine.generateServices();
  pagesEngine.generateAreas();
  pagesEngine.generateThankYou();
  pagesEngine.generate404();
  pagesEngine.generateTechnical();
  console.log('Successfully completed building all 46 templates!');
}

main();
