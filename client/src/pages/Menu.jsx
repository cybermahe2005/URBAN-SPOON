import React, { useState, useMemo } from 'react';
import { FiSearch, FiSliders, FiX, FiCalendar, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import MenuCard from '../components/menu/MenuCard';
import { menuItems, menuCategories } from '../data/menuData';
import '../styles/menu.css';

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default'); // 'default' | 'price-asc' | 'price-desc'

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts = { All: menuItems.length };
    menuCategories.forEach((cat) => {
      if (cat !== 'All') {
        counts[cat] = menuItems.filter((i) => i.category === cat).length;
      }
    });
    return counts;
  }, []);

  // Filter & Sort Logic
  const filteredItems = useMemo(() => {
    let result = [...menuItems];

    // Filter by category
    if (selectedCategory !== 'All') {
      result = result.filter((item) => item.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          (item.dietary && item.dietary.toLowerCase().includes(q))
      );
    }

    // Sort by price
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setSortBy('default');
  };

  return (
    <div className="menu-page">
      {/* 1. HERO HEADER */}
      <section className="page-hero" aria-label="Menu Header">
        <div className="container">
          <span className="section-subtitle" style={{ color: '#fed7aa' }}>
            Culinary Offerings & Pricing
          </span>
          <h1 className="page-hero-title">Our Artisanal Menu</h1>
          <p className="page-hero-subtitle">
            Crafted with passion using seasonally sourced ingredients, authentic spices, and master
            culinary techniques.
          </p>
        </div>
      </section>

      {/* 2. MENU CONTROLS & FILTER BAR */}
      <section className="section" style={{ paddingTop: '3rem' }}>
        <div className="container">
          <div
            style={{
              backgroundColor: 'var(--color-white)',
              borderRadius: 'var(--radius-xl)',
              padding: '1.75rem',
              boxShadow: 'var(--shadow-md)',
              border: '1px solid var(--color-cream-border)',
              marginBottom: '3rem',
            }}
          >
            {/* Search & Sort Row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1.25rem',
                flexWrap: 'wrap',
                marginBottom: '1.5rem',
              }}
            >
              {/* Search Box */}
              <div
                style={{
                  position: 'relative',
                  flexGrow: 1,
                  minWidth: '260px',
                }}
              >
                <FiSearch
                  style={{
                    position: 'absolute',
                    left: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--color-text-light)',
                    fontSize: '1.1rem',
                  }}
                />
                <input
                  type="text"
                  placeholder="Search dishes by name, ingredients, or dietary preferences..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="form-control"
                  style={{ paddingLeft: '2.5rem', paddingRight: searchQuery ? '2.5rem' : '1rem' }}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--color-text-light)',
                      display: 'flex',
                    }}
                    aria-label="Clear search"
                  >
                    <FiX size={18} />
                  </button>
                )}
              </div>

              {/* Sort Selector */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <FiSliders style={{ color: 'var(--color-primary)' }} />
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-dark-brown)' }}>
                  Sort by:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="form-control"
                  style={{ width: 'auto', padding: '0.65rem 1rem' }}
                >
                  <option value="default">Default / Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Category Pills (Level 5 Task 1) */}
            <div
              style={{
                display: 'flex',
                gap: '0.75rem',
                flexWrap: 'wrap',
                borderTop: '1px solid #f1ece4',
                paddingTop: '1.25rem',
              }}
            >
              {menuCategories.map((category) => {
                const isActive = selectedCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    style={{
                      padding: '0.6rem 1.35rem',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.925rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      border: isActive
                        ? '1.5px solid var(--color-primary)'
                        : '1.5px solid var(--color-cream-border)',
                      backgroundColor: isActive ? 'var(--color-primary)' : 'var(--color-cream)',
                      color: isActive ? 'var(--color-white)' : 'var(--color-dark-brown)',
                      boxShadow: isActive ? 'var(--shadow-primary)' : 'none',
                      transition: 'all var(--transition-normal)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <span>{category}</span>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        padding: '0.15rem 0.45rem',
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: isActive
                          ? 'rgba(255, 255, 255, 0.25)'
                          : 'var(--color-cream-border)',
                        color: isActive ? 'var(--color-white)' : 'var(--color-text-muted)',
                      }}
                    >
                      {categoryCounts[category] || 0}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Results Summary Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.75rem',
              color: 'var(--color-text-muted)',
              fontSize: '0.95rem',
            }}
          >
            <div>
              Showing{' '}
              <strong style={{ color: 'var(--color-dark-brown)' }}>
                {filteredItems.length}
              </strong>{' '}
              dishes {selectedCategory !== 'All' && <span>in <em>{selectedCategory}</em></span>}
              {searchQuery && (
                <span>
                  {' '}
                  matching "<strong>{searchQuery}</strong>"
                </span>
              )}
            </div>

            {(selectedCategory !== 'All' || searchQuery !== '' || sortBy !== 'default') && (
              <button
                onClick={handleResetFilters}
                style={{
                  color: 'var(--color-primary)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                }}
              >
                <FiX size={15} />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          {/* 3. MENU ITEMS GRID */}
          {filteredItems.length > 0 ? (
            <div className="menu-grid">
              {filteredItems.map((item) => (
                <MenuCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div
              style={{
                textAlign: 'center',
                padding: '5rem 2rem',
                backgroundColor: 'var(--color-white)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-cream-border)',
                maxWidth: '550px',
                margin: '2rem auto',
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-primary-light)',
                  color: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.75rem',
                  margin: '0 auto 1.25rem',
                }}
              >
                <FiSearch />
              </div>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem' }}>No Culinary Matches Found</h3>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                We couldn't find any dish matching your current filter criteria. Try adjusting your
                keywords or clearing active filters.
              </p>
              <button onClick={handleResetFilters} className="btn btn-primary">
                <span>View Full Menu</span>
              </button>
            </div>
          )}

          {/* Table Inquiry Prompt at bottom */}
          <div
            style={{
              marginTop: '5rem',
              backgroundColor: 'var(--color-cream-card)',
              borderRadius: 'var(--radius-xl)',
              padding: '3rem 2rem',
              border: '1px solid var(--color-cream-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '2rem',
              flexWrap: 'wrap',
            }}
          >
            <div>
              <h3 style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>
                Desiring a Specific Culinary Experience?
              </h3>
              <p style={{ color: 'var(--color-text-muted)' }}>
                Our chefs accommodate dietary specifications, vegan preferences, and bespoke multi-course
                tastings upon advance inquiry.
              </p>
            </div>
            <Link to="/reserve" className="btn btn-primary btn-lg">
              <FiCalendar />
              <span>Reserve Table Inquiry</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Menu;
