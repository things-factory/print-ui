import { css, html, LitElement } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin'

import '@material/mwc-icon'

import { store, ScrollbarStyles } from '@things-factory/shell'
import { print } from '@things-factory/print-base'
import { i18next } from '@things-factory/i18n-base'
import { closeOverlay } from '@things-factory/layout-base'

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
          display: block;

          min-width: 40vw;

          background-color: var(--context-ui-background-color);
          box-shadow: var(--context-ui-box-shadow);
          border-radius: var(--context-ui-border-radius);
          padding: var(--context-ui-padding);
        }

        ul {
          margin: 0 0 9px 0;
          padding: 0;
          list-style: none;
          overflow-y: auto;
        }

        li {
          display: flex;

          border-bottom: var(--context-ui-list-border-bottom);
          padding: var(--context-ui-list-padding);
        }

        li > mwc-icon {
          font-size: 1em;

          padding: var(--context-ui-padding);
          color: var(--context-ui-list-color);
        }

        li > span {
          margin: auto 0 auto 0;
          flex: 1;

          color: var(--context-ui-list-color);
        }

        li:hover mwc-icon,
        li:hover span {
          color: #fff;
        }

        li:hover {
          cursor: pointer;

          border-bottom: var(--context-ui-list-border-hover-bottom);
        }

        @media (max-width: 400px) {
          :host {
            min-width: 100%;
            box-shadow: none;
            border-radius: 0;
          }
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

    return html`
      <ul>
        ${printers
          .sort((p1, p2) => {
            p1.name > p2.name ? 1 : 0
          })
          .map(
            (printer, idx) => html`
              <label for="${idx}">
                <li @click=${e => this._onPrintOut(printer)}>
                  <mwc-icon>print</mwc-icon>
                  <span>${printer.name} (${printer.type})</span>
                </li>
              </label>
            `
          )}
      </ul>
    `
  }

  stateChanged(state) {
    this._printers = state.print.printers
    this._context = state.route.context
  }

  async _onPrintOut(printer) {
    if (!printer) {
      return
    }

    try {
      var result = await print(printer, this._context.printable)

      document.dispatchEvent(
        new CustomEvent('notify', {
          detail: {
            level: 'info',
            message: i18next.t('text.printed', {
              result
            })
          }
        })
      )
    } catch (e) {
      document.dispatchEvent(
        new CustomEvent('notify', {
          detail: {
            level: 'error',
            message: e,
            e
          }
        })
      )
    }

    closeOverlay('context-toolbar-overlay')
  }
}

customElements.define('print-context-ui', PrintContextUi)
