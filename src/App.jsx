import React, { useState, useEffect } from 'react'
import {
  brandConfig,
  skincareSetConfig,
  skincareProducts,
  lipCareConfig,
  upcomingShimmerConfig,
  brandPillars,
  faqItems,
} from './data/products.js'

/**
 * SmartImage Component
 * Displays the requested image, but if the file is missing from public/images,
 * it gracefully switches to an elegant editorial placeholder.
 */
function SmartImage({ src, alt, label, className = '' }) {
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    setHasError(false)
  }, [src])

  if (hasError) {
    return (
      <div className="media-fallback-box">
        <span className="media-fallback-title">Elyriq Signature</span>
        <span className="media-fallback-path">{label || src}</span>
        <span className="media-fallback-hint">
          Image preview placeholder. Add file to public{src} to display.
        </span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
      loading="lazy"
    />
  )
}

/**
 * SmartVideo Component
 * Plays HTML5 video with controls. If the file is missing,
 * shows a designed "Product film coming soon" fallback.
 */
function SmartVideo({ src, poster }) {
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    setHasError(false)
  }, [src])

  if (hasError) {
    return (
      <div className="video-fallback-box">
        <span className="video-fallback-label">Product film coming soon.</span>
        <span className="video-fallback-path">{src}</span>
        <span className="video-fallback-hint">
          Add a 10–20 second MP4 to public{src} to activate.
        </span>
      </div>
    )
  }

  return (
    <video
      controls
      playsInline
      preload="metadata"
      poster={poster}
      className="drawer-video-player"
      onError={() => setHasError(true)}
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  )
}

/**
 * QuantitySelector Component
 * Reusable stepper for selecting set quantities.
 */
function QuantitySelector({ count, onIncrease, onDecrease }) {
  return (
    <div className="quantity-control" aria-label="Select quantity of sets">
      <button
        type="button"
        className="qty-btn"
        onClick={onDecrease}
        disabled={count <= 1}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className="qty-number" aria-live="polite">
        {count}
      </span>
      <button
        type="button"
        className="qty-btn"
        onClick={onIncrease}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  )
}

/**
 * ProductCard Component
 * Reusable card presenting each skincare essential without separate pricing.
 */
function ProductCard({ product, onExplore }) {
  return (
    <article className="product-card">
      <div className="product-card-image-wrap">
        <SmartImage
          src={product.primaryImage}
          alt={product.altText}
          label={product.primaryImage}
          className="product-card-img"
        />
      </div>

      <div className="product-card-body">
        <div className="product-card-meta">
          <span className="product-card-step">{product.category}</span>
          <span className="product-card-size">{product.size}</span>
        </div>

        <h3 className="product-card-title">{product.name}</h3>
        <p className="product-card-desc">{product.shortDescription}</p>

        <button
          type="button"
          className="product-card-btn"
          onClick={() => onExplore(product)}
          aria-label={`Explore details for ${product.name}`}
        >
          Explore Product
        </button>
      </div>
    </article>
  )
}

/**
 * ProductDetailDrawer Component
 * Interactive side drawer for deep-diving into individual product details,
 * image gallery thumbnails, short product video, and set ordering with quantity.
 */
function ProductDetailDrawer({ product, isOpen, onClose }) {
  const [activeImage, setActiveImage] = useState('')
  const [drawerQty, setDrawerQty] = useState(1)

  useEffect(() => {
    if (product) {
      setActiveImage(product.primaryImage)
      setDrawerQty(1)
    }
  }, [product])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.body.classList.add('drawer-open')
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.classList.remove('drawer-open')
    }

    return () => {
      document.body.classList.remove('drawer-open')
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!product) return null

  const calculateTotal = (qty) => {
    return (qty * skincareSetConfig.price).toLocaleString('en-NG')
  }

  const drawerWhatsappUrl = `https://wa.me/${brandConfig.whatsappNumber}?text=${encodeURIComponent(
    `Hello Elyriq Signature. While exploring the ${product.name}, I would like to order${drawerQty} complete skincare set(s) (totaling ₦${calculateTotal(drawerQty)}). The set includes: ${skincareSetConfig.includedItemsSummary}. Please confirm availability and delivery details.`
  )}`

  return (
    <>
      <div
        className={`drawer-backdrop ${isOpen ? 'is-open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={`drawer-panel ${isOpen ? 'is-open' : ''}`}
        aria-label={`${product.name} Details`}
        aria-modal="true"
        role="dialog"
      >
        <div className="drawer-header">
          <span className="drawer-header-category">{product.category}</span>
          <button
            type="button"
            className="drawer-close-btn"
            onClick={onClose}
            aria-label="Close product details"
          >
            ✕
          </button>
        </div>

        <div className="drawer-body">
          <div className="gallery-main-view">
            <SmartImage
              src={activeImage}
              alt={product.altText}
              label={activeImage}
              className="gallery-main-img"
            />
          </div>

          <div className="gallery-thumbnails" role="tablist" aria-label="Product image gallery">
            {product.gallery.map((imgSrc, index) => (
              <button
                key={imgSrc + index}
                type="button"
                className={`gallery-thumb-btn ${activeImage === imgSrc ? 'is-active' : ''}`}
                onClick={() => setActiveImage(imgSrc)}
                aria-label={`View photo ${index + 1}`}
              >
                <SmartImage
                  src={imgSrc}
                  alt={`${product.name} view ${index + 1}`}
                  label={`Thumbnail ${index + 1}`}
                  className="gallery-thumb-img"
                />
              </button>
            ))}
          </div>

          <div className="drawer-product-info">
            <h2 className="drawer-product-title">{product.name}</h2>
            <div className="drawer-product-size">Net Weight: {product.size}</div>
            <p className="drawer-product-desc">{product.fullDescription}</p>
          </div>

          <div className="drawer-video-section">
            <span className="drawer-video-heading">Ritual Film</span>
            <div className="drawer-video-container">
              <SmartVideo
                src={product.video}
                poster={product.primaryImage}
              />
            </div>
          </div>

          {/* Complete Set Purchase Notice Box with Quantity Stepper */}
          <div className="drawer-set-box">
            <span className="drawer-set-badge">Sold Exclusively As A Complete Set</span>
            <p className="drawer-set-text">
              To guarantee balanced nourishment and visible radiance, this product is crafted
              to work with the other three ritual essentials: the Wash, Face Cream, Body Polish,
              and Body Butter.
            </p>

            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <span className="drawer-set-price">
                ₦{calculateTotal(drawerQty)}
              </span>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-brand-deep-rose)', fontWeight: 500 }}>
                {drawerQty} {drawerQty === 1 ? 'Set' : 'Sets'} (₦30,000 / set)
              </span>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <QuantitySelector
                count={drawerQty}
                onIncrease={() => setDrawerQty((q) => q + 1)}
                onDecrease={() => setDrawerQty((q) => Math.max(1, q - 1))}
              />

              <a
                href={drawerWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ flexGrow: 1, textAlign: 'center' }}
              >
                Order {drawerQty} Set{drawerQty > 1 ? 's' : ''} on WhatsApp
              </a>
            </div>

            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', textAlign: 'center' }}>
              Opens WhatsApp to confirm order details and delivery arrangement directly with us.
            </span>
          </div>
        </div>
      </aside>
    </>
  )
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [openFaqIndex, setOpenFaqIndex] = useState(null)
  const [setQuantity, setSetQuantity] = useState(1)

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  const handleExploreProduct = (product) => {
    setSelectedProduct(product)
    setIsDrawerOpen(true)
  }

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false)
  }

  const toggleFaq = (index) => {
    setOpenFaqIndex((prevIndex) => (prevIndex === index ? null : index))
  }

  const calculateFormattedTotal = (qty) => {
    return (qty * skincareSetConfig.price).toLocaleString('en-NG')
  }

  // Pre-formatted WhatsApp links with quantity and price multiplication
  const whatsappSkincareSetUrl = `https://wa.me/${brandConfig.whatsappNumber}?text=${encodeURIComponent(
    `Hello Elyriq Signature. I would like to order ${setQuantity} complete skincare set(s) (totaling ₦${calculateFormattedTotal(setQuantity)}). The set contains the Face & Body Wash, Glow Me Face Cream, Buttered Body, and Elyriq Polish. Please confirm availability and delivery details.`
  )}`

  const whatsappLipCareUrl = `https://wa.me/${brandConfig.whatsappNumber}?text=${encodeURIComponent(
    lipCareConfig.whatsappEnquiryText
  )}`

  const whatsappNavUrl = `https://wa.me/${brandConfig.whatsappNumber}?text=${encodeURIComponent(
    'Hello Elyriq Signature. I am visiting your website and would like to learn more about your skincare rituals.'
  )}`

  return (
    <div className="site-wrapper">
      {/* 1. Announcement Bar */}
      <aside className="announcement-bar" aria-label="Brand Announcement">
        <div className="container">
          <span>{brandConfig.announcement}</span>
        </div>
      </aside>

      {/* 2. Main Navigation Header */}
      <header className="site-header">
        <div className="container header-inner">
          <a href="#home" className="brand-logo" aria-label="Elyriq Signature Home">
            {brandConfig.brandName}
          </a>

          <nav className="nav-desktop" aria-label="Main Navigation">
            <a href="#home" className="nav-link">Home</a>
            <a href="#skincare" className="nav-link">Skincare</a>
            <a href="#lip-care" className="nav-link">Lip Care</a>
            <a href="#our-story" className="nav-link">Our Story</a>
            <a href="#faq" className="nav-link">FAQ</a>
            <a href="#contact" className="nav-link">Contact</a>
          </nav>

          <a
            href={whatsappNavUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-rose header-cta"
          >
            Order on WhatsApp
          </a>

          <button
            type="button"
            className={`mobile-toggle ${mobileMenuOpen ? 'is-active' : ''}`}
            onClick={toggleMobileMenu}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div
        className={`nav-mobile-drawer ${mobileMenuOpen ? 'is-open' : ''}`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <a href="#home" className="nav-link" onClick={closeMobileMenu}>Home</a>
          <a href="#skincare" className="nav-link" onClick={closeMobileMenu}>Skincare</a>
          <a href="#lip-care" className="nav-link" onClick={closeMobileMenu}>Lip Care</a>
          <a href="#our-story" className="nav-link" onClick={closeMobileMenu}>Our Story</a>
          <a href="#faq" className="nav-link" onClick={closeMobileMenu}>FAQ</a>
          <a href="#contact" className="nav-link" onClick={closeMobileMenu}>Contact</a>
          <a
            href={whatsappNavUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-rose"
            style={{ width: '100%', textAlign: 'center', marginTop: '0.5rem' }}
            onClick={closeMobileMenu}
          >
            Order on WhatsApp
          </a>
        </div>
      </div>

      <main>
        {/* 3. Hero Section */}
        <section id="home" className="hero-section">
          <div className="container hero-grid">
            <div className="hero-content">
              <span className="hero-eyebrow">A Considered Glow Ritual</span>
              <h1 className="hero-title">Your skin, your ritual, your glow.</h1>
              <p className="hero-text">
                Thoughtfully curated skincare for the moments you give back to yourself.
                Discover a glow-focused ritual designed to make everyday care feel a little
                more extraordinary.
              </p>
              <div className="hero-actions">
                <a href="#skincare" className="btn-primary">
                  Explore the Skincare Set
                </a>
                <a href="#our-story" className="btn-secondary">
                  Discover Our Story
                </a>
              </div>
            </div>

            <div className="hero-media-wrapper">
              <SmartImage
                src="/images/hero-model-products.jpg"
                alt="Elyriq Signature Skincare Ritual with model"
                label="/images/hero-model-products.jpg"
                className="hero-media-image"
              />
            </div>
          </div>
        </section>

        {/* 4. Brand Promise Strip */}
        <section className="promise-strip" aria-label="Brand Core Principles">
          <div className="container promise-grid">
            <div className="promise-item">
              <span className="promise-item-title">Intentional Self-Care</span>
              <span className="promise-item-dot" />
            </div>
            <div className="promise-item">
              <span className="promise-item-title">Glow-Focused Rituals</span>
              <span className="promise-item-dot" />
            </div>
            <div className="promise-item">
              <span className="promise-item-title">Thoughtful Beauty</span>
              <span className="promise-item-dot" />
            </div>
          </div>
        </section>

        {/* 5. Skincare Collection Section */}
        <section id="skincare" className="skincare-section">
          <div className="container">
            <header className="section-header">
              <span className="section-eyebrow">The Complete Regimen</span>
              <h2 className="section-title">{skincareSetConfig.name}</h2>
              <p className="section-subtitle">{skincareSetConfig.subtitle}</p>

              <div className="set-notice-banner">
                <span className="set-notice-dot" />
                <span className="set-notice-text">
                  {skincareSetConfig.availabilityNotice}
                </span>
              </div>
            </header>

            <div className="products-grid">
              {skincareProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onExplore={handleExploreProduct}
                />
              ))}
            </div>

            {/* Skincare Set Bottom Action Banner with Quantity Stepper */}
            <div className="skincare-set-cta-card">
              <div className="skincare-set-cta-info">
                <h3 className="skincare-set-cta-title">
                  Begin Your Signature Ritual
                </h3>
                <p className="skincare-set-cta-items">
                  Includes: {skincareSetConfig.includedItemsSummary}
                </p>
                <div className="skincare-set-cta-price-row">
                  <span className="skincare-set-cta-price">
                    ₦{calculateFormattedTotal(setQuantity)}
                  </span>
                  <span className="skincare-set-cta-unit-note">
                    {setQuantity} {setQuantity === 1 ? 'complete set' : 'complete sets'} (₦30,000 / set)
                  </span>
                </div>
              </div>

              <div className="order-action-group">
                <QuantitySelector
                  count={setQuantity}
                  onIncrease={() => setSetQuantity((prev) => prev + 1)}
                  onDecrease={() => setSetQuantity((prev) => Math.max(1, prev - 1))}
                />

                <a
                  href={whatsappSkincareSetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Order {setQuantity} Set{setQuantity > 1 ? 's' : ''} on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Editorial Beauty Spread */}
        <section className="editorial-section" aria-label="Editorial Brand Philosophy">
          <div className="container editorial-grid">
            <div className="editorial-media-wrapper">
              <SmartImage
                src="/images/brand-story.jpg"
                alt="Elyriq Signature editorial moment"
                label="/images/brand-story.jpg"
                className="editorial-img"
              />
            </div>

            <div className="editorial-content">
              <span className="section-eyebrow">Editorial Reflection</span>
              <h2 className="editorial-quote">Make room for your glow.</h2>
              <p className="editorial-body">
                True beauty is not an aggressive overhaul; it is a gentle discipline.
                It is the ten quiet minutes in the evening when you wash away the day,
                cushion your skin with rich moisture, and remind yourself that taking care
                of your body is an act of deep reverence.
              </p>
              <p className="editorial-body">
                At Elyriq Signature, we do not formulate for quick bleaching or harsh transformations.
                We craft for enduring radiance, deep hydration, and the quiet confidence of
                thoroughly loved skin.
              </p>
            </div>
          </div>
        </section>

        {/* 7. Lip Care Collection Section */}
        <section id="lip-care" className="lipcare-section">
          <div className="container">
            <header className="section-header">
              <span className="section-eyebrow">Finishing Touches</span>
              <h2 className="section-title">{lipCareConfig.heading}</h2>
              <p className="section-subtitle">{lipCareConfig.subheading}</p>

              <div>
                <span className="complimentary-gift-badge">
                  ★ {lipCareConfig.giftNotice}
                </span>
              </div>
            </header>

            <div className="lip-grid">
              {lipCareConfig.variants.map((variant) => (
                <article key={variant.id} className="lip-card">
                  <div className="lip-card-img-wrap">
                    <SmartImage
                      src={variant.image}
                      alt={variant.name}
                      label={variant.image}
                      className="lip-card-img"
                    />
                  </div>
                  <div className="lip-card-body">
                    <h3 className="lip-card-title">{variant.name}</h3>
                    <p className="lip-card-desc">{variant.description}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="lip-set-order-banner">
              <div className="lip-set-order-info">
                <h3 className="lip-set-order-title">The Complete Lip Care Collection</h3>
                <p className="lip-set-order-sub">
                  Includes Red Gloss, Crystal Clear Gloss, Chocolate Gloss, Soft Pink Cream,
                  and your complimentary matching lip liner.
                </p>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-brand-deep-rose)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Sold Exclusively as a Full Set
                </span>
              </div>

              <a
                href={whatsappLipCareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-rose"
              >
                {lipCareConfig.priceDisplay}
              </a>
            </div>
          </div>
        </section>

        {/* 8. Upcoming Body Shimmer Section */}
        <section className="shimmer-section" aria-label="Upcoming Products">
          <div className="container">
            <div className="shimmer-card">
              <div className="shimmer-content">
                <span className="shimmer-badge">{upcomingShimmerConfig.badge}</span>
                <h2 className="shimmer-title">{upcomingShimmerConfig.heading}</h2>
                <p className="shimmer-text">{upcomingShimmerConfig.subheading}</p>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontStyle: 'italic' }}>
                  Product formulas and preview films in preparation. Stay connected on WhatsApp and Instagram for launch announcements.
                </span>
              </div>

              <div className="shimmer-media-wrap">
                <SmartImage
                  src={upcomingShimmerConfig.placeholderImage}
                  alt="Elyriq Signature Upcoming Body Shimmer"
                  label={upcomingShimmerConfig.placeholderImage}
                  className="shimmer-img"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 9. Brand Story Section */}
        <section id="our-story" className="story-section">
          <div className="container story-grid">
            <div className="story-content">
              <span className="section-eyebrow">Our Philosophy</span>
              <h2 className="section-title">Beauty, with intention.</h2>
              <div className="story-paragraphs">
                <p>
                  Elyriq Signature was born from a fundamental belief: that daily skincare should never
                  feel like a hurried chore or an overwhelming sequence of confusing products. It should
                  feel like a sanctuary—a quiet moment in your day entirely dedicated to honoring yourself.
                </p>
                <p>
                  We celebrate the richness and diverse nuances of African skin. Rather than offering harsh
                  bleaching solutions or unrealistic promises, our focus remains firmly on moisture,
                  barrier protection, and genuine, radiant vitality.
                </p>
                <p>
                  When you step into an Elyriq Signature ritual, you embrace simplicity, elegance, and
                  products formulated to make you feel comfortable and completely confident in your own skin.
                </p>
              </div>
            </div>

            <div className="story-media-wrap">
              <SmartImage
                src="/images/brand-story.jpg"
                alt="Elyriq Signature brand story lifestyle portrait"
                label="/images/brand-story.jpg"
                className="story-img"
              />
            </div>
          </div>
        </section>

        {/* 10. Why Elyriq Signature (Pillars) */}
        <section className="pillars-section" aria-label="Why Elyriq Signature">
          <div className="container">
            <header className="section-header" style={{ marginBottom: '3rem' }}>
              <span className="section-eyebrow">The Elyriq Difference</span>
              <h2 className="section-title">Why Elyriq Signature?</h2>
              <p className="section-subtitle">A mindful approach to everyday personal care.</p>
            </header>

            <div className="pillars-grid">
              {brandPillars.map((pillar, index) => (
                <div key={pillar.title} className="pillar-card">
                  <span className="pillar-number">0{index + 1}</span>
                  <h3 className="pillar-title">{pillar.title}</h3>
                  <p className="pillar-desc">{pillar.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 11. Frequently Asked Questions (Accordion) */}
        <section id="faq" className="faq-section">
          <div className="container">
            <header className="section-header">
              <span className="section-eyebrow">Questions & Answers</span>
              <h2 className="section-title">Frequently Asked Questions</h2>
              <p className="section-subtitle">
                Clear answers regarding our rituals, sets, and ordering process.
              </p>
            </header>

            <div className="faq-list">
              {faqItems.map((faq, index) => {
                const isOpen = openFaqIndex === index
                return (
                  <div
                    key={faq.question}
                    className={`faq-item ${isOpen ? 'is-open' : ''}`}
                  >
                    <button
                      type="button"
                      className="faq-question-btn"
                      onClick={() => toggleFaq(index)}
                      aria-expanded={isOpen}
                    >
                      <span>{faq.question}</span>
                      <span className="faq-icon">{isOpen ? '−' : '+'}</span>
                    </button>
                    {isOpen && (
                      <div className="faq-answer">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* 12. Contact Section */}
        <section id="contact" className="contact-section">
          <div className="container">
            <div className="contact-card">
              <span className="section-eyebrow">Direct Concierge</span>
              <h2 className="section-title">Connect with Elyriq Signature</h2>
              <p className="section-subtitle" style={{ maxWidth: '520px' }}>
                Have questions about your skincare ritual, order availability, or product care?
                Reach out to our team directly.
              </p>

              <div className="contact-channels">
                <div className="contact-item">
                  <span className="contact-item-label">WhatsApp</span>
                  <span className="contact-item-value">09079782731</span>
                </div>
                <div className="contact-item">
                  <span className="contact-item-label">Email</span>
                  <span className="contact-item-value">{brandConfig.email}</span>
                </div>
                <div className="contact-item">
                  <span className="contact-item-label">Instagram</span>
                  <span className="contact-item-value">{brandConfig.instagramHandle}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <a
                  href={`https://wa.me/${brandConfig.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-rose"
                >
                  Chat on WhatsApp
                </a>
                <a
                  href={`mailto:${brandConfig.email}`}
                  className="btn-secondary"
                >
                  Send an Email
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 13. Dynamic Site Footer */}
      <footer className="site-footer">
        <div className="container">
          <div className="footer-top">
            <div>
              <div className="footer-brand-title">{brandConfig.brandName}</div>
              <p className="footer-brand-text">
                Thoughtfully curated skincare for the moments you give back to yourself.
                Intentional rituals crafted for long-lasting radiance and everyday glow.
              </p>
            </div>

            <div>
              <div className="footer-heading">Navigation</div>
              <ul className="footer-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#skincare">The Skincare Set</a></li>
                <li><a href="#lip-care">Lip Care Collection</a></li>
                <li><a href="#our-story">Our Story</a></li>
                <li><a href="#faq">FAQ</a></li>
              </ul>
            </div>

            <div>
              <div className="footer-heading">Connect</div>
              <ul className="footer-links">
                <li>
                  <a
                    href={`https://wa.me/${brandConfig.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp (09079782731)
                  </a>
                </li>
                <li>
                  <a
                    href={brandConfig.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram ({brandConfig.instagramHandle})
                  </a>
                </li>
                <li>
                  <a href={`mailto:${brandConfig.email}`}>
                    {brandConfig.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <span>
              &copy; {new Date().getFullYear()} {brandConfig.brandName}. All rights reserved.
            </span>
            <span>Glow-Focused Skincare Rituals</span>
          </div>
        </div>
      </footer>

      {/* Interactive Skincare Detail Drawer with Quantity Stepper */}
      <ProductDetailDrawer
        product={selectedProduct}
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
      />
    </div>
  )
}