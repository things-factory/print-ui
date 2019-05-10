import { store } from '@things-factory/shell'
import { html } from 'lit-html'
import { UPDATE_PRINTER } from '@things-factory/print-base'

import './layouts/print-context-ui'

import { APPEND_FOOTERBAR, TOGGLE_OVERLAY, TOOL_POSITION } from '@things-factory/layout-base'

function toggleOverlayTemplate() {
  store.dispatch({
    type: TOGGLE_OVERLAY,
    template: html`
      <print-context-ui></print-context-ui>
    `
  })
}

export default function bootstrap() {
  store.dispatch({
    type: APPEND_FOOTERBAR,
    footer: {
      position: TOOL_POSITION.FRONT,
      template: html`
        <mwc-icon style="padding: 10px; background-color: #CF4545; color: white;" @click="${toggleOverlayTemplate}"
          >print</mwc-icon
        >
      `,
      context: 'printable'
    }
  })

  store.dispatch({
    type: UPDATE_PRINTER,
    printer: ['HP DesignJet 60 Z6610', 'CANON IR ADV C5550i II', 'EPSON aculaser-C9300N A3']
  })
}
