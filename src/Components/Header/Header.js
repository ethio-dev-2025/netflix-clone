import React, { useState, useEffect } from 'react';
import './header.css';
import SearchIcon from '@mui/icons-material/Search';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
 import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`header_outer_container ${scrolled ? 'scrolled' : ''}`}>
      <div className="header_container">
        <div className="header_left">
          <ul>
            <li className="netflix-logo">NETFLIX</li>
            <li>Home</li>
            <li>TVShows</li>
            <li>Movies</li>
            <li>Latest</li>
            <li>MyList</li>
            <li>Browse by Languages</li>
          </ul>
        </div>
        <div className="header_right">
          <ul>
            <li>
              <a href="#">
                <SearchIcon />
              </a>
            </li>
             <li>
              <a href="#">
                <NotificationsNoneIcon />
              </a>
            </li>
            <li>
              <a href="#">
                <AccountBoxIcon />
              </a>
            </li>
            <li>
              <a href="#">
                <ArrowDropDownIcon />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;