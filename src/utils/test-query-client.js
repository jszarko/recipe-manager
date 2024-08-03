import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';

const createTestQueryClient = () =>
	new QueryClient({
		defaultOptions: {
			queries: {
				// turns reties off
				retry: false,
			},
			logger: {
				log: console.log,
				warn: console.warn,
				error: () => {},
			},
		},
	});

export const renderWithClient = ui => {
	const testQueryClient = createTestQueryClient();
	const { rerender, ...result } = render(
		<QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>
	);
	return {
		...result,
		rerender: rerenderUi =>
			rerender(
				<QueryClientProvider client={testQueryClient}>
					{rerenderUi}
				</QueryClientProvider>
			),
	};
};
