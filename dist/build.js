"bundle";
(function() {
var define = System.amdDefine;
(function(global, factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = global.document ? factory(global, true) : function(w) {
      if (!w.document) {
        throw new Error("jQuery requires a window with a document");
      }
      return factory(w);
    };
  } else {
    factory(global);
  }
}(typeof window !== "undefined" ? window : this, function(window, noGlobal) {
  var arr = [];
  var document = window.document;
  var slice = arr.slice;
  var concat = arr.concat;
  var push = arr.push;
  var indexOf = arr.indexOf;
  var class2type = {};
  var toString = class2type.toString;
  var hasOwn = class2type.hasOwnProperty;
  var support = {};
  var version = "2.2.4",
      jQuery = function(selector, context) {
        return new jQuery.fn.init(selector, context);
      },
      rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
      rmsPrefix = /^-ms-/,
      rdashAlpha = /-([\da-z])/gi,
      fcamelCase = function(all, letter) {
        return letter.toUpperCase();
      };
  jQuery.fn = jQuery.prototype = {
    jquery: version,
    constructor: jQuery,
    selector: "",
    length: 0,
    toArray: function() {
      return slice.call(this);
    },
    get: function(num) {
      return num != null ? (num < 0 ? this[num + this.length] : this[num]) : slice.call(this);
    },
    pushStack: function(elems) {
      var ret = jQuery.merge(this.constructor(), elems);
      ret.prevObject = this;
      ret.context = this.context;
      return ret;
    },
    each: function(callback) {
      return jQuery.each(this, callback);
    },
    map: function(callback) {
      return this.pushStack(jQuery.map(this, function(elem, i) {
        return callback.call(elem, i, elem);
      }));
    },
    slice: function() {
      return this.pushStack(slice.apply(this, arguments));
    },
    first: function() {
      return this.eq(0);
    },
    last: function() {
      return this.eq(-1);
    },
    eq: function(i) {
      var len = this.length,
          j = +i + (i < 0 ? len : 0);
      return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
    },
    end: function() {
      return this.prevObject || this.constructor();
    },
    push: push,
    sort: arr.sort,
    splice: arr.splice
  };
  jQuery.extend = jQuery.fn.extend = function() {
    var options,
        name,
        src,
        copy,
        copyIsArray,
        clone,
        target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        deep = false;
    if (typeof target === "boolean") {
      deep = target;
      target = arguments[i] || {};
      i++;
    }
    if (typeof target !== "object" && !jQuery.isFunction(target)) {
      target = {};
    }
    if (i === length) {
      target = this;
      i--;
    }
    for (; i < length; i++) {
      if ((options = arguments[i]) != null) {
        for (name in options) {
          src = target[name];
          copy = options[name];
          if (target === copy) {
            continue;
          }
          if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
            if (copyIsArray) {
              copyIsArray = false;
              clone = src && jQuery.isArray(src) ? src : [];
            } else {
              clone = src && jQuery.isPlainObject(src) ? src : {};
            }
            target[name] = jQuery.extend(deep, clone, copy);
          } else if (copy !== undefined) {
            target[name] = copy;
          }
        }
      }
    }
    return target;
  };
  jQuery.extend({
    expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
    isReady: true,
    error: function(msg) {
      throw new Error(msg);
    },
    noop: function() {},
    isFunction: function(obj) {
      return jQuery.type(obj) === "function";
    },
    isArray: Array.isArray,
    isWindow: function(obj) {
      return obj != null && obj === obj.window;
    },
    isNumeric: function(obj) {
      var realStringObj = obj && obj.toString();
      return !jQuery.isArray(obj) && (realStringObj - parseFloat(realStringObj) + 1) >= 0;
    },
    isPlainObject: function(obj) {
      var key;
      if (jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow(obj)) {
        return false;
      }
      if (obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype || {}, "isPrototypeOf")) {
        return false;
      }
      for (key in obj) {}
      return key === undefined || hasOwn.call(obj, key);
    },
    isEmptyObject: function(obj) {
      var name;
      for (name in obj) {
        return false;
      }
      return true;
    },
    type: function(obj) {
      if (obj == null) {
        return obj + "";
      }
      return typeof obj === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj;
    },
    globalEval: function(code) {
      var script,
          indirect = eval;
      code = jQuery.trim(code);
      if (code) {
        if (code.indexOf("use strict") === 1) {
          script = document.createElement("script");
          script.text = code;
          document.head.appendChild(script).parentNode.removeChild(script);
        } else {
          indirect(code);
        }
      }
    },
    camelCase: function(string) {
      return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
    },
    nodeName: function(elem, name) {
      return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
    },
    each: function(obj, callback) {
      var length,
          i = 0;
      if (isArrayLike(obj)) {
        length = obj.length;
        for (; i < length; i++) {
          if (callback.call(obj[i], i, obj[i]) === false) {
            break;
          }
        }
      } else {
        for (i in obj) {
          if (callback.call(obj[i], i, obj[i]) === false) {
            break;
          }
        }
      }
      return obj;
    },
    trim: function(text) {
      return text == null ? "" : (text + "").replace(rtrim, "");
    },
    makeArray: function(arr, results) {
      var ret = results || [];
      if (arr != null) {
        if (isArrayLike(Object(arr))) {
          jQuery.merge(ret, typeof arr === "string" ? [arr] : arr);
        } else {
          push.call(ret, arr);
        }
      }
      return ret;
    },
    inArray: function(elem, arr, i) {
      return arr == null ? -1 : indexOf.call(arr, elem, i);
    },
    merge: function(first, second) {
      var len = +second.length,
          j = 0,
          i = first.length;
      for (; j < len; j++) {
        first[i++] = second[j];
      }
      first.length = i;
      return first;
    },
    grep: function(elems, callback, invert) {
      var callbackInverse,
          matches = [],
          i = 0,
          length = elems.length,
          callbackExpect = !invert;
      for (; i < length; i++) {
        callbackInverse = !callback(elems[i], i);
        if (callbackInverse !== callbackExpect) {
          matches.push(elems[i]);
        }
      }
      return matches;
    },
    map: function(elems, callback, arg) {
      var length,
          value,
          i = 0,
          ret = [];
      if (isArrayLike(elems)) {
        length = elems.length;
        for (; i < length; i++) {
          value = callback(elems[i], i, arg);
          if (value != null) {
            ret.push(value);
          }
        }
      } else {
        for (i in elems) {
          value = callback(elems[i], i, arg);
          if (value != null) {
            ret.push(value);
          }
        }
      }
      return concat.apply([], ret);
    },
    guid: 1,
    proxy: function(fn, context) {
      var tmp,
          args,
          proxy;
      if (typeof context === "string") {
        tmp = fn[context];
        context = fn;
        fn = tmp;
      }
      if (!jQuery.isFunction(fn)) {
        return undefined;
      }
      args = slice.call(arguments, 2);
      proxy = function() {
        return fn.apply(context || this, args.concat(slice.call(arguments)));
      };
      proxy.guid = fn.guid = fn.guid || jQuery.guid++;
      return proxy;
    },
    now: Date.now,
    support: support
  });
  if (typeof Symbol === "function") {
    jQuery.fn[Symbol.iterator] = arr[Symbol.iterator];
  }
  jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(i, name) {
    class2type["[object " + name + "]"] = name.toLowerCase();
  });
  function isArrayLike(obj) {
    var length = !!obj && "length" in obj && obj.length,
        type = jQuery.type(obj);
    if (type === "function" || jQuery.isWindow(obj)) {
      return false;
    }
    return type === "array" || length === 0 || typeof length === "number" && length > 0 && (length - 1) in obj;
  }
  var Sizzle = (function(window) {
    var i,
        support,
        Expr,
        getText,
        isXML,
        tokenize,
        compile,
        select,
        outermostContext,
        sortInput,
        hasDuplicate,
        setDocument,
        document,
        docElem,
        documentIsHTML,
        rbuggyQSA,
        rbuggyMatches,
        matches,
        contains,
        expando = "sizzle" + 1 * new Date(),
        preferredDoc = window.document,
        dirruns = 0,
        done = 0,
        classCache = createCache(),
        tokenCache = createCache(),
        compilerCache = createCache(),
        sortOrder = function(a, b) {
          if (a === b) {
            hasDuplicate = true;
          }
          return 0;
        },
        MAX_NEGATIVE = 1 << 31,
        hasOwn = ({}).hasOwnProperty,
        arr = [],
        pop = arr.pop,
        push_native = arr.push,
        push = arr.push,
        slice = arr.slice,
        indexOf = function(list, elem) {
          var i = 0,
              len = list.length;
          for (; i < len; i++) {
            if (list[i] === elem) {
              return i;
            }
          }
          return -1;
        },
        booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
        whitespace = "[\\x20\\t\\r\\n\\f]",
        identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
        attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace + "*([*^$|!~]?=)" + whitespace + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace + "*\\]",
        pseudos = ":(" + identifier + ")(?:\\((" + "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" + "((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" + ".*" + ")\\)|)",
        rwhitespace = new RegExp(whitespace + "+", "g"),
        rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),
        rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
        rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"),
        rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g"),
        rpseudo = new RegExp(pseudos),
        ridentifier = new RegExp("^" + identifier + "$"),
        matchExpr = {
          "ID": new RegExp("^#(" + identifier + ")"),
          "CLASS": new RegExp("^\\.(" + identifier + ")"),
          "TAG": new RegExp("^(" + identifier + "|[*])"),
          "ATTR": new RegExp("^" + attributes),
          "PSEUDO": new RegExp("^" + pseudos),
          "CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
          "bool": new RegExp("^(?:" + booleans + ")$", "i"),
          "needsContext": new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
        },
        rinputs = /^(?:input|select|textarea|button)$/i,
        rheader = /^h\d$/i,
        rnative = /^[^{]+\{\s*\[native \w/,
        rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
        rsibling = /[+~]/,
        rescape = /'|\\/g,
        runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"),
        funescape = function(_, escaped, escapedWhitespace) {
          var high = "0x" + escaped - 0x10000;
          return high !== high || escapedWhitespace ? escaped : high < 0 ? String.fromCharCode(high + 0x10000) : String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
        },
        unloadHandler = function() {
          setDocument();
        };
    try {
      push.apply((arr = slice.call(preferredDoc.childNodes)), preferredDoc.childNodes);
      arr[preferredDoc.childNodes.length].nodeType;
    } catch (e) {
      push = {apply: arr.length ? function(target, els) {
          push_native.apply(target, slice.call(els));
        } : function(target, els) {
          var j = target.length,
              i = 0;
          while ((target[j++] = els[i++])) {}
          target.length = j - 1;
        }};
    }
    function Sizzle(selector, context, results, seed) {
      var m,
          i,
          elem,
          nid,
          nidselect,
          match,
          groups,
          newSelector,
          newContext = context && context.ownerDocument,
          nodeType = context ? context.nodeType : 9;
      results = results || [];
      if (typeof selector !== "string" || !selector || nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {
        return results;
      }
      if (!seed) {
        if ((context ? context.ownerDocument || context : preferredDoc) !== document) {
          setDocument(context);
        }
        context = context || document;
        if (documentIsHTML) {
          if (nodeType !== 11 && (match = rquickExpr.exec(selector))) {
            if ((m = match[1])) {
              if (nodeType === 9) {
                if ((elem = context.getElementById(m))) {
                  if (elem.id === m) {
                    results.push(elem);
                    return results;
                  }
                } else {
                  return results;
                }
              } else {
                if (newContext && (elem = newContext.getElementById(m)) && contains(context, elem) && elem.id === m) {
                  results.push(elem);
                  return results;
                }
              }
            } else if (match[2]) {
              push.apply(results, context.getElementsByTagName(selector));
              return results;
            } else if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) {
              push.apply(results, context.getElementsByClassName(m));
              return results;
            }
          }
          if (support.qsa && !compilerCache[selector + " "] && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
            if (nodeType !== 1) {
              newContext = context;
              newSelector = selector;
            } else if (context.nodeName.toLowerCase() !== "object") {
              if ((nid = context.getAttribute("id"))) {
                nid = nid.replace(rescape, "\\$&");
              } else {
                context.setAttribute("id", (nid = expando));
              }
              groups = tokenize(selector);
              i = groups.length;
              nidselect = ridentifier.test(nid) ? "#" + nid : "[id='" + nid + "']";
              while (i--) {
                groups[i] = nidselect + " " + toSelector(groups[i]);
              }
              newSelector = groups.join(",");
              newContext = rsibling.test(selector) && testContext(context.parentNode) || context;
            }
            if (newSelector) {
              try {
                push.apply(results, newContext.querySelectorAll(newSelector));
                return results;
              } catch (qsaError) {} finally {
                if (nid === expando) {
                  context.removeAttribute("id");
                }
              }
            }
          }
        }
      }
      return select(selector.replace(rtrim, "$1"), context, results, seed);
    }
    function createCache() {
      var keys = [];
      function cache(key, value) {
        if (keys.push(key + " ") > Expr.cacheLength) {
          delete cache[keys.shift()];
        }
        return (cache[key + " "] = value);
      }
      return cache;
    }
    function markFunction(fn) {
      fn[expando] = true;
      return fn;
    }
    function assert(fn) {
      var div = document.createElement("div");
      try {
        return !!fn(div);
      } catch (e) {
        return false;
      } finally {
        if (div.parentNode) {
          div.parentNode.removeChild(div);
        }
        div = null;
      }
    }
    function addHandle(attrs, handler) {
      var arr = attrs.split("|"),
          i = arr.length;
      while (i--) {
        Expr.attrHandle[arr[i]] = handler;
      }
    }
    function siblingCheck(a, b) {
      var cur = b && a,
          diff = cur && a.nodeType === 1 && b.nodeType === 1 && (~b.sourceIndex || MAX_NEGATIVE) - (~a.sourceIndex || MAX_NEGATIVE);
      if (diff) {
        return diff;
      }
      if (cur) {
        while ((cur = cur.nextSibling)) {
          if (cur === b) {
            return -1;
          }
        }
      }
      return a ? 1 : -1;
    }
    function createInputPseudo(type) {
      return function(elem) {
        var name = elem.nodeName.toLowerCase();
        return name === "input" && elem.type === type;
      };
    }
    function createButtonPseudo(type) {
      return function(elem) {
        var name = elem.nodeName.toLowerCase();
        return (name === "input" || name === "button") && elem.type === type;
      };
    }
    function createPositionalPseudo(fn) {
      return markFunction(function(argument) {
        argument = +argument;
        return markFunction(function(seed, matches) {
          var j,
              matchIndexes = fn([], seed.length, argument),
              i = matchIndexes.length;
          while (i--) {
            if (seed[(j = matchIndexes[i])]) {
              seed[j] = !(matches[j] = seed[j]);
            }
          }
        });
      });
    }
    function testContext(context) {
      return context && typeof context.getElementsByTagName !== "undefined" && context;
    }
    support = Sizzle.support = {};
    isXML = Sizzle.isXML = function(elem) {
      var documentElement = elem && (elem.ownerDocument || elem).documentElement;
      return documentElement ? documentElement.nodeName !== "HTML" : false;
    };
    setDocument = Sizzle.setDocument = function(node) {
      var hasCompare,
          parent,
          doc = node ? node.ownerDocument || node : preferredDoc;
      if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
        return document;
      }
      document = doc;
      docElem = document.documentElement;
      documentIsHTML = !isXML(document);
      if ((parent = document.defaultView) && parent.top !== parent) {
        if (parent.addEventListener) {
          parent.addEventListener("unload", unloadHandler, false);
        } else if (parent.attachEvent) {
          parent.attachEvent("onunload", unloadHandler);
        }
      }
      support.attributes = assert(function(div) {
        div.className = "i";
        return !div.getAttribute("className");
      });
      support.getElementsByTagName = assert(function(div) {
        div.appendChild(document.createComment(""));
        return !div.getElementsByTagName("*").length;
      });
      support.getElementsByClassName = rnative.test(document.getElementsByClassName);
      support.getById = assert(function(div) {
        docElem.appendChild(div).id = expando;
        return !document.getElementsByName || !document.getElementsByName(expando).length;
      });
      if (support.getById) {
        Expr.find["ID"] = function(id, context) {
          if (typeof context.getElementById !== "undefined" && documentIsHTML) {
            var m = context.getElementById(id);
            return m ? [m] : [];
          }
        };
        Expr.filter["ID"] = function(id) {
          var attrId = id.replace(runescape, funescape);
          return function(elem) {
            return elem.getAttribute("id") === attrId;
          };
        };
      } else {
        delete Expr.find["ID"];
        Expr.filter["ID"] = function(id) {
          var attrId = id.replace(runescape, funescape);
          return function(elem) {
            var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
            return node && node.value === attrId;
          };
        };
      }
      Expr.find["TAG"] = support.getElementsByTagName ? function(tag, context) {
        if (typeof context.getElementsByTagName !== "undefined") {
          return context.getElementsByTagName(tag);
        } else if (support.qsa) {
          return context.querySelectorAll(tag);
        }
      } : function(tag, context) {
        var elem,
            tmp = [],
            i = 0,
            results = context.getElementsByTagName(tag);
        if (tag === "*") {
          while ((elem = results[i++])) {
            if (elem.nodeType === 1) {
              tmp.push(elem);
            }
          }
          return tmp;
        }
        return results;
      };
      Expr.find["CLASS"] = support.getElementsByClassName && function(className, context) {
        if (typeof context.getElementsByClassName !== "undefined" && documentIsHTML) {
          return context.getElementsByClassName(className);
        }
      };
      rbuggyMatches = [];
      rbuggyQSA = [];
      if ((support.qsa = rnative.test(document.querySelectorAll))) {
        assert(function(div) {
          docElem.appendChild(div).innerHTML = "<a id='" + expando + "'></a>" + "<select id='" + expando + "-\r\\' msallowcapture=''>" + "<option selected=''></option></select>";
          if (div.querySelectorAll("[msallowcapture^='']").length) {
            rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")");
          }
          if (!div.querySelectorAll("[selected]").length) {
            rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
          }
          if (!div.querySelectorAll("[id~=" + expando + "-]").length) {
            rbuggyQSA.push("~=");
          }
          if (!div.querySelectorAll(":checked").length) {
            rbuggyQSA.push(":checked");
          }
          if (!div.querySelectorAll("a#" + expando + "+*").length) {
            rbuggyQSA.push(".#.+[+~]");
          }
        });
        assert(function(div) {
          var input = document.createElement("input");
          input.setAttribute("type", "hidden");
          div.appendChild(input).setAttribute("name", "D");
          if (div.querySelectorAll("[name=d]").length) {
            rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=");
          }
          if (!div.querySelectorAll(":enabled").length) {
            rbuggyQSA.push(":enabled", ":disabled");
          }
          div.querySelectorAll("*,:x");
          rbuggyQSA.push(",.*:");
        });
      }
      if ((support.matchesSelector = rnative.test((matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)))) {
        assert(function(div) {
          support.disconnectedMatch = matches.call(div, "div");
          matches.call(div, "[s!='']:x");
          rbuggyMatches.push("!=", pseudos);
        });
      }
      rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
      rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));
      hasCompare = rnative.test(docElem.compareDocumentPosition);
      contains = hasCompare || rnative.test(docElem.contains) ? function(a, b) {
        var adown = a.nodeType === 9 ? a.documentElement : a,
            bup = b && b.parentNode;
        return a === bup || !!(bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
      } : function(a, b) {
        if (b) {
          while ((b = b.parentNode)) {
            if (b === a) {
              return true;
            }
          }
        }
        return false;
      };
      sortOrder = hasCompare ? function(a, b) {
        if (a === b) {
          hasDuplicate = true;
          return 0;
        }
        var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
        if (compare) {
          return compare;
        }
        compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1;
        if (compare & 1 || (!support.sortDetached && b.compareDocumentPosition(a) === compare)) {
          if (a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a)) {
            return -1;
          }
          if (b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b)) {
            return 1;
          }
          return sortInput ? (indexOf(sortInput, a) - indexOf(sortInput, b)) : 0;
        }
        return compare & 4 ? -1 : 1;
      } : function(a, b) {
        if (a === b) {
          hasDuplicate = true;
          return 0;
        }
        var cur,
            i = 0,
            aup = a.parentNode,
            bup = b.parentNode,
            ap = [a],
            bp = [b];
        if (!aup || !bup) {
          return a === document ? -1 : b === document ? 1 : aup ? -1 : bup ? 1 : sortInput ? (indexOf(sortInput, a) - indexOf(sortInput, b)) : 0;
        } else if (aup === bup) {
          return siblingCheck(a, b);
        }
        cur = a;
        while ((cur = cur.parentNode)) {
          ap.unshift(cur);
        }
        cur = b;
        while ((cur = cur.parentNode)) {
          bp.unshift(cur);
        }
        while (ap[i] === bp[i]) {
          i++;
        }
        return i ? siblingCheck(ap[i], bp[i]) : ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0;
      };
      return document;
    };
    Sizzle.matches = function(expr, elements) {
      return Sizzle(expr, null, null, elements);
    };
    Sizzle.matchesSelector = function(elem, expr) {
      if ((elem.ownerDocument || elem) !== document) {
        setDocument(elem);
      }
      expr = expr.replace(rattributeQuotes, "='$1']");
      if (support.matchesSelector && documentIsHTML && !compilerCache[expr + " "] && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) {
        try {
          var ret = matches.call(elem, expr);
          if (ret || support.disconnectedMatch || elem.document && elem.document.nodeType !== 11) {
            return ret;
          }
        } catch (e) {}
      }
      return Sizzle(expr, document, null, [elem]).length > 0;
    };
    Sizzle.contains = function(context, elem) {
      if ((context.ownerDocument || context) !== document) {
        setDocument(context);
      }
      return contains(context, elem);
    };
    Sizzle.attr = function(elem, name) {
      if ((elem.ownerDocument || elem) !== document) {
        setDocument(elem);
      }
      var fn = Expr.attrHandle[name.toLowerCase()],
          val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : undefined;
      return val !== undefined ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
    };
    Sizzle.error = function(msg) {
      throw new Error("Syntax error, unrecognized expression: " + msg);
    };
    Sizzle.uniqueSort = function(results) {
      var elem,
          duplicates = [],
          j = 0,
          i = 0;
      hasDuplicate = !support.detectDuplicates;
      sortInput = !support.sortStable && results.slice(0);
      results.sort(sortOrder);
      if (hasDuplicate) {
        while ((elem = results[i++])) {
          if (elem === results[i]) {
            j = duplicates.push(i);
          }
        }
        while (j--) {
          results.splice(duplicates[j], 1);
        }
      }
      sortInput = null;
      return results;
    };
    getText = Sizzle.getText = function(elem) {
      var node,
          ret = "",
          i = 0,
          nodeType = elem.nodeType;
      if (!nodeType) {
        while ((node = elem[i++])) {
          ret += getText(node);
        }
      } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
        if (typeof elem.textContent === "string") {
          return elem.textContent;
        } else {
          for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
            ret += getText(elem);
          }
        }
      } else if (nodeType === 3 || nodeType === 4) {
        return elem.nodeValue;
      }
      return ret;
    };
    Expr = Sizzle.selectors = {
      cacheLength: 50,
      createPseudo: markFunction,
      match: matchExpr,
      attrHandle: {},
      find: {},
      relative: {
        ">": {
          dir: "parentNode",
          first: true
        },
        " ": {dir: "parentNode"},
        "+": {
          dir: "previousSibling",
          first: true
        },
        "~": {dir: "previousSibling"}
      },
      preFilter: {
        "ATTR": function(match) {
          match[1] = match[1].replace(runescape, funescape);
          match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape);
          if (match[2] === "~=") {
            match[3] = " " + match[3] + " ";
          }
          return match.slice(0, 4);
        },
        "CHILD": function(match) {
          match[1] = match[1].toLowerCase();
          if (match[1].slice(0, 3) === "nth") {
            if (!match[3]) {
              Sizzle.error(match[0]);
            }
            match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
            match[5] = +((match[7] + match[8]) || match[3] === "odd");
          } else if (match[3]) {
            Sizzle.error(match[0]);
          }
          return match;
        },
        "PSEUDO": function(match) {
          var excess,
              unquoted = !match[6] && match[2];
          if (matchExpr["CHILD"].test(match[0])) {
            return null;
          }
          if (match[3]) {
            match[2] = match[4] || match[5] || "";
          } else if (unquoted && rpseudo.test(unquoted) && (excess = tokenize(unquoted, true)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {
            match[0] = match[0].slice(0, excess);
            match[2] = unquoted.slice(0, excess);
          }
          return match.slice(0, 3);
        }
      },
      filter: {
        "TAG": function(nodeNameSelector) {
          var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
          return nodeNameSelector === "*" ? function() {
            return true;
          } : function(elem) {
            return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
          };
        },
        "CLASS": function(className) {
          var pattern = classCache[className + " "];
          return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function(elem) {
            return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "");
          });
        },
        "ATTR": function(name, operator, check) {
          return function(elem) {
            var result = Sizzle.attr(elem, name);
            if (result == null) {
              return operator === "!=";
            }
            if (!operator) {
              return true;
            }
            result += "";
            return operator === "=" ? result === check : operator === "!=" ? result !== check : operator === "^=" ? check && result.indexOf(check) === 0 : operator === "*=" ? check && result.indexOf(check) > -1 : operator === "$=" ? check && result.slice(-check.length) === check : operator === "~=" ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 : operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" : false;
          };
        },
        "CHILD": function(type, what, argument, first, last) {
          var simple = type.slice(0, 3) !== "nth",
              forward = type.slice(-4) !== "last",
              ofType = what === "of-type";
          return first === 1 && last === 0 ? function(elem) {
            return !!elem.parentNode;
          } : function(elem, context, xml) {
            var cache,
                uniqueCache,
                outerCache,
                node,
                nodeIndex,
                start,
                dir = simple !== forward ? "nextSibling" : "previousSibling",
                parent = elem.parentNode,
                name = ofType && elem.nodeName.toLowerCase(),
                useCache = !xml && !ofType,
                diff = false;
            if (parent) {
              if (simple) {
                while (dir) {
                  node = elem;
                  while ((node = node[dir])) {
                    if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) {
                      return false;
                    }
                  }
                  start = dir = type === "only" && !start && "nextSibling";
                }
                return true;
              }
              start = [forward ? parent.firstChild : parent.lastChild];
              if (forward && useCache) {
                node = parent;
                outerCache = node[expando] || (node[expando] = {});
                uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                cache = uniqueCache[type] || [];
                nodeIndex = cache[0] === dirruns && cache[1];
                diff = nodeIndex && cache[2];
                node = nodeIndex && parent.childNodes[nodeIndex];
                while ((node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop())) {
                  if (node.nodeType === 1 && ++diff && node === elem) {
                    uniqueCache[type] = [dirruns, nodeIndex, diff];
                    break;
                  }
                }
              } else {
                if (useCache) {
                  node = elem;
                  outerCache = node[expando] || (node[expando] = {});
                  uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                  cache = uniqueCache[type] || [];
                  nodeIndex = cache[0] === dirruns && cache[1];
                  diff = nodeIndex;
                }
                if (diff === false) {
                  while ((node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop())) {
                    if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {
                      if (useCache) {
                        outerCache = node[expando] || (node[expando] = {});
                        uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                        uniqueCache[type] = [dirruns, diff];
                      }
                      if (node === elem) {
                        break;
                      }
                    }
                  }
                }
              }
              diff -= last;
              return diff === first || (diff % first === 0 && diff / first >= 0);
            }
          };
        },
        "PSEUDO": function(pseudo, argument) {
          var args,
              fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);
          if (fn[expando]) {
            return fn(argument);
          }
          if (fn.length > 1) {
            args = [pseudo, pseudo, "", argument];
            return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches) {
              var idx,
                  matched = fn(seed, argument),
                  i = matched.length;
              while (i--) {
                idx = indexOf(seed, matched[i]);
                seed[idx] = !(matches[idx] = matched[i]);
              }
            }) : function(elem) {
              return fn(elem, 0, args);
            };
          }
          return fn;
        }
      },
      pseudos: {
        "not": markFunction(function(selector) {
          var input = [],
              results = [],
              matcher = compile(selector.replace(rtrim, "$1"));
          return matcher[expando] ? markFunction(function(seed, matches, context, xml) {
            var elem,
                unmatched = matcher(seed, null, xml, []),
                i = seed.length;
            while (i--) {
              if ((elem = unmatched[i])) {
                seed[i] = !(matches[i] = elem);
              }
            }
          }) : function(elem, context, xml) {
            input[0] = elem;
            matcher(input, null, xml, results);
            input[0] = null;
            return !results.pop();
          };
        }),
        "has": markFunction(function(selector) {
          return function(elem) {
            return Sizzle(selector, elem).length > 0;
          };
        }),
        "contains": markFunction(function(text) {
          text = text.replace(runescape, funescape);
          return function(elem) {
            return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
          };
        }),
        "lang": markFunction(function(lang) {
          if (!ridentifier.test(lang || "")) {
            Sizzle.error("unsupported lang: " + lang);
          }
          lang = lang.replace(runescape, funescape).toLowerCase();
          return function(elem) {
            var elemLang;
            do {
              if ((elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang"))) {
                elemLang = elemLang.toLowerCase();
                return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
              }
            } while ((elem = elem.parentNode) && elem.nodeType === 1);
            return false;
          };
        }),
        "target": function(elem) {
          var hash = window.location && window.location.hash;
          return hash && hash.slice(1) === elem.id;
        },
        "root": function(elem) {
          return elem === docElem;
        },
        "focus": function(elem) {
          return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
        },
        "enabled": function(elem) {
          return elem.disabled === false;
        },
        "disabled": function(elem) {
          return elem.disabled === true;
        },
        "checked": function(elem) {
          var nodeName = elem.nodeName.toLowerCase();
          return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
        },
        "selected": function(elem) {
          if (elem.parentNode) {
            elem.parentNode.selectedIndex;
          }
          return elem.selected === true;
        },
        "empty": function(elem) {
          for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
            if (elem.nodeType < 6) {
              return false;
            }
          }
          return true;
        },
        "parent": function(elem) {
          return !Expr.pseudos["empty"](elem);
        },
        "header": function(elem) {
          return rheader.test(elem.nodeName);
        },
        "input": function(elem) {
          return rinputs.test(elem.nodeName);
        },
        "button": function(elem) {
          var name = elem.nodeName.toLowerCase();
          return name === "input" && elem.type === "button" || name === "button";
        },
        "text": function(elem) {
          var attr;
          return elem.nodeName.toLowerCase() === "input" && elem.type === "text" && ((attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text");
        },
        "first": createPositionalPseudo(function() {
          return [0];
        }),
        "last": createPositionalPseudo(function(matchIndexes, length) {
          return [length - 1];
        }),
        "eq": createPositionalPseudo(function(matchIndexes, length, argument) {
          return [argument < 0 ? argument + length : argument];
        }),
        "even": createPositionalPseudo(function(matchIndexes, length) {
          var i = 0;
          for (; i < length; i += 2) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        }),
        "odd": createPositionalPseudo(function(matchIndexes, length) {
          var i = 1;
          for (; i < length; i += 2) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        }),
        "lt": createPositionalPseudo(function(matchIndexes, length, argument) {
          var i = argument < 0 ? argument + length : argument;
          for (; --i >= 0; ) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        }),
        "gt": createPositionalPseudo(function(matchIndexes, length, argument) {
          var i = argument < 0 ? argument + length : argument;
          for (; ++i < length; ) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        })
      }
    };
    Expr.pseudos["nth"] = Expr.pseudos["eq"];
    for (i in {
      radio: true,
      checkbox: true,
      file: true,
      password: true,
      image: true
    }) {
      Expr.pseudos[i] = createInputPseudo(i);
    }
    for (i in {
      submit: true,
      reset: true
    }) {
      Expr.pseudos[i] = createButtonPseudo(i);
    }
    function setFilters() {}
    setFilters.prototype = Expr.filters = Expr.pseudos;
    Expr.setFilters = new setFilters();
    tokenize = Sizzle.tokenize = function(selector, parseOnly) {
      var matched,
          match,
          tokens,
          type,
          soFar,
          groups,
          preFilters,
          cached = tokenCache[selector + " "];
      if (cached) {
        return parseOnly ? 0 : cached.slice(0);
      }
      soFar = selector;
      groups = [];
      preFilters = Expr.preFilter;
      while (soFar) {
        if (!matched || (match = rcomma.exec(soFar))) {
          if (match) {
            soFar = soFar.slice(match[0].length) || soFar;
          }
          groups.push((tokens = []));
        }
        matched = false;
        if ((match = rcombinators.exec(soFar))) {
          matched = match.shift();
          tokens.push({
            value: matched,
            type: match[0].replace(rtrim, " ")
          });
          soFar = soFar.slice(matched.length);
        }
        for (type in Expr.filter) {
          if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
            matched = match.shift();
            tokens.push({
              value: matched,
              type: type,
              matches: match
            });
            soFar = soFar.slice(matched.length);
          }
        }
        if (!matched) {
          break;
        }
      }
      return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0);
    };
    function toSelector(tokens) {
      var i = 0,
          len = tokens.length,
          selector = "";
      for (; i < len; i++) {
        selector += tokens[i].value;
      }
      return selector;
    }
    function addCombinator(matcher, combinator, base) {
      var dir = combinator.dir,
          checkNonElements = base && dir === "parentNode",
          doneName = done++;
      return combinator.first ? function(elem, context, xml) {
        while ((elem = elem[dir])) {
          if (elem.nodeType === 1 || checkNonElements) {
            return matcher(elem, context, xml);
          }
        }
      } : function(elem, context, xml) {
        var oldCache,
            uniqueCache,
            outerCache,
            newCache = [dirruns, doneName];
        if (xml) {
          while ((elem = elem[dir])) {
            if (elem.nodeType === 1 || checkNonElements) {
              if (matcher(elem, context, xml)) {
                return true;
              }
            }
          }
        } else {
          while ((elem = elem[dir])) {
            if (elem.nodeType === 1 || checkNonElements) {
              outerCache = elem[expando] || (elem[expando] = {});
              uniqueCache = outerCache[elem.uniqueID] || (outerCache[elem.uniqueID] = {});
              if ((oldCache = uniqueCache[dir]) && oldCache[0] === dirruns && oldCache[1] === doneName) {
                return (newCache[2] = oldCache[2]);
              } else {
                uniqueCache[dir] = newCache;
                if ((newCache[2] = matcher(elem, context, xml))) {
                  return true;
                }
              }
            }
          }
        }
      };
    }
    function elementMatcher(matchers) {
      return matchers.length > 1 ? function(elem, context, xml) {
        var i = matchers.length;
        while (i--) {
          if (!matchers[i](elem, context, xml)) {
            return false;
          }
        }
        return true;
      } : matchers[0];
    }
    function multipleContexts(selector, contexts, results) {
      var i = 0,
          len = contexts.length;
      for (; i < len; i++) {
        Sizzle(selector, contexts[i], results);
      }
      return results;
    }
    function condense(unmatched, map, filter, context, xml) {
      var elem,
          newUnmatched = [],
          i = 0,
          len = unmatched.length,
          mapped = map != null;
      for (; i < len; i++) {
        if ((elem = unmatched[i])) {
          if (!filter || filter(elem, context, xml)) {
            newUnmatched.push(elem);
            if (mapped) {
              map.push(i);
            }
          }
        }
      }
      return newUnmatched;
    }
    function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
      if (postFilter && !postFilter[expando]) {
        postFilter = setMatcher(postFilter);
      }
      if (postFinder && !postFinder[expando]) {
        postFinder = setMatcher(postFinder, postSelector);
      }
      return markFunction(function(seed, results, context, xml) {
        var temp,
            i,
            elem,
            preMap = [],
            postMap = [],
            preexisting = results.length,
            elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),
            matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems,
            matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn;
        if (matcher) {
          matcher(matcherIn, matcherOut, context, xml);
        }
        if (postFilter) {
          temp = condense(matcherOut, postMap);
          postFilter(temp, [], context, xml);
          i = temp.length;
          while (i--) {
            if ((elem = temp[i])) {
              matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
            }
          }
        }
        if (seed) {
          if (postFinder || preFilter) {
            if (postFinder) {
              temp = [];
              i = matcherOut.length;
              while (i--) {
                if ((elem = matcherOut[i])) {
                  temp.push((matcherIn[i] = elem));
                }
              }
              postFinder(null, (matcherOut = []), temp, xml);
            }
            i = matcherOut.length;
            while (i--) {
              if ((elem = matcherOut[i]) && (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1) {
                seed[temp] = !(results[temp] = elem);
              }
            }
          }
        } else {
          matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);
          if (postFinder) {
            postFinder(null, results, matcherOut, xml);
          } else {
            push.apply(results, matcherOut);
          }
        }
      });
    }
    function matcherFromTokens(tokens) {
      var checkContext,
          matcher,
          j,
          len = tokens.length,
          leadingRelative = Expr.relative[tokens[0].type],
          implicitRelative = leadingRelative || Expr.relative[" "],
          i = leadingRelative ? 1 : 0,
          matchContext = addCombinator(function(elem) {
            return elem === checkContext;
          }, implicitRelative, true),
          matchAnyContext = addCombinator(function(elem) {
            return indexOf(checkContext, elem) > -1;
          }, implicitRelative, true),
          matchers = [function(elem, context, xml) {
            var ret = (!leadingRelative && (xml || context !== outermostContext)) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
            checkContext = null;
            return ret;
          }];
      for (; i < len; i++) {
        if ((matcher = Expr.relative[tokens[i].type])) {
          matchers = [addCombinator(elementMatcher(matchers), matcher)];
        } else {
          matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);
          if (matcher[expando]) {
            j = ++i;
            for (; j < len; j++) {
              if (Expr.relative[tokens[j].type]) {
                break;
              }
            }
            return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(tokens.slice(0, i - 1).concat({value: tokens[i - 2].type === " " ? "*" : ""})).replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens((tokens = tokens.slice(j))), j < len && toSelector(tokens));
          }
          matchers.push(matcher);
        }
      }
      return elementMatcher(matchers);
    }
    function matcherFromGroupMatchers(elementMatchers, setMatchers) {
      var bySet = setMatchers.length > 0,
          byElement = elementMatchers.length > 0,
          superMatcher = function(seed, context, xml, results, outermost) {
            var elem,
                j,
                matcher,
                matchedCount = 0,
                i = "0",
                unmatched = seed && [],
                setMatched = [],
                contextBackup = outermostContext,
                elems = seed || byElement && Expr.find["TAG"]("*", outermost),
                dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
                len = elems.length;
            if (outermost) {
              outermostContext = context === document || context || outermost;
            }
            for (; i !== len && (elem = elems[i]) != null; i++) {
              if (byElement && elem) {
                j = 0;
                if (!context && elem.ownerDocument !== document) {
                  setDocument(elem);
                  xml = !documentIsHTML;
                }
                while ((matcher = elementMatchers[j++])) {
                  if (matcher(elem, context || document, xml)) {
                    results.push(elem);
                    break;
                  }
                }
                if (outermost) {
                  dirruns = dirrunsUnique;
                }
              }
              if (bySet) {
                if ((elem = !matcher && elem)) {
                  matchedCount--;
                }
                if (seed) {
                  unmatched.push(elem);
                }
              }
            }
            matchedCount += i;
            if (bySet && i !== matchedCount) {
              j = 0;
              while ((matcher = setMatchers[j++])) {
                matcher(unmatched, setMatched, context, xml);
              }
              if (seed) {
                if (matchedCount > 0) {
                  while (i--) {
                    if (!(unmatched[i] || setMatched[i])) {
                      setMatched[i] = pop.call(results);
                    }
                  }
                }
                setMatched = condense(setMatched);
              }
              push.apply(results, setMatched);
              if (outermost && !seed && setMatched.length > 0 && (matchedCount + setMatchers.length) > 1) {
                Sizzle.uniqueSort(results);
              }
            }
            if (outermost) {
              dirruns = dirrunsUnique;
              outermostContext = contextBackup;
            }
            return unmatched;
          };
      return bySet ? markFunction(superMatcher) : superMatcher;
    }
    compile = Sizzle.compile = function(selector, match) {
      var i,
          setMatchers = [],
          elementMatchers = [],
          cached = compilerCache[selector + " "];
      if (!cached) {
        if (!match) {
          match = tokenize(selector);
        }
        i = match.length;
        while (i--) {
          cached = matcherFromTokens(match[i]);
          if (cached[expando]) {
            setMatchers.push(cached);
          } else {
            elementMatchers.push(cached);
          }
        }
        cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));
        cached.selector = selector;
      }
      return cached;
    };
    select = Sizzle.select = function(selector, context, results, seed) {
      var i,
          tokens,
          token,
          type,
          find,
          compiled = typeof selector === "function" && selector,
          match = !seed && tokenize((selector = compiled.selector || selector));
      results = results || [];
      if (match.length === 1) {
        tokens = match[0] = match[0].slice(0);
        if (tokens.length > 2 && (token = tokens[0]).type === "ID" && support.getById && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {
          context = (Expr.find["ID"](token.matches[0].replace(runescape, funescape), context) || [])[0];
          if (!context) {
            return results;
          } else if (compiled) {
            context = context.parentNode;
          }
          selector = selector.slice(tokens.shift().value.length);
        }
        i = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;
        while (i--) {
          token = tokens[i];
          if (Expr.relative[(type = token.type)]) {
            break;
          }
          if ((find = Expr.find[type])) {
            if ((seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context))) {
              tokens.splice(i, 1);
              selector = seed.length && toSelector(tokens);
              if (!selector) {
                push.apply(results, seed);
                return results;
              }
              break;
            }
          }
        }
      }
      (compiled || compile(selector, match))(seed, context, !documentIsHTML, results, !context || rsibling.test(selector) && testContext(context.parentNode) || context);
      return results;
    };
    support.sortStable = expando.split("").sort(sortOrder).join("") === expando;
    support.detectDuplicates = !!hasDuplicate;
    setDocument();
    support.sortDetached = assert(function(div1) {
      return div1.compareDocumentPosition(document.createElement("div")) & 1;
    });
    if (!assert(function(div) {
      div.innerHTML = "<a href='#'></a>";
      return div.firstChild.getAttribute("href") === "#";
    })) {
      addHandle("type|href|height|width", function(elem, name, isXML) {
        if (!isXML) {
          return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2);
        }
      });
    }
    if (!support.attributes || !assert(function(div) {
      div.innerHTML = "<input/>";
      div.firstChild.setAttribute("value", "");
      return div.firstChild.getAttribute("value") === "";
    })) {
      addHandle("value", function(elem, name, isXML) {
        if (!isXML && elem.nodeName.toLowerCase() === "input") {
          return elem.defaultValue;
        }
      });
    }
    if (!assert(function(div) {
      return div.getAttribute("disabled") == null;
    })) {
      addHandle(booleans, function(elem, name, isXML) {
        var val;
        if (!isXML) {
          return elem[name] === true ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
        }
      });
    }
    return Sizzle;
  })(window);
  jQuery.find = Sizzle;
  jQuery.expr = Sizzle.selectors;
  jQuery.expr[":"] = jQuery.expr.pseudos;
  jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
  jQuery.text = Sizzle.getText;
  jQuery.isXMLDoc = Sizzle.isXML;
  jQuery.contains = Sizzle.contains;
  var dir = function(elem, dir, until) {
    var matched = [],
        truncate = until !== undefined;
    while ((elem = elem[dir]) && elem.nodeType !== 9) {
      if (elem.nodeType === 1) {
        if (truncate && jQuery(elem).is(until)) {
          break;
        }
        matched.push(elem);
      }
    }
    return matched;
  };
  var siblings = function(n, elem) {
    var matched = [];
    for (; n; n = n.nextSibling) {
      if (n.nodeType === 1 && n !== elem) {
        matched.push(n);
      }
    }
    return matched;
  };
  var rneedsContext = jQuery.expr.match.needsContext;
  var rsingleTag = (/^<([\w-]+)\s*\/?>(?:<\/\1>|)$/);
  var risSimple = /^.[^:#\[\.,]*$/;
  function winnow(elements, qualifier, not) {
    if (jQuery.isFunction(qualifier)) {
      return jQuery.grep(elements, function(elem, i) {
        return !!qualifier.call(elem, i, elem) !== not;
      });
    }
    if (qualifier.nodeType) {
      return jQuery.grep(elements, function(elem) {
        return (elem === qualifier) !== not;
      });
    }
    if (typeof qualifier === "string") {
      if (risSimple.test(qualifier)) {
        return jQuery.filter(qualifier, elements, not);
      }
      qualifier = jQuery.filter(qualifier, elements);
    }
    return jQuery.grep(elements, function(elem) {
      return (indexOf.call(qualifier, elem) > -1) !== not;
    });
  }
  jQuery.filter = function(expr, elems, not) {
    var elem = elems[0];
    if (not) {
      expr = ":not(" + expr + ")";
    }
    return elems.length === 1 && elem.nodeType === 1 ? jQuery.find.matchesSelector(elem, expr) ? [elem] : [] : jQuery.find.matches(expr, jQuery.grep(elems, function(elem) {
      return elem.nodeType === 1;
    }));
  };
  jQuery.fn.extend({
    find: function(selector) {
      var i,
          len = this.length,
          ret = [],
          self = this;
      if (typeof selector !== "string") {
        return this.pushStack(jQuery(selector).filter(function() {
          for (i = 0; i < len; i++) {
            if (jQuery.contains(self[i], this)) {
              return true;
            }
          }
        }));
      }
      for (i = 0; i < len; i++) {
        jQuery.find(selector, self[i], ret);
      }
      ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret);
      ret.selector = this.selector ? this.selector + " " + selector : selector;
      return ret;
    },
    filter: function(selector) {
      return this.pushStack(winnow(this, selector || [], false));
    },
    not: function(selector) {
      return this.pushStack(winnow(this, selector || [], true));
    },
    is: function(selector) {
      return !!winnow(this, typeof selector === "string" && rneedsContext.test(selector) ? jQuery(selector) : selector || [], false).length;
    }
  });
  var rootjQuery,
      rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
      init = jQuery.fn.init = function(selector, context, root) {
        var match,
            elem;
        if (!selector) {
          return this;
        }
        root = root || rootjQuery;
        if (typeof selector === "string") {
          if (selector[0] === "<" && selector[selector.length - 1] === ">" && selector.length >= 3) {
            match = [null, selector, null];
          } else {
            match = rquickExpr.exec(selector);
          }
          if (match && (match[1] || !context)) {
            if (match[1]) {
              context = context instanceof jQuery ? context[0] : context;
              jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true));
              if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
                for (match in context) {
                  if (jQuery.isFunction(this[match])) {
                    this[match](context[match]);
                  } else {
                    this.attr(match, context[match]);
                  }
                }
              }
              return this;
            } else {
              elem = document.getElementById(match[2]);
              if (elem && elem.parentNode) {
                this.length = 1;
                this[0] = elem;
              }
              this.context = document;
              this.selector = selector;
              return this;
            }
          } else if (!context || context.jquery) {
            return (context || root).find(selector);
          } else {
            return this.constructor(context).find(selector);
          }
        } else if (selector.nodeType) {
          this.context = this[0] = selector;
          this.length = 1;
          return this;
        } else if (jQuery.isFunction(selector)) {
          return root.ready !== undefined ? root.ready(selector) : selector(jQuery);
        }
        if (selector.selector !== undefined) {
          this.selector = selector.selector;
          this.context = selector.context;
        }
        return jQuery.makeArray(selector, this);
      };
  init.prototype = jQuery.fn;
  rootjQuery = jQuery(document);
  var rparentsprev = /^(?:parents|prev(?:Until|All))/,
      guaranteedUnique = {
        children: true,
        contents: true,
        next: true,
        prev: true
      };
  jQuery.fn.extend({
    has: function(target) {
      var targets = jQuery(target, this),
          l = targets.length;
      return this.filter(function() {
        var i = 0;
        for (; i < l; i++) {
          if (jQuery.contains(this, targets[i])) {
            return true;
          }
        }
      });
    },
    closest: function(selectors, context) {
      var cur,
          i = 0,
          l = this.length,
          matched = [],
          pos = rneedsContext.test(selectors) || typeof selectors !== "string" ? jQuery(selectors, context || this.context) : 0;
      for (; i < l; i++) {
        for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
          if (cur.nodeType < 11 && (pos ? pos.index(cur) > -1 : cur.nodeType === 1 && jQuery.find.matchesSelector(cur, selectors))) {
            matched.push(cur);
            break;
          }
        }
      }
      return this.pushStack(matched.length > 1 ? jQuery.uniqueSort(matched) : matched);
    },
    index: function(elem) {
      if (!elem) {
        return (this[0] && this[0].parentNode) ? this.first().prevAll().length : -1;
      }
      if (typeof elem === "string") {
        return indexOf.call(jQuery(elem), this[0]);
      }
      return indexOf.call(this, elem.jquery ? elem[0] : elem);
    },
    add: function(selector, context) {
      return this.pushStack(jQuery.uniqueSort(jQuery.merge(this.get(), jQuery(selector, context))));
    },
    addBack: function(selector) {
      return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector));
    }
  });
  function sibling(cur, dir) {
    while ((cur = cur[dir]) && cur.nodeType !== 1) {}
    return cur;
  }
  jQuery.each({
    parent: function(elem) {
      var parent = elem.parentNode;
      return parent && parent.nodeType !== 11 ? parent : null;
    },
    parents: function(elem) {
      return dir(elem, "parentNode");
    },
    parentsUntil: function(elem, i, until) {
      return dir(elem, "parentNode", until);
    },
    next: function(elem) {
      return sibling(elem, "nextSibling");
    },
    prev: function(elem) {
      return sibling(elem, "previousSibling");
    },
    nextAll: function(elem) {
      return dir(elem, "nextSibling");
    },
    prevAll: function(elem) {
      return dir(elem, "previousSibling");
    },
    nextUntil: function(elem, i, until) {
      return dir(elem, "nextSibling", until);
    },
    prevUntil: function(elem, i, until) {
      return dir(elem, "previousSibling", until);
    },
    siblings: function(elem) {
      return siblings((elem.parentNode || {}).firstChild, elem);
    },
    children: function(elem) {
      return siblings(elem.firstChild);
    },
    contents: function(elem) {
      return elem.contentDocument || jQuery.merge([], elem.childNodes);
    }
  }, function(name, fn) {
    jQuery.fn[name] = function(until, selector) {
      var matched = jQuery.map(this, fn, until);
      if (name.slice(-5) !== "Until") {
        selector = until;
      }
      if (selector && typeof selector === "string") {
        matched = jQuery.filter(selector, matched);
      }
      if (this.length > 1) {
        if (!guaranteedUnique[name]) {
          jQuery.uniqueSort(matched);
        }
        if (rparentsprev.test(name)) {
          matched.reverse();
        }
      }
      return this.pushStack(matched);
    };
  });
  var rnotwhite = (/\S+/g);
  function createOptions(options) {
    var object = {};
    jQuery.each(options.match(rnotwhite) || [], function(_, flag) {
      object[flag] = true;
    });
    return object;
  }
  jQuery.Callbacks = function(options) {
    options = typeof options === "string" ? createOptions(options) : jQuery.extend({}, options);
    var firing,
        memory,
        fired,
        locked,
        list = [],
        queue = [],
        firingIndex = -1,
        fire = function() {
          locked = options.once;
          fired = firing = true;
          for (; queue.length; firingIndex = -1) {
            memory = queue.shift();
            while (++firingIndex < list.length) {
              if (list[firingIndex].apply(memory[0], memory[1]) === false && options.stopOnFalse) {
                firingIndex = list.length;
                memory = false;
              }
            }
          }
          if (!options.memory) {
            memory = false;
          }
          firing = false;
          if (locked) {
            if (memory) {
              list = [];
            } else {
              list = "";
            }
          }
        },
        self = {
          add: function() {
            if (list) {
              if (memory && !firing) {
                firingIndex = list.length - 1;
                queue.push(memory);
              }
              (function add(args) {
                jQuery.each(args, function(_, arg) {
                  if (jQuery.isFunction(arg)) {
                    if (!options.unique || !self.has(arg)) {
                      list.push(arg);
                    }
                  } else if (arg && arg.length && jQuery.type(arg) !== "string") {
                    add(arg);
                  }
                });
              })(arguments);
              if (memory && !firing) {
                fire();
              }
            }
            return this;
          },
          remove: function() {
            jQuery.each(arguments, function(_, arg) {
              var index;
              while ((index = jQuery.inArray(arg, list, index)) > -1) {
                list.splice(index, 1);
                if (index <= firingIndex) {
                  firingIndex--;
                }
              }
            });
            return this;
          },
          has: function(fn) {
            return fn ? jQuery.inArray(fn, list) > -1 : list.length > 0;
          },
          empty: function() {
            if (list) {
              list = [];
            }
            return this;
          },
          disable: function() {
            locked = queue = [];
            list = memory = "";
            return this;
          },
          disabled: function() {
            return !list;
          },
          lock: function() {
            locked = queue = [];
            if (!memory) {
              list = memory = "";
            }
            return this;
          },
          locked: function() {
            return !!locked;
          },
          fireWith: function(context, args) {
            if (!locked) {
              args = args || [];
              args = [context, args.slice ? args.slice() : args];
              queue.push(args);
              if (!firing) {
                fire();
              }
            }
            return this;
          },
          fire: function() {
            self.fireWith(this, arguments);
            return this;
          },
          fired: function() {
            return !!fired;
          }
        };
    return self;
  };
  jQuery.extend({
    Deferred: function(func) {
      var tuples = [["resolve", "done", jQuery.Callbacks("once memory"), "resolved"], ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"], ["notify", "progress", jQuery.Callbacks("memory")]],
          state = "pending",
          promise = {
            state: function() {
              return state;
            },
            always: function() {
              deferred.done(arguments).fail(arguments);
              return this;
            },
            then: function() {
              var fns = arguments;
              return jQuery.Deferred(function(newDefer) {
                jQuery.each(tuples, function(i, tuple) {
                  var fn = jQuery.isFunction(fns[i]) && fns[i];
                  deferred[tuple[1]](function() {
                    var returned = fn && fn.apply(this, arguments);
                    if (returned && jQuery.isFunction(returned.promise)) {
                      returned.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject);
                    } else {
                      newDefer[tuple[0] + "With"](this === promise ? newDefer.promise() : this, fn ? [returned] : arguments);
                    }
                  });
                });
                fns = null;
              }).promise();
            },
            promise: function(obj) {
              return obj != null ? jQuery.extend(obj, promise) : promise;
            }
          },
          deferred = {};
      promise.pipe = promise.then;
      jQuery.each(tuples, function(i, tuple) {
        var list = tuple[2],
            stateString = tuple[3];
        promise[tuple[1]] = list.add;
        if (stateString) {
          list.add(function() {
            state = stateString;
          }, tuples[i ^ 1][2].disable, tuples[2][2].lock);
        }
        deferred[tuple[0]] = function() {
          deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments);
          return this;
        };
        deferred[tuple[0] + "With"] = list.fireWith;
      });
      promise.promise(deferred);
      if (func) {
        func.call(deferred, deferred);
      }
      return deferred;
    },
    when: function(subordinate) {
      var i = 0,
          resolveValues = slice.call(arguments),
          length = resolveValues.length,
          remaining = length !== 1 || (subordinate && jQuery.isFunction(subordinate.promise)) ? length : 0,
          deferred = remaining === 1 ? subordinate : jQuery.Deferred(),
          updateFunc = function(i, contexts, values) {
            return function(value) {
              contexts[i] = this;
              values[i] = arguments.length > 1 ? slice.call(arguments) : value;
              if (values === progressValues) {
                deferred.notifyWith(contexts, values);
              } else if (!(--remaining)) {
                deferred.resolveWith(contexts, values);
              }
            };
          },
          progressValues,
          progressContexts,
          resolveContexts;
      if (length > 1) {
        progressValues = new Array(length);
        progressContexts = new Array(length);
        resolveContexts = new Array(length);
        for (; i < length; i++) {
          if (resolveValues[i] && jQuery.isFunction(resolveValues[i].promise)) {
            resolveValues[i].promise().progress(updateFunc(i, progressContexts, progressValues)).done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject);
          } else {
            --remaining;
          }
        }
      }
      if (!remaining) {
        deferred.resolveWith(resolveContexts, resolveValues);
      }
      return deferred.promise();
    }
  });
  var readyList;
  jQuery.fn.ready = function(fn) {
    jQuery.ready.promise().done(fn);
    return this;
  };
  jQuery.extend({
    isReady: false,
    readyWait: 1,
    holdReady: function(hold) {
      if (hold) {
        jQuery.readyWait++;
      } else {
        jQuery.ready(true);
      }
    },
    ready: function(wait) {
      if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
        return;
      }
      jQuery.isReady = true;
      if (wait !== true && --jQuery.readyWait > 0) {
        return;
      }
      readyList.resolveWith(document, [jQuery]);
      if (jQuery.fn.triggerHandler) {
        jQuery(document).triggerHandler("ready");
        jQuery(document).off("ready");
      }
    }
  });
  function completed() {
    document.removeEventListener("DOMContentLoaded", completed);
    window.removeEventListener("load", completed);
    jQuery.ready();
  }
  jQuery.ready.promise = function(obj) {
    if (!readyList) {
      readyList = jQuery.Deferred();
      if (document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll)) {
        window.setTimeout(jQuery.ready);
      } else {
        document.addEventListener("DOMContentLoaded", completed);
        window.addEventListener("load", completed);
      }
    }
    return readyList.promise(obj);
  };
  jQuery.ready.promise();
  var access = function(elems, fn, key, value, chainable, emptyGet, raw) {
    var i = 0,
        len = elems.length,
        bulk = key == null;
    if (jQuery.type(key) === "object") {
      chainable = true;
      for (i in key) {
        access(elems, fn, i, key[i], true, emptyGet, raw);
      }
    } else if (value !== undefined) {
      chainable = true;
      if (!jQuery.isFunction(value)) {
        raw = true;
      }
      if (bulk) {
        if (raw) {
          fn.call(elems, value);
          fn = null;
        } else {
          bulk = fn;
          fn = function(elem, key, value) {
            return bulk.call(jQuery(elem), value);
          };
        }
      }
      if (fn) {
        for (; i < len; i++) {
          fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
        }
      }
    }
    return chainable ? elems : bulk ? fn.call(elems) : len ? fn(elems[0], key) : emptyGet;
  };
  var acceptData = function(owner) {
    return owner.nodeType === 1 || owner.nodeType === 9 || !(+owner.nodeType);
  };
  function Data() {
    this.expando = jQuery.expando + Data.uid++;
  }
  Data.uid = 1;
  Data.prototype = {
    register: function(owner, initial) {
      var value = initial || {};
      if (owner.nodeType) {
        owner[this.expando] = value;
      } else {
        Object.defineProperty(owner, this.expando, {
          value: value,
          writable: true,
          configurable: true
        });
      }
      return owner[this.expando];
    },
    cache: function(owner) {
      if (!acceptData(owner)) {
        return {};
      }
      var value = owner[this.expando];
      if (!value) {
        value = {};
        if (acceptData(owner)) {
          if (owner.nodeType) {
            owner[this.expando] = value;
          } else {
            Object.defineProperty(owner, this.expando, {
              value: value,
              configurable: true
            });
          }
        }
      }
      return value;
    },
    set: function(owner, data, value) {
      var prop,
          cache = this.cache(owner);
      if (typeof data === "string") {
        cache[data] = value;
      } else {
        for (prop in data) {
          cache[prop] = data[prop];
        }
      }
      return cache;
    },
    get: function(owner, key) {
      return key === undefined ? this.cache(owner) : owner[this.expando] && owner[this.expando][key];
    },
    access: function(owner, key, value) {
      var stored;
      if (key === undefined || ((key && typeof key === "string") && value === undefined)) {
        stored = this.get(owner, key);
        return stored !== undefined ? stored : this.get(owner, jQuery.camelCase(key));
      }
      this.set(owner, key, value);
      return value !== undefined ? value : key;
    },
    remove: function(owner, key) {
      var i,
          name,
          camel,
          cache = owner[this.expando];
      if (cache === undefined) {
        return;
      }
      if (key === undefined) {
        this.register(owner);
      } else {
        if (jQuery.isArray(key)) {
          name = key.concat(key.map(jQuery.camelCase));
        } else {
          camel = jQuery.camelCase(key);
          if (key in cache) {
            name = [key, camel];
          } else {
            name = camel;
            name = name in cache ? [name] : (name.match(rnotwhite) || []);
          }
        }
        i = name.length;
        while (i--) {
          delete cache[name[i]];
        }
      }
      if (key === undefined || jQuery.isEmptyObject(cache)) {
        if (owner.nodeType) {
          owner[this.expando] = undefined;
        } else {
          delete owner[this.expando];
        }
      }
    },
    hasData: function(owner) {
      var cache = owner[this.expando];
      return cache !== undefined && !jQuery.isEmptyObject(cache);
    }
  };
  var dataPriv = new Data();
  var dataUser = new Data();
  var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
      rmultiDash = /[A-Z]/g;
  function dataAttr(elem, key, data) {
    var name;
    if (data === undefined && elem.nodeType === 1) {
      name = "data-" + key.replace(rmultiDash, "-$&").toLowerCase();
      data = elem.getAttribute(name);
      if (typeof data === "string") {
        try {
          data = data === "true" ? true : data === "false" ? false : data === "null" ? null : +data + "" === data ? +data : rbrace.test(data) ? jQuery.parseJSON(data) : data;
        } catch (e) {}
        dataUser.set(elem, key, data);
      } else {
        data = undefined;
      }
    }
    return data;
  }
  jQuery.extend({
    hasData: function(elem) {
      return dataUser.hasData(elem) || dataPriv.hasData(elem);
    },
    data: function(elem, name, data) {
      return dataUser.access(elem, name, data);
    },
    removeData: function(elem, name) {
      dataUser.remove(elem, name);
    },
    _data: function(elem, name, data) {
      return dataPriv.access(elem, name, data);
    },
    _removeData: function(elem, name) {
      dataPriv.remove(elem, name);
    }
  });
  jQuery.fn.extend({
    data: function(key, value) {
      var i,
          name,
          data,
          elem = this[0],
          attrs = elem && elem.attributes;
      if (key === undefined) {
        if (this.length) {
          data = dataUser.get(elem);
          if (elem.nodeType === 1 && !dataPriv.get(elem, "hasDataAttrs")) {
            i = attrs.length;
            while (i--) {
              if (attrs[i]) {
                name = attrs[i].name;
                if (name.indexOf("data-") === 0) {
                  name = jQuery.camelCase(name.slice(5));
                  dataAttr(elem, name, data[name]);
                }
              }
            }
            dataPriv.set(elem, "hasDataAttrs", true);
          }
        }
        return data;
      }
      if (typeof key === "object") {
        return this.each(function() {
          dataUser.set(this, key);
        });
      }
      return access(this, function(value) {
        var data,
            camelKey;
        if (elem && value === undefined) {
          data = dataUser.get(elem, key) || dataUser.get(elem, key.replace(rmultiDash, "-$&").toLowerCase());
          if (data !== undefined) {
            return data;
          }
          camelKey = jQuery.camelCase(key);
          data = dataUser.get(elem, camelKey);
          if (data !== undefined) {
            return data;
          }
          data = dataAttr(elem, camelKey, undefined);
          if (data !== undefined) {
            return data;
          }
          return;
        }
        camelKey = jQuery.camelCase(key);
        this.each(function() {
          var data = dataUser.get(this, camelKey);
          dataUser.set(this, camelKey, value);
          if (key.indexOf("-") > -1 && data !== undefined) {
            dataUser.set(this, key, value);
          }
        });
      }, null, value, arguments.length > 1, null, true);
    },
    removeData: function(key) {
      return this.each(function() {
        dataUser.remove(this, key);
      });
    }
  });
  jQuery.extend({
    queue: function(elem, type, data) {
      var queue;
      if (elem) {
        type = (type || "fx") + "queue";
        queue = dataPriv.get(elem, type);
        if (data) {
          if (!queue || jQuery.isArray(data)) {
            queue = dataPriv.access(elem, type, jQuery.makeArray(data));
          } else {
            queue.push(data);
          }
        }
        return queue || [];
      }
    },
    dequeue: function(elem, type) {
      type = type || "fx";
      var queue = jQuery.queue(elem, type),
          startLength = queue.length,
          fn = queue.shift(),
          hooks = jQuery._queueHooks(elem, type),
          next = function() {
            jQuery.dequeue(elem, type);
          };
      if (fn === "inprogress") {
        fn = queue.shift();
        startLength--;
      }
      if (fn) {
        if (type === "fx") {
          queue.unshift("inprogress");
        }
        delete hooks.stop;
        fn.call(elem, next, hooks);
      }
      if (!startLength && hooks) {
        hooks.empty.fire();
      }
    },
    _queueHooks: function(elem, type) {
      var key = type + "queueHooks";
      return dataPriv.get(elem, key) || dataPriv.access(elem, key, {empty: jQuery.Callbacks("once memory").add(function() {
          dataPriv.remove(elem, [type + "queue", key]);
        })});
    }
  });
  jQuery.fn.extend({
    queue: function(type, data) {
      var setter = 2;
      if (typeof type !== "string") {
        data = type;
        type = "fx";
        setter--;
      }
      if (arguments.length < setter) {
        return jQuery.queue(this[0], type);
      }
      return data === undefined ? this : this.each(function() {
        var queue = jQuery.queue(this, type, data);
        jQuery._queueHooks(this, type);
        if (type === "fx" && queue[0] !== "inprogress") {
          jQuery.dequeue(this, type);
        }
      });
    },
    dequeue: function(type) {
      return this.each(function() {
        jQuery.dequeue(this, type);
      });
    },
    clearQueue: function(type) {
      return this.queue(type || "fx", []);
    },
    promise: function(type, obj) {
      var tmp,
          count = 1,
          defer = jQuery.Deferred(),
          elements = this,
          i = this.length,
          resolve = function() {
            if (!(--count)) {
              defer.resolveWith(elements, [elements]);
            }
          };
      if (typeof type !== "string") {
        obj = type;
        type = undefined;
      }
      type = type || "fx";
      while (i--) {
        tmp = dataPriv.get(elements[i], type + "queueHooks");
        if (tmp && tmp.empty) {
          count++;
          tmp.empty.add(resolve);
        }
      }
      resolve();
      return defer.promise(obj);
    }
  });
  var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;
  var rcssNum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i");
  var cssExpand = ["Top", "Right", "Bottom", "Left"];
  var isHidden = function(elem, el) {
    elem = el || elem;
    return jQuery.css(elem, "display") === "none" || !jQuery.contains(elem.ownerDocument, elem);
  };
  function adjustCSS(elem, prop, valueParts, tween) {
    var adjusted,
        scale = 1,
        maxIterations = 20,
        currentValue = tween ? function() {
          return tween.cur();
        } : function() {
          return jQuery.css(elem, prop, "");
        },
        initial = currentValue(),
        unit = valueParts && valueParts[3] || (jQuery.cssNumber[prop] ? "" : "px"),
        initialInUnit = (jQuery.cssNumber[prop] || unit !== "px" && +initial) && rcssNum.exec(jQuery.css(elem, prop));
    if (initialInUnit && initialInUnit[3] !== unit) {
      unit = unit || initialInUnit[3];
      valueParts = valueParts || [];
      initialInUnit = +initial || 1;
      do {
        scale = scale || ".5";
        initialInUnit = initialInUnit / scale;
        jQuery.style(elem, prop, initialInUnit + unit);
      } while (scale !== (scale = currentValue() / initial) && scale !== 1 && --maxIterations);
    }
    if (valueParts) {
      initialInUnit = +initialInUnit || +initial || 0;
      adjusted = valueParts[1] ? initialInUnit + (valueParts[1] + 1) * valueParts[2] : +valueParts[2];
      if (tween) {
        tween.unit = unit;
        tween.start = initialInUnit;
        tween.end = adjusted;
      }
    }
    return adjusted;
  }
  var rcheckableType = (/^(?:checkbox|radio)$/i);
  var rtagName = (/<([\w:-]+)/);
  var rscriptType = (/^$|\/(?:java|ecma)script/i);
  var wrapMap = {
    option: [1, "<select multiple='multiple'>", "</select>"],
    thead: [1, "<table>", "</table>"],
    col: [2, "<table><colgroup>", "</colgroup></table>"],
    tr: [2, "<table><tbody>", "</tbody></table>"],
    td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
    _default: [0, "", ""]
  };
  wrapMap.optgroup = wrapMap.option;
  wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
  wrapMap.th = wrapMap.td;
  function getAll(context, tag) {
    var ret = typeof context.getElementsByTagName !== "undefined" ? context.getElementsByTagName(tag || "*") : typeof context.querySelectorAll !== "undefined" ? context.querySelectorAll(tag || "*") : [];
    return tag === undefined || tag && jQuery.nodeName(context, tag) ? jQuery.merge([context], ret) : ret;
  }
  function setGlobalEval(elems, refElements) {
    var i = 0,
        l = elems.length;
    for (; i < l; i++) {
      dataPriv.set(elems[i], "globalEval", !refElements || dataPriv.get(refElements[i], "globalEval"));
    }
  }
  var rhtml = /<|&#?\w+;/;
  function buildFragment(elems, context, scripts, selection, ignored) {
    var elem,
        tmp,
        tag,
        wrap,
        contains,
        j,
        fragment = context.createDocumentFragment(),
        nodes = [],
        i = 0,
        l = elems.length;
    for (; i < l; i++) {
      elem = elems[i];
      if (elem || elem === 0) {
        if (jQuery.type(elem) === "object") {
          jQuery.merge(nodes, elem.nodeType ? [elem] : elem);
        } else if (!rhtml.test(elem)) {
          nodes.push(context.createTextNode(elem));
        } else {
          tmp = tmp || fragment.appendChild(context.createElement("div"));
          tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
          wrap = wrapMap[tag] || wrapMap._default;
          tmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2];
          j = wrap[0];
          while (j--) {
            tmp = tmp.lastChild;
          }
          jQuery.merge(nodes, tmp.childNodes);
          tmp = fragment.firstChild;
          tmp.textContent = "";
        }
      }
    }
    fragment.textContent = "";
    i = 0;
    while ((elem = nodes[i++])) {
      if (selection && jQuery.inArray(elem, selection) > -1) {
        if (ignored) {
          ignored.push(elem);
        }
        continue;
      }
      contains = jQuery.contains(elem.ownerDocument, elem);
      tmp = getAll(fragment.appendChild(elem), "script");
      if (contains) {
        setGlobalEval(tmp);
      }
      if (scripts) {
        j = 0;
        while ((elem = tmp[j++])) {
          if (rscriptType.test(elem.type || "")) {
            scripts.push(elem);
          }
        }
      }
    }
    return fragment;
  }
  (function() {
    var fragment = document.createDocumentFragment(),
        div = fragment.appendChild(document.createElement("div")),
        input = document.createElement("input");
    input.setAttribute("type", "radio");
    input.setAttribute("checked", "checked");
    input.setAttribute("name", "t");
    div.appendChild(input);
    support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;
    div.innerHTML = "<textarea>x</textarea>";
    support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;
  })();
  var rkeyEvent = /^key/,
      rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
      rtypenamespace = /^([^.]*)(?:\.(.+)|)/;
  function returnTrue() {
    return true;
  }
  function returnFalse() {
    return false;
  }
  function safeActiveElement() {
    try {
      return document.activeElement;
    } catch (err) {}
  }
  function on(elem, types, selector, data, fn, one) {
    var origFn,
        type;
    if (typeof types === "object") {
      if (typeof selector !== "string") {
        data = data || selector;
        selector = undefined;
      }
      for (type in types) {
        on(elem, type, selector, data, types[type], one);
      }
      return elem;
    }
    if (data == null && fn == null) {
      fn = selector;
      data = selector = undefined;
    } else if (fn == null) {
      if (typeof selector === "string") {
        fn = data;
        data = undefined;
      } else {
        fn = data;
        data = selector;
        selector = undefined;
      }
    }
    if (fn === false) {
      fn = returnFalse;
    } else if (!fn) {
      return elem;
    }
    if (one === 1) {
      origFn = fn;
      fn = function(event) {
        jQuery().off(event);
        return origFn.apply(this, arguments);
      };
      fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
    }
    return elem.each(function() {
      jQuery.event.add(this, types, fn, data, selector);
    });
  }
  jQuery.event = {
    global: {},
    add: function(elem, types, handler, data, selector) {
      var handleObjIn,
          eventHandle,
          tmp,
          events,
          t,
          handleObj,
          special,
          handlers,
          type,
          namespaces,
          origType,
          elemData = dataPriv.get(elem);
      if (!elemData) {
        return;
      }
      if (handler.handler) {
        handleObjIn = handler;
        handler = handleObjIn.handler;
        selector = handleObjIn.selector;
      }
      if (!handler.guid) {
        handler.guid = jQuery.guid++;
      }
      if (!(events = elemData.events)) {
        events = elemData.events = {};
      }
      if (!(eventHandle = elemData.handle)) {
        eventHandle = elemData.handle = function(e) {
          return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ? jQuery.event.dispatch.apply(elem, arguments) : undefined;
        };
      }
      types = (types || "").match(rnotwhite) || [""];
      t = types.length;
      while (t--) {
        tmp = rtypenamespace.exec(types[t]) || [];
        type = origType = tmp[1];
        namespaces = (tmp[2] || "").split(".").sort();
        if (!type) {
          continue;
        }
        special = jQuery.event.special[type] || {};
        type = (selector ? special.delegateType : special.bindType) || type;
        special = jQuery.event.special[type] || {};
        handleObj = jQuery.extend({
          type: type,
          origType: origType,
          data: data,
          handler: handler,
          guid: handler.guid,
          selector: selector,
          needsContext: selector && jQuery.expr.match.needsContext.test(selector),
          namespace: namespaces.join(".")
        }, handleObjIn);
        if (!(handlers = events[type])) {
          handlers = events[type] = [];
          handlers.delegateCount = 0;
          if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
            if (elem.addEventListener) {
              elem.addEventListener(type, eventHandle);
            }
          }
        }
        if (special.add) {
          special.add.call(elem, handleObj);
          if (!handleObj.handler.guid) {
            handleObj.handler.guid = handler.guid;
          }
        }
        if (selector) {
          handlers.splice(handlers.delegateCount++, 0, handleObj);
        } else {
          handlers.push(handleObj);
        }
        jQuery.event.global[type] = true;
      }
    },
    remove: function(elem, types, handler, selector, mappedTypes) {
      var j,
          origCount,
          tmp,
          events,
          t,
          handleObj,
          special,
          handlers,
          type,
          namespaces,
          origType,
          elemData = dataPriv.hasData(elem) && dataPriv.get(elem);
      if (!elemData || !(events = elemData.events)) {
        return;
      }
      types = (types || "").match(rnotwhite) || [""];
      t = types.length;
      while (t--) {
        tmp = rtypenamespace.exec(types[t]) || [];
        type = origType = tmp[1];
        namespaces = (tmp[2] || "").split(".").sort();
        if (!type) {
          for (type in events) {
            jQuery.event.remove(elem, type + types[t], handler, selector, true);
          }
          continue;
        }
        special = jQuery.event.special[type] || {};
        type = (selector ? special.delegateType : special.bindType) || type;
        handlers = events[type] || [];
        tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");
        origCount = j = handlers.length;
        while (j--) {
          handleObj = handlers[j];
          if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
            handlers.splice(j, 1);
            if (handleObj.selector) {
              handlers.delegateCount--;
            }
            if (special.remove) {
              special.remove.call(elem, handleObj);
            }
          }
        }
        if (origCount && !handlers.length) {
          if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
            jQuery.removeEvent(elem, type, elemData.handle);
          }
          delete events[type];
        }
      }
      if (jQuery.isEmptyObject(events)) {
        dataPriv.remove(elem, "handle events");
      }
    },
    dispatch: function(event) {
      event = jQuery.event.fix(event);
      var i,
          j,
          ret,
          matched,
          handleObj,
          handlerQueue = [],
          args = slice.call(arguments),
          handlers = (dataPriv.get(this, "events") || {})[event.type] || [],
          special = jQuery.event.special[event.type] || {};
      args[0] = event;
      event.delegateTarget = this;
      if (special.preDispatch && special.preDispatch.call(this, event) === false) {
        return;
      }
      handlerQueue = jQuery.event.handlers.call(this, event, handlers);
      i = 0;
      while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
        event.currentTarget = matched.elem;
        j = 0;
        while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {
          if (!event.rnamespace || event.rnamespace.test(handleObj.namespace)) {
            event.handleObj = handleObj;
            event.data = handleObj.data;
            ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);
            if (ret !== undefined) {
              if ((event.result = ret) === false) {
                event.preventDefault();
                event.stopPropagation();
              }
            }
          }
        }
      }
      if (special.postDispatch) {
        special.postDispatch.call(this, event);
      }
      return event.result;
    },
    handlers: function(event, handlers) {
      var i,
          matches,
          sel,
          handleObj,
          handlerQueue = [],
          delegateCount = handlers.delegateCount,
          cur = event.target;
      if (delegateCount && cur.nodeType && (event.type !== "click" || isNaN(event.button) || event.button < 1)) {
        for (; cur !== this; cur = cur.parentNode || this) {
          if (cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click")) {
            matches = [];
            for (i = 0; i < delegateCount; i++) {
              handleObj = handlers[i];
              sel = handleObj.selector + " ";
              if (matches[sel] === undefined) {
                matches[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) > -1 : jQuery.find(sel, this, null, [cur]).length;
              }
              if (matches[sel]) {
                matches.push(handleObj);
              }
            }
            if (matches.length) {
              handlerQueue.push({
                elem: cur,
                handlers: matches
              });
            }
          }
        }
      }
      if (delegateCount < handlers.length) {
        handlerQueue.push({
          elem: this,
          handlers: handlers.slice(delegateCount)
        });
      }
      return handlerQueue;
    },
    props: ("altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " + "metaKey relatedTarget shiftKey target timeStamp view which").split(" "),
    fixHooks: {},
    keyHooks: {
      props: "char charCode key keyCode".split(" "),
      filter: function(event, original) {
        if (event.which == null) {
          event.which = original.charCode != null ? original.charCode : original.keyCode;
        }
        return event;
      }
    },
    mouseHooks: {
      props: ("button buttons clientX clientY offsetX offsetY pageX pageY " + "screenX screenY toElement").split(" "),
      filter: function(event, original) {
        var eventDoc,
            doc,
            body,
            button = original.button;
        if (event.pageX == null && original.clientX != null) {
          eventDoc = event.target.ownerDocument || document;
          doc = eventDoc.documentElement;
          body = eventDoc.body;
          event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
          event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
        }
        if (!event.which && button !== undefined) {
          event.which = (button & 1 ? 1 : (button & 2 ? 3 : (button & 4 ? 2 : 0)));
        }
        return event;
      }
    },
    fix: function(event) {
      if (event[jQuery.expando]) {
        return event;
      }
      var i,
          prop,
          copy,
          type = event.type,
          originalEvent = event,
          fixHook = this.fixHooks[type];
      if (!fixHook) {
        this.fixHooks[type] = fixHook = rmouseEvent.test(type) ? this.mouseHooks : rkeyEvent.test(type) ? this.keyHooks : {};
      }
      copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;
      event = new jQuery.Event(originalEvent);
      i = copy.length;
      while (i--) {
        prop = copy[i];
        event[prop] = originalEvent[prop];
      }
      if (!event.target) {
        event.target = document;
      }
      if (event.target.nodeType === 3) {
        event.target = event.target.parentNode;
      }
      return fixHook.filter ? fixHook.filter(event, originalEvent) : event;
    },
    special: {
      load: {noBubble: true},
      focus: {
        trigger: function() {
          if (this !== safeActiveElement() && this.focus) {
            this.focus();
            return false;
          }
        },
        delegateType: "focusin"
      },
      blur: {
        trigger: function() {
          if (this === safeActiveElement() && this.blur) {
            this.blur();
            return false;
          }
        },
        delegateType: "focusout"
      },
      click: {
        trigger: function() {
          if (this.type === "checkbox" && this.click && jQuery.nodeName(this, "input")) {
            this.click();
            return false;
          }
        },
        _default: function(event) {
          return jQuery.nodeName(event.target, "a");
        }
      },
      beforeunload: {postDispatch: function(event) {
          if (event.result !== undefined && event.originalEvent) {
            event.originalEvent.returnValue = event.result;
          }
        }}
    }
  };
  jQuery.removeEvent = function(elem, type, handle) {
    if (elem.removeEventListener) {
      elem.removeEventListener(type, handle);
    }
  };
  jQuery.Event = function(src, props) {
    if (!(this instanceof jQuery.Event)) {
      return new jQuery.Event(src, props);
    }
    if (src && src.type) {
      this.originalEvent = src;
      this.type = src.type;
      this.isDefaultPrevented = src.defaultPrevented || src.defaultPrevented === undefined && src.returnValue === false ? returnTrue : returnFalse;
    } else {
      this.type = src;
    }
    if (props) {
      jQuery.extend(this, props);
    }
    this.timeStamp = src && src.timeStamp || jQuery.now();
    this[jQuery.expando] = true;
  };
  jQuery.Event.prototype = {
    constructor: jQuery.Event,
    isDefaultPrevented: returnFalse,
    isPropagationStopped: returnFalse,
    isImmediatePropagationStopped: returnFalse,
    isSimulated: false,
    preventDefault: function() {
      var e = this.originalEvent;
      this.isDefaultPrevented = returnTrue;
      if (e && !this.isSimulated) {
        e.preventDefault();
      }
    },
    stopPropagation: function() {
      var e = this.originalEvent;
      this.isPropagationStopped = returnTrue;
      if (e && !this.isSimulated) {
        e.stopPropagation();
      }
    },
    stopImmediatePropagation: function() {
      var e = this.originalEvent;
      this.isImmediatePropagationStopped = returnTrue;
      if (e && !this.isSimulated) {
        e.stopImmediatePropagation();
      }
      this.stopPropagation();
    }
  };
  jQuery.each({
    mouseenter: "mouseover",
    mouseleave: "mouseout",
    pointerenter: "pointerover",
    pointerleave: "pointerout"
  }, function(orig, fix) {
    jQuery.event.special[orig] = {
      delegateType: fix,
      bindType: fix,
      handle: function(event) {
        var ret,
            target = this,
            related = event.relatedTarget,
            handleObj = event.handleObj;
        if (!related || (related !== target && !jQuery.contains(target, related))) {
          event.type = handleObj.origType;
          ret = handleObj.handler.apply(this, arguments);
          event.type = fix;
        }
        return ret;
      }
    };
  });
  jQuery.fn.extend({
    on: function(types, selector, data, fn) {
      return on(this, types, selector, data, fn);
    },
    one: function(types, selector, data, fn) {
      return on(this, types, selector, data, fn, 1);
    },
    off: function(types, selector, fn) {
      var handleObj,
          type;
      if (types && types.preventDefault && types.handleObj) {
        handleObj = types.handleObj;
        jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
        return this;
      }
      if (typeof types === "object") {
        for (type in types) {
          this.off(type, selector, types[type]);
        }
        return this;
      }
      if (selector === false || typeof selector === "function") {
        fn = selector;
        selector = undefined;
      }
      if (fn === false) {
        fn = returnFalse;
      }
      return this.each(function() {
        jQuery.event.remove(this, types, fn, selector);
      });
    }
  });
  var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
      rnoInnerhtml = /<script|<style|<link/i,
      rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
      rscriptTypeMasked = /^true\/(.*)/,
      rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
  function manipulationTarget(elem, content) {
    return jQuery.nodeName(elem, "table") && jQuery.nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr") ? elem.getElementsByTagName("tbody")[0] || elem.appendChild(elem.ownerDocument.createElement("tbody")) : elem;
  }
  function disableScript(elem) {
    elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
    return elem;
  }
  function restoreScript(elem) {
    var match = rscriptTypeMasked.exec(elem.type);
    if (match) {
      elem.type = match[1];
    } else {
      elem.removeAttribute("type");
    }
    return elem;
  }
  function cloneCopyEvent(src, dest) {
    var i,
        l,
        type,
        pdataOld,
        pdataCur,
        udataOld,
        udataCur,
        events;
    if (dest.nodeType !== 1) {
      return;
    }
    if (dataPriv.hasData(src)) {
      pdataOld = dataPriv.access(src);
      pdataCur = dataPriv.set(dest, pdataOld);
      events = pdataOld.events;
      if (events) {
        delete pdataCur.handle;
        pdataCur.events = {};
        for (type in events) {
          for (i = 0, l = events[type].length; i < l; i++) {
            jQuery.event.add(dest, type, events[type][i]);
          }
        }
      }
    }
    if (dataUser.hasData(src)) {
      udataOld = dataUser.access(src);
      udataCur = jQuery.extend({}, udataOld);
      dataUser.set(dest, udataCur);
    }
  }
  function fixInput(src, dest) {
    var nodeName = dest.nodeName.toLowerCase();
    if (nodeName === "input" && rcheckableType.test(src.type)) {
      dest.checked = src.checked;
    } else if (nodeName === "input" || nodeName === "textarea") {
      dest.defaultValue = src.defaultValue;
    }
  }
  function domManip(collection, args, callback, ignored) {
    args = concat.apply([], args);
    var fragment,
        first,
        scripts,
        hasScripts,
        node,
        doc,
        i = 0,
        l = collection.length,
        iNoClone = l - 1,
        value = args[0],
        isFunction = jQuery.isFunction(value);
    if (isFunction || (l > 1 && typeof value === "string" && !support.checkClone && rchecked.test(value))) {
      return collection.each(function(index) {
        var self = collection.eq(index);
        if (isFunction) {
          args[0] = value.call(this, index, self.html());
        }
        domManip(self, args, callback, ignored);
      });
    }
    if (l) {
      fragment = buildFragment(args, collection[0].ownerDocument, false, collection, ignored);
      first = fragment.firstChild;
      if (fragment.childNodes.length === 1) {
        fragment = first;
      }
      if (first || ignored) {
        scripts = jQuery.map(getAll(fragment, "script"), disableScript);
        hasScripts = scripts.length;
        for (; i < l; i++) {
          node = fragment;
          if (i !== iNoClone) {
            node = jQuery.clone(node, true, true);
            if (hasScripts) {
              jQuery.merge(scripts, getAll(node, "script"));
            }
          }
          callback.call(collection[i], node, i);
        }
        if (hasScripts) {
          doc = scripts[scripts.length - 1].ownerDocument;
          jQuery.map(scripts, restoreScript);
          for (i = 0; i < hasScripts; i++) {
            node = scripts[i];
            if (rscriptType.test(node.type || "") && !dataPriv.access(node, "globalEval") && jQuery.contains(doc, node)) {
              if (node.src) {
                if (jQuery._evalUrl) {
                  jQuery._evalUrl(node.src);
                }
              } else {
                jQuery.globalEval(node.textContent.replace(rcleanScript, ""));
              }
            }
          }
        }
      }
    }
    return collection;
  }
  function remove(elem, selector, keepData) {
    var node,
        nodes = selector ? jQuery.filter(selector, elem) : elem,
        i = 0;
    for (; (node = nodes[i]) != null; i++) {
      if (!keepData && node.nodeType === 1) {
        jQuery.cleanData(getAll(node));
      }
      if (node.parentNode) {
        if (keepData && jQuery.contains(node.ownerDocument, node)) {
          setGlobalEval(getAll(node, "script"));
        }
        node.parentNode.removeChild(node);
      }
    }
    return elem;
  }
  jQuery.extend({
    htmlPrefilter: function(html) {
      return html.replace(rxhtmlTag, "<$1></$2>");
    },
    clone: function(elem, dataAndEvents, deepDataAndEvents) {
      var i,
          l,
          srcElements,
          destElements,
          clone = elem.cloneNode(true),
          inPage = jQuery.contains(elem.ownerDocument, elem);
      if (!support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {
        destElements = getAll(clone);
        srcElements = getAll(elem);
        for (i = 0, l = srcElements.length; i < l; i++) {
          fixInput(srcElements[i], destElements[i]);
        }
      }
      if (dataAndEvents) {
        if (deepDataAndEvents) {
          srcElements = srcElements || getAll(elem);
          destElements = destElements || getAll(clone);
          for (i = 0, l = srcElements.length; i < l; i++) {
            cloneCopyEvent(srcElements[i], destElements[i]);
          }
        } else {
          cloneCopyEvent(elem, clone);
        }
      }
      destElements = getAll(clone, "script");
      if (destElements.length > 0) {
        setGlobalEval(destElements, !inPage && getAll(elem, "script"));
      }
      return clone;
    },
    cleanData: function(elems) {
      var data,
          elem,
          type,
          special = jQuery.event.special,
          i = 0;
      for (; (elem = elems[i]) !== undefined; i++) {
        if (acceptData(elem)) {
          if ((data = elem[dataPriv.expando])) {
            if (data.events) {
              for (type in data.events) {
                if (special[type]) {
                  jQuery.event.remove(elem, type);
                } else {
                  jQuery.removeEvent(elem, type, data.handle);
                }
              }
            }
            elem[dataPriv.expando] = undefined;
          }
          if (elem[dataUser.expando]) {
            elem[dataUser.expando] = undefined;
          }
        }
      }
    }
  });
  jQuery.fn.extend({
    domManip: domManip,
    detach: function(selector) {
      return remove(this, selector, true);
    },
    remove: function(selector) {
      return remove(this, selector);
    },
    text: function(value) {
      return access(this, function(value) {
        return value === undefined ? jQuery.text(this) : this.empty().each(function() {
          if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
            this.textContent = value;
          }
        });
      }, null, value, arguments.length);
    },
    append: function() {
      return domManip(this, arguments, function(elem) {
        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
          var target = manipulationTarget(this, elem);
          target.appendChild(elem);
        }
      });
    },
    prepend: function() {
      return domManip(this, arguments, function(elem) {
        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
          var target = manipulationTarget(this, elem);
          target.insertBefore(elem, target.firstChild);
        }
      });
    },
    before: function() {
      return domManip(this, arguments, function(elem) {
        if (this.parentNode) {
          this.parentNode.insertBefore(elem, this);
        }
      });
    },
    after: function() {
      return domManip(this, arguments, function(elem) {
        if (this.parentNode) {
          this.parentNode.insertBefore(elem, this.nextSibling);
        }
      });
    },
    empty: function() {
      var elem,
          i = 0;
      for (; (elem = this[i]) != null; i++) {
        if (elem.nodeType === 1) {
          jQuery.cleanData(getAll(elem, false));
          elem.textContent = "";
        }
      }
      return this;
    },
    clone: function(dataAndEvents, deepDataAndEvents) {
      dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
      deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
      return this.map(function() {
        return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
      });
    },
    html: function(value) {
      return access(this, function(value) {
        var elem = this[0] || {},
            i = 0,
            l = this.length;
        if (value === undefined && elem.nodeType === 1) {
          return elem.innerHTML;
        }
        if (typeof value === "string" && !rnoInnerhtml.test(value) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {
          value = jQuery.htmlPrefilter(value);
          try {
            for (; i < l; i++) {
              elem = this[i] || {};
              if (elem.nodeType === 1) {
                jQuery.cleanData(getAll(elem, false));
                elem.innerHTML = value;
              }
            }
            elem = 0;
          } catch (e) {}
        }
        if (elem) {
          this.empty().append(value);
        }
      }, null, value, arguments.length);
    },
    replaceWith: function() {
      var ignored = [];
      return domManip(this, arguments, function(elem) {
        var parent = this.parentNode;
        if (jQuery.inArray(this, ignored) < 0) {
          jQuery.cleanData(getAll(this));
          if (parent) {
            parent.replaceChild(elem, this);
          }
        }
      }, ignored);
    }
  });
  jQuery.each({
    appendTo: "append",
    prependTo: "prepend",
    insertBefore: "before",
    insertAfter: "after",
    replaceAll: "replaceWith"
  }, function(name, original) {
    jQuery.fn[name] = function(selector) {
      var elems,
          ret = [],
          insert = jQuery(selector),
          last = insert.length - 1,
          i = 0;
      for (; i <= last; i++) {
        elems = i === last ? this : this.clone(true);
        jQuery(insert[i])[original](elems);
        push.apply(ret, elems.get());
      }
      return this.pushStack(ret);
    };
  });
  var iframe,
      elemdisplay = {
        HTML: "block",
        BODY: "block"
      };
  function actualDisplay(name, doc) {
    var elem = jQuery(doc.createElement(name)).appendTo(doc.body),
        display = jQuery.css(elem[0], "display");
    elem.detach();
    return display;
  }
  function defaultDisplay(nodeName) {
    var doc = document,
        display = elemdisplay[nodeName];
    if (!display) {
      display = actualDisplay(nodeName, doc);
      if (display === "none" || !display) {
        iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>")).appendTo(doc.documentElement);
        doc = iframe[0].contentDocument;
        doc.write();
        doc.close();
        display = actualDisplay(nodeName, doc);
        iframe.detach();
      }
      elemdisplay[nodeName] = display;
    }
    return display;
  }
  var rmargin = (/^margin/);
  var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");
  var getStyles = function(elem) {
    var view = elem.ownerDocument.defaultView;
    if (!view || !view.opener) {
      view = window;
    }
    return view.getComputedStyle(elem);
  };
  var swap = function(elem, options, callback, args) {
    var ret,
        name,
        old = {};
    for (name in options) {
      old[name] = elem.style[name];
      elem.style[name] = options[name];
    }
    ret = callback.apply(elem, args || []);
    for (name in options) {
      elem.style[name] = old[name];
    }
    return ret;
  };
  var documentElement = document.documentElement;
  (function() {
    var pixelPositionVal,
        boxSizingReliableVal,
        pixelMarginRightVal,
        reliableMarginLeftVal,
        container = document.createElement("div"),
        div = document.createElement("div");
    if (!div.style) {
      return;
    }
    div.style.backgroundClip = "content-box";
    div.cloneNode(true).style.backgroundClip = "";
    support.clearCloneStyle = div.style.backgroundClip === "content-box";
    container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" + "padding:0;margin-top:1px;position:absolute";
    container.appendChild(div);
    function computeStyleTests() {
      div.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;" + "position:relative;display:block;" + "margin:auto;border:1px;padding:1px;" + "top:1%;width:50%";
      div.innerHTML = "";
      documentElement.appendChild(container);
      var divStyle = window.getComputedStyle(div);
      pixelPositionVal = divStyle.top !== "1%";
      reliableMarginLeftVal = divStyle.marginLeft === "2px";
      boxSizingReliableVal = divStyle.width === "4px";
      div.style.marginRight = "50%";
      pixelMarginRightVal = divStyle.marginRight === "4px";
      documentElement.removeChild(container);
    }
    jQuery.extend(support, {
      pixelPosition: function() {
        computeStyleTests();
        return pixelPositionVal;
      },
      boxSizingReliable: function() {
        if (boxSizingReliableVal == null) {
          computeStyleTests();
        }
        return boxSizingReliableVal;
      },
      pixelMarginRight: function() {
        if (boxSizingReliableVal == null) {
          computeStyleTests();
        }
        return pixelMarginRightVal;
      },
      reliableMarginLeft: function() {
        if (boxSizingReliableVal == null) {
          computeStyleTests();
        }
        return reliableMarginLeftVal;
      },
      reliableMarginRight: function() {
        var ret,
            marginDiv = div.appendChild(document.createElement("div"));
        marginDiv.style.cssText = div.style.cssText = "-webkit-box-sizing:content-box;box-sizing:content-box;" + "display:block;margin:0;border:0;padding:0";
        marginDiv.style.marginRight = marginDiv.style.width = "0";
        div.style.width = "1px";
        documentElement.appendChild(container);
        ret = !parseFloat(window.getComputedStyle(marginDiv).marginRight);
        documentElement.removeChild(container);
        div.removeChild(marginDiv);
        return ret;
      }
    });
  })();
  function curCSS(elem, name, computed) {
    var width,
        minWidth,
        maxWidth,
        ret,
        style = elem.style;
    computed = computed || getStyles(elem);
    ret = computed ? computed.getPropertyValue(name) || computed[name] : undefined;
    if ((ret === "" || ret === undefined) && !jQuery.contains(elem.ownerDocument, elem)) {
      ret = jQuery.style(elem, name);
    }
    if (computed) {
      if (!support.pixelMarginRight() && rnumnonpx.test(ret) && rmargin.test(name)) {
        width = style.width;
        minWidth = style.minWidth;
        maxWidth = style.maxWidth;
        style.minWidth = style.maxWidth = style.width = ret;
        ret = computed.width;
        style.width = width;
        style.minWidth = minWidth;
        style.maxWidth = maxWidth;
      }
    }
    return ret !== undefined ? ret + "" : ret;
  }
  function addGetHookIf(conditionFn, hookFn) {
    return {get: function() {
        if (conditionFn()) {
          delete this.get;
          return;
        }
        return (this.get = hookFn).apply(this, arguments);
      }};
  }
  var rdisplayswap = /^(none|table(?!-c[ea]).+)/,
      cssShow = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
      },
      cssNormalTransform = {
        letterSpacing: "0",
        fontWeight: "400"
      },
      cssPrefixes = ["Webkit", "O", "Moz", "ms"],
      emptyStyle = document.createElement("div").style;
  function vendorPropName(name) {
    if (name in emptyStyle) {
      return name;
    }
    var capName = name[0].toUpperCase() + name.slice(1),
        i = cssPrefixes.length;
    while (i--) {
      name = cssPrefixes[i] + capName;
      if (name in emptyStyle) {
        return name;
      }
    }
  }
  function setPositiveNumber(elem, value, subtract) {
    var matches = rcssNum.exec(value);
    return matches ? Math.max(0, matches[2] - (subtract || 0)) + (matches[3] || "px") : value;
  }
  function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
    var i = extra === (isBorderBox ? "border" : "content") ? 4 : name === "width" ? 1 : 0,
        val = 0;
    for (; i < 4; i += 2) {
      if (extra === "margin") {
        val += jQuery.css(elem, extra + cssExpand[i], true, styles);
      }
      if (isBorderBox) {
        if (extra === "content") {
          val -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
        }
        if (extra !== "margin") {
          val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
        }
      } else {
        val += jQuery.css(elem, "padding" + cssExpand[i], true, styles);
        if (extra !== "padding") {
          val += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
        }
      }
    }
    return val;
  }
  function getWidthOrHeight(elem, name, extra) {
    var valueIsBorderBox = true,
        val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
        styles = getStyles(elem),
        isBorderBox = jQuery.css(elem, "boxSizing", false, styles) === "border-box";
    if (val <= 0 || val == null) {
      val = curCSS(elem, name, styles);
      if (val < 0 || val == null) {
        val = elem.style[name];
      }
      if (rnumnonpx.test(val)) {
        return val;
      }
      valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]);
      val = parseFloat(val) || 0;
    }
    return (val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles)) + "px";
  }
  function showHide(elements, show) {
    var display,
        elem,
        hidden,
        values = [],
        index = 0,
        length = elements.length;
    for (; index < length; index++) {
      elem = elements[index];
      if (!elem.style) {
        continue;
      }
      values[index] = dataPriv.get(elem, "olddisplay");
      display = elem.style.display;
      if (show) {
        if (!values[index] && display === "none") {
          elem.style.display = "";
        }
        if (elem.style.display === "" && isHidden(elem)) {
          values[index] = dataPriv.access(elem, "olddisplay", defaultDisplay(elem.nodeName));
        }
      } else {
        hidden = isHidden(elem);
        if (display !== "none" || !hidden) {
          dataPriv.set(elem, "olddisplay", hidden ? display : jQuery.css(elem, "display"));
        }
      }
    }
    for (index = 0; index < length; index++) {
      elem = elements[index];
      if (!elem.style) {
        continue;
      }
      if (!show || elem.style.display === "none" || elem.style.display === "") {
        elem.style.display = show ? values[index] || "" : "none";
      }
    }
    return elements;
  }
  jQuery.extend({
    cssHooks: {opacity: {get: function(elem, computed) {
          if (computed) {
            var ret = curCSS(elem, "opacity");
            return ret === "" ? "1" : ret;
          }
        }}},
    cssNumber: {
      "animationIterationCount": true,
      "columnCount": true,
      "fillOpacity": true,
      "flexGrow": true,
      "flexShrink": true,
      "fontWeight": true,
      "lineHeight": true,
      "opacity": true,
      "order": true,
      "orphans": true,
      "widows": true,
      "zIndex": true,
      "zoom": true
    },
    cssProps: {"float": "cssFloat"},
    style: function(elem, name, value, extra) {
      if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
        return;
      }
      var ret,
          type,
          hooks,
          origName = jQuery.camelCase(name),
          style = elem.style;
      name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(origName) || origName);
      hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
      if (value !== undefined) {
        type = typeof value;
        if (type === "string" && (ret = rcssNum.exec(value)) && ret[1]) {
          value = adjustCSS(elem, name, ret);
          type = "number";
        }
        if (value == null || value !== value) {
          return;
        }
        if (type === "number") {
          value += ret && ret[3] || (jQuery.cssNumber[origName] ? "" : "px");
        }
        if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
          style[name] = "inherit";
        }
        if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {
          style[name] = value;
        }
      } else {
        if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {
          return ret;
        }
        return style[name];
      }
    },
    css: function(elem, name, extra, styles) {
      var val,
          num,
          hooks,
          origName = jQuery.camelCase(name);
      name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(origName) || origName);
      hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
      if (hooks && "get" in hooks) {
        val = hooks.get(elem, true, extra);
      }
      if (val === undefined) {
        val = curCSS(elem, name, styles);
      }
      if (val === "normal" && name in cssNormalTransform) {
        val = cssNormalTransform[name];
      }
      if (extra === "" || extra) {
        num = parseFloat(val);
        return extra === true || isFinite(num) ? num || 0 : val;
      }
      return val;
    }
  });
  jQuery.each(["height", "width"], function(i, name) {
    jQuery.cssHooks[name] = {
      get: function(elem, computed, extra) {
        if (computed) {
          return rdisplayswap.test(jQuery.css(elem, "display")) && elem.offsetWidth === 0 ? swap(elem, cssShow, function() {
            return getWidthOrHeight(elem, name, extra);
          }) : getWidthOrHeight(elem, name, extra);
        }
      },
      set: function(elem, value, extra) {
        var matches,
            styles = extra && getStyles(elem),
            subtract = extra && augmentWidthOrHeight(elem, name, extra, jQuery.css(elem, "boxSizing", false, styles) === "border-box", styles);
        if (subtract && (matches = rcssNum.exec(value)) && (matches[3] || "px") !== "px") {
          elem.style[name] = value;
          value = jQuery.css(elem, name);
        }
        return setPositiveNumber(elem, value, subtract);
      }
    };
  });
  jQuery.cssHooks.marginLeft = addGetHookIf(support.reliableMarginLeft, function(elem, computed) {
    if (computed) {
      return (parseFloat(curCSS(elem, "marginLeft")) || elem.getBoundingClientRect().left - swap(elem, {marginLeft: 0}, function() {
        return elem.getBoundingClientRect().left;
      })) + "px";
    }
  });
  jQuery.cssHooks.marginRight = addGetHookIf(support.reliableMarginRight, function(elem, computed) {
    if (computed) {
      return swap(elem, {"display": "inline-block"}, curCSS, [elem, "marginRight"]);
    }
  });
  jQuery.each({
    margin: "",
    padding: "",
    border: "Width"
  }, function(prefix, suffix) {
    jQuery.cssHooks[prefix + suffix] = {expand: function(value) {
        var i = 0,
            expanded = {},
            parts = typeof value === "string" ? value.split(" ") : [value];
        for (; i < 4; i++) {
          expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
        }
        return expanded;
      }};
    if (!rmargin.test(prefix)) {
      jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
    }
  });
  jQuery.fn.extend({
    css: function(name, value) {
      return access(this, function(elem, name, value) {
        var styles,
            len,
            map = {},
            i = 0;
        if (jQuery.isArray(name)) {
          styles = getStyles(elem);
          len = name.length;
          for (; i < len; i++) {
            map[name[i]] = jQuery.css(elem, name[i], false, styles);
          }
          return map;
        }
        return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
      }, name, value, arguments.length > 1);
    },
    show: function() {
      return showHide(this, true);
    },
    hide: function() {
      return showHide(this);
    },
    toggle: function(state) {
      if (typeof state === "boolean") {
        return state ? this.show() : this.hide();
      }
      return this.each(function() {
        if (isHidden(this)) {
          jQuery(this).show();
        } else {
          jQuery(this).hide();
        }
      });
    }
  });
  function Tween(elem, options, prop, end, easing) {
    return new Tween.prototype.init(elem, options, prop, end, easing);
  }
  jQuery.Tween = Tween;
  Tween.prototype = {
    constructor: Tween,
    init: function(elem, options, prop, end, easing, unit) {
      this.elem = elem;
      this.prop = prop;
      this.easing = easing || jQuery.easing._default;
      this.options = options;
      this.start = this.now = this.cur();
      this.end = end;
      this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
    },
    cur: function() {
      var hooks = Tween.propHooks[this.prop];
      return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
    },
    run: function(percent) {
      var eased,
          hooks = Tween.propHooks[this.prop];
      if (this.options.duration) {
        this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration);
      } else {
        this.pos = eased = percent;
      }
      this.now = (this.end - this.start) * eased + this.start;
      if (this.options.step) {
        this.options.step.call(this.elem, this.now, this);
      }
      if (hooks && hooks.set) {
        hooks.set(this);
      } else {
        Tween.propHooks._default.set(this);
      }
      return this;
    }
  };
  Tween.prototype.init.prototype = Tween.prototype;
  Tween.propHooks = {_default: {
      get: function(tween) {
        var result;
        if (tween.elem.nodeType !== 1 || tween.elem[tween.prop] != null && tween.elem.style[tween.prop] == null) {
          return tween.elem[tween.prop];
        }
        result = jQuery.css(tween.elem, tween.prop, "");
        return !result || result === "auto" ? 0 : result;
      },
      set: function(tween) {
        if (jQuery.fx.step[tween.prop]) {
          jQuery.fx.step[tween.prop](tween);
        } else if (tween.elem.nodeType === 1 && (tween.elem.style[jQuery.cssProps[tween.prop]] != null || jQuery.cssHooks[tween.prop])) {
          jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
        } else {
          tween.elem[tween.prop] = tween.now;
        }
      }
    }};
  Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {set: function(tween) {
      if (tween.elem.nodeType && tween.elem.parentNode) {
        tween.elem[tween.prop] = tween.now;
      }
    }};
  jQuery.easing = {
    linear: function(p) {
      return p;
    },
    swing: function(p) {
      return 0.5 - Math.cos(p * Math.PI) / 2;
    },
    _default: "swing"
  };
  jQuery.fx = Tween.prototype.init;
  jQuery.fx.step = {};
  var fxNow,
      timerId,
      rfxtypes = /^(?:toggle|show|hide)$/,
      rrun = /queueHooks$/;
  function createFxNow() {
    window.setTimeout(function() {
      fxNow = undefined;
    });
    return (fxNow = jQuery.now());
  }
  function genFx(type, includeWidth) {
    var which,
        i = 0,
        attrs = {height: type};
    includeWidth = includeWidth ? 1 : 0;
    for (; i < 4; i += 2 - includeWidth) {
      which = cssExpand[i];
      attrs["margin" + which] = attrs["padding" + which] = type;
    }
    if (includeWidth) {
      attrs.opacity = attrs.width = type;
    }
    return attrs;
  }
  function createTween(value, prop, animation) {
    var tween,
        collection = (Animation.tweeners[prop] || []).concat(Animation.tweeners["*"]),
        index = 0,
        length = collection.length;
    for (; index < length; index++) {
      if ((tween = collection[index].call(animation, prop, value))) {
        return tween;
      }
    }
  }
  function defaultPrefilter(elem, props, opts) {
    var prop,
        value,
        toggle,
        tween,
        hooks,
        oldfire,
        display,
        checkDisplay,
        anim = this,
        orig = {},
        style = elem.style,
        hidden = elem.nodeType && isHidden(elem),
        dataShow = dataPriv.get(elem, "fxshow");
    if (!opts.queue) {
      hooks = jQuery._queueHooks(elem, "fx");
      if (hooks.unqueued == null) {
        hooks.unqueued = 0;
        oldfire = hooks.empty.fire;
        hooks.empty.fire = function() {
          if (!hooks.unqueued) {
            oldfire();
          }
        };
      }
      hooks.unqueued++;
      anim.always(function() {
        anim.always(function() {
          hooks.unqueued--;
          if (!jQuery.queue(elem, "fx").length) {
            hooks.empty.fire();
          }
        });
      });
    }
    if (elem.nodeType === 1 && ("height" in props || "width" in props)) {
      opts.overflow = [style.overflow, style.overflowX, style.overflowY];
      display = jQuery.css(elem, "display");
      checkDisplay = display === "none" ? dataPriv.get(elem, "olddisplay") || defaultDisplay(elem.nodeName) : display;
      if (checkDisplay === "inline" && jQuery.css(elem, "float") === "none") {
        style.display = "inline-block";
      }
    }
    if (opts.overflow) {
      style.overflow = "hidden";
      anim.always(function() {
        style.overflow = opts.overflow[0];
        style.overflowX = opts.overflow[1];
        style.overflowY = opts.overflow[2];
      });
    }
    for (prop in props) {
      value = props[prop];
      if (rfxtypes.exec(value)) {
        delete props[prop];
        toggle = toggle || value === "toggle";
        if (value === (hidden ? "hide" : "show")) {
          if (value === "show" && dataShow && dataShow[prop] !== undefined) {
            hidden = true;
          } else {
            continue;
          }
        }
        orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
      } else {
        display = undefined;
      }
    }
    if (!jQuery.isEmptyObject(orig)) {
      if (dataShow) {
        if ("hidden" in dataShow) {
          hidden = dataShow.hidden;
        }
      } else {
        dataShow = dataPriv.access(elem, "fxshow", {});
      }
      if (toggle) {
        dataShow.hidden = !hidden;
      }
      if (hidden) {
        jQuery(elem).show();
      } else {
        anim.done(function() {
          jQuery(elem).hide();
        });
      }
      anim.done(function() {
        var prop;
        dataPriv.remove(elem, "fxshow");
        for (prop in orig) {
          jQuery.style(elem, prop, orig[prop]);
        }
      });
      for (prop in orig) {
        tween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
        if (!(prop in dataShow)) {
          dataShow[prop] = tween.start;
          if (hidden) {
            tween.end = tween.start;
            tween.start = prop === "width" || prop === "height" ? 1 : 0;
          }
        }
      }
    } else if ((display === "none" ? defaultDisplay(elem.nodeName) : display) === "inline") {
      style.display = display;
    }
  }
  function propFilter(props, specialEasing) {
    var index,
        name,
        easing,
        value,
        hooks;
    for (index in props) {
      name = jQuery.camelCase(index);
      easing = specialEasing[name];
      value = props[index];
      if (jQuery.isArray(value)) {
        easing = value[1];
        value = props[index] = value[0];
      }
      if (index !== name) {
        props[name] = value;
        delete props[index];
      }
      hooks = jQuery.cssHooks[name];
      if (hooks && "expand" in hooks) {
        value = hooks.expand(value);
        delete props[name];
        for (index in value) {
          if (!(index in props)) {
            props[index] = value[index];
            specialEasing[index] = easing;
          }
        }
      } else {
        specialEasing[name] = easing;
      }
    }
  }
  function Animation(elem, properties, options) {
    var result,
        stopped,
        index = 0,
        length = Animation.prefilters.length,
        deferred = jQuery.Deferred().always(function() {
          delete tick.elem;
        }),
        tick = function() {
          if (stopped) {
            return false;
          }
          var currentTime = fxNow || createFxNow(),
              remaining = Math.max(0, animation.startTime + animation.duration - currentTime),
              temp = remaining / animation.duration || 0,
              percent = 1 - temp,
              index = 0,
              length = animation.tweens.length;
          for (; index < length; index++) {
            animation.tweens[index].run(percent);
          }
          deferred.notifyWith(elem, [animation, percent, remaining]);
          if (percent < 1 && length) {
            return remaining;
          } else {
            deferred.resolveWith(elem, [animation]);
            return false;
          }
        },
        animation = deferred.promise({
          elem: elem,
          props: jQuery.extend({}, properties),
          opts: jQuery.extend(true, {
            specialEasing: {},
            easing: jQuery.easing._default
          }, options),
          originalProperties: properties,
          originalOptions: options,
          startTime: fxNow || createFxNow(),
          duration: options.duration,
          tweens: [],
          createTween: function(prop, end) {
            var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
            animation.tweens.push(tween);
            return tween;
          },
          stop: function(gotoEnd) {
            var index = 0,
                length = gotoEnd ? animation.tweens.length : 0;
            if (stopped) {
              return this;
            }
            stopped = true;
            for (; index < length; index++) {
              animation.tweens[index].run(1);
            }
            if (gotoEnd) {
              deferred.notifyWith(elem, [animation, 1, 0]);
              deferred.resolveWith(elem, [animation, gotoEnd]);
            } else {
              deferred.rejectWith(elem, [animation, gotoEnd]);
            }
            return this;
          }
        }),
        props = animation.props;
    propFilter(props, animation.opts.specialEasing);
    for (; index < length; index++) {
      result = Animation.prefilters[index].call(animation, elem, props, animation.opts);
      if (result) {
        if (jQuery.isFunction(result.stop)) {
          jQuery._queueHooks(animation.elem, animation.opts.queue).stop = jQuery.proxy(result.stop, result);
        }
        return result;
      }
    }
    jQuery.map(props, createTween, animation);
    if (jQuery.isFunction(animation.opts.start)) {
      animation.opts.start.call(elem, animation);
    }
    jQuery.fx.timer(jQuery.extend(tick, {
      elem: elem,
      anim: animation,
      queue: animation.opts.queue
    }));
    return animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
  }
  jQuery.Animation = jQuery.extend(Animation, {
    tweeners: {"*": [function(prop, value) {
        var tween = this.createTween(prop, value);
        adjustCSS(tween.elem, prop, rcssNum.exec(value), tween);
        return tween;
      }]},
    tweener: function(props, callback) {
      if (jQuery.isFunction(props)) {
        callback = props;
        props = ["*"];
      } else {
        props = props.match(rnotwhite);
      }
      var prop,
          index = 0,
          length = props.length;
      for (; index < length; index++) {
        prop = props[index];
        Animation.tweeners[prop] = Animation.tweeners[prop] || [];
        Animation.tweeners[prop].unshift(callback);
      }
    },
    prefilters: [defaultPrefilter],
    prefilter: function(callback, prepend) {
      if (prepend) {
        Animation.prefilters.unshift(callback);
      } else {
        Animation.prefilters.push(callback);
      }
    }
  });
  jQuery.speed = function(speed, easing, fn) {
    var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
      complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
      duration: speed,
      easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
    };
    opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default;
    if (opt.queue == null || opt.queue === true) {
      opt.queue = "fx";
    }
    opt.old = opt.complete;
    opt.complete = function() {
      if (jQuery.isFunction(opt.old)) {
        opt.old.call(this);
      }
      if (opt.queue) {
        jQuery.dequeue(this, opt.queue);
      }
    };
    return opt;
  };
  jQuery.fn.extend({
    fadeTo: function(speed, to, easing, callback) {
      return this.filter(isHidden).css("opacity", 0).show().end().animate({opacity: to}, speed, easing, callback);
    },
    animate: function(prop, speed, easing, callback) {
      var empty = jQuery.isEmptyObject(prop),
          optall = jQuery.speed(speed, easing, callback),
          doAnimation = function() {
            var anim = Animation(this, jQuery.extend({}, prop), optall);
            if (empty || dataPriv.get(this, "finish")) {
              anim.stop(true);
            }
          };
      doAnimation.finish = doAnimation;
      return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
    },
    stop: function(type, clearQueue, gotoEnd) {
      var stopQueue = function(hooks) {
        var stop = hooks.stop;
        delete hooks.stop;
        stop(gotoEnd);
      };
      if (typeof type !== "string") {
        gotoEnd = clearQueue;
        clearQueue = type;
        type = undefined;
      }
      if (clearQueue && type !== false) {
        this.queue(type || "fx", []);
      }
      return this.each(function() {
        var dequeue = true,
            index = type != null && type + "queueHooks",
            timers = jQuery.timers,
            data = dataPriv.get(this);
        if (index) {
          if (data[index] && data[index].stop) {
            stopQueue(data[index]);
          }
        } else {
          for (index in data) {
            if (data[index] && data[index].stop && rrun.test(index)) {
              stopQueue(data[index]);
            }
          }
        }
        for (index = timers.length; index--; ) {
          if (timers[index].elem === this && (type == null || timers[index].queue === type)) {
            timers[index].anim.stop(gotoEnd);
            dequeue = false;
            timers.splice(index, 1);
          }
        }
        if (dequeue || !gotoEnd) {
          jQuery.dequeue(this, type);
        }
      });
    },
    finish: function(type) {
      if (type !== false) {
        type = type || "fx";
      }
      return this.each(function() {
        var index,
            data = dataPriv.get(this),
            queue = data[type + "queue"],
            hooks = data[type + "queueHooks"],
            timers = jQuery.timers,
            length = queue ? queue.length : 0;
        data.finish = true;
        jQuery.queue(this, type, []);
        if (hooks && hooks.stop) {
          hooks.stop.call(this, true);
        }
        for (index = timers.length; index--; ) {
          if (timers[index].elem === this && timers[index].queue === type) {
            timers[index].anim.stop(true);
            timers.splice(index, 1);
          }
        }
        for (index = 0; index < length; index++) {
          if (queue[index] && queue[index].finish) {
            queue[index].finish.call(this);
          }
        }
        delete data.finish;
      });
    }
  });
  jQuery.each(["toggle", "show", "hide"], function(i, name) {
    var cssFn = jQuery.fn[name];
    jQuery.fn[name] = function(speed, easing, callback) {
      return speed == null || typeof speed === "boolean" ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback);
    };
  });
  jQuery.each({
    slideDown: genFx("show"),
    slideUp: genFx("hide"),
    slideToggle: genFx("toggle"),
    fadeIn: {opacity: "show"},
    fadeOut: {opacity: "hide"},
    fadeToggle: {opacity: "toggle"}
  }, function(name, props) {
    jQuery.fn[name] = function(speed, easing, callback) {
      return this.animate(props, speed, easing, callback);
    };
  });
  jQuery.timers = [];
  jQuery.fx.tick = function() {
    var timer,
        i = 0,
        timers = jQuery.timers;
    fxNow = jQuery.now();
    for (; i < timers.length; i++) {
      timer = timers[i];
      if (!timer() && timers[i] === timer) {
        timers.splice(i--, 1);
      }
    }
    if (!timers.length) {
      jQuery.fx.stop();
    }
    fxNow = undefined;
  };
  jQuery.fx.timer = function(timer) {
    jQuery.timers.push(timer);
    if (timer()) {
      jQuery.fx.start();
    } else {
      jQuery.timers.pop();
    }
  };
  jQuery.fx.interval = 13;
  jQuery.fx.start = function() {
    if (!timerId) {
      timerId = window.setInterval(jQuery.fx.tick, jQuery.fx.interval);
    }
  };
  jQuery.fx.stop = function() {
    window.clearInterval(timerId);
    timerId = null;
  };
  jQuery.fx.speeds = {
    slow: 600,
    fast: 200,
    _default: 400
  };
  jQuery.fn.delay = function(time, type) {
    time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
    type = type || "fx";
    return this.queue(type, function(next, hooks) {
      var timeout = window.setTimeout(next, time);
      hooks.stop = function() {
        window.clearTimeout(timeout);
      };
    });
  };
  (function() {
    var input = document.createElement("input"),
        select = document.createElement("select"),
        opt = select.appendChild(document.createElement("option"));
    input.type = "checkbox";
    support.checkOn = input.value !== "";
    support.optSelected = opt.selected;
    select.disabled = true;
    support.optDisabled = !opt.disabled;
    input = document.createElement("input");
    input.value = "t";
    input.type = "radio";
    support.radioValue = input.value === "t";
  })();
  var boolHook,
      attrHandle = jQuery.expr.attrHandle;
  jQuery.fn.extend({
    attr: function(name, value) {
      return access(this, jQuery.attr, name, value, arguments.length > 1);
    },
    removeAttr: function(name) {
      return this.each(function() {
        jQuery.removeAttr(this, name);
      });
    }
  });
  jQuery.extend({
    attr: function(elem, name, value) {
      var ret,
          hooks,
          nType = elem.nodeType;
      if (nType === 3 || nType === 8 || nType === 2) {
        return;
      }
      if (typeof elem.getAttribute === "undefined") {
        return jQuery.prop(elem, name, value);
      }
      if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
        name = name.toLowerCase();
        hooks = jQuery.attrHooks[name] || (jQuery.expr.match.bool.test(name) ? boolHook : undefined);
      }
      if (value !== undefined) {
        if (value === null) {
          jQuery.removeAttr(elem, name);
          return;
        }
        if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
          return ret;
        }
        elem.setAttribute(name, value + "");
        return value;
      }
      if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
        return ret;
      }
      ret = jQuery.find.attr(elem, name);
      return ret == null ? undefined : ret;
    },
    attrHooks: {type: {set: function(elem, value) {
          if (!support.radioValue && value === "radio" && jQuery.nodeName(elem, "input")) {
            var val = elem.value;
            elem.setAttribute("type", value);
            if (val) {
              elem.value = val;
            }
            return value;
          }
        }}},
    removeAttr: function(elem, value) {
      var name,
          propName,
          i = 0,
          attrNames = value && value.match(rnotwhite);
      if (attrNames && elem.nodeType === 1) {
        while ((name = attrNames[i++])) {
          propName = jQuery.propFix[name] || name;
          if (jQuery.expr.match.bool.test(name)) {
            elem[propName] = false;
          }
          elem.removeAttribute(name);
        }
      }
    }
  });
  boolHook = {set: function(elem, value, name) {
      if (value === false) {
        jQuery.removeAttr(elem, name);
      } else {
        elem.setAttribute(name, name);
      }
      return name;
    }};
  jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(i, name) {
    var getter = attrHandle[name] || jQuery.find.attr;
    attrHandle[name] = function(elem, name, isXML) {
      var ret,
          handle;
      if (!isXML) {
        handle = attrHandle[name];
        attrHandle[name] = ret;
        ret = getter(elem, name, isXML) != null ? name.toLowerCase() : null;
        attrHandle[name] = handle;
      }
      return ret;
    };
  });
  var rfocusable = /^(?:input|select|textarea|button)$/i,
      rclickable = /^(?:a|area)$/i;
  jQuery.fn.extend({
    prop: function(name, value) {
      return access(this, jQuery.prop, name, value, arguments.length > 1);
    },
    removeProp: function(name) {
      return this.each(function() {
        delete this[jQuery.propFix[name] || name];
      });
    }
  });
  jQuery.extend({
    prop: function(elem, name, value) {
      var ret,
          hooks,
          nType = elem.nodeType;
      if (nType === 3 || nType === 8 || nType === 2) {
        return;
      }
      if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
        name = jQuery.propFix[name] || name;
        hooks = jQuery.propHooks[name];
      }
      if (value !== undefined) {
        if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
          return ret;
        }
        return (elem[name] = value);
      }
      if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
        return ret;
      }
      return elem[name];
    },
    propHooks: {tabIndex: {get: function(elem) {
          var tabindex = jQuery.find.attr(elem, "tabindex");
          return tabindex ? parseInt(tabindex, 10) : rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ? 0 : -1;
        }}},
    propFix: {
      "for": "htmlFor",
      "class": "className"
    }
  });
  if (!support.optSelected) {
    jQuery.propHooks.selected = {
      get: function(elem) {
        var parent = elem.parentNode;
        if (parent && parent.parentNode) {
          parent.parentNode.selectedIndex;
        }
        return null;
      },
      set: function(elem) {
        var parent = elem.parentNode;
        if (parent) {
          parent.selectedIndex;
          if (parent.parentNode) {
            parent.parentNode.selectedIndex;
          }
        }
      }
    };
  }
  jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
    jQuery.propFix[this.toLowerCase()] = this;
  });
  var rclass = /[\t\r\n\f]/g;
  function getClass(elem) {
    return elem.getAttribute && elem.getAttribute("class") || "";
  }
  jQuery.fn.extend({
    addClass: function(value) {
      var classes,
          elem,
          cur,
          curValue,
          clazz,
          j,
          finalValue,
          i = 0;
      if (jQuery.isFunction(value)) {
        return this.each(function(j) {
          jQuery(this).addClass(value.call(this, j, getClass(this)));
        });
      }
      if (typeof value === "string" && value) {
        classes = value.match(rnotwhite) || [];
        while ((elem = this[i++])) {
          curValue = getClass(elem);
          cur = elem.nodeType === 1 && (" " + curValue + " ").replace(rclass, " ");
          if (cur) {
            j = 0;
            while ((clazz = classes[j++])) {
              if (cur.indexOf(" " + clazz + " ") < 0) {
                cur += clazz + " ";
              }
            }
            finalValue = jQuery.trim(cur);
            if (curValue !== finalValue) {
              elem.setAttribute("class", finalValue);
            }
          }
        }
      }
      return this;
    },
    removeClass: function(value) {
      var classes,
          elem,
          cur,
          curValue,
          clazz,
          j,
          finalValue,
          i = 0;
      if (jQuery.isFunction(value)) {
        return this.each(function(j) {
          jQuery(this).removeClass(value.call(this, j, getClass(this)));
        });
      }
      if (!arguments.length) {
        return this.attr("class", "");
      }
      if (typeof value === "string" && value) {
        classes = value.match(rnotwhite) || [];
        while ((elem = this[i++])) {
          curValue = getClass(elem);
          cur = elem.nodeType === 1 && (" " + curValue + " ").replace(rclass, " ");
          if (cur) {
            j = 0;
            while ((clazz = classes[j++])) {
              while (cur.indexOf(" " + clazz + " ") > -1) {
                cur = cur.replace(" " + clazz + " ", " ");
              }
            }
            finalValue = jQuery.trim(cur);
            if (curValue !== finalValue) {
              elem.setAttribute("class", finalValue);
            }
          }
        }
      }
      return this;
    },
    toggleClass: function(value, stateVal) {
      var type = typeof value;
      if (typeof stateVal === "boolean" && type === "string") {
        return stateVal ? this.addClass(value) : this.removeClass(value);
      }
      if (jQuery.isFunction(value)) {
        return this.each(function(i) {
          jQuery(this).toggleClass(value.call(this, i, getClass(this), stateVal), stateVal);
        });
      }
      return this.each(function() {
        var className,
            i,
            self,
            classNames;
        if (type === "string") {
          i = 0;
          self = jQuery(this);
          classNames = value.match(rnotwhite) || [];
          while ((className = classNames[i++])) {
            if (self.hasClass(className)) {
              self.removeClass(className);
            } else {
              self.addClass(className);
            }
          }
        } else if (value === undefined || type === "boolean") {
          className = getClass(this);
          if (className) {
            dataPriv.set(this, "__className__", className);
          }
          if (this.setAttribute) {
            this.setAttribute("class", className || value === false ? "" : dataPriv.get(this, "__className__") || "");
          }
        }
      });
    },
    hasClass: function(selector) {
      var className,
          elem,
          i = 0;
      className = " " + selector + " ";
      while ((elem = this[i++])) {
        if (elem.nodeType === 1 && (" " + getClass(elem) + " ").replace(rclass, " ").indexOf(className) > -1) {
          return true;
        }
      }
      return false;
    }
  });
  var rreturn = /\r/g,
      rspaces = /[\x20\t\r\n\f]+/g;
  jQuery.fn.extend({val: function(value) {
      var hooks,
          ret,
          isFunction,
          elem = this[0];
      if (!arguments.length) {
        if (elem) {
          hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];
          if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
            return ret;
          }
          ret = elem.value;
          return typeof ret === "string" ? ret.replace(rreturn, "") : ret == null ? "" : ret;
        }
        return;
      }
      isFunction = jQuery.isFunction(value);
      return this.each(function(i) {
        var val;
        if (this.nodeType !== 1) {
          return;
        }
        if (isFunction) {
          val = value.call(this, i, jQuery(this).val());
        } else {
          val = value;
        }
        if (val == null) {
          val = "";
        } else if (typeof val === "number") {
          val += "";
        } else if (jQuery.isArray(val)) {
          val = jQuery.map(val, function(value) {
            return value == null ? "" : value + "";
          });
        }
        hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];
        if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
          this.value = val;
        }
      });
    }});
  jQuery.extend({valHooks: {
      option: {get: function(elem) {
          var val = jQuery.find.attr(elem, "value");
          return val != null ? val : jQuery.trim(jQuery.text(elem)).replace(rspaces, " ");
        }},
      select: {
        get: function(elem) {
          var value,
              option,
              options = elem.options,
              index = elem.selectedIndex,
              one = elem.type === "select-one" || index < 0,
              values = one ? null : [],
              max = one ? index + 1 : options.length,
              i = index < 0 ? max : one ? index : 0;
          for (; i < max; i++) {
            option = options[i];
            if ((option.selected || i === index) && (support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) {
              value = jQuery(option).val();
              if (one) {
                return value;
              }
              values.push(value);
            }
          }
          return values;
        },
        set: function(elem, value) {
          var optionSet,
              option,
              options = elem.options,
              values = jQuery.makeArray(value),
              i = options.length;
          while (i--) {
            option = options[i];
            if (option.selected = jQuery.inArray(jQuery.valHooks.option.get(option), values) > -1) {
              optionSet = true;
            }
          }
          if (!optionSet) {
            elem.selectedIndex = -1;
          }
          return values;
        }
      }
    }});
  jQuery.each(["radio", "checkbox"], function() {
    jQuery.valHooks[this] = {set: function(elem, value) {
        if (jQuery.isArray(value)) {
          return (elem.checked = jQuery.inArray(jQuery(elem).val(), value) > -1);
        }
      }};
    if (!support.checkOn) {
      jQuery.valHooks[this].get = function(elem) {
        return elem.getAttribute("value") === null ? "on" : elem.value;
      };
    }
  });
  var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;
  jQuery.extend(jQuery.event, {
    trigger: function(event, data, elem, onlyHandlers) {
      var i,
          cur,
          tmp,
          bubbleType,
          ontype,
          handle,
          special,
          eventPath = [elem || document],
          type = hasOwn.call(event, "type") ? event.type : event,
          namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
      cur = tmp = elem = elem || document;
      if (elem.nodeType === 3 || elem.nodeType === 8) {
        return;
      }
      if (rfocusMorph.test(type + jQuery.event.triggered)) {
        return;
      }
      if (type.indexOf(".") > -1) {
        namespaces = type.split(".");
        type = namespaces.shift();
        namespaces.sort();
      }
      ontype = type.indexOf(":") < 0 && "on" + type;
      event = event[jQuery.expando] ? event : new jQuery.Event(type, typeof event === "object" && event);
      event.isTrigger = onlyHandlers ? 2 : 3;
      event.namespace = namespaces.join(".");
      event.rnamespace = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
      event.result = undefined;
      if (!event.target) {
        event.target = elem;
      }
      data = data == null ? [event] : jQuery.makeArray(data, [event]);
      special = jQuery.event.special[type] || {};
      if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
        return;
      }
      if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
        bubbleType = special.delegateType || type;
        if (!rfocusMorph.test(bubbleType + type)) {
          cur = cur.parentNode;
        }
        for (; cur; cur = cur.parentNode) {
          eventPath.push(cur);
          tmp = cur;
        }
        if (tmp === (elem.ownerDocument || document)) {
          eventPath.push(tmp.defaultView || tmp.parentWindow || window);
        }
      }
      i = 0;
      while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
        event.type = i > 1 ? bubbleType : special.bindType || type;
        handle = (dataPriv.get(cur, "events") || {})[event.type] && dataPriv.get(cur, "handle");
        if (handle) {
          handle.apply(cur, data);
        }
        handle = ontype && cur[ontype];
        if (handle && handle.apply && acceptData(cur)) {
          event.result = handle.apply(cur, data);
          if (event.result === false) {
            event.preventDefault();
          }
        }
      }
      event.type = type;
      if (!onlyHandlers && !event.isDefaultPrevented()) {
        if ((!special._default || special._default.apply(eventPath.pop(), data) === false) && acceptData(elem)) {
          if (ontype && jQuery.isFunction(elem[type]) && !jQuery.isWindow(elem)) {
            tmp = elem[ontype];
            if (tmp) {
              elem[ontype] = null;
            }
            jQuery.event.triggered = type;
            elem[type]();
            jQuery.event.triggered = undefined;
            if (tmp) {
              elem[ontype] = tmp;
            }
          }
        }
      }
      return event.result;
    },
    simulate: function(type, elem, event) {
      var e = jQuery.extend(new jQuery.Event(), event, {
        type: type,
        isSimulated: true
      });
      jQuery.event.trigger(e, null, elem);
    }
  });
  jQuery.fn.extend({
    trigger: function(type, data) {
      return this.each(function() {
        jQuery.event.trigger(type, data, this);
      });
    },
    triggerHandler: function(type, data) {
      var elem = this[0];
      if (elem) {
        return jQuery.event.trigger(type, data, elem, true);
      }
    }
  });
  jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup error contextmenu").split(" "), function(i, name) {
    jQuery.fn[name] = function(data, fn) {
      return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
    };
  });
  jQuery.fn.extend({hover: function(fnOver, fnOut) {
      return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
    }});
  support.focusin = "onfocusin" in window;
  if (!support.focusin) {
    jQuery.each({
      focus: "focusin",
      blur: "focusout"
    }, function(orig, fix) {
      var handler = function(event) {
        jQuery.event.simulate(fix, event.target, jQuery.event.fix(event));
      };
      jQuery.event.special[fix] = {
        setup: function() {
          var doc = this.ownerDocument || this,
              attaches = dataPriv.access(doc, fix);
          if (!attaches) {
            doc.addEventListener(orig, handler, true);
          }
          dataPriv.access(doc, fix, (attaches || 0) + 1);
        },
        teardown: function() {
          var doc = this.ownerDocument || this,
              attaches = dataPriv.access(doc, fix) - 1;
          if (!attaches) {
            doc.removeEventListener(orig, handler, true);
            dataPriv.remove(doc, fix);
          } else {
            dataPriv.access(doc, fix, attaches);
          }
        }
      };
    });
  }
  var location = window.location;
  var nonce = jQuery.now();
  var rquery = (/\?/);
  jQuery.parseJSON = function(data) {
    return JSON.parse(data + "");
  };
  jQuery.parseXML = function(data) {
    var xml;
    if (!data || typeof data !== "string") {
      return null;
    }
    try {
      xml = (new window.DOMParser()).parseFromString(data, "text/xml");
    } catch (e) {
      xml = undefined;
    }
    if (!xml || xml.getElementsByTagName("parsererror").length) {
      jQuery.error("Invalid XML: " + data);
    }
    return xml;
  };
  var rhash = /#.*$/,
      rts = /([?&])_=[^&]*/,
      rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
      rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
      rnoContent = /^(?:GET|HEAD)$/,
      rprotocol = /^\/\//,
      prefilters = {},
      transports = {},
      allTypes = "*/".concat("*"),
      originAnchor = document.createElement("a");
  originAnchor.href = location.href;
  function addToPrefiltersOrTransports(structure) {
    return function(dataTypeExpression, func) {
      if (typeof dataTypeExpression !== "string") {
        func = dataTypeExpression;
        dataTypeExpression = "*";
      }
      var dataType,
          i = 0,
          dataTypes = dataTypeExpression.toLowerCase().match(rnotwhite) || [];
      if (jQuery.isFunction(func)) {
        while ((dataType = dataTypes[i++])) {
          if (dataType[0] === "+") {
            dataType = dataType.slice(1) || "*";
            (structure[dataType] = structure[dataType] || []).unshift(func);
          } else {
            (structure[dataType] = structure[dataType] || []).push(func);
          }
        }
      }
    };
  }
  function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
    var inspected = {},
        seekingTransport = (structure === transports);
    function inspect(dataType) {
      var selected;
      inspected[dataType] = true;
      jQuery.each(structure[dataType] || [], function(_, prefilterOrFactory) {
        var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
        if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {
          options.dataTypes.unshift(dataTypeOrTransport);
          inspect(dataTypeOrTransport);
          return false;
        } else if (seekingTransport) {
          return !(selected = dataTypeOrTransport);
        }
      });
      return selected;
    }
    return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
  }
  function ajaxExtend(target, src) {
    var key,
        deep,
        flatOptions = jQuery.ajaxSettings.flatOptions || {};
    for (key in src) {
      if (src[key] !== undefined) {
        (flatOptions[key] ? target : (deep || (deep = {})))[key] = src[key];
      }
    }
    if (deep) {
      jQuery.extend(true, target, deep);
    }
    return target;
  }
  function ajaxHandleResponses(s, jqXHR, responses) {
    var ct,
        type,
        finalDataType,
        firstDataType,
        contents = s.contents,
        dataTypes = s.dataTypes;
    while (dataTypes[0] === "*") {
      dataTypes.shift();
      if (ct === undefined) {
        ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
      }
    }
    if (ct) {
      for (type in contents) {
        if (contents[type] && contents[type].test(ct)) {
          dataTypes.unshift(type);
          break;
        }
      }
    }
    if (dataTypes[0] in responses) {
      finalDataType = dataTypes[0];
    } else {
      for (type in responses) {
        if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
          finalDataType = type;
          break;
        }
        if (!firstDataType) {
          firstDataType = type;
        }
      }
      finalDataType = finalDataType || firstDataType;
    }
    if (finalDataType) {
      if (finalDataType !== dataTypes[0]) {
        dataTypes.unshift(finalDataType);
      }
      return responses[finalDataType];
    }
  }
  function ajaxConvert(s, response, jqXHR, isSuccess) {
    var conv2,
        current,
        conv,
        tmp,
        prev,
        converters = {},
        dataTypes = s.dataTypes.slice();
    if (dataTypes[1]) {
      for (conv in s.converters) {
        converters[conv.toLowerCase()] = s.converters[conv];
      }
    }
    current = dataTypes.shift();
    while (current) {
      if (s.responseFields[current]) {
        jqXHR[s.responseFields[current]] = response;
      }
      if (!prev && isSuccess && s.dataFilter) {
        response = s.dataFilter(response, s.dataType);
      }
      prev = current;
      current = dataTypes.shift();
      if (current) {
        if (current === "*") {
          current = prev;
        } else if (prev !== "*" && prev !== current) {
          conv = converters[prev + " " + current] || converters["* " + current];
          if (!conv) {
            for (conv2 in converters) {
              tmp = conv2.split(" ");
              if (tmp[1] === current) {
                conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];
                if (conv) {
                  if (conv === true) {
                    conv = converters[conv2];
                  } else if (converters[conv2] !== true) {
                    current = tmp[0];
                    dataTypes.unshift(tmp[1]);
                  }
                  break;
                }
              }
            }
          }
          if (conv !== true) {
            if (conv && s.throws) {
              response = conv(response);
            } else {
              try {
                response = conv(response);
              } catch (e) {
                return {
                  state: "parsererror",
                  error: conv ? e : "No conversion from " + prev + " to " + current
                };
              }
            }
          }
        }
      }
    }
    return {
      state: "success",
      data: response
    };
  }
  jQuery.extend({
    active: 0,
    lastModified: {},
    etag: {},
    ajaxSettings: {
      url: location.href,
      type: "GET",
      isLocal: rlocalProtocol.test(location.protocol),
      global: true,
      processData: true,
      async: true,
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      accepts: {
        "*": allTypes,
        text: "text/plain",
        html: "text/html",
        xml: "application/xml, text/xml",
        json: "application/json, text/javascript"
      },
      contents: {
        xml: /\bxml\b/,
        html: /\bhtml/,
        json: /\bjson\b/
      },
      responseFields: {
        xml: "responseXML",
        text: "responseText",
        json: "responseJSON"
      },
      converters: {
        "* text": String,
        "text html": true,
        "text json": jQuery.parseJSON,
        "text xml": jQuery.parseXML
      },
      flatOptions: {
        url: true,
        context: true
      }
    },
    ajaxSetup: function(target, settings) {
      return settings ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : ajaxExtend(jQuery.ajaxSettings, target);
    },
    ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
    ajaxTransport: addToPrefiltersOrTransports(transports),
    ajax: function(url, options) {
      if (typeof url === "object") {
        options = url;
        url = undefined;
      }
      options = options || {};
      var transport,
          cacheURL,
          responseHeadersString,
          responseHeaders,
          timeoutTimer,
          urlAnchor,
          fireGlobals,
          i,
          s = jQuery.ajaxSetup({}, options),
          callbackContext = s.context || s,
          globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event,
          deferred = jQuery.Deferred(),
          completeDeferred = jQuery.Callbacks("once memory"),
          statusCode = s.statusCode || {},
          requestHeaders = {},
          requestHeadersNames = {},
          state = 0,
          strAbort = "canceled",
          jqXHR = {
            readyState: 0,
            getResponseHeader: function(key) {
              var match;
              if (state === 2) {
                if (!responseHeaders) {
                  responseHeaders = {};
                  while ((match = rheaders.exec(responseHeadersString))) {
                    responseHeaders[match[1].toLowerCase()] = match[2];
                  }
                }
                match = responseHeaders[key.toLowerCase()];
              }
              return match == null ? null : match;
            },
            getAllResponseHeaders: function() {
              return state === 2 ? responseHeadersString : null;
            },
            setRequestHeader: function(name, value) {
              var lname = name.toLowerCase();
              if (!state) {
                name = requestHeadersNames[lname] = requestHeadersNames[lname] || name;
                requestHeaders[name] = value;
              }
              return this;
            },
            overrideMimeType: function(type) {
              if (!state) {
                s.mimeType = type;
              }
              return this;
            },
            statusCode: function(map) {
              var code;
              if (map) {
                if (state < 2) {
                  for (code in map) {
                    statusCode[code] = [statusCode[code], map[code]];
                  }
                } else {
                  jqXHR.always(map[jqXHR.status]);
                }
              }
              return this;
            },
            abort: function(statusText) {
              var finalText = statusText || strAbort;
              if (transport) {
                transport.abort(finalText);
              }
              done(0, finalText);
              return this;
            }
          };
      deferred.promise(jqXHR).complete = completeDeferred.add;
      jqXHR.success = jqXHR.done;
      jqXHR.error = jqXHR.fail;
      s.url = ((url || s.url || location.href) + "").replace(rhash, "").replace(rprotocol, location.protocol + "//");
      s.type = options.method || options.type || s.method || s.type;
      s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(rnotwhite) || [""];
      if (s.crossDomain == null) {
        urlAnchor = document.createElement("a");
        try {
          urlAnchor.href = s.url;
          urlAnchor.href = urlAnchor.href;
          s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !== urlAnchor.protocol + "//" + urlAnchor.host;
        } catch (e) {
          s.crossDomain = true;
        }
      }
      if (s.data && s.processData && typeof s.data !== "string") {
        s.data = jQuery.param(s.data, s.traditional);
      }
      inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
      if (state === 2) {
        return jqXHR;
      }
      fireGlobals = jQuery.event && s.global;
      if (fireGlobals && jQuery.active++ === 0) {
        jQuery.event.trigger("ajaxStart");
      }
      s.type = s.type.toUpperCase();
      s.hasContent = !rnoContent.test(s.type);
      cacheURL = s.url;
      if (!s.hasContent) {
        if (s.data) {
          cacheURL = (s.url += (rquery.test(cacheURL) ? "&" : "?") + s.data);
          delete s.data;
        }
        if (s.cache === false) {
          s.url = rts.test(cacheURL) ? cacheURL.replace(rts, "$1_=" + nonce++) : cacheURL + (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++;
        }
      }
      if (s.ifModified) {
        if (jQuery.lastModified[cacheURL]) {
          jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
        }
        if (jQuery.etag[cacheURL]) {
          jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
        }
      }
      if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
        jqXHR.setRequestHeader("Content-Type", s.contentType);
      }
      jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);
      for (i in s.headers) {
        jqXHR.setRequestHeader(i, s.headers[i]);
      }
      if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || state === 2)) {
        return jqXHR.abort();
      }
      strAbort = "abort";
      for (i in {
        success: 1,
        error: 1,
        complete: 1
      }) {
        jqXHR[i](s[i]);
      }
      transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);
      if (!transport) {
        done(-1, "No Transport");
      } else {
        jqXHR.readyState = 1;
        if (fireGlobals) {
          globalEventContext.trigger("ajaxSend", [jqXHR, s]);
        }
        if (state === 2) {
          return jqXHR;
        }
        if (s.async && s.timeout > 0) {
          timeoutTimer = window.setTimeout(function() {
            jqXHR.abort("timeout");
          }, s.timeout);
        }
        try {
          state = 1;
          transport.send(requestHeaders, done);
        } catch (e) {
          if (state < 2) {
            done(-1, e);
          } else {
            throw e;
          }
        }
      }
      function done(status, nativeStatusText, responses, headers) {
        var isSuccess,
            success,
            error,
            response,
            modified,
            statusText = nativeStatusText;
        if (state === 2) {
          return;
        }
        state = 2;
        if (timeoutTimer) {
          window.clearTimeout(timeoutTimer);
        }
        transport = undefined;
        responseHeadersString = headers || "";
        jqXHR.readyState = status > 0 ? 4 : 0;
        isSuccess = status >= 200 && status < 300 || status === 304;
        if (responses) {
          response = ajaxHandleResponses(s, jqXHR, responses);
        }
        response = ajaxConvert(s, response, jqXHR, isSuccess);
        if (isSuccess) {
          if (s.ifModified) {
            modified = jqXHR.getResponseHeader("Last-Modified");
            if (modified) {
              jQuery.lastModified[cacheURL] = modified;
            }
            modified = jqXHR.getResponseHeader("etag");
            if (modified) {
              jQuery.etag[cacheURL] = modified;
            }
          }
          if (status === 204 || s.type === "HEAD") {
            statusText = "nocontent";
          } else if (status === 304) {
            statusText = "notmodified";
          } else {
            statusText = response.state;
            success = response.data;
            error = response.error;
            isSuccess = !error;
          }
        } else {
          error = statusText;
          if (status || !statusText) {
            statusText = "error";
            if (status < 0) {
              status = 0;
            }
          }
        }
        jqXHR.status = status;
        jqXHR.statusText = (nativeStatusText || statusText) + "";
        if (isSuccess) {
          deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
        } else {
          deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
        }
        jqXHR.statusCode(statusCode);
        statusCode = undefined;
        if (fireGlobals) {
          globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error]);
        }
        completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);
        if (fireGlobals) {
          globalEventContext.trigger("ajaxComplete", [jqXHR, s]);
          if (!(--jQuery.active)) {
            jQuery.event.trigger("ajaxStop");
          }
        }
      }
      return jqXHR;
    },
    getJSON: function(url, data, callback) {
      return jQuery.get(url, data, callback, "json");
    },
    getScript: function(url, callback) {
      return jQuery.get(url, undefined, callback, "script");
    }
  });
  jQuery.each(["get", "post"], function(i, method) {
    jQuery[method] = function(url, data, callback, type) {
      if (jQuery.isFunction(data)) {
        type = type || callback;
        callback = data;
        data = undefined;
      }
      return jQuery.ajax(jQuery.extend({
        url: url,
        type: method,
        dataType: type,
        data: data,
        success: callback
      }, jQuery.isPlainObject(url) && url));
    };
  });
  jQuery._evalUrl = function(url) {
    return jQuery.ajax({
      url: url,
      type: "GET",
      dataType: "script",
      async: false,
      global: false,
      "throws": true
    });
  };
  jQuery.fn.extend({
    wrapAll: function(html) {
      var wrap;
      if (jQuery.isFunction(html)) {
        return this.each(function(i) {
          jQuery(this).wrapAll(html.call(this, i));
        });
      }
      if (this[0]) {
        wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);
        if (this[0].parentNode) {
          wrap.insertBefore(this[0]);
        }
        wrap.map(function() {
          var elem = this;
          while (elem.firstElementChild) {
            elem = elem.firstElementChild;
          }
          return elem;
        }).append(this);
      }
      return this;
    },
    wrapInner: function(html) {
      if (jQuery.isFunction(html)) {
        return this.each(function(i) {
          jQuery(this).wrapInner(html.call(this, i));
        });
      }
      return this.each(function() {
        var self = jQuery(this),
            contents = self.contents();
        if (contents.length) {
          contents.wrapAll(html);
        } else {
          self.append(html);
        }
      });
    },
    wrap: function(html) {
      var isFunction = jQuery.isFunction(html);
      return this.each(function(i) {
        jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
      });
    },
    unwrap: function() {
      return this.parent().each(function() {
        if (!jQuery.nodeName(this, "body")) {
          jQuery(this).replaceWith(this.childNodes);
        }
      }).end();
    }
  });
  jQuery.expr.filters.hidden = function(elem) {
    return !jQuery.expr.filters.visible(elem);
  };
  jQuery.expr.filters.visible = function(elem) {
    return elem.offsetWidth > 0 || elem.offsetHeight > 0 || elem.getClientRects().length > 0;
  };
  var r20 = /%20/g,
      rbracket = /\[\]$/,
      rCRLF = /\r?\n/g,
      rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
      rsubmittable = /^(?:input|select|textarea|keygen)/i;
  function buildParams(prefix, obj, traditional, add) {
    var name;
    if (jQuery.isArray(obj)) {
      jQuery.each(obj, function(i, v) {
        if (traditional || rbracket.test(prefix)) {
          add(prefix, v);
        } else {
          buildParams(prefix + "[" + (typeof v === "object" && v != null ? i : "") + "]", v, traditional, add);
        }
      });
    } else if (!traditional && jQuery.type(obj) === "object") {
      for (name in obj) {
        buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
      }
    } else {
      add(prefix, obj);
    }
  }
  jQuery.param = function(a, traditional) {
    var prefix,
        s = [],
        add = function(key, value) {
          value = jQuery.isFunction(value) ? value() : (value == null ? "" : value);
          s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
        };
    if (traditional === undefined) {
      traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
    }
    if (jQuery.isArray(a) || (a.jquery && !jQuery.isPlainObject(a))) {
      jQuery.each(a, function() {
        add(this.name, this.value);
      });
    } else {
      for (prefix in a) {
        buildParams(prefix, a[prefix], traditional, add);
      }
    }
    return s.join("&").replace(r20, "+");
  };
  jQuery.fn.extend({
    serialize: function() {
      return jQuery.param(this.serializeArray());
    },
    serializeArray: function() {
      return this.map(function() {
        var elements = jQuery.prop(this, "elements");
        return elements ? jQuery.makeArray(elements) : this;
      }).filter(function() {
        var type = this.type;
        return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type));
      }).map(function(i, elem) {
        var val = jQuery(this).val();
        return val == null ? null : jQuery.isArray(val) ? jQuery.map(val, function(val) {
          return {
            name: elem.name,
            value: val.replace(rCRLF, "\r\n")
          };
        }) : {
          name: elem.name,
          value: val.replace(rCRLF, "\r\n")
        };
      }).get();
    }
  });
  jQuery.ajaxSettings.xhr = function() {
    try {
      return new window.XMLHttpRequest();
    } catch (e) {}
  };
  var xhrSuccessStatus = {
    0: 200,
    1223: 204
  },
      xhrSupported = jQuery.ajaxSettings.xhr();
  support.cors = !!xhrSupported && ("withCredentials" in xhrSupported);
  support.ajax = xhrSupported = !!xhrSupported;
  jQuery.ajaxTransport(function(options) {
    var callback,
        errorCallback;
    if (support.cors || xhrSupported && !options.crossDomain) {
      return {
        send: function(headers, complete) {
          var i,
              xhr = options.xhr();
          xhr.open(options.type, options.url, options.async, options.username, options.password);
          if (options.xhrFields) {
            for (i in options.xhrFields) {
              xhr[i] = options.xhrFields[i];
            }
          }
          if (options.mimeType && xhr.overrideMimeType) {
            xhr.overrideMimeType(options.mimeType);
          }
          if (!options.crossDomain && !headers["X-Requested-With"]) {
            headers["X-Requested-With"] = "XMLHttpRequest";
          }
          for (i in headers) {
            xhr.setRequestHeader(i, headers[i]);
          }
          callback = function(type) {
            return function() {
              if (callback) {
                callback = errorCallback = xhr.onload = xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;
                if (type === "abort") {
                  xhr.abort();
                } else if (type === "error") {
                  if (typeof xhr.status !== "number") {
                    complete(0, "error");
                  } else {
                    complete(xhr.status, xhr.statusText);
                  }
                } else {
                  complete(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText, (xhr.responseType || "text") !== "text" || typeof xhr.responseText !== "string" ? {binary: xhr.response} : {text: xhr.responseText}, xhr.getAllResponseHeaders());
                }
              }
            };
          };
          xhr.onload = callback();
          errorCallback = xhr.onerror = callback("error");
          if (xhr.onabort !== undefined) {
            xhr.onabort = errorCallback;
          } else {
            xhr.onreadystatechange = function() {
              if (xhr.readyState === 4) {
                window.setTimeout(function() {
                  if (callback) {
                    errorCallback();
                  }
                });
              }
            };
          }
          callback = callback("abort");
          try {
            xhr.send(options.hasContent && options.data || null);
          } catch (e) {
            if (callback) {
              throw e;
            }
          }
        },
        abort: function() {
          if (callback) {
            callback();
          }
        }
      };
    }
  });
  jQuery.ajaxSetup({
    accepts: {script: "text/javascript, application/javascript, " + "application/ecmascript, application/x-ecmascript"},
    contents: {script: /\b(?:java|ecma)script\b/},
    converters: {"text script": function(text) {
        jQuery.globalEval(text);
        return text;
      }}
  });
  jQuery.ajaxPrefilter("script", function(s) {
    if (s.cache === undefined) {
      s.cache = false;
    }
    if (s.crossDomain) {
      s.type = "GET";
    }
  });
  jQuery.ajaxTransport("script", function(s) {
    if (s.crossDomain) {
      var script,
          callback;
      return {
        send: function(_, complete) {
          script = jQuery("<script>").prop({
            charset: s.scriptCharset,
            src: s.url
          }).on("load error", callback = function(evt) {
            script.remove();
            callback = null;
            if (evt) {
              complete(evt.type === "error" ? 404 : 200, evt.type);
            }
          });
          document.head.appendChild(script[0]);
        },
        abort: function() {
          if (callback) {
            callback();
          }
        }
      };
    }
  });
  var oldCallbacks = [],
      rjsonp = /(=)\?(?=&|$)|\?\?/;
  jQuery.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function() {
      var callback = oldCallbacks.pop() || (jQuery.expando + "_" + (nonce++));
      this[callback] = true;
      return callback;
    }
  });
  jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
    var callbackName,
        overwritten,
        responseContainer,
        jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? "url" : typeof s.data === "string" && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && rjsonp.test(s.data) && "data");
    if (jsonProp || s.dataTypes[0] === "jsonp") {
      callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;
      if (jsonProp) {
        s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
      } else if (s.jsonp !== false) {
        s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
      }
      s.converters["script json"] = function() {
        if (!responseContainer) {
          jQuery.error(callbackName + " was not called");
        }
        return responseContainer[0];
      };
      s.dataTypes[0] = "json";
      overwritten = window[callbackName];
      window[callbackName] = function() {
        responseContainer = arguments;
      };
      jqXHR.always(function() {
        if (overwritten === undefined) {
          jQuery(window).removeProp(callbackName);
        } else {
          window[callbackName] = overwritten;
        }
        if (s[callbackName]) {
          s.jsonpCallback = originalSettings.jsonpCallback;
          oldCallbacks.push(callbackName);
        }
        if (responseContainer && jQuery.isFunction(overwritten)) {
          overwritten(responseContainer[0]);
        }
        responseContainer = overwritten = undefined;
      });
      return "script";
    }
  });
  jQuery.parseHTML = function(data, context, keepScripts) {
    if (!data || typeof data !== "string") {
      return null;
    }
    if (typeof context === "boolean") {
      keepScripts = context;
      context = false;
    }
    context = context || document;
    var parsed = rsingleTag.exec(data),
        scripts = !keepScripts && [];
    if (parsed) {
      return [context.createElement(parsed[1])];
    }
    parsed = buildFragment([data], context, scripts);
    if (scripts && scripts.length) {
      jQuery(scripts).remove();
    }
    return jQuery.merge([], parsed.childNodes);
  };
  var _load = jQuery.fn.load;
  jQuery.fn.load = function(url, params, callback) {
    if (typeof url !== "string" && _load) {
      return _load.apply(this, arguments);
    }
    var selector,
        type,
        response,
        self = this,
        off = url.indexOf(" ");
    if (off > -1) {
      selector = jQuery.trim(url.slice(off));
      url = url.slice(0, off);
    }
    if (jQuery.isFunction(params)) {
      callback = params;
      params = undefined;
    } else if (params && typeof params === "object") {
      type = "POST";
    }
    if (self.length > 0) {
      jQuery.ajax({
        url: url,
        type: type || "GET",
        dataType: "html",
        data: params
      }).done(function(responseText) {
        response = arguments;
        self.html(selector ? jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) : responseText);
      }).always(callback && function(jqXHR, status) {
        self.each(function() {
          callback.apply(this, response || [jqXHR.responseText, status, jqXHR]);
        });
      });
    }
    return this;
  };
  jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(i, type) {
    jQuery.fn[type] = function(fn) {
      return this.on(type, fn);
    };
  });
  jQuery.expr.filters.animated = function(elem) {
    return jQuery.grep(jQuery.timers, function(fn) {
      return elem === fn.elem;
    }).length;
  };
  function getWindow(elem) {
    return jQuery.isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
  }
  jQuery.offset = {setOffset: function(elem, options, i) {
      var curPosition,
          curLeft,
          curCSSTop,
          curTop,
          curOffset,
          curCSSLeft,
          calculatePosition,
          position = jQuery.css(elem, "position"),
          curElem = jQuery(elem),
          props = {};
      if (position === "static") {
        elem.style.position = "relative";
      }
      curOffset = curElem.offset();
      curCSSTop = jQuery.css(elem, "top");
      curCSSLeft = jQuery.css(elem, "left");
      calculatePosition = (position === "absolute" || position === "fixed") && (curCSSTop + curCSSLeft).indexOf("auto") > -1;
      if (calculatePosition) {
        curPosition = curElem.position();
        curTop = curPosition.top;
        curLeft = curPosition.left;
      } else {
        curTop = parseFloat(curCSSTop) || 0;
        curLeft = parseFloat(curCSSLeft) || 0;
      }
      if (jQuery.isFunction(options)) {
        options = options.call(elem, i, jQuery.extend({}, curOffset));
      }
      if (options.top != null) {
        props.top = (options.top - curOffset.top) + curTop;
      }
      if (options.left != null) {
        props.left = (options.left - curOffset.left) + curLeft;
      }
      if ("using" in options) {
        options.using.call(elem, props);
      } else {
        curElem.css(props);
      }
    }};
  jQuery.fn.extend({
    offset: function(options) {
      if (arguments.length) {
        return options === undefined ? this : this.each(function(i) {
          jQuery.offset.setOffset(this, options, i);
        });
      }
      var docElem,
          win,
          elem = this[0],
          box = {
            top: 0,
            left: 0
          },
          doc = elem && elem.ownerDocument;
      if (!doc) {
        return;
      }
      docElem = doc.documentElement;
      if (!jQuery.contains(docElem, elem)) {
        return box;
      }
      box = elem.getBoundingClientRect();
      win = getWindow(doc);
      return {
        top: box.top + win.pageYOffset - docElem.clientTop,
        left: box.left + win.pageXOffset - docElem.clientLeft
      };
    },
    position: function() {
      if (!this[0]) {
        return;
      }
      var offsetParent,
          offset,
          elem = this[0],
          parentOffset = {
            top: 0,
            left: 0
          };
      if (jQuery.css(elem, "position") === "fixed") {
        offset = elem.getBoundingClientRect();
      } else {
        offsetParent = this.offsetParent();
        offset = this.offset();
        if (!jQuery.nodeName(offsetParent[0], "html")) {
          parentOffset = offsetParent.offset();
        }
        parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", true);
        parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", true);
      }
      return {
        top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
        left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
      };
    },
    offsetParent: function() {
      return this.map(function() {
        var offsetParent = this.offsetParent;
        while (offsetParent && jQuery.css(offsetParent, "position") === "static") {
          offsetParent = offsetParent.offsetParent;
        }
        return offsetParent || documentElement;
      });
    }
  });
  jQuery.each({
    scrollLeft: "pageXOffset",
    scrollTop: "pageYOffset"
  }, function(method, prop) {
    var top = "pageYOffset" === prop;
    jQuery.fn[method] = function(val) {
      return access(this, function(elem, method, val) {
        var win = getWindow(elem);
        if (val === undefined) {
          return win ? win[prop] : elem[method];
        }
        if (win) {
          win.scrollTo(!top ? val : win.pageXOffset, top ? val : win.pageYOffset);
        } else {
          elem[method] = val;
        }
      }, method, val, arguments.length);
    };
  });
  jQuery.each(["top", "left"], function(i, prop) {
    jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function(elem, computed) {
      if (computed) {
        computed = curCSS(elem, prop);
        return rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed;
      }
    });
  });
  jQuery.each({
    Height: "height",
    Width: "width"
  }, function(name, type) {
    jQuery.each({
      padding: "inner" + name,
      content: type,
      "": "outer" + name
    }, function(defaultExtra, funcName) {
      jQuery.fn[funcName] = function(margin, value) {
        var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"),
            extra = defaultExtra || (margin === true || value === true ? "margin" : "border");
        return access(this, function(elem, type, value) {
          var doc;
          if (jQuery.isWindow(elem)) {
            return elem.document.documentElement["client" + name];
          }
          if (elem.nodeType === 9) {
            doc = elem.documentElement;
            return Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name]);
          }
          return value === undefined ? jQuery.css(elem, type, extra) : jQuery.style(elem, type, value, extra);
        }, type, chainable ? margin : undefined, chainable, null);
      };
    });
  });
  jQuery.fn.extend({
    bind: function(types, data, fn) {
      return this.on(types, null, data, fn);
    },
    unbind: function(types, fn) {
      return this.off(types, null, fn);
    },
    delegate: function(selector, types, data, fn) {
      return this.on(types, selector, data, fn);
    },
    undelegate: function(selector, types, fn) {
      return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
    },
    size: function() {
      return this.length;
    }
  });
  jQuery.fn.andSelf = jQuery.fn.addBack;
  if (typeof define === "function" && define.amd) {
    define("npm:jquery@2.2.4/dist/jquery.js", [], function() {
      return jQuery;
    }) && define("jquery", ["npm:jquery@2.2.4/dist/jquery.js"], function(m) {
      return m;
    });
  }
  var _jQuery = window.jQuery,
      _$ = window.$;
  jQuery.noConflict = function(deep) {
    if (window.$ === jQuery) {
      window.$ = _$;
    }
    if (deep && window.jQuery === jQuery) {
      window.jQuery = _jQuery;
    }
    return jQuery;
  };
  if (!noGlobal) {
    window.jQuery = window.$ = jQuery;
  }
  return jQuery;
}));

})();
(function() {
var define = System.amdDefine;
define("npm:jquery@2.2.4.js", ["npm:jquery@2.2.4/dist/jquery.js"], function(main) {
  return main;
});

})();
System.registerDynamic("npm:process@0.11.3/browser.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var process = module.exports = {};
  var queue = [];
  var draining = false;
  var currentQueue;
  var queueIndex = -1;
  function cleanUpNextTick() {
    if (!draining || !currentQueue) {
      return;
    }
    draining = false;
    if (currentQueue.length) {
      queue = currentQueue.concat(queue);
    } else {
      queueIndex = -1;
    }
    if (queue.length) {
      drainQueue();
    }
  }
  function drainQueue() {
    if (draining) {
      return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;
    var len = queue.length;
    while (len) {
      currentQueue = queue;
      queue = [];
      while (++queueIndex < len) {
        if (currentQueue) {
          currentQueue[queueIndex].run();
        }
      }
      queueIndex = -1;
      len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
  }
  process.nextTick = function(fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
      for (var i = 1; i < arguments.length; i++) {
        args[i - 1] = arguments[i];
      }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
      setTimeout(drainQueue, 0);
    }
  };
  function Item(fun, array) {
    this.fun = fun;
    this.array = array;
  }
  Item.prototype.run = function() {
    this.fun.apply(null, this.array);
  };
  process.title = 'browser';
  process.browser = true;
  process.env = {};
  process.argv = [];
  process.version = '';
  process.versions = {};
  function noop() {}
  process.on = noop;
  process.addListener = noop;
  process.once = noop;
  process.off = noop;
  process.removeListener = noop;
  process.removeAllListeners = noop;
  process.emit = noop;
  process.binding = function(name) {
    throw new Error('process.binding is not supported');
  };
  process.cwd = function() {
    return '/';
  };
  process.chdir = function(dir) {
    throw new Error('process.chdir is not supported');
  };
  process.umask = function() {
    return 0;
  };
  return module.exports;
});

System.registerDynamic("npm:process@0.11.3.js", ["npm:process@0.11.3/browser.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('npm:process@0.11.3/browser.js');
  return module.exports;
});

System.registerDynamic("github:jspm/nodelibs-process@0.1.2/index.js", ["npm:process@0.11.3.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = System._nodeRequire ? process : $__require('npm:process@0.11.3.js');
  return module.exports;
});

System.registerDynamic("github:jspm/nodelibs-process@0.1.2.js", ["github:jspm/nodelibs-process@0.1.2/index.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('github:jspm/nodelibs-process@0.1.2/index.js');
  return module.exports;
});

System.registerDynamic("npm:browser-request@0.3.3/index.js", ["github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  "format cjs";
  (function(process) {
    (function(root, factory) {
      if (typeof define === 'function' && define.amd) {
        define([], factory);
      } else if (typeof exports === 'object') {
        module.exports = factory();
      } else {
        root.returnExports = factory();
      }
    }(this, function() {
      var XHR = XMLHttpRequest;
      if (!XHR)
        throw new Error('missing XMLHttpRequest');
      request.log = {
        'trace': noop,
        'debug': noop,
        'info': noop,
        'warn': noop,
        'error': noop
      };
      var DEFAULT_TIMEOUT = 3 * 60 * 1000;
      function request(options, callback) {
        if (typeof callback !== 'function')
          throw new Error('Bad callback given: ' + callback);
        if (!options)
          throw new Error('No options given');
        var options_onResponse = options.onResponse;
        if (typeof options === 'string')
          options = {'uri': options};
        else
          options = JSON.parse(JSON.stringify(options));
        options.onResponse = options_onResponse;
        if (options.verbose)
          request.log = getLogger();
        if (options.url) {
          options.uri = options.url;
          delete options.url;
        }
        if (!options.uri && options.uri !== "")
          throw new Error("options.uri is a required argument");
        if (typeof options.uri != "string")
          throw new Error("options.uri must be a string");
        var unsupported_options = ['proxy', '_redirectsFollowed', 'maxRedirects', 'followRedirect'];
        for (var i = 0; i < unsupported_options.length; i++)
          if (options[unsupported_options[i]])
            throw new Error("options." + unsupported_options[i] + " is not supported");
        options.callback = callback;
        options.method = options.method || 'GET';
        options.headers = options.headers || {};
        options.body = options.body || null;
        options.timeout = options.timeout || request.DEFAULT_TIMEOUT;
        if (options.headers.host)
          throw new Error("Options.headers.host is not supported");
        if (options.json) {
          options.headers.accept = options.headers.accept || 'application/json';
          if (options.method !== 'GET')
            options.headers['content-type'] = 'application/json';
          if (typeof options.json !== 'boolean')
            options.body = JSON.stringify(options.json);
          else if (typeof options.body !== 'string')
            options.body = JSON.stringify(options.body);
        }
        var serialize = function(obj) {
          var str = [];
          for (var p in obj)
            if (obj.hasOwnProperty(p)) {
              str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
          return str.join("&");
        };
        if (options.qs) {
          var qs = (typeof options.qs == 'string') ? options.qs : serialize(options.qs);
          if (options.uri.indexOf('?') !== -1) {
            options.uri = options.uri + '&' + qs;
          } else {
            options.uri = options.uri + '?' + qs;
          }
        }
        var multipart = function(obj) {
          var result = {};
          result.boundry = '-------------------------------' + Math.floor(Math.random() * 1000000000);
          var lines = [];
          for (var p in obj) {
            if (obj.hasOwnProperty(p)) {
              lines.push('--' + result.boundry + "\n" + 'Content-Disposition: form-data; name="' + p + '"' + "\n" + "\n" + obj[p] + "\n");
            }
          }
          lines.push('--' + result.boundry + '--');
          result.body = lines.join('');
          result.length = result.body.length;
          result.type = 'multipart/form-data; boundary=' + result.boundry;
          return result;
        };
        if (options.form) {
          if (typeof options.form == 'string')
            throw ('form name unsupported');
          if (options.method === 'POST') {
            var encoding = (options.encoding || 'application/x-www-form-urlencoded').toLowerCase();
            options.headers['content-type'] = encoding;
            switch (encoding) {
              case 'application/x-www-form-urlencoded':
                options.body = serialize(options.form).replace(/%20/g, "+");
                break;
              case 'multipart/form-data':
                var multi = multipart(options.form);
                options.body = multi.body;
                options.headers['content-type'] = multi.type;
                break;
              default:
                throw new Error('unsupported encoding:' + encoding);
            }
          }
        }
        options.onResponse = options.onResponse || noop;
        if (options.onResponse === true) {
          options.onResponse = callback;
          options.callback = noop;
        }
        if (!options.headers.authorization && options.auth)
          options.headers.authorization = 'Basic ' + b64_enc(options.auth.username + ':' + options.auth.password);
        return run_xhr(options);
      }
      var req_seq = 0;
      function run_xhr(options) {
        var xhr = new XHR,
            timed_out = false,
            is_cors = is_crossDomain(options.uri),
            supports_cors = ('withCredentials' in xhr);
        req_seq += 1;
        xhr.seq_id = req_seq;
        xhr.id = req_seq + ': ' + options.method + ' ' + options.uri;
        xhr._id = xhr.id;
        if (is_cors && !supports_cors) {
          var cors_err = new Error('Browser does not support cross-origin request: ' + options.uri);
          cors_err.cors = 'unsupported';
          return options.callback(cors_err, xhr);
        }
        xhr.timeoutTimer = setTimeout(too_late, options.timeout);
        function too_late() {
          timed_out = true;
          var er = new Error('ETIMEDOUT');
          er.code = 'ETIMEDOUT';
          er.duration = options.timeout;
          request.log.error('Timeout', {
            'id': xhr._id,
            'milliseconds': options.timeout
          });
          return options.callback(er, xhr);
        }
        var did = {
          'response': false,
          'loading': false,
          'end': false
        };
        xhr.onreadystatechange = on_state_change;
        xhr.open(options.method, options.uri, true);
        if (is_cors)
          xhr.withCredentials = !!options.withCredentials;
        xhr.send(options.body);
        return xhr;
        function on_state_change(event) {
          if (timed_out)
            return request.log.debug('Ignoring timed out state change', {
              'state': xhr.readyState,
              'id': xhr.id
            });
          request.log.debug('State change', {
            'state': xhr.readyState,
            'id': xhr.id,
            'timed_out': timed_out
          });
          if (xhr.readyState === XHR.OPENED) {
            request.log.debug('Request started', {'id': xhr.id});
            for (var key in options.headers)
              xhr.setRequestHeader(key, options.headers[key]);
          } else if (xhr.readyState === XHR.HEADERS_RECEIVED)
            on_response();
          else if (xhr.readyState === XHR.LOADING) {
            on_response();
            on_loading();
          } else if (xhr.readyState === XHR.DONE) {
            on_response();
            on_loading();
            on_end();
          }
        }
        function on_response() {
          if (did.response)
            return;
          did.response = true;
          request.log.debug('Got response', {
            'id': xhr.id,
            'status': xhr.status
          });
          clearTimeout(xhr.timeoutTimer);
          xhr.statusCode = xhr.status;
          if (is_cors && xhr.statusCode == 0) {
            var cors_err = new Error('CORS request rejected: ' + options.uri);
            cors_err.cors = 'rejected';
            did.loading = true;
            did.end = true;
            return options.callback(cors_err, xhr);
          }
          options.onResponse(null, xhr);
        }
        function on_loading() {
          if (did.loading)
            return;
          did.loading = true;
          request.log.debug('Response body loading', {'id': xhr.id});
        }
        function on_end() {
          if (did.end)
            return;
          did.end = true;
          request.log.debug('Request done', {'id': xhr.id});
          xhr.body = xhr.responseText;
          if (options.json) {
            try {
              xhr.body = JSON.parse(xhr.responseText);
            } catch (er) {
              return options.callback(er, xhr);
            }
          }
          options.callback(null, xhr, xhr.body);
        }
      }
      request.withCredentials = false;
      request.DEFAULT_TIMEOUT = DEFAULT_TIMEOUT;
      request.defaults = function(options, requester) {
        var def = function(method) {
          var d = function(params, callback) {
            if (typeof params === 'string')
              params = {'uri': params};
            else {
              params = JSON.parse(JSON.stringify(params));
            }
            for (var i in options) {
              if (params[i] === undefined)
                params[i] = options[i];
            }
            return method(params, callback);
          };
          return d;
        };
        var de = def(request);
        de.get = def(request.get);
        de.post = def(request.post);
        de.put = def(request.put);
        de.head = def(request.head);
        return de;
      };
      var shortcuts = ['get', 'put', 'post', 'head'];
      shortcuts.forEach(function(shortcut) {
        var method = shortcut.toUpperCase();
        var func = shortcut.toLowerCase();
        request[func] = function(opts) {
          if (typeof opts === 'string')
            opts = {
              'method': method,
              'uri': opts
            };
          else {
            opts = JSON.parse(JSON.stringify(opts));
            opts.method = method;
          }
          var args = [opts].concat(Array.prototype.slice.apply(arguments, [1]));
          return request.apply(this, args);
        };
      });
      request.couch = function(options, callback) {
        if (typeof options === 'string')
          options = {'uri': options};
        options.json = true;
        if (options.body)
          options.json = options.body;
        delete options.body;
        callback = callback || noop;
        var xhr = request(options, couch_handler);
        return xhr;
        function couch_handler(er, resp, body) {
          if (er)
            return callback(er, resp, body);
          if ((resp.statusCode < 200 || resp.statusCode > 299) && body.error) {
            er = new Error('CouchDB error: ' + (body.error.reason || body.error.error));
            for (var key in body)
              er[key] = body[key];
            return callback(er, resp, body);
          }
          return callback(er, resp, body);
        }
      };
      function noop() {}
      function getLogger() {
        var logger = {},
            levels = ['trace', 'debug', 'info', 'warn', 'error'],
            level,
            i;
        for (i = 0; i < levels.length; i++) {
          level = levels[i];
          logger[level] = noop;
          if (typeof console !== 'undefined' && console && console[level])
            logger[level] = formatted(console, level);
        }
        return logger;
      }
      function formatted(obj, method) {
        return formatted_logger;
        function formatted_logger(str, context) {
          if (typeof context === 'object')
            str += ' ' + JSON.stringify(context);
          return obj[method].call(obj, str);
        }
      }
      function is_crossDomain(url) {
        var rurl = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/;
        var ajaxLocation;
        try {
          ajaxLocation = location.href;
        } catch (e) {
          ajaxLocation = document.createElement("a");
          ajaxLocation.href = "";
          ajaxLocation = ajaxLocation.href;
        }
        var ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [],
            parts = rurl.exec(url.toLowerCase());
        var result = !!(parts && (parts[1] != ajaxLocParts[1] || parts[2] != ajaxLocParts[2] || (parts[3] || (parts[1] === "http:" ? 80 : 443)) != (ajaxLocParts[3] || (ajaxLocParts[1] === "http:" ? 80 : 443))));
        return result;
      }
      function b64_enc(data) {
        var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var o1,
            o2,
            o3,
            h1,
            h2,
            h3,
            h4,
            bits,
            i = 0,
            ac = 0,
            enc = "",
            tmp_arr = [];
        if (!data) {
          return data;
        }
        do {
          o1 = data.charCodeAt(i++);
          o2 = data.charCodeAt(i++);
          o3 = data.charCodeAt(i++);
          bits = o1 << 16 | o2 << 8 | o3;
          h1 = bits >> 18 & 0x3f;
          h2 = bits >> 12 & 0x3f;
          h3 = bits >> 6 & 0x3f;
          h4 = bits & 0x3f;
          tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
        } while (i < data.length);
        enc = tmp_arr.join('');
        switch (data.length % 3) {
          case 1:
            enc = enc.slice(0, -2) + '==';
            break;
          case 2:
            enc = enc.slice(0, -1) + '=';
            break;
        }
        return enc;
      }
      return request;
    }));
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:browser-request@0.3.3.js", ["npm:browser-request@0.3.3/index.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('npm:browser-request@0.3.3/index.js');
  return module.exports;
});

System.registerDynamic("npm:bluebird@3.4.0/js/browser/bluebird.js", [], false, function($__require, $__exports, $__module) {
  var _retrieveGlobal = System.get("@@global-helpers").prepareGlobal($__module.id, null, null);
  (function() {
    "format global";
    !function(e) {
      if ("object" == typeof exports && "undefined" != typeof module)
        module.exports = e();
      else if ("function" == typeof define && define.amd)
        define([], e);
      else {
        var f;
        "undefined" != typeof window ? f = window : "undefined" != typeof global ? f = global : "undefined" != typeof self && (f = self), f.Promise = e();
      }
    }(function() {
      var define,
          module,
          exports;
      return (function e(t, n, r) {
        function s(o, u) {
          if (!n[o]) {
            if (!t[o]) {
              var a = typeof _dereq_ == "function" && _dereq_;
              if (!u && a)
                return a(o, !0);
              if (i)
                return i(o, !0);
              var f = new Error("Cannot find module '" + o + "'");
              throw f.code = "MODULE_NOT_FOUND", f;
            }
            var l = n[o] = {exports: {}};
            t[o][0].call(l.exports, function(e) {
              var n = t[o][1][e];
              return s(n ? n : e);
            }, l, l.exports, e, t, n, r);
          }
          return n[o].exports;
        }
        var i = typeof _dereq_ == "function" && _dereq_;
        for (var o = 0; o < r.length; o++)
          s(r[o]);
        return s;
      })({
        1: [function(_dereq_, module, exports) {
          "use strict";
          module.exports = function(Promise) {
            var SomePromiseArray = Promise._SomePromiseArray;
            function any(promises) {
              var ret = new SomePromiseArray(promises);
              var promise = ret.promise();
              ret.setHowMany(1);
              ret.setUnwrap();
              ret.init();
              return promise;
            }
            Promise.any = function(promises) {
              return any(promises);
            };
            Promise.prototype.any = function() {
              return any(this);
            };
          };
        }, {}],
        2: [function(_dereq_, module, exports) {
          "use strict";
          var firstLineError;
          try {
            throw new Error();
          } catch (e) {
            firstLineError = e;
          }
          var schedule = _dereq_("./schedule");
          var Queue = _dereq_("./queue");
          var util = _dereq_("./util");
          function Async() {
            this._customScheduler = false;
            this._isTickUsed = false;
            this._lateQueue = new Queue(16);
            this._normalQueue = new Queue(16);
            this._haveDrainedQueues = false;
            this._trampolineEnabled = true;
            var self = this;
            this.drainQueues = function() {
              self._drainQueues();
            };
            this._schedule = schedule;
          }
          Async.prototype.setScheduler = function(fn) {
            var prev = this._schedule;
            this._schedule = fn;
            this._customScheduler = true;
            return prev;
          };
          Async.prototype.hasCustomScheduler = function() {
            return this._customScheduler;
          };
          Async.prototype.enableTrampoline = function() {
            this._trampolineEnabled = true;
          };
          Async.prototype.disableTrampolineIfNecessary = function() {
            if (util.hasDevTools) {
              this._trampolineEnabled = false;
            }
          };
          Async.prototype.haveItemsQueued = function() {
            return this._isTickUsed || this._haveDrainedQueues;
          };
          Async.prototype.fatalError = function(e, isNode) {
            if (isNode) {
              process.stderr.write("Fatal " + (e instanceof Error ? e.stack : e) + "\n");
              process.exit(2);
            } else {
              this.throwLater(e);
            }
          };
          Async.prototype.throwLater = function(fn, arg) {
            if (arguments.length === 1) {
              arg = fn;
              fn = function() {
                throw arg;
              };
            }
            if (typeof setTimeout !== "undefined") {
              setTimeout(function() {
                fn(arg);
              }, 0);
            } else
              try {
                this._schedule(function() {
                  fn(arg);
                });
              } catch (e) {
                throw new Error("No async scheduler available\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
              }
          };
          function AsyncInvokeLater(fn, receiver, arg) {
            this._lateQueue.push(fn, receiver, arg);
            this._queueTick();
          }
          function AsyncInvoke(fn, receiver, arg) {
            this._normalQueue.push(fn, receiver, arg);
            this._queueTick();
          }
          function AsyncSettlePromises(promise) {
            this._normalQueue._pushOne(promise);
            this._queueTick();
          }
          if (!util.hasDevTools) {
            Async.prototype.invokeLater = AsyncInvokeLater;
            Async.prototype.invoke = AsyncInvoke;
            Async.prototype.settlePromises = AsyncSettlePromises;
          } else {
            Async.prototype.invokeLater = function(fn, receiver, arg) {
              if (this._trampolineEnabled) {
                AsyncInvokeLater.call(this, fn, receiver, arg);
              } else {
                this._schedule(function() {
                  setTimeout(function() {
                    fn.call(receiver, arg);
                  }, 100);
                });
              }
            };
            Async.prototype.invoke = function(fn, receiver, arg) {
              if (this._trampolineEnabled) {
                AsyncInvoke.call(this, fn, receiver, arg);
              } else {
                this._schedule(function() {
                  fn.call(receiver, arg);
                });
              }
            };
            Async.prototype.settlePromises = function(promise) {
              if (this._trampolineEnabled) {
                AsyncSettlePromises.call(this, promise);
              } else {
                this._schedule(function() {
                  promise._settlePromises();
                });
              }
            };
          }
          Async.prototype.invokeFirst = function(fn, receiver, arg) {
            this._normalQueue.unshift(fn, receiver, arg);
            this._queueTick();
          };
          Async.prototype._drainQueue = function(queue) {
            while (queue.length() > 0) {
              var fn = queue.shift();
              if (typeof fn !== "function") {
                fn._settlePromises();
                continue;
              }
              var receiver = queue.shift();
              var arg = queue.shift();
              fn.call(receiver, arg);
            }
          };
          Async.prototype._drainQueues = function() {
            this._drainQueue(this._normalQueue);
            this._reset();
            this._haveDrainedQueues = true;
            this._drainQueue(this._lateQueue);
          };
          Async.prototype._queueTick = function() {
            if (!this._isTickUsed) {
              this._isTickUsed = true;
              this._schedule(this.drainQueues);
            }
          };
          Async.prototype._reset = function() {
            this._isTickUsed = false;
          };
          module.exports = Async;
          module.exports.firstLineError = firstLineError;
        }, {
          "./queue": 26,
          "./schedule": 29,
          "./util": 36
        }],
        3: [function(_dereq_, module, exports) {
          "use strict";
          module.exports = function(Promise, INTERNAL, tryConvertToPromise, debug) {
            var calledBind = false;
            var rejectThis = function(_, e) {
              this._reject(e);
            };
            var targetRejected = function(e, context) {
              context.promiseRejectionQueued = true;
              context.bindingPromise._then(rejectThis, rejectThis, null, this, e);
            };
            var bindingResolved = function(thisArg, context) {
              if (((this._bitField & 50397184) === 0)) {
                this._resolveCallback(context.target);
              }
            };
            var bindingRejected = function(e, context) {
              if (!context.promiseRejectionQueued)
                this._reject(e);
            };
            Promise.prototype.bind = function(thisArg) {
              if (!calledBind) {
                calledBind = true;
                Promise.prototype._propagateFrom = debug.propagateFromFunction();
                Promise.prototype._boundValue = debug.boundValueFunction();
              }
              var maybePromise = tryConvertToPromise(thisArg);
              var ret = new Promise(INTERNAL);
              ret._propagateFrom(this, 1);
              var target = this._target();
              ret._setBoundTo(maybePromise);
              if (maybePromise instanceof Promise) {
                var context = {
                  promiseRejectionQueued: false,
                  promise: ret,
                  target: target,
                  bindingPromise: maybePromise
                };
                target._then(INTERNAL, targetRejected, undefined, ret, context);
                maybePromise._then(bindingResolved, bindingRejected, undefined, ret, context);
                ret._setOnCancel(maybePromise);
              } else {
                ret._resolveCallback(target);
              }
              return ret;
            };
            Promise.prototype._setBoundTo = function(obj) {
              if (obj !== undefined) {
                this._bitField = this._bitField | 2097152;
                this._boundTo = obj;
              } else {
                this._bitField = this._bitField & (~2097152);
              }
            };
            Promise.prototype._isBound = function() {
              return (this._bitField & 2097152) === 2097152;
            };
            Promise.bind = function(thisArg, value) {
              return Promise.resolve(value).bind(thisArg);
            };
          };
        }, {}],
        4: [function(_dereq_, module, exports) {
          "use strict";
          var old;
          if (typeof Promise !== "undefined")
            old = Promise;
          function noConflict() {
            try {
              if (Promise === bluebird)
                Promise = old;
            } catch (e) {}
            return bluebird;
          }
          var bluebird = _dereq_("./promise")();
          bluebird.noConflict = noConflict;
          module.exports = bluebird;
        }, {"./promise": 22}],
        5: [function(_dereq_, module, exports) {
          "use strict";
          var cr = Object.create;
          if (cr) {
            var callerCache = cr(null);
            var getterCache = cr(null);
            callerCache[" size"] = getterCache[" size"] = 0;
          }
          module.exports = function(Promise) {
            var util = _dereq_("./util");
            var canEvaluate = util.canEvaluate;
            var isIdentifier = util.isIdentifier;
            var getMethodCaller;
            var getGetter;
            if (!true) {
              var makeMethodCaller = function(methodName) {
                return new Function("ensureMethod", "                                    \n\
        return function(obj) {                                               \n\
            'use strict'                                                     \n\
            var len = this.length;                                           \n\
            ensureMethod(obj, 'methodName');                                 \n\
            switch(len) {                                                    \n\
                case 1: return obj.methodName(this[0]);                      \n\
                case 2: return obj.methodName(this[0], this[1]);             \n\
                case 3: return obj.methodName(this[0], this[1], this[2]);    \n\
                case 0: return obj.methodName();                             \n\
                default:                                                     \n\
                    return obj.methodName.apply(obj, this);                  \n\
            }                                                                \n\
        };                                                                   \n\
        ".replace(/methodName/g, methodName))(ensureMethod);
              };
              var makeGetter = function(propertyName) {
                return new Function("obj", "                                             \n\
        'use strict';                                                        \n\
        return obj.propertyName;                                             \n\
        ".replace("propertyName", propertyName));
              };
              var getCompiled = function(name, compiler, cache) {
                var ret = cache[name];
                if (typeof ret !== "function") {
                  if (!isIdentifier(name)) {
                    return null;
                  }
                  ret = compiler(name);
                  cache[name] = ret;
                  cache[" size"]++;
                  if (cache[" size"] > 512) {
                    var keys = Object.keys(cache);
                    for (var i = 0; i < 256; ++i)
                      delete cache[keys[i]];
                    cache[" size"] = keys.length - 256;
                  }
                }
                return ret;
              };
              getMethodCaller = function(name) {
                return getCompiled(name, makeMethodCaller, callerCache);
              };
              getGetter = function(name) {
                return getCompiled(name, makeGetter, getterCache);
              };
            }
            function ensureMethod(obj, methodName) {
              var fn;
              if (obj != null)
                fn = obj[methodName];
              if (typeof fn !== "function") {
                var message = "Object " + util.classString(obj) + " has no method '" + util.toString(methodName) + "'";
                throw new Promise.TypeError(message);
              }
              return fn;
            }
            function caller(obj) {
              var methodName = this.pop();
              var fn = ensureMethod(obj, methodName);
              return fn.apply(obj, this);
            }
            Promise.prototype.call = function(methodName) {
              var args = [].slice.call(arguments, 1);
              ;
              if (!true) {
                if (canEvaluate) {
                  var maybeCaller = getMethodCaller(methodName);
                  if (maybeCaller !== null) {
                    return this._then(maybeCaller, undefined, undefined, args, undefined);
                  }
                }
              }
              args.push(methodName);
              return this._then(caller, undefined, undefined, args, undefined);
            };
            function namedGetter(obj) {
              return obj[this];
            }
            function indexedGetter(obj) {
              var index = +this;
              if (index < 0)
                index = Math.max(0, index + obj.length);
              return obj[index];
            }
            Promise.prototype.get = function(propertyName) {
              var isIndex = (typeof propertyName === "number");
              var getter;
              if (!isIndex) {
                if (canEvaluate) {
                  var maybeGetter = getGetter(propertyName);
                  getter = maybeGetter !== null ? maybeGetter : namedGetter;
                } else {
                  getter = namedGetter;
                }
              } else {
                getter = indexedGetter;
              }
              return this._then(getter, undefined, undefined, propertyName, undefined);
            };
          };
        }, {"./util": 36}],
        6: [function(_dereq_, module, exports) {
          "use strict";
          module.exports = function(Promise, PromiseArray, apiRejection, debug) {
            var util = _dereq_("./util");
            var tryCatch = util.tryCatch;
            var errorObj = util.errorObj;
            var async = Promise._async;
            Promise.prototype["break"] = Promise.prototype.cancel = function() {
              if (!debug.cancellation())
                return this._warn("cancellation is disabled");
              var promise = this;
              var child = promise;
              while (promise.isCancellable()) {
                if (!promise._cancelBy(child)) {
                  if (child._isFollowing()) {
                    child._followee().cancel();
                  } else {
                    child._cancelBranched();
                  }
                  break;
                }
                var parent = promise._cancellationParent;
                if (parent == null || !parent.isCancellable()) {
                  if (promise._isFollowing()) {
                    promise._followee().cancel();
                  } else {
                    promise._cancelBranched();
                  }
                  break;
                } else {
                  if (promise._isFollowing())
                    promise._followee().cancel();
                  child = promise;
                  promise = parent;
                }
              }
            };
            Promise.prototype._branchHasCancelled = function() {
              this._branchesRemainingToCancel--;
            };
            Promise.prototype._enoughBranchesHaveCancelled = function() {
              return this._branchesRemainingToCancel === undefined || this._branchesRemainingToCancel <= 0;
            };
            Promise.prototype._cancelBy = function(canceller) {
              if (canceller === this) {
                this._branchesRemainingToCancel = 0;
                this._invokeOnCancel();
                return true;
              } else {
                this._branchHasCancelled();
                if (this._enoughBranchesHaveCancelled()) {
                  this._invokeOnCancel();
                  return true;
                }
              }
              return false;
            };
            Promise.prototype._cancelBranched = function() {
              if (this._enoughBranchesHaveCancelled()) {
                this._cancel();
              }
            };
            Promise.prototype._cancel = function() {
              if (!this.isCancellable())
                return;
              this._setCancelled();
              async.invoke(this._cancelPromises, this, undefined);
            };
            Promise.prototype._cancelPromises = function() {
              if (this._length() > 0)
                this._settlePromises();
            };
            Promise.prototype._unsetOnCancel = function() {
              this._onCancelField = undefined;
            };
            Promise.prototype.isCancellable = function() {
              return this.isPending() && !this.isCancelled();
            };
            Promise.prototype._doInvokeOnCancel = function(onCancelCallback, internalOnly) {
              if (util.isArray(onCancelCallback)) {
                for (var i = 0; i < onCancelCallback.length; ++i) {
                  this._doInvokeOnCancel(onCancelCallback[i], internalOnly);
                }
              } else if (onCancelCallback !== undefined) {
                if (typeof onCancelCallback === "function") {
                  if (!internalOnly) {
                    var e = tryCatch(onCancelCallback).call(this._boundValue());
                    if (e === errorObj) {
                      this._attachExtraTrace(e.e);
                      async.throwLater(e.e);
                    }
                  }
                } else {
                  onCancelCallback._resultCancelled(this);
                }
              }
            };
            Promise.prototype._invokeOnCancel = function() {
              var onCancelCallback = this._onCancel();
              this._unsetOnCancel();
              async.invoke(this._doInvokeOnCancel, this, onCancelCallback);
            };
            Promise.prototype._invokeInternalOnCancel = function() {
              if (this.isCancellable()) {
                this._doInvokeOnCancel(this._onCancel(), true);
                this._unsetOnCancel();
              }
            };
            Promise.prototype._resultCancelled = function() {
              this.cancel();
            };
          };
        }, {"./util": 36}],
        7: [function(_dereq_, module, exports) {
          "use strict";
          module.exports = function(NEXT_FILTER) {
            var util = _dereq_("./util");
            var getKeys = _dereq_("./es5").keys;
            var tryCatch = util.tryCatch;
            var errorObj = util.errorObj;
            function catchFilter(instances, cb, promise) {
              return function(e) {
                var boundTo = promise._boundValue();
                predicateLoop: for (var i = 0; i < instances.length; ++i) {
                  var item = instances[i];
                  if (item === Error || (item != null && item.prototype instanceof Error)) {
                    if (e instanceof item) {
                      return tryCatch(cb).call(boundTo, e);
                    }
                  } else if (typeof item === "function") {
                    var matchesPredicate = tryCatch(item).call(boundTo, e);
                    if (matchesPredicate === errorObj) {
                      return matchesPredicate;
                    } else if (matchesPredicate) {
                      return tryCatch(cb).call(boundTo, e);
                    }
                  } else if (util.isObject(e)) {
                    var keys = getKeys(item);
                    for (var j = 0; j < keys.length; ++j) {
                      var key = keys[j];
                      if (item[key] != e[key]) {
                        continue predicateLoop;
                      }
                    }
                    return tryCatch(cb).call(boundTo, e);
                  }
                }
                return NEXT_FILTER;
              };
            }
            return catchFilter;
          };
        }, {
          "./es5": 13,
          "./util": 36
        }],
        8: [function(_dereq_, module, exports) {
          "use strict";
          module.exports = function(Promise) {
            var longStackTraces = false;
            var contextStack = [];
            Promise.prototype._promiseCreated = function() {};
            Promise.prototype._pushContext = function() {};
            Promise.prototype._popContext = function() {
              return null;
            };
            Promise._peekContext = Promise.prototype._peekContext = function() {};
            function Context() {
              this._trace = new Context.CapturedTrace(peekContext());
            }
            Context.prototype._pushContext = function() {
              if (this._trace !== undefined) {
                this._trace._promiseCreated = null;
                contextStack.push(this._trace);
              }
            };
            Context.prototype._popContext = function() {
              if (this._trace !== undefined) {
                var trace = contextStack.pop();
                var ret = trace._promiseCreated;
                trace._promiseCreated = null;
                return ret;
              }
              return null;
            };
            function createContext() {
              if (longStackTraces)
                return new Context();
            }
            function peekContext() {
              var lastIndex = contextStack.length - 1;
              if (lastIndex >= 0) {
                return contextStack[lastIndex];
              }
              return undefined;
            }
            Context.CapturedTrace = null;
            Context.create = createContext;
            Context.deactivateLongStackTraces = function() {};
            Context.activateLongStackTraces = function() {
              var Promise_pushContext = Promise.prototype._pushContext;
              var Promise_popContext = Promise.prototype._popContext;
              var Promise_PeekContext = Promise._peekContext;
              var Promise_peekContext = Promise.prototype._peekContext;
              var Promise_promiseCreated = Promise.prototype._promiseCreated;
              Context.deactivateLongStackTraces = function() {
                Promise.prototype._pushContext = Promise_pushContext;
                Promise.prototype._popContext = Promise_popContext;
                Promise._peekContext = Promise_PeekContext;
                Promise.prototype._peekContext = Promise_peekContext;
                Promise.prototype._promiseCreated = Promise_promiseCreated;
                longStackTraces = false;
              };
              longStackTraces = true;
              Promise.prototype._pushContext = Context.prototype._pushContext;
              Promise.prototype._popContext = Context.prototype._popContext;
              Promise._peekContext = Promise.prototype._peekContext = peekContext;
              Promise.prototype._promiseCreated = function() {
                var ctx = this._peekContext();
                if (ctx && ctx._promiseCreated == null)
                  ctx._promiseCreated = this;
              };
            };
            return Context;
          };
        }, {}],
        9: [function(_dereq_, module, exports) {
          "use strict";
          module.exports = function(Promise, Context) {
            var getDomain = Promise._getDomain;
            var async = Promise._async;
            var Warning = _dereq_("./errors").Warning;
            var util = _dereq_("./util");
            var canAttachTrace = util.canAttachTrace;
            var unhandledRejectionHandled;
            var possiblyUnhandledRejection;
            var bluebirdFramePattern = /[\\\/]bluebird[\\\/]js[\\\/](release|debug|instrumented)/;
            var stackFramePattern = null;
            var formatStack = null;
            var indentStackFrames = false;
            var printWarning;
            var debugging = !!(util.env("BLUEBIRD_DEBUG") != 0 && (true || util.env("BLUEBIRD_DEBUG") || util.env("NODE_ENV") === "development"));
            var warnings = !!(util.env("BLUEBIRD_WARNINGS") != 0 && (debugging || util.env("BLUEBIRD_WARNINGS")));
            var longStackTraces = !!(util.env("BLUEBIRD_LONG_STACK_TRACES") != 0 && (debugging || util.env("BLUEBIRD_LONG_STACK_TRACES")));
            var wForgottenReturn = util.env("BLUEBIRD_W_FORGOTTEN_RETURN") != 0 && (warnings || !!util.env("BLUEBIRD_W_FORGOTTEN_RETURN"));
            Promise.prototype.suppressUnhandledRejections = function() {
              var target = this._target();
              target._bitField = ((target._bitField & (~1048576)) | 524288);
            };
            Promise.prototype._ensurePossibleRejectionHandled = function() {
              if ((this._bitField & 524288) !== 0)
                return;
              this._setRejectionIsUnhandled();
              async.invokeLater(this._notifyUnhandledRejection, this, undefined);
            };
            Promise.prototype._notifyUnhandledRejectionIsHandled = function() {
              fireRejectionEvent("rejectionHandled", unhandledRejectionHandled, undefined, this);
            };
            Promise.prototype._setReturnedNonUndefined = function() {
              this._bitField = this._bitField | 268435456;
            };
            Promise.prototype._returnedNonUndefined = function() {
              return (this._bitField & 268435456) !== 0;
            };
            Promise.prototype._notifyUnhandledRejection = function() {
              if (this._isRejectionUnhandled()) {
                var reason = this._settledValue();
                this._setUnhandledRejectionIsNotified();
                fireRejectionEvent("unhandledRejection", possiblyUnhandledRejection, reason, this);
              }
            };
            Promise.prototype._setUnhandledRejectionIsNotified = function() {
              this._bitField = this._bitField | 262144;
            };
            Promise.prototype._unsetUnhandledRejectionIsNotified = function() {
              this._bitField = this._bitField & (~262144);
            };
            Promise.prototype._isUnhandledRejectionNotified = function() {
              return (this._bitField & 262144) > 0;
            };
            Promise.prototype._setRejectionIsUnhandled = function() {
              this._bitField = this._bitField | 1048576;
            };
            Promise.prototype._unsetRejectionIsUnhandled = function() {
              this._bitField = this._bitField & (~1048576);
              if (this._isUnhandledRejectionNotified()) {
                this._unsetUnhandledRejectionIsNotified();
                this._notifyUnhandledRejectionIsHandled();
              }
            };
            Promise.prototype._isRejectionUnhandled = function() {
              return (this._bitField & 1048576) > 0;
            };
            Promise.prototype._warn = function(message, shouldUseOwnTrace, promise) {
              return warn(message, shouldUseOwnTrace, promise || this);
            };
            Promise.onPossiblyUnhandledRejection = function(fn) {
              var domain = getDomain();
              possiblyUnhandledRejection = typeof fn === "function" ? (domain === null ? fn : domain.bind(fn)) : undefined;
            };
            Promise.onUnhandledRejectionHandled = function(fn) {
              var domain = getDomain();
              unhandledRejectionHandled = typeof fn === "function" ? (domain === null ? fn : domain.bind(fn)) : undefined;
            };
            var disableLongStackTraces = function() {};
            Promise.longStackTraces = function() {
              if (async.haveItemsQueued() && !config.longStackTraces) {
                throw new Error("cannot enable long stack traces after promises have been created\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
              }
              if (!config.longStackTraces && longStackTracesIsSupported()) {
                var Promise_captureStackTrace = Promise.prototype._captureStackTrace;
                var Promise_attachExtraTrace = Promise.prototype._attachExtraTrace;
                config.longStackTraces = true;
                disableLongStackTraces = function() {
                  if (async.haveItemsQueued() && !config.longStackTraces) {
                    throw new Error("cannot enable long stack traces after promises have been created\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
                  }
                  Promise.prototype._captureStackTrace = Promise_captureStackTrace;
                  Promise.prototype._attachExtraTrace = Promise_attachExtraTrace;
                  Context.deactivateLongStackTraces();
                  async.enableTrampoline();
                  config.longStackTraces = false;
                };
                Promise.prototype._captureStackTrace = longStackTracesCaptureStackTrace;
                Promise.prototype._attachExtraTrace = longStackTracesAttachExtraTrace;
                Context.activateLongStackTraces();
                async.disableTrampolineIfNecessary();
              }
            };
            Promise.hasLongStackTraces = function() {
              return config.longStackTraces && longStackTracesIsSupported();
            };
            var fireDomEvent = (function() {
              try {
                var event = document.createEvent("CustomEvent");
                event.initCustomEvent("testingtheevent", false, true, {});
                util.global.dispatchEvent(event);
                return function(name, event) {
                  var domEvent = document.createEvent("CustomEvent");
                  domEvent.initCustomEvent(name.toLowerCase(), false, true, event);
                  return !util.global.dispatchEvent(domEvent);
                };
              } catch (e) {}
              return function() {
                return false;
              };
            })();
            var fireGlobalEvent = (function() {
              if (util.isNode) {
                return function() {
                  return process.emit.apply(process, arguments);
                };
              } else {
                if (!util.global) {
                  return function() {
                    return false;
                  };
                }
                return function(name) {
                  var methodName = "on" + name.toLowerCase();
                  var method = util.global[methodName];
                  if (!method)
                    return false;
                  method.apply(util.global, [].slice.call(arguments, 1));
                  return true;
                };
              }
            })();
            function generatePromiseLifecycleEventObject(name, promise) {
              return {promise: promise};
            }
            var eventToObjectGenerator = {
              promiseCreated: generatePromiseLifecycleEventObject,
              promiseFulfilled: generatePromiseLifecycleEventObject,
              promiseRejected: generatePromiseLifecycleEventObject,
              promiseResolved: generatePromiseLifecycleEventObject,
              promiseCancelled: generatePromiseLifecycleEventObject,
              promiseChained: function(name, promise, child) {
                return {
                  promise: promise,
                  child: child
                };
              },
              warning: function(name, warning) {
                return {warning: warning};
              },
              unhandledRejection: function(name, reason, promise) {
                return {
                  reason: reason,
                  promise: promise
                };
              },
              rejectionHandled: generatePromiseLifecycleEventObject
            };
            var activeFireEvent = function(name) {
              var globalEventFired = false;
              try {
                globalEventFired = fireGlobalEvent.apply(null, arguments);
              } catch (e) {
                async.throwLater(e);
                globalEventFired = true;
              }
              var domEventFired = false;
              try {
                domEventFired = fireDomEvent(name, eventToObjectGenerator[name].apply(null, arguments));
              } catch (e) {
                async.throwLater(e);
                domEventFired = true;
              }
              return domEventFired || globalEventFired;
            };
            Promise.config = function(opts) {
              opts = Object(opts);
              if ("longStackTraces" in opts) {
                if (opts.longStackTraces) {
                  Promise.longStackTraces();
                } else if (!opts.longStackTraces && Promise.hasLongStackTraces()) {
                  disableLongStackTraces();
                }
              }
              if ("warnings" in opts) {
                var warningsOption = opts.warnings;
                config.warnings = !!warningsOption;
                wForgottenReturn = config.warnings;
                if (util.isObject(warningsOption)) {
                  if ("wForgottenReturn" in warningsOption) {
                    wForgottenReturn = !!warningsOption.wForgottenReturn;
                  }
                }
              }
              if ("cancellation" in opts && opts.cancellation && !config.cancellation) {
                if (async.haveItemsQueued()) {
                  throw new Error("cannot enable cancellation after promises are in use");
                }
                Promise.prototype._clearCancellationData = cancellationClearCancellationData;
                Promise.prototype._propagateFrom = cancellationPropagateFrom;
                Promise.prototype._onCancel = cancellationOnCancel;
                Promise.prototype._setOnCancel = cancellationSetOnCancel;
                Promise.prototype._attachCancellationCallback = cancellationAttachCancellationCallback;
                Promise.prototype._execute = cancellationExecute;
                propagateFromFunction = cancellationPropagateFrom;
                config.cancellation = true;
              }
              if ("monitoring" in opts) {
                if (opts.monitoring && !config.monitoring) {
                  config.monitoring = true;
                  Promise.prototype._fireEvent = activeFireEvent;
                } else if (!opts.monitoring && config.monitoring) {
                  config.monitoring = false;
                  Promise.prototype._fireEvent = defaultFireEvent;
                }
              }
            };
            function defaultFireEvent() {
              return false;
            }
            Promise.prototype._fireEvent = defaultFireEvent;
            Promise.prototype._execute = function(executor, resolve, reject) {
              try {
                executor(resolve, reject);
              } catch (e) {
                return e;
              }
            };
            Promise.prototype._onCancel = function() {};
            Promise.prototype._setOnCancel = function(handler) {
              ;
            };
            Promise.prototype._attachCancellationCallback = function(onCancel) {
              ;
            };
            Promise.prototype._captureStackTrace = function() {};
            Promise.prototype._attachExtraTrace = function() {};
            Promise.prototype._clearCancellationData = function() {};
            Promise.prototype._propagateFrom = function(parent, flags) {
              ;
              ;
            };
            function cancellationExecute(executor, resolve, reject) {
              var promise = this;
              try {
                executor(resolve, reject, function(onCancel) {
                  if (typeof onCancel !== "function") {
                    throw new TypeError("onCancel must be a function, got: " + util.toString(onCancel));
                  }
                  promise._attachCancellationCallback(onCancel);
                });
              } catch (e) {
                return e;
              }
            }
            function cancellationAttachCancellationCallback(onCancel) {
              if (!this.isCancellable())
                return this;
              var previousOnCancel = this._onCancel();
              if (previousOnCancel !== undefined) {
                if (util.isArray(previousOnCancel)) {
                  previousOnCancel.push(onCancel);
                } else {
                  this._setOnCancel([previousOnCancel, onCancel]);
                }
              } else {
                this._setOnCancel(onCancel);
              }
            }
            function cancellationOnCancel() {
              return this._onCancelField;
            }
            function cancellationSetOnCancel(onCancel) {
              this._onCancelField = onCancel;
            }
            function cancellationClearCancellationData() {
              this._cancellationParent = undefined;
              this._onCancelField = undefined;
            }
            function cancellationPropagateFrom(parent, flags) {
              if ((flags & 1) !== 0) {
                this._cancellationParent = parent;
                var branchesRemainingToCancel = parent._branchesRemainingToCancel;
                if (branchesRemainingToCancel === undefined) {
                  branchesRemainingToCancel = 0;
                }
                parent._branchesRemainingToCancel = branchesRemainingToCancel + 1;
              }
              if ((flags & 2) !== 0 && parent._isBound()) {
                this._setBoundTo(parent._boundTo);
              }
            }
            function bindingPropagateFrom(parent, flags) {
              if ((flags & 2) !== 0 && parent._isBound()) {
                this._setBoundTo(parent._boundTo);
              }
            }
            var propagateFromFunction = bindingPropagateFrom;
            function boundValueFunction() {
              var ret = this._boundTo;
              if (ret !== undefined) {
                if (ret instanceof Promise) {
                  if (ret.isFulfilled()) {
                    return ret.value();
                  } else {
                    return undefined;
                  }
                }
              }
              return ret;
            }
            function longStackTracesCaptureStackTrace() {
              this._trace = new CapturedTrace(this._peekContext());
            }
            function longStackTracesAttachExtraTrace(error, ignoreSelf) {
              if (canAttachTrace(error)) {
                var trace = this._trace;
                if (trace !== undefined) {
                  if (ignoreSelf)
                    trace = trace._parent;
                }
                if (trace !== undefined) {
                  trace.attachExtraTrace(error);
                } else if (!error.__stackCleaned__) {
                  var parsed = parseStackAndMessage(error);
                  util.notEnumerableProp(error, "stack", parsed.message + "\n" + parsed.stack.join("\n"));
                  util.notEnumerableProp(error, "__stackCleaned__", true);
                }
              }
            }
            function checkForgottenReturns(returnValue, promiseCreated, name, promise, parent) {
              if (returnValue === undefined && promiseCreated !== null && wForgottenReturn) {
                if (parent !== undefined && parent._returnedNonUndefined())
                  return;
                if ((promise._bitField & 65535) === 0)
                  return;
                if (name)
                  name = name + " ";
                var msg = "a promise was created in a " + name + "handler but was not returned from it";
                promise._warn(msg, true, promiseCreated);
              }
            }
            function deprecated(name, replacement) {
              var message = name + " is deprecated and will be removed in a future version.";
              if (replacement)
                message += " Use " + replacement + " instead.";
              return warn(message);
            }
            function warn(message, shouldUseOwnTrace, promise) {
              if (!config.warnings)
                return;
              var warning = new Warning(message);
              var ctx;
              if (shouldUseOwnTrace) {
                promise._attachExtraTrace(warning);
              } else if (config.longStackTraces && (ctx = Promise._peekContext())) {
                ctx.attachExtraTrace(warning);
              } else {
                var parsed = parseStackAndMessage(warning);
                warning.stack = parsed.message + "\n" + parsed.stack.join("\n");
              }
              if (!activeFireEvent("warning", warning)) {
                formatAndLogError(warning, "", true);
              }
            }
            function reconstructStack(message, stacks) {
              for (var i = 0; i < stacks.length - 1; ++i) {
                stacks[i].push("From previous event:");
                stacks[i] = stacks[i].join("\n");
              }
              if (i < stacks.length) {
                stacks[i] = stacks[i].join("\n");
              }
              return message + "\n" + stacks.join("\n");
            }
            function removeDuplicateOrEmptyJumps(stacks) {
              for (var i = 0; i < stacks.length; ++i) {
                if (stacks[i].length === 0 || ((i + 1 < stacks.length) && stacks[i][0] === stacks[i + 1][0])) {
                  stacks.splice(i, 1);
                  i--;
                }
              }
            }
            function removeCommonRoots(stacks) {
              var current = stacks[0];
              for (var i = 1; i < stacks.length; ++i) {
                var prev = stacks[i];
                var currentLastIndex = current.length - 1;
                var currentLastLine = current[currentLastIndex];
                var commonRootMeetPoint = -1;
                for (var j = prev.length - 1; j >= 0; --j) {
                  if (prev[j] === currentLastLine) {
                    commonRootMeetPoint = j;
                    break;
                  }
                }
                for (var j = commonRootMeetPoint; j >= 0; --j) {
                  var line = prev[j];
                  if (current[currentLastIndex] === line) {
                    current.pop();
                    currentLastIndex--;
                  } else {
                    break;
                  }
                }
                current = prev;
              }
            }
            function cleanStack(stack) {
              var ret = [];
              for (var i = 0; i < stack.length; ++i) {
                var line = stack[i];
                var isTraceLine = "    (No stack trace)" === line || stackFramePattern.test(line);
                var isInternalFrame = isTraceLine && shouldIgnore(line);
                if (isTraceLine && !isInternalFrame) {
                  if (indentStackFrames && line.charAt(0) !== " ") {
                    line = "    " + line;
                  }
                  ret.push(line);
                }
              }
              return ret;
            }
            function stackFramesAsArray(error) {
              var stack = error.stack.replace(/\s+$/g, "").split("\n");
              for (var i = 0; i < stack.length; ++i) {
                var line = stack[i];
                if ("    (No stack trace)" === line || stackFramePattern.test(line)) {
                  break;
                }
              }
              if (i > 0) {
                stack = stack.slice(i);
              }
              return stack;
            }
            function parseStackAndMessage(error) {
              var stack = error.stack;
              var message = error.toString();
              stack = typeof stack === "string" && stack.length > 0 ? stackFramesAsArray(error) : ["    (No stack trace)"];
              return {
                message: message,
                stack: cleanStack(stack)
              };
            }
            function formatAndLogError(error, title, isSoft) {
              if (typeof console !== "undefined") {
                var message;
                if (util.isObject(error)) {
                  var stack = error.stack;
                  message = title + formatStack(stack, error);
                } else {
                  message = title + String(error);
                }
                if (typeof printWarning === "function") {
                  printWarning(message, isSoft);
                } else if (typeof console.log === "function" || typeof console.log === "object") {
                  console.log(message);
                }
              }
            }
            function fireRejectionEvent(name, localHandler, reason, promise) {
              var localEventFired = false;
              try {
                if (typeof localHandler === "function") {
                  localEventFired = true;
                  if (name === "rejectionHandled") {
                    localHandler(promise);
                  } else {
                    localHandler(reason, promise);
                  }
                }
              } catch (e) {
                async.throwLater(e);
              }
              if (name === "unhandledRejection") {
                if (!activeFireEvent(name, reason, promise) && !localEventFired) {
                  formatAndLogError(reason, "Unhandled rejection ");
                }
              } else {
                activeFireEvent(name, promise);
              }
            }
            function formatNonError(obj) {
              var str;
              if (typeof obj === "function") {
                str = "[function " + (obj.name || "anonymous") + "]";
              } else {
                str = obj && typeof obj.toString === "function" ? obj.toString() : util.toString(obj);
                var ruselessToString = /\[object [a-zA-Z0-9$_]+\]/;
                if (ruselessToString.test(str)) {
                  try {
                    var newStr = JSON.stringify(obj);
                    str = newStr;
                  } catch (e) {}
                }
                if (str.length === 0) {
                  str = "(empty array)";
                }
              }
              return ("(<" + snip(str) + ">, no stack trace)");
            }
            function snip(str) {
              var maxChars = 41;
              if (str.length < maxChars) {
                return str;
              }
              return str.substr(0, maxChars - 3) + "...";
            }
            function longStackTracesIsSupported() {
              return typeof captureStackTrace === "function";
            }
            var shouldIgnore = function() {
              return false;
            };
            var parseLineInfoRegex = /[\/<\(]([^:\/]+):(\d+):(?:\d+)\)?\s*$/;
            function parseLineInfo(line) {
              var matches = line.match(parseLineInfoRegex);
              if (matches) {
                return {
                  fileName: matches[1],
                  line: parseInt(matches[2], 10)
                };
              }
            }
            function setBounds(firstLineError, lastLineError) {
              if (!longStackTracesIsSupported())
                return;
              var firstStackLines = firstLineError.stack.split("\n");
              var lastStackLines = lastLineError.stack.split("\n");
              var firstIndex = -1;
              var lastIndex = -1;
              var firstFileName;
              var lastFileName;
              for (var i = 0; i < firstStackLines.length; ++i) {
                var result = parseLineInfo(firstStackLines[i]);
                if (result) {
                  firstFileName = result.fileName;
                  firstIndex = result.line;
                  break;
                }
              }
              for (var i = 0; i < lastStackLines.length; ++i) {
                var result = parseLineInfo(lastStackLines[i]);
                if (result) {
                  lastFileName = result.fileName;
                  lastIndex = result.line;
                  break;
                }
              }
              if (firstIndex < 0 || lastIndex < 0 || !firstFileName || !lastFileName || firstFileName !== lastFileName || firstIndex >= lastIndex) {
                return;
              }
              shouldIgnore = function(line) {
                if (bluebirdFramePattern.test(line))
                  return true;
                var info = parseLineInfo(line);
                if (info) {
                  if (info.fileName === firstFileName && (firstIndex <= info.line && info.line <= lastIndex)) {
                    return true;
                  }
                }
                return false;
              };
            }
            function CapturedTrace(parent) {
              this._parent = parent;
              this._promisesCreated = 0;
              var length = this._length = 1 + (parent === undefined ? 0 : parent._length);
              captureStackTrace(this, CapturedTrace);
              if (length > 32)
                this.uncycle();
            }
            util.inherits(CapturedTrace, Error);
            Context.CapturedTrace = CapturedTrace;
            CapturedTrace.prototype.uncycle = function() {
              var length = this._length;
              if (length < 2)
                return;
              var nodes = [];
              var stackToIndex = {};
              for (var i = 0,
                  node = this; node !== undefined; ++i) {
                nodes.push(node);
                node = node._parent;
              }
              length = this._length = i;
              for (var i = length - 1; i >= 0; --i) {
                var stack = nodes[i].stack;
                if (stackToIndex[stack] === undefined) {
                  stackToIndex[stack] = i;
                }
              }
              for (var i = 0; i < length; ++i) {
                var currentStack = nodes[i].stack;
                var index = stackToIndex[currentStack];
                if (index !== undefined && index !== i) {
                  if (index > 0) {
                    nodes[index - 1]._parent = undefined;
                    nodes[index - 1]._length = 1;
                  }
                  nodes[i]._parent = undefined;
                  nodes[i]._length = 1;
                  var cycleEdgeNode = i > 0 ? nodes[i - 1] : this;
                  if (index < length - 1) {
                    cycleEdgeNode._parent = nodes[index + 1];
                    cycleEdgeNode._parent.uncycle();
                    cycleEdgeNode._length = cycleEdgeNode._parent._length + 1;
                  } else {
                    cycleEdgeNode._parent = undefined;
                    cycleEdgeNode._length = 1;
                  }
                  var currentChildLength = cycleEdgeNode._length + 1;
                  for (var j = i - 2; j >= 0; --j) {
                    nodes[j]._length = currentChildLength;
                    currentChildLength++;
                  }
                  return;
                }
              }
            };
            CapturedTrace.prototype.attachExtraTrace = function(error) {
              if (error.__stackCleaned__)
                return;
              this.uncycle();
              var parsed = parseStackAndMessage(error);
              var message = parsed.message;
              var stacks = [parsed.stack];
              var trace = this;
              while (trace !== undefined) {
                stacks.push(cleanStack(trace.stack.split("\n")));
                trace = trace._parent;
              }
              removeCommonRoots(stacks);
              removeDuplicateOrEmptyJumps(stacks);
              util.notEnumerableProp(error, "stack", reconstructStack(message, stacks));
              util.notEnumerableProp(error, "__stackCleaned__", true);
            };
            var captureStackTrace = (function stackDetection() {
              var v8stackFramePattern = /^\s*at\s*/;
              var v8stackFormatter = function(stack, error) {
                if (typeof stack === "string")
                  return stack;
                if (error.name !== undefined && error.message !== undefined) {
                  return error.toString();
                }
                return formatNonError(error);
              };
              if (typeof Error.stackTraceLimit === "number" && typeof Error.captureStackTrace === "function") {
                Error.stackTraceLimit += 6;
                stackFramePattern = v8stackFramePattern;
                formatStack = v8stackFormatter;
                var captureStackTrace = Error.captureStackTrace;
                shouldIgnore = function(line) {
                  return bluebirdFramePattern.test(line);
                };
                return function(receiver, ignoreUntil) {
                  Error.stackTraceLimit += 6;
                  captureStackTrace(receiver, ignoreUntil);
                  Error.stackTraceLimit -= 6;
                };
              }
              var err = new Error();
              if (typeof err.stack === "string" && err.stack.split("\n")[0].indexOf("stackDetection@") >= 0) {
                stackFramePattern = /@/;
                formatStack = v8stackFormatter;
                indentStackFrames = true;
                return function captureStackTrace(o) {
                  o.stack = new Error().stack;
                };
              }
              var hasStackAfterThrow;
              try {
                throw new Error();
              } catch (e) {
                hasStackAfterThrow = ("stack" in e);
              }
              if (!("stack" in err) && hasStackAfterThrow && typeof Error.stackTraceLimit === "number") {
                stackFramePattern = v8stackFramePattern;
                formatStack = v8stackFormatter;
                return function captureStackTrace(o) {
                  Error.stackTraceLimit += 6;
                  try {
                    throw new Error();
                  } catch (e) {
                    o.stack = e.stack;
                  }
                  Error.stackTraceLimit -= 6;
                };
              }
              formatStack = function(stack, error) {
                if (typeof stack === "string")
                  return stack;
                if ((typeof error === "object" || typeof error === "function") && error.name !== undefined && error.message !== undefined) {
                  return error.toString();
                }
                return formatNonError(error);
              };
              return null;
            })([]);
            if (typeof console !== "undefined" && typeof console.warn !== "undefined") {
              printWarning = function(message) {
                console.warn(message);
              };
              if (util.isNode && process.stderr.isTTY) {
                printWarning = function(message, isSoft) {
                  var color = isSoft ? "\u001b[33m" : "\u001b[31m";
                  console.warn(color + message + "\u001b[0m\n");
                };
              } else if (!util.isNode && typeof(new Error().stack) === "string") {
                printWarning = function(message, isSoft) {
                  console.warn("%c" + message, isSoft ? "color: darkorange" : "color: red");
                };
              }
            }
            var config = {
              warnings: warnings,
              longStackTraces: false,
              cancellation: false,
              monitoring: false
            };
            if (longStackTraces)
              Promise.longStackTraces();
            return {
              longStackTraces: function() {
                return config.longStackTraces;
              },
              warnings: function() {
                return config.warnings;
              },
              cancellation: function() {
                return config.cancellation;
              },
              monitoring: function() {
                return config.monitoring;
              },
              propagateFromFunction: function() {
                return propagateFromFunction;
              },
              boundValueFunction: function() {
                return boundValueFunction;
              },
              checkForgottenReturns: checkForgottenReturns,
              setBounds: setBounds,
              warn: warn,
              deprecated: deprecated,
              CapturedTrace: CapturedTrace,
              fireDomEvent: fireDomEvent,
              fireGlobalEvent: fireGlobalEvent
            };
          };
        }, {
          "./errors": 12,
          "./util": 36
        }],
        10: [function(_dereq_, module, exports) {
          "use strict";
          module.exports = function(Promise) {
            function returner() {
              return this.value;
            }
            function thrower() {
              throw this.reason;
            }
            Promise.prototype["return"] = Promise.prototype.thenReturn = function(value) {
              if (value instanceof Promise)
                value.suppressUnhandledRejections();
              return this._then(returner, undefined, undefined, {value: value}, undefined);
            };
            Promise.prototype["throw"] = Promise.prototype.thenThrow = function(reason) {
              return this._then(thrower, undefined, undefined, {reason: reason}, undefined);
            };
            Promise.prototype.catchThrow = function(reason) {
              if (arguments.length <= 1) {
                return this._then(undefined, thrower, undefined, {reason: reason}, undefined);
              } else {
                var _reason = arguments[1];
                var handler = function() {
                  throw _reason;
                };
                return this.caught(reason, handler);
              }
            };
            Promise.prototype.catchReturn = function(value) {
              if (arguments.length <= 1) {
                if (value instanceof Promise)
                  value.suppressUnhandledRejections();
                return this._then(undefined, returner, undefined, {value: value}, undefined);
              } else {
                var _value = arguments[1];
                if (_value instanceof Promise)
                  _value.suppressUnhandledRejections();
                var handler = function() {
                  return _value;
                };
                return this.caught(value, handler);
              }
            };
          };
        }, {}],
        11: [function(_dereq_, module, exports) {
          "use strict";
          module.exports = function(Promise, INTERNAL) {
            var PromiseReduce = Promise.reduce;
            var PromiseAll = Promise.all;
            function promiseAllThis() {
              return PromiseAll(this);
            }
            function PromiseMapSeries(promises, fn) {
              return PromiseReduce(promises, fn, INTERNAL, INTERNAL);
            }
            Promise.prototype.each = function(fn) {
              return this.mapSeries(fn)._then(promiseAllThis, undefined, undefined, this, undefined);
            };
            Promise.prototype.mapSeries = function(fn) {
              return PromiseReduce(this, fn, INTERNAL, INTERNAL);
            };
            Promise.each = function(promises, fn) {
              return PromiseMapSeries(promises, fn)._then(promiseAllThis, undefined, undefined, promises, undefined);
            };
            Promise.mapSeries = PromiseMapSeries;
          };
        }, {}],
        12: [function(_dereq_, module, exports) {
          "use strict";
          var es5 = _dereq_("./es5");
          var Objectfreeze = es5.freeze;
          var util = _dereq_("./util");
          var inherits = util.inherits;
          var notEnumerableProp = util.notEnumerableProp;
          function subError(nameProperty, defaultMessage) {
            function SubError(message) {
              if (!(this instanceof SubError))
                return new SubError(message);
              notEnumerableProp(this, "message", typeof message === "string" ? message : defaultMessage);
              notEnumerableProp(this, "name", nameProperty);
              if (Error.captureStackTrace) {
                Error.captureStackTrace(this, this.constructor);
              } else {
                Error.call(this);
              }
            }
            inherits(SubError, Error);
            return SubError;
          }
          var _TypeError,
              _RangeError;
          var Warning = subError("Warning", "warning");
          var CancellationError = subError("CancellationError", "cancellation error");
          var TimeoutError = subError("TimeoutError", "timeout error");
          var AggregateError = subError("AggregateError", "aggregate error");
          try {
            _TypeError = TypeError;
            _RangeError = RangeError;
          } catch (e) {
            _TypeError = subError("TypeError", "type error");
            _RangeError = subError("RangeError", "range error");
          }
          var methods = ("join pop push shift unshift slice filter forEach some " + "every map indexOf lastIndexOf reduce reduceRight sort reverse").split(" ");
          for (var i = 0; i < methods.length; ++i) {
            if (typeof Array.prototype[methods[i]] === "function") {
              AggregateError.prototype[methods[i]] = Array.prototype[methods[i]];
            }
          }
          es5.defineProperty(AggregateError.prototype, "length", {
            value: 0,
            configurable: false,
            writable: true,
            enumerable: true
          });
          AggregateError.prototype["isOperational"] = true;
          var level = 0;
          AggregateError.prototype.toString = function() {
            var indent = Array(level * 4 + 1).join(" ");
            var ret = "\n" + indent + "AggregateError of:" + "\n";
            level++;
            indent = Array(level * 4 + 1).join(" ");
            for (var i = 0; i < this.length; ++i) {
              var str = this[i] === this ? "[Circular AggregateError]" : this[i] + "";
              var lines = str.split("\n");
              for (var j = 0; j < lines.length; ++j) {
                lines[j] = indent + lines[j];
              }
              str = lines.join("\n");
              ret += str + "\n";
            }
            level--;
            return ret;
          };
          function OperationalError(message) {
            if (!(this instanceof OperationalError))
              return new OperationalError(message);
            notEnumerableProp(this, "name", "OperationalError");
            notEnumerableProp(this, "message", message);
            this.cause = message;
            this["isOperational"] = true;
            if (message instanceof Error) {
              notEnumerableProp(this, "message", message.message);
              notEnumerableProp(this, "stack", message.stack);
            } else if (Error.captureStackTrace) {
              Error.captureStackTrace(this, this.constructor);
            }
          }
          inherits(OperationalError, Error);
          var errorTypes = Error["__BluebirdErrorTypes__"];
          if (!errorTypes) {
            errorTypes = Objectfreeze({
              CancellationError: CancellationError,
              TimeoutError: TimeoutError,
              OperationalError: OperationalError,
              RejectionError: OperationalError,
              AggregateError: AggregateError
            });
            es5.defineProperty(Error, "__BluebirdErrorTypes__", {
              value: errorTypes,
              writable: false,
              enumerable: false,
              configurable: false
            });
          }
          module.exports = {
            Error: Error,
            TypeError: _TypeError,
            RangeError: _RangeError,
            CancellationError: errorTypes.CancellationError,
            OperationalError: errorTypes.OperationalError,
            TimeoutError: errorTypes.TimeoutError,
            AggregateError: errorTypes.AggregateError,
            Warning: Warning
          };
        }, {
          "./es5": 13,
          "./util": 36
        }],
        13: [function(_dereq_, module, exports) {
          var isES5 = (function() {
            "use strict";
            return this === undefined;
          })();
          if (isES5) {
            module.exports = {
              freeze: Object.freeze,
              defineProperty: Object.defineProperty,
              getDescriptor: Object.getOwnPropertyDescriptor,
              keys: Object.keys,
              names: Object.getOwnPropertyNames,
              getPrototypeOf: Object.getPrototypeOf,
              isArray: Array.isArray,
              isES5: isES5,
              propertyIsWritable: function(obj, prop) {
                var descriptor = Object.getOwnPropertyDescriptor(obj, prop);
                return !!(!descriptor || descriptor.writable || descriptor.set);
              }
            };
          } else {
            var has = {}.hasOwnProperty;
            var str = {}.toString;
            var proto = {}.constructor.prototype;
            var ObjectKeys = function(o) {
              var ret = [];
              for (var key in o) {
                if (has.call(o, key)) {
                  ret.push(key);
                }
              }
              return ret;
            };
            var ObjectGetDescriptor = function(o, key) {
              return {value: o[key]};
            };
            var ObjectDefineProperty = function(o, key, desc) {
              o[key] = desc.value;
              return o;
            };
            var ObjectFreeze = function(obj) {
              return obj;
            };
            var ObjectGetPrototypeOf = function(obj) {
              try {
                return Object(obj).constructor.prototype;
              } catch (e) {
                return proto;
              }
            };
            var ArrayIsArray = function(obj) {
              try {
                return str.call(obj) === "[object Array]";
              } catch (e) {
                return false;
              }
            };
            module.exports = {
              isArray: ArrayIsArray,
              keys: ObjectKeys,
              names: ObjectKeys,
              defineProperty: ObjectDefineProperty,
              getDescriptor: ObjectGetDescriptor,
              freeze: ObjectFreeze,
              getPrototypeOf: ObjectGetPrototypeOf,
              isES5: isES5,
              propertyIsWritable: function() {
                return true;
              }
            };
          }
        }, {}],
        14: [function(_dereq_, module, exports) {
          "use strict";
          module.exports = function(Promise, INTERNAL) {
            var PromiseMap = Promise.map;
            Promise.prototype.filter = function(fn, options) {
              return PromiseMap(this, fn, options, INTERNAL);
            };
            Promise.filter = function(promises, fn, options) {
              return PromiseMap(promises, fn, options, INTERNAL);
            };
          };
        }, {}],
        15: [function(_dereq_, module, exports) {
          "use strict";
          module.exports = function(Promise, tryConvertToPromise) {
            var util = _dereq_("./util");
            var CancellationError = Promise.CancellationError;
            var errorObj = util.errorObj;
            function PassThroughHandlerContext(promise, type, handler) {
              this.promise = promise;
              this.type = type;
              this.handler = handler;
              this.called = false;
              this.cancelPromise = null;
            }
            PassThroughHandlerContext.prototype.isFinallyHandler = function() {
              return this.type === 0;
            };
            function FinallyHandlerCancelReaction(finallyHandler) {
              this.finallyHandler = finallyHandler;
            }
            FinallyHandlerCancelReaction.prototype._resultCancelled = function() {
              checkCancel(this.finallyHandler);
            };
            function checkCancel(ctx, reason) {
              if (ctx.cancelPromise != null) {
                if (arguments.length > 1) {
                  ctx.cancelPromise._reject(reason);
                } else {
                  ctx.cancelPromise._cancel();
                }
                ctx.cancelPromise = null;
                return true;
              }
              return false;
            }
            function succeed() {
              return finallyHandler.call(this, this.promise._target()._settledValue());
            }
            function fail(reason) {
              if (checkCancel(this, reason))
                return;
              errorObj.e = reason;
              return errorObj;
            }
            function finallyHandler(reasonOrValue) {
              var promise = this.promise;
              var handler = this.handler;
              if (!this.called) {
                this.called = true;
                var ret = this.isFinallyHandler() ? handler.call(promise._boundValue()) : handler.call(promise._boundValue(), reasonOrValue);
                if (ret !== undefined) {
                  promise._setReturnedNonUndefined();
                  var maybePromise = tryConvertToPromise(ret, promise);
                  if (maybePromise instanceof Promise) {
                    if (this.cancelPromise != null) {
                      if (maybePromise.isCancelled()) {
                        var reason = new CancellationError("late cancellation observer");
                        promise._attachExtraTrace(reason);
                        errorObj.e = reason;
                        return errorObj;
                      } else if (maybePromise.isPending()) {
                        maybePromise._attachCancellationCallback(new FinallyHandlerCancelReaction(this));
                      }
                    }
                    return maybePromise._then(succeed, fail, undefined, this, undefined);
                  }
                }
              }
              if (promise.isRejected()) {
                checkCancel(this);
                errorObj.e = reasonOrValue;
                return errorObj;
              } else {
                checkCancel(this);
                return reasonOrValue;
              }
            }
            Promise.prototype._passThrough = function(handler, type, success, fail) {
              if (typeof handler !== "function")
                return this.then();
              return this._then(success, fail, undefined, new PassThroughHandlerContext(this, type, handler), undefined);
            };
            Promise.prototype.lastly = Promise.prototype["finally"] = function(handler) {
              return this._passThrough(handler, 0, finallyHandler, finallyHandler);
            };
            Promise.prototype.tap = function(handler) {
              return this._passThrough(handler, 1, finallyHandler);
            };
            return PassThroughHandlerContext;
          };
        }, {"./util": 36}],
        16: [function(_dereq_, module, exports) {
          "use strict";
          module.exports = function(Promise, apiRejection, INTERNAL, tryConvertToPromise, Proxyable, debug) {
            var errors = _dereq_("./errors");
            var TypeError = errors.TypeError;
            var util = _dereq_("./util");
            var errorObj = util.errorObj;
            var tryCatch = util.tryCatch;
            var yieldHandlers = [];
            function promiseFromYieldHandler(value, yieldHandlers, traceParent) {
              for (var i = 0; i < yieldHandlers.length; ++i) {
                traceParent._pushContext();
                var result = tryCatch(yieldHandlers[i])(value);
                traceParent._popContext();
                if (result === errorObj) {
                  traceParent._pushContext();
                  var ret = Promise.reject(errorObj.e);
                  traceParent._popContext();
                  return ret;
                }
                var maybePromise = tryConvertToPromise(result, traceParent);
                if (maybePromise instanceof Promise)
                  return maybePromise;
              }
              return null;
            }
            function PromiseSpawn(generatorFunction, receiver, yieldHandler, stack) {
              if (debug.cancellation()) {
                var internal = new Promise(INTERNAL);
                var _finallyPromise = this._finallyPromise = new Promise(INTERNAL);
                this._promise = internal.lastly(function() {
                  return _finallyPromise;
                });
                internal._captureStackTrace();
                internal._setOnCancel(this);
              } else {
                var promise = this._promise = new Promise(INTERNAL);
                promise._captureStackTrace();
              }
              this._stack = stack;
              this._generatorFunction = generatorFunction;
              this._receiver = receiver;
              this._generator = undefined;
              this._yieldHandlers = typeof yieldHandler === "function" ? [yieldHandler].concat(yieldHandlers) : yieldHandlers;
              this._yieldedPromise = null;
              this._cancellationPhase = false;
            }
            util.inherits(PromiseSpawn, Proxyable);
            PromiseSpawn.prototype._isResolved = function() {
              return this._promise === null;
            };
            PromiseSpawn.prototype._cleanup = function() {
              this._promise = this._generator = null;
              if (debug.cancellation() && this._finallyPromise !== null) {
                this._finallyPromise._fulfill();
                this._finallyPromise = null;
              }
            };
            PromiseSpawn.prototype._promiseCancelled = function() {
              if (this._isResolved())
                return;
              var implementsReturn = typeof this._generator["return"] !== "undefined";
              var result;
              if (!implementsReturn) {
                var reason = new Promise.CancellationError("generator .return() sentinel");
                Promise.coroutine.returnSentinel = reason;
                this._promise._attachExtraTrace(reason);
                this._promise._pushContext();
                result = tryCatch(this._generator["throw"]).call(this._generator, reason);
                this._promise._popContext();
              } else {
                this._promise._pushContext();
                result = tryCatch(this._generator["return"]).call(this._generator, undefined);
                this._promise._popContext();
              }
              this._cancellationPhase = true;
              this._yieldedPromise = null;
              this._continue(result);
            };
            PromiseSpawn.prototype._promiseFulfilled = function(value) {
              this._yieldedPromise = null;
              this._promise._pushContext();
              var result = tryCatch(this._generator.next).call(this._generator, value);
              this._promise._popContext();
              this._continue(result);
            };
            PromiseSpawn.prototype._promiseRejected = function(reason) {
              this._yieldedPromise = null;
              this._promise._attachExtraTrace(reason);
              this._promise._pushContext();
              var result = tryCatch(this._generator["throw"]).call(this._generator, reason);
              this._promise._popContext();
              this._continue(result);
            };
            PromiseSpawn.prototype._resultCancelled = function() {
              if (this._yieldedPromise instanceof Promise) {
                var promise = this._yieldedPromise;
                this._yieldedPromise = null;
                promise.cancel();
              }
            };
            PromiseSpawn.prototype.promise = function() {
              return this._promise;
            };
            PromiseSpawn.prototype._run = function() {
              this._generator = this._generatorFunction.call(this._receiver);
              this._receiver = this._generatorFunction = undefined;
              this._promiseFulfilled(undefined);
            };
            PromiseSpawn.prototype._continue = function(result) {
              var promise = this._promise;
              if (result === errorObj) {
                this._cleanup();
                if (this._cancellationPhase) {
                  return promise.cancel();
                } else {
                  return promise._rejectCallback(result.e, false);
                }
              }
              var value = result.value;
              if (result.done === true) {
                this._cleanup();
                if (this._cancellationPhase) {
                  return promise.cancel();
                } else {
                  return promise._resolveCallback(value);
                }
              } else {
                var maybePromise = tryConvertToPromise(value, this._promise);
                if (!(maybePromise instanceof Promise)) {
                  maybePromise = promiseFromYieldHandler(maybePromise, this._yieldHandlers, this._promise);
                  if (maybePromise === null) {
                    this._promiseRejected(new TypeError("A value %s was yielded that could not be treated as a promise\u000a\u000a    See http://goo.gl/MqrFmX\u000a\u000a".replace("%s", value) + "From coroutine:\u000a" + this._stack.split("\n").slice(1, -7).join("\n")));
                    return;
                  }
                }
                maybePromise = maybePromise._target();
                var bitField = maybePromise._bitField;
                ;
                if (((bitField & 50397184) === 0)) {
                  this._yieldedPromise = maybePromise;
                  maybePromise._proxy(this, null);
                } else if (((bitField & 33554432) !== 0)) {
                  this._promiseFulfilled(maybePromise._value());
                } else if (((bitField & 16777216) !== 0)) {
                  this._promiseRejected(maybePromise._reason());
                } else {
                  this._promiseCancelled();
                }
              }
            };
            Promise.coroutine = function(generatorFunction, options) {
              if (typeof generatorFunction !== "function") {
                throw new TypeError("generatorFunction must be a function\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
              }
              var yieldHandler = Object(options).yieldHandler;
              var PromiseSpawn$ = PromiseSpawn;
              var stack = new Error().stack;
              return function() {
                var generator = generatorFunction.apply(this, arguments);
                var spawn = new PromiseSpawn$(undefined, undefined, yieldHandler, stack);
                var ret = spawn.promise();
                spawn._generator = generator;
                spawn._promiseFulfilled(undefined);
                return ret;
              };
            };
            Promise.coroutine.addYieldHandler = function(fn) {
              if (typeof fn !== "function") {
                throw new TypeError("expecting a function but got " + util.classString(fn));
              }
              yieldHandlers.push(fn);
            };
            Promise.spawn = function(generatorFunction) {
              debug.deprecated("Promise.spawn()", "Promise.coroutine()");
              if (typeof generatorFunction !== "function") {
                return apiRejection("generatorFunction must be a function\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
              }
              var spawn = new PromiseSpawn(generatorFunction, this);
              var ret = spawn.promise();
              spawn._run(Promise.spawn);
              return ret;
            };
          };
        }, {
          "./errors": 12,
          "./util": 36
        }],
        17: [function(_dereq_, module, exports) {
          "use strict";
          module.exports = function(Promise, PromiseArray, tryConvertToPromise, INTERNAL) {
            var util = _dereq_("./util");
            var canEvaluate = util.canEvaluate;
            var tryCatch = util.tryCatch;
            var errorObj = util.errorObj;
            var reject;
            if (!true) {
              if (canEvaluate) {
                var thenCallback = function(i) {
                  return new Function("value", "holder", "                             \n\
            'use strict';                                                    \n\
            holder.pIndex = value;                                           \n\
            holder.checkFulfillment(this);                                   \n\
            ".replace(/Index/g, i));
                };
                var promiseSetter = function(i) {
                  return new Function("promise", "holder", "                           \n\
            'use strict';                                                    \n\
            holder.pIndex = promise;                                         \n\
            ".replace(/Index/g, i));
                };
                var generateHolderClass = function(total) {
                  var props = new Array(total);
                  for (var i = 0; i < props.length; ++i) {
                    props[i] = "this.p" + (i + 1);
                  }
                  var assignment = props.join(" = ") + " = null;";
                  var cancellationCode = "var promise;\n" + props.map(function(prop) {
                    return "                                                         \n\
                promise = " + prop + ";                                      \n\
                if (promise instanceof Promise) {                            \n\
                    promise.cancel();                                        \n\
                }                                                            \n\
            ";
                  }).join("\n");
                  var passedArguments = props.join(", ");
                  var name = "Holder$" + total;
                  var code = "return function(tryCatch, errorObj, Promise) {           \n\
            'use strict';                                                    \n\
            function [TheName](fn) {                                         \n\
                [TheProperties]                                              \n\
                this.fn = fn;                                                \n\
                this.now = 0;                                                \n\
            }                                                                \n\
            [TheName].prototype.checkFulfillment = function(promise) {       \n\
                var now = ++this.now;                                        \n\
                if (now === [TheTotal]) {                                    \n\
                    promise._pushContext();                                  \n\
                    var callback = this.fn;                                  \n\
                    var ret = tryCatch(callback)([ThePassedArguments]);      \n\
                    promise._popContext();                                   \n\
                    if (ret === errorObj) {                                  \n\
                        promise._rejectCallback(ret.e, false);               \n\
                    } else {                                                 \n\
                        promise._resolveCallback(ret);                       \n\
                    }                                                        \n\
                }                                                            \n\
            };                                                               \n\
                                                                             \n\
            [TheName].prototype._resultCancelled = function() {              \n\
                [CancellationCode]                                           \n\
            };                                                               \n\
                                                                             \n\
            return [TheName];                                                \n\
        }(tryCatch, errorObj, Promise);                                      \n\
        ";
                  code = code.replace(/\[TheName\]/g, name).replace(/\[TheTotal\]/g, total).replace(/\[ThePassedArguments\]/g, passedArguments).replace(/\[TheProperties\]/g, assignment).replace(/\[CancellationCode\]/g, cancellationCode);
                  return new Function("tryCatch", "errorObj", "Promise", code)(tryCatch, errorObj, Promise);
                };
                var holderClasses = [];
                var thenCallbacks = [];
                var promiseSetters = [];
                for (var i = 0; i < 8; ++i) {
                  holderClasses.push(generateHolderClass(i + 1));
                  thenCallbacks.push(thenCallback(i + 1));
                  promiseSetters.push(promiseSetter(i + 1));
                }
                reject = function(reason) {
                  this._reject(reason);
                };
              }
            }
            Promise.join = function() {
              var last = arguments.length - 1;
              var fn;
              if (last > 0 && typeof arguments[last] === "function") {
                fn = arguments[last];
                if (!true) {
                  if (last <= 8 && canEvaluate) {
                    var ret = new Promise(INTERNAL);
                    ret._captureStackTrace();
                    var HolderClass = holderClasses[last - 1];
                    var holder = new HolderClass(fn);
                    var callbacks = thenCallbacks;
                    for (var i = 0; i < last; ++i) {
                      var maybePromise = tryConvertToPromise(arguments[i], ret);
                      if (maybePromise instanceof Promise) {
                        maybePromise = maybePromise._target();
                        var bitField = maybePromise._bitField;
                        ;
                        if (((bitField & 50397184) === 0)) {
                          maybePromise._then(callbacks[i], reject, undefined, ret, holder);
                          promiseSetters[i](maybePromise, holder);
                        } else if (((bitField & 33554432) !== 0)) {
                          callbacks[i].call(ret, maybePromise._value(), holder);
                        } else if (((bitField & 16777216) !== 0)) {
                          ret._reject(maybePromise._reason());
                        } else {
                          ret._cancel();
                        }
                      } else {
                        callbacks[i].call(ret, maybePromise, holder);
                      }
                    }
                    if (!ret._isFateSealed()) {
                      ret._setAsyncGuaranteed();
                      ret._setOnCancel(holder);
                    }
                    return ret;
                  }
                }
              }
              var args = [].slice.call(arguments);
              ;
              if (fn)
                args.pop();
              var ret = new PromiseArray(args).promise();
              return fn !== undefined ? ret.spread(fn) : ret;
            };
          };
        }, {"./util": 36}],
        18: [function(_dereq_, module, exports) {
          "use strict";
          module.exports = function(Promise, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug) {
            var getDomain = Promise._getDomain;
            var util = _dereq_("./util");
            var tryCatch = util.tryCatch;
            var errorObj = util.errorObj;
            var EMPTY_ARRAY = [];
            function MappingPromiseArray(promises, fn, limit, _filter) {
              this.constructor$(promises);
              this._promise._captureStackTrace();
              var domain = getDomain();
              this._callback = domain === null ? fn : domain.bind(fn);
              this._preservedValues = _filter === INTERNAL ? new Array(this.length()) : null;
              this._limit = limit;
              this._inFlight = 0;
              this._queue = limit >= 1 ? [] : EMPTY_ARRAY;
              this._init$(undefined, -2);
            }
            util.inherits(MappingPromiseArray, PromiseArray);
            MappingPromiseArray.prototype._init = function() {};
            MappingPromiseArray.prototype._promiseFulfilled = function(value, index) {
              var values = this._values;
              var length = this.length();
              var preservedValues = this._preservedValues;
              var limit = this._limit;
              if (index < 0) {
                index = (index * -1) - 1;
                values[index] = value;
                if (limit >= 1) {
                  this._inFlight--;
                  this._drainQueue();
                  if (this._isResolved())
                    return true;
                }
              } else {
                if (limit >= 1 && this._inFlight >= limit) {
                  values[index] = value;
                  this._queue.push(index);
                  return false;
                }
                if (preservedValues !== null)
                  preservedValues[index] = value;
                var promise = this._promise;
                var callback = this._callback;
                var receiver = promise._boundValue();
                promise._pushContext();
                var ret = tryCatch(callback).call(receiver, value, index, length);
                var promiseCreated = promise._popContext();
                debug.checkForgottenReturns(ret, promiseCreated, preservedValues !== null ? "Promise.filter" : "Promise.map", promise);
                if (ret === errorObj) {
                  this._reject(ret.e);
                  return true;
                }
                var maybePromise = tryConvertToPromise(ret, this._promise);
                if (maybePromise instanceof Promise) {
                  maybePromise = maybePromise._target();
                  var bitField = maybePromise._bitField;
                  ;
                  if (((bitField & 50397184) === 0)) {
                    if (limit >= 1)
                      this._inFlight++;
                    values[index] = maybePromise;
                    maybePromise._proxy(this, (index + 1) * -1);
                    return false;
                  } else if (((bitField & 33554432) !== 0)) {
                    ret = maybePromise._value();
                  } else if (((bitField & 16777216) !== 0)) {
                    this._reject(maybePromise._reason());
                    return true;
                  } else {
                    this._cancel();
                    return true;
                  }
                }
                values[index] = ret;
              }
              var totalResolved = ++this._totalResolved;
              if (totalResolved >= length) {
                if (preservedValues !== null) {
                  this._filter(values, preservedValues);
                } else {
                  this._resolve(values);
                }
                return true;
              }
              return false;
            };
            MappingPromiseArray.prototype._drainQueue = function() {
              var queue = this._queue;
              var limit = this._limit;
              var values = this._values;
              while (queue.length > 0 && this._inFlight < limit) {
                if (this._isResolved())
                  return;
                var index = queue.pop();
                this._promiseFulfilled(values[index], index);
              }
            };
            MappingPromiseArray.prototype._filter = function(booleans, values) {
              var len = values.length;
              var ret = new Array(len);
              var j = 0;
              for (var i = 0; i < len; ++i) {
                if (booleans[i])
                  ret[j++] = values[i];
              }
              ret.length = j;
              this._resolve(ret);
            };
            MappingPromiseArray.prototype.preservedValues = function() {
              return this._preservedValues;
            };
            function map(promises, fn, options, _filter) {
              if (typeof fn !== "function") {
                return apiRejection("expecting a function but got " + util.classString(fn));
              }
              var limit = 0;
              if (options !== undefined) {
                if (typeof options === "object" && options !== null) {
                  if (typeof options.concurrency !== "number") {
                    return Promise.reject(new TypeError("'concurrency' must be a number but it is " + util.classString(options.concurrency)));
                  }
                  limit = options.concurrency;
                } else {
                  return Promise.reject(new TypeError("options argument must be an object but it is " + util.classString(options)));
                }
              }
              limit = typeof limit === "number" && isFinite(limit) && limit >= 1 ? limit : 0;
              return new MappingPromiseArray(promises, fn, limit, _filter).promise();
            }
            Promise.prototype.map = function(fn, options) {
              return map(this, fn, options, null);
            };
            Promise.map = function(promises, fn, options, _filter) {
              return map(promises, fn, options, _filter);
            };
          };
        }, {"./util": 36}],
        19: [function(_dereq_, module, exports) {
          "use strict";
          module.exports = function(Promise, INTERNAL, tryConvertToPromise, apiRejection, debug) {
            var util = _dereq_("./util");
            var tryCatch = util.tryCatch;
            Promise.method = function(fn) {
              if (typeof fn !== "function") {
                throw new Promise.TypeError("expecting a function but got " + util.classString(fn));
              }
              return function() {
                var ret = new Promise(INTERNAL);
                ret._captureStackTrace();
                ret._pushContext();
                var value = tryCatch(fn).apply(this, arguments);
                var promiseCreated = ret._popContext();
                debug.checkForgottenReturns(value, promiseCreated, "Promise.method", ret);
                ret._resolveFromSyncValue(value);
                return ret;
              };
            };
            Promise.attempt = Promise["try"] = function(fn) {
              if (typeof fn !== "function") {
                return apiRejection("expecting a function but got " + util.classString(fn));
              }
              var ret = new Promise(INTERNAL);
              ret._captureStackTrace();
              ret._pushContext();
              var value;
              if (arguments.length > 1) {
                debug.deprecated("calling Promise.try with more than 1 argument");
                var arg = arguments[1];
                var ctx = arguments[2];
                value = util.isArray(arg) ? tryCatch(fn).apply(ctx, arg) : tryCatch(fn).call(ctx, arg);
              } else {
                value = tryCatch(fn)();
              }
              var promiseCreated = ret._popContext();
              debug.checkForgottenReturns(value, promiseCreated, "Promise.try", ret);
              ret._resolveFromSyncValue(value);
              return ret;
            };
            Promise.prototype._resolveFromSyncValue = function(value) {
              if (value === util.errorObj) {
                this._rejectCallback(value.e, false);
              } else {
                this._resolveCallback(value, true);
              }
            };
          };
        }, {"./util": 36}],
        20: [function(_dereq_, module, exports) {
          "use strict";
          var util = _dereq_("./util");
          var maybeWrapAsError = util.maybeWrapAsError;
          var errors = _dereq_("./errors");
          var OperationalError = errors.OperationalError;
          var es5 = _dereq_("./es5");
          function isUntypedError(obj) {
            return obj instanceof Error && es5.getPrototypeOf(obj) === Error.prototype;
          }
          var rErrorKey = /^(?:name|message|stack|cause)$/;
          function wrapAsOperationalError(obj) {
            var ret;
            if (isUntypedError(obj)) {
              ret = new OperationalError(obj);
              ret.name = obj.name;
              ret.message = obj.message;
              ret.stack = obj.stack;
              var keys = es5.keys(obj);
              for (var i = 0; i < keys.length; ++i) {
                var key = keys[i];
                if (!rErrorKey.test(key)) {
                  ret[key] = obj[key];
                }
              }
              return ret;
            }
            util.markAsOriginatingFromRejection(obj);
            return obj;
          }
          function nodebackForPromise(promise, multiArgs) {
            return function(err, value) {
              if (promise === null)
                return;
              if (err) {
                var wrapped = wrapAsOperationalError(maybeWrapAsError(err));
                promise._attachExtraTrace(wrapped);
                promise._reject(wrapped);
              } else if (!multiArgs) {
                promise._fulfill(value);
              } else {
                var args = [].slice.call(arguments, 1);
                ;
                promise._fulfill(args);
              }
              promise = null;
            };
          }
          module.exports = nodebackForPromise;
        }, {
          "./errors": 12,
          "./es5": 13,
          "./util": 36
        }],
        21: [function(_dereq_, module, exports) {
          "use strict";
          module.exports = function(Promise) {
            var util = _dereq_("./util");
            var async = Promise._async;
            var tryCatch = util.tryCatch;
            var errorObj = util.errorObj;
            function spreadAdapter(val, nodeback) {
              var promise = this;
              if (!util.isArray(val))
                return successAdapter.call(promise, val, nodeback);
              var ret = tryCatch(nodeback).apply(promise._boundValue(), [null].concat(val));
              if (ret === errorObj) {
                async.throwLater(ret.e);
              }
            }
            function successAdapter(val, nodeback) {
              var promise = this;
              var receiver = promise._boundValue();
              var ret = val === undefined ? tryCatch(nodeback).call(receiver, null) : tryCatch(nodeback).call(receiver, null, val);
              if (ret === errorObj) {
                async.throwLater(ret.e);
              }
            }
            function errorAdapter(reason, nodeback) {
              var promise = this;
              if (!reason) {
                var newReason = new Error(reason + "");
                newReason.cause = reason;
                reason = newReason;
              }
              var ret = tryCatch(nodeback).call(promise._boundValue(), reason);
              if (ret === errorObj) {
                async.throwLater(ret.e);
              }
            }
            Promise.prototype.asCallback = Promise.prototype.nodeify = function(nodeback, options) {
              if (typeof nodeback == "function") {
                var adapter = successAdapter;
                if (options !== undefined && Object(options).spread) {
                  adapter = spreadAdapter;
                }
                this._then(adapter, errorAdapter, undefined, this, nodeback);
              }
              return this;
            };
          };
        }, {"./util": 36}],
        22: [function(_dereq_, module, exports) {
          "use strict";
          module.exports = function() {
            var makeSelfResolutionError = function() {
              return new TypeError("circular promise resolution chain\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
            };
            var reflectHandler = function() {
              return new Promise.PromiseInspection(this._target());
            };
            var apiRejection = function(msg) {
              return Promise.reject(new TypeError(msg));
            };
            function Proxyable() {}
            var UNDEFINED_BINDING = {};
            var util = _dereq_("./util");
            var getDomain;
            if (util.isNode) {
              getDomain = function() {
                var ret = process.domain;
                if (ret === undefined)
                  ret = null;
                return ret;
              };
            } else {
              getDomain = function() {
                return null;
              };
            }
            util.notEnumerableProp(Promise, "_getDomain", getDomain);
            var es5 = _dereq_("./es5");
            var Async = _dereq_("./async");
            var async = new Async();
            es5.defineProperty(Promise, "_async", {value: async});
            var errors = _dereq_("./errors");
            var TypeError = Promise.TypeError = errors.TypeError;
            Promise.RangeError = errors.RangeError;
            var CancellationError = Promise.CancellationError = errors.CancellationError;
            Promise.TimeoutError = errors.TimeoutError;
            Promise.OperationalError = errors.OperationalError;
            Promise.RejectionError = errors.OperationalError;
            Promise.AggregateError = errors.AggregateError;
            var INTERNAL = function() {};
            var APPLY = {};
            var NEXT_FILTER = {};
            var tryConvertToPromise = _dereq_("./thenables")(Promise, INTERNAL);
            var PromiseArray = _dereq_("./promise_array")(Promise, INTERNAL, tryConvertToPromise, apiRejection, Proxyable);
            var Context = _dereq_("./context")(Promise);
            var createContext = Context.create;
            var debug = _dereq_("./debuggability")(Promise, Context);
            var CapturedTrace = debug.CapturedTrace;
            var PassThroughHandlerContext = _dereq_("./finally")(Promise, tryConvertToPromise);
            var catchFilter = _dereq_("./catch_filter")(NEXT_FILTER);
            var nodebackForPromise = _dereq_("./nodeback");
            var errorObj = util.errorObj;
            var tryCatch = util.tryCatch;
            function check(self, executor) {
              if (typeof executor !== "function") {
                throw new TypeError("expecting a function but got " + util.classString(executor));
              }
              if (self.constructor !== Promise) {
                throw new TypeError("the promise constructor cannot be invoked directly\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
              }
            }
            function Promise(executor) {
              this._bitField = 0;
              this._fulfillmentHandler0 = undefined;
              this._rejectionHandler0 = undefined;
              this._promise0 = undefined;
              this._receiver0 = undefined;
              if (executor !== INTERNAL) {
                check(this, executor);
                this._resolveFromExecutor(executor);
              }
              this._promiseCreated();
              this._fireEvent("promiseCreated", this);
            }
            Promise.prototype.toString = function() {
              return "[object Promise]";
            };
            Promise.prototype.caught = Promise.prototype["catch"] = function(fn) {
              var len = arguments.length;
              if (len > 1) {
                var catchInstances = new Array(len - 1),
                    j = 0,
                    i;
                for (i = 0; i < len - 1; ++i) {
                  var item = arguments[i];
                  if (util.isObject(item)) {
                    catchInstances[j++] = item;
                  } else {
                    return apiRejection("expecting an object but got " + util.classString(item));
                  }
                }
                catchInstances.length = j;
                fn = arguments[i];
                return this.then(undefined, catchFilter(catchInstances, fn, this));
              }
              return this.then(undefined, fn);
            };
            Promise.prototype.reflect = function() {
              return this._then(reflectHandler, reflectHandler, undefined, this, undefined);
            };
            Promise.prototype.then = function(didFulfill, didReject) {
              if (debug.warnings() && arguments.length > 0 && typeof didFulfill !== "function" && typeof didReject !== "function") {
                var msg = ".then() only accepts functions but was passed: " + util.classString(didFulfill);
                if (arguments.length > 1) {
                  msg += ", " + util.classString(didReject);
                }
                this._warn(msg);
              }
              return this._then(didFulfill, didReject, undefined, undefined, undefined);
            };
            Promise.prototype.done = function(didFulfill, didReject) {
              var promise = this._then(didFulfill, didReject, undefined, undefined, undefined);
              promise._setIsFinal();
            };
            Promise.prototype.spread = function(fn) {
              if (typeof fn !== "function") {
                return apiRejection("expecting a function but got " + util.classString(fn));
              }
              return this.all()._then(fn, undefined, undefined, APPLY, undefined);
            };
            Promise.prototype.toJSON = function() {
              var ret = {
                isFulfilled: false,
                isRejected: false,
                fulfillmentValue: undefined,
                rejectionReason: undefined
              };
              if (this.isFulfilled()) {
                ret.fulfillmentValue = this.value();
                ret.isFulfilled = true;
              } else if (this.isRejected()) {
                ret.rejectionReason = this.reason();
                ret.isRejected = true;
              }
              return ret;
            };
            Promise.prototype.all = function() {
              if (arguments.length > 0) {
                this._warn(".all() was passed arguments but it does not take any");
              }
              return new PromiseArray(this).promise();
            };
            Promise.prototype.error = function(fn) {
              return this.caught(util.originatesFromRejection, fn);
            };
            Promise.is = function(val) {
              return val instanceof Promise;
            };
            Promise.fromNode = Promise.fromCallback = function(fn) {
              var ret = new Promise(INTERNAL);
              ret._captureStackTrace();
              var multiArgs = arguments.length > 1 ? !!Object(arguments[1]).multiArgs : false;
              var result = tryCatch(fn)(nodebackForPromise(ret, multiArgs));
              if (result === errorObj) {
                ret._rejectCallback(result.e, true);
              }
              if (!ret._isFateSealed())
                ret._setAsyncGuaranteed();
              return ret;
            };
            Promise.all = function(promises) {
              return new PromiseArray(promises).promise();
            };
            Promise.cast = function(obj) {
              var ret = tryConvertToPromise(obj);
              if (!(ret instanceof Promise)) {
                ret = new Promise(INTERNAL);
                ret._captureStackTrace();
                ret._setFulfilled();
                ret._rejectionHandler0 = obj;
              }
              return ret;
            };
            Promise.resolve = Promise.fulfilled = Promise.cast;
            Promise.reject = Promise.rejected = function(reason) {
              var ret = new Promise(INTERNAL);
              ret._captureStackTrace();
              ret._rejectCallback(reason, true);
              return ret;
            };
            Promise.setScheduler = function(fn) {
              if (typeof fn !== "function") {
                throw new TypeError("expecting a function but got " + util.classString(fn));
              }
              return async.setScheduler(fn);
            };
            Promise.prototype._then = function(didFulfill, didReject, _, receiver, internalData) {
              var haveInternalData = internalData !== undefined;
              var promise = haveInternalData ? internalData : new Promise(INTERNAL);
              var target = this._target();
              var bitField = target._bitField;
              if (!haveInternalData) {
                promise._propagateFrom(this, 3);
                promise._captureStackTrace();
                if (receiver === undefined && ((this._bitField & 2097152) !== 0)) {
                  if (!((bitField & 50397184) === 0)) {
                    receiver = this._boundValue();
                  } else {
                    receiver = target === this ? undefined : this._boundTo;
                  }
                }
                this._fireEvent("promiseChained", this, promise);
              }
              var domain = getDomain();
              if (!((bitField & 50397184) === 0)) {
                var handler,
                    value,
                    settler = target._settlePromiseCtx;
                if (((bitField & 33554432) !== 0)) {
                  value = target._rejectionHandler0;
                  handler = didFulfill;
                } else if (((bitField & 16777216) !== 0)) {
                  value = target._fulfillmentHandler0;
                  handler = didReject;
                  target._unsetRejectionIsUnhandled();
                } else {
                  settler = target._settlePromiseLateCancellationObserver;
                  value = new CancellationError("late cancellation observer");
                  target._attachExtraTrace(value);
                  handler = didReject;
                }
                async.invoke(settler, target, {
                  handler: domain === null ? handler : (typeof handler === "function" && domain.bind(handler)),
                  promise: promise,
                  receiver: receiver,
                  value: value
                });
              } else {
                target._addCallbacks(didFulfill, didReject, promise, receiver, domain);
              }
              return promise;
            };
            Promise.prototype._length = function() {
              return this._bitField & 65535;
            };
            Promise.prototype._isFateSealed = function() {
              return (this._bitField & 117506048) !== 0;
            };
            Promise.prototype._isFollowing = function() {
              return (this._bitField & 67108864) === 67108864;
            };
            Promise.prototype._setLength = function(len) {
              this._bitField = (this._bitField & -65536) | (len & 65535);
            };
            Promise.prototype._setFulfilled = function() {
              this._bitField = this._bitField | 33554432;
              this._fireEvent("promiseFulfilled", this);
            };
            Promise.prototype._setRejected = function() {
              this._bitField = this._bitField | 16777216;
              this._fireEvent("promiseRejected", this);
            };
            Promise.prototype._setFollowing = function() {
              this._bitField = this._bitField | 67108864;
              this._fireEvent("promiseResolved", this);
            };
            Promise.prototype._setIsFinal = function() {
              this._bitField = this._bitField | 4194304;
            };
            Promise.prototype._isFinal = function() {
              return (this._bitField & 4194304) > 0;
            };
            Promise.prototype._unsetCancelled = function() {
              this._bitField = this._bitField & (~65536);
            };
            Promise.prototype._setCancelled = function() {
              this._bitField = this._bitField | 65536;
              this._fireEvent("promiseCancelled", this);
            };
            Promise.prototype._setAsyncGuaranteed = function() {
              if (async.hasCustomScheduler())
                return;
              this._bitField = this._bitField | 134217728;
            };
            Promise.prototype._receiverAt = function(index) {
              var ret = index === 0 ? this._receiver0 : this[index * 4 - 4 + 3];
              if (ret === UNDEFINED_BINDING) {
                return undefined;
              } else if (ret === undefined && this._isBound()) {
                return this._boundValue();
              }
              return ret;
            };
            Promise.prototype._promiseAt = function(index) {
              return this[index * 4 - 4 + 2];
            };
            Promise.prototype._fulfillmentHandlerAt = function(index) {
              return this[index * 4 - 4 + 0];
            };
            Promise.prototype._rejectionHandlerAt = function(index) {
              return this[index * 4 - 4 + 1];
            };
            Promise.prototype._boundValue = function() {};
            Promise.prototype._migrateCallback0 = function(follower) {
              var bitField = follower._bitField;
              var fulfill = follower._fulfillmentHandler0;
              var reject = follower._rejectionHandler0;
              var promise = follower._promise0;
              var receiver = follower._receiverAt(0);
              if (receiver === undefined)
                receiver = UNDEFINED_BINDING;
              this._addCallbacks(fulfill, reject, promise, receiver, null);
            };
            Promise.prototype._migrateCallbackAt = function(follower, index) {
              var fulfill = follower._fulfillmentHandlerAt(index);
              var reject = follower._rejectionHandlerAt(index);
              var promise = follower._promiseAt(index);
              var receiver = follower._receiverAt(index);
              if (receiver === undefined)
                receiver = UNDEFINED_BINDING;
              this._addCallbacks(fulfill, reject, promise, receiver, null);
            };
            Promise.prototype._addCallbacks = function(fulfill, reject, promise, receiver, domain) {
              var index = this._length();
              if (index >= 65535 - 4) {
                index = 0;
                this._setLength(0);
              }
              if (index === 0) {
                this._promise0 = promise;
                this._receiver0 = receiver;
                if (typeof fulfill === "function") {
                  this._fulfillmentHandler0 = domain === null ? fulfill : domain.bind(fulfill);
                }
                if (typeof reject === "function") {
                  this._rejectionHandler0 = domain === null ? reject : domain.bind(reject);
                }
              } else {
                var base = index * 4 - 4;
                this[base + 2] = promise;
                this[base + 3] = receiver;
                if (typeof fulfill === "function") {
                  this[base + 0] = domain === null ? fulfill : domain.bind(fulfill);
                }
                if (typeof reject === "function") {
                  this[base + 1] = domain === null ? reject : domain.bind(reject);
                }
              }
              this._setLength(index + 1);
              return index;
            };
            Promise.prototype._proxy = function(proxyable, arg) {
              this._addCallbacks(undefined, undefined, arg, proxyable, null);
            };
            Promise.prototype._resolveCallback = function(value, shouldBind) {
              if (((this._bitField & 117506048) !== 0))
                return;
              if (value === this)
                return this._rejectCallback(makeSelfResolutionError(), false);
              var maybePromise = tryConvertToPromise(value, this);
              if (!(maybePromise instanceof Promise))
                return this._fulfill(value);
              if (shouldBind)
                this._propagateFrom(maybePromise, 2);
              var promise = maybePromise._target();
              if (promise === this) {
                this._reject(makeSelfResolutionError());
                return;
              }
              var bitField = promise._bitField;
              if (((bitField & 50397184) === 0)) {
                var len = this._length();
                if (len > 0)
                  promise._migrateCallback0(this);
                for (var i = 1; i < len; ++i) {
                  promise._migrateCallbackAt(this, i);
                }
                this._setFollowing();
                this._setLength(0);
                this._setFollowee(promise);
              } else if (((bitField & 33554432) !== 0)) {
                this._fulfill(promise._value());
              } else if (((bitField & 16777216) !== 0)) {
                this._reject(promise._reason());
              } else {
                var reason = new CancellationError("late cancellation observer");
                promise._attachExtraTrace(reason);
                this._reject(reason);
              }
            };
            Promise.prototype._rejectCallback = function(reason, synchronous, ignoreNonErrorWarnings) {
              var trace = util.ensureErrorObject(reason);
              var hasStack = trace === reason;
              if (!hasStack && !ignoreNonErrorWarnings && debug.warnings()) {
                var message = "a promise was rejected with a non-error: " + util.classString(reason);
                this._warn(message, true);
              }
              this._attachExtraTrace(trace, synchronous ? hasStack : false);
              this._reject(reason);
            };
            Promise.prototype._resolveFromExecutor = function(executor) {
              var promise = this;
              this._captureStackTrace();
              this._pushContext();
              var synchronous = true;
              var r = this._execute(executor, function(value) {
                promise._resolveCallback(value);
              }, function(reason) {
                promise._rejectCallback(reason, synchronous);
              });
              synchronous = false;
              this._popContext();
              if (r !== undefined) {
                promise._rejectCallback(r, true);
              }
            };
            Promise.prototype._settlePromiseFromHandler = function(handler, receiver, value, promise) {
              var bitField = promise._bitField;
              if (((bitField & 65536) !== 0))
                return;
              promise._pushContext();
              var x;
              if (receiver === APPLY) {
                if (!value || typeof value.length !== "number") {
                  x = errorObj;
                  x.e = new TypeError("cannot .spread() a non-array: " + util.classString(value));
                } else {
                  x = tryCatch(handler).apply(this._boundValue(), value);
                }
              } else {
                x = tryCatch(handler).call(receiver, value);
              }
              var promiseCreated = promise._popContext();
              bitField = promise._bitField;
              if (((bitField & 65536) !== 0))
                return;
              if (x === NEXT_FILTER) {
                promise._reject(value);
              } else if (x === errorObj) {
                promise._rejectCallback(x.e, false);
              } else {
                debug.checkForgottenReturns(x, promiseCreated, "", promise, this);
                promise._resolveCallback(x);
              }
            };
            Promise.prototype._target = function() {
              var ret = this;
              while (ret._isFollowing())
                ret = ret._followee();
              return ret;
            };
            Promise.prototype._followee = function() {
              return this._rejectionHandler0;
            };
            Promise.prototype._setFollowee = function(promise) {
              this._rejectionHandler0 = promise;
            };
            Promise.prototype._settlePromise = function(promise, handler, receiver, value) {
              var isPromise = promise instanceof Promise;
              var bitField = this._bitField;
              var asyncGuaranteed = ((bitField & 134217728) !== 0);
              if (((bitField & 65536) !== 0)) {
                if (isPromise)
                  promise._invokeInternalOnCancel();
                if (receiver instanceof PassThroughHandlerContext && receiver.isFinallyHandler()) {
                  receiver.cancelPromise = promise;
                  if (tryCatch(handler).call(receiver, value) === errorObj) {
                    promise._reject(errorObj.e);
                  }
                } else if (handler === reflectHandler) {
                  promise._fulfill(reflectHandler.call(receiver));
                } else if (receiver instanceof Proxyable) {
                  receiver._promiseCancelled(promise);
                } else if (isPromise || promise instanceof PromiseArray) {
                  promise._cancel();
                } else {
                  receiver.cancel();
                }
              } else if (typeof handler === "function") {
                if (!isPromise) {
                  handler.call(receiver, value, promise);
                } else {
                  if (asyncGuaranteed)
                    promise._setAsyncGuaranteed();
                  this._settlePromiseFromHandler(handler, receiver, value, promise);
                }
              } else if (receiver instanceof Proxyable) {
                if (!receiver._isResolved()) {
                  if (((bitField & 33554432) !== 0)) {
                    receiver._promiseFulfilled(value, promise);
                  } else {
                    receiver._promiseRejected(value, promise);
                  }
                }
              } else if (isPromise) {
                if (asyncGuaranteed)
                  promise._setAsyncGuaranteed();
                if (((bitField & 33554432) !== 0)) {
                  promise._fulfill(value);
                } else {
                  promise._reject(value);
                }
              }
            };
            Promise.prototype._settlePromiseLateCancellationObserver = function(ctx) {
              var handler = ctx.handler;
              var promise = ctx.promise;
              var receiver = ctx.receiver;
              var value = ctx.value;
              if (typeof handler === "function") {
                if (!(promise instanceof Promise)) {
                  handler.call(receiver, value, promise);
                } else {
                  this._settlePromiseFromHandler(handler, receiver, value, promise);
                }
              } else if (promise instanceof Promise) {
                promise._reject(value);
              }
            };
            Promise.prototype._settlePromiseCtx = function(ctx) {
              this._settlePromise(ctx.promise, ctx.handler, ctx.receiver, ctx.value);
            };
            Promise.prototype._settlePromise0 = function(handler, value, bitField) {
              var promise = this._promise0;
              var receiver = this._receiverAt(0);
              this._promise0 = undefined;
              this._receiver0 = undefined;
              this._settlePromise(promise, handler, receiver, value);
            };
            Promise.prototype._clearCallbackDataAtIndex = function(index) {
              var base = index * 4 - 4;
              this[base + 2] = this[base + 3] = this[base + 0] = this[base + 1] = undefined;
            };
            Promise.prototype._fulfill = function(value) {
              var bitField = this._bitField;
              if (((bitField & 117506048) >>> 16))
                return;
              if (value === this) {
                var err = makeSelfResolutionError();
                this._attachExtraTrace(err);
                return this._reject(err);
              }
              this._setFulfilled();
              this._rejectionHandler0 = value;
              if ((bitField & 65535) > 0) {
                if (((bitField & 134217728) !== 0)) {
                  this._settlePromises();
                } else {
                  async.settlePromises(this);
                }
              }
            };
            Promise.prototype._reject = function(reason) {
              var bitField = this._bitField;
              if (((bitField & 117506048) >>> 16))
                return;
              this._setRejected();
              this._fulfillmentHandler0 = reason;
              if (this._isFinal()) {
                return async.fatalError(reason, util.isNode);
              }
              if ((bitField & 65535) > 0) {
                async.settlePromises(this);
              } else {
                this._ensurePossibleRejectionHandled();
              }
            };
            Promise.prototype._fulfillPromises = function(len, value) {
              for (var i = 1; i < len; i++) {
                var handler = this._fulfillmentHandlerAt(i);
                var promise = this._promiseAt(i);
                var receiver = this._receiverAt(i);
                this._clearCallbackDataAtIndex(i);
                this._settlePromise(promise, handler, receiver, value);
              }
            };
            Promise.prototype._rejectPromises = function(len, reason) {
              for (var i = 1; i < len; i++) {
                var handler = this._rejectionHandlerAt(i);
                var promise = this._promiseAt(i);
                var receiver = this._receiverAt(i);
                this._clearCallbackDataAtIndex(i);
                this._settlePromise(promise, handler, receiver, reason);
              }
            };
            Promise.prototype._settlePromises = function() {
              var bitField = this._bitField;
              var len = (bitField & 65535);
              if (len > 0) {
                if (((bitField & 16842752) !== 0)) {
                  var reason = this._fulfillmentHandler0;
                  this._settlePromise0(this._rejectionHandler0, reason, bitField);
                  this._rejectPromises(len, reason);
                } else {
                  var value = this._rejectionHandler0;
                  this._settlePromise0(this._fulfillmentHandler0, value, bitField);
                  this._fulfillPromises(len, value);
                }
                this._setLength(0);
              }
              this._clearCancellationData();
            };
            Promise.prototype._settledValue = function() {
              var bitField = this._bitField;
              if (((bitField & 33554432) !== 0)) {
                return this._rejectionHandler0;
              } else if (((bitField & 16777216) !== 0)) {
                return this._fulfillmentHandler0;
              }
            };
            function deferResolve(v) {
              this.promise._resolveCallback(v);
            }
            function deferReject(v) {
              this.promise._rejectCallback(v, false);
            }
            Promise.defer = Promise.pending = function() {
              debug.deprecated("Promise.defer", "new Promise");
              var promise = new Promise(INTERNAL);
              return {
                promise: promise,
                resolve: deferResolve,
                reject: deferReject
              };
            };
            util.notEnumerableProp(Promise, "_makeSelfResolutionError", makeSelfResolutionError);
            _dereq_("./method")(Promise, INTERNAL, tryConvertToPromise, apiRejection, debug);
            _dereq_("./bind")(Promise, INTERNAL, tryConvertToPromise, debug);
            _dereq_("./cancel")(Promise, PromiseArray, apiRejection, debug);
            _dereq_("./direct_resolve")(Promise);
            _dereq_("./synchronous_inspection")(Promise);
            _dereq_("./join")(Promise, PromiseArray, tryConvertToPromise, INTERNAL, debug);
            Promise.Promise = Promise;
            Promise.version = "3.4.0";
            _dereq_('./map.js')(Promise, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug);
            _dereq_('./call_get.js')(Promise);
            _dereq_('./using.js')(Promise, apiRejection, tryConvertToPromise, createContext, INTERNAL, debug);
            _dereq_('./timers.js')(Promise, INTERNAL, debug);
            _dereq_('./generators.js')(Promise, apiRejection, INTERNAL, tryConvertToPromise, Proxyable, debug);
            _dereq_('./nodeify.js')(Promise);
            _dereq_('./promisify.js')(Promise, INTERNAL);
            _dereq_('./props.js')(Promise, PromiseArray, tryConvertToPromise, apiRejection);
            _dereq_('./race.js')(Promise, INTERNAL, tryConvertToPromise, apiRejection);
            _dereq_('./reduce.js')(Promise, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug);
            _dereq_('./settle.js')(Promise, PromiseArray, debug);
            _dereq_('./some.js')(Promise, PromiseArray, apiRejection);
            _dereq_('./filter.js')(Promise, INTERNAL);
            _dereq_('./each.js')(Promise, INTERNAL);
            _dereq_('./any.js')(Promise);
            util.toFastProperties(Promise);
            util.toFastProperties(Promise.prototype);
            function fillTypes(value) {
              var p = new Promise(INTERNAL);
              p._fulfillmentHandler0 = value;
              p._rejectionHandler0 = value;
              p._promise0 = value;
              p._receiver0 = value;
            }
            fillTypes({a: 1});
            fillTypes({b: 2});
            fillTypes({c: 3});
            fillTypes(1);
            fillTypes(function() {});
            fillTypes(undefined);
            fillTypes(false);
            fillTypes(new Promise(INTERNAL));
            debug.setBounds(Async.firstLineError, util.lastLineError);
            return Promise;
          };
        }, {
          "./any.js": 1,
          "./async": 2,
          "./bind": 3,
          "./call_get.js": 5,
          "./cancel": 6,
          "./catch_filter": 7,
          "./context": 8,
          "./debuggability": 9,
          "./direct_resolve": 10,
          "./each.js": 11,
          "./errors": 12,
          "./es5": 13,
          "./filter.js": 14,
          "./finally": 15,
          "./generators.js": 16,
          "./join": 17,
          "./map.js": 18,
          "./method": 19,
          "./nodeback": 20,
          "./nodeify.js": 21,
          "./promise_array": 23,
          "./promisify.js": 24,
          "./props.js": 25,
          "./race.js": 27,
          "./reduce.js": 28,
          "./settle.js": 30,
          "./some.js": 31,
          "./synchronous_inspection": 32,
          "./thenables": 33,
          "./timers.js": 34,
          "./using.js": 35,
          "./util": 36
        }],
        23: [function(_dereq_, module, exports) {
          "use strict";
          module.exports = function(Promise, INTERNAL, tryConvertToPromise, apiRejection, Proxyable) {
            var util = _dereq_("./util");
            var isArray = util.isArray;
            function toResolutionValue(val) {
              switch (val) {
                case -2:
                  return [];
                case -3:
                  return {};
              }
            }
            function PromiseArray(values) {
              var promise = this._promise = new Promise(INTERNAL);
              if (values instanceof Promise) {
                promise._propagateFrom(values, 3);
              }
              promise._setOnCancel(this);
              this._values = values;
              this._length = 0;
              this._totalResolved = 0;
              this._init(undefined, -2);
            }
            util.inherits(PromiseArray, Proxyable);
            PromiseArray.prototype.length = function() {
              return this._length;
            };
            PromiseArray.prototype.promise = function() {
              return this._promise;
            };
            PromiseArray.prototype._init = function init(_, resolveValueIfEmpty) {
              var values = tryConvertToPromise(this._values, this._promise);
              if (values instanceof Promise) {
                values = values._target();
                var bitField = values._bitField;
                ;
                this._values = values;
                if (((bitField & 50397184) === 0)) {
                  this._promise._setAsyncGuaranteed();
                  return values._then(init, this._reject, undefined, this, resolveValueIfEmpty);
                } else if (((bitField & 33554432) !== 0)) {
                  values = values._value();
                } else if (((bitField & 16777216) !== 0)) {
                  return this._reject(values._reason());
                } else {
                  return this._cancel();
                }
              }
              values = util.asArray(values);
              if (values === null) {
                var err = apiRejection("expecting an array or an iterable object but got " + util.classString(values)).reason();
                this._promise._rejectCallback(err, false);
                return;
              }
              if (values.length === 0) {
                if (resolveValueIfEmpty === -5) {
                  this._resolveEmptyArray();
                } else {
                  this._resolve(toResolutionValue(resolveValueIfEmpty));
                }
                return;
              }
              this._iterate(values);
            };
            PromiseArray.prototype._iterate = function(values) {
              var len = this.getActualLength(values.length);
              this._length = len;
              this._values = this.shouldCopyValues() ? new Array(len) : this._values;
              var result = this._promise;
              var isResolved = false;
              var bitField = null;
              for (var i = 0; i < len; ++i) {
                var maybePromise = tryConvertToPromise(values[i], result);
                if (maybePromise instanceof Promise) {
                  maybePromise = maybePromise._target();
                  bitField = maybePromise._bitField;
                } else {
                  bitField = null;
                }
                if (isResolved) {
                  if (bitField !== null) {
                    maybePromise.suppressUnhandledRejections();
                  }
                } else if (bitField !== null) {
                  if (((bitField & 50397184) === 0)) {
                    maybePromise._proxy(this, i);
                    this._values[i] = maybePromise;
                  } else if (((bitField & 33554432) !== 0)) {
                    isResolved = this._promiseFulfilled(maybePromise._value(), i);
                  } else if (((bitField & 16777216) !== 0)) {
                    isResolved = this._promiseRejected(maybePromise._reason(), i);
                  } else {
                    isResolved = this._promiseCancelled(i);
                  }
                } else {
                  isResolved = this._promiseFulfilled(maybePromise, i);
                }
              }
              if (!isResolved)
                result._setAsyncGuaranteed();
            };
            PromiseArray.prototype._isResolved = function() {
              return this._values === null;
            };
            PromiseArray.prototype._resolve = function(value) {
              this._values = null;
              this._promise._fulfill(value);
            };
            PromiseArray.prototype._cancel = function() {
              if (this._isResolved() || !this._promise.isCancellable())
                return;
              this._values = null;
              this._promise._cancel();
            };
            PromiseArray.prototype._reject = function(reason) {
              this._values = null;
              this._promise._rejectCallback(reason, false);
            };
            PromiseArray.prototype._promiseFulfilled = function(value, index) {
              this._values[index] = value;
              var totalResolved = ++this._totalResolved;
              if (totalResolved >= this._length) {
                this._resolve(this._values);
                return true;
              }
              return false;
            };
            PromiseArray.prototype._promiseCancelled = function() {
              this._cancel();
              return true;
            };
            PromiseArray.prototype._promiseRejected = function(reason) {
              this._totalResolved++;
              this._reject(reason);
              return true;
            };
            PromiseArray.prototype._resultCancelled = function() {
              if (this._isResolved())
                return;
              var values = this._values;
              this._cancel();
              if (values instanceof Promise) {
                values.cancel();
              } else {
                for (var i = 0; i < values.length; ++i) {
                  if (values[i] instanceof Promise) {
                    values[i].cancel();
                  }
                }
              }
            };
            PromiseArray.prototype.shouldCopyValues = function() {
              return true;
            };
            PromiseArray.prototype.getActualLength = function(len) {
              return len;
            };
            return PromiseArray;
          };
        }, {"./util": 36}],
        24: [function(_dereq_, module, exports) {
          "use strict";
          module.exports = function(Promise, INTERNAL) {
            var THIS = {};
            var util = _dereq_("./util");
            var nodebackForPromise = _dereq_("./nodeback");
            var withAppended = util.withAppended;
            var maybeWrapAsError = util.maybeWrapAsError;
            var canEvaluate = util.canEvaluate;
            var TypeError = _dereq_("./errors").TypeError;
            var defaultSuffix = "Async";
            var defaultPromisified = {__isPromisified__: true};
            var noCopyProps = ["arity", "length", "name", "arguments", "caller", "callee", "prototype", "__isPromisified__"];
            var noCopyPropsPattern = new RegExp("^(?:" + noCopyProps.join("|") + ")$");
            var defaultFilter = function(name) {
              return util.isIdentifier(name) && name.charAt(0) !== "_" && name !== "constructor";
            };
            function propsFilter(key) {
              return !noCopyPropsPattern.test(key);
            }
            function isPromisified(fn) {
              try {
                return fn.__isPromisified__ === true;
              } catch (e) {
                return false;
              }
            }
            function hasPromisified(obj, key, suffix) {
              var val = util.getDataPropertyOrDefault(obj, key + suffix, defaultPromisified);
              return val ? isPromisified(val) : false;
            }
            function checkValid(ret, suffix, suffixRegexp) {
              for (var i = 0; i < ret.length; i += 2) {
                var key = ret[i];
                if (suffixRegexp.test(key)) {
                  var keyWithoutAsyncSuffix = key.replace(suffixRegexp, "");
                  for (var j = 0; j < ret.length; j += 2) {
                    if (ret[j] === keyWithoutAsyncSuffix) {
                      throw new TypeError("Cannot promisify an API that has normal methods with '%s'-suffix\u000a\u000a    See http://goo.gl/MqrFmX\u000a".replace("%s", suffix));
                    }
                  }
                }
              }
            }
            function promisifiableMethods(obj, suffix, suffixRegexp, filter) {
              var keys = util.inheritedDataKeys(obj);
              var ret = [];
              for (var i = 0; i < keys.length; ++i) {
                var key = keys[i];
                var value = obj[key];
                var passesDefaultFilter = filter === defaultFilter ? true : defaultFilter(key, value, obj);
                if (typeof value === "function" && !isPromisified(value) && !hasPromisified(obj, key, suffix) && filter(key, value, obj, passesDefaultFilter)) {
                  ret.push(key, value);
                }
              }
              checkValid(ret, suffix, suffixRegexp);
              return ret;
            }
            var escapeIdentRegex = function(str) {
              return str.replace(/([$])/, "\\$");
            };
            var makeNodePromisifiedEval;
            if (!true) {
              var switchCaseArgumentOrder = function(likelyArgumentCount) {
                var ret = [likelyArgumentCount];
                var min = Math.max(0, likelyArgumentCount - 1 - 3);
                for (var i = likelyArgumentCount - 1; i >= min; --i) {
                  ret.push(i);
                }
                for (var i = likelyArgumentCount + 1; i <= 3; ++i) {
                  ret.push(i);
                }
                return ret;
              };
              var argumentSequence = function(argumentCount) {
                return util.filledRange(argumentCount, "_arg", "");
              };
              var parameterDeclaration = function(parameterCount) {
                return util.filledRange(Math.max(parameterCount, 3), "_arg", "");
              };
              var parameterCount = function(fn) {
                if (typeof fn.length === "number") {
                  return Math.max(Math.min(fn.length, 1023 + 1), 0);
                }
                return 0;
              };
              makeNodePromisifiedEval = function(callback, receiver, originalName, fn, _, multiArgs) {
                var newParameterCount = Math.max(0, parameterCount(fn) - 1);
                var argumentOrder = switchCaseArgumentOrder(newParameterCount);
                var shouldProxyThis = typeof callback === "string" || receiver === THIS;
                function generateCallForArgumentCount(count) {
                  var args = argumentSequence(count).join(", ");
                  var comma = count > 0 ? ", " : "";
                  var ret;
                  if (shouldProxyThis) {
                    ret = "ret = callback.call(this, {{args}}, nodeback); break;\n";
                  } else {
                    ret = receiver === undefined ? "ret = callback({{args}}, nodeback); break;\n" : "ret = callback.call(receiver, {{args}}, nodeback); break;\n";
                  }
                  return ret.replace("{{args}}", args).replace(", ", comma);
                }
                function generateArgumentSwitchCase() {
                  var ret = "";
                  for (var i = 0; i < argumentOrder.length; ++i) {
                    ret += "case " + argumentOrder[i] + ":" + generateCallForArgumentCount(argumentOrder[i]);
                  }
                  ret += "                                                             \n\
        default:                                                             \n\
            var args = new Array(len + 1);                                   \n\
            var i = 0;                                                       \n\
            for (var i = 0; i < len; ++i) {                                  \n\
               args[i] = arguments[i];                                       \n\
            }                                                                \n\
            args[i] = nodeback;                                              \n\
            [CodeForCall]                                                    \n\
            break;                                                           \n\
        ".replace("[CodeForCall]", (shouldProxyThis ? "ret = callback.apply(this, args);\n" : "ret = callback.apply(receiver, args);\n"));
                  return ret;
                }
                var getFunctionCode = typeof callback === "string" ? ("this != null ? this['" + callback + "'] : fn") : "fn";
                var body = "'use strict';                                                \n\
        var ret = function (Parameters) {                                    \n\
            'use strict';                                                    \n\
            var len = arguments.length;                                      \n\
            var promise = new Promise(INTERNAL);                             \n\
            promise._captureStackTrace();                                    \n\
            var nodeback = nodebackForPromise(promise, " + multiArgs + ");   \n\
            var ret;                                                         \n\
            var callback = tryCatch([GetFunctionCode]);                      \n\
            switch(len) {                                                    \n\
                [CodeForSwitchCase]                                          \n\
            }                                                                \n\
            if (ret === errorObj) {                                          \n\
                promise._rejectCallback(maybeWrapAsError(ret.e), true, true);\n\
            }                                                                \n\
            if (!promise._isFateSealed()) promise._setAsyncGuaranteed();     \n\
            return promise;                                                  \n\
        };                                                                   \n\
        notEnumerableProp(ret, '__isPromisified__', true);                   \n\
        return ret;                                                          \n\
    ".replace("[CodeForSwitchCase]", generateArgumentSwitchCase()).replace("[GetFunctionCode]", getFunctionCode);
                body = body.replace("Parameters", parameterDeclaration(newParameterCount));
                return new Function("Promise", "fn", "receiver", "withAppended", "maybeWrapAsError", "nodebackForPromise", "tryCatch", "errorObj", "notEnumerableProp", "INTERNAL", body)(Promise, fn, receiver, withAppended, maybeWrapAsError, nodebackForPromise, util.tryCatch, util.errorObj, util.notEnumerableProp, INTERNAL);
              };
            }
            function makeNodePromisifiedClosure(callback, receiver, _, fn, __, multiArgs) {
              var defaultThis = (function() {
                return this;
              })();
              var method = callback;
              if (typeof method === "string") {
                callback = fn;
              }
              function promisified() {
                var _receiver = receiver;
                if (receiver === THIS)
                  _receiver = this;
                var promise = new Promise(INTERNAL);
                promise._captureStackTrace();
                var cb = typeof method === "string" && this !== defaultThis ? this[method] : callback;
                var fn = nodebackForPromise(promise, multiArgs);
                try {
                  cb.apply(_receiver, withAppended(arguments, fn));
                } catch (e) {
                  promise._rejectCallback(maybeWrapAsError(e), true, true);
                }
                if (!promise._isFateSealed())
                  promise._setAsyncGuaranteed();
                return promise;
              }
              util.notEnumerableProp(promisified, "__isPromisified__", true);
              return promisified;
            }
            var makeNodePromisified = canEvaluate ? makeNodePromisifiedEval : makeNodePromisifiedClosure;
            function promisifyAll(obj, suffix, filter, promisifier, multiArgs) {
              var suffixRegexp = new RegExp(escapeIdentRegex(suffix) + "$");
              var methods = promisifiableMethods(obj, suffix, suffixRegexp, filter);
              for (var i = 0,
                  len = methods.length; i < len; i += 2) {
                var key = methods[i];
                var fn = methods[i + 1];
                var promisifiedKey = key + suffix;
                if (promisifier === makeNodePromisified) {
                  obj[promisifiedKey] = makeNodePromisified(key, THIS, key, fn, suffix, multiArgs);
                } else {
                  var promisified = promisifier(fn, function() {
                    return makeNodePromisified(key, THIS, key, fn, suffix, multiArgs);
                  });
                  util.notEnumerableProp(promisified, "__isPromisified__", true);
                  obj[promisifiedKey] = promisified;
                }
              }
              util.toFastProperties(obj);
              return obj;
            }
            function promisify(callback, receiver, multiArgs) {
              return makeNodePromisified(callback, receiver, undefined, callback, null, multiArgs);
            }
            Promise.promisify = function(fn, options) {
              if (typeof fn !== "function") {
                throw new TypeError("expecting a function but got " + util.classString(fn));
              }
              if (isPromisified(fn)) {
                return fn;
              }
              options = Object(options);
              var receiver = options.context === undefined ? THIS : options.context;
              var multiArgs = !!options.multiArgs;
              var ret = promisify(fn, receiver, multiArgs);
              util.copyDescriptors(fn, ret, propsFilter);
              return ret;
            };
            Promise.promisifyAll = function(target, options) {
              if (typeof target !== "function" && typeof target !== "object") {
                throw new TypeError("the target of promisifyAll must be an object or a function\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
              }
              options = Object(options);
              var multiArgs = !!options.multiArgs;
              var suffix = options.suffix;
              if (typeof suffix !== "string")
                suffix = defaultSuffix;
              var filter = options.filter;
              if (typeof filter !== "function")
                filter = defaultFilter;
              var promisifier = options.promisifier;
              if (typeof promisifier !== "function")
                promisifier = makeNodePromisified;
              if (!util.isIdentifier(suffix)) {
                throw new RangeError("suffix must be a valid identifier\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
              }
              var keys = util.inheritedDataKeys(target);
              for (var i = 0; i < keys.length; ++i) {
                var value = target[keys[i]];
                if (keys[i] !== "constructor" && util.isClass(value)) {
                  promisifyAll(value.prototype, suffix, filter, promisifier, multiArgs);
                  promisifyAll(value, suffix, filter, promisifier, multiArgs);
                }
              }
              return promisifyAll(target, suffix, filter, promisifier, multiArgs);
            };
          };
        }, {
          "./errors": 12,
          "./nodeback": 20,
          "./util": 36
        }],
        25: [function(_dereq_, module, exports) {
          "use strict";
          module.exports = function(Promise, PromiseArray, tryConvertToPromise, apiRejection) {
            var util = _dereq_("./util");
            var isObject = util.isObject;
            var es5 = _dereq_("./es5");
            var Es6Map;
            if (typeof Map === "function")
              Es6Map = Map;
            var mapToEntries = (function() {
              var index = 0;
              var size = 0;
              function extractEntry(value, key) {
                this[index] = value;
                this[index + size] = key;
                index++;
              }
              return function mapToEntries(map) {
                size = map.size;
                index = 0;
                var ret = new Array(map.size * 2);
                map.forEach(extractEntry, ret);
                return ret;
              };
            })();
            var entriesToMap = function(entries) {
              var ret = new Es6Map();
              var length = entries.length / 2 | 0;
              for (var i = 0; i < length; ++i) {
                var key = entries[length + i];
                var value = entries[i];
                ret.set(key, value);
              }
              return ret;
            };
            function PropertiesPromiseArray(obj) {
              var isMap = false;
              var entries;
              if (Es6Map !== undefined && obj instanceof Es6Map) {
                entries = mapToEntries(obj);
                isMap = true;
              } else {
                var keys = es5.keys(obj);
                var len = keys.length;
                entries = new Array(len * 2);
                for (var i = 0; i < len; ++i) {
                  var key = keys[i];
                  entries[i] = obj[key];
                  entries[i + len] = key;
                }
              }
              this.constructor$(entries);
              this._isMap = isMap;
              this._init$(undefined, -3);
            }
            util.inherits(PropertiesPromiseArray, PromiseArray);
            PropertiesPromiseArray.prototype._init = function() {};
            PropertiesPromiseArray.prototype._promiseFulfilled = function(value, index) {
              this._values[index] = value;
              var totalResolved = ++this._totalResolved;
              if (totalResolved >= this._length) {
                var val;
                if (this._isMap) {
                  val = entriesToMap(this._values);
                } else {
                  val = {};
                  var keyOffset = this.length();
                  for (var i = 0,
                      len = this.length(); i < len; ++i) {
                    val[this._values[i + keyOffset]] = this._values[i];
                  }
                }
                this._resolve(val);
                return true;
              }
              return false;
            };
            PropertiesPromiseArray.prototype.shouldCopyValues = function() {
              return false;
            };
            PropertiesPromiseArray.prototype.getActualLength = function(len) {
              return len >> 1;
            };
            function props(promises) {
              var ret;
              var castValue = tryConvertToPromise(promises);
              if (!isObject(castValue)) {
                return apiRejection("cannot await properties of a non-object\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
              } else if (castValue instanceof Promise) {
                ret = castValue._then(Promise.props, undefined, undefined, undefined, undefined);
              } else {
                ret = new PropertiesPromiseArray(castValue).promise();
              }
              if (castValue instanceof Promise) {
                ret._propagateFrom(castValue, 2);
              }
              return ret;
            }
            Promise.prototype.props = function() {
              return props(this);
            };
            Promise.props = function(promises) {
              return props(promises);
            };
          };
        }, {
          "./es5": 13,
          "./util": 36
        }],
        26: [function(_dereq_, module, exports) {
          "use strict";
          function arrayMove(src, srcIndex, dst, dstIndex, len) {
            for (var j = 0; j < len; ++j) {
              dst[j + dstIndex] = src[j + srcIndex];
              src[j + srcIndex] = void 0;
            }
          }
          function Queue(capacity) {
            this._capacity = capacity;
            this._length = 0;
            this._front = 0;
          }
          Queue.prototype._willBeOverCapacity = function(size) {
            return this._capacity < size;
          };
          Queue.prototype._pushOne = function(arg) {
            var length = this.length();
            this._checkCapacity(length + 1);
            var i = (this._front + length) & (this._capacity - 1);
            this[i] = arg;
            this._length = length + 1;
          };
          Queue.prototype._unshiftOne = function(value) {
            var capacity = this._capacity;
            this._checkCapacity(this.length() + 1);
            var front = this._front;
            var i = ((((front - 1) & (capacity - 1)) ^ capacity) - capacity);
            this[i] = value;
            this._front = i;
            this._length = this.length() + 1;
          };
          Queue.prototype.unshift = function(fn, receiver, arg) {
            this._unshiftOne(arg);
            this._unshiftOne(receiver);
            this._unshiftOne(fn);
          };
          Queue.prototype.push = function(fn, receiver, arg) {
            var length = this.length() + 3;
            if (this._willBeOverCapacity(length)) {
              this._pushOne(fn);
              this._pushOne(receiver);
              this._pushOne(arg);
              return;
            }
            var j = this._front + length - 3;
            this._checkCapacity(length);
            var wrapMask = this._capacity - 1;
            this[(j + 0) & wrapMask] = fn;
            this[(j + 1) & wrapMask] = receiver;
            this[(j + 2) & wrapMask] = arg;
            this._length = length;
          };
          Queue.prototype.shift = function() {
            var front = this._front,
                ret = this[front];
            this[front] = undefined;
            this._front = (front + 1) & (this._capacity - 1);
            this._length--;
            return ret;
          };
          Queue.prototype.length = function() {
            return this._length;
          };
          Queue.prototype._checkCapacity = function(size) {
            if (this._capacity < size) {
              this._resizeTo(this._capacity << 1);
            }
          };
          Queue.prototype._resizeTo = function(capacity) {
            var oldCapacity = this._capacity;
            this._capacity = capacity;
            var front = this._front;
            var length = this._length;
            var moveItemsCount = (front + length) & (oldCapacity - 1);
            arrayMove(this, 0, this, oldCapacity, moveItemsCount);
          };
          module.exports = Queue;
        }, {}],
        27: [function(_dereq_, module, exports) {
          "use strict";
          module.exports = function(Promise, INTERNAL, tryConvertToPromise, apiRejection) {
            var util = _dereq_("./util");
            var raceLater = function(promise) {
              return promise.then(function(array) {
                return race(array, promise);
              });
            };
            function race(promises, parent) {
              var maybePromise = tryConvertToPromise(promises);
              if (maybePromise instanceof Promise) {
                return raceLater(maybePromise);
              } else {
                promises = util.asArray(promises);
                if (promises === null)
                  return apiRejection("expecting an array or an iterable object but got " + util.classString(promises));
              }
              var ret = new Promise(INTERNAL);
              if (parent !== undefined) {
                ret._propagateFrom(parent, 3);
              }
              var fulfill = ret._fulfill;
              var reject = ret._reject;
              for (var i = 0,
                  len = promises.length; i < len; ++i) {
                var val = promises[i];
                if (val === undefined && !(i in promises)) {
                  continue;
                }
                Promise.cast(val)._then(fulfill, reject, undefined, ret, null);
              }
              return ret;
            }
            Promise.race = function(promises) {
              return race(promises, undefined);
            };
            Promise.prototype.race = function() {
              return race(this, undefined);
            };
          };
        }, {"./util": 36}],
        28: [function(_dereq_, module, exports) {
          "use strict";
          module.exports = function(Promise, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug) {
            var getDomain = Promise._getDomain;
            var util = _dereq_("./util");
            var tryCatch = util.tryCatch;
            function ReductionPromiseArray(promises, fn, initialValue, _each) {
              this.constructor$(promises);
              var domain = getDomain();
              this._fn = domain === null ? fn : domain.bind(fn);
              if (initialValue !== undefined) {
                initialValue = Promise.resolve(initialValue);
                initialValue._attachCancellationCallback(this);
              }
              this._initialValue = initialValue;
              this._currentCancellable = null;
              this._eachValues = _each === INTERNAL ? [] : undefined;
              this._promise._captureStackTrace();
              this._init$(undefined, -5);
            }
            util.inherits(ReductionPromiseArray, PromiseArray);
            ReductionPromiseArray.prototype._gotAccum = function(accum) {
              if (this._eachValues !== undefined && accum !== INTERNAL) {
                this._eachValues.push(accum);
              }
            };
            ReductionPromiseArray.prototype._eachComplete = function(value) {
              this._eachValues.push(value);
              return this._eachValues;
            };
            ReductionPromiseArray.prototype._init = function() {};
            ReductionPromiseArray.prototype._resolveEmptyArray = function() {
              this._resolve(this._eachValues !== undefined ? this._eachValues : this._initialValue);
            };
            ReductionPromiseArray.prototype.shouldCopyValues = function() {
              return false;
            };
            ReductionPromiseArray.prototype._resolve = function(value) {
              this._promise._resolveCallback(value);
              this._values = null;
            };
            ReductionPromiseArray.prototype._resultCancelled = function(sender) {
              if (sender === this._initialValue)
                return this._cancel();
              if (this._isResolved())
                return;
              this._resultCancelled$();
              if (this._currentCancellable instanceof Promise) {
                this._currentCancellable.cancel();
              }
              if (this._initialValue instanceof Promise) {
                this._initialValue.cancel();
              }
            };
            ReductionPromiseArray.prototype._iterate = function(values) {
              this._values = values;
              var value;
              var i;
              var length = values.length;
              if (this._initialValue !== undefined) {
                value = this._initialValue;
                i = 0;
              } else {
                value = Promise.resolve(values[0]);
                i = 1;
              }
              this._currentCancellable = value;
              if (!value.isRejected()) {
                for (; i < length; ++i) {
                  var ctx = {
                    accum: null,
                    value: values[i],
                    index: i,
                    length: length,
                    array: this
                  };
                  value = value._then(gotAccum, undefined, undefined, ctx, undefined);
                }
              }
              if (this._eachValues !== undefined) {
                value = value._then(this._eachComplete, undefined, undefined, this, undefined);
              }
              value._then(completed, completed, undefined, value, this);
            };
            Promise.prototype.reduce = function(fn, initialValue) {
              return reduce(this, fn, initialValue, null);
            };
            Promise.reduce = function(promises, fn, initialValue, _each) {
              return reduce(promises, fn, initialValue, _each);
            };
            function completed(valueOrReason, array) {
              if (this.isFulfilled()) {
                array._resolve(valueOrReason);
              } else {
                array._reject(valueOrReason);
              }
            }
            function reduce(promises, fn, initialValue, _each) {
              if (typeof fn !== "function") {
                return apiRejection("expecting a function but got " + util.classString(fn));
              }
              var array = new ReductionPromiseArray(promises, fn, initialValue, _each);
              return array.promise();
            }
            function gotAccum(accum) {
              this.accum = accum;
              this.array._gotAccum(accum);
              var value = tryConvertToPromise(this.value, this.array._promise);
              if (value instanceof Promise) {
                this.array._currentCancellable = value;
                return value._then(gotValue, undefined, undefined, this, undefined);
              } else {
                return gotValue.call(this, value);
              }
            }
            function gotValue(value) {
              var array = this.array;
              var promise = array._promise;
              var fn = tryCatch(array._fn);
              promise._pushContext();
              var ret;
              if (array._eachValues !== undefined) {
                ret = fn.call(promise._boundValue(), value, this.index, this.length);
              } else {
                ret = fn.call(promise._boundValue(), this.accum, value, this.index, this.length);
              }
              if (ret instanceof Promise) {
                array._currentCancellable = ret;
              }
              var promiseCreated = promise._popContext();
              debug.checkForgottenReturns(ret, promiseCreated, array._eachValues !== undefined ? "Promise.each" : "Promise.reduce", promise);
              return ret;
            }
          };
        }, {"./util": 36}],
        29: [function(_dereq_, module, exports) {
          "use strict";
          var util = _dereq_("./util");
          var schedule;
          var noAsyncScheduler = function() {
            throw new Error("No async scheduler available\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
          };
          var NativePromise = util.getNativePromise();
          if (util.isNode && typeof MutationObserver === "undefined") {
            var GlobalSetImmediate = global.setImmediate;
            var ProcessNextTick = process.nextTick;
            schedule = util.isRecentNode ? function(fn) {
              GlobalSetImmediate.call(global, fn);
            } : function(fn) {
              ProcessNextTick.call(process, fn);
            };
          } else if (typeof NativePromise === "function") {
            var nativePromise = NativePromise.resolve();
            schedule = function(fn) {
              nativePromise.then(fn);
            };
          } else if ((typeof MutationObserver !== "undefined") && !(typeof window !== "undefined" && window.navigator && window.navigator.standalone)) {
            schedule = (function() {
              var div = document.createElement("div");
              var opts = {attributes: true};
              var toggleScheduled = false;
              var div2 = document.createElement("div");
              var o2 = new MutationObserver(function() {
                div.classList.toggle("foo");
                toggleScheduled = false;
              });
              o2.observe(div2, opts);
              var scheduleToggle = function() {
                if (toggleScheduled)
                  return;
                toggleScheduled = true;
                div2.classList.toggle("foo");
              };
              return function schedule(fn) {
                var o = new MutationObserver(function() {
                  o.disconnect();
                  fn();
                });
                o.observe(div, opts);
                scheduleToggle();
              };
            })();
          } else if (typeof setImmediate !== "undefined") {
            schedule = function(fn) {
              setImmediate(fn);
            };
          } else if (typeof setTimeout !== "undefined") {
            schedule = function(fn) {
              setTimeout(fn, 0);
            };
          } else {
            schedule = noAsyncScheduler;
          }
          module.exports = schedule;
        }, {"./util": 36}],
        30: [function(_dereq_, module, exports) {
          "use strict";
          module.exports = function(Promise, PromiseArray, debug) {
            var PromiseInspection = Promise.PromiseInspection;
            var util = _dereq_("./util");
            function SettledPromiseArray(values) {
              this.constructor$(values);
            }
            util.inherits(SettledPromiseArray, PromiseArray);
            SettledPromiseArray.prototype._promiseResolved = function(index, inspection) {
              this._values[index] = inspection;
              var totalResolved = ++this._totalResolved;
              if (totalResolved >= this._length) {
                this._resolve(this._values);
                return true;
              }
              return false;
            };
            SettledPromiseArray.prototype._promiseFulfilled = function(value, index) {
              var ret = new PromiseInspection();
              ret._bitField = 33554432;
              ret._settledValueField = value;
              return this._promiseResolved(index, ret);
            };
            SettledPromiseArray.prototype._promiseRejected = function(reason, index) {
              var ret = new PromiseInspection();
              ret._bitField = 16777216;
              ret._settledValueField = reason;
              return this._promiseResolved(index, ret);
            };
            Promise.settle = function(promises) {
              debug.deprecated(".settle()", ".reflect()");
              return new SettledPromiseArray(promises).promise();
            };
            Promise.prototype.settle = function() {
              return Promise.settle(this);
            };
          };
        }, {"./util": 36}],
        31: [function(_dereq_, module, exports) {
          "use strict";
          module.exports = function(Promise, PromiseArray, apiRejection) {
            var util = _dereq_("./util");
            var RangeError = _dereq_("./errors").RangeError;
            var AggregateError = _dereq_("./errors").AggregateError;
            var isArray = util.isArray;
            var CANCELLATION = {};
            function SomePromiseArray(values) {
              this.constructor$(values);
              this._howMany = 0;
              this._unwrap = false;
              this._initialized = false;
            }
            util.inherits(SomePromiseArray, PromiseArray);
            SomePromiseArray.prototype._init = function() {
              if (!this._initialized) {
                return;
              }
              if (this._howMany === 0) {
                this._resolve([]);
                return;
              }
              this._init$(undefined, -5);
              var isArrayResolved = isArray(this._values);
              if (!this._isResolved() && isArrayResolved && this._howMany > this._canPossiblyFulfill()) {
                this._reject(this._getRangeError(this.length()));
              }
            };
            SomePromiseArray.prototype.init = function() {
              this._initialized = true;
              this._init();
            };
            SomePromiseArray.prototype.setUnwrap = function() {
              this._unwrap = true;
            };
            SomePromiseArray.prototype.howMany = function() {
              return this._howMany;
            };
            SomePromiseArray.prototype.setHowMany = function(count) {
              this._howMany = count;
            };
            SomePromiseArray.prototype._promiseFulfilled = function(value) {
              this._addFulfilled(value);
              if (this._fulfilled() === this.howMany()) {
                this._values.length = this.howMany();
                if (this.howMany() === 1 && this._unwrap) {
                  this._resolve(this._values[0]);
                } else {
                  this._resolve(this._values);
                }
                return true;
              }
              return false;
            };
            SomePromiseArray.prototype._promiseRejected = function(reason) {
              this._addRejected(reason);
              return this._checkOutcome();
            };
            SomePromiseArray.prototype._promiseCancelled = function() {
              if (this._values instanceof Promise || this._values == null) {
                return this._cancel();
              }
              this._addRejected(CANCELLATION);
              return this._checkOutcome();
            };
            SomePromiseArray.prototype._checkOutcome = function() {
              if (this.howMany() > this._canPossiblyFulfill()) {
                var e = new AggregateError();
                for (var i = this.length(); i < this._values.length; ++i) {
                  if (this._values[i] !== CANCELLATION) {
                    e.push(this._values[i]);
                  }
                }
                if (e.length > 0) {
                  this._reject(e);
                } else {
                  this._cancel();
                }
                return true;
              }
              return false;
            };
            SomePromiseArray.prototype._fulfilled = function() {
              return this._totalResolved;
            };
            SomePromiseArray.prototype._rejected = function() {
              return this._values.length - this.length();
            };
            SomePromiseArray.prototype._addRejected = function(reason) {
              this._values.push(reason);
            };
            SomePromiseArray.prototype._addFulfilled = function(value) {
              this._values[this._totalResolved++] = value;
            };
            SomePromiseArray.prototype._canPossiblyFulfill = function() {
              return this.length() - this._rejected();
            };
            SomePromiseArray.prototype._getRangeError = function(count) {
              var message = "Input array must contain at least " + this._howMany + " items but contains only " + count + " items";
              return new RangeError(message);
            };
            SomePromiseArray.prototype._resolveEmptyArray = function() {
              this._reject(this._getRangeError(0));
            };
            function some(promises, howMany) {
              if ((howMany | 0) !== howMany || howMany < 0) {
                return apiRejection("expecting a positive integer\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
              }
              var ret = new SomePromiseArray(promises);
              var promise = ret.promise();
              ret.setHowMany(howMany);
              ret.init();
              return promise;
            }
            Promise.some = function(promises, howMany) {
              return some(promises, howMany);
            };
            Promise.prototype.some = function(howMany) {
              return some(this, howMany);
            };
            Promise._SomePromiseArray = SomePromiseArray;
          };
        }, {
          "./errors": 12,
          "./util": 36
        }],
        32: [function(_dereq_, module, exports) {
          "use strict";
          module.exports = function(Promise) {
            function PromiseInspection(promise) {
              if (promise !== undefined) {
                promise = promise._target();
                this._bitField = promise._bitField;
                this._settledValueField = promise._isFateSealed() ? promise._settledValue() : undefined;
              } else {
                this._bitField = 0;
                this._settledValueField = undefined;
              }
            }
            PromiseInspection.prototype._settledValue = function() {
              return this._settledValueField;
            };
            var value = PromiseInspection.prototype.value = function() {
              if (!this.isFulfilled()) {
                throw new TypeError("cannot get fulfillment value of a non-fulfilled promise\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
              }
              return this._settledValue();
            };
            var reason = PromiseInspection.prototype.error = PromiseInspection.prototype.reason = function() {
              if (!this.isRejected()) {
                throw new TypeError("cannot get rejection reason of a non-rejected promise\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
              }
              return this._settledValue();
            };
            var isFulfilled = PromiseInspection.prototype.isFulfilled = function() {
              return (this._bitField & 33554432) !== 0;
            };
            var isRejected = PromiseInspection.prototype.isRejected = function() {
              return (this._bitField & 16777216) !== 0;
            };
            var isPending = PromiseInspection.prototype.isPending = function() {
              return (this._bitField & 50397184) === 0;
            };
            var isResolved = PromiseInspection.prototype.isResolved = function() {
              return (this._bitField & 50331648) !== 0;
            };
            PromiseInspection.prototype.isCancelled = Promise.prototype._isCancelled = function() {
              return (this._bitField & 65536) === 65536;
            };
            Promise.prototype.isCancelled = function() {
              return this._target()._isCancelled();
            };
            Promise.prototype.isPending = function() {
              return isPending.call(this._target());
            };
            Promise.prototype.isRejected = function() {
              return isRejected.call(this._target());
            };
            Promise.prototype.isFulfilled = function() {
              return isFulfilled.call(this._target());
            };
            Promise.prototype.isResolved = function() {
              return isResolved.call(this._target());
            };
            Promise.prototype.value = function() {
              return value.call(this._target());
            };
            Promise.prototype.reason = function() {
              var target = this._target();
              target._unsetRejectionIsUnhandled();
              return reason.call(target);
            };
            Promise.prototype._value = function() {
              return this._settledValue();
            };
            Promise.prototype._reason = function() {
              this._unsetRejectionIsUnhandled();
              return this._settledValue();
            };
            Promise.PromiseInspection = PromiseInspection;
          };
        }, {}],
        33: [function(_dereq_, module, exports) {
          "use strict";
          module.exports = function(Promise, INTERNAL) {
            var util = _dereq_("./util");
            var errorObj = util.errorObj;
            var isObject = util.isObject;
            function tryConvertToPromise(obj, context) {
              if (isObject(obj)) {
                if (obj instanceof Promise)
                  return obj;
                var then = getThen(obj);
                if (then === errorObj) {
                  if (context)
                    context._pushContext();
                  var ret = Promise.reject(then.e);
                  if (context)
                    context._popContext();
                  return ret;
                } else if (typeof then === "function") {
                  if (isAnyBluebirdPromise(obj)) {
                    var ret = new Promise(INTERNAL);
                    obj._then(ret._fulfill, ret._reject, undefined, ret, null);
                    return ret;
                  }
                  return doThenable(obj, then, context);
                }
              }
              return obj;
            }
            function doGetThen(obj) {
              return obj.then;
            }
            function getThen(obj) {
              try {
                return doGetThen(obj);
              } catch (e) {
                errorObj.e = e;
                return errorObj;
              }
            }
            var hasProp = {}.hasOwnProperty;
            function isAnyBluebirdPromise(obj) {
              try {
                return hasProp.call(obj, "_promise0");
              } catch (e) {
                return false;
              }
            }
            function doThenable(x, then, context) {
              var promise = new Promise(INTERNAL);
              var ret = promise;
              if (context)
                context._pushContext();
              promise._captureStackTrace();
              if (context)
                context._popContext();
              var synchronous = true;
              var result = util.tryCatch(then).call(x, resolve, reject);
              synchronous = false;
              if (promise && result === errorObj) {
                promise._rejectCallback(result.e, true, true);
                promise = null;
              }
              function resolve(value) {
                if (!promise)
                  return;
                promise._resolveCallback(value);
                promise = null;
              }
              function reject(reason) {
                if (!promise)
                  return;
                promise._rejectCallback(reason, synchronous, true);
                promise = null;
              }
              return ret;
            }
            return tryConvertToPromise;
          };
        }, {"./util": 36}],
        34: [function(_dereq_, module, exports) {
          "use strict";
          module.exports = function(Promise, INTERNAL, debug) {
            var util = _dereq_("./util");
            var TimeoutError = Promise.TimeoutError;
            function HandleWrapper(handle) {
              this.handle = handle;
            }
            HandleWrapper.prototype._resultCancelled = function() {
              clearTimeout(this.handle);
            };
            var afterValue = function(value) {
              return delay(+this).thenReturn(value);
            };
            var delay = Promise.delay = function(ms, value) {
              var ret;
              var handle;
              if (value !== undefined) {
                ret = Promise.resolve(value)._then(afterValue, null, null, ms, undefined);
                if (debug.cancellation() && value instanceof Promise) {
                  ret._setOnCancel(value);
                }
              } else {
                ret = new Promise(INTERNAL);
                handle = setTimeout(function() {
                  ret._fulfill();
                }, +ms);
                if (debug.cancellation()) {
                  ret._setOnCancel(new HandleWrapper(handle));
                }
              }
              ret._setAsyncGuaranteed();
              return ret;
            };
            Promise.prototype.delay = function(ms) {
              return delay(ms, this);
            };
            var afterTimeout = function(promise, message, parent) {
              var err;
              if (typeof message !== "string") {
                if (message instanceof Error) {
                  err = message;
                } else {
                  err = new TimeoutError("operation timed out");
                }
              } else {
                err = new TimeoutError(message);
              }
              util.markAsOriginatingFromRejection(err);
              promise._attachExtraTrace(err);
              promise._reject(err);
              if (parent != null) {
                parent.cancel();
              }
            };
            function successClear(value) {
              clearTimeout(this.handle);
              return value;
            }
            function failureClear(reason) {
              clearTimeout(this.handle);
              throw reason;
            }
            Promise.prototype.timeout = function(ms, message) {
              ms = +ms;
              var ret,
                  parent;
              var handleWrapper = new HandleWrapper(setTimeout(function timeoutTimeout() {
                if (ret.isPending()) {
                  afterTimeout(ret, message, parent);
                }
              }, ms));
              if (debug.cancellation()) {
                parent = this.then();
                ret = parent._then(successClear, failureClear, undefined, handleWrapper, undefined);
                ret._setOnCancel(handleWrapper);
              } else {
                ret = this._then(successClear, failureClear, undefined, handleWrapper, undefined);
              }
              return ret;
            };
          };
        }, {"./util": 36}],
        35: [function(_dereq_, module, exports) {
          "use strict";
          module.exports = function(Promise, apiRejection, tryConvertToPromise, createContext, INTERNAL, debug) {
            var util = _dereq_("./util");
            var TypeError = _dereq_("./errors").TypeError;
            var inherits = _dereq_("./util").inherits;
            var errorObj = util.errorObj;
            var tryCatch = util.tryCatch;
            var NULL = {};
            function thrower(e) {
              setTimeout(function() {
                throw e;
              }, 0);
            }
            function castPreservingDisposable(thenable) {
              var maybePromise = tryConvertToPromise(thenable);
              if (maybePromise !== thenable && typeof thenable._isDisposable === "function" && typeof thenable._getDisposer === "function" && thenable._isDisposable()) {
                maybePromise._setDisposable(thenable._getDisposer());
              }
              return maybePromise;
            }
            function dispose(resources, inspection) {
              var i = 0;
              var len = resources.length;
              var ret = new Promise(INTERNAL);
              function iterator() {
                if (i >= len)
                  return ret._fulfill();
                var maybePromise = castPreservingDisposable(resources[i++]);
                if (maybePromise instanceof Promise && maybePromise._isDisposable()) {
                  try {
                    maybePromise = tryConvertToPromise(maybePromise._getDisposer().tryDispose(inspection), resources.promise);
                  } catch (e) {
                    return thrower(e);
                  }
                  if (maybePromise instanceof Promise) {
                    return maybePromise._then(iterator, thrower, null, null, null);
                  }
                }
                iterator();
              }
              iterator();
              return ret;
            }
            function Disposer(data, promise, context) {
              this._data = data;
              this._promise = promise;
              this._context = context;
            }
            Disposer.prototype.data = function() {
              return this._data;
            };
            Disposer.prototype.promise = function() {
              return this._promise;
            };
            Disposer.prototype.resource = function() {
              if (this.promise().isFulfilled()) {
                return this.promise().value();
              }
              return NULL;
            };
            Disposer.prototype.tryDispose = function(inspection) {
              var resource = this.resource();
              var context = this._context;
              if (context !== undefined)
                context._pushContext();
              var ret = resource !== NULL ? this.doDispose(resource, inspection) : null;
              if (context !== undefined)
                context._popContext();
              this._promise._unsetDisposable();
              this._data = null;
              return ret;
            };
            Disposer.isDisposer = function(d) {
              return (d != null && typeof d.resource === "function" && typeof d.tryDispose === "function");
            };
            function FunctionDisposer(fn, promise, context) {
              this.constructor$(fn, promise, context);
            }
            inherits(FunctionDisposer, Disposer);
            FunctionDisposer.prototype.doDispose = function(resource, inspection) {
              var fn = this.data();
              return fn.call(resource, resource, inspection);
            };
            function maybeUnwrapDisposer(value) {
              if (Disposer.isDisposer(value)) {
                this.resources[this.index]._setDisposable(value);
                return value.promise();
              }
              return value;
            }
            function ResourceList(length) {
              this.length = length;
              this.promise = null;
              this[length - 1] = null;
            }
            ResourceList.prototype._resultCancelled = function() {
              var len = this.length;
              for (var i = 0; i < len; ++i) {
                var item = this[i];
                if (item instanceof Promise) {
                  item.cancel();
                }
              }
            };
            Promise.using = function() {
              var len = arguments.length;
              if (len < 2)
                return apiRejection("you must pass at least 2 arguments to Promise.using");
              var fn = arguments[len - 1];
              if (typeof fn !== "function") {
                return apiRejection("expecting a function but got " + util.classString(fn));
              }
              var input;
              var spreadArgs = true;
              if (len === 2 && Array.isArray(arguments[0])) {
                input = arguments[0];
                len = input.length;
                spreadArgs = false;
              } else {
                input = arguments;
                len--;
              }
              var resources = new ResourceList(len);
              for (var i = 0; i < len; ++i) {
                var resource = input[i];
                if (Disposer.isDisposer(resource)) {
                  var disposer = resource;
                  resource = resource.promise();
                  resource._setDisposable(disposer);
                } else {
                  var maybePromise = tryConvertToPromise(resource);
                  if (maybePromise instanceof Promise) {
                    resource = maybePromise._then(maybeUnwrapDisposer, null, null, {
                      resources: resources,
                      index: i
                    }, undefined);
                  }
                }
                resources[i] = resource;
              }
              var reflectedResources = new Array(resources.length);
              for (var i = 0; i < reflectedResources.length; ++i) {
                reflectedResources[i] = Promise.resolve(resources[i]).reflect();
              }
              var resultPromise = Promise.all(reflectedResources).then(function(inspections) {
                for (var i = 0; i < inspections.length; ++i) {
                  var inspection = inspections[i];
                  if (inspection.isRejected()) {
                    errorObj.e = inspection.error();
                    return errorObj;
                  } else if (!inspection.isFulfilled()) {
                    resultPromise.cancel();
                    return;
                  }
                  inspections[i] = inspection.value();
                }
                promise._pushContext();
                fn = tryCatch(fn);
                var ret = spreadArgs ? fn.apply(undefined, inspections) : fn(inspections);
                var promiseCreated = promise._popContext();
                debug.checkForgottenReturns(ret, promiseCreated, "Promise.using", promise);
                return ret;
              });
              var promise = resultPromise.lastly(function() {
                var inspection = new Promise.PromiseInspection(resultPromise);
                return dispose(resources, inspection);
              });
              resources.promise = promise;
              promise._setOnCancel(resources);
              return promise;
            };
            Promise.prototype._setDisposable = function(disposer) {
              this._bitField = this._bitField | 131072;
              this._disposer = disposer;
            };
            Promise.prototype._isDisposable = function() {
              return (this._bitField & 131072) > 0;
            };
            Promise.prototype._getDisposer = function() {
              return this._disposer;
            };
            Promise.prototype._unsetDisposable = function() {
              this._bitField = this._bitField & (~131072);
              this._disposer = undefined;
            };
            Promise.prototype.disposer = function(fn) {
              if (typeof fn === "function") {
                return new FunctionDisposer(fn, this, createContext());
              }
              throw new TypeError();
            };
          };
        }, {
          "./errors": 12,
          "./util": 36
        }],
        36: [function(_dereq_, module, exports) {
          "use strict";
          var es5 = _dereq_("./es5");
          var canEvaluate = typeof navigator == "undefined";
          var errorObj = {e: {}};
          var tryCatchTarget;
          var globalObject = typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : this !== undefined ? this : null;
          function tryCatcher() {
            try {
              var target = tryCatchTarget;
              tryCatchTarget = null;
              return target.apply(this, arguments);
            } catch (e) {
              errorObj.e = e;
              return errorObj;
            }
          }
          function tryCatch(fn) {
            tryCatchTarget = fn;
            return tryCatcher;
          }
          var inherits = function(Child, Parent) {
            var hasProp = {}.hasOwnProperty;
            function T() {
              this.constructor = Child;
              this.constructor$ = Parent;
              for (var propertyName in Parent.prototype) {
                if (hasProp.call(Parent.prototype, propertyName) && propertyName.charAt(propertyName.length - 1) !== "$") {
                  this[propertyName + "$"] = Parent.prototype[propertyName];
                }
              }
            }
            T.prototype = Parent.prototype;
            Child.prototype = new T();
            return Child.prototype;
          };
          function isPrimitive(val) {
            return val == null || val === true || val === false || typeof val === "string" || typeof val === "number";
          }
          function isObject(value) {
            return typeof value === "function" || typeof value === "object" && value !== null;
          }
          function maybeWrapAsError(maybeError) {
            if (!isPrimitive(maybeError))
              return maybeError;
            return new Error(safeToString(maybeError));
          }
          function withAppended(target, appendee) {
            var len = target.length;
            var ret = new Array(len + 1);
            var i;
            for (i = 0; i < len; ++i) {
              ret[i] = target[i];
            }
            ret[i] = appendee;
            return ret;
          }
          function getDataPropertyOrDefault(obj, key, defaultValue) {
            if (es5.isES5) {
              var desc = Object.getOwnPropertyDescriptor(obj, key);
              if (desc != null) {
                return desc.get == null && desc.set == null ? desc.value : defaultValue;
              }
            } else {
              return {}.hasOwnProperty.call(obj, key) ? obj[key] : undefined;
            }
          }
          function notEnumerableProp(obj, name, value) {
            if (isPrimitive(obj))
              return obj;
            var descriptor = {
              value: value,
              configurable: true,
              enumerable: false,
              writable: true
            };
            es5.defineProperty(obj, name, descriptor);
            return obj;
          }
          function thrower(r) {
            throw r;
          }
          var inheritedDataKeys = (function() {
            var excludedPrototypes = [Array.prototype, Object.prototype, Function.prototype];
            var isExcludedProto = function(val) {
              for (var i = 0; i < excludedPrototypes.length; ++i) {
                if (excludedPrototypes[i] === val) {
                  return true;
                }
              }
              return false;
            };
            if (es5.isES5) {
              var getKeys = Object.getOwnPropertyNames;
              return function(obj) {
                var ret = [];
                var visitedKeys = Object.create(null);
                while (obj != null && !isExcludedProto(obj)) {
                  var keys;
                  try {
                    keys = getKeys(obj);
                  } catch (e) {
                    return ret;
                  }
                  for (var i = 0; i < keys.length; ++i) {
                    var key = keys[i];
                    if (visitedKeys[key])
                      continue;
                    visitedKeys[key] = true;
                    var desc = Object.getOwnPropertyDescriptor(obj, key);
                    if (desc != null && desc.get == null && desc.set == null) {
                      ret.push(key);
                    }
                  }
                  obj = es5.getPrototypeOf(obj);
                }
                return ret;
              };
            } else {
              var hasProp = {}.hasOwnProperty;
              return function(obj) {
                if (isExcludedProto(obj))
                  return [];
                var ret = [];
                enumeration: for (var key in obj) {
                  if (hasProp.call(obj, key)) {
                    ret.push(key);
                  } else {
                    for (var i = 0; i < excludedPrototypes.length; ++i) {
                      if (hasProp.call(excludedPrototypes[i], key)) {
                        continue enumeration;
                      }
                    }
                    ret.push(key);
                  }
                }
                return ret;
              };
            }
          })();
          var thisAssignmentPattern = /this\s*\.\s*\S+\s*=/;
          function isClass(fn) {
            try {
              if (typeof fn === "function") {
                var keys = es5.names(fn.prototype);
                var hasMethods = es5.isES5 && keys.length > 1;
                var hasMethodsOtherThanConstructor = keys.length > 0 && !(keys.length === 1 && keys[0] === "constructor");
                var hasThisAssignmentAndStaticMethods = thisAssignmentPattern.test(fn + "") && es5.names(fn).length > 0;
                if (hasMethods || hasMethodsOtherThanConstructor || hasThisAssignmentAndStaticMethods) {
                  return true;
                }
              }
              return false;
            } catch (e) {
              return false;
            }
          }
          function toFastProperties(obj) {
            function FakeConstructor() {}
            FakeConstructor.prototype = obj;
            var l = 8;
            while (l--)
              new FakeConstructor();
            return obj;
            eval(obj);
          }
          var rident = /^[a-z$_][a-z$_0-9]*$/i;
          function isIdentifier(str) {
            return rident.test(str);
          }
          function filledRange(count, prefix, suffix) {
            var ret = new Array(count);
            for (var i = 0; i < count; ++i) {
              ret[i] = prefix + i + suffix;
            }
            return ret;
          }
          function safeToString(obj) {
            try {
              return obj + "";
            } catch (e) {
              return "[no string representation]";
            }
          }
          function isError(obj) {
            return obj !== null && typeof obj === "object" && typeof obj.message === "string" && typeof obj.name === "string";
          }
          function markAsOriginatingFromRejection(e) {
            try {
              notEnumerableProp(e, "isOperational", true);
            } catch (ignore) {}
          }
          function originatesFromRejection(e) {
            if (e == null)
              return false;
            return ((e instanceof Error["__BluebirdErrorTypes__"].OperationalError) || e["isOperational"] === true);
          }
          function canAttachTrace(obj) {
            return isError(obj) && es5.propertyIsWritable(obj, "stack");
          }
          var ensureErrorObject = (function() {
            if (!("stack" in new Error())) {
              return function(value) {
                if (canAttachTrace(value))
                  return value;
                try {
                  throw new Error(safeToString(value));
                } catch (err) {
                  return err;
                }
              };
            } else {
              return function(value) {
                if (canAttachTrace(value))
                  return value;
                return new Error(safeToString(value));
              };
            }
          })();
          function classString(obj) {
            return {}.toString.call(obj);
          }
          function copyDescriptors(from, to, filter) {
            var keys = es5.names(from);
            for (var i = 0; i < keys.length; ++i) {
              var key = keys[i];
              if (filter(key)) {
                try {
                  es5.defineProperty(to, key, es5.getDescriptor(from, key));
                } catch (ignore) {}
              }
            }
          }
          var asArray = function(v) {
            if (es5.isArray(v)) {
              return v;
            }
            return null;
          };
          if (typeof Symbol !== "undefined" && Symbol.iterator) {
            var ArrayFrom = typeof Array.from === "function" ? function(v) {
              return Array.from(v);
            } : function(v) {
              var ret = [];
              var it = v[Symbol.iterator]();
              var itResult;
              while (!((itResult = it.next()).done)) {
                ret.push(itResult.value);
              }
              return ret;
            };
            asArray = function(v) {
              if (es5.isArray(v)) {
                return v;
              } else if (v != null && typeof v[Symbol.iterator] === "function") {
                return ArrayFrom(v);
              }
              return null;
            };
          }
          var isNode = typeof process !== "undefined" && classString(process).toLowerCase() === "[object process]";
          function env(key, def) {
            return isNode ? process.env[key] : def;
          }
          function getNativePromise() {
            if (typeof Promise === "function") {
              try {
                var promise = new Promise(function() {});
                if ({}.toString.call(promise) === "[object Promise]") {
                  return Promise;
                }
              } catch (e) {}
            }
          }
          var ret = {
            isClass: isClass,
            isIdentifier: isIdentifier,
            inheritedDataKeys: inheritedDataKeys,
            getDataPropertyOrDefault: getDataPropertyOrDefault,
            thrower: thrower,
            isArray: es5.isArray,
            asArray: asArray,
            notEnumerableProp: notEnumerableProp,
            isPrimitive: isPrimitive,
            isObject: isObject,
            isError: isError,
            canEvaluate: canEvaluate,
            errorObj: errorObj,
            tryCatch: tryCatch,
            inherits: inherits,
            withAppended: withAppended,
            maybeWrapAsError: maybeWrapAsError,
            toFastProperties: toFastProperties,
            filledRange: filledRange,
            toString: safeToString,
            canAttachTrace: canAttachTrace,
            ensureErrorObject: ensureErrorObject,
            originatesFromRejection: originatesFromRejection,
            markAsOriginatingFromRejection: markAsOriginatingFromRejection,
            classString: classString,
            copyDescriptors: copyDescriptors,
            hasDevTools: typeof chrome !== "undefined" && chrome && typeof chrome.loadTimes === "function",
            isNode: isNode,
            env: env,
            global: globalObject,
            getNativePromise: getNativePromise
          };
          ret.isRecentNode = ret.isNode && (function() {
            var version = process.versions.node.split(".").map(Number);
            return (version[0] === 0 && version[1] > 10) || (version[0] > 0);
          })();
          if (ret.isNode)
            ret.toFastProperties(process);
          try {
            throw new Error();
          } catch (e) {
            ret.lastLineError = e;
          }
          module.exports = ret;
        }, {"./es5": 13}]
      }, {}, [4])(4);
    });
    ;
    if (typeof window !== 'undefined' && window !== null) {
      window.P = window.Promise;
    } else if (typeof self !== 'undefined' && self !== null) {
      self.P = self.Promise;
    }
  })();
  return _retrieveGlobal();
});

System.registerDynamic("npm:bluebird@3.4.0.js", ["npm:bluebird@3.4.0/js/browser/bluebird.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('npm:bluebird@3.4.0/js/browser/bluebird.js');
  return module.exports;
});

System.register("lib/main.js", ["npm:jquery@2.2.4.js", "npm:browser-request@0.3.3.js", "npm:bluebird@3.4.0.js"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments)).next());
        });
    };
    var jquery_1, browser_request_1, bluebird_1;
    var request;
    function getGif(term) {
        return __awaiter(this, void 0, void 0, function* () {
            var giphyUrl = 'https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=' + term;
            try {
                var results = yield request(giphyUrl);
                var response = JSON.parse(results.response);
                if (response.data.image_mp4_url != null) {
                    var url = yield securify(response.data.image_mp4_url);
                    return url;
                }
                else {
                    return null;
                }
            }
            catch (error) {
                return null;
            }
        });
    }
    function securify(url) {
        return __awaiter(this, void 0, void 0, function* () {
            var parser = document.createElement('a');
            parser.href = url;
            parser.protocol = 'https';
            return parser.href;
        });
    }
    // inject the vide into the dom
    function updateDOM(url) {
        return __awaiter(this, void 0, void 0, function* () {
            if (url != undefined) {
                jquery_1.default(".fullscreen-bg").append('<video loop muted autoplay poster="" class="fullscreen-bg__video"><source src="' + url + '" type="video/mp4"></source></video>');
                if (jquery_1.default('.fullscreen-bg').find('video').length > 2) {
                    jquery_1.default('.fullscreen-bg').find('video').first().remove();
                }
            }
        });
    }
    // get the URL and update the dom
    function getGifAndUpdateDOM(stationName) {
        return __awaiter(this, void 0, void 0, function* () {
            var url = yield getGif(stationName);
            updateDOM(url);
        });
    }
    function bootstrap() {
        // http://usualcarrot.com/nodejs-and-websocket-simple-chat-tutorial
        // if user is running mozilla then use it's built-in WebSocket
        window.WebSocket = window.WebSocket || window.MozWebSocket;
        var connection = new WebSocket('wss://wss-cta-dtuvbhhapp.now.sh');
        connection.onopen = function () {
            console.log('connected!');
            if (window.location.hash) {
                connection.send(window.location.hash);
            }
        };
        connection.onerror = function (error) {
            console.log(error);
        };
        connection.onmessage = function (message) {
            // try to decode json (I assume that each message from server is json)
            try {
                var json = JSON.parse(message.data);
                getGifAndUpdateDOM(json.nextStaNm);
                window.location.hash = json.prdt;
                console.log(json.nextStaNm);
            }
            catch (error) {
                console.log(error);
                return;
            }
            // handle incoming message
        };
    }
    return {
        setters:[
            function (jquery_1_1) {
                jquery_1 = jquery_1_1;
            },
            function (browser_request_1_1) {
                browser_request_1 = browser_request_1_1;
            },
            function (bluebird_1_1) {
                bluebird_1 = bluebird_1_1;
            }],
        execute: function() {
            request = bluebird_1.default.promisify(browser_request_1.default);
            bootstrap();
        }
    }
});

//# sourceMappingURL=build.js.map