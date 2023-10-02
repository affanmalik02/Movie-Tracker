import React from 'react';
import './Header.css';
//import logoUrl from '../../assets/logo.svg';
import logoUrl from '../../assets/logo.svg';

const Header = () => (
	
	<div className="header">
		<img src={logoUrl} alt="Movie Tracker" />
	</div>
)

export default Header;