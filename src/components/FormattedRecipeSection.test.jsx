import { render, screen } from '@testing-library/react';
import FormattedRecipeSection from './FormattedRecipeSection';

describe('FormattedRecipeSection', () => {
	it('renders FormattedRecipeSection', () => {
		render(<FormattedRecipeSection title="Test Title" />);

		expect(
			screen.getByRole('heading', { name: 'Test Title' })
		).toBeInTheDocument();
	});
});
