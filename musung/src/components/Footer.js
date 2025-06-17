import React from 'react';
import { Mail, Github, Instagram, Heart, Music } from 'lucide-react';

const Footer = ({ darkMode }) => 
{
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'Email',
      icon: Mail,
      href: 'mailto:waleedabdullah2004@gmail.com',
      color: '#ef4444'
    },
    {
      name: 'GitHub',
      icon: Github,
      href: 'https://github.com/WaleedAbdullah2215',
      color: '#6b7280'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      href: 'https://www.instagram.com/walled._.up/', 
      color: '#ec4899'
    }
  ];

  const footerStyles = 
  {
    footer: 
    {
      backgroundColor: darkMode ? '#111827' : '#ffffff',
      borderTop: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
      transition: 'all 0.3s ease',
      marginTop: 'auto'
    },
    container: 
    {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem 1.5rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1.5rem'
    },
    brandSection: 
    {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem'
    },
    logoContainer: 
    {
      padding: '0.75rem',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
      boxShadow: '0 10px 25px rgba(139, 92, 246, 0.3)',
      transform: 'scale(1)',
      transition: 'transform 0.2s ease',
      cursor: 'pointer'
    },
    logoContainerHover: 
    {
      transform: 'scale(1.05)'
    },
    brandText: 
    {
      textAlign: 'center'
    },
    brandTitle: 
    {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      margin: '0 0 0.25rem 0'
    },
    brandSubtitle: 
    {
      fontSize: '0.875rem',
      color: darkMode ? '#9ca3af' : '#6b7280',
      margin: 0
    },
    socialContainer: 
    {
      display: 'flex',
      alignItems: 'center',
      gap: '1.5rem'
    },
    socialLink: 
    {
      padding: '0.75rem',
      borderRadius: '50%',
      backgroundColor: darkMode ? '#1f2937' : '#f3f4f6',
      color: darkMode ? '#9ca3af' : '#6b7280',
      textDecoration: 'none',
      transition: 'all 0.3s ease',
      transform: 'scale(1)',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    divider: 
    {
      width: '100%',
      maxWidth: '24rem',
      height: '1px',
      backgroundColor: darkMode ? '#374151' : '#e5e7eb'
    },
    copyrightSection: 
    {
      textAlign: 'center'
    },
    copyrightText: 
    {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      fontSize: '0.875rem',
      color: darkMode ? '#9ca3af' : '#6b7280',
      margin: '0 0 0.5rem 0'
    },
    madeWithLove: 
    {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      fontSize: '0.875rem',
      color: darkMode ? '#9ca3af' : '#6b7280',
      margin: 0
    },
    heartIcon: 
    {
      color: '#ef4444',
      animation: 'heartbeat 1.5s ease-in-out infinite'
    }
  };

  const handleSocialHover = (e, color) => 
  {
    e.target.closest('a').style.backgroundColor = darkMode ? '#374151' : '#e5e7eb';
    e.target.closest('a').style.color = color;
    e.target.closest('a').style.transform = 'scale(1.1)';
    e.target.closest('a').style.boxShadow = `0 4px 15px ${color}40`;
  };

  const handleSocialLeave = (e) => 
  {
    e.target.closest('a').style.backgroundColor = darkMode ? '#1f2937' : '#f3f4f6';
    e.target.closest('a').style.color = darkMode ? '#9ca3af' : '#6b7280';
    e.target.closest('a').style.transform = 'scale(1)';
    e.target.closest('a').style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
  };

  const handleLogoHover = (e) => 
  {
    e.target.closest('div').style.transform = 'scale(1.05)';
  };

  const handleLogoLeave = (e) => 
  {
    e.target.closest('div').style.transform = 'scale(1)';
  };

  return (
    <>
      <style>
        {`
          @keyframes heartbeat {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
          }
          
          @media (max-width: 768px) {
            .footer-container {
              padding: 1.5rem 1rem !important;
              gap: 1rem !important;
            }
            
            .footer-brand-section {
              flex-direction: column !important;
              text-align: center !important;
              gap: 0.5rem !important;
            }
            
            .footer-social-container {
              gap: 1rem !important;
            }
            
            .footer-brand-title {
              font-size: 1.125rem !important;
            }
          }
        `}
      </style>
      
      <footer style={footerStyles.footer}>
        <div style={footerStyles.container} className="footer-container">
          
          <div style={footerStyles.brandSection} className="footer-brand-section">
            <div 
              style={footerStyles.logoContainer}
              onMouseEnter={handleLogoHover}
              onMouseLeave={handleLogoLeave}
            >
              <Music size={24} color="white" />
            </div>
            <div style={footerStyles.brandText}>
              <h3 style={footerStyles.brandTitle} className="footer-brand-title">
                MUSUNGG
              </h3>
              <p style={footerStyles.brandSubtitle}>
                Crafted with passion for music lovers
              </p>
            </div>
          </div>

          <div style={footerStyles.socialContainer} className="footer-social-container">
            {socialLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={footerStyles.socialLink}
                  onMouseEnter={(e) => handleSocialHover(e, link.color)}
                  onMouseLeave={handleSocialLeave}
                  aria-label={link.name}
                >
                  <IconComponent size={20} />
                </a>
              );
            })}
          </div>

          <div style={footerStyles.divider} />

          <div style={footerStyles.copyrightSection}>
            <p style={footerStyles.copyrightText}>
              © {currentYear} WaleedAbdullah. All rights reserved.
            </p>
            <p style={footerStyles.madeWithLove}>
              Made with <Heart size={14} style={footerStyles.heartIcon} /> for music Lovers like youu
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;