import React, { useState, useEffect } from 'react';
import './header.css';
import NetflixLogo from '../../assets/Netflix_Logo.png';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('netflix-auth');
    sessionStorage.removeItem('netflix-profile');
    window.location.reload();
  };

  return (
    <nav className={`header ${isScrolled ? 'header__black' : ''}`}>
      <div className="header__contents">
        <div className="header__left">
          <img className="header__logo" src={NetflixLogo} alt="Netflix" />
          <ul className="header__links">
            <li>Home</li>
            <li>TV Shows</li>
            <li>Movies</li>
            <li>New & Popular</li>
            <li>My List</li>
            <li>Browse by Languages</li>
          </ul>
        </div>

        <div className="header__right">
          <SearchIcon />
          <NotificationsNoneIcon />
          <div className="header__profile" onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)}>
            <AccountBoxIcon />
            <ArrowDropDownIcon className={`dropdown-arrow ${showDropdown ? 'rotated' : ''}`} />

            {showDropdown && (
              <div className="header__dropdown">
                <div className="dropdown__profiles">
                  <div className="dropdown__profile">
                    <AccountBoxIcon />
                    <span>Profile 1</span>
                  </div>
                  <div className="dropdown__profile">
                    <AccountBoxIcon />
                    <span>Profile 2</span>
                  </div>
                  <div className="dropdown__profile">
                    <AccountBoxIcon />
                    <span>Kids</span>
                  </div>
                </div>
                <div className="dropdown__links">
                  <a href="#">Manage Profiles</a>
                  <a href="#">Transfer Profile</a>
                  <a href="#">Account</a>
                  <a href="#">Help Center</a>
                </div>
                <div className="dropdown__logout">
                  <button onClick={handleLogout}>Sign out</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
