import React from 'react';
import type { Page } from './App';

interface NavbarProps {
  activePage: Page;
  onNavClick: (page: Page) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activePage, onNavClick }) => {
  const pages: Page[] = ['Home', 'About', 'Services', 'Portfolio', 'Contact'];
  return (
    <nav>
      {pages.map(page => <button key={page} onClick={() => onNavClick(page)}>{page}</button>)}
    </nav>
  );
};

export default Navbar;