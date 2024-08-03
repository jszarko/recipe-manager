module.exports = {
	moduleNameMapper: {
		// The root of your source code, typically /src
		// `<rootDir>` is a token Jest substitutes
		'\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|img|woff|woff2|mp4|webm|wav|mp3|aac|oga|avif)$':
			'<rootDir>/__mocks__/fileMock.js',
		'\\.(css|less)$': '<rootDir>/__mocks__/fileMock.js',
	},
	testEnvironment: 'jsdom',
	setupFilesAfterEnv: ['./src/setupTests.js'],
};
