import { Component } from "react";

interface ErrorBoundaryProps {
	fallback: React.ReactElement;
	children: React.ReactElement;
}

interface ErrorBoundaryState {
	hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props) {
		super(props);
		this.state = {
			hasError: false,
		};
	}

	static getDerivedStateFromError(): ErrorBoundaryState {
		return {
			hasError: true,
		};
	}

	render(): React.ReactNode {
		const { hasError } = this.state;
		const { fallback, children } = this.props;

		if (hasError) {
			return fallback;
		}
		return children;
	}
}

export default ErrorBoundary;
