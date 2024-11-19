import React, { useState } from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import LanguageIcon from '@mui/icons-material/Language';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import './footer.css';

const Footer = () => {
    const [showLanguages, setShowLanguages] = useState(false);

    const footerLinks = [
        ['Audio Description', 'Help Center', 'Gift Cards', 'Media Center'],
        ['Investor Relations', 'Jobs', 'Terms of Use', 'Privacy'],
        ['Legal Notices', 'Cookie Preferences', 'Corporate Information', 'Contact Us'],
        ['Account', 'Ways to Watch', 'Only on Netflix', 'Speed Test']
    ];

    const languages = ['English', 'Español', 'Français', 'العربية', '한국어', '日本語'];

    return (
        <footer className="footer">
            <div className="footer__content">
                <div className="footer__social-links">
                    <FacebookIcon className="social-icon" />
                    <InstagramIcon className="social-icon" />
                    <TwitterIcon className="social-icon" />
                    <YouTubeIcon className="social-icon" />
                </div>

                <div className="footer__links-grid">
                    {footerLinks.map((column, index) => (
                        <ul key={index} className="footer__links-column">
                            {column.map((link) => (
                                <li key={link}>
                                    <a href="#">{link}</a>
                                </li>
                            ))}
                        </ul>
                    ))}
                </div>

                <div className="footer__language-selector">
                    <button
                        className="language-button"
                        onClick={() => setShowLanguages(!showLanguages)}
                    >
                        <LanguageIcon />
                        <span>English</span>
                        <KeyboardArrowDownIcon className={showLanguages ? 'rotated' : ''} />
                    </button>

                    {showLanguages && (
                        <div className="language-dropdown">
                            {languages.map((language) => (
                                <button key={language} className="language-option">
                                    {language}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="footer__service-code">
                    <button className="service-code-button">
                        Service Code
                    </button>
                </div>

                <div className="footer__copyright">
                    <p>&copy; 1997-{new Date().getFullYear()} Netflix, Inc.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
