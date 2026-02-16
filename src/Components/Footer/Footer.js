import React from 'react';
import './footer.css';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Footer = () => {
  return (
    <div className="footer_data">
      {/* Social Media Icons Section */}
      <div className="social_media">
        <ul className="social_icons">
          <li><FacebookIcon /></li>
          <li><InstagramIcon /></li>
          <li><YouTubeIcon /></li>
        </ul>
      </div>

      <div>
        <ul>
          <li>Audio Description</li>
          <li>Investor Relations</li>
          <li>Legal Notice</li>
        </ul>
      </div>
      <ul>
        <li>Help Center</li>
        <li>Jobs</li>
        <li>Cookie Preferences</li>
      </ul>
      <hr />
      <div>
        <ul>
          <li>Gift Cards</li>
          <li>Terms of Use</li>
          <li>Corporate Information</li>
        </ul>
      </div>
      <div>
        <ul>
          <li>Media Center</li>
          <li>Privacy</li>
          <li>Contact Us</li>
        </ul>
      </div>
      <div className="service_code">
        <p>Service Code</p>
      </div>
      <div className="copy-write">
        <p>&copy; 1997-2024 Netflix, Inc.</p>
      </div>
    </div>
  );
};

export default Footer;