/************************************
*         author: Deying Ye         *
************************************/
var messagebar = {
  _queue: [],
  _MIN_TIME: 100,
  _count: 0,
  _checkString: function (arr) {
    if (typeof arr === 'string') {
      return true;
    }
    var res = true, i, len;
    if (Object.prototype.toString.call(arr) === '[object Array]') {
      for(i = 0, len = arr.length; i < len; i++) {
        if (typeof(arr[i] !== 'string')) {
          res = false;
        }
      }
    } else {
      res = false;
    }
    return res;
  },
  _wrap: null,
  _extend: function (config, option) {
    var i, tmparr, tmp, bl;
    for (i in option) {
      if (option.hasOwnProperty(i) && config.hasOwnProperty) {
        switch (i) {
        case 'message':
          if (typeof option[i] !== 'string') {
            return false;
          }
          config.message = option[i];
          break;
        case 'position':
          tmparr = option[i].split(' ');
          if (tmparr.length !== 2) {
            return false;
          }
          if (tmparr[0] !== 'left' && tmparr[0] !== 'right') {
            tmp = tmparr[0];
            tmparr[0] = tmparr[1];
            tmparr[1] = tmp;
          }
          if ((tmparr[0] !== 'left' && tmparr[0] !== 'right') || (tmparr[1] !== 'top' && tmparr[1] !== 'bottom')) {
            return false;
          }
          config.position = tmparr.join(' ');
          break;
        case 'delay':
          if (typeof option[i] !== 'number' || option[i] < 0) {
            return false;
          }
          config.delay = option[i];
          break;
        case 'time':
          if (typeof option[i] !== 'number' || option[i] < 0) {
            return false;
          }
          if (option[i] < this._MIN_TIME) {
            option[i] = this._MIN_TIME;
          }
          config.time = option[i];
          break;
        case 'type':
          bl = ['primary', 'info', 'succeed', 'error', 'warning'].some(function (ele) {
            return ele === option[i];
          });
          if (bl === false) {
            return false;
          }
          config.type = option[i];
          break;
        case 'pause':
          if (typeof option[i] !== 'boolean') {
            return false;
          }
          config.pause = option[i];
          break;
        default:
          return false;
        }
      }
    }
    return true;
  },
  _cssStyle: {
    "min-width": "100px",
    "webkit-transition": "opacity 1s, width 1s",
    "o-transition": "opacity 1s, width 1s",
    "transition": "opacity 1s, width 1s",
    "opacity": "0",
    "border": "1px solid #888",
    "border-radius": "8px",
    "background-color": "#333",
    "color": "#fff",
    "padding": "8px 15px",
    "margin-bottom": "10px"
  },
  _wrapStyle: {
    "position": "absolute",
    "font-size": "14px",
    "font-weight": "bold",
    "display": "none"
  },
  _generateStyle: function(ele, style) {
    // generate cssStyle
    var cssText = '';
    for (i in style) {
      if (style.hasOwnProperty(i)) {
        cssText += i + ': ' + style[i] + '; ';
      }
    }
    ele.style.cssText = cssText;
  },
  _closeHandler: function (e) {
    var that = messagebar;
    if (e && e.stopPropagation) {
      e.stopPropagation();
    } else {
      window.event.cancelBubble = true;
    }
    that._wrap.removeChild(that._eventTarget(e).parentNode);
  },
  _eventTarget: function (e) {
    if (e.target) {
      return e.target;
    }
    if (e.srcElement) {
      return e.srcElement;
    }
    return window;
  },
  _addListener: function (obj, e, cb) {
    if (window.addEventListener) {
      obj.addEventListener(e, cb, false);
    } else if (window.attachEvent) {
      obj.attachEvent('on' + e, cb);
    }
  },
  _create: function (option) {
    var config = {
      message: 'you have not input any message',
      position: 'right top',
      delay: 0,
      time: 3000,
      type: 'primary',
      pause: false
    }, box, textNode, cssText, i;
    // check if option not a object
    if (typeof option === 'string') {
      config.message = option;
      option = {
        message: config.message
      };
    }
    if (arguments[1] && typeof arguments[1] === 'boolean') {
      option.pause = arguments[1];
    }
    // extend option to config
    if (this._extend(config, option) === false) {
      throw new Error('messagebar: invalid option');
    }
    // create element
    if (window.document && document.createElement) {
      box = document.createElement('div');
      box.innerHTML = config.message;
      this._generateStyle(box, this._cssStyle);
      if (config.pause) {
        var closeBtn = document.createElement('span');
        closeBtn.innerHTML = '&times;';
        closeBtn.style.cssText = 'float: right; margin-left: 10px; cursor: pointer';
        this._addListener(closeBtn, 'click', this._closeHandler);
        box.appendChild(closeBtn);
      }
      var position = config.position.split(' '), i;
      for (i = 0; i < position.length; i++) {
        this._wrap.style[position[i]] = '50px';
      }
      this._show(box, config);
    }
  },
  _hide: function (box, config) {
    var that = this;
    setTimeout(function () {
      box.style.opacity = '0';
      setTimeout(function () {
        that._wrap.removeChild(box);
      }, 1000);
    }, config.time);
    this._count -= 1;
    if (this._count === 0) {
      this._wrap.style.display = 'none';
    }
  },
  _show: function (box, config) {
    var that = this;
    if (box === null || Object.prototype.toString.call(box).indexOf('[object') === -1) {
      throw new Error('messagebar: failed to create box');
    }
    that._wrap.appendChild(box);
    if (this._count === 0) {
      this._wrap.style.display = '';
    }
    this._count += 1;
    setTimeout(function () {
      box.style.opacity = '1';
      if (!config.pause) {
        that._hide(box, config);
      }
    }, config.delay);
  },
  init: function () {
    this._wrap = document.createElement('span');
    this._generateStyle(this._wrap, this._wrapStyle);
    document.body.appendChild(this._wrap);
  },
  alert: function () {
    this._create.apply(this, arguments);
  }
};
messagebar.init();