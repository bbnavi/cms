import InputProxyClass from '@/graphql/inputs/InputProxyClass'

export const config = {
  point_of_interest: {
    name: 'Orte',
    graphQL: {
      queryRootIndex: 'pointsOfInterest',
      queryRootEntry: 'pointOfInterest'
    },
    formFields: {
      name: {
        component: 'field-generic-string',
        required: true
      },
      description: {
        component: 'field-custom-richtext',
        defaultValue: ''
      },
      categories: {
        component: 'field-generic-list',
        inputType: 'CategoryInput',
        defaultValue: [],
        listTitle: 'modules.point_of_interest.form.headlines.categories',
        listItemComponent: 'field-generic-listitem-category',
        listMaxItems: 3
      },
      addresses: {
        component: 'field-generic-list',
        inputType: 'AddressInput',
        defaultValue: [{
          "addition": "",
          "street": "",
          "zip": "",
          "city": "",
          "kind": "default",
          "geoLocation": {
            "latitude": 0,
            "longitude": 0
          }
        }],
        listTitle: 'modules.point_of_interest.form.headlines.address',
        listItemComponent: 'field-generic-listitem-address',
        listMinItems: 1,
        listMaxItems: 1
      },
      openingHours: {
        component: 'field-generic-list',
        inputType: 'OpeningHourInput',
        defaultValue: [],
        listTitle: 'modules.point_of_interest.form.headlines.openingHours',
        listItemComponent: 'field-generic-listitem-opening-hours'
      },
      operatingCompany: {
        component: 'field-custom-operating-company',
        inputType: 'OperatingCompanyInput',
        defaultValue: {
          "name": "",
          "contact": {
            "firstName": "",
            "lastName": "",
            "email": "",
            "phone": "",
            "fax": "",
            "webUrls": {
              "url": "",
              "description": ""
            }
          },
          "address": {
            "addition": "",
            "street": "",
            "zip": "",
            "city": "",
            "kind": "default",
            "geoLocation": {
              "latitude": 0,
              "longitude": 0
            }
          }
        }
      },
      contact: {
        component: 'field-custom-contact',
        inputType: 'ContactInput',
        defaultValue: {
          "firstName": "",
          "lastName": "",
          "email": "",
          "phone": "",
          "fax": "",
          "webUrls": [{}]
        }
      },
      webUrls: {
        component: 'field-generic-list',
        inputType: 'WebUrlInput',
        defaultValue: [],
        listTitle: 'modules.point_of_interest.form.headlines.webUrls',
        listItemComponent: 'field-generic-listitem-web-url'
      },
      priceInformations: {
        component: 'field-generic-list',
        inputType: 'PriceInput',
        defaultValue: [],
        listTitle: 'modules.point_of_interest.form.headlines.priceInformations',
        listItemComponent: 'field-generic-listitem-price-information',
      },
      mediaContents: {
        component: 'field-generic-list',
        inputType: 'MediaContentInput',
        defaultValue: [],
        listTitle: 'modules.point_of_interest.form.headlines.mediaContents',
        listItemComponent: 'field-generic-listitem-media-content'
      }
    }
  },

  news_item: {
    name: 'Nachrichten',
    graphQL: {
      queryRootIndex: 'newsItems',
      queryRootEntry: 'newsItem'
    },
    formFields: {
      id: {
        component: 'field-generic-number',
        readonly: true
      },
      externalId: {
        component: 'field-custom-external-id'
      },
      title: {
        component: 'field-generic-string',
        required: true
      },
      categoryName: {
        component: 'field-generic-string'
      },
      categories: {
        component: 'field-generic-list',
        inputType: 'CategoryInput',
        defaultValue: [],
        listTitle: 'modules.news_item.form.headlines.categories',
        listItemComponent: 'field-generic-listitem-category',
        listMaxItems: 3
      },
      address: {
        component: 'field-generic-list',
        inputType: 'AddressInput',
        defaultValue: [{
          "addition": "",
          "street": "",
          "zip": "",
          "city": "",
          "kind": "default",
          "geoLocation": {
            "latitude": 0,
            "longitude": 0
          }
        }],
        listTitle: 'modules.news_item.form.headlines.address',
        listItemComponent: 'field-generic-listitem-address',
        listMinItems: 1,
        listMaxItems: 1
      },
      sourceUrl: {
        component: 'field-generic-list',
        inputType: 'WebUrlInput',
        defaultValue: [{
          "url": "",
          "description": ""
        }],
        listTitle: 'modules.news_item.form.headlines.sourceUrl',
        listItemComponent: 'field-generic-listitem-web-url',
        listMinItems: 1,
        listMaxItems: 1
      },
      publicationDate: {
        component: 'field-generic-date'
      },
      publishedAt: {
        component: 'field-generic-date'
      },
      newsType: {
        component: 'field-generic-string'
      },
      author: {
        component: 'field-generic-string'
      },
      charactersToBeShown: {
        component: 'field-generic-number',
        defaultValue: 100
      },
      fullVersion: {
        component: 'field-generic-boolean',
        defaultValue: false
      },
      pushNotification: {
        component: 'field-generic-boolean',
        defaultValue: false
      },
    }
  }
}

export const getConfig = (moduleName) => {
  return config[moduleName]
}

export const transformPayload = (moduleName, entry) => {
  const moduleConfig = getConfig(moduleName)
  const transformedPayload = {}

  for (const key in entry) {
    const inputType = moduleConfig.formFields[key] && moduleConfig.formFields[key].inputType
    const maxEntries = moduleConfig.formFields[key] && moduleConfig.formFields[key].listMaxItems

    if (inputType) {
      if (Array.isArray(entry[key])) {
        const entries = entry[key].map((item) => {
          return new InputProxyClass(inputType, item)
        })

        // transformedPayload[key] = maxEntries === 1 ? entries[0] : entries
        transformedPayload[key] = entries
      } else {
        transformedPayload[key] = new InputProxyClass(inputType, entry[key])
      }
    } else {
      transformedPayload[key] = entry[key]
    }
  }

  return transformedPayload
}

