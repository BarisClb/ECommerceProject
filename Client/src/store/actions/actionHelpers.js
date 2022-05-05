// GET

const getHelper = async (entityName, entityId) => {
	let url = `https://localhost:7000/api/${entityName}/`;
	if (entityId) {
		url += `${entityId}`;
	}

	try {
		let response = await fetch(url);
		let responseJson = await response.json();

		if (responseJson.success) {
			return responseJson;
		} else {
			return entityId ? { success: false, data: {} } : { success: false, data: [] };
		}
	} catch (error) {
		console.log(error);
		return entityId ? { success: false, data: {} } : { success: false, data: [] };
	}
};

// GET SORTED

const getSortedHelper = async (entityName, listSorting) => {
	let url = `https://localhost:7000/api/${entityName}`;

	// // If no sorting applied, no need for question mark.
	// for (let i = 0; i < listSorting.length; i++) {
	// 	if (listSorting[i] !== null) {
	// 		url += `?`;
	// 		break
	// 	}
	// }

	// Always including 'reverse?' so I don't have to make a for loop like above, for adding question mark.
	// I am also giving it a default 'false' value so I don't get an error.
	url += `?Reverse=${listSorting.reversed ? listSorting.reversed : false}`;

	// SearchWord
	if (listSorting.searchWord !== null && listSorting.searchWord.trim() !== "") {
		url += `&SearchWord=${listSorting.searchWord.trim()}`;
	}

	// PageNumber
	if (listSorting.pageNumber !== undefined && listSorting.pageNumber !== null) {
		url += `&PageNumber=${listSorting.pageNumber}`;
	}

	// PageSize
	if (listSorting.pageNumber !== undefined && listSorting.pageNumber !== null) {
		url += `&PageSize=${listSorting.pageSize}`;
	}

	// OrderBy
	if (listSorting.orderBy !== undefined && listSorting.orderBy !== null) {
		url += `&OrderBy=${listSorting.orderBy}`;
	}

	try {
		let response = await fetch(url);
		let responseJson = await response.json();
		if (responseJson.success) {
			return responseJson;
		} else {
			return { success: false, data: [] };
		}
	} catch (error) {
		console.log(error);
		return { success: false, data: [] };
	}
};

// GET *ENTITIES* BY *ENTITY*

const getByEntityHelper = async (manyEntityName, singleEntityName, singleEntityId) => {
	let url = `https://localhost:7000/api/${manyEntityName}/By${singleEntityName}/${singleEntityId}`;

	try {
		let response = await fetch(url);
		let responseJson = await response.json();
		if (responseJson.success) {
			return responseJson;
		} else {
			return { success: false, data: [] };
		}
	} catch (error) {
		console.log(error);
	}
};

// CREATE

const createHelper = async (entityName, newEntity) => {
	let url = `https://localhost:7000/api/${entityName}/`;

	try {
		let response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				...newEntity,
			}),
		});
		return await response.json();
	} catch (error) {
		console.log(error);
	}
};

// UPDATE

const updateHelper = async (entityName, entityId, updatedEntity) => {
	let url = `https://localhost:7000/api/${entityName}`;

	try {
		let response = await fetch(url, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				id: entityId,
				...updatedEntity,
			}),
		});
		return await response.json();
	} catch (error) {
		console.log(error);
	}
};

// DELETE

const deleteHelper = async (entityName, entityId) => {
	let url = `https://localhost:7000/api/${entityName}/${entityId}`;

	try {
		let response = await fetch(url, {
			method: "DELETE",
		});
		return await response.json();
	} catch (error) {
		console.log(error);
	}
};

export const actionHelpers = {
	getHelper,
	getSortedHelper,
	getByEntityHelper,
	createHelper,
	updateHelper,
	deleteHelper,
};
