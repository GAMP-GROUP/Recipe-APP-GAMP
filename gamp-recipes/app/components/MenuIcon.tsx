import React from 'react';

type TMenuIconProps = {
	menu: boolean,
	toggleMenu: (menu: boolean) => void,
}

export default function MenuIcon({ menu, toggleMenu }: TMenuIconProps) {
	return (
		<label htmlFor='menu-icon' className={`menu-icon transition-transform duration-300 ${ menu === true ? 'translate-x-[0.1rem]' : '' }`}>
			<input type="checkbox" name='menu-icon' id='menu-icon' onClick={ () => toggleMenu(menu) } />
		</label>
	);
}
