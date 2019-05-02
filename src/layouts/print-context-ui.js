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

  render() {
    html`
      <ul>
        ${this.printers.map(ptiner => {
          html`
            <li>${printer}</li>
          `
        })}
      </ul>
    `
  }

  updated(changedProps) {
    if (changedProps.has('_show')) {
      console.log('show')
    }
  }

  stateChanged(state) {
    this._show = state.print.show
    this._printers = state.print.printers
  }
}

customElements.define('print-context-ui', PrintContextUi)
