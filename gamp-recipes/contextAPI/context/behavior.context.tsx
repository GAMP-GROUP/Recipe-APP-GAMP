'use client';
import React, {
	useState,
	useContext,
	createContext,
	Dispatch,
	SetStateAction,
	ReactNode,
} from 'react';
import { TRecipesType } from '@/app/components/RecipesFeed';

type Props = {
	children: ReactNode;
};

type BehaviorProps = {
	menu: boolean;
	share: boolean;
	setShare: Dispatch<SetStateAction<boolean>>;
	setMenu: Dispatch<SetStateAction<boolean>>;
	recipeSearch: string;
	setRecipeSearch: Dispatch<SetStateAction<string>>;
	recipesType: TRecipesType,
	setRecipesType: Dispatch<SetStateAction<TRecipesType>>
};

export const BehaviorContext = createContext({
	menu: false,
	setMenu: () => {},
	recipeSearch: '',
	setRecipeSearch: () => {},
	recipesType: 'all',
	setRecipesType: () => {}
} as unknown as BehaviorProps);

export function BehaviorProvider({ children }: Props) {
	const [menu, setMenu] = useState<boolean>(false);
	const [open, setOpen] = useState<boolean>(false);
	const [share, setShare] = useState<boolean>(false);
	const [recipeSearch, setRecipeSearch] = useState<string>('');
	const [recipesType, setRecipesType] = useState<TRecipesType>('all');

	const behaviorSettings = {
		menu,
		open,
		setOpen,
		share,
		setShare,
		setMenu,
		recipeSearch,
		setRecipeSearch,
		recipesType,
		setRecipesType,
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
