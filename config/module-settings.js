export const config = {
  point_of_interest: {
    graphQL: {
      queryRootIndex: 'pointsOfInterest',
      queryRootEntry: 'pointOfInterest'
    },
    formFields: {
      externalId: {
        component: 'field-custom-external-id'
      },
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
        defaultValue: [],
        listTitle: 'modules.point_of_interest.form.headlines.categories',
        listItemComponent: 'field-generic-listitem-category',
        listMaxItems: 3
      },
      addresses: {
        component: 'field-generic-list',
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
        defaultValue: [],
        listTitle: 'modules.point_of_interest.form.headlines.openingHours',
        listItemComponent: 'field-generic-listitem-opening-hours'
      },
      contact: {
        component: 'field-custom-contact',
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
        defaultValue: [],
        listTitle: 'modules.point_of_interest.form.headlines.webUrls',
        listItemComponent: 'field-generic-listitem-web-url'
      },
      priceInformations: {
        component: 'field-generic-list',
        defaultValue: [],
        listTitle: 'modules.point_of_interest.form.headlines.priceInformations',
        listItemComponent: 'field-generic-listitem-price-information',
      },
      operatingCompany: {
        component: 'field-custom-operating-company',
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
      }
    }
  },

  news_item: {
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
        component: 'field-generic-string'
      }
    }
  }
}

export const getConfig = (moduleName) => {
  return config[moduleName]
}
