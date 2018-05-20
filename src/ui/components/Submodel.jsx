import React, { cloneElement, Component } from 'react'
import PropTypes from 'prop-types'

import { Panel } from './Panel'
import { renderInputs } from '../componentRender'
import { trModel } from '../../translate'

export const Submodel = ({
  name,
  config = {},
  fieldSchema: { type },
  schemaTypeName
}) =>
  <Panel
    panelType="default"
  >
    <p className="submodel-title">{trModel(schemaTypeName, name)}</p>
    {renderInputs({ schema: type, config, parent: name })}
  </Panel>
