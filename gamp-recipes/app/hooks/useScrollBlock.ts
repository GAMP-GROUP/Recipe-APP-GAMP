// Fonte: https://gist.github.com/reecelucas/2f510e6b8504008deaaa52732202d2da
const useScrollBlock = () => {
	const blockScroll = () => {
		if (typeof document === 'undefined') return;

		const html = document.documentElement;
		const { body } = document;

		if (!body || !body.style) return;

		html.style.overflowY = 'hidden';
		body.style.overflowY = 'hidden';
	};

	const allowScroll = () => {
		if (typeof document === 'undefined') return;

		const html = document.documentElement;
		const { body } = document;

		if (!body || !body.style ) return;

		html.style.overflowY = '';
		body.style.overflowY = '';
	};

	return [blockScroll, allowScroll];
};

export { useScrollBlock };
