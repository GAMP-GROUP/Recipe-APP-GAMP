import React from 'react';

type TMenuIconProps = {
	menu: boolean,
	toggleMenu: (menu: boolean) => void,
	hidden: (screenWidth: number) => boolean,
}

export default function MenuIcon({ menu, toggleMenu, hidden }: TMenuIconProps) {
	const screenWidth = window.innerWidth;

	return (
		<div hidden={ hidden(screenWidth) }>
			<label htmlFor='menu-icon' className={`menu-icon transition-transform duration-300 ${ menu === true ? 'translate-x-[0.1rem]' : '' }` }>
				<input type="checkbox" name='menu-icon' id='menu-icon' onClick={ () => toggleMenu(menu) } />
			</label>
		</div>
	);
}
