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
export const commonAction = {
	clearError,
	asyncStarted,
	asyncEnd,
};
