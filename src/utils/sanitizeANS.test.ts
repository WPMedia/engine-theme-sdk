import sanitizeANS from "./sanitizeANS";
import { ANS_ITEM_SCHEMA, ANS_FEED_SCHEMA } from "./constants";

describe("sanitizeANS", () => {
	const mockANSItem = {
		_id: "EEEHUK7DONCL5NYNMGS6AZ3MP4",
		type: "story",
		version: "0.10.9",
		content_elements: [
			{
				_id: "EEE7VNFRKNEV3HFLIDYVSAFFZ4",
				type: "text",
				additional_properties: {
					comments: [],
					inline_comments: [
						{
							comment: " laboris nisi ut aliquip",
							pos: 182,
						},
					],
				},
				content:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco ex ea commodo consequat. <mark class="hl_orange">Duis aute irure</mark> dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			},
			{
				_id: "HHHHLJWUORHN7PPJCCQL3NHK2Q",
				type: "text",
				additional_properties: {
					comments: [
						{
							date: "2023-02-04T01:28:07.095Z",
							email: "arc@washpost.com",
							end: 453,
							replies: [
								{
									date: "2023-02-04T01:29:11.443Z",
									email: "arc@washpost.com",
									text: "reply",
									user: "arc",
								},
							],
							start: 329,
							text: "new comment",
							user: "arc",
						},
					],
					inline_comments: [],
				},
				content:
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing vitae proin sagittis nisl rhoncus mattis. Id diam maecenas ultricies mi eget. Vitae sapien pellentesque habitant morbi tristique senectus. Est sit amet facilisis magna etiam tempor orci. Mauris commodo quis imperdiet massa tincidunt nunc pulvinar. Dui id ornare arcu odio ut. Sed id semper risus in hendrerit gravida. Dolor magna eget est lorem ipsum dolor. Et ligula ullamcorper malesuada proin libero nunc consequat interdum varius. Porttitor lacus luctus accumsan tortor. Adipiscing vitae proin sagittis nisl rhoncus. Diam volutpat commodo sed egestas egestas. Est pellentesque elit ullamcorper dignissim cras tincidunt lobortis. Fringilla urna porttitor rhoncus dolor purus non enim praesent.",
			},
			{
				_id: "XDDDYULFINBU7IBSR5BSGCOETQ",
				additional_properties: {
					fullSizeResizeUrl: "/resizer/hash.jpg",
					galleries: [],
					keywords: [],
					mime_type: "image/jpeg",
					originalName: "original.jpg",
					originalUrl: "https://domain.com/sandbox.themesinternal/hash.jpg",
					proxyUrl: "/resizer/hash.jpg",
					published: true,
					resizeUrl: "/resizer/hash.jpg",
					restricted: false,
					thumbnailResizeUrl: "/resizer/hash.jpg",
					version: 0,
					_id: "hash",
					comments: [],
					focal_point: {
						max: [255, 420],
						min: [255, 420],
					},
				},
				address: {},
				auth: {
					"2": "hash",
				},
				caption: "roads",
				created_date: "2023-02-02T23:31:33Z",
				height: 1080,
				last_updated_date: "2023-02-02T23:31:33Z",
				licensable: false,
				owner: {
					id: "sandbox.arc",
				},
				source: {
					additional_properties: {
						editor: "photo center",
					},
					edit_url: "https://domain.com/photo/hash",
					system: "photo center",
				},
				subtitle: "roads",
				type: "image",
				url: "https://domain.com/hash.jpg",
				version: "0.10.3",
				width: 1920,
				imageId: null,
				ingestImageToAnglerfish: true,
				photographer: null,
				usage_instructions: null,
				resized_params: {},
			},
			{
				_id: "AAAAT7Y7KRGT3KV2ARSCO433QI",
				type: "text",
				additional_properties: {
					comments: [],
					inline_comments: [],
				},
				content: "<br/>",
			},
		],
		created_date: "2023-02-04T01:26:39.161Z",
		revision: {
			revision_id: "AAAAI3YECVFVTPVHX6R3IWVHTA",
			parent_id: "AAAA3UJBJEI3LGPHU52BHYBBA",
			editions: ["default"],
			branch: "default",
			user_id: "arc@washpost.com",
			published: true,
		},
		last_updated_date: "2023-02-04T01:32:16.452Z",
		headlines: {
			basic: "fields",
			meta_title: "",
			mobile: "",
			native: "",
			print: "",
			tablet: "",
			web: "",
		},
		owner: {
			sponsored: false,
			id: "arc",
		},
		address: {},
		workflow: {
			status_code: 1,
		},
		subheadlines: {
			basic: "",
		},
		description: {
			basic: "",
		},
		language: "",
		label: {},
		source: {
			name: "arc",
			source_type: "staff",
			system: "composer",
		},
		taxonomy: {},
		related_content: {
			basic: [],
			redirect: [],
		},
		distributor: {
			category: "staff",
			name: "arc",
			subcategory: "",
		},
		canonical_website: "the-gazette",
		geo: {},
		planning: {
			internal_note: "internal note",
			story_length: {
				character_count_actual: 1252,
				character_encoding: "UTF-16",
				inch_count_actual: 1,
				line_count_actual: 6,
				word_count_actual: 184,
			},
		},
		display_date: "2023-02-04T01:29:32.224Z",
		credits: {
			by: [],
		},
		subtype: "",
		first_publish_date: "2023-02-04T01:29:32.224Z",
		websites: {
			"the-gazette": {
				website_section: {
					_id: "/news",
					_website: "the-gazette",
					type: "section",
					version: "0.6.0",
					name: "News",
					path: "/news",
					parent_id: "/",
					parent: {
						default: "/",
					},
					_website_section_id: "the-gazette./news",
				},
				website_url: "/news/2023/02/04/fields/",
			},
		},
		additional_properties: {
			clipboard: {},
			has_published_copy: true,
			is_published: true,
			publish_date: "2023-02-04T01:29:32.224Z",
		},
		publish_date: "2023-02-04T01:32:16.177Z",
		canonical_url: "/news/2023/02/04/fields/",
		publishing: {
			scheduled_operations: {
				publish_edition: [],
				unpublish_edition: [],
			},
		},
		website: "the-gazette",
		website_url: "/news/2023/02/04/fields/",
	};

	const mockANSFeed = {
		type: "results",
		content_elements: [mockANSItem, mockANSItem],
	};

	it("should return ans-item JSON with expected empty values", () => {
		const result = sanitizeANS(mockANSItem, ANS_ITEM_SCHEMA);
		// Expect value to be same
		expect(result._id).toEqual(mockANSItem._id);
		expect(result.canonical_url).toEqual(mockANSItem.canonical_url);
		// Expect value to be empty
		expect(result.editor_note).toEqual("");
		expect(result.planning.internal_note).toEqual("");
		expect(result.workflow).toEqual({});
		expect(result.additional_properties.clipboard).toEqual({});
		expect(result.content_elements[0].additional_properties.inline_comments).toEqual([]);
		expect(result.content_elements[0].additional_properties.comments).toEqual([]);
		expect(result.content_elements[3].additional_properties.inline_comments).toEqual([]);
		expect(result.content_elements[3].additional_properties.comments).toEqual([]);
	});

	it("should return ans-feed JSON with expected empty values", () => {
		const result = sanitizeANS(mockANSFeed, ANS_FEED_SCHEMA);
		const contentEls = result.content_elements;
		expect(contentEls[0].editor_note).toEqual("");
		expect(contentEls[0].planning.internal_note).toEqual("");
		expect(contentEls[0].workflow).toEqual({});
		expect(contentEls[0].additional_properties.clipboard).toEqual({});
		expect(contentEls[0].content_elements[0].additional_properties.inline_comments).toEqual([]);
		expect(contentEls[0].content_elements[0].additional_properties.comments).toEqual([]);
		expect(contentEls[1].editor_note).toEqual("");
		expect(contentEls[1].planning.internal_note).toEqual("");
		expect(contentEls[1].workflow).toEqual({});
		expect(contentEls[1].additional_properties.clipboard).toEqual({});
		expect(contentEls[1].content_elements[3].additional_properties.inline_comments).toEqual([]);
		expect(contentEls[1].content_elements[3].additional_properties.comments).toEqual([]);
	});

	it("should return unmodified ans JSON if schema is not ans-item || ans-feed", () => {
		const result = sanitizeANS(mockANSItem, "ans-other");
		expect(result).toEqual(mockANSItem);
	});
});
