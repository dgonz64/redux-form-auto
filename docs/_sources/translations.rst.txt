Translation
-----------

redux-form-auto uses internally a simple better-than-nothing built-in translation system. This system and its translation tables can be replaced and even completely overridden.

The translation strings are hierarchized following some pseudo-semantic rules::

  `models.${model}.${field}.${misc}`

The meaning of the last ``misc`` part usually depends on the type of field.

The dots navigates through children in the string table. Example::

  {
    models: {
      computer: {
        cpu: { 
          arm: 'ARM',
          // ...
        },
        // ...
      }
    }
  }

To translate string for your use call ``tr()`` and pass the string path separated by dots::

  import { tr } from 'redux-form-auto'

  const message = tr('models.computers.cpu.arm')

  /* message value is 'ARM' */

This is the usage of the ``tr()`` function:

.. js:autofunction:: tr

Variable substitution
^^^^^^^^^^^^^^^^^^^^^

You can also put variables in the translation strings::

  {
    name: {
      create: '__name__ created'
    }
  }

This allows you to translate and inserting a value in the correct place of the string. Example::

  import { tr } from 'redux-form-auto'

  const name = 'Alice'
  const message = tr('name.create', { name })

  /* message value is 'Alice created' */

Adding strings
^^^^^^^^^^^^^^

::

  import { addTranslations } from 'redux-form-auto'

Then you call addTranslations with the object tree:

.. js:autofunction:: addTranslations

It's ok to overwrite a language with another. The non translated strings from the new language will remain from the former in the table. At the moment it's up to you to take care about language completeness (or, better, use an external translator).

Multilanguage
^^^^^^^^^^^^^

If your application has more than one language and it can be changed on the fly, I better recommend to use translation utils over the core translations. Those functions store the languages separately::

  import { setLanguageByName } from 'redux-form-auto'

  setLanguageByName('en')

Use your own translation system
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

You can disable the translation system to use your own.

.. js:autofunction:: setTranslator

Example::

  import { setTranslator } from 'redux-form-auto'
  import { myTranslationTranslator } from './serious_translator'

  setTranslator((tr, data) => {
    /* do something with tr or data */

    return myTranslationTranslator(something, somethingElse)
  })

Or you can drop it directly to ``setTranslator()`` if it's compatible.

Translatable objects
^^^^^^^^^^^^^^^^^^^^

The library uses internally translatable objects. Any validator can return a translatable object as a result of an unsuccessful validation, as anything positive will be returned on failure.

To create a translatable object in your custom validator use

.. js:autofunction:: translatable

Out of curiosity, the following is the structure of such object. It's not a function (sorry about that).

.. js:autofunction:: translatableObject

The translatable object was created in order to be able to transfer error messages without agreeing on language, for example to validate on server.
