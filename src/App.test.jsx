import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./components/NavBar', () => () => <div data-testid="NavBar" />);
jest.mock('./components/Footer', () => () => <div data-testid="Footer" />);
jest.mock('./components/Home', () => () => <div data-testid="Home" />);

describe('App', () => {
	it('renders app', async () => {
		render(<App />);
		expect(true).toBe(true);
	});

	it('renders NavBar', async () => {
		render(<App />);
		expect(screen.getByTestId('NavBar')).toBeInTheDocument();
	});

	it('renders Footer', async () => {
		render(<App />);
		expect(screen.getByTestId('Footer')).toBeInTheDocument();
	});

	it('renders Home page on default route', async () => {
		render(<App />);
		expect(screen.getByTestId('Home')).toBeInTheDocument();
	});
});
