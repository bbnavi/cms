# BBNAVI-CMS Documentation

The BBNAVI-CMS consums the BBNAVI Datahub API. After sign in, the api delivers the roles and oauth application of the user.

A Role is a module like PointOfInterest, NewsItem etc. which can be managed by the user. Eech module has an GraphQL endpoint to manage the content. The Datahub API also delivers which fields are hidden of each module.

Based on this information and module-settings.js the CMS generates dynamically the overview and form for managing the content of each module.

# config/module-settings.js

The module-settings.js contains the configuration / schema of each module. The schema is used to generate handle the structure and rendering of the form and overview.

The schema is an array of objects. Each object represents a module with some genreric settings and the fields of the module.

## module properties

### name
The name of the module. This is used for the headline of the form and overview.

### recordType
The recordType of the module. This is used in GraphQL queries and mutations and must be Singular and PascalCase.

### graphQL.queryRootIndex
This is used in the GraphQL query to get the list of entries of the module. Must be plural and camelCase.

### graphQL.queryRootEntry 
This is used in the GraphQL query to get a single entry of the module. Must be singular and camelCase.

### formFields 
This is an object with the fields of the module. The key is the name of the field and the value is an object with the generic properties and settings of the field / component. Minimum is the component property. All other properties are optional and depend on the component (props).

Here an minimal example schmea:

```js
exampe_module: {
  name: 'Example Module',
  recordType: 'ExampleModule',
  graphQL: {
    queryRootIndex: 'exampleEntries',
    queryRootEntry: 'exampleEntry'
  },
  formFields: {
    id: {
      component: 'field-generic-number',
      readonly: true
    },
    externalId: {
      component: 'field-custom-external-id'
    },      
    name: {
      component: 'field-generic-string',
      required: true
    },
    description: {
      component: 'field-generic-richtext',
      defaultValue: ''
    },    
    categories: {
      component: 'field-generic-list',
      inputType: 'CategoryInput',
      defaultValue: [],
      listTitle: 'modules.example.form.headlines.categories',
      listItemComponent: 'field-generic-listitem-category',
      listMaxItems: 3
    },
    publicationDate: {
      component: 'field-generic-date'
    },
    publishedAt: {
      component: 'field-generic-date'
    }             
  }  
}
```

# Module File Structure, Naming Conventions

As mentioned above, each module generates dynamically. This requires a certain file structure and naming conventions for rendering the modules.

## File Structure

### /i18n/de-DE.json

Headline, Labels and other texts for the module are organized in the "modules" property. The key of the module is the name of the module, singular and snake_case.

### /assets/icons/modules

The folder contains the icons for the modules. The name of the icon must be the same as the module name, singular and snake_case. If the module uses categories, the icon must be named with the suffix _category_XX and the category id.

### /graphql

**graphql/mutations/point_of_interest.gql**  
This file contains the GraphQL mutation for the module. The name of the file must be the same as the module name, singular and snake_case.

**graphql/queries/modules/point_of_interest/(index.gql|entry.gql|category.gql)**  
The name of the folder must be the same as the module name, singular and snake_case. Inside the folder are the GraphQL queries for fetching all entries, a single entry and the entries of a category.

**inputs**  
The folder contains the GraphQL input types for the module. Theses are used in the GraphQL mutation. The structure / properties of the input types are defined in the graphql documentation.


### /components

**main-prefix**  
The main-prefix is used for components which are used for rendering the main layout of the application.

**ui-prefix**  
The ui-prefix is used for reusable components. These components are used in many places in the application.

**module-prefix**  
The module-prefix is used for components which are used for rendering all module related content / components. 

**form-prefix**  
The form-prefix is used for components which are used for rendering the form of the module and are generic for reusing in other form related components.

**components/module-form-fields**  
In module-settings.js the formFields property defines the fields of the module. Each field needs a component to be rendered. The component is defined in the component property. Theses components are located in the /components/module-form-fields folder. Depending on the component, the prefix of the component name is field-custom- or field-generic-. Each component can have its own properties, like defaultValue, required (have a look at some existing components). These can be defined in the module-settings.js.

# Where is the magic happening?

As multiple times mentioned, the CMS is dynamically generated and bases on the module-settings.js schema und naming conventions. All these is required for rendering and handling the content of the modules. 

## /stores/user.js

The user.js store contains all the user data. After sign in, the user data is fetched from the Datahub API. One main property is the modules property. This contains all the modules the user can manage. The modules property is an array of objects. Each object contains generic properties for handling the module data at many places in the application. 

## /components/module-form.vue

The module-form.vue component renders and handles form for creating and editing a module entry.

## /utils/minio.js

The minio.js contains the logic for uploading files to the minio server. The minio server is used for storing the images of the modules.
