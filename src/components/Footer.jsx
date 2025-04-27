import React from 'react';
import '../styles/footer.css'

function Footer() {
  return (
    <div className="footer" style={footerStyle}>
      <p>&copy; 2025 BCABro. All rights reserved.</p>
      <p>Made with ❤️ by Avdhesh Kumar</p>
    </div>
  );
}

// Inline styling for simplicity
const footerStyle = {
  backgroundColor: '#1E1E1E',
  color: '#fff',
  padding: '5px 0',
  textAlign: 'center',
//   position: 'fixed',
  left: '0',
  bottom: '0',
  width: '100%',
  
};

export default Footer;
