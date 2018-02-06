export function serializeJSON(data) {
    return Object.keys(data).map(function (keyName) {
      return encodeURIComponent(keyName) + '=' + encodeURIComponent(data[keyName])
    }).join('&');
}
