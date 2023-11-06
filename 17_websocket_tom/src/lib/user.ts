//...

export const getUser = () => {
	const userId = sessionStorage.getItem("userId");
	const userName = sessionStorage.getItem("userName");
	return {
		userId,
		userName,
	};
};

export const generateUserId = () => {
	return 999;
};

export const setUser = () => {
	return 999;
};

//...
