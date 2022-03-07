export interface ImageAttribution {
	name?: string;
}

export interface CreditOptions {
	displayTitle?: boolean;
	displayCaption?: boolean;
	displayCredits?: boolean;
}

export interface Credits {
	by?: ImageAttribution[];
	affiliation?: ImageAttribution[];
}

export interface CreditData {
	subtitle?: string;
	caption?: string;
	credits?: Credits;
}
