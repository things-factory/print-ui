import { store } from '@things-factory/shell'
import { html } from 'lit-html'
import { UPDATE_PRINTER } from '@things-factory/print-base'

import { APPEND_CONTEXT_TOOL, TOGGLE_OVERLAY, TOOL_POSITION } from '@things-factory/layout-base'

import '@material/mwc-icon/mwc-icon'

function toggleOverlayTemplate() {
  store.dispatch({
    type: TOGGLE_OVERLAY,
    template: html`
      <print-context-ui></print-context-ui>
    `
  })
}

export default function bootstrap() {
  import('./layouts/print-context-ui')

  store.dispatch({
    type: APPEND_CONTEXT_TOOL,
    tool: {
      position: TOOL_POSITION.FRONT,
      template: html`
        <mwc-icon style="padding: 10px; background-color: #CF4545; color: white;" @click="${toggleOverlayTemplate}"
          >print</mwc-icon
        >
      `,
      context: 'printable'
    }
  })

  /* TODO move to test module */
  store.dispatch({
    type: UPDATE_PRINTER,
    printer: [
      {
        type: 'paper',
        name: 'HP DesignJet 60 Z6610'
      },
      {
        type: 'paper',
        name: 'CANON IR ADV C5550i II'
      },
      {
        type: 'paper',
        name: 'EPSON aculaser-C9300N A3'
      },
      {
        type: 'label',
        name: 'Zebra ZT800-EPL'
      },
      {
        type: '3d',
        name: '3D Printer XYZ'
      }
    ]
  })
}
