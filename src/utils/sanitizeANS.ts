import { ANS_ITEM_SCHEMA, ANS_FEED_SCHEMA } from "./constants";

/* eslint-disable @typescript-eslint/camelcase */
const sanitizeANSItem = (data) => ({
	...data,
	...(data?.editor_note ? { editor_note: "" } : {}),
	...(data?.planning ? {
		planning: {
			...data.planning,
			...(data.planning?.internal_note ? { internal_note: "" } : {}),
		}
	}: {}),
	...(data?.workflow ? { workflow: {} } : {}),
	...(data?.additional_properties ? {
		additional_properties: {
			...data.additional_properties,
			...(data.additional_properties?.clipboard ? { clipboard: {} } : {}),
		}
	} : {}),
	...(data?.content_elements ? {
		content_elements: data.content_elements.map((el) => ({
			...el,
			...(el?.additional_properties ? {
				additional_properties: {
					...el.additional_properties,
					...(el.additional_properties?.inline_comments ? { inline_comments: [] } : {}),
					...(el.additional_properties?.comments ? { comments: [] } : {}),
				}
			} : {}),
		})
	} : {}),
});

/**
 *
 * @param data {object} ANS JSON
 * @param schema {string("ans-item" | "ans-feed") ANS schema
 * @returns {object} ANS data with empty values on the fields:
 * - editor_note
 * - planning.internal_note
 * - workflow
 * - additional_properties.clipboard
 * - content_elements.additional_properties.comments
 * - content_elements.additional_properties.inline_comments
 */
const sanitizeANS = (data, schema: string) => {
	if (schema === ANS_FEED_SCHEMA) {
		return {
			...data,
			...(data?.content_elements ? {
				content_elements: data.content_elements.map((el) => sanitizeANSItem(el))
			} : {}),
		};
	}
	if (schema === ANS_ITEM_SCHEMA) {
		return sanitizeANSItem(data);
	}
	return data;
};

export default sanitizeANS;
