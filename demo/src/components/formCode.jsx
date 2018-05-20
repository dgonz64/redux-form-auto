export const formCode = ({
  arrayMode = false,
  horizontal = false
}) =>
`<Autoform
  schema={schema}
  config={{ arrayMode: '${arrayMode}', horizontal: ${horizontal} }}
/>`
