import { commonTypes } from "../types";

const clearError = () => {
	return {
		type: commonTypes.ClearError,
	};
};
const asyncStarted = () => {
	return {
		type: commonTypes.AsyncStarted,
	};
};
const asyncEnd = () => {
	return {
		type: commonTypes.AsyncEnd,
	};
};
const toggleDarkMode = (darkMode) => {
	return {
		type: commonTypes.DarkMode,
		payload: darkMode,
	};
};
export const commonAction = {
	clearError,
	asyncStarted,
	asyncEnd,
	toggleDarkMode,
};
