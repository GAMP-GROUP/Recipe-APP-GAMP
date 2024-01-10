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
	menu: boolean,
	share: boolean,
	setShare: Dispatch<SetStateAction<boolean>>,
	setMenu: Dispatch<SetStateAction<boolean>>,
	recipeSearch: string,
	setRecipeSearch: Dispatch<SetStateAction<string>>,
	recipesType: TRecipesType,
	setRecipesType: Dispatch<SetStateAction<TRecipesType>>,
	currentSlide: number,
	setCurrentSlide: Dispatch<SetStateAction<number>>,
};

export const BehaviorContext = createContext({
	menu: false,
	share: false,
	setShare: () => {},
	setMenu: () => {},
	recipeSearch: '',
	setRecipeSearch: () => {},
	recipesType: 'all',
	setRecipesType: () => {},
	currentSlide: 0,
	setCurrentSlide: () => {},
} as BehaviorProps);

export function BehaviorProvider({ children }: Props) {
	const [menu, setMenu] = useState<boolean>(false);
	const [open, setOpen] = useState<boolean>(false);
	const [share, setShare] = useState<boolean>(false);
	const [recipeSearch, setRecipeSearch] = useState<string>('');
	const [recipesType, setRecipesType] = useState<TRecipesType>('all');
	const [currentSlide, setCurrentSlide] = useState<number>(0);

	const behaviorSettings = {
		menu,
		setMenu,
		open,
		setOpen,
		share,
		setShare,
		recipeSearch,
		setRecipeSearch,
		recipesType,
		setRecipesType,
		currentSlide,
		setCurrentSlide,
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
