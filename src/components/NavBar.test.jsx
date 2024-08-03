import { render, screen } from '@testing-library/react';
import NavBar from './NavBar';
import NavMenu from './NavMenu';
import NestedNavItems from './NestedNavItems';
import SingleLevelNavItems from './SingleLevelNavItems';

jest.mock('./NavMenu', () => () => <div data-testid="NavMenu" />);

jest.mock('./NestedNavItems', () => () => <div data-testid="NestedNavItems" />);

jest.mock('./SingleLevelNavItems', () => () => (
	<div data-testid="SingleLevelNavItems" />
));

describe('NavBar', () => {
	afterEach(() => {
		jest.restoreAllMocks();
	});

	it('renders NavBar', async () => {
		render(<NavBar />);
		expect(screen.getByRole('banner')).toBeInTheDocument();
	});

	it('renders NavMenu component', async () => {
		render(<NavBar />);

		expect(screen.getByTestId('NavMenu')).toBeInTheDocument();
		expect(
			screen.queryByRole('button', { name: /menu/i })
		).not.toBeInTheDocument();
		expect(screen.queryByTestId('MenuIcon')).not.toBeInTheDocument();
	});

	it('renders logo', async () => {
		render(<NavBar />);
		expect(screen.getByTestId('AnimationIcon')).toBeInTheDocument();
	});

	it('renders site name with a link to Home page', async () => {
		render(<NavBar />);
		const siteName = screen.getByRole('link', { name: /recipe manager/i });
		expect(siteName).toBeInTheDocument();
		expect(siteName).toHaveAttribute('href', '/');
	});

	it('renders NestedNavItems component', async () => {
		render(<NavBar />);

		expect(screen.getAllByTestId('NestedNavItems')[0]).toBeInTheDocument();
		expect(
			screen.queryByRole('button', { name: /recipes/i })
		).not.toBeInTheDocument();
	});

	it('renders SingleLevelNavItems component', async () => {
		render(<NavBar />);

		expect(screen.getAllByTestId('SingleLevelNavItems')[0]).toBeInTheDocument();
		expect(
			screen.queryByRole('button', { name: /add recipe/i })
		).not.toBeInTheDocument();
	});
});
