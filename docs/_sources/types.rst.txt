Types
=====

This is a list of the current types the Schema supports.

string or number
----------------

Just a string or number field.

array
-----

Specifies that the field is a list of objects that follows another schema. You enclose the schema instance in array brackets::

  const pet = new Schema('pet', {
    name: {
      type: String,
      error: {
        max: 10
      }
    }
  })

  const schema = new Schema('owner', {
    pets: {
      type: [pet],
      minChildren: 1,
      maxChildren: 4
    }
  })
   
Uses internally ReduxForm's ``FieldArray``. The form values will be the ones expected from ``FieldArray``::

  {
    pets: [
      { name: 'Needygreedy the cat' },
      { name: 'Destroyer of couches' },
      { name: 'Subwoofer' }
    ]
  }

schema
------

You can put a schema inside another::

  const schema = new Schema('owner', {
    pet: {
      type: pet
    }
  })

The values will be put inside an object, like this::

  {
    pet: {
      name: 'Sherlock Bones'
    }
  }

select
------

Union rendered with a select element::

  const pills = new Schema('pills', {
    color: {
      type: 'select',
      options: ['red', 'blue']
    }
  })

radios
------

Like select but renders using radios.

boolean
-------

Renders a checkbox.
