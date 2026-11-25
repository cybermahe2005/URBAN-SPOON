import React from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiBookOpen, FiAward, FiHeart, FiClock, FiShield, FiStar, FiArrowRight } from 'react-icons/fi';
import { GiCook, GiWineGlass, GiSparkles } from 'react-icons/gi';
import MenuCard from '../components/menu/MenuCard';
import { menuItems } from '../data/menuData';
import { testimonialsData, galleryData } from '../data/testimonialsData';
import '../styles/home.css';

const Home = () => {
  // Grab 4 top signature items for the homepage preview
  const signatureDishes = menuItems.filter(item => 
    item.tag === 'Chef Signature' || item.tag === 'Bestseller'
  ).slice(0, 4);

  return (
    <div className="home-page">
      {/* 1. HERO SECTION */}
      <section className="hero-section" aria-label="Hero Introduction">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <GiSparkles />
              <span>Contemporary Fine Dining Experience</span>
            </div>
            <h1 className="hero-title">
              Artisanal Flavors, <span>Unforgettable</span> Dining Moments
            </h1>
            <p className="hero-description">
              Welcome to Urban Spoon. We harmonize heritage cooking techniques with modern culinary
              finesse. Discover exquisite seasonal dishes, handpicked wines, and an inviting atmosphere
              crafted for your most cherished gatherings.
            </p>

            <div className="hero-actions">
              <Link to="/menu" className="btn btn-primary btn-lg">
                <FiBookOpen />
                <span>Explore Menu</span>
              </Link>
              <Link to="/reserve" className="btn btn-outline-white btn-lg">
                <FiCalendar />
                <span>Reserve a Table</span>
              </Link>
            </div>

            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">100%</span>
                <span className="stat-label">Organic Local Produce</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">4.9 / 5</span>
                <span className="stat-label">500+ Diner Reviews</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">15+</span>
                <span className="stat-label">Culinary Awards</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WELCOME & STORY TEASER */}
      <section className="section" aria-label="Welcome and Philosophy">
        <div className="container">
          <div className="story-teaser">
            <div className="story-image-stack">
              <img
                src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1000&q=80"
                alt="Executive Chef arranging artisan plate"
                className="story-img-main"
              />
              <div className="story-badge-floating">
                <h4>12+ Years</h4>
                <span>Of Culinary Dedication</span>
              </div>
            </div>

            <div className="story-text-content">
              <span className="section-subtitle">Welcome to Urban Spoon</span>
              <h2 className="section-title">A Symphony of Passion, Hearth & Hospitality</h2>
              <p style={{ marginBottom: '1.25rem', lineHeight: '1.8' }}>
                Founded in the vibrant heart of the city, Urban Spoon was born from a singular vision:
                to transform dining from a routine meal into an immersive sensorial journey.
              </p>
              <p style={{ marginBottom: '2rem', lineHeight: '1.8' }}>
                Under the creative direction of Chef Alexandre Laurent, our kitchen treats every ingredient
                with reverence. We forage locally, simmer our stocks for 48 hours, bake sourdough daily,
                and pair every dish with curated vintages from boutique family vineyards.
              </p>
              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                <Link to="/about" className="btn btn-outline">
                  <span>Read Our Full Story</span>
                  <FiArrowRight />
                </Link>
                <Link to="/reserve" className="btn btn-primary">
                  <FiCalendar />
                  <span>Submit Table Inquiry</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SIGNATURE DISHES SHOWCASE */}
      <section className="section" style={{ backgroundColor: 'var(--color-cream-card)' }} aria-label="Signature Dishes">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Chef's Highlights</span>
            <h2 className="section-title">Signature Culinary Creations</h2>
            <p className="section-description">
              Hand-selected delicacies that embody the innovation, balance, and depth of flavors
              defining the Urban Spoon kitchen.
            </p>
          </div>

          <div className="menu-grid">
            {signatureDishes.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
            <Link to="/menu" className="btn btn-primary btn-lg">
              <FiBookOpen />
              <span>Explore Complete Menu & Prices</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE URBAN SPOON */}
      <section className="section" aria-label="Why Choose Us">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">The Urban Spoon Standard</span>
            <h2 className="section-title">Why Diners Choose Us</h2>
            <p className="section-description">
              From our open-flame hearth to your table, our commitment to excellence is reflected in
              every detail of your dining experience.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-box">
                <GiCook />
              </div>
              <h3 className="feature-title">Master Chef Pedigree</h3>
              <p className="feature-desc">
                Helmed by internationally recognized culinary talent delivering refined flavor
                profiles and artful presentations.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-box">
                <FiHeart />
              </div>
              <h3 className="feature-title">Farm-To-Table Fresh</h3>
              <p className="feature-desc">
                We partner with regional regenerative farmers to procure seasonal heirloom produce and
                sustainable seafood daily.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-box">
                <GiWineGlass />
              </div>
              <h3 className="feature-title">Sommelier Pairings</h3>
              <p className="feature-desc">
                An extensive cellar housing over 200 handpicked labels, artisanal botanical cocktails,
                and rare vintage spirits.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-box">
                <FiShield />
              </div>
              <h3 className="feature-title">Seamless Table Inquiries</h3>
              <p className="feature-desc">
                Effortless reservation inquiry system with prompt personal confirmation from our
                dedicated hospitality host team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. GUEST TESTIMONIALS */}
      <section className="section" style={{ backgroundColor: '#faf5ec' }} aria-label="Guest Testimonials">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Diner Praises</span>
            <h2 className="section-title">Words from Our Valued Guests</h2>
            <p className="section-description">
              Read authentic feedback from food connoisseurs and guests who celebrated special
              milestones at Urban Spoon.
            </p>
          </div>

          <div className="testimonials-grid">
            {testimonialsData.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card">
                <div>
                  <div className="stars-row">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FiStar key={i} fill="#f59e0b" />
                    ))}
                  </div>
                  <p className="testimonial-quote">"{testimonial.comment}"</p>
                </div>

                <div className="testimonial-author">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="author-avatar"
                  />
                  <div className="author-info">
                    <h4>{testimonial.name}</h4>
                    <span>{testimonial.role}</span>
                    <br />
                    <small style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
                      {testimonial.occasion}
                    </small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. AMBIANCE GALLERY PREVIEW */}
      <section className="section" aria-label="Restaurant Gallery">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Visual Experience</span>
            <h2 className="section-title">Step Inside Urban Spoon</h2>
            <p className="section-description">
              Glimpse into our ambient dining hall, open hearth kitchen, and intimate lounge.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {galleryData.slice(0, 4).map((img) => (
              <div
                key={img.id}
                style={{
                  height: '240px',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  position: 'relative',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <img
                  src={img.image}
                  alt={img.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
                  onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '1rem',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                    color: '#ffffff',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                  }}
                >
                  {img.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. TABLE RESERVATION CTA */}
      <section className="section" style={{ paddingTop: '2rem' }} aria-label="Table Reservation Call to Action">
        <div className="container">
          <div className="cta-banner">
            <div className="cta-banner-content">
              <span className="section-subtitle" style={{ color: '#fed7aa' }}>
                Join Us for an Exceptional Dining Experience
              </span>
              <h2>Ready to Savor the Extraordinary?</h2>
              <p>
                Whether planning a romantic dinner, an executive luncheon, or an intimate celebration,
                our culinary team is prepared to craft an unforgettable dining occasion.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <Link to="/reserve" className="btn btn-primary btn-lg">
                  <FiCalendar />
                  <span>Reserve Table Inquiry</span>
                </Link>
                <Link to="/contact" className="btn btn-outline-white btn-lg">
                  <FiClock />
                  <span>Check Timings & Location</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
