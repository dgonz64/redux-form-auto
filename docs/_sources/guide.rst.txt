Guide
=====

Guide uses bootstrap3 skin in the examples. It can be substituted with your skin:

* `redux-form-auto-bootstrap3 <https://github.com/dgonz64/redux-form-auto-bootstrap3>`_
* `redux-form-auto-antd <https://github.com/dgonz64/redux-form-auto-antd>`_

Types
-----

Each schema can be regarded as a Rails model or a database table. You can store them anywhere, for example in a module::

  import { Schema } from 'redux-form-auto-bootstrap3'

  export const computer = new Schema('computers', { /* ...schema... */ })

Each first level entry in the schema object represents the fields in the form or the columns in the database analogy. To configure the field you use another object. Example::

  {
    name: { type: 'string' }
  }

These are the types a field can be:

=========== ======================== =============================
Type        Valid when...            Input control
=========== ======================== =============================
string      Value is a string        ``<input type="text" />``
number      Value is a number        ``<input type="number" />``
integer     Value is an integer      
[<schema>]  Each array item is valid ``<FieldArray />``
<schema>    Value follows schema     Renders as submodel
select      Value belongs to options ``<select />``
radios      Value belongs to options ``<Radio />``
boolean     Value is boolean         ``<input type="checkbox />``
password    Value is a string        ``<input type="password" />``
=========== ======================== =============================

You can specify the type as a constructor. There's not an easily measurable advantage. Example::

  { type: String }

See a list of the types here.

Validators
----------

In addition to the type, you can specify some other validation rules.

=========== ======== ============================================================
Validation  Type     Meaning
=========== ======== ============================================================
minChildren number   Minimum amount of children an array field can have
maxChildren number   Maximum amount of children an array field can have
min         number   Minimum length of the value
max         number   Maximum length of the value
required    boolean  The value can't be empty or undefined
validation  function Function that takes the value and entry and returns validity
accept      regex    Regex. The value matches the regex
reject      regex    The value is not matching the regex
options     array    For the select like inputs. Value should be in options
=========== ======== ============================================================

Scope
-----

The validation rules can appear in two different places:

* ``warning`` object
* ``error`` object

Warning
^^^^^^^

The rules contained in the warning attribute doesn't invalidate the form but are still printed in the form field if the skin supports it::

  {
    name: {
      type: 'string',
      warning: {
        max: 10
      }
    }
  }

Error
^^^^^

``error``, on the other hand, influences validity::

  {
    name: {
      type: 'string',
      error: {
        max: 20
      }
    }
  }

Putting the validators directly is the same as using the error object. The latter is just clearer and makes prettier schemas too.

Schema class
------------

The schema establishes the validation and is also read by ``<Autoform />`` to generate inputs.

The instance can be stored anywhere, like your own model object or a module. At the moment it doesn't change over time.

.. js:autoclass:: Schema
  :members:

Autoform component
------------------

The ``<Autoform />`` component accepts the following props

=========== =============== ======================================================
Prop        Type            Meaning
=========== =============== ======================================================
schema      Schema instance Schema used to build the form
form        string          (optional) Name for the form, overrides schema's name
noErrors    boolean         (optional) Disables error reporting
noWarns     boolean         (optional) Disables warnings
noConnect   boolean         (optional) Don't connect to store. You are in charge
noTranslate boolean         (optional) Don't translate the form
onSubmit    function        (optional) Code called when submitting
config      object          (optional) Form config, see below
=========== =============== ======================================================

Config
------

The ``config`` prop is an object that has the following attributes

========== ===================================================================
Attribute  Meaning
========== ===================================================================
horizontal If true, labels are to the left of the inputs.
arrayMode  ``'table'`` or ``'panels'`` depending on wanted array field format.
========== ===================================================================

Field props override
--------------------

You can override field props individually. You can do this with a component called ``FieldPropsOverride``. This is useful when you want to create an special field with some functionality that forces you to provide an event handler. Let's see an example::

  import { Autoform, FieldPropsOverride } from 'redux-form-auto-bootstrap3'

  const Component = ({ onKeyDown }) =>
    <Autoform schema={client}>
      <FieldPropsOverride
        name="name"
        onKeyDown={onKeyDown}
      />
    </Autoform>

The name should specify the path without taking into account array order. For example, if a ``pet`` serves as an schema array for an ``owner`` and you want to override every pet name from ``pets`` field (array), you should use ``pets.name`` as the ``name`` prop::

    <FieldPropsOverride
      name="pets.name"
      ...overrides...
    />

Default values
--------------

Fields can have default values. Add ``defaultValue`` to field's schema specification like that::

  const schema = new Schema('example', {
    name: {
      type: 'string',
      defaultValue: 'John Doe'
    }
  })
