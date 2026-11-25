import React from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiBookOpen, FiAward, FiCheck, FiHeart, FiClock } from 'react-icons/fi';
import '../styles/about.css';

const About = () => {
  return (
    <div className="about-page">
      {/* 1. HERO BANNER */}
      <section className="page-hero" aria-label="About Urban Spoon">
        <div className="container">
          <span className="section-subtitle" style={{ color: '#fed7aa' }}>
            Our Heritage & Passion
          </span>
          <h1 className="page-hero-title">The Culinary Soul of Urban Spoon</h1>
          <p className="page-hero-subtitle">
            A celebration of honest ingredients, time-honored artisanal craft, and an unwavering
            pursuit of culinary perfection.
          </p>
        </div>
      </section>

      {/* 2. INTRODUCTION & STORY */}
      <section className="section">
        <div className="container">
          <div className="about-split">
            <div>
              <span className="section-subtitle">Our Inception</span>
              <h2 className="section-title">Rooted in Tradition, Elevated by Innovation</h2>
              <p style={{ lineHeight: '1.8', marginBottom: '1rem' }}>
                Established in 2014, Urban Spoon began as a humble 10-table bistro inspired by the rustic
                hearth kitchens of southern Europe and the cutting-edge gastronomic energy of modern
                metropolitan dining.
              </p>
              <p style={{ lineHeight: '1.8', marginBottom: '1.25rem' }}>
                Over the past decade, we have remained steadfast to one guiding principle: true luxury is
                found in the authenticity of flavor. We reject artificial additives and rushed cooking.
                Instead, our chefs embrace low-and-slow braising, open-flame oak roasting, and daily
                handcrafted pasta rollouts.
              </p>

              <div className="about-quote-box">
                "Cooking is not merely a recipe; it is an emotional conversation between the soil, the
                flame, and the guest sitting at our table."
                <div style={{ marginTop: '0.5rem', fontWeight: 600, color: 'var(--color-primary)', fontStyle: 'normal' }}>
                  — Alexandre Laurent, Executive Chef & Founder
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                <Link to="/menu" className="btn btn-primary">
                  <FiBookOpen />
                  <span>Explore Our Creations</span>
                </Link>
                <Link to="/reserve" className="btn btn-outline">
                  <FiCalendar />
                  <span>Reserve Table Inquiry</span>
                </Link>
              </div>
            </div>

            <div className="about-split-img-wrapper">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80"
                alt="Chefs collaborating in the open hearth kitchen"
                className="about-split-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. RESTAURANT MILESTONES / HISTORY */}
      <section className="section" style={{ backgroundColor: 'var(--color-cream-card)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Our Journey</span>
            <h2 className="section-title">A Decade of Culinary Milestones</h2>
            <p className="section-description">
              How a passionate vision transformed into an award-winning destination for food lovers.
            </p>
          </div>

          <div className="timeline-grid">
            <div className="timeline-card">
              <span className="timeline-year">2014</span>
              <h3 className="timeline-title">The First Hearth</h3>
              <p className="timeline-desc">
                Urban Spoon opens its doors with an intimate dining room and an open wood-fired oven on
                Edinburgh's historic George Street in the New Town.
              </p>
            </div>

            <div className="timeline-card">
              <span className="timeline-year">2017</span>
              <h3 className="timeline-title">Farm-to-Table Alliance</h3>
              <p className="timeline-desc">
                Established direct co-op partnerships with 14 regenerative organic family farms within a
                60-mile radius.
              </p>
            </div>

            <div className="timeline-card">
              <span className="timeline-year">2021</span>
              <h3 className="timeline-title">Sommelier Cellar Debut</h3>
              <p className="timeline-desc">
                Expanded with an underground temperature-controlled wine vault housing 200+ biodynamic
                and vintage labels.
              </p>
            </div>

            <div className="timeline-card">
              <span className="timeline-year">2024</span>
              <h3 className="timeline-title">Golden Fork Excellence</h3>
              <p className="timeline-desc">
                Awarded 'Best Contemporary Dining Experience' and ranked among the city's top 10
                must-visit culinary destinations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CUISINE & SPECIALTIES */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">What We Do Best</span>
            <h2 className="section-title">Our Culinary Specialties</h2>
            <p className="section-description">
              Every section of our kitchen is dedicated to honoring a specific culinary craft with
              uncompromising mastery.
            </p>
          </div>

          <div className="specialties-grid">
            <div className="specialty-item">
              <img
                src="https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=600&q=80"
                alt="Wood-Fired Prime Cuts"
                className="specialty-img"
              />
              <div className="specialty-body">
                <h3>Wood-Fired Prime Cuts</h3>
                <p>
                  28-day dry-aged USDA Prime and Black Angus steaks seared over white oak embers to
                  achieve a delicate smokiness and melt-in-mouth tenderness.
                </p>
              </div>
            </div>

            <div className="specialty-item">
              <img
                src="https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80"
                alt="Handcrafted Artisanal Pasta"
                className="specialty-img"
              />
              <div className="specialty-body">
                <h3>Handcrafted Artisanal Pasta</h3>
                <p>
                  Hand-extruded daily using stone-ground Italian semolina and free-range egg yolks,
                  tossed in rich emulsions of black truffles and Vacche Rosse Parmigiano.
                </p>
              </div>
            </div>

            <div className="specialty-item">
              <img
                src="https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80"
                alt="Haute Pastry & Desserts"
                className="specialty-img"
              />
              <div className="specialty-body">
                <h3>Haute Pastry & Desserts</h3>
                <p>
                  Delicate creations starring single-origin Valrhona grand cru chocolates, Madagascar
                  bourbon vanilla beans, and seasonal orchard fruit compotes.
                </p>
              </div>
            </div>

            <div className="specialty-item">
              <img
                src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600&q=80"
                alt="Botanical Mixology & Wines"
                className="specialty-img"
              />
              <div className="specialty-body">
                <h3>Botanical Mixology & Wines</h3>
                <p>
                  House-infused spirits, hand-pressed herb shrubs, and small-batch bitters curated to
                  harmonize seamlessly with our seasonal tasting menus.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHY CUSTOMERS CHOOSE URBAN SPOON */}
      <section className="section section-dark">
        <div className="container">
          <div className="about-split reverse">
            <div>
              <span className="section-subtitle" style={{ color: 'var(--color-accent)' }}>
                The Guest Promise
              </span>
              <h2 className="section-title" style={{ color: 'var(--color-white)' }}>
                Why Guests Return to Urban Spoon
              </h2>
              <p style={{ color: '#d1c7bc', lineHeight: '1.8', marginBottom: '1.5rem' }}>
                At Urban Spoon, dining extends far beyond food. It is an orchestration of sensory
                comfort, thoughtful attentiveness, and warmth that makes each guest feel valued.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <div style={{ color: 'var(--color-primary)', marginTop: '3px' }}>
                    <FiCheck size={18} />
                  </div>
                  <div>
                    <strong style={{ color: 'var(--color-white)' }}>Uncompromising Sourcing:</strong>
                    <span style={{ color: '#b8ada1' }}> No preservatives, zero frozen staples, 100% pasture-raised meats.</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <div style={{ color: 'var(--color-primary)', marginTop: '3px' }}>
                    <FiCheck size={18} />
                  </div>
                  <div>
                    <strong style={{ color: 'var(--color-white)' }}>Attentive Hospitality:</strong>
                    <span style={{ color: '#b8ada1' }}> Intuitive, courteous table captains who anticipate your desires effortlessly.</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <div style={{ color: 'var(--color-primary)', marginTop: '3px' }}>
                    <FiCheck size={18} />
                  </div>
                  <div>
                    <strong style={{ color: 'var(--color-white)' }}>Seamless Table Inquiries:</strong>
                    <span style={{ color: '#b8ada1' }}> Direct digital inquiry with rapid phone follow-up for tailored table arrangements.</span>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '2.5rem' }}>
                <Link to="/reserve" className="btn btn-primary btn-lg">
                  <FiCalendar />
                  <span>Reserve Table Inquiry</span>
                </Link>
              </div>
            </div>

            <div>
              <img
                src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80"
                alt="Warm ambient seating area at Urban Spoon"
                style={{
                  width: '100%',
                  height: '420px',
                  objectFit: 'cover',
                  borderRadius: 'var(--radius-xl)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                  border: '1px solid rgba(234, 88, 12, 0.3)',
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
