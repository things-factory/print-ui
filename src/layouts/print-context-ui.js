import { store } from '@things-factory/shell'
import { css, html, LitElement } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin'

class PrintContextUi extends connect(store)(LitElement) {
  static get properties() {
    return {
      _printers: Array
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
        ${this._printers.map(printer => {
          html`
            <li>${printer}</li>
          `
        })}
      </ul>
    `
  }

  stateChanged(state) {
    this._printers = state.print.printers
  }
}

customElements.define('print-context-ui', PrintContextUi)
