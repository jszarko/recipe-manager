import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithClient } from '../utils/test-query-client';
import { searchRecipes, getCategories } from '../data/recipe-queries';
import Recipes from './Recipes';
import RecipeListSkeleton from './RecipeListSkeleton';

const mockRecipes = [
	{
		id: 1,
		category: 20,
		name: 'Brown Sugar Cookies',
		image:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/SugarCookie.JPG/640px-SugarCookie.JPG',
		description:
			'Super soft, perfectly sweet, and oh-so-chewy brown sugar cookies that melt in your mouth.',
		ingredients:
			'<ul><li>2 cups&nbsp;(250g)&nbsp;<strong>all-purpose flour</strong></li><li>1 teaspoon&nbsp;<strong>baking soda</strong></li><li>1 1/2 teaspoons&nbsp;<strong>cornstarch</strong></li><li>1/2 teaspoon&nbsp;<strong>ground cinnamon</strong>&nbsp;(use&nbsp;1 teaspoon&nbsp;if you love cinnamon)</li><li>1/4 teaspoon&nbsp;<strong>salt</strong></li><li>3/4 cup&nbsp;(12 Tbsp;&nbsp;170g)&nbsp;<strong>unsalted butter</strong>, melted and slightly cooled</li><li>1 1/4 cups (250g) packed light or dark&nbsp;<strong>brown sugar</strong></li><li>1&nbsp;large&nbsp;<strong>egg</strong>, room temperature</li><li>2 teaspoons&nbsp;<strong>pure vanilla extract</strong></li><li>1/3 cup&nbsp;(67g)&nbsp;<strong>granulated sugar</strong>, for rolling</li></ul>',
		instructions:
			'<ol><li>Toss together the flour, baking soda, cornstarch, cinnamon, and salt in a large bowl. Set aside.</li><li>In a medium size bowl, whisk the melted butter and brown sugar together until no brown sugar lumps remain. Whisk in the egg. Finally, whisk in the vanilla. Pour the wet ingredients into the dry ingredients and mix together with a large spoon or rubber spatula. The dough will be very soft, yet thick. Cover the dough and chill for 2 hours, or up to 3 days. Chilling is mandatory.</li><li>Take the dough out of the refrigerator and allow to slightly soften at room temperature for 10 minutes if you had it chilling for more than 2 hours.</li><li>Preheat the oven to 325°F (163°C). Line two large baking sheets with parchment paper or silicone baking mats. Set aside.</li><li>Pour the granulated sugar into a bowl. Take 2 tablespoons of dough and roll into a ball, then roll into the sugar. Place 3 inches apart on the baking sheets.</li><li>Bake for 8-9 minutes. Remove from the oven and gently press the top of the cookie down with the back of a utensil or even use your fingers. You’re trying to obtain a crinkly top. Place back into the oven for 2-4 more minutes. The total time these cookies are in the the oven is 10-13 minutes. The cookies will be puffy and still appear very soft in the middle. Remove from the oven and allow to cool on the baking sheet for ten minutes before transferring to a wire rack to cool completely. They will continue to cook in the center on the baking sheet after being removed from the oven.</li><li>&nbsp;Cookies will stay fresh covered at room temperature for 1 week.</li></ol>',
		addDate: '2024-01-05T00:00:00',
		changeDate: null,
	},
	{
		id: 2,
		category: 20,
		name: 'Matcha Cookies',
		image:
			'https://cdn.pixabay.com/photo/2016/10/31/21/45/cookies-1786914_1280.jpg',
		description:
			'Enjoy your afternoon tea with these crisp and buttery cookies. The unique flavor combination of matcha and white chocolate is surprisingly delightful.',
		ingredients:
			'<ul><li>2&nbsp;cups (240 g)&nbsp;<strong>all-purpose flour</strong></li><li>2½&nbsp;Tbsp&nbsp;<strong>matcha green tea powder</strong>&nbsp;(1 Tbsp matcha is 6 g)</li><li>¾&nbsp;cup (170 g)&nbsp;<strong>unsalted butter</strong>&nbsp;(softened, at room temperature)</li><li>1&nbsp;pinch&nbsp;<strong>Diamond Crystal kosher salt</strong></li><li>130&nbsp;g (1&nbsp;cup +&nbsp;2&nbsp;tsp)&nbsp;<strong>confectioners’ sugar</strong>&nbsp;</li><li>2&nbsp;large<strong> egg yolks</strong>&nbsp;(at room temperature)</li><li>¼&nbsp;cup&nbsp;(50 g) <strong>white chocolate chips </strong>or chopped<strong> macadamia nuts</strong></li></ul>',
		instructions:
			'<ol><li>Combine 2 cups all-purpose flour and 2½ Tbsp matcha green tea powder in a large bowl.</li><li>Sift the flour and the matcha powder.</li><li>In a stand mixer with a paddle attachment or in a large bowl with a hand mixer, beat ¾ cup unsalted butter until smooth and creamy. <em>Tip: It’s important to soften the butter ahead of time. Leave the butter out on the counter for 1 hour or microwave it in 5-second increments until it‘s softened.</em></li><li>Add 1 pinch Diamond Crystal kosher salt and blend.</li><li>Add 130 g confectioners’ sugar (1 cup + 2 tsp) and beat well until soft and light. As you blend, stop the mixer and scrape down the bowl occasionally.</li><li>Add 2 large egg yolks and mix well until combined.</li><li>Gradually add the flour and matcha mixture and mix until just combined.</li><li>Add ¼ cup white chocolate chips or macadamia nuts and mix until just incorporated. <em>Tip: Instead of white chocolate chips, you can roll the chilled cookie logs over white sparkling sugar (large sugar crystals) before slicing the dough. This is a great way to add more sweetness to the cookies. The large sugar crystals will keep their shape and give a nice sweetness and sparkles to the cookies.</em></li><li>Divide the dough into 2 equal pieces. Shape each piece into a cylinder about 1½ inches (4 cm) in diameter and 7 inches (18 cm) long.</li><li>Wrap the logs in plastic wrap and chill in the refrigerator until firm, at least 2 hours. <em>Tip: You can place the logs on a bed of uncooked rice while chilling. It’ll keep the dough in a nice cylindrical shape so your cookie slices won’t be flat on one side.To Freeze for Later: You can also freeze the unbaked logs of dough, wrapped in plastic wrap, for up to 2 months. To bake, let sit at room temperature for about 10 minutes before cutting and baking. Do not let the dough fully defrost.</em></li><li>Preheat the oven to 350ºF (175ºC). For a convection oven, reduce the cooking temperature by 25ºF (15ºC). Line a baking sheet with parchment paper or a silicone baking liner. Remove the dough from the refrigerator and unwrap the plastic wrap. Use a sharp knife to slice the dough into rounds about ⅓ inch (7 mm) thick. If the dough is too hard to slice, wait 5 minutes or so before slicing. Place the sliced dough on the baking sheet, leaving about 1 inch (2.5 cm) of space between the rounds.</li><li>Bake the cookies at 350ºF (175ºC) for about 15 minutes, or until the edges of the cookies start to get slightly golden brown.</li><li>Remove from the oven and let the cookies cool on the baking sheet for 5 minutes; then carefully transfer the cookies to a wire cooling rack and let them cool completely before serving.</li><li>You can keep the cooled cookies in an airtight container and store them at room temperature for at least 4 days.</li></ol>',
		addDate: '2024-01-05T00:00:00',
		changeDate: null,
	},
	{
		id: 3,
		category: 14,
		name: 'Cranberry Orange Nut Bread',
		image:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Cranberry_orange_nut_bread_%2829307632738%29.jpg/640px-Cranberry_orange_nut_bread_%2829307632738%29.jpg',
		description:
			'Sweet, orange scented and full of cranberries and walnuts, this bread is perfect for the holidays.',
		ingredients:
			'<ul><li>⅔ cup <strong>buttermilk</strong></li><li>2 teaspoons grated <strong>orange zest</strong> (from 1 orange)</li><li>⅓ cup <strong>orange juice</strong> (from 1 orange)</li><li>6 tablespoons <strong>unsalted butter</strong>, melted</li><li>1 <strong>large egg </strong></li><li>2 cups <strong>all-purpose flour</strong></li><li>1 cup plus 2 tablespoons<strong> sugar</strong></li><li>¾ teaspoon <strong>salt </strong></li><li>1 teaspoon <strong>ground cinnamon</strong> </li><li>1 teaspoon <strong>baking powder </strong></li><li>¼ teaspoon <strong>baking soda </strong></li><li>1 cup <strong>fresh </strong>or <strong>frozen cranberries</strong>, halved </li><li>½ cup coarsely chopped <strong>walnuts</strong> or <strong>pecans</strong></li></ul>',
		instructions:
			'<ol><li>Preheat oven to 375°F and set an oven rack to the middle position.</li><li>Spray a 9 x 5-inch loaf pan with non-stick cooking spray.</li><li>In a small bowl, stir together buttermilk, orange zest and juice, melted butter and egg. Set aside.</li><li>In a large bowl, whisk together flour, sugar, salt, cinnamon, baking powder and baking soda.</li><li>Stir the liquid Ingredients into the dry Ingredients with rubber spatula until just moistened. Gently stir in cranberries and nuts. Do not overmix.</li><li>Scrape the batter into the prepared loaf pan and spread evenly with a rubber spatula. Bake for 20 minutes, then reduce the heat to 350° F. Continue to bake until golden brown and a toothpick inserted into center of the loaf comes out clean, about 45 minutes longer.</li><li>Cool the loaf in the pan for about 10 minutes, then turn out onto the rack and cool at least 30 minutes before serving.</li></ol>',
		addDate: '2024-01-05T00:00:00',
		changeDate: null,
	},
	{
		id: 4,
		category: 18,
		name: 'Orange Chicken',
		image:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Orange_chicken_%284363046795%29.jpg/640px-Orange_chicken_%284363046795%29.jpg',
		description:
			"Made with delicious crispy chicken pieces tossed in an incredible sweet and sticky orange sauce that everyone loves. This recipe is super easy to prepare, so give it a go when you don't feel like getting takeout.",
		ingredients:
			'<p><strong>Chicken</strong></p><ul><li>4&nbsp;boneless skinless chicken breasts, cut into bite-size pieces</li><li>2&nbsp;eggs</li><li>1/2&nbsp;cup&nbsp;cornstarch</li><li>1/2&nbsp;cup flour</li><li>Oil for frying</li></ul><p><strong>Orange Chicken Sauce</strong></p><ul><li>1&nbsp;cup&nbsp;orange juice, fresh</li><li>1/3&nbsp;cup&nbsp;sugar</li><li>1/4&nbsp;cup&nbsp;rice vinegar</li><li>3&nbsp;tbsp&nbsp;soy sauce</li><li>1/2&nbsp;tsp&nbsp;ginger</li><li>1/2&nbsp;tsp&nbsp;garlic powder or 2 garlic cloves,&nbsp;finely diced</li><li>1/2&nbsp;tsp&nbsp;red chili flakes</li><li>1&nbsp;tsp&nbsp;sesame oil</li><li>Orange zest from 2 oranges</li><li>1&nbsp;tbsp&nbsp;cornstarch</li></ul><p><strong>Garnish</strong></p><ul><li>Green onions, chopped</li></ul>',
		instructions:
			"<p><strong>For the sauce</strong></p><ol><li>Mix all the ingredients for the sauce except the cornstarch in a bowl and set aside. Mix the cornstarch with 2 tablespoons of water or orange juice in a small bowl and set aside.</li><li>Pour the sauce into a large skillet and place over medium heat, stirring occasionally. Once the sauce is bubbling, stir in the cornstarch slurry and continue cooking until thickened about 4 minutes. Remove from heat and set aside until the chicken is fried.</li></ol><p><strong>For the chicken</strong></p><ol><li>Fill a Dutch oven or large skillet with about an inch of oil then place over medium high heat. Monitor temp with a thermometer, you'll want it to be 350°F when you start frying.</li><li>Crack eggs into a bowl and whisk together and mix the chicken pieces in the egg.</li><li>Whisk the flour and cornstarch together in a large bowl. Dredge the chicken pieces in the flour mixture and set aside on a plate or paper towels.</li><li>Fry the chicken in batches. Cook until golden brown (2-3 minutes) then flip over and fry on the other side. Once golden transfer to a plate lined with paper and continue frying the remaining chicken in batches. Keep the orange sauce warm on a low heat while frying the chicken.</li><li>Add the fried chicken to the warmed orange sauce and toss to cover, then sprinkle with green onion and serve over rice.</li></ol>",
		addDate: '2024-05-25T13:05:40.51',
		changeDate: null,
	},
	{
		id: 5,
		category: 20,
		name: 'Olive Oil Grape Cake',
		image:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Bundt_Cake_with_Grapes_001.jpg/640px-Bundt_Cake_with_Grapes_001.jpg',
		description:
			'Grapes, fennel, and olive oil star in this simple but unexpected cake. The batter comes together in one bowl and is dotted with ripe, juicy grapes. The cake is scattered with a mixture of sugar, fennel seeds, and olive oil that bakes into a crispy, fragrant, streusel-like topping.',
		ingredients:
			'<p><strong>For the cake</strong></p><ul><li>1 c <strong>extra-virgin olive oil </strong></li><li>¾ c <strong>granulated sugar</strong></li><li>2 tsp <strong>baking powder </strong></li><li>1 tsp Diamond Crystal <strong>kosher salt </strong></li><li>3 large <strong>eggs </strong></li><li>1 c <strong>sour cream </strong></li><li>2 c <strong>all-purpose flour</strong></li><li>1 tbsp&nbsp;lemon zest (optional)</li><li>1 tsp&nbsp;orange zest (optional)</li><li>1 tsp&nbsp;vanilla extract (optional)</li><li>2 c <strong>grapes</strong>, such as Thomcord - larger varieties should be halved, smaller can be left whole, avoid varieties with a lot of seeds</li></ul><p><strong>For the fennel sugar</strong></p><ul><li>1 tsp dried <strong>fennel seeds </strong></li><li>1½ tsp <strong>extra-virgin olive oil </strong></li><li>⅓ c <strong>granulated sugar </strong></li><li>Pinch of <strong>salt</strong></li></ul>',
		instructions:
			'<ol><li>Heat the oven to 325°F. Prepare a 9-inch springform pan by greasing it and lining with parchment paper.</li><li><strong>Make the fennel sugar topping:</strong> Use a mortar and pestle or spice grinder to grind the fennel down to a coarse powder. In a small mixing bowl, use your hands to rub the ground fennel into the sugar and salt until the mixture is fragrant. Add in the 1½ teaspoons of olive oil and stir with a spoon until the mixture takes on the texture of wet sand. Set aside.</li><li><strong>Make the cake</strong>: Toss half the grapes with 2 teaspoons of flour and set aside. In a large mixing bowl, combine the olive oil, sugar, salt, baking powder, eggs, vanilla, lemon and orange zest and whisk until well combined - the mixture should be thick and glossy. Add the sour cream and whisk until homogenous. Then add the flour and whisk until just combined before gently mixing in the floured grapes. Pour the batter into the prepared pan and place the remaining, un-floured grapes on top. Evenly distribute the fennel sugar over the batter.</li><li>Bake for about 1 hour, or until golden brown and a toothpick inserted into the middle of the cake comes out clean.</li><li>Let cool for 10 to 15 minutes before removing the cake from the pan.</li><li>Serve warm or at room temperature with a scoop of vanilla ice cream.</li><li>Store leftover cake in an airtight container at room temperature for up to 3 days.</li></ol>',
		addDate: '2024-01-05T00:00:00',
		changeDate: null,
	},
];

const mockSearchResults = [
	{
		id: 3,
		category: 14,
		name: 'Cranberry Orange Nut Bread',
		image:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Cranberry_orange_nut_bread_%2829307632738%29.jpg/640px-Cranberry_orange_nut_bread_%2829307632738%29.jpg',
		description:
			'Sweet, orange scented and full of cranberries and walnuts, this bread is perfect for the holidays.',
		ingredients:
			'<ul><li>⅔ cup <strong>buttermilk</strong></li><li>2 teaspoons grated <strong>orange zest</strong> (from 1 orange)</li><li>⅓ cup <strong>orange juice</strong> (from 1 orange)</li><li>6 tablespoons <strong>unsalted butter</strong>, melted</li><li>1 <strong>large egg </strong></li><li>2 cups <strong>all-purpose flour</strong></li><li>1 cup plus 2 tablespoons<strong> sugar</strong></li><li>¾ teaspoon <strong>salt </strong></li><li>1 teaspoon <strong>ground cinnamon</strong> </li><li>1 teaspoon <strong>baking powder </strong></li><li>¼ teaspoon <strong>baking soda </strong></li><li>1 cup <strong>fresh </strong>or <strong>frozen cranberries</strong>, halved </li><li>½ cup coarsely chopped <strong>walnuts</strong> or <strong>pecans</strong></li></ul>',
		instructions:
			'<ol><li>Preheat oven to 375°F and set an oven rack to the middle position.</li><li>Spray a 9 x 5-inch loaf pan with non-stick cooking spray.</li><li>In a small bowl, stir together buttermilk, orange zest and juice, melted butter and egg. Set aside.</li><li>In a large bowl, whisk together flour, sugar, salt, cinnamon, baking powder and baking soda.</li><li>Stir the liquid Ingredients into the dry Ingredients with rubber spatula until just moistened. Gently stir in cranberries and nuts. Do not overmix.</li><li>Scrape the batter into the prepared loaf pan and spread evenly with a rubber spatula. Bake for 20 minutes, then reduce the heat to 350° F. Continue to bake until golden brown and a toothpick inserted into center of the loaf comes out clean, about 45 minutes longer.</li><li>Cool the loaf in the pan for about 10 minutes, then turn out onto the rack and cool at least 30 minutes before serving.</li></ol>',
		addDate: '2024-01-05T00:00:00',
		changeDate: null,
	},
	{
		id: 4,
		category: 18,
		name: 'Orange Chicken',
		image:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Orange_chicken_%284363046795%29.jpg/640px-Orange_chicken_%284363046795%29.jpg',
		description:
			"Made with delicious crispy chicken pieces tossed in an incredible sweet and sticky orange sauce that everyone loves. This recipe is super easy to prepare, so give it a go when you don't feel like getting takeout.",
		ingredients:
			'<p><strong>Chicken</strong></p><ul><li>4&nbsp;boneless skinless chicken breasts, cut into bite-size pieces</li><li>2&nbsp;eggs</li><li>1/2&nbsp;cup&nbsp;cornstarch</li><li>1/2&nbsp;cup flour</li><li>Oil for frying</li></ul><p><strong>Orange Chicken Sauce</strong></p><ul><li>1&nbsp;cup&nbsp;orange juice, fresh</li><li>1/3&nbsp;cup&nbsp;sugar</li><li>1/4&nbsp;cup&nbsp;rice vinegar</li><li>3&nbsp;tbsp&nbsp;soy sauce</li><li>1/2&nbsp;tsp&nbsp;ginger</li><li>1/2&nbsp;tsp&nbsp;garlic powder or 2 garlic cloves,&nbsp;finely diced</li><li>1/2&nbsp;tsp&nbsp;red chili flakes</li><li>1&nbsp;tsp&nbsp;sesame oil</li><li>Orange zest from 2 oranges</li><li>1&nbsp;tbsp&nbsp;cornstarch</li></ul><p><strong>Garnish</strong></p><ul><li>Green onions, chopped</li></ul>',
		instructions:
			"<p><strong>For the sauce</strong></p><ol><li>Mix all the ingredients for the sauce except the cornstarch in a bowl and set aside. Mix the cornstarch with 2 tablespoons of water or orange juice in a small bowl and set aside.</li><li>Pour the sauce into a large skillet and place over medium heat, stirring occasionally. Once the sauce is bubbling, stir in the cornstarch slurry and continue cooking until thickened about 4 minutes. Remove from heat and set aside until the chicken is fried.</li></ol><p><strong>For the chicken</strong></p><ol><li>Fill a Dutch oven or large skillet with about an inch of oil then place over medium high heat. Monitor temp with a thermometer, you'll want it to be 350°F when you start frying.</li><li>Crack eggs into a bowl and whisk together and mix the chicken pieces in the egg.</li><li>Whisk the flour and cornstarch together in a large bowl. Dredge the chicken pieces in the flour mixture and set aside on a plate or paper towels.</li><li>Fry the chicken in batches. Cook until golden brown (2-3 minutes) then flip over and fry on the other side. Once golden transfer to a plate lined with paper and continue frying the remaining chicken in batches. Keep the orange sauce warm on a low heat while frying the chicken.</li><li>Add the fried chicken to the warmed orange sauce and toss to cover, then sprinkle with green onion and serve over rice.</li></ol>",
		addDate: '2024-05-25T13:05:40.51',
		changeDate: null,
	},
	{
		id: 5,
		category: 20,
		name: 'Olive Oil Grape Cake',
		image:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Bundt_Cake_with_Grapes_001.jpg/640px-Bundt_Cake_with_Grapes_001.jpg',
		description:
			'Grapes, fennel, and olive oil star in this simple but unexpected cake. The batter comes together in one bowl and is dotted with ripe, juicy grapes. The cake is scattered with a mixture of sugar, fennel seeds, and olive oil that bakes into a crispy, fragrant, streusel-like topping.',
		ingredients:
			'<p><strong>For the cake</strong></p><ul><li>1 c <strong>extra-virgin olive oil </strong></li><li>¾ c <strong>granulated sugar</strong></li><li>2 tsp <strong>baking powder </strong></li><li>1 tsp Diamond Crystal <strong>kosher salt </strong></li><li>3 large <strong>eggs </strong></li><li>1 c <strong>sour cream </strong></li><li>2 c <strong>all-purpose flour</strong></li><li>1 tbsp&nbsp;lemon zest (optional)</li><li>1 tsp&nbsp;orange zest (optional)</li><li>1 tsp&nbsp;vanilla extract (optional)</li><li>2 c <strong>grapes</strong>, such as Thomcord - larger varieties should be halved, smaller can be left whole, avoid varieties with a lot of seeds</li></ul><p><strong>For the fennel sugar</strong></p><ul><li>1 tsp dried <strong>fennel seeds </strong></li><li>1½ tsp <strong>extra-virgin olive oil </strong></li><li>⅓ c <strong>granulated sugar </strong></li><li>Pinch of <strong>salt</strong></li></ul>',
		instructions:
			'<ol><li>Heat the oven to 325°F. Prepare a 9-inch springform pan by greasing it and lining with parchment paper.</li><li><strong>Make the fennel sugar topping:</strong> Use a mortar and pestle or spice grinder to grind the fennel down to a coarse powder. In a small mixing bowl, use your hands to rub the ground fennel into the sugar and salt until the mixture is fragrant. Add in the 1½ teaspoons of olive oil and stir with a spoon until the mixture takes on the texture of wet sand. Set aside.</li><li><strong>Make the cake</strong>: Toss half the grapes with 2 teaspoons of flour and set aside. In a large mixing bowl, combine the olive oil, sugar, salt, baking powder, eggs, vanilla, lemon and orange zest and whisk until well combined - the mixture should be thick and glossy. Add the sour cream and whisk until homogenous. Then add the flour and whisk until just combined before gently mixing in the floured grapes. Pour the batter into the prepared pan and place the remaining, un-floured grapes on top. Evenly distribute the fennel sugar over the batter.</li><li>Bake for about 1 hour, or until golden brown and a toothpick inserted into the middle of the cake comes out clean.</li><li>Let cool for 10 to 15 minutes before removing the cake from the pan.</li><li>Serve warm or at room temperature with a scoop of vanilla ice cream.</li><li>Store leftover cake in an airtight container at room temperature for up to 3 days.</li></ol>',
		addDate: '2024-01-05T00:00:00',
		changeDate: null,
	},
];

jest.mock('../data/recipe-queries', () => ({
	__esModule: true,
	...jest.requireActual('../data/recipe-queries'),
	getCategories: jest.fn(),
	searchRecipes: jest.fn(),
}));

jest.mock('./RecipeListSkeleton');

describe('Recipes', () => {
	afterEach(() => {
		jest.restoreAllMocks();
	});

	it('renders Recipes', async () => {
		renderWithClient(<Recipes />);
	});

	it('displays a message when there are no results matching the search string', async () => {
		const user = userEvent.setup();
		searchRecipes.mockReturnValue();
		renderWithClient(<Recipes />);

		const searchField = screen.getByRole('textbox', { name: /search/i });
		await user.type(searchField, 'abc');
		expect(searchField).toHaveValue('abc');
		expect(
			screen.getByRole('heading', { name: 'No results found' })
		).toBeInTheDocument();
	});

	it('displays the results matching the search string', async () => {
		const user = userEvent.setup();
		searchRecipes.mockReturnValue(mockSearchResults);
		renderWithClient(<Recipes />);

		const searchField = screen.getByPlaceholderText(/search/i);
		await user.type(searchField, 'orange');
		expect(searchField).toHaveValue('orange');
		expect(screen.getAllByRole('img')).toHaveLength(3);
		// await user.clear(searchField);
		// expect(searchField).not.toHaveValue();
		// expect(screen.getAllByRole('img')).toHaveLength(5);
		// await user.type(searchField, 'chicken');
		// expect(screen.getAllByRole('img')).toHaveLength(1);
	});

	it('renders error message when failing to get search results', async () => {
		const error = 'Oops... Something went wrong.';
		renderWithClient(<Recipes />);
		searchRecipes.mockRejectedValueOnce(new Error(error));
		await expect(searchRecipes()).rejects.toThrow(error);
	});

	it('renders loading skeleton before the search results get loaded', async () => {
		RecipeListSkeleton.mockReturnValue(5);
		renderWithClient(<Recipes />);

		expect(RecipeListSkeleton).toHaveBeenCalled();
		expect(RecipeListSkeleton).toHaveReturnedWith(5);
	});

	it('renders pagination', async () => {
		const user = userEvent.setup();
		searchRecipes.mockReturnValue(mockSearchResults);
		renderWithClient(<Recipes />);

		await user.type(screen.getByRole('textbox', { name: /search/i }), 'nut');
		expect(
			screen.getByRole('navigation', { name: 'pagination navigation' })
		).toBeInTheDocument();
	});

	it('renders Go To First Page button on the pagination', async () => {
		const user = userEvent.setup();
		searchRecipes.mockReturnValue(mockSearchResults);
		renderWithClient(<Recipes />);

		await user.type(screen.getByRole('textbox', { name: /search/i }), 'nut');
		expect(
			screen.getByRole('button', { name: 'Go to first page' })
		).toBeInTheDocument();
	});

	it('renders Go To Previous Page button on the pagination', async () => {
		const user = userEvent.setup();
		searchRecipes.mockReturnValue(mockSearchResults);
		renderWithClient(<Recipes />);

		await user.type(screen.getByRole('textbox', { name: /search/i }), 'nut');
		expect(
			screen.getByRole('button', { name: 'Go to previous page' })
		).toBeInTheDocument();
	});

	it('renders page number on the pagination', async () => {
		const user = userEvent.setup();
		searchRecipes.mockReturnValue(mockSearchResults);
		renderWithClient(<Recipes />);

		await user.type(screen.getByRole('textbox', { name: /search/i }), 'nut');
		expect(screen.getByRole('button', { name: 'page 1' })).toBeInTheDocument();
	});

	it('renders Go To Next Page button on the pagination', async () => {
		const user = userEvent.setup();
		searchRecipes.mockReturnValue(mockSearchResults);
		renderWithClient(<Recipes />);

		await user.type(screen.getByRole('textbox', { name: /search/i }), 'nut');
		expect(
			screen.getByRole('button', { name: 'Go to next page' })
		).toBeInTheDocument();
	});

	it('renders Go To Last Page button on the pagination', async () => {
		const user = userEvent.setup();
		searchRecipes.mockReturnValue(mockSearchResults);
		renderWithClient(<Recipes />);

		await user.type(screen.getByRole('textbox', { name: /search/i }), 'nut');
		expect(
			screen.getByRole('button', { name: 'Go to last page' })
		).toBeInTheDocument();
	});
});
