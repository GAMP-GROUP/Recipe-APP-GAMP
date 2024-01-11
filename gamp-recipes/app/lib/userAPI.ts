export const getUser = async () => {
	const user = fetch('http://localhost:3000/api/author', {
		cache: 'no-cache',
		method: 'GET',

	}).then((res) => {
		return res.json();
	});

	return user;
};