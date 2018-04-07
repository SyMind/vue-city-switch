/* eslint-disable */
export function getCookie (key) {
  return decodeURIComponent(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(key).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null
}

export function setCookie (key, value, end, path, domain, secure) {
  if (!key || /^(?:expires|max\-age|path|domain|secure)$/i.test(key)) { return false }
  var expires = ''
  if (end) {
    switch (end.constructor) {
      case Number:
        expires = end === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : '; max-age=' + end
        break;
      case String:
        expires = '; expires=' + end;
        break;
      case Date:
        expires = '; expires=' + end.toUTCString()
        break;
    }
  }
  document.cookie = encodeURIComponent(key) + '=' + encodeURIComponent(value) + expires + (domain ? '; domain=' + domain : '') + (path ? '; path=' + path : '') + (secure ? '; secure' : '')
  return true
}

export function removeCookie (key, path, domain) {
  if (!key || !this.hasCookie(key)) { return false }
  document.cookie = encodeURIComponent(key) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' + ( domain ? '; domain=' + domain : '') + ( path ? '; path=' + path : '')
  return true
}

export function hasCookie (key) {
  return (new RegExp('(?:^|;\\s*)' + encodeURIComponent(key).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=')).test(document.cookie)
}

export function cookieKeys () {
  var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '').split(/\s*(?:\=[^;]*)?;\s*/)
  for (var nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]) }
  return aKeys
}
