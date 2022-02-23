import { resizerKey as RESIZER_SECRET_KEY } from "fusion:environment";

export const getImgURL = (metaValue, metaType = "og:image", globalContent, resizerURL): string => {
	const buildURL = (_url): string | null => {
		if (typeof window === "undefined") {
			// eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
			const Thumbor = require("thumbor-lite");
			const thumbor = new Thumbor(RESIZER_SECRET_KEY, resizerURL);
			const imgSrc = _url
				.replace(/^http[s]?:\/\//, "")
				.replace(" ", "%20")
				.replace("?", "%3F");
			/*
        We need the focal point out of the resize options to use as a filter
        for the thumbor image being used here

        We'll just pull all the filters in case there are additional
        restraints we want to inact

        Grab the first resize option available because they all seem to have
        the same filters
      */
			const resizedImageOptions =
				globalContent?.promo_items?.basic?.resized_params ||
				globalContent?.promo_items?.lead_art?.resized_params ||
				{};
			const firstResizeOption = String(Object.values(resizedImageOptions)[0] || "");
			const [, resizeFilters] = firstResizeOption.match(/filters:(.*?)\//i) || [];
			if (resizeFilters) {
				return thumbor.setImagePath(imgSrc).resize(1200, 630).filter(resizeFilters).buildUrl();
			}

			return thumbor.setImagePath(imgSrc).resize(1200, 630).buildUrl();
		}
		return null;
	};

	if (metaValue(metaType)) {
		return buildURL(metaValue(metaType));
	}

	if (globalContent?.promo_items?.basic?.url) {
		return buildURL(globalContent.promo_items.basic.url);
	}

	if (globalContent?.promo_items?.lead_art?.type === "image") {
		return buildURL(globalContent.promo_items.lead_art.url);
	}

	return "";
};

export const getImgAlt = (metaValue, metaType = "og:image:alt", globalContent): string | null => {
	if (metaValue(metaType)) {
		return metaValue(metaType);
	}

	return globalContent?.promo_items?.basic?.alt_text || null;
};
