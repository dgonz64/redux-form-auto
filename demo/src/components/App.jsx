import React, { Component } from 'react'
import brace from 'brace'
import AceEditor from 'react-ace'

import 'brace/mode/javascript'
import 'brace/mode/jsx'
import 'brace/theme/github'

import 'bootstrap/dist/css/bootstrap.css'
import './app.css'

import { compose } from 'redux'
import { connect } from 'react-redux'
import { editing } from '../ducks'

import { DemoForm } from './DemoForm'
import { DemoConfig } from './DemoConfig'
import { formCode } from './formCode'
import { Panel } from '../../../src/ui/components/Panel'
import { formValues } from 'redux-form'

const handleChange = (changeCode, code) => {
  changeCode(code)
}

const handleConfigChange = (changeConfig, config) => {
  changeConfig(config)
}

class AppBase extends Component {
  componentDidMount() {
    const { editor } = this.sampleElement

    editor.setOptions({
      readOnly: true,
      highlightActiveLine: false,
      highlightGutterLine: false
    })

    editor.renderer.$cursorLayer.element.style.display = 'none'
  }

  render() {
    const {
      code,
      changeCode,
      changeConfig,
      config
    } = this.props

    return (
      <div className="row app">
        <div className="col-md-5 code">
          <Panel header="Schema">
            <AceEditor
              mode="javascript"
              theme="github"
              onChange={handleChange.bind(null, changeCode)}
              value={code}
              width="90%"
              name="editor"
            />
            <p><small>
                Editor thanks to{' '}
                <a
                  href="https://github.com/securingsincity/react-ace"
                >
                  React-Ace
                </a>
            </small></p>
          </Panel>
        </div>
        <div className="col-md-5 form">
          <Panel header="Form parameters">
            <DemoConfig
              onChange={handleConfigChange.bind(null, changeConfig)}
              config={config}
            />
          </Panel>
          <Panel header="Form element">
            <AceEditor
              mode="jsx"
              theme="github"
              value={formCode(config)}
              name="sample"
              maxLines={5}
              readOnly
              ref={element => this.sampleElement = element} 
            />
          </Panel>
          <Panel header="Generated form" panelType="primary">
            <DemoForm code={code} config={config} />
          </Panel>
        </div>
      </div>
    )
  }
}

export const App = connect(
  editing.mapState,
  editing.mapActions
)(AppBase)
