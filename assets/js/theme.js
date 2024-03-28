"use strict";

var _excluded = ["endValue"];

function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}

function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        if (i % 2) {
            ownKeys(Object(source), true).forEach(function(key) {
                _defineProperty(target, key, source[key]);
            });
        } else if (Object.getOwnPropertyDescriptors) {
            Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        } else {
            ownKeys(Object(source)).forEach(function(key) {
                Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
            });
        }
    }
    return target;
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}

function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};
    var target = _objectWithoutPropertiesLoose(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
        }
    }
    return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}

/* -------------------------------------------------------------------------- */

/*                                    Utils                                   */

/* -------------------------------------------------------------------------- */
var docReady = function docReady(fn) {
    // see if DOM is already available
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fn);
    } else {
        setTimeout(fn, 1);
    }
};

var isRTL = function isRTL() {
    return document.querySelector('html').getAttribute('dir') === 'rtl';
};

var resize = function resize(fn) {
    return window.addEventListener('resize', fn);
};

var isIterableArray = function isIterableArray(array) {
    return Array.isArray(array) && !!array.length;
};

var camelize = function camelize(str) {
    var text = str.replace(/[-_\s.]+(.)?/g, function(_, c) {
        return c ? c.toUpperCase() : '';
    });
    return "".concat(text.substr(0, 1).toLowerCase()).concat(text.substr(1));
};

var getData = function getData(el, data) {
    try {
        return JSON.parse(el.dataset[camelize(data)]);
    } catch (e) {
        return el.dataset[camelize(data)];
    }
};
/* ----------------------------- Colors function ---------------------------- */


var hexToRgb = function hexToRgb(hexValue) {
    var hex;
    hexValue.indexOf('#') === 0 ? hex = hexValue.substring(1) : hex = hexValue; // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")

    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    }));
    return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
};

var rgbaColor = function rgbaColor() {
    var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '#fff';
    var alpha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.5;
    return "rgba(".concat(hexToRgb(color), ", ").concat(alpha, ")");
};
/* --------------------------------- Colors --------------------------------- */


var getColor = function getColor(name) {
    var dom = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.documentElement;
    return getComputedStyle(dom).getPropertyValue("--falcon-".concat(name)).trim();
};

var getColors = function getColors(dom) {
    return {
        primary: getColor('primary', dom),
        secondary: getColor('secondary', dom),
        success: getColor('success', dom),
        info: getColor('info', dom),
        warning: getColor('warning', dom),
        danger: getColor('danger', dom),
        light: getColor('light', dom),
        dark: getColor('dark', dom)
    };
};

var getSoftColors = function getSoftColors(dom) {
    return {
        primary: getColor('soft-primary', dom),
        secondary: getColor('soft-secondary', dom),
        success: getColor('soft-success', dom),
        info: getColor('soft-info', dom),
        warning: getColor('soft-warning', dom),
        danger: getColor('soft-danger', dom),
        light: getColor('soft-light', dom),
        dark: getColor('soft-dark', dom)
    };
};

var getGrays = function getGrays(dom) {
    return {
        white: getColor('white', dom),
        100: getColor('100', dom),
        200: getColor('200', dom),
        300: getColor('300', dom),
        400: getColor('400', dom),
        500: getColor('500', dom),
        600: getColor('600', dom),
        700: getColor('700', dom),
        800: getColor('800', dom),
        900: getColor('900', dom),
        1000: getColor('1000', dom),
        1100: getColor('1100', dom),
        black: getColor('black', dom)
    };
};

var hasClass = function hasClass(el, className) {
    !el && false;
    return el.classList.value.includes(className);
};

var addClass = function addClass(el, className) {
    el.classList.add(className);
};

var getOffset = function getOffset(el) {
    var rect = el.getBoundingClientRect();
    var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return {
        top: rect.top + scrollTop,
        left: rect.left + scrollLeft
    };
};

function isScrolledIntoView(el) {
    var rect = el.getBoundingClientRect();
    var windowHeight = window.innerHeight || document.documentElement.clientHeight;
    var windowWidth = window.innerWidth || document.documentElement.clientWidth;
    var vertInView = rect.top <= windowHeight && rect.top + rect.height >= 0;
    var horInView = rect.left <= windowWidth && rect.left + rect.width >= 0;
    return vertInView && horInView;
}

var isElementIntoView = function isElementIntoView(el) {
    var position = el.getBoundingClientRect(); // checking whether fully visible

    if (position.top >= 0 && position.bottom <= window.innerHeight) {
        return true;
    } // checking for partial visibility


    if (position.top < window.innerHeight && position.bottom >= 0) {
        return true;
    }
};

var breakpoints = {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1540
};

var getBreakpoint = function getBreakpoint(el) {
    var classes = el && el.classList.value;
    var breakpoint;

    if (classes) {
        breakpoint = breakpoints[classes.split(' ').filter(function(cls) {
            return cls.includes('navbar-expand-');
        }).pop().split('-').pop()];
    }

    return breakpoint;
};

var getCurrentScreenBreakpoint = function getCurrentScreenBreakpoint() {
    var currentBreakpoint = '';

    if (window.innerWidth >= breakpoints.xl) {
        currentBreakpoint = 'xl';
    } else if (window.innerWidth >= breakpoints.lg) {
        currentBreakpoint = 'lg';
    } else if (window.innerWidth >= breakpoints.md) {
        currentBreakpoint = 'md';
    } else {
        currentBreakpoint = 'sm';
    }

    var breakpointStartVal = breakpoints[currentBreakpoint];
    return {
        currentBreakpoint: currentBreakpoint,
        breakpointStartVal: breakpointStartVal
    };
};
/* --------------------------------- Cookie --------------------------------- */


var setCookie = function setCookie(name, value, expire) {
    var expires = new Date();
    expires.setTime(expires.getTime() + expire);
    document.cookie = "".concat(name, "=").concat(value, ";expires=").concat(expires.toUTCString());
};

var getCookie = function getCookie(name) {
    var keyValue = document.cookie.match("(^|;) ?".concat(name, "=([^;]*)(;|$)"));
    return keyValue ? keyValue[2] : keyValue;
};

var settings = {
    tinymce: {
        theme: 'oxide'
    },
    chart: {
        borderColor: 'rgba(255, 255, 255, 0.8)'
    }
};
/* -------------------------- Chart Initialization -------------------------- */

var newChart = function newChart(chart, config) {
    var ctx = chart.getContext('2d');
    return new window.Chart(ctx, config);
};
/* ---------------------------------- Store --------------------------------- */


var getItemFromStore = function getItemFromStore(key, defaultValue) {
    var store = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : localStorage;

    try {
        return JSON.parse(store.getItem(key)) || defaultValue;
    } catch (_unused) {
        return store.getItem(key) || defaultValue;
    }
};

var setItemToStore = function setItemToStore(key, payload) {
    var store = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : localStorage;
    return store.setItem(key, payload);
};

var getStoreSpace = function getStoreSpace() {
    var store = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : localStorage;
    return parseFloat((escape(encodeURIComponent(JSON.stringify(store))).length / (1024 * 1024)).toFixed(2));
};
/* get Dates between */


var getDates = function getDates(startDate, endDate) {
    var interval = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1000 * 60 * 60 * 24;
    var duration = endDate - startDate;
    var steps = duration / interval;
    return Array.from({
        length: steps + 1
    }, function(v, i) {
        return new Date(startDate.valueOf() + interval * i);
    });
};

var getPastDates = function getPastDates(duration) {
    var days;

    switch (duration) {
        case 'week':
            days = 7;
            break;

        case 'month':
            days = 30;
            break;

        case 'year':
            days = 365;
            break;

        default:
            days = duration;
    }

    var date = new Date();
    var endDate = date;
    var startDate = new Date(new Date().setDate(date.getDate() - (days - 1)));
    return getDates(startDate, endDate);
};
/* Get Random Number */


var getRandomNumber = function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
};

var utils = {
    docReady: docReady,
    breakpoints: breakpoints,
    isRTL: isRTL,
    resize: resize,
    isIterableArray: isIterableArray,
    camelize: camelize,
    getData: getData,
    hasClass: hasClass,
    addClass: addClass,
    hexToRgb: hexToRgb,
    rgbaColor: rgbaColor,
    getColor: getColor,
    getColors: getColors,
    getSoftColors: getSoftColors,
    getGrays: getGrays,
    getOffset: getOffset,
    isScrolledIntoView: isScrolledIntoView,
    isElementIntoView: isElementIntoView,
    getBreakpoint: getBreakpoint,
    getCurrentScreenBreakpoint: getCurrentScreenBreakpoint,
    setCookie: setCookie,
    getCookie: getCookie,
    newChart: newChart,
    settings: settings,
    getItemFromStore: getItemFromStore,
    setItemToStore: setItemToStore,
    getStoreSpace: getStoreSpace,
    getDates: getDates,
    getPastDates: getPastDates,
    getRandomNumber: getRandomNumber
};
/* -------------------------------------------------------------------------- */

/*                                  Detector                                  */

/* -------------------------------------------------------------------------- */

var detectorInit = function detectorInit() {
    var _window = window,
        is = _window.is;
    var html = document.querySelector('html');
    is.opera() && addClass(html, 'opera');
    is.mobile() && addClass(html, 'mobile');
    is.firefox() && addClass(html, 'firefox');
    is.safari() && addClass(html, 'safari');
    is.ios() && addClass(html, 'ios');
    is.iphone() && addClass(html, 'iphone');
    is.ipad() && addClass(html, 'ipad');
    is.ie() && addClass(html, 'ie');
    is.edge() && addClass(html, 'edge');
    is.chrome() && addClass(html, 'chrome');
    is.mac() && addClass(html, 'osx');
    is.windows() && addClass(html, 'windows');
    navigator.userAgent.match('CriOS') && addClass(html, 'chrome');
};
/*-----------------------------------------------
|   DomNode
-----------------------------------------------*/


var DomNode = /*#__PURE__*/ function() {
    function DomNode(node) {
        _classCallCheck(this, DomNode);

        this.node = node;
    }

    _createClass(DomNode, [{
        key: "addClass",
        value: function addClass(className) {
            this.isValidNode() && this.node.classList.add(className);
        }
    }, {
        key: "removeClass",
        value: function removeClass(className) {
            this.isValidNode() && this.node.classList.remove(className);
        }
    }, {
        key: "toggleClass",
        value: function toggleClass(className) {
            this.isValidNode() && this.node.classList.toggle(className);
        }
    }, {
        key: "hasClass",
        value: function hasClass(className) {
            this.isValidNode() && this.node.classList.contains(className);
        }
    }, {
        key: "data",
        value: function data(key) {
            if (this.isValidNode()) {
                try {
                    return JSON.parse(this.node.dataset[this.camelize(key)]);
                } catch (e) {
                    return this.node.dataset[this.camelize(key)];
                }
            }

            return null;
        }
    }, {
        key: "attr",
        value: function attr(name) {
            return this.isValidNode() && this.node[name];
        }
    }, {
        key: "setAttribute",
        value: function setAttribute(name, value) {
            this.isValidNode() && this.node.setAttribute(name, value);
        }
    }, {
        key: "removeAttribute",
        value: function removeAttribute(name) {
            this.isValidNode() && this.node.removeAttribute(name);
        }
    }, {
        key: "setProp",
        value: function setProp(name, value) {
            this.isValidNode() && (this.node[name] = value);
        }
    }, {
        key: "on",
        value: function on(event, cb) {
            this.isValidNode() && this.node.addEventListener(event, cb);
        }
    }, {
        key: "isValidNode",
        value: function isValidNode() {
            return !!this.node;
        } // eslint-disable-next-line class-methods-use-this

    }, {
        key: "camelize",
        value: function camelize(str) {
            var text = str.replace(/[-_\s.]+(.)?/g, function(_, c) {
                return c ? c.toUpperCase() : '';
            });
            return "".concat(text.substr(0, 1).toLowerCase()).concat(text.substr(1));
        }
    }]);

    return DomNode;
}();
/* --------------------------------------------------------------------------
|                                 bg player
--------------------------------------------------------------------------- */


var bgPlayerInit = function bgPlayerInit() {
    var Selector = {
        DATA_YOUTUBE_EMBED: '[data-youtube-embed]',
        YT_VIDEO: '.yt-video'
    };
    var DATA_KEY = {
        YOUTUBE_EMBED: 'youtube-embed'
    };
    var ClassName = {
        LOADED: 'loaded'
    };
    var Events = {
        SCROLL: 'scroll',
        LOADING: 'loading',
        DOM_CONTENT_LOADED: 'DOMContentLoaded'
    };
    var youtubeEmbedElements = document.querySelectorAll(Selector.DATA_YOUTUBE_EMBED);

    var loadVideo = function loadVideo() {
        function setupPlayer() {
            window.YT.ready(function() {
                youtubeEmbedElements.forEach(function(youtubeEmbedElement) {
                    var userOptions = utils.getData(youtubeEmbedElement, DATA_KEY.YOUTUBE_EMBED);
                    var defaultOptions = {
                        videoId: 'hLpy-DRuiz0',
                        startSeconds: 1,
                        endSeconds: 50
                    };

                    var options = window._.merge(defaultOptions, userOptions);

                    var youTubePlayer = function youTubePlayer() {
                        // eslint-disable-next-line
                        new YT.Player(youtubeEmbedElement, {
                            videoId: options.videoId,
                            playerVars: {
                                autoplay: 1,
                                disablekb: 1,
                                controls: 0,
                                modestbranding: 1,
                                // Hide the Youtube Logo
                                loop: 1,
                                fs: 0,
                                enablejsapi: 0,
                                start: options === null || options === void 0 ? void 0 : options.startSeconds,
                                end: options === null || options === void 0 ? void 0 : options.endSeconds
                            },
                            events: {
                                onReady: function onReady(e) {
                                    e.target.mute();
                                    e.target.playVideo();
                                },
                                onStateChange: function onStateChange(e) {
                                    if (e.data === window.YT.PlayerState.PLAYING) {
                                        document.querySelectorAll(Selector.DATA_YOUTUBE_EMBED).forEach(function(embedElement) {
                                            embedElement.classList.add(ClassName.LOADED);
                                        });
                                    }

                                    if (e.data === window.YT.PlayerState.PAUSED) {
                                        e.target.playVideo();
                                    }

                                    if (e.data === window.YT.PlayerState.ENDED) {
                                        // Loop from starting point
                                        e.target.seekTo(options.startSeconds);
                                    }
                                }
                            }
                        });
                    };

                    youTubePlayer();
                });
            });
        }

        var tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        tag.onload = setupPlayer;
    };

    if (document.readyState !== Events.LOADING) {
        loadVideo();
    } else {
        document.addEventListener(Events.DOM_CONTENT_LOADED, function() {
            return loadVideo();
        });
    }
    /* --------------------------------------------------------------------------
     |                                 Adjust BG Ratio
     --------------------------------------------------------------------------- */


    var adjustBackgroundRatio = function adjustBackgroundRatio() {
        var ytElements = document.querySelectorAll(Selector.YT_VIDEO);
        ytElements.forEach(function(ytEl) {
            var ytElement = ytEl;
            var width = ytElement.parentElement.offsetWidth + 200;
            var height = width * 9 / 16;
            var minHeight = ytElement.parentElement.offsetHeight + 112;
            var minWidth = minHeight * 16 / 9;
            ytElement.style.width = "".concat(width, "px");
            ytElement.style.height = "".concat(height, "px");
            ytElement.style.minHeight = "".concat(minHeight, "px");
            ytElement.style.minWidth = "".concat(minWidth, "px");
        });
    };

    adjustBackgroundRatio();
    document.addEventListener(Events.SCROLL, function() {
        return adjustBackgroundRatio();
    });
};
/* -------------------------------------------------------------------------- */

/*                                  Count Up                                  */

/* -------------------------------------------------------------------------- */


var countupInit = function countupInit() {
    if (window.countUp) {
        var countups = document.querySelectorAll('[data-countup]');
        countups.forEach(function(node) {
            var _utils$getData = utils.getData(node, 'countup'),
                endValue = _utils$getData.endValue,
                options = _objectWithoutProperties(_utils$getData, _excluded);

            var fireCountUp = function fireCountUp() {
                var isInView = utils.isScrolledIntoView(node);

                if (isInView) {
                    var countUp = new window.countUp.CountUp(node, endValue, _objectSpread({
                        duration: 5
                    }, options));

                    if (!countUp.error) {
                        countUp.start();
                    } else {
                        console.error(countUp.error);
                    }

                    window.removeEventListener('scroll', fireCountUp);
                }
            };

            window.addEventListener('scroll', fireCountUp);
        });
    }
};
/*-----------------------------------------------
|   Dashboard Table dropdown
-----------------------------------------------*/


var dropdownMenuInit = function dropdownMenuInit() {
    // Only for ios
    if (window.is.ios()) {
        var Event = {
            SHOWN_BS_DROPDOWN: 'shown.bs.dropdown',
            HIDDEN_BS_DROPDOWN: 'hidden.bs.dropdown'
        };
        var Selector = {
            TABLE_RESPONSIVE: '.table-responsive',
            DROPDOWN_MENU: '.dropdown-menu'
        };
        document.querySelectorAll(Selector.TABLE_RESPONSIVE).forEach(function(table) {
            table.addEventListener(Event.SHOWN_BS_DROPDOWN, function(e) {
                var t = e.currentTarget;

                if (t.scrollWidth > t.clientWidth) {
                    t.style.paddingBottom = "".concat(e.target.nextElementSibling.clientHeight, "px");
                }
            });
            table.addEventListener(Event.HIDDEN_BS_DROPDOWN, function(e) {
                e.currentTarget.style.paddingBottom = '';
            });
        });
    }
}; // Reference
// https://github.com/twbs/bootstrap/issues/11037#issuecomment-274870381

/* -------------------------------------------------------------------------- */

/*                           Open dropdown on hover                           */

/* -------------------------------------------------------------------------- */


var dropdownOnHover = function dropdownOnHover() {
    var navbarArea = document.querySelectorAll('[data-bs-toggle="dropdown"]');

    if (navbarArea) {
        navbarArea.forEach(function(navbarItem) {
            navbarItem.addEventListener('mouseover', function(e) {
                if (e.target.className.includes('dropdown-toggle') && window.innerWidth > 992) {
                    var dropdownInstance = new window.bootstrap.Dropdown(e.target);
                    /* eslint-disable no-underscore-dangle */

                    dropdownInstance._element.classList.add('show');

                    dropdownInstance._menu.classList.add('show');

                    dropdownInstance._menu.setAttribute('data-bs-popper', 'none');

                    e.target.parentNode.addEventListener('mouseleave', function() {
                        dropdownInstance.hide();
                    });
                }
            });
        });
    }
};
/*-----------------------------------------------
|   Gooogle Map
-----------------------------------------------*/


function initMap() {
    var themeController = document.body;
    var $googlemaps = document.querySelectorAll('.googlemap');

    if ($googlemaps.length && window.google) {
        // Visit https://snazzymaps.com/ for more themes
        var mapStyles = {
            Default: [{
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{
                    color: '#e9e9e9'
                }, {
                    lightness: 17
                }]
            }, {
                featureType: 'landscape',
                elementType: 'geometry',
                stylers: [{
                    color: '#f5f5f5'
                }, {
                    lightness: 20
                }]
            }, {
                featureType: 'road.highway',
                elementType: 'geometry.fill',
                stylers: [{
                    color: '#ffffff'
                }, {
                    lightness: 17
                }]
            }, {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [{
                    color: '#ffffff'
                }, {
                    lightness: 29
                }, {
                    weight: 0.2
                }]
            }, {
                featureType: 'road.arterial',
                elementType: 'geometry',
                stylers: [{
                    color: '#ffffff'
                }, {
                    lightness: 18
                }]
            }, {
                featureType: 'road.local',
                elementType: 'geometry',
                stylers: [{
                    color: '#ffffff'
                }, {
                    lightness: 16
                }]
            }, {
                featureType: 'poi',
                elementType: 'geometry',
                stylers: [{
                    color: '#f5f5f5'
                }, {
                    lightness: 21
                }]
            }, {
                featureType: 'poi.park',
                elementType: 'geometry',
                stylers: [{
                    color: '#dedede'
                }, {
                    lightness: 21
                }]
            }, {
                elementType: 'labels.text.stroke',
                stylers: [{
                    visibility: 'on'
                }, {
                    color: '#ffffff'
                }, {
                    lightness: 16
                }]
            }, {
                elementType: 'labels.text.fill',
                stylers: [{
                    saturation: 36
                }, {
                    color: '#333333'
                }, {
                    lightness: 40
                }]
            }, {
                elementType: 'labels.icon',
                stylers: [{
                    visibility: 'off'
                }]
            }, {
                featureType: 'transit',
                elementType: 'geometry',
                stylers: [{
                    color: '#f2f2f2'
                }, {
                    lightness: 19
                }]
            }, {
                featureType: 'administrative',
                elementType: 'geometry.fill',
                stylers: [{
                    color: '#fefefe'
                }, {
                    lightness: 20
                }]
            }, {
                featureType: 'administrative',
                elementType: 'geometry.stroke',
                stylers: [{
                    color: '#fefefe'
                }, {
                    lightness: 17
                }, {
                    weight: 1.2
                }]
            }],
            Gray: [{
                featureType: 'all',
                elementType: 'labels.text.fill',
                stylers: [{
                    saturation: 36
                }, {
                    color: '#000000'
                }, {
                    lightness: 40
                }]
            }, {
                featureType: 'all',
                elementType: 'labels.text.stroke',
                stylers: [{
                    visibility: 'on'
                }, {
                    color: '#000000'
                }, {
                    lightness: 16
                }]
            }, {
                featureType: 'all',
                elementType: 'labels.icon',
                stylers: [{
                    visibility: 'off'
                }]
            }, {
                featureType: 'administrative',
                elementType: 'geometry.fill',
                stylers: [{
                    color: '#000000'
                }, {
                    lightness: 20
                }]
            }, {
                featureType: 'administrative',
                elementType: 'geometry.stroke',
                stylers: [{
                    color: '#000000'
                }, {
                    lightness: 17
                }, {
                    weight: 1.2
                }]
            }, {
                featureType: 'landscape',
                elementType: 'geometry',
                stylers: [{
                    color: '#000000'
                }, {
                    lightness: 20
                }]
            }, {
                featureType: 'poi',
                elementType: 'geometry',
                stylers: [{
                    color: '#000000'
                }, {
                    lightness: 21
                }]
            }, {
                featureType: 'road.highway',
                elementType: 'geometry.fill',
                stylers: [{
                    color: '#000000'
                }, {
                    lightness: 17
                }]
            }, {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [{
                    color: '#000000'
                }, {
                    lightness: 29
                }, {
                    weight: 0.2
                }]
            }, {
                featureType: 'road.arterial',
                elementType: 'geometry',
                stylers: [{
                    color: '#000000'
                }, {
                    lightness: 18
                }]
            }, {
                featureType: 'road.local',
                elementType: 'geometry',
                stylers: [{
                    color: '#000000'
                }, {
                    lightness: 16
                }]
            }, {
                featureType: 'transit',
                elementType: 'geometry',
                stylers: [{
                    color: '#000000'
                }, {
                    lightness: 19
                }]
            }, {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{
                    color: '#000000'
                }, {
                    lightness: 17
                }]
            }],
            Midnight: [{
                featureType: 'all',
                elementType: 'labels.text.fill',
                stylers: [{
                    color: '#ffffff'
                }]
            }, {
                featureType: 'all',
                elementType: 'labels.text.stroke',
                stylers: [{
                    color: '#000000'
                }, {
                    lightness: 13
                }]
            }, {
                featureType: 'administrative',
                elementType: 'geometry.fill',
                stylers: [{
                    color: '#000000'
                }]
            }, {
                featureType: 'administrative',
                elementType: 'geometry.stroke',
                stylers: [{
                    color: '#144b53'
                }, {
                    lightness: 14
                }, {
                    weight: 1.4
                }]
            }, {
                featureType: 'landscape',
                elementType: 'all',
                stylers: [{
                    color: '#08304b'
                }]
            }, {
                featureType: 'poi',
                elementType: 'geometry',
                stylers: [{
                    color: '#0c4152'
                }, {
                    lightness: 5
                }]
            }, {
                featureType: 'road.highway',
                elementType: 'geometry.fill',
                stylers: [{
                    color: '#000000'
                }]
            }, {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [{
                    color: '#0b434f'
                }, {
                    lightness: 25
                }]
            }, {
                featureType: 'road.arterial',
                elementType: 'geometry.fill',
                stylers: [{
                    color: '#000000'
                }]
            }, {
                featureType: 'road.arterial',
                elementType: 'geometry.stroke',
                stylers: [{
                    color: '#0b3d51'
                }, {
                    lightness: 16
                }]
            }, {
                featureType: 'road.local',
                elementType: 'geometry',
                stylers: [{
                    color: '#000000'
                }]
            }, {
                featureType: 'transit',
                elementType: 'all',
                stylers: [{
                    color: '#146474'
                }]
            }, {
                featureType: 'water',
                elementType: 'all',
                stylers: [{
                    color: '#021019'
                }]
            }],
            Hopper: [{
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{
                    hue: '#165c64'
                }, {
                    saturation: 34
                }, {
                    lightness: -69
                }, {
                    visibility: 'on'
                }]
            }, {
                featureType: 'landscape',
                elementType: 'geometry',
                stylers: [{
                    hue: '#b7caaa'
                }, {
                    saturation: -14
                }, {
                    lightness: -18
                }, {
                    visibility: 'on'
                }]
            }, {
                featureType: 'landscape.man_made',
                elementType: 'all',
                stylers: [{
                    hue: '#cbdac1'
                }, {
                    saturation: -6
                }, {
                    lightness: -9
                }, {
                    visibility: 'on'
                }]
            }, {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{
                    hue: '#8d9b83'
                }, {
                    saturation: -89
                }, {
                    lightness: -12
                }, {
                    visibility: 'on'
                }]
            }, {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{
                    hue: '#d4dad0'
                }, {
                    saturation: -88
                }, {
                    lightness: 54
                }, {
                    visibility: 'simplified'
                }]
            }, {
                featureType: 'road.arterial',
                elementType: 'geometry',
                stylers: [{
                    hue: '#bdc5b6'
                }, {
                    saturation: -89
                }, {
                    lightness: -3
                }, {
                    visibility: 'simplified'
                }]
            }, {
                featureType: 'road.local',
                elementType: 'geometry',
                stylers: [{
                    hue: '#bdc5b6'
                }, {
                    saturation: -89
                }, {
                    lightness: -26
                }, {
                    visibility: 'on'
                }]
            }, {
                featureType: 'poi',
                elementType: 'geometry',
                stylers: [{
                    hue: '#c17118'
                }, {
                    saturation: 61
                }, {
                    lightness: -45
                }, {
                    visibility: 'on'
                }]
            }, {
                featureType: 'poi.park',
                elementType: 'all',
                stylers: [{
                    hue: '#8ba975'
                }, {
                    saturation: -46
                }, {
                    lightness: -28
                }, {
                    visibility: 'on'
                }]
            }, {
                featureType: 'transit',
                elementType: 'geometry',
                stylers: [{
                    hue: '#a43218'
                }, {
                    saturation: 74
                }, {
                    lightness: -51
                }, {
                    visibility: 'simplified'
                }]
            }, {
                featureType: 'administrative.province',
                elementType: 'all',
                stylers: [{
                    hue: '#ffffff'
                }, {
                    saturation: 0
                }, {
                    lightness: 100
                }, {
                    visibility: 'simplified'
                }]
            }, {
                featureType: 'administrative.neighborhood',
                elementType: 'all',
                stylers: [{
                    hue: '#ffffff'
                }, {
                    saturation: 0
                }, {
                    lightness: 100
                }, {
                    visibility: 'off'
                }]
            }, {
                featureType: 'administrative.locality',
                elementType: 'labels',
                stylers: [{
                    hue: '#ffffff'
                }, {
                    saturation: 0
                }, {
                    lightness: 100
                }, {
                    visibility: 'off'
                }]
            }, {
                featureType: 'administrative.land_parcel',
                elementType: 'all',
                stylers: [{
                    hue: '#ffffff'
                }, {
                    saturation: 0
                }, {
                    lightness: 100
                }, {
                    visibility: 'off'
                }]
            }, {
                featureType: 'administrative',
                elementType: 'all',
                stylers: [{
                    hue: '#3a3935'
                }, {
                    saturation: 5
                }, {
                    lightness: -57
                }, {
                    visibility: 'off'
                }]
            }, {
                featureType: 'poi.medical',
                elementType: 'geometry',
                stylers: [{
                    hue: '#cba923'
                }, {
                    saturation: 50
                }, {
                    lightness: -46
                }, {
                    visibility: 'on'
                }]
            }],
            Beard: [{
                featureType: 'poi.business',
                elementType: 'labels.text',
                stylers: [{
                    visibility: 'on'
                }, {
                    color: '#333333'
                }]
            }],
            AssassianCreed: [{
                featureType: 'all',
                elementType: 'all',
                stylers: [{
                    visibility: 'on'
                }]
            }, {
                featureType: 'all',
                elementType: 'labels',
                stylers: [{
                    visibility: 'off'
                }, {
                    saturation: '-100'
                }]
            }, {
                featureType: 'all',
                elementType: 'labels.text.fill',
                stylers: [{
                    saturation: 36
                }, {
                    color: '#000000'
                }, {
                    lightness: 40
                }, {
                    visibility: 'off'
                }]
            }, {
                featureType: 'all',
                elementType: 'labels.text.stroke',
                stylers: [{
                    visibility: 'off'
                }, {
                    color: '#000000'
                }, {
                    lightness: 16
                }]
            }, {
                featureType: 'all',
                elementType: 'labels.icon',
                stylers: [{
                    visibility: 'off'
                }]
            }, {
                featureType: 'administrative',
                elementType: 'geometry.fill',
                stylers: [{
                    color: '#000000'
                }, {
                    lightness: 20
                }]
            }, {
                featureType: 'administrative',
                elementType: 'geometry.stroke',
                stylers: [{
                    color: '#000000'
                }, {
                    lightness: 17
                }, {
                    weight: 1.2
                }]
            }, {
                featureType: 'landscape',
                elementType: 'geometry',
                stylers: [{
                    color: '#000000'
                }, {
                    lightness: 20
                }]
            }, {
                featureType: 'landscape',
                elementType: 'geometry.fill',
                stylers: [{
                    color: '#4d6059'
                }]
            }, {
                featureType: 'landscape',
                elementType: 'geometry.stroke',
                stylers: [{
                    color: '#4d6059'
                }]
            }, {
                featureType: 'landscape.natural',
                elementType: 'geometry.fill',
                stylers: [{
                    color: '#4d6059'
                }]
            }, {
                featureType: 'poi',
                elementType: 'geometry',
                stylers: [{
                    lightness: 21
                }]
            }, {
                featureType: 'poi',
                elementType: 'geometry.fill',
                stylers: [{
                    color: '#4d6059'
                }]
            }, {
                featureType: 'poi',
                elementType: 'geometry.stroke',
                stylers: [{
                    color: '#4d6059'
                }]
            }, {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{
                    visibility: 'on'
                }, {
                    color: '#7f8d89'
                }]
            }, {
                featureType: 'road',
                elementType: 'geometry.fill',
                stylers: [{
                    color: '#7f8d89'
                }]
            }, {
                featureType: 'road.highway',
                elementType: 'geometry.fill',
                stylers: [{
                    color: '#7f8d89'
                }, {
                    lightness: 17
                }]
            }, {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [{
                    color: '#7f8d89'
                }, {
                    lightness: 29
                }, {
                    weight: 0.2
                }]
            }, {
                featureType: 'road.arterial',
                elementType: 'geometry',
                stylers: [{
                    color: '#000000'
                }, {
                    lightness: 18
                }]
            }, {
                featureType: 'road.arterial',
                elementType: 'geometry.fill',
                stylers: [{
                    color: '#7f8d89'
                }]
            }, {
                featureType: 'road.arterial',
                elementType: 'geometry.stroke',
                stylers: [{
                    color: '#7f8d89'
                }]
            }, {
                featureType: 'road.local',
                elementType: 'geometry',
                stylers: [{
                    color: '#000000'
                }, {
                    lightness: 16
                }]
            }, {
                featureType: 'road.local',
                elementType: 'geometry.fill',
                stylers: [{
                    color: '#7f8d89'
                }]
            }, {
                featureType: 'road.local',
                elementType: 'geometry.stroke',
                stylers: [{
                    color: '#7f8d89'
                }]
            }, {
                featureType: 'transit',
                elementType: 'geometry',
                stylers: [{
                    color: '#000000'
                }, {
                    lightness: 19
                }]
            }, {
                featureType: 'water',
                elementType: 'all',
                stylers: [{
                    color: '#2b3638'
                }, {
                    visibility: 'on'
                }]
            }, {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{
                    color: '#2b3638'
                }, {
                    lightness: 17
                }]
            }, {
                featureType: 'water',
                elementType: 'geometry.fill',
                stylers: [{
                    color: '#24282b'
                }]
            }, {
                featureType: 'water',
                elementType: 'geometry.stroke',
                stylers: [{
                    color: '#24282b'
                }]
            }, {
                featureType: 'water',
                elementType: 'labels',
                stylers: [{
                    visibility: 'off'
                }]
            }, {
                featureType: 'water',
                elementType: 'labels.text',
                stylers: [{
                    visibility: 'off '
                }]
            }, {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{
                    visibility: 'off'
                }]
            }, {
                featureType: 'water',
                elementType: 'labels.text.stroke',
                stylers: [{
                    visibility: 'off'
                }]
            }, {
                featureType: 'water',
                elementType: 'labels.icon',
                stylers: [{
                    visibility: 'off'
                }]
            }],
            SubtleGray: [{
                featureType: 'administrative',
                elementType: 'all',
                stylers: [{
                    saturation: '-100'
                }]
            }, {
                featureType: 'administrative.province',
                elementType: 'all',
                stylers: [{
                    visibility: 'off'
                }]
            }, {
                featureType: 'landscape',
                elementType: 'all',
                stylers: [{
                    saturation: -100
                }, {
                    lightness: 65
                }, {
                    visibility: 'on'
                }]
            }, {
                featureType: 'poi',
                elementType: 'all',
                stylers: [{
                    saturation: -100
                }, {
                    lightness: '50'
                }, {
                    visibility: 'simplified'
                }]
            }, {
                featureType: 'road',
                elementType: 'all',
                stylers: [{
                    saturation: -100
                }]
            }, {
                featureType: 'road.highway',
                elementType: 'all',
                stylers: [{
                    visibility: 'simplified'
                }]
            }, {
                featureType: 'road.arterial',
                elementType: 'all',
                stylers: [{
                    lightness: '30'
                }]
            }, {
                featureType: 'road.local',
                elementType: 'all',
                stylers: [{
                    lightness: '40'
                }]
            }, {
                featureType: 'transit',
                elementType: 'all',
                stylers: [{
                    saturation: -100
                }, {
                    visibility: 'simplified'
                }]
            }, {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{
                    hue: '#ffff00'
                }, {
                    lightness: -25
                }, {
                    saturation: -97
                }]
            }, {
                featureType: 'water',
                elementType: 'labels',
                stylers: [{
                    lightness: -25
                }, {
                    saturation: -100
                }]
            }],
            Tripitty: [{
                featureType: 'all',
                elementType: 'labels',
                stylers: [{
                    visibility: 'off'
                }]
            }, {
                featureType: 'administrative',
                elementType: 'all',
                stylers: [{
                    visibility: 'off'
                }]
            }, {
                featureType: 'landscape',
                elementType: 'all',
                stylers: [{
                    color: '#2c5ca5'
                }]
            }, {
                featureType: 'poi',
                elementType: 'all',
                stylers: [{
                    color: '#2c5ca5'
                }]
            }, {
                featureType: 'road',
                elementType: 'all',
                stylers: [{
                    visibility: 'off'
                }]
            }, {
                featureType: 'transit',
                elementType: 'all',
                stylers: [{
                    visibility: 'off'
                }]
            }, {
                featureType: 'water',
                elementType: 'all',
                stylers: [{
                    color: '#193a70'
                }, {
                    visibility: 'on'
                }]
            }],
            Cobalt: [{
                featureType: 'all',
                elementType: 'all',
                stylers: [{
                    invert_lightness: true
                }, {
                    saturation: 10
                }, {
                    lightness: 30
                }, {
                    gamma: 0.5
                }, {
                    hue: '#435158'
                }]
            }]
        };
        $googlemaps.forEach(function(itm) {
            var latLng = utils.getData(itm, 'latlng').split(',');
            var markerPopup = itm.innerHTML;
            var icon = utils.getData(itm, 'icon') ? utils.getData(itm, 'icon') : 'https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi.png';
            var zoom = utils.getData(itm, 'zoom');
            var mapElement = itm;
            var mapStyle = utils.getData(itm, 'theme');

            if (utils.getData(itm, 'theme') === 'streetview') {
                var pov = utils.getData(itm, 'pov');
                var _mapOptions = {
                    position: {
                        lat: Number(latLng[0]),
                        lng: Number(latLng[1])
                    },
                    pov: pov,
                    zoom: zoom,
                    gestureHandling: 'none',
                    scrollwheel: false
                };
                return new window.google.maps.StreetViewPanorama(mapElement, _mapOptions);
            }

            var mapOptions = {
                zoom: zoom,
                scrollwheel: utils.getData(itm, 'scrollwheel'),
                center: new window.google.maps.LatLng(latLng[0], latLng[1]),
                styles: localStorage.getItem('theme') === 'dark' ? mapStyles.Cobalt : mapStyles[mapStyle]
            };
            var map = new window.google.maps.Map(mapElement, mapOptions);
            var infowindow = new window.google.maps.InfoWindow({
                content: markerPopup
            });
            var marker = new window.google.maps.Marker({
                position: new window.google.maps.LatLng(latLng[0], latLng[1]),
                icon: icon,
                map: map
            });
            marker.addListener('click', function() {
                infowindow.open(map, marker);
            });
            themeController && themeController.addEventListener('clickControl', function(_ref) {
                var _ref$detail = _ref.detail,
                    control = _ref$detail.control,
                    value = _ref$detail.value;

                if (control === 'theme') {
                    map.set('styles', value === 'dark' ? mapStyles.Cobalt : mapStyles[mapStyle]);
                }
            });
            return null;
        });
    }
}
/*-----------------------------------------------
|   Hamburger
-----------------------------------------------*/


var hamburgerInit = function hamburgerInit() {
    var Selector = {
        HAMBURGER: '.hamburger',
        NAVBAR_COLLAPSE: '#primaryNavbarCollapse'
    };
    var hamburger = document.querySelector(Selector.HAMBURGER);
    var navbarCollapse = document.querySelector(Selector.NAVBAR_COLLAPSE);

    if (hamburger) {
        navbarCollapse.addEventListener('show.bs.collapse', function() {
            hamburger.classList.add('is-active');
        });
    }

    if (hamburger) {
        navbarCollapse.addEventListener('hide.bs.collapse', function() {
            hamburger.classList.remove('is-active');
        });
    }
};

function inertiaInit() {
    var Selector = {
        DATA_INERTIA: '[data-inertia]'
    };
    var DATA_KEY = {
        INERTIA: 'inertia'
    };
    var Events = {
        SCROLL: 'scroll',
        RESIZE: 'resize'
    };
    var inertiaEls = document.querySelectorAll(Selector.DATA_INERTIA);
    inertiaEls.forEach(function(el) {
        var rect = el.getBoundingClientRect();
        var options = utils.getData(el, DATA_KEY.INERTIA);
        var offsetTop = rect.top >= 0 ? rect.top : 0;
        var winHeight = window.innerHeight;
        var currentPosition = window.pageYOffset;
        var y = 0;
        var previousPosition = 0;
        var initialTranslate = (offsetTop - currentPosition) * 100 / winHeight;
        var controller = {
            weight: 2,
            duration: 0.7,
            ease: 'Power3.easeOut'
        };
        Object.assign(controller, options); // eslint-disable-next-line no-param-reassign

        el.style.transform = "translateY(".concat(initialTranslate, "px);");

        var inertiaEffect = function inertiaEffect() {
            currentPosition = window.pageYOffset;
            y = controller.weight * (offsetTop - currentPosition) * 100 / winHeight;
            currentPosition === previousPosition || window.gsap.to(el, {
                duration: controller.duration,
                y: y,
                ease: controller.ease
            });
            previousPosition = currentPosition;
        };

        window.addEventListener(Events.SCROLL, inertiaEffect);
        window.addEventListener(Events.RESIZE, inertiaEffect);
    });
}
/* -------------------------------------------------------------------------- */

/*                                 bigPicture                                 */

/* -------------------------------------------------------------------------- */


var lightboxInit = function lightboxInit() {
    if (window.BigPicture) {
        var bpItems = document.querySelectorAll('[data-bigpicture]');
        bpItems.forEach(function(bpItem) {
            var userOptions = utils.getData(bpItem, 'bigpicture');
            var defaultOptions = {
                el: bpItem
            };

            var options = window._.merge(defaultOptions, userOptions);

            bpItem.addEventListener('click', function() {
                window.BigPicture(options);
            });
        });
    }
};
/*-----------------------------------------------
|   Inline Player [plyr]
-----------------------------------------------*/


var plyrInit = function plyrInit() {
    if (window.Plyr) {
        var plyrs = document.querySelectorAll('.player');
        plyrs.forEach(function(plyr) {
            var userOptions = utils.getData(plyr, 'options');
            var defaultOptions = {
                captions: {
                    active: true
                }
            };

            var options = window._.merge(defaultOptions, userOptions);

            return new window.Plyr(plyr, options);
        });
    }
};
/* -------------------------------------------------------------------------- */

/*                                   Popover                                  */

/* -------------------------------------------------------------------------- */


var popoverInit = function popoverInit() {
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function(popoverTriggerEl) {
        return new window.bootstrap.Popover(popoverTriggerEl);
    });
};
/* -------------------------------------------------------------------------- */

/*                                  Preloader                                 */

/* -------------------------------------------------------------------------- */


var preloaderInit = function preloaderInit() {
    var bodyElement = document.querySelector('body');
    window.imagesLoaded(bodyElement, function() {
        var preloader = document.querySelector('.preloader');
        preloader === null || preloader === void 0 ? void 0 : preloader.classList.add('loaded');
        setTimeout(function() {
            preloader === null || preloader === void 0 ? void 0 : preloader.remove();
        }, 900);
    });
};
/* -------------------------------------------------------------------------- */

/*                                Scroll To Top                               */

/* -------------------------------------------------------------------------- */


var scrollToTop = function scrollToTop() {
    document.querySelectorAll('[data-anchor] > a, [data-scroll-to]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            var _utils$getData2;

            e.preventDefault();
            var el = e.target;
            var id = utils.getData(el, 'scroll-to') || el.getAttribute('href');
            window.scroll({
                top: (_utils$getData2 = utils.getData(el, 'offset-top')) !== null && _utils$getData2 !== void 0 ? _utils$getData2 : utils.getOffset(document.querySelector(id)).top - 100,
                left: 0,
                behavior: 'smooth'
            });
            window.location.hash = id;
        });
    });
};
/* -------------------------------------------------------------------------- */

/*                                 Scrollbars                                 */

/* -------------------------------------------------------------------------- */


var scrollbarInit = function scrollbarInit() {
    Array.prototype.forEach.call(document.querySelectorAll('.scrollbar-overlay'), function(el) {
        return new window.OverlayScrollbars(el, {
            scrollbars: {
                autoHide: 'leave',
                autoHideDelay: 200
            }
        });
    });
};
/*-----------------------------------------------
|  Swiper
-----------------------------------------------*/


var swiperInit = function swiperInit() {
    var Selector = {
        DATA_SWIPER: '[data-swiper]',
        DATA_ZANIM_TIMELINE: '[data-zanim-timeline]',
        IMG: 'img',
        SWIPER_NAV: '.swiper-nav',
        SWIPER_BUTTON_NEXT: '.swiper-button-next',
        SWIPER_BUTTON_PREV: '.swiper-button-prev'
    };
    var DATA_KEY = {
        SWIPER: 'swiper'
    };
    var Events = {
        SLIDE_CHANGE: 'slideChange'
    };
    var swipers = document.querySelectorAll(Selector.DATA_SWIPER);

    if (swipers.length) {
        swipers.forEach(function(swiper) {
            var options = utils.getData(swiper, DATA_KEY.SWIPER);
            var thumbsOptions = options.thumb;
            var thumbsInit;

            if (thumbsOptions) {
                var thumbImages = swiper.querySelectorAll(Selector.IMG);
                var slides = '';
                thumbImages.forEach(function(img) {
                    slides += "\n          <div class='swiper-slide '>\n            <img class='img-fluid rounded mt-1' src=".concat(img.src, " alt=''/>\n          </div>\n        ");
                });
                var thumbs = document.createElement('div');
                thumbs.setAttribute('class', 'swiper thumb');
                thumbs.innerHTML = "<div class='swiper-wrapper'>".concat(slides, "</div>");

                if (thumbsOptions.parent) {
                    var parent = document.querySelector(thumbsOptions.parent);
                    parent.parentNode.appendChild(thumbs);
                } else {
                    swiper.parentNode.appendChild(thumbs);
                }

                thumbsInit = new window.Swiper(thumbs, thumbsOptions);
            }

            var swiperNav = swiper.querySelector(Selector.SWIPER_NAV);
            var newSwiper = new window.Swiper(swiper, _objectSpread(_objectSpread({}, options), {}, {
                navigation: {
                    nextEl: swiperNav === null || swiperNav === void 0 ? void 0 : swiperNav.querySelector('.swiper-button-next'),
                    prevEl: swiperNav === null || swiperNav === void 0 ? void 0 : swiperNav.querySelector('.swiper-button-prev')
                },
                thumbs: {
                    swiper: thumbsInit
                },
                on: {
                    init: function init() {
                        var timelineElements = swiper.querySelectorAll(Selector.DATA_ZANIM_TIMELINE);
                        timelineElements.forEach(function(el) {
                            window.zanimation(el, function(animation) {
                                setTimeout(function() {
                                    animation.play();
                                }, 400);
                            });
                        });
                    }
                }
            })); //- zanimation effect start

            if (swiper) {
                newSwiper.on(Events.SLIDE_CHANGE, function() {
                    var timelineElements = swiper.querySelectorAll(Selector.DATA_ZANIM_TIMELINE);
                    timelineElements.forEach(function(el) {
                        window.zanimation(el, function(animation) {
                            setTimeout(function() {
                                animation.play();
                            }, 400);
                        });
                    });
                });
            } //- zanimation effect end

        });
    }
};
/* -------------------------------------------------------------------------- */

/*                                    Toast                                   */

/* -------------------------------------------------------------------------- */


var toastInit = function toastInit() {
    var toastElList = [].slice.call(document.querySelectorAll('.toast'));
    toastElList.map(function(toastEl) {
        return new window.bootstrap.Toast(toastEl);
    });
    var liveToastBtn = document.getElementById('liveToastBtn');

    if (liveToastBtn) {
        var liveToast = new window.bootstrap.Toast(document.getElementById('liveToast'));
        liveToastBtn.addEventListener('click', function() {
            liveToast && liveToast.show();
        });
    }
};
/* -------------------------------------------------------------------------- */

/*                                   Tooltip                                  */

/* -------------------------------------------------------------------------- */


var tooltipInit = function tooltipInit() {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new window.bootstrap.Tooltip(tooltipTriggerEl, {
            trigger: 'hover'
        });
    });
};
/*-----------------------------------------------
|                 Zanimation
-----------------------------------------------*/

/*
global CustomEase, gsap
*/


CustomEase.create('CubicBezier', '.77,0,.18,1');
/*-----------------------------------------------
|   Global Functions
-----------------------------------------------*/

var filterBlur = function filterBlur() {
    var blur = 'blur(5px)';
    var isIpadIphoneMacFirefox = (window.is.ios() || window.is.mac()) && window.is.firefox();

    if (isIpadIphoneMacFirefox) {
        blur = 'blur(0px)';
    }

    return blur;
};

var zanimationEffects = {
    "default": {
        from: {
            opacity: 0,
            y: 70
        },
        to: {
            opacity: 1,
            y: 0
        },
        ease: 'CubicBezier',
        duration: 0.8,
        delay: 0
    },
    'slide-down': {
        from: {
            opacity: 0,
            y: -70
        },
        to: {
            opacity: 1,
            y: 0
        },
        ease: 'CubicBezier',
        duration: 0.8,
        delay: 0
    },
    'slide-left': {
        from: {
            opacity: 0,
            x: 70
        },
        to: {
            opacity: 1,
            x: 0
        },
        ease: 'CubicBezier',
        duration: 0.8,
        delay: 0
    },
    'slide-right': {
        from: {
            opacity: 0,
            x: -70
        },
        to: {
            opacity: 1,
            x: 0
        },
        ease: 'CubicBezier',
        duration: 0.8,
        delay: 0
    },
    'zoom-in': {
        from: {
            scale: 0.9,
            opacity: 0,
            filter: filterBlur()
        },
        to: {
            scale: 1,
            opacity: 1,
            filter: 'blur(0px)'
        },
        delay: 0,
        ease: 'CubicBezier',
        duration: 0.8
    },
    'zoom-out': {
        from: {
            scale: 1.1,
            opacity: 1,
            filter: filterBlur()
        },
        to: {
            scale: 1,
            opacity: 1,
            filter: 'blur(0px)'
        },
        delay: 0,
        ease: 'CubicBezier',
        duration: 0.8
    },
    'zoom-out-slide-right': {
        from: {
            scale: 1.1,
            opacity: 1,
            x: -70,
            filter: filterBlur()
        },
        to: {
            scale: 1,
            opacity: 1,
            x: 0,
            filter: 'blur(0px)'
        },
        delay: 0,
        ease: 'CubicBezier',
        duration: 0.8
    },
    'zoom-out-slide-left': {
        from: {
            scale: 1.1,
            opacity: 1,
            x: 70,
            filter: filterBlur()
        },
        to: {
            scale: 1,
            opacity: 1,
            x: 0,
            filter: 'blur(0px)'
        },
        delay: 0,
        ease: 'CubicBezier',
        duration: 0.8
    },
    'blur-in': {
        from: {
            opacity: 0,
            filter: filterBlur()
        },
        to: {
            opacity: 1,
            filter: 'blur(0px)'
        },
        delay: 0,
        ease: 'CubicBezier',
        duration: 0.8
    }
};

if (utils.isRTL()) {
    Object.keys(zanimationEffects).forEach(function(key) {
        if (zanimationEffects[key].from.x) {
            zanimationEffects[key].from.x = -zanimationEffects[key].from.x;
        }
    });
}

var zanimation = function zanimation(el, callback) {
    var Selector = {
        DATA_ZANIM_TIMELINE: '[data-zanim-timeline]',
        DATA_KEYS: '[data-zanim-xs], [data-zanim-sm], [data-zanim-md], [data-zanim-lg], [data-zanim-xl]'
    };
    var DATA_KEY = {
        DATA_ZANIM_TRIGGER: 'data-zanim-trigger'
    };
    /*-----------------------------------------------
     |   Get Controller
     -----------------------------------------------*/

    var controllerZanim;
    var currentBreakpointName = utils.getCurrentScreenBreakpoint().currentBreakpoint;
    var currentBreakpointVal = utils.getCurrentScreenBreakpoint().breakpointStartVal;

    var getController = function getController(element) {
        var options = {};
        var controller = {};

        if (element.hasAttribute("data-zanim-".concat(currentBreakpointName))) {
            controllerZanim = "zanim-".concat(currentBreakpointName);
        } else {
            /*-----------------------------------------------
               |   Set the mobile first Animation
               -----------------------------------------------*/
            var animationBreakpoints = [];
            var attributes = element.getAttributeNames();
            attributes.forEach(function(attribute) {
                if (attribute !== DATA_KEY.DATA_ZANIM_TRIGGER && attribute.startsWith('data-zanim-')) {
                    var breakPointName = attribute.split('data-zanim-')[1];

                    if (utils.breakpoints[breakPointName] < currentBreakpointVal) {
                        animationBreakpoints.push({
                            name: breakPointName,
                            size: utils.breakpoints[breakPointName]
                        });
                    }
                }
            });
            controllerZanim = undefined;

            if (animationBreakpoints.length !== 0) {
                animationBreakpoints = animationBreakpoints.sort(function(a, b) {
                    return a.size - b.size;
                });
                var activeBreakpoint = animationBreakpoints.pop();
                controllerZanim = "zanim-".concat(activeBreakpoint.name);
            }
        }

        var userOptions = utils.getData(element, controllerZanim);
        controller = window._.merge(options, userOptions);

        if (!(controllerZanim === undefined)) {
            if (userOptions.animation) {
                options = zanimationEffects[userOptions.animation];
            } else {
                options = zanimationEffects["default"];
            }
        }

        if (controllerZanim === undefined) {
            options = {
                delay: 0,
                duration: 0,
                ease: 'Expo.easeOut',
                from: {},
                to: {}
            };
        }
        /*-----------------------------------------------
          |   populating the controller
          -----------------------------------------------*/


        controller.delay || (controller.delay = options.delay);
        controller.duration || (controller.duration = options.duration);
        controller.from || (controller.from = options.from);
        controller.to || (controller.to = options.to);

        if (controller.ease) {
            controller.to.ease = controller.ease;
        } else {
            controller.to.ease = options.ease;
        }

        return controller;
    };
    /*-----------------------------------------------
     |   End of Get Controller
     -----------------------------------------------*/

    /*-----------------------------------------------
     |   For Timeline
     -----------------------------------------------*/


    var zanimTimeline = el.hasAttribute('data-zanim-timeline');

    if (zanimTimeline) {
        var timelineOption = utils.getData(el, 'zanim-timeline');
        var timeline = gsap.timeline(timelineOption);
        var timelineElements = el.querySelectorAll(Selector.DATA_KEYS);
        timelineElements.forEach(function(timelineEl) {
            var controller = getController(timelineEl);
            timeline.fromTo(timelineEl, controller.duration, controller.from, controller.to, controller.delay).pause();
            window.imagesLoaded(timelineEl, callback(timeline));
        });
    } else if (!el.closest(Selector.DATA_ZANIM_TIMELINE)) {
        /*-----------------------------------------------
          |   For single elements outside timeline
          -----------------------------------------------*/
        var controller = getController(el);
        callback(gsap.fromTo(el, controller.duration, controller.from, controller.to).delay(controller.delay).pause());
    }

    callback(gsap.timeline());
};
/*-----------------------------------------------
|    Zanimation Init
-----------------------------------------------*/


var zanimationInit = function zanimationInit() {
    var Selector = {
        DATA_ZANIM_TRIGGER: '[data-zanim-trigger]',
        DATA_ZANIM_REPEAT: '[zanim-repeat]'
    };
    var DATA_KEY = {
        DATA_ZANIM_TRIGGER: 'data-zanim-trigger'
    };
    var Events = {
        SCROLL: 'scroll'
    };
    /*-----------------------------------------------
     |   Triggering zanimation when the element enters in the view
     -----------------------------------------------*/

    var triggerZanimation = function triggerZanimation() {
        var triggerElement = document.querySelectorAll(Selector.DATA_ZANIM_TRIGGER);
        triggerElement.forEach(function(el) {
            if (utils.isElementIntoView(el) && el.hasAttribute(DATA_KEY.DATA_ZANIM_TRIGGER)) {
                zanimation(el, function(animation) {
                    return animation.play();
                });

                if (!document.querySelector(Selector.DATA_ZANIM_REPEAT)) {
                    el.removeAttribute(DATA_KEY.DATA_ZANIM_TRIGGER);
                }
            }
        });
    };

    triggerZanimation();
    window.addEventListener(Events.SCROLL, function() {
        return triggerZanimation();
    });
};

var gsapAnimation = {
    zanimationInit: zanimationInit,
    zanimation: zanimation
};
/* -------------------------------------------------------------------------- */

/*                            Theme Initialization                            */

/* -------------------------------------------------------------------------- */

docReady(detectorInit);
docReady(tooltipInit);
docReady(popoverInit);
docReady(toastInit);
docReady(plyrInit);
docReady(initMap);
docReady(countupInit);
docReady(scrollToTop);
docReady(swiperInit);
docReady(dropdownOnHover);
docReady(scrollbarInit);
docReady(dropdownMenuInit);
docReady(lightboxInit);
docReady(bgPlayerInit);
docReady(hamburgerInit);
docReady(zanimationInit);
docReady(inertiaInit);
docReady(preloaderInit);