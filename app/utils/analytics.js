import { isClient } from './index.js';

export const FATAL = true
export const NOT_FATAL = false

const analytics = isClient ? window.ga : () => undefined;

export const create = analytics.bind(null, 'create', 'UA-24079899-1', 'auto');
export const error = function (msg, isFatal) {
  analytics.bind(null, 'send', 'exception', {
    exDescription: msg,
    exFatal: isFatal
  });
}
export const send = analytics.bind(null, 'send');
export const set = analytics.bind(null, 'set');

export default {
  analytics,
  create,
  error,
  send,
  set
};
