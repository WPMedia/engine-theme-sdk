/**
 * Placeholder for future translate functionality
 */
export function translate(str, replaceStrings = null): string {
	if (!str) {
		return "";
	}

	let translated = str;
	if (replaceStrings) {
		Object.keys(replaceStrings).forEach((placeholder) => {
			translated = translated.replace(placeholder, replaceStrings[placeholder]);
		});
	}

	return translated;
}

export function getWindowWidth(): number {
	return typeof window !== "undefined" ? window.innerWidth : 0;
}

export function getWindowHeight(): number {
	return typeof window !== "undefined" ? window.innerHeight : 0;
}

// Get the highest window context that isn't cross-origin
// (When in an iframe)
export function getHighestSafeWindowContext(self: Window = window.self): Window {
	// If we reached the top level, return self
	if (self === window.top) {
		return self;
	}

	const getOrigin = (href: string): string => href.match(/(.*\/\/.*?)(\/|$)/)[1];

	// If parent is the same origin, we can move up one context
	// Reference: https://stackoverflow.com/a/21965342/1601953
	if (getOrigin(self.location.href) === getOrigin(self.document.referrer)) {
		return getHighestSafeWindowContext(self.parent);
	}

	// If a different origin, we consider the current level
	// as the top reachable one
	return self;
}
