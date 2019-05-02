import { connect } from 'pwa-helpers/connect-mixin'
import { LitElement, html, css } from 'lit-element'

import { store } from '@things-factory/shell'
import { APPEND_FOOTERBAR, TOOL_POSITION } from '@things-factory/layout-base'

class PrintContextUi extends connect(store)(LitElement) {
  static get properties() {
    return {
      _printable: Boolean
    }
  }

  static get styles() {
    return [
      css`
        :host {
        }
      `
    ]
  }

  render() {}

  updated(changedProps) {
    if (changedProps.has('_printable')) {
      store.dispatch({
        type: APPEND_FOOTERBAR,
        position: TOOL_POSITION.FRONT,
        template: html`
          <mwc-icon @click="${this._toastSelector}">print</mwc-icon>
        `
      })

      console.log(this._printable)
    }
  }

  stateChanged(state) {
    this._printable = state.route.context.printable || false
  }
}

customElements.define('print-context-ui', PrintContextUi)
