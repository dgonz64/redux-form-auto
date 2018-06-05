# redux-form-auto

This library allows your React application to automatically generate forms and validation code using [ReduxForm](https://github.com/erikras/redux-form/) for state management. The form and validations are generated following a schema inspired by [SimpleSchema](https://github.com/aldeed/simple-schema-js).

At the moment the only *skin* included is a stylable set of css's that happens to be compatible with [Bootstrap 3](http://getbootstrap.com/docs/3.3/). More skins will be added. [Join me](#help-wanted)!

## Watch a demo

[Demo](https://dgonz64.github.io/redux-form-auto/demo.html)

## Installation

    $ npm install redux-form-auto --save

## Usage

#### 1. Write schema

Write a schema for each model you have:

```javascript
    import { Schema } from 'redux-form-auto'

    export const client = new Schema('client', {
      name: {
        type: 'string',
        required: true,
        max: 32
      },
      age: {
        type: 'number'
      }
    })
```

Here we are saying that a `client` is required to have a name and providing its allowed length. Also client has age and it's a number.

#### 2. Render a form

`<Autoform />` React component will generate connected inputs including translatable label, proper input types and error/warning messages:

```javascript
    import { Autoform } from 'redux-from-auto'
    import { client } from './models/client'

    const MyForm = ({ onSubmit }) =>
      <Autoform
        schema={client}
        onSubmit={onSubmit}
      />
```

Form will be validated following the rules set in the schema, beginning with the type itself.

It also allows you to build arrays of other schemas as ReduxForm's [FieldArray](https://redux-form.com/7.3.0/docs/api/fieldarray.md/). You just toss an array with another schema from elsewhere as first element and `Autoform` will allow you to add and remove elements:

```javascript
    import { Schema } from 'redux-form-auto'
    import { client } from './client'

    export const company = new Schema('company', {
      clients: {
        type: [client],
        minChildren: 10
      }
    })
```

Read the [documentation](https://dgonz64.github.io/redux-form-auto/) to find out what else you can do.

## Rationale

One of the purposes of the library is to avoid repeating code by not having to write a set of input components for every entity. Also when time is of the essence, writing forms can be exasperating.

These are some of the advantages of using an automatic form system.

* More [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)
* More [SSoT](https://en.wikipedia.org/wiki/Single_source_of_truth)
* *...so less bugs*

Also redux-form-auto has some of its own

* Validation is also automatic
* Includes a translation system
* It's easily expandable
* It's simple
* When possible tries to use [convention over configuration](https://en.wikipedia.org/wiki/Convention_over_configuration)

## Help wanted

Let's have some fun automatizing the hell out of every UI library out there. [Join me](https://github.com/dgonz64/redux-form-auto/blob/master/CONTRIBUTING.md)!
