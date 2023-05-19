(() => {
  // output/Main/foreign.js
  var timeTaken = 0;
  function movieData() {
    var x = [];
    for (var i = 0; i < 5; i++) {
      x.push({ cast: ["asdf", "123"], title: "afg", year: 2020, rating: 7.3, reviews: { count: 10 } });
    }
    return { cast: ["asdf", "123"], title: "afg", year: 2020, rating: 7.3, reviews: { count: 10 } };
  }
  function startProfile() {
    timeTaken = performance.now();
  }
  function endProfile(x) {
    var val2 = performance.now() - timeTaken;
    console.log(x, val2);
  }

  // output/Chain/foreign.js
  function stringDecodeImpl(obj, success, failure) {
    return primitiveDecodeImpl(obj, "string", success, failure);
  }
  function intDecodeImpl(obj) {
    return (success) => {
      return (failure) => {
        return primitiveDecodeImpl(obj, "number", success, failure);
      };
    };
  }
  function numDecodeImpl(obj) {
    return (success) => {
      return (failure) => {
        return primitiveDecodeImpl(obj, "number", success, failure);
      };
    };
  }
  function primitiveDecodeImpl(obj, _type, success, failure) {
    try {
      if (typeof obj === _type) {
        return success(obj);
      } else {
        return failure("type is not " + _type);
      }
    } catch (e) {
      return failure(e.toString());
    }
  }
  function maybeDecodeImpl(obj) {
    return (failure) => {
      return (nothing) => {
        return (decodeFn) => {
          try {
            if (typeof obj === "undefined") {
              return nothing;
            }
            return decodeFn(obj);
          } catch (e) {
            return failure(e.toString());
          }
        };
      };
    };
  }
  function tryCatch(obj) {
    return (recordDecodeFn) => {
      return (success) => {
        return (failure) => {
          try {
            return success(recordDecodeFn(obj));
          } catch (e) {
            return failure(e.toString());
          }
        };
      };
    };
  }
  function shortCircuit(err) {
    throw new Error(err);
  }

  // output/Data.Function.Uncurried/foreign.js
  var runFn3 = function(fn) {
    return function(a) {
      return function(b) {
        return function(c) {
          return fn(a, b, c);
        };
      };
    };
  };

  // output/Control.Semigroupoid/index.js
  var semigroupoidFn = {
    compose: function(f) {
      return function(g) {
        return function(x) {
          return f(g(x));
        };
      };
    }
  };
  var compose = function(dict) {
    return dict.compose;
  };
  var composeFlipped = function(dictSemigroupoid) {
    var compose1 = compose(dictSemigroupoid);
    return function(f) {
      return function(g) {
        return compose1(g)(f);
      };
    };
  };

  // output/Control.Category/index.js
  var identity = function(dict) {
    return dict.identity;
  };
  var categoryFn = {
    identity: function(x) {
      return x;
    },
    Semigroupoid0: function() {
      return semigroupoidFn;
    }
  };

  // output/Data.Boolean/index.js
  var otherwise = true;

  // output/Data.Function/index.js
  var flip = function(f) {
    return function(b) {
      return function(a) {
        return f(a)(b);
      };
    };
  };
  var $$const = function(a) {
    return function(v) {
      return a;
    };
  };

  // output/Data.Unit/foreign.js
  var unit = void 0;

  // output/Type.Proxy/index.js
  var $$Proxy = /* @__PURE__ */ function() {
    function $$Proxy2() {
    }
    ;
    $$Proxy2.value = new $$Proxy2();
    return $$Proxy2;
  }();

  // output/Data.Functor/index.js
  var map = function(dict) {
    return dict.map;
  };
  var functorFn = {
    map: /* @__PURE__ */ compose(semigroupoidFn)
  };

  // output/Data.Symbol/index.js
  var reflectSymbol = function(dict) {
    return dict.reflectSymbol;
  };

  // output/Record.Unsafe/foreign.js
  var unsafeGet = function(label) {
    return function(rec) {
      return rec[label];
    };
  };

  // output/Data.Semigroup/index.js
  var append = function(dict) {
    return dict.append;
  };

  // output/Control.Applicative/index.js
  var pure = function(dict) {
    return dict.pure;
  };

  // output/Data.Bounded/foreign.js
  var topChar = String.fromCharCode(65535);
  var bottomChar = String.fromCharCode(0);
  var topNumber = Number.POSITIVE_INFINITY;
  var bottomNumber = Number.NEGATIVE_INFINITY;

  // output/Data.Show/foreign.js
  var showIntImpl = function(n) {
    return n.toString();
  };
  var showNumberImpl = function(n) {
    var str = n.toString();
    return isNaN(str + ".0") ? str : str + ".0";
  };
  var showStringImpl = function(s) {
    var l = s.length;
    return '"' + s.replace(
      /[\0-\x1F\x7F"\\]/g,
      // eslint-disable-line no-control-regex
      function(c, i) {
        switch (c) {
          case '"':
          case "\\":
            return "\\" + c;
          case "\x07":
            return "\\a";
          case "\b":
            return "\\b";
          case "\f":
            return "\\f";
          case "\n":
            return "\\n";
          case "\r":
            return "\\r";
          case "	":
            return "\\t";
          case "\v":
            return "\\v";
        }
        var k = i + 1;
        var empty3 = k < l && s[k] >= "0" && s[k] <= "9" ? "\\&" : "";
        return "\\" + c.charCodeAt(0).toString(10) + empty3;
      }
    ) + '"';
  };
  var cons = function(head) {
    return function(tail) {
      return [head].concat(tail);
    };
  };
  var intercalate = function(separator) {
    return function(xs) {
      return xs.join(separator);
    };
  };

  // output/Data.Show/index.js
  var showString = {
    show: showStringImpl
  };
  var showRecordFieldsNil = {
    showRecordFields: function(v) {
      return function(v1) {
        return [];
      };
    }
  };
  var showRecordFields = function(dict) {
    return dict.showRecordFields;
  };
  var showRecord = function() {
    return function() {
      return function(dictShowRecordFields) {
        var showRecordFields1 = showRecordFields(dictShowRecordFields);
        return {
          show: function(record) {
            var v = showRecordFields1($$Proxy.value)(record);
            if (v.length === 0) {
              return "{}";
            }
            ;
            return intercalate(" ")(["{", intercalate(", ")(v), "}"]);
          }
        };
      };
    };
  };
  var showNumber = {
    show: showNumberImpl
  };
  var showInt = {
    show: showIntImpl
  };
  var show = function(dict) {
    return dict.show;
  };
  var showRecordFieldsCons = function(dictIsSymbol) {
    var reflectSymbol2 = reflectSymbol(dictIsSymbol);
    return function(dictShowRecordFields) {
      var showRecordFields1 = showRecordFields(dictShowRecordFields);
      return function(dictShow) {
        var show1 = show(dictShow);
        return {
          showRecordFields: function(v) {
            return function(record) {
              var tail = showRecordFields1($$Proxy.value)(record);
              var key = reflectSymbol2($$Proxy.value);
              var focus = unsafeGet(key)(record);
              return cons(intercalate(": ")([key, show1(focus)]))(tail);
            };
          }
        };
      };
    };
  };

  // output/Data.Maybe/index.js
  var Nothing = /* @__PURE__ */ function() {
    function Nothing2() {
    }
    ;
    Nothing2.value = new Nothing2();
    return Nothing2;
  }();
  var Just = /* @__PURE__ */ function() {
    function Just2(value0) {
      this.value0 = value0;
    }
    ;
    Just2.create = function(value0) {
      return new Just2(value0);
    };
    return Just2;
  }();
  var showMaybe = function(dictShow) {
    var show3 = show(dictShow);
    return {
      show: function(v) {
        if (v instanceof Just) {
          return "(Just " + (show3(v.value0) + ")");
        }
        ;
        if (v instanceof Nothing) {
          return "Nothing";
        }
        ;
        throw new Error("Failed pattern match at Data.Maybe (line 223, column 1 - line 225, column 28): " + [v.constructor.name]);
      }
    };
  };
  var maybe = function(v) {
    return function(v1) {
      return function(v2) {
        if (v2 instanceof Nothing) {
          return v;
        }
        ;
        if (v2 instanceof Just) {
          return v1(v2.value0);
        }
        ;
        throw new Error("Failed pattern match at Data.Maybe (line 237, column 1 - line 237, column 51): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
      };
    };
  };

  // output/Unsafe.Coerce/foreign.js
  var unsafeCoerce2 = function(x) {
    return x;
  };

  // output/Safe.Coerce/index.js
  var coerce = function() {
    return unsafeCoerce2;
  };

  // output/Data.Newtype/index.js
  var coerce2 = /* @__PURE__ */ coerce();
  var unwrap = function() {
    return coerce2;
  };

  // output/Foreign/foreign.js
  function typeOf(value) {
    return typeof value;
  }
  function tagOf(value) {
    return Object.prototype.toString.call(value).slice(8, -1);
  }
  function isNull(value) {
    return value === null;
  }
  function isUndefined(value) {
    return value === void 0;
  }
  var isArray = Array.isArray || function(value) {
    return Object.prototype.toString.call(value) === "[object Array]";
  };

  // output/Control.Bind/index.js
  var bind = function(dict) {
    return dict.bind;
  };

  // output/Data.Either/index.js
  var Left = /* @__PURE__ */ function() {
    function Left2(value0) {
      this.value0 = value0;
    }
    ;
    Left2.create = function(value0) {
      return new Left2(value0);
    };
    return Left2;
  }();
  var Right = /* @__PURE__ */ function() {
    function Right2(value0) {
      this.value0 = value0;
    }
    ;
    Right2.create = function(value0) {
      return new Right2(value0);
    };
    return Right2;
  }();
  var functorEither = {
    map: function(f) {
      return function(m) {
        if (m instanceof Left) {
          return new Left(m.value0);
        }
        ;
        if (m instanceof Right) {
          return new Right(f(m.value0));
        }
        ;
        throw new Error("Failed pattern match at Data.Either (line 0, column 0 - line 0, column 0): " + [m.constructor.name]);
      };
    }
  };
  var map2 = /* @__PURE__ */ map(functorEither);
  var either = function(v) {
    return function(v1) {
      return function(v2) {
        if (v2 instanceof Left) {
          return v(v2.value0);
        }
        ;
        if (v2 instanceof Right) {
          return v1(v2.value0);
        }
        ;
        throw new Error("Failed pattern match at Data.Either (line 208, column 1 - line 208, column 64): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
      };
    };
  };
  var applyEither = {
    apply: function(v) {
      return function(v1) {
        if (v instanceof Left) {
          return new Left(v.value0);
        }
        ;
        if (v instanceof Right) {
          return map2(v.value0)(v1);
        }
        ;
        throw new Error("Failed pattern match at Data.Either (line 70, column 1 - line 72, column 30): " + [v.constructor.name, v1.constructor.name]);
      };
    },
    Functor0: function() {
      return functorEither;
    }
  };
  var applicativeEither = /* @__PURE__ */ function() {
    return {
      pure: Right.create,
      Apply0: function() {
        return applyEither;
      }
    };
  }();

  // output/Control.Monad/index.js
  var ap = function(dictMonad) {
    var bind3 = bind(dictMonad.Bind1());
    var pure4 = pure(dictMonad.Applicative0());
    return function(f) {
      return function(a) {
        return bind3(f)(function(f$prime) {
          return bind3(a)(function(a$prime) {
            return pure4(f$prime(a$prime));
          });
        });
      };
    };
  };

  // output/Data.Monoid/index.js
  var mempty = function(dict) {
    return dict.mempty;
  };

  // output/Control.Monad.Error.Class/index.js
  var throwError = function(dict) {
    return dict.throwError;
  };

  // output/Data.Identity/index.js
  var Identity = function(x) {
    return x;
  };
  var functorIdentity = {
    map: function(f) {
      return function(m) {
        return f(m);
      };
    }
  };
  var applyIdentity = {
    apply: function(v) {
      return function(v1) {
        return v(v1);
      };
    },
    Functor0: function() {
      return functorIdentity;
    }
  };
  var bindIdentity = {
    bind: function(v) {
      return function(f) {
        return f(v);
      };
    },
    Apply0: function() {
      return applyIdentity;
    }
  };
  var applicativeIdentity = {
    pure: Identity,
    Apply0: function() {
      return applyIdentity;
    }
  };
  var monadIdentity = {
    Applicative0: function() {
      return applicativeIdentity;
    },
    Bind1: function() {
      return bindIdentity;
    }
  };

  // output/Control.Monad.Except.Trans/index.js
  var map3 = /* @__PURE__ */ map(functorEither);
  var ExceptT = function(x) {
    return x;
  };
  var runExceptT = function(v) {
    return v;
  };
  var mapExceptT = function(f) {
    return function(v) {
      return f(v);
    };
  };
  var functorExceptT = function(dictFunctor) {
    var map12 = map(dictFunctor);
    return {
      map: function(f) {
        return mapExceptT(map12(map3(f)));
      }
    };
  };
  var monadExceptT = function(dictMonad) {
    return {
      Applicative0: function() {
        return applicativeExceptT(dictMonad);
      },
      Bind1: function() {
        return bindExceptT(dictMonad);
      }
    };
  };
  var bindExceptT = function(dictMonad) {
    var bind3 = bind(dictMonad.Bind1());
    var pure4 = pure(dictMonad.Applicative0());
    return {
      bind: function(v) {
        return function(k) {
          return bind3(v)(either(function($187) {
            return pure4(Left.create($187));
          })(function(a) {
            var v1 = k(a);
            return v1;
          }));
        };
      },
      Apply0: function() {
        return applyExceptT(dictMonad);
      }
    };
  };
  var applyExceptT = function(dictMonad) {
    var functorExceptT1 = functorExceptT(dictMonad.Bind1().Apply0().Functor0());
    return {
      apply: ap(monadExceptT(dictMonad)),
      Functor0: function() {
        return functorExceptT1;
      }
    };
  };
  var applicativeExceptT = function(dictMonad) {
    return {
      pure: function() {
        var $188 = pure(dictMonad.Applicative0());
        return function($189) {
          return ExceptT($188(Right.create($189)));
        };
      }(),
      Apply0: function() {
        return applyExceptT(dictMonad);
      }
    };
  };
  var monadThrowExceptT = function(dictMonad) {
    var monadExceptT1 = monadExceptT(dictMonad);
    return {
      throwError: function() {
        var $198 = pure(dictMonad.Applicative0());
        return function($199) {
          return ExceptT($198(Left.create($199)));
        };
      }(),
      Monad0: function() {
        return monadExceptT1;
      }
    };
  };

  // output/Data.Int/foreign.js
  var fromNumberImpl = function(just) {
    return function(nothing) {
      return function(n) {
        return (n | 0) === n ? just(n) : nothing;
      };
    };
  };

  // output/Data.Int/index.js
  var fromNumber = /* @__PURE__ */ function() {
    return fromNumberImpl(Just.create)(Nothing.value);
  }();

  // output/Control.Plus/index.js
  var empty = function(dict) {
    return dict.empty;
  };

  // output/Data.Bifunctor/index.js
  var identity2 = /* @__PURE__ */ identity(categoryFn);
  var bimap = function(dict) {
    return dict.bimap;
  };
  var lmap = function(dictBifunctor) {
    var bimap1 = bimap(dictBifunctor);
    return function(f) {
      return bimap1(f)(identity2);
    };
  };
  var bifunctorEither = {
    bimap: function(v) {
      return function(v1) {
        return function(v2) {
          if (v2 instanceof Left) {
            return new Left(v(v2.value0));
          }
          ;
          if (v2 instanceof Right) {
            return new Right(v1(v2.value0));
          }
          ;
          throw new Error("Failed pattern match at Data.Bifunctor (line 32, column 1 - line 34, column 36): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
        };
      };
    }
  };

  // output/Data.Foldable/index.js
  var foldr = function(dict) {
    return dict.foldr;
  };
  var foldl = function(dict) {
    return dict.foldl;
  };

  // output/Data.Traversable/foreign.js
  var traverseArrayImpl = function() {
    function array1(a) {
      return [a];
    }
    function array2(a) {
      return function(b) {
        return [a, b];
      };
    }
    function array3(a) {
      return function(b) {
        return function(c) {
          return [a, b, c];
        };
      };
    }
    function concat2(xs) {
      return function(ys) {
        return xs.concat(ys);
      };
    }
    return function(apply2) {
      return function(map6) {
        return function(pure4) {
          return function(f) {
            return function(array) {
              function go(bot, top2) {
                switch (top2 - bot) {
                  case 0:
                    return pure4([]);
                  case 1:
                    return map6(array1)(f(array[bot]));
                  case 2:
                    return apply2(map6(array2)(f(array[bot])))(f(array[bot + 1]));
                  case 3:
                    return apply2(apply2(map6(array3)(f(array[bot])))(f(array[bot + 1])))(f(array[bot + 2]));
                  default:
                    var pivot = bot + Math.floor((top2 - bot) / 4) * 2;
                    return apply2(map6(concat2)(go(bot, pivot)))(go(pivot, top2));
                }
              }
              return go(0, array.length);
            };
          };
        };
      };
    };
  }();

  // output/Data.NonEmpty/index.js
  var NonEmpty = /* @__PURE__ */ function() {
    function NonEmpty2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    NonEmpty2.create = function(value0) {
      return function(value1) {
        return new NonEmpty2(value0, value1);
      };
    };
    return NonEmpty2;
  }();
  var singleton2 = function(dictPlus) {
    var empty3 = empty(dictPlus);
    return function(a) {
      return new NonEmpty(a, empty3);
    };
  };
  var functorNonEmpty = function(dictFunctor) {
    var map23 = map(dictFunctor);
    return {
      map: function(f) {
        return function(m) {
          return new NonEmpty(f(m.value0), map23(f)(m.value1));
        };
      }
    };
  };

  // output/Data.List.Types/index.js
  var Nil = /* @__PURE__ */ function() {
    function Nil2() {
    }
    ;
    Nil2.value = new Nil2();
    return Nil2;
  }();
  var Cons = /* @__PURE__ */ function() {
    function Cons2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Cons2.create = function(value0) {
      return function(value1) {
        return new Cons2(value0, value1);
      };
    };
    return Cons2;
  }();
  var NonEmptyList = function(x) {
    return x;
  };
  var listMap = function(f) {
    var chunkedRevMap = function($copy_v) {
      return function($copy_v1) {
        var $tco_var_v = $copy_v;
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(v, v1) {
          if (v1 instanceof Cons && (v1.value1 instanceof Cons && v1.value1.value1 instanceof Cons)) {
            $tco_var_v = new Cons(v1, v);
            $copy_v1 = v1.value1.value1.value1;
            return;
          }
          ;
          var unrolledMap = function(v2) {
            if (v2 instanceof Cons && (v2.value1 instanceof Cons && v2.value1.value1 instanceof Nil)) {
              return new Cons(f(v2.value0), new Cons(f(v2.value1.value0), Nil.value));
            }
            ;
            if (v2 instanceof Cons && v2.value1 instanceof Nil) {
              return new Cons(f(v2.value0), Nil.value);
            }
            ;
            return Nil.value;
          };
          var reverseUnrolledMap = function($copy_v2) {
            return function($copy_v3) {
              var $tco_var_v2 = $copy_v2;
              var $tco_done1 = false;
              var $tco_result2;
              function $tco_loop2(v2, v3) {
                if (v2 instanceof Cons && (v2.value0 instanceof Cons && (v2.value0.value1 instanceof Cons && v2.value0.value1.value1 instanceof Cons))) {
                  $tco_var_v2 = v2.value1;
                  $copy_v3 = new Cons(f(v2.value0.value0), new Cons(f(v2.value0.value1.value0), new Cons(f(v2.value0.value1.value1.value0), v3)));
                  return;
                }
                ;
                $tco_done1 = true;
                return v3;
              }
              ;
              while (!$tco_done1) {
                $tco_result2 = $tco_loop2($tco_var_v2, $copy_v3);
              }
              ;
              return $tco_result2;
            };
          };
          $tco_done = true;
          return reverseUnrolledMap(v)(unrolledMap(v1));
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($tco_var_v, $copy_v1);
        }
        ;
        return $tco_result;
      };
    };
    return chunkedRevMap(Nil.value);
  };
  var functorList = {
    map: listMap
  };
  var functorNonEmptyList = /* @__PURE__ */ functorNonEmpty(functorList);
  var foldableList = {
    foldr: function(f) {
      return function(b) {
        var rev = function() {
          var go = function($copy_v) {
            return function($copy_v1) {
              var $tco_var_v = $copy_v;
              var $tco_done = false;
              var $tco_result;
              function $tco_loop(v, v1) {
                if (v1 instanceof Nil) {
                  $tco_done = true;
                  return v;
                }
                ;
                if (v1 instanceof Cons) {
                  $tco_var_v = new Cons(v1.value0, v);
                  $copy_v1 = v1.value1;
                  return;
                }
                ;
                throw new Error("Failed pattern match at Data.List.Types (line 107, column 7 - line 107, column 23): " + [v.constructor.name, v1.constructor.name]);
              }
              ;
              while (!$tco_done) {
                $tco_result = $tco_loop($tco_var_v, $copy_v1);
              }
              ;
              return $tco_result;
            };
          };
          return go(Nil.value);
        }();
        var $284 = foldl(foldableList)(flip(f))(b);
        return function($285) {
          return $284(rev($285));
        };
      };
    },
    foldl: function(f) {
      var go = function($copy_b) {
        return function($copy_v) {
          var $tco_var_b = $copy_b;
          var $tco_done1 = false;
          var $tco_result;
          function $tco_loop(b, v) {
            if (v instanceof Nil) {
              $tco_done1 = true;
              return b;
            }
            ;
            if (v instanceof Cons) {
              $tco_var_b = f(b)(v.value0);
              $copy_v = v.value1;
              return;
            }
            ;
            throw new Error("Failed pattern match at Data.List.Types (line 111, column 12 - line 113, column 30): " + [v.constructor.name]);
          }
          ;
          while (!$tco_done1) {
            $tco_result = $tco_loop($tco_var_b, $copy_v);
          }
          ;
          return $tco_result;
        };
      };
      return go;
    },
    foldMap: function(dictMonoid) {
      var append2 = append(dictMonoid.Semigroup0());
      var mempty2 = mempty(dictMonoid);
      return function(f) {
        return foldl(foldableList)(function(acc) {
          var $286 = append2(acc);
          return function($287) {
            return $286(f($287));
          };
        })(mempty2);
      };
    }
  };
  var foldr2 = /* @__PURE__ */ foldr(foldableList);
  var semigroupList = {
    append: function(xs) {
      return function(ys) {
        return foldr2(Cons.create)(ys)(xs);
      };
    }
  };
  var append1 = /* @__PURE__ */ append(semigroupList);
  var altList = {
    alt: append1,
    Functor0: function() {
      return functorList;
    }
  };
  var plusList = /* @__PURE__ */ function() {
    return {
      empty: Nil.value,
      Alt0: function() {
        return altList;
      }
    };
  }();

  // output/Data.List.NonEmpty/index.js
  var singleton3 = /* @__PURE__ */ function() {
    var $200 = singleton2(plusList);
    return function($201) {
      return NonEmptyList($200($201));
    };
  }();

  // output/Foreign/index.js
  var pure2 = /* @__PURE__ */ pure(applicativeEither);
  var TypeMismatch = /* @__PURE__ */ function() {
    function TypeMismatch2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    TypeMismatch2.create = function(value0) {
      return function(value1) {
        return new TypeMismatch2(value0, value1);
      };
    };
    return TypeMismatch2;
  }();
  var ErrorAtProperty = /* @__PURE__ */ function() {
    function ErrorAtProperty2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    ErrorAtProperty2.create = function(value0) {
      return function(value1) {
        return new ErrorAtProperty2(value0, value1);
      };
    };
    return ErrorAtProperty2;
  }();
  var unsafeFromForeign = unsafeCoerce2;
  var fail = function(dictMonad) {
    var $153 = throwError(monadThrowExceptT(dictMonad));
    return function($154) {
      return $153(singleton3($154));
    };
  };
  var unsafeReadTagged = function(dictMonad) {
    var pure12 = pure(applicativeExceptT(dictMonad));
    var fail1 = fail(dictMonad);
    return function(tag) {
      return function(value) {
        if (tagOf(value) === tag) {
          return pure12(unsafeFromForeign(value));
        }
        ;
        if (otherwise) {
          return fail1(new TypeMismatch(tag, tagOf(value)));
        }
        ;
        throw new Error("Failed pattern match at Foreign (line 123, column 1 - line 123, column 104): " + [tag.constructor.name, value.constructor.name]);
      };
    };
  };
  var readNumber = function(dictMonad) {
    return unsafeReadTagged(dictMonad)("Number");
  };
  var readInt = function(dictMonad) {
    var map6 = map(dictMonad.Bind1().Apply0().Functor0());
    var readNumber1 = readNumber(dictMonad);
    return function(value) {
      var error3 = new Left(singleton3(new TypeMismatch("Int", tagOf(value))));
      var fromNumber2 = function() {
        var $155 = maybe(error3)(pure2);
        return function($156) {
          return $155(fromNumber($156));
        };
      }();
      return mapExceptT(map6(either($$const(error3))(fromNumber2)))(readNumber1(value));
    };
  };
  var readString = function(dictMonad) {
    return unsafeReadTagged(dictMonad)("String");
  };

  // output/Foreign.Object/foreign.js
  function toArrayWithKey(f) {
    return function(m) {
      var r = [];
      for (var k in m) {
        if (hasOwnProperty.call(m, k)) {
          r.push(f(k)(m[k]));
        }
      }
      return r;
    };
  }
  var keys = Object.keys || toArrayWithKey(function(k) {
    return function() {
      return k;
    };
  });

  // output/Data.Array/foreign.js
  var replicateFill = function(count) {
    return function(value) {
      if (count < 1) {
        return [];
      }
      var result = new Array(count);
      return result.fill(value);
    };
  };
  var replicatePolyfill = function(count) {
    return function(value) {
      var result = [];
      var n = 0;
      for (var i = 0; i < count; i++) {
        result[n++] = value;
      }
      return result;
    };
  };
  var replicate = typeof Array.prototype.fill === "function" ? replicateFill : replicatePolyfill;
  var fromFoldableImpl = function() {
    function Cons2(head, tail) {
      this.head = head;
      this.tail = tail;
    }
    var emptyList = {};
    function curryCons(head) {
      return function(tail) {
        return new Cons2(head, tail);
      };
    }
    function listToArray(list) {
      var result = [];
      var count = 0;
      var xs = list;
      while (xs !== emptyList) {
        result[count++] = xs.head;
        xs = xs.tail;
      }
      return result;
    }
    return function(foldr3) {
      return function(xs) {
        return listToArray(foldr3(curryCons)(emptyList)(xs));
      };
    };
  }();
  var sortByImpl = function() {
    function mergeFromTo(compare2, fromOrdering, xs1, xs2, from, to) {
      var mid;
      var i;
      var j;
      var k;
      var x;
      var y;
      var c;
      mid = from + (to - from >> 1);
      if (mid - from > 1)
        mergeFromTo(compare2, fromOrdering, xs2, xs1, from, mid);
      if (to - mid > 1)
        mergeFromTo(compare2, fromOrdering, xs2, xs1, mid, to);
      i = from;
      j = mid;
      k = from;
      while (i < mid && j < to) {
        x = xs2[i];
        y = xs2[j];
        c = fromOrdering(compare2(x)(y));
        if (c > 0) {
          xs1[k++] = y;
          ++j;
        } else {
          xs1[k++] = x;
          ++i;
        }
      }
      while (i < mid) {
        xs1[k++] = xs2[i++];
      }
      while (j < to) {
        xs1[k++] = xs2[j++];
      }
    }
    return function(compare2) {
      return function(fromOrdering) {
        return function(xs) {
          var out;
          if (xs.length < 2)
            return xs;
          out = xs.slice(0);
          mergeFromTo(compare2, fromOrdering, out, xs.slice(0), 0, xs.length);
          return out;
        };
      };
    };
  }();

  // output/Data.Array.ST/foreign.js
  var sortByImpl2 = function() {
    function mergeFromTo(compare2, fromOrdering, xs1, xs2, from, to) {
      var mid;
      var i;
      var j;
      var k;
      var x;
      var y;
      var c;
      mid = from + (to - from >> 1);
      if (mid - from > 1)
        mergeFromTo(compare2, fromOrdering, xs2, xs1, from, mid);
      if (to - mid > 1)
        mergeFromTo(compare2, fromOrdering, xs2, xs1, mid, to);
      i = from;
      j = mid;
      k = from;
      while (i < mid && j < to) {
        x = xs2[i];
        y = xs2[j];
        c = fromOrdering(compare2(x)(y));
        if (c > 0) {
          xs1[k++] = y;
          ++j;
        } else {
          xs1[k++] = x;
          ++i;
        }
      }
      while (i < mid) {
        xs1[k++] = xs2[i++];
      }
      while (j < to) {
        xs1[k++] = xs2[j++];
      }
    }
    return function(compare2) {
      return function(fromOrdering) {
        return function(xs) {
          return function() {
            if (xs.length < 2)
              return xs;
            mergeFromTo(compare2, fromOrdering, xs, xs.slice(0), 0, xs.length);
            return xs;
          };
        };
      };
    };
  }();

  // output/LiteDecode.Decode/foreign.js
  function lookupVal(fn) {
    return (key) => {
      return fn[key];
    };
  }
  function unsafeInsertImpl(key) {
    return (val2) => {
      return (rec) => {
        rec[key] = val2;
        return rec;
      };
    };
  }

  // output/Control.Monad.Except/index.js
  var unwrap2 = /* @__PURE__ */ unwrap();
  var runExcept = function($3) {
    return unwrap2(runExceptT($3));
  };
  var mapExcept = function(f) {
    return mapExceptT(function($4) {
      return Identity(f(unwrap2($4)));
    });
  };

  // output/Foreign.Index/foreign.js
  function unsafeReadPropImpl(f, s, key, value) {
    return value == null ? f : s(value[key]);
  }
  function unsafeHasOwnProperty(prop, value) {
    return Object.prototype.hasOwnProperty.call(value, prop);
  }
  function unsafeHasProperty(prop, value) {
    return prop in value;
  }

  // output/Foreign.Index/index.js
  var unsafeReadProp = function(dictMonad) {
    var fail2 = fail(dictMonad);
    var pure4 = pure(applicativeExceptT(dictMonad));
    return function(k) {
      return function(value) {
        return unsafeReadPropImpl(fail2(new TypeMismatch("object", typeOf(value))), pure4, k, value);
      };
    };
  };
  var readProp = function(dictMonad) {
    return unsafeReadProp(dictMonad);
  };
  var index2 = function(dict) {
    return dict.index;
  };
  var hasPropertyImpl = function(v) {
    return function(v1) {
      if (isNull(v1)) {
        return false;
      }
      ;
      if (isUndefined(v1)) {
        return false;
      }
      ;
      if (typeOf(v1) === "object" || typeOf(v1) === "function") {
        return unsafeHasProperty(v, v1);
      }
      ;
      return false;
    };
  };
  var hasOwnPropertyImpl = function(v) {
    return function(v1) {
      if (isNull(v1)) {
        return false;
      }
      ;
      if (isUndefined(v1)) {
        return false;
      }
      ;
      if (typeOf(v1) === "object" || typeOf(v1) === "function") {
        return unsafeHasOwnProperty(v, v1);
      }
      ;
      return false;
    };
  };
  var indexString = function(dictMonad) {
    return {
      index: flip(readProp(dictMonad)),
      hasProperty: hasPropertyImpl,
      hasOwnProperty: hasOwnPropertyImpl,
      errorAt: ErrorAtProperty.create
    };
  };

  // output/Foreign.NullOrUndefined/index.js
  var pure3 = /* @__PURE__ */ pure(/* @__PURE__ */ applicativeExceptT(monadIdentity));
  var map4 = /* @__PURE__ */ map(/* @__PURE__ */ functorExceptT(functorIdentity));
  var readNullOrUndefined = function(v) {
    return function(v1) {
      if (isNull(v1) || isUndefined(v1)) {
        return pure3(Nothing.value);
      }
      ;
      return map4(Just.create)(v(v1));
    };
  };

  // output/Record.Builder/foreign.js
  function copyRecord(rec) {
    var copy = {};
    for (var key in rec) {
      if ({}.hasOwnProperty.call(rec, key)) {
        copy[key] = rec[key];
      }
    }
    return copy;
  }
  function unsafeInsert(l) {
    return function(a) {
      return function(rec) {
        rec[l] = a;
        return rec;
      };
    };
  }

  // output/Record.Builder/index.js
  var semigroupoidBuilder = semigroupoidFn;
  var insert = function() {
    return function() {
      return function(dictIsSymbol) {
        var reflectSymbol2 = reflectSymbol(dictIsSymbol);
        return function(l) {
          return function(a) {
            return function(r1) {
              return unsafeInsert(reflectSymbol2(l))(a)(r1);
            };
          };
        };
      };
    };
  };
  var categoryBuilder = categoryFn;
  var build = function(v) {
    return function(r1) {
      return v(copyRecord(r1));
    };
  };

  // output/Foreign.Generic.Class/index.js
  var applicativeExceptT2 = /* @__PURE__ */ applicativeExceptT(monadIdentity);
  var pure1 = /* @__PURE__ */ pure(applicativeExceptT2);
  var readString2 = /* @__PURE__ */ readString(monadIdentity);
  var identity3 = /* @__PURE__ */ identity(categoryFn);
  var bindExceptT2 = /* @__PURE__ */ bindExceptT(monadIdentity);
  var bind2 = /* @__PURE__ */ bind(bindExceptT2);
  var lmap2 = /* @__PURE__ */ lmap(bifunctorEither);
  var map5 = /* @__PURE__ */ map(functorNonEmptyList);
  var map1 = /* @__PURE__ */ map(functorFn);
  var map22 = /* @__PURE__ */ map(/* @__PURE__ */ functorExceptT(functorIdentity));
  var identity1 = /* @__PURE__ */ identity(categoryBuilder);
  var index3 = /* @__PURE__ */ index2(/* @__PURE__ */ indexString(monadIdentity));
  var composeFlipped2 = /* @__PURE__ */ composeFlipped(semigroupoidBuilder);
  var insert3 = /* @__PURE__ */ insert()();
  var TaggedObject = /* @__PURE__ */ function() {
    function TaggedObject2(value0) {
      this.value0 = value0;
    }
    ;
    TaggedObject2.create = function(value0) {
      return new TaggedObject2(value0);
    };
    return TaggedObject2;
  }();
  var stringDecode = {
    decode: readString2
  };
  var numberDecode = {
    decode: /* @__PURE__ */ readNumber(monadIdentity)
  };
  var intDecode = {
    decode: /* @__PURE__ */ readInt(monadIdentity)
  };
  var defaultOptions = /* @__PURE__ */ function() {
    return {
      sumEncoding: new TaggedObject({
        tagFieldName: "tag",
        contentsFieldName: "contents",
        constructorTagTransform: identity3
      }),
      unwrapSingleConstructors: false,
      unwrapSingleArguments: true,
      fieldTransform: identity3
    };
  }();
  var decodeWithOptions = function(dict) {
    return dict.decodeWithOptions;
  };
  var decodeRecordWithOptions = function(dict) {
    return dict.decodeRecordWithOptions;
  };
  var decodeWithOptionsRecord = function() {
    return function(dictDecodeRecord) {
      var decodeRecordWithOptions1 = decodeRecordWithOptions(dictDecodeRecord);
      return {
        decodeWithOptions: function(opts) {
          return map1(map22(flip(build)({})))(decodeRecordWithOptions1($$Proxy.value)(opts));
        }
      };
    };
  };
  var decodeWithOptionsRecord1 = /* @__PURE__ */ decodeWithOptionsRecord();
  var recordDecode = function() {
    return function(dictDecodeRecord) {
      return {
        decode: decodeWithOptions(decodeWithOptionsRecord1(dictDecodeRecord))(defaultOptions)
      };
    };
  };
  var decodeRecordNil = {
    decodeRecordWithOptions: function(v) {
      return function(v1) {
        return function(v2) {
          return pure1(identity1);
        };
      };
    }
  };
  var decodeRecordCons = function() {
    return function(dictDecodeRecord) {
      var decodeRecordWithOptions1 = decodeRecordWithOptions(dictDecodeRecord);
      return function(dictIsSymbol) {
        var reflectSymbol2 = reflectSymbol(dictIsSymbol);
        var insert1 = insert3(dictIsSymbol);
        return function(dictDecodeWithOptions) {
          var decodeWithOptions1 = decodeWithOptions(dictDecodeWithOptions);
          return function() {
            return {
              decodeRecordWithOptions: function(v) {
                return function(opts) {
                  return function(f) {
                    return bind2(decodeRecordWithOptions1($$Proxy.value)(opts)(f))(function(builder) {
                      var l = reflectSymbol2($$Proxy.value);
                      var l_transformed = opts.fieldTransform(l);
                      return bind2(index3(f)(l_transformed))(function(f_) {
                        return bind2(mapExcept(lmap2(map5(ErrorAtProperty.create(l_transformed))))(decodeWithOptions1(opts)(f_)))(function(a) {
                          return pure1(composeFlipped2(builder)(insert1($$Proxy.value)(a)));
                        });
                      });
                    });
                  };
                };
              }
            };
          };
        };
      };
    };
  };
  var decode = function(dict) {
    return dict.decode;
  };
  var decodeWithOptionsOther = function(dictDecode) {
    var decode1 = decode(dictDecode);
    return {
      decodeWithOptions: function(v) {
        return decode1;
      }
    };
  };
  var maybeDecode = function(dictDecode) {
    return {
      decode: readNullOrUndefined(decode(dictDecode))
    };
  };

  // output/Main.DecodeError/index.js
  var DecodeErr = /* @__PURE__ */ function() {
    function DecodeErr2(value0) {
      this.value0 = value0;
    }
    ;
    DecodeErr2.create = function(value0) {
      return new DecodeErr2(value0);
    };
    return DecodeErr2;
  }();
  var Val = /* @__PURE__ */ function() {
    function Val2(value0) {
      this.value0 = value0;
    }
    ;
    Val2.create = function(value0) {
      return new Val2(value0);
    };
    return Val2;
  }();

  // output/LiteDecode.Decode/index.js
  var unsafeInsert2 = function(dictIsSymbol) {
    var reflectSymbol2 = reflectSymbol(dictIsSymbol);
    return function() {
      return function() {
        return function(l) {
          return function(a) {
            return function(r) {
              return unsafeInsertImpl(reflectSymbol2(l))(a)(r);
            };
          };
        };
      };
    };
  };

  // output/Chain/index.js
  var stringDecode2 = {
    chainDecode: /* @__PURE__ */ runFn3(stringDecodeImpl)
  };
  var rowSuccess = function(x) {
    return x;
  };
  var recordDecode2 = function(dict) {
    return dict.recordDecode;
  };
  var recordDecodeChain = function(dictRecordDecode) {
    var recordDecode1 = recordDecode2(dictRecordDecode);
    return function() {
      return {
        chainDecode: function(obj) {
          return function(success) {
            return function(failure) {
              return tryCatch(obj)(recordDecode1($$Proxy.value))(success)(failure);
            };
          };
        }
      };
    };
  };
  var numberDecode2 = {
    chainDecode: numDecodeImpl
  };
  var intDecode2 = {
    chainDecode: intDecodeImpl
  };
  var emptyRecordDecode = {
    recordDecode: function(v) {
      return function(obj) {
        return {};
      };
    }
  };
  var chainDecode = function(dict) {
    return dict.chainDecode;
  };
  var decodeForeign = function(dictChainDecode) {
    var chainDecode1 = chainDecode(dictChainDecode);
    return function(obj) {
      return chainDecode1(obj)(Val.create)(DecodeErr.create);
    };
  };
  var maybeDecode2 = function(dictChainDecode) {
    var chainDecode1 = chainDecode(dictChainDecode);
    return {
      chainDecode: function(obj) {
        return function(success) {
          return function(failure) {
            var decodeVal = function(x) {
              return chainDecode1(x)(function($42) {
                return success(Just.create($42));
              })(failure);
            };
            return maybeDecodeImpl(obj)(failure)(Nothing.value)(decodeVal);
          };
        };
      }
    };
  };
  var nonEmptyRecordDecode = function(dictChainDecode) {
    var chainDecode1 = chainDecode(dictChainDecode);
    return function(dictRecordDecode) {
      var recordDecode1 = recordDecode2(dictRecordDecode);
      return function(dictIsSymbol) {
        var reflectSymbol2 = reflectSymbol(dictIsSymbol);
        var unsafeInsert3 = unsafeInsert2(dictIsSymbol)()();
        return function() {
          return function() {
            return {
              recordDecode: function(v) {
                return function(obj) {
                  var val2 = lookupVal(obj)(reflectSymbol2($$Proxy.value));
                  return unsafeInsert3($$Proxy.value)(chainDecode1(val2)(rowSuccess)(shortCircuit))(recordDecode1($$Proxy.value)(obj));
                };
              }
            };
          };
        };
      };
    };
  };

  // output/Effect.Console/foreign.js
  var log2 = function(s) {
    return function() {
      console.log(s);
    };
  };

  // output/Main/index.js
  var decodeRecordCons2 = /* @__PURE__ */ decodeRecordCons();
  var decodeRecordCons1 = /* @__PURE__ */ decodeRecordCons2(decodeRecordNil);
  var yearIsSymbol = {
    reflectSymbol: function() {
      return "year";
    }
  };
  var decodeWithOptionsOther2 = /* @__PURE__ */ decodeWithOptionsOther(intDecode);
  var titleIsSymbol = {
    reflectSymbol: function() {
      return "title";
    }
  };
  var reviewsIsSymbol = {
    reflectSymbol: function() {
      return "reviews";
    }
  };
  var countIsSymbol = {
    reflectSymbol: function() {
      return "count";
    }
  };
  var ratingIsSymbol = {
    reflectSymbol: function() {
      return "rating";
    }
  };
  var idIsSymbol = {
    reflectSymbol: function() {
      return "id";
    }
  };
  var showRecord2 = /* @__PURE__ */ showRecord()();
  var show2 = /* @__PURE__ */ show(/* @__PURE__ */ showRecord2(/* @__PURE__ */ showRecordFieldsCons(idIsSymbol)(/* @__PURE__ */ showRecordFieldsCons(ratingIsSymbol)(/* @__PURE__ */ showRecordFieldsCons(reviewsIsSymbol)(/* @__PURE__ */ showRecordFieldsCons(titleIsSymbol)(/* @__PURE__ */ showRecordFieldsCons(yearIsSymbol)(showRecordFieldsNil)(showInt))(showString))(/* @__PURE__ */ showRecord2(/* @__PURE__ */ showRecordFieldsCons(countIsSymbol)(showRecordFieldsNil)(showInt))))(showNumber))(/* @__PURE__ */ showMaybe(showInt))));
  var nonEmptyRecordDecode2 = /* @__PURE__ */ nonEmptyRecordDecode(intDecode2)(emptyRecordDecode);
  var getMovieData$prime = function(dictDecode) {
    var v = startProfile(unit);
    var val1 = decode(dictDecode)(movieData(unit));
    var v1 = endProfile("foreign decode");
    return val1;
  };
  var val$prime = /* @__PURE__ */ function() {
    var v = runExcept(getMovieData$prime(recordDecode()(decodeRecordCons2(decodeRecordCons2(decodeRecordCons2(decodeRecordCons2(decodeRecordCons1(yearIsSymbol)(decodeWithOptionsOther2)())(titleIsSymbol)(decodeWithOptionsOther(stringDecode))())(reviewsIsSymbol)(decodeWithOptionsRecord()(decodeRecordCons1(countIsSymbol)(decodeWithOptionsOther2)()))())(ratingIsSymbol)(decodeWithOptionsOther(numberDecode))())(idIsSymbol)(decodeWithOptionsOther(maybeDecode(intDecode)))())));
    if (v instanceof Left) {
      return "";
    }
    ;
    if (v instanceof Right) {
      return show2(v.value0);
    }
    ;
    throw new Error("Failed pattern match at Main (line 55, column 5 - line 57, column 39): " + [v.constructor.name]);
  }();
  var getMovieData = function(dictChainDecode) {
    var v = startProfile(unit);
    var val1 = decodeForeign(dictChainDecode)(movieData(unit));
    var v1 = endProfile("new decode    ");
    return val1;
  };
  var val = /* @__PURE__ */ function() {
    var v = getMovieData(recordDecodeChain(nonEmptyRecordDecode(maybeDecode2(intDecode2))(nonEmptyRecordDecode(numberDecode2)(nonEmptyRecordDecode(recordDecodeChain(nonEmptyRecordDecode2(countIsSymbol)()())())(nonEmptyRecordDecode(stringDecode2)(nonEmptyRecordDecode2(yearIsSymbol)()())(titleIsSymbol)()())(reviewsIsSymbol)()())(ratingIsSymbol)()())(idIsSymbol)()())());
    if (v instanceof DecodeErr) {
      return v.value0;
    }
    ;
    if (v instanceof Val) {
      return show2(v.value0);
    }
    ;
    throw new Error("Failed pattern match at Main (line 49, column 5 - line 51, column 37): " + [v.constructor.name]);
  }();
  var main = /* @__PURE__ */ function() {
    return log2(val + ("\n" + val$prime));
  }();

  // <stdin>
  main();
})();
