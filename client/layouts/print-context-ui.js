import { css, html, LitElement } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin'

import '@material/mwc-button/mwc-button'
import '@material/mwc-icon/mwc-icon'

import { store, ScrollbarStyles } from '@things-factory/shell'
import { TOGGLE_OVERLAY } from '@things-factory/layout-base'
import { print } from '@things-factory/print-base'

class PrintContextUi extends connect(store)(LitElement) {
  static get properties() {
    return {
      _context: Object,
      _printers: Array
    }
  }

  static get styles() {
    return [
      ScrollbarStyles,
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
    const printers = []
    const printable = this._context.printable || {}
    const accept =
      printable.accept instanceof Array
        ? printable.accept
        : typeof printable.accept == 'string'
        ? [printable.accept]
        : null

    this._printers.forEach(printer => {
      if (!accept || accept.indexOf(printer.type) != -1) {
        printers.push(printer)
      }
    })

    this._printer = printers.length > 0 ? printers[0] : null

    return html`
      <ul>
        ${printers
          .sort((p1, p2) => {
            p1.name > p2.name ? 1 : 0
          })
          .map(
            (printer, idx) => html`
              <label for="${idx}">
                <li>
                  <mwc-icon>print</mwc-icon>
                  <span>${printer.name} (${printer.type})</span>
                  <input
                    id="${idx}"
                    type="radio"
                    name="print"
                    @change="${() => {
                      this._printer = printer
                    }}"
                    ?checked="${idx === 0}"
                  />
                </li>
              </label>
            `
          )}
      </ul>
      <mwc-button @click=${this._onPrintOut.bind(this)}>Print to...</mwc-button>
    `
  }

  stateChanged(state) {
    this._printers = state.print.printers
    this._context = state.route.context
  }

  async _onPrintOut(event) {
    if (!this._printer) {
      return
    }

    store.dispatch({
      type: TOGGLE_OVERLAY
    })

    /* TODO 실제 오버레이가 사라질 때를 확인하는 방법을 구하시오. */
    await this.updateComplete
    await this.updateComplete
    await this.updateComplete

    print(this._printer, this._context.printable)
  }
}

customElements.define('print-context-ui', PrintContextUi)
