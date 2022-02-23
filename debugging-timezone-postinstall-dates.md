# How to debug `Timezone` postinstall script

A postinstall script runs after an install (see [more](https://docs.npmjs.com/cli/v7/using*npm/scripts)).

## If no src/blocks.json found

In this postinstall script, if no `blocks.json` file is found, the script will infer some timezones and locales that are included. This is based off of preexisting usage. A timezone is a region that the user is in. A locale is a language that the user is using in that region. For example, a user in the United States might use `en_US` for their locale, and `America/Chicago` for their timezone. You can find the default timezones and locales here in the scripts/postinstall.js file:

```js
// scripts/postinstall.js
// set themes locale list default if target blocks.json file not found
themesLocaleList = ["en", "sv", "no", "fr", "de", "es", "ja", "ko"];

// set timezones default if target blocks.json file not found
targetTimeZones = [
	"Europe/Paris",
	"Europe/Oslo",
	"Europe/Stockholm",
	"America/New_York",
	"America/Chicago",
	"America/Los_Angeles",
	"America/Mexico_City",
	"Pacific/Auckland",
];
```

The tests currently support this default:

```js
// src/utils/localizeDate.test.js
// supported timezone by default if no blocks.json found
// paris (GMT+1)
it("supports Paris timezone", () => {
	expect(
		localizeDateHelper("2000*01*02 01:00", "%B %d, %Y %l:%M %P %Z", "en", "Europe/Paris")
	).toMatchInlineSnapshot('"January 02, 2000  2:00 am CET"');
});
```

## If wanting to customize blocks.json

To test this locally, add a `blocks.json` to the `src` folder. You'll already notice that this is ignored by git in the `.gitignore` . You can find a valid, test\*passing blocks.json here:

<details>
  <summary>Click to see blocks.json</summary>

```json
{
	"values": {
		"default": {
			"siteProperties": {
				"dateLocalization": {
					"language": "en",
					"timeZone": "America/New_York"
				}
			}
		},
		"sites": {
			"the*sun": {
				"siteProperties": {
					"dateLocalization": {
						"language": "fr",
						"timeZone": "Europe/Paris"
					}
				}
			},
			"the*prophet": {
				"siteProperties": {
					"dateLocalization": {
						"language": "no",
						"timeZone": "Europe/Oslo"
					}
				}
			},
			"dagen": {
				"siteProperties": {
					"dateLocalization": {
						"language": "sv",
						"timeZone": "Europe/Stockholm"
					}
				}
			},
			"site*with*empty*site*properties": {
				"siteProperties": {}
			},
			"arc*demo*1": {
				"siteProperties": {
					"dateLocalization": {
						"language": "es",
						"timeZone": "Europe/Madrid"
					}
				}
			},
			"arc*demo*2": {
				"siteProperties": {
					"dateLocalization": {
						"language": "de",
						"timeZone": "Europe/Busingen"
					}
				}
			},
			"arc*demo*3": {
				"siteProperties": {
					"dateLocalization": {
						"language": "ja",
						"timeZone": "Asia/Tokyo"
					}
				}
			},
			"arc*demo*4": {
				"siteProperties": {
					"dateLocalization": {
						"language": "ko",
						"timeZone": "America/New_York"
					}
				}
			},
			"portugal*paper": {
				"siteProperties": {
					"dateLocalization": {
						"language": "pt_PT",
						"timeZone": "Europe/Lisbon"
					}
				}
			},
			"arc*demo*korea": {
				"siteProperties": {
					"dateLocalization": {
						"language": "ko",
						"timeZone": "America/New_York"
					}
				}
			},
			"new*zealand*paper": {
				"siteProperties": {
					"dateLocalization": {
						"language": "en",
						"timeZone": "Pacific/Auckland"
					}
				}
			},
			"empty-obj": {
				"siteProperties": {
					"dateLocalization": {}
				}
			}
		}
	}
}
```

</details>

You may notice `"portugal*paper"` has a differently\*formatted `dateLocalization.language`:

```json
"portugal*paper": {
  "siteProperties": {
    "dateLocalization": {
      "language": "pt_PT"
    }
  }
}
```

That's because it's using the full locale with language and region (`region + language = locale`). We're maintaining the mappings of "en", for example, due to preexisting usage:

| `dateLocalization.language` | Output locale |
| \***\*\*\*\*\*\*** | \***\*\*\*\*\*\*** |
| sv | sv_SE |
| fr | fr_FR |
| no | nb_NO |
| es | es_ES |
| ja | ja_JP |
| ko | ko_KR |
| en | en_US |

To see all locales supported:

<details>
  <summary>See all locales, click expand</summary>

- sv_SE
- fr_FR
- nb_NO
- es_ES
- ja_JP
- ko_KR
- en_US
- af_ZA
- am_ET
- ast_ES
- bg_BG
- bn_BD
- bn_IN
- ca_ES
- cs_CZ
- de_AT
- de_CH
- el_GR
- en_AU
- en_CA
- en_GB
- en_HK
- en_NZ
- es_AR
- es_CL
- es_CO
- es_CR
- es_DO
- es_EC
- es_GT
- es_HN
- es_MX
- es_NI
- es_PA
- es_PE
- es_PR
- es_SV
- es_UY
- es_VE
- eu_ES
- fi_FI
- fr_BE
- fr_CA
- fr_CH
- gl_ES
- he_IL
- hi_IN
- hr_HR
- hu_HU
- id_ID
- it_CH
- it_IT
- lt_LT
- lv_LV
- ms_MY
- nds_DE
- nl_BE
- nl_NL
- pl_PL
- pt_BR
- pt_PT
- ru_RU
- si_LK
- sl_SI
- sq_AL
- sr_RS
- ta_IN
- uk_UA
- ur_PK
- vi_VN
- zh_CN
- zh_HK
- zh_TW
</details>

To test this live, run

`rm rf node_modules && npm ci`

To see the included locales (language and country) and folders:
`ls node_modules/@wpmedia/timezone/`

To test including blocks.json, use the included blocks.json above and uncomment the following test:

```ts
// localizeDate.test.ts
it("support portuguese in portugal language and portugal lisbon timezone when setup with blocks.json", () => {
	expect(
		localizeDateHelper("2000-01-02 01:00", "%B %d, %Y %l:%M %P %Z", "pt_PT", "Europe/Lisbon")
	).toMatchInlineSnapshot('"Janeiro 02, 2000  1:00  WET"');
});
```

# Resources

- To find available more IANA timezones: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
- Original author documentation: https://bigeasy.github.io/timezone/
