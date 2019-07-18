import { html } from 'lit-html'

import '@material/mwc-icon'

import { store } from '@things-factory/shell'
import { UPDATE_PRINTER } from '@things-factory/print-base'
import { TOOL_POSITION } from '@things-factory/layout-base'
import { APPEND_CONTEXT_TOOL } from '@things-factory/context-base'
import { toggleOverlay } from '@things-factory/layout-base'

export default function bootstrap() {
  import('./layouts/print-context-ui')

  function toggleContextToolbarOverlay() {
    toggleOverlay('context-toolbar-overlay', {
      template: html`
        <print-context-ui></print-context-ui>
      `
    })
  }

  store.dispatch({
    type: APPEND_CONTEXT_TOOL,
    tool: {
      position: TOOL_POSITION.FRONT,
      template: html`
        <mwc-icon
          style="padding: 10px; background-color: var(--secondary-color); color: white;"
          @click=${toggleContextToolbarOverlay}
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
