import axios from 'axios';

// create a custom instance of Axios to be reused across multiple API calls
const api = axios.create({
	baseURL: `${process.env.REACT_APP_RECIPEAPI_URL}`,
});

export const getRecipes = async () => (await api.get(`/Recipe`)).data;

export const getRecipe = async id => (await api.get(`/Recipe/${id}`)).data;

export const getLatestRecipes = async count =>
	(
		await api.get(`/Recipe/latest`, {
			params: {
				count: count,
			},
		})
	).data;

export const getRecipesByCategory = async categoryId =>
	(
		await api.get(`/Recipe/category`, {
			params: {
				category: categoryId,
			},
		})
	).data;

export const addRecipe = async newRecipe =>
	(await api.post(`/Recipe`, newRecipe)).data;

export const updateRecipe = async updatedRecipe =>
	(await api.put(`/Recipe/${updatedRecipe.id}`, updatedRecipe)).data;

export const getCategories = async () => (await api.get(`/Categories`)).data;

export const getCategory = async id =>
	(await api.get(`/Categories/${id}`)).data;

export const searchRecipes = async (
	searchString,
	categoryId,
	pageNumber,
	recordsPerPage
) =>
	(
		await api.post(
			`/Recipe/search`,
			JSON.stringify({
				searchString: searchString,
				categoryId: categoryId,
				pageNumber: pageNumber,
				recordsPerPage: recordsPerPage,
			}),
			{
				headers: {
					'Content-Type': 'application/json-patch+json',
				},
			}
		)
	).data;
