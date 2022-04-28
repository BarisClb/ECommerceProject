// GET

const getHelper = async (entityName, entityId) => {
	let url = `https://localhost:7000/api/${entityName}/`;
	if (entityId) {
		url += `${entityId}`;
	}

	try {
		let response = await fetch(url);
		let result = await response.json();
		if (result.success) {
			return result.data;
		} else {
			return entityId ? {} : [];
		}
	} catch (error) {
		console.log(error);
		return entityId ? {} : [];
	}
};

// GET *ENTITIES* BY *ENTITY*

const getByEntityHelper = async (
	manyEntityName,
	singleEntityName,
	singleEntityId
) => {
	let url = `https://localhost:7000/api/${manyEntityName}/By${singleEntityName}/${singleEntityId}`;

	try {
		let response = await fetch(url);
		let result = await response.json();
		if (result.success) {
			return result.data;
		} else {
			return [];
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
	getByEntityHelper,
	createHelper,
	updateHelper,
	deleteHelper,
};
