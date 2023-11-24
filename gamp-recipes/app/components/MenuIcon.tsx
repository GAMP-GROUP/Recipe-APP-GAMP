
import React from 'react';
import { toggleMenu } from './UserMenu';
import { useBehaviorContext } from '@/contextAPI/context/behavior.context';

export default function MenuIcon() {
	const { menu, setMenu } = useBehaviorContext();

	return (
		<>
			<label htmlFor='menu-icon' className={`menu-icon opacity-60 transition-transform duration-300 ${ menu === true ? 'translate-x-1' : '' }`}>
				<input type="checkbox" name='menu-icon' id='menu-icon' onClick={ () => toggleMenu(menu, setMenu)}/>
			</label>
		</>
	);
}