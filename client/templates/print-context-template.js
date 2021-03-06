import { css, html, LitElement } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin'

import '@material/mwc-icon'

import { store } from '@things-factory/shell'
import { print } from '@things-factory/print-base'
import { i18next } from '@things-factory/i18n-base'
import { UPDATE_VIEWPART } from '@things-factory/layout-base'

import { ContextToolbarOverlayStyle } from '@things-factory/context-ui'

class PrintContextTemplate extends connect(store)(LitElement) {
  static get properties() {
    return {
      _context: Object,
      _printers: Array
    }
  }

  static get styles() {
    return [ContextToolbarOverlayStyle]
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

    this._staticPrinters.forEach(printer => {
      if (!accept || accept.indexOf(printer.type) != -1) {
        printers.push(printer)
      }
    })

    return html`
      <ul>
        ${!printers || printers.length == 0
          ? html`
              <div>No printer is found.</div>
            `
          : printers
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
    this._staticPrinters = state.print.staticPrinters
    this._context = state.route.context
  }

  async _onPrintOut(printer) {
    if (!printer) {
      return
    }

    /*
     * FIXME print 시작하기 전에 처리하고 싶지만, print preview가 blocking 되는 이유 때문인지,
     * 프린트 전에 close-overlay한 경우에는 사라지지 않는다.
     * 따라서, 미리 강제로 overlay를 hide시키고, 이후에 overlay를 close 한다.
     */

    var printerObject = {
      ...printer
    }

    printerObject.name = printer.txtRecord ? printer.txtRecord.name : printer.name

    store.dispatch({
      type: UPDATE_VIEWPART,
      name: 'context-toolbar-overlay',
      override: {
        show: false
      }
    })

    await this.updateComplete

    try {
      var result = await print(printerObject, this._context.printable)

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

    this.dispatchEvent(new CustomEvent('close-overlay', { bubbles: true, composed: true }))
  }
}

customElements.define('print-context-template', PrintContextTemplate)
