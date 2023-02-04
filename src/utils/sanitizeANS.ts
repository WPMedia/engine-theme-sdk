const sanitizeANSItem = (data) => ({
	...data,
	editor_note: "",
	planning: {
		...data.planning,
		internal_note: "",
	},
	workflow: {},
	additional_properties: {
		...data.additional_properties,
		clipboard: {},
	},
	content_elements: data.content_elements.map((el) => ({
		...el,
		additional_properties: {
			...el.additional_properties,
			inline_comments: [],
			comments: [],
		},
	})),
});

const sanitizeANS = (data): Object => {
  let sanitizedANS;
  if (data?.type == "results") {
    sanitizedANS = data.content_elements.map(el => sanitizeANSItem(el))
  }
  sanitizedANS = sanitizeANSItem(data)
  return sanitizedANS;
}

export default sanitizeANS