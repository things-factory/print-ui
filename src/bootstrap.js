import { store } from '@things-factory/shell'
import { html } from 'lit-html'

import { APPEND_FOOTERBAR, TOOL_POSITION } from '@things-factory/layout-base'

export default function bootstrap() {
  store.dispatch({
    type: APPEND_FOOTERBAR,
    footer: {
      position: TOOL_POSITION.FRONT,
      template: html`
        <mwc-icon style="padding: 10px; background-color: #CF4545; color: white;">print</mwc-icon>
      `,
      context: 'printable'
    }
  })
}
