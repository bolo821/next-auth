import { Subject } from 'rxjs'
import { filter } from 'rxjs/operators'

export const AlertType = {
  Success: 'Success',
  Error: 'Error',
  Info: 'Info',
  Warning: 'Warning',
}

const alertSubject = new Subject()
const defaultId = 'default-alert'

// enable subscribing to alerts observable
const onAlert = (id = defaultId) => alertSubject.asObservable().pipe(filter(x => x && x.id === id))

// convenience methods
const success = (message, options) => alert({...options, type: AlertType.Success, message})
const error = (message, options) => alert({...options, type: AlertType.Error, message})
const info = (message, options) => alert({...options, type: AlertType.Info, message})
const warn = (message, options) => alert({...options, type: AlertType.Warning, message})

// core alert method
const alert = (alert) => {
  alert.id = alert.id || defaultId
  alert.autoClose = (alert.autoClose === undefined ? true : alert.autoClose)
  alertSubject.next(alert)
}

// clear alerts
const clear = (id = defaultId) => alertSubject.next({ id })

export const alertService = {
  onAlert,
  success,
  error,
  info,
  warn,
  alert,
  clear,
}
