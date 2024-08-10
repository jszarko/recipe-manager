import { render, screen } from '@testing-library/react';
import FormattedRecipeSection from './FormattedRecipeSection';

describe('FormattedRecipeSection', () => {
	it('renders FormattedRecipeSection', () => {
		render(
			<FormattedRecipeSection
				title="Test Title"
				bodyHtml="<p><strong>Html body test</strong></p>"
			/>
		);

		expect(
			screen.getByRole('heading', { name: 'Test Title' })
		).toBeInTheDocument();
		expect(screen.getByText('Html body test')).toBeInTheDocument();
	});
});
