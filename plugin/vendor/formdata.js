/*
 * Loosely based off of
 * https://github.com/inexorabletash/polyfill/blob/master/xhr.js
 * Spec:
 * https://xhr.spec.whatwg.org/#interface-formdata
*/

(function(global) {
  if (!('window' in global && 'document' in global))
    return;

  (function() {
    if ('FormData' in global && 'set' in global.FormData.prototype)
      return;

    function FormData(form) {
      this._data = [];
      if (!form) return;
      for (var i = 0; i < form.elements.length; ++i) {
        var element = form.elements[i];
        var name = element.getAttribute('name')
        if (name !== '')
          this.append(name, element.value);
      }
    }

    FormData.prototype = {
      append: function(name, value, filename) {
        var entryName = String(name);
        var entryValue = value;
        if ('Blob' in global && value instanceof global.Blob) {
          entryValue = new File(value, "blob");
        }
        if (filename && 'File' in global && value instanceof global.File) {
          entryValue = new File(entryValue, filename);
        }

        this._data.push([entryName, entryValue]);
      },

      toString: function() {
        return this._data.map(function(pair) {
          return encodeURIComponent(pair[0]) + '=' + encodeURIComponent(pair[1]);
        }).join('&');
      }
    };

    FormData.prototype.set = function(name, value, filename) {
      var didSet = false;

      for (var i = 0; i < this._data.length; ++i) {
        if (this._data[i][0] === name) {
          if (didSet) {
            this._data.splice(i, 1);
            --i;
          } else {
            this._data[i][1] = value;
            if (filename && 'File' in global && value instanceof global.File) {
              this._data[i][1].name = filename;
            }
            didSet = true;
          }
        }
      }

      if (!didSet) {
        this.append(name, value, filename);
      }
    }

    FormData.prototype.get = function(name) {
      for (var i = 0; i < this._data.length; ++i) {
        if (this._data[i][0] === name) {
          return this._data[i][1];
        }
      }
      return null;
    }

    FormData.prototype.getAll = function(name) {
      var results = [];
      for (var i = 0; i < this._data.length; ++i) {
        if (this._data[i][0] === name) {
          results.push(this._data[i][1]);
        }
      }
      return results;
    }

    FormData.prototype.has = function(name) {
      return this.get(name) !== null;
    }

    FormData.prototype.delete = function(name) {
      for (var i = 0; i < this._data.length; ++i) {
        if (this._data[i][0] === name) {
          this._data.splice(i, 1);
          --i;
        }
      }
    }

    function newIterator(data, modifier) {
      return {
        next: function() {
          if (this._i >= this._data.length) {
            return { done: true };
          }

          ++this._i;
          return {
            done: false,
            value: modifier(this._data[this._i-1]),
          };
        },
        _i: 0,
        _data: data,
      };
    }

    FormData.prototype.entries = function() {
      return newIterator(this._data, function(entry) {
        return [entry[0], entry[1]];
      });
    }

    FormData.prototype.keys = function() {
      return newIterator(this._data, function(entry) {
        return entry[0];
      });
    }

    FormData.prototype.values = function() {
      return newIterator(this._data, function(entry) {
        return entry[1];
      });
    }

    FormData.prototype[Symbol.iterator] = function() {
      return this._data[Symbol.iterator]();
    }

    global.FormData = FormData;
    var send = global.XMLHttpRequest.prototype.send;
    global.XMLHttpRequest.prototype.send = function(body) {
      if (body instanceof FormData) {
        this.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        arguments[0] = body.toString();
      }
      return send.apply(this, arguments);
    };
  }());

}(self));
