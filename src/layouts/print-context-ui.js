import '@material/mwc-button/mwc-button'
import '@material/mwc-icon/mwc-icon'
import { TOGGLE_OVERLAY } from '@things-factory/layout-base'
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
          display: flex;
          flex-direction: column;
          margin: auto 0 0 0;
          max-height: 30vh;
          background-color: #cf4545;
        }
        ul {
          margin: 0;
          padding: 0;
          color: #fff;
          list-style: none;
          height: 100%;
          overflow-y: auto;
        }
        li {
          display: flex;
        }
        li > mwc-icon {
          padding: 10px;
        }
        li > span {
          margin: auto 0 auto 0;
          flex: 1;
        }
        li > input {
          margin: auto 10px;
        }
        mwc-button {
          margin-right: auto;
          padding: 0 10px;
        }
      `
    ]
  }

  render() {
    return html`
      <ul>
        ${this._printers.map(
          (printer, idx) => html`
            <label for="${idx}">
              <li>
                <mwc-icon>print</mwc-icon>
                <span>${printer}</span>
                <input id="${idx}" type="radio" name="print" />
              </li>
            </label>
          `
        )}
      </ul>
      <mwc-button @click="${this._onPrintOut}">Print to...</mwc-button>
    `
  }

  stateChanged(state) {
    this._printers = state.print.printers
  }

  _onPrintOut(event) {
    console.log('print out', event)
    store.dispatch({
      type: TOGGLE_OVERLAY
    })
  }
}

customElements.define('print-context-ui', PrintContextUi)
