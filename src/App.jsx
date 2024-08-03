import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Recipes from './components/Recipes';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import RecipeDetails from './components/RecipeDetails';
import AddRecipe from './components/AddRecipe';
import EditRecipe from './components/EditRecipe';
import ShoppingList from './components/ShoppingList';
import ConversionCalculator from './components/ConversionCalculator';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ThemeProvider } from '@mui/material';
import { recipeTheme } from './theme/themes';

// create a client
const queryClient = new QueryClient();

function App() {
	return (
		<Router>
			<ThemeProvider theme={recipeTheme}>
				<QueryClientProvider client={queryClient}>
					<NavBar />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/recipes" element={<Recipes />} />
						<Route path="/recipes/category/:categoryId" element={<Recipes />} />
						<Route path="/recipes/:id" element={<RecipeDetails />} />
						<Route path="/recipes/add" element={<AddRecipe />} />
						<Route path="/recipes/edit/:id" element={<EditRecipe />} />
						<Route path="/shoppinglist" element={<ShoppingList />} />
						<Route path="/convert" element={<ConversionCalculator />} />
					</Routes>
					<Footer />
					<ReactQueryDevtools initialIsOpen={false} />
				</QueryClientProvider>
			</ThemeProvider>
		</Router>
	);
}

export default App;
