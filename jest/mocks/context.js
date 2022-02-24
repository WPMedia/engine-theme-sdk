/* eslint-disable @typescript-eslint/explicit-function-return-type */
export default {
	useComponentContext: jest.fn(),
	useAppContext: jest.fn(),
	useFusionContext: jest.fn(),
	FusionContext: jest.fn(
		(component) => (props) =>
			component({
				deployment: (url) => url,
				...props,
			})
	),
};
