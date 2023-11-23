'use client';
import React from 'react';

import {
	useState,
	useContext,
	createContext,
	Dispatch,
	SetStateAction,
	ReactNode,
} from 'react';

type Props = {
	children: ReactNode;
};

type BehaviorProps = {
	menu: boolean;
	share: boolean;
	setShare: Dispatch<SetStateAction<boolean>>;
	setMenu: Dispatch<SetStateAction<boolean>>;
	searchBar: boolean;
	setSearchBar: Dispatch<SetStateAction<boolean>>;
	recipeSearch: string;
	setRecipeSearch: Dispatch<SetStateAction<string>>;
};

export const BehaviorContext = createContext({
	menu: false,
	setMenu: () => {},
	searchBar: false,
	setSearchBar: () => {},
	recipeSearch: '',
	setRecipeSearch: () => {},
} as BehaviorProps);

export function BehaviorProvider({ children }: Props) {
	const [menu, setMenu] = useState(false);
	setMenu: () => { },
	searchBar: false,
	setSearchBar: () => { },
	recipeSearch: '',
	setRecipeSearch: () => { },
} as unknown as BehaviorProps);

export function BehaviorProvider({ children }: Props) {
	const [menu, setMenu] = useState(false);
	const [open, setOpen] = useState(false);
	const [share, setShare] = useState(false);
	const [searchBar, setSearchBar] = useState(false);
	const [recipeSearch, setRecipeSearch] = useState('');

	const behaviorSettings = {
		menu,
		open,
		setOpen,
		share,
		setShare,
		setMenu,
		searchBar,
		setSearchBar,
		recipeSearch,
		setRecipeSearch,
	};

	return (
		<BehaviorContext.Provider value={behaviorSettings}>
			{children}
		</BehaviorContext.Provider>
	);
}

export function useBehaviorContext() {
	return useContext(BehaviorContext);
}
