[![Build Status](https://travis-ci.org/dgonz64/redux-form-auto.svg?branch=master)](https://travis-ci.org/dgonz64/redux-form-auto)

# redux-form-auto

This library allows your React application to automatically generate forms and validation code using [ReduxForm](https://github.com/erikras/redux-form/) for state management. The form and validations are generated following a schema inspired by [SimpleSchema](https://github.com/aldeed/simple-schema-js).

At the moment the *skins* available are:

* [Bootstrap 3](https://github.com/dgonz64/redux-form-auto-bootstrap3).
* [Antd](https://github.com/dgonz64/redux-form-auto-antd).

More skins will be added. [Join me](#help-wanted)!

## Play with a demo

* [Bootstrap 3](https://dgonz64.github.io/redux-form-auto/demo.html)
* [Antd](https://dgonz64.github.io/redux-form-auto-antd/demo/)

## Migration from 1.0.x

The library doesn't include bootstrap 3 styles by default. If you want to use bootstrap 3 now you have to include its npm, see installation:

## Installation

Choose the skin and import the corresponding package

    $ npm install redux-form-auto-bootstrap3 --save

Current skins:

* redux-form-auto-bootstrap3
* redux-form-auto-antd

## Usage

#### 1. Write schema

Write a schema for each model you have:

```javascript
    import { Schema } from 'redux-form-auto-bootstrap3'
    // ... or ...
    import { Schema } from 'redux-form-auto-antd'

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

[Here](https://dgonz64.github.io/redux-form-auto/guide.html) you can find the complete list of types and validators available.

#### 2. Render a form

`<Autoform />` React component will generate connected inputs including translatable label, proper input types and error/warning messages:

```javascript
    import { Autoform } from 'redux-from-auto-<skin>'
    import { client } from './models/client'

    const MyForm = ({ onSubmit }) =>
      <Autoform
        schema={client}
        onSubmit={onSubmit}
      />
```

Form will be validated following the rules set in the schema, beginning with the type itself.

It also allows you to build arrays from other schemas as ReduxForm's [FieldArray](https://redux-form.com/7.3.0/docs/api/fieldarray.md/). You just toss an array with another schema from elsewhere as first element and `Autoform` will allow you to add and remove elements:

```javascript
    import { Schema } from 'redux-form-auto-<skin>'
    import { client } from './client'

    export const company = new Schema('company', {
      clients: {
        type: [client],
        minChildren: 10
      }
    })
```

Read the documentation to find out what else you can do:

## [Documentation](https://dgonz64.github.io/redux-form-auto/)

You can also take [the demo project](https://github.com/dgonz64/redux-form-auto-bootstrap3-demo) as an example of use.

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
