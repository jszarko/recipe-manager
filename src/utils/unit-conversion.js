export const convertToCelsius = fahrenheit => {
	const celsius = (fahrenheit - 32) * (5 / 9);
	return Math.round(celsius * 10) / 10;
};

export const convertToFahrenheit = celsius => {
	return celsius * (9 / 5) + 32;
};

// ingredients in grams per cup
export const ingredientsInGrams = [
	192, // baking powder
	288, // baking soda
	227, // butter
	227, // buttermilk/yogurt
	156, // cornmeal
	120, // flour, all-purpose
	96, // flour, almond
	120, // flour, bread
	120, // flour, cake
	93, // flour, corn (Masa Harina)
	163, // flour, semolina
	113, // flour, whole-wheat
	336, // honey
	312, // maple syrup
	227, // milk/water
	200, // oil, olive
	198, // oil, vegetable
	128, // salt (Kosher, Diamond Crystal)
	256, // salt (Kosher, Morton's)
	288, // salt (table)
	113, // sugar, confectioners'
	213, // sugar, brown (packed)
	198, // sugar, granulated white
	180, // sugar, Turbinado (raw)
	224, // vanilla extract
	144, // yeast (instant)
];
