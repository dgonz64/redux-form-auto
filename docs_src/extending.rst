Extending
---------

Creating a skin
===============

The inputs and auxiliary elements are created using a set of components. The mapping can be set all together by overriding the skin.

You can take a look at ``defaultSkin`` and ``components/index.js`` to have a glimpse.

There's an entry in the skin object for every field type. The value of the entry is an object with two attributes like in this example::

  string: {
    component: Input,
    props: {
      inputComponent: 'input'
    }
  },

component
^^^^^^^^^

The React component used to render the whole HTML for the input, including label and any other wrappers. For the Bootstrap skin the ``Input`` component is used to do the common tasks::

  string: {
    component: Input
  }

The component is also in charge of the field connection with redux form store (the ``Field`` component). 

props
^^^^^

The props value can be an object or a function depending on the flexibility needed.

Object
""""""

Props merged to component's default::

  props: {
    inputComponent: 'input',
    type: 'number'
  }

Function
""""""""

Function that takes the component's intended props and returns component's final props::

  props: props => {
    return {
      ...props,
      inputComponent: Radio,
      children: mapRadioOptions(props)
    }
  }

Overriding
==========

You can override (or add) specific types or the whole set.

.. js:autofunction:: setSkin

.. js:autofunction:: addSkinType

Skin component
==============

Every input component expects at least these props:

================== ================= ==========================================
Prop               Type              Use
================== ================= ==========================================
``children``       element           Passed to ``inputComponent``
``name``           string            ReduxForm field name
``fieldSchema``    object            Schema specification for the field
``schemaTypeName`` string (required) Name of the schema that contains the field
``inputComponent`` element           Component used to render the input
``type``           string            Passed to ``inputComponent``
================== ================= ==========================================

There are also other props passed depending on current implementation of ``renderInput``, the function in charge of choosing the component and render it.

Form component
==============

The ``form`` component is different in the sense that it's not rendered after a type. Instead, every form renders a form component in case the UI library requires special form wrapping.

InputWrap
=========

It's a common component used to create all the input structure, including wrappers. You can use it to avoid boilerplate. The final input component used (taken from ``inputComponent`` prop) will be a decorated ``Field``.

================== ======== ===================================================
Prop               Type     Use
================== ======== ===================================================
``children``       node     (optional) You can use InputWrap to... wrap.
``name``           string   Field name
``inputWrapper``   element  Wrapper for the input. See below for props.
``inputComponent`` element  Component receiving the input. See below for props.
``config``         object   Form's configuration
``elementOnly``    boolean  (optional) Asks the wrapper to not decorate the input
``inline``         boolean  (optional) Passed to wrapper
``type``           string   (optional) Passed to input
``schemaTypeName`` string   Name of the schema as created
``onKeyDown``      function (optional) Passed to input
``onKeyPress``     function (optional) Passed to input
``labelOverride``  string   (optional) Passed as label to wrapper instead of
``meta``           object   ReduxForm's meta
================== ======== ===================================================

The props passed to the wrapper component (``inputWrapper``)

================== ======= ===========================
Prop               Type    Use
================== ======= ===========================
``label``          string  Text use as label
``required``       boolean Field is marked as required
``horizontal``     boolean Taken from config
``inline``         boolean Taken from InputWrap props
``errorMessage``   string  To print in red
``warningMessage`` string  To print in orange
``elementOnly``    boolean Skip wrappings
================== ======= ===========================

The props for the input component are different depending if the ``inputComponent`` is a string, like ``'input'`` or a React component.

Common input props
^^^^^^^^^^^^^^^^^^

================ ======== ================
Prop             Type     Use
================ ======== ================
``type``         string   From InputWrap
``onKeyDown``    function From InputWrap
``onKeyPress``   function From InputWrap
``autoComplete`` string   Always ``'off'``
``placeholder``  string   From InputWrap
================ ======== ================

Native component (ie. ``'input'``)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

For a component like that only ReduxForm ``input`` object is passed.

Class component (ie. ``MySlider``)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Extra props are passed:

Prop # Type # Use
``input`` # object # From decorated Field
``meta`` # object # From decorated Field
``config`` # object # From ``InputWrap`` from ``Autoform``
``autoFocus` # boolean # From ``InputWrap``
``schemaTypeName` # string # From ``Schema``

Rendering
=========

To feed ``InputWrap`` with the needed props, two functions can be used:

.. js:autofunction:: renderInputs
.. js:autofunction:: renderInput

Write your own validators
=========================

Suppose you have a field schema and you want to add a custom validator::

  const vehicles = new Schema('vehicles', {
    numberOfWheels: {
      type: 'number',
      isEven: true
    }
  })

To add the validation, use

.. js:autofunction:: addValidator

That is, ``validation`` is a function that returns a function. Outer one creates the validator and the inner one is the validator itself.

The validator returns ``true`` when validation doesn't pass. It can also return a translatable object or a direct message.

To implement the ``isEven`` test using ES6 arrow functions::

  import { addValidator } from 'redux-form-auto'

  addValidator('isEven', entry =>
    value => {
      const expected = entry.isEven ? 0 : 1

      return isNaN(value) || value % 2 != expected
    }
  )

Because the validator takes advantage of the closure from the constructor, it's useful to write both in that cascade manner.
