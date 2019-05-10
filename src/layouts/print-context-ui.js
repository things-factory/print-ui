import { connect } from 'pwa-helpers/connect-mixin'
import { store } from '@things-factory/shell'
import { LitElement, html, css } from 'lit-element'

import { TOGGLE_OVERLAY } from '@things-factory/layout-base'

import '@material/mwc-icon/mwc-icon'
import '@material/mwc-button/mwc-button'

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
          display: block;
          margin: auto 0 0 0;
        }
        ul {
          margin: 0;
          padding: 0;
          background-color: #cf4545;
          color: white;
          list-style: none;
        }
        li {
          display: flex;
        }
        li > span {
          margin: auto 0 auto 0;
          flex: 1;
        }
        li > input {
          margin: auto 10px;
        }
        ul > span {
          padding: 15px;
        }
      `
    ]
  }

  render() {
    return html`
      <ul>
        ${this._printers.map(
          printer => html`
            <li>
              <mwc-icon style="padding: 10px; background-color: #CF4545; color: white;">print</mwc-icon>
              <span>${printer}</span>
              <input type="radio" name="print" />
            </li>
          `
        )}
        <mwc-button @click="${this._onPrintOut}">Print...</mwc-button>
      </ul>
    `
  }

  stateChanged(state) {
    this._printers = state.print.printers
  }

  _onPrintOut() {
    console.log('print out')
    store.dispatch({
      type: TOGGLE_OVERLAY
    })
  }
}

customElements.define('print-context-ui', PrintContextUi)
