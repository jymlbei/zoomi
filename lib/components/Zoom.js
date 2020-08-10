'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactIdSwiper = require('react-id-swiper');

var _reactIdSwiper2 = _interopRequireDefault(_reactIdSwiper);

var _antd = require('antd');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Zoom = function (_React$Component) {
    _inherits(Zoom, _React$Component);

    function Zoom(props) {
        _classCallCheck(this, Zoom);

        var _this = _possibleConstructorReturn(this, (Zoom.__proto__ || Object.getPrototypeOf(Zoom)).call(this, props));

        _this.initUrl = function () {
            var _this$props = _this.props,
                url = _this$props.url,
                show = _this$props.show;

            if (typeof url === 'string') {
                // 单个变量
                var temp = url;
                url = [];
                url.push({ url: temp });
            } else if (url && url.constructor === Array) {
                // 数组
                url = url.map(function (v, k) {
                    var db = { url: v };
                    return db;
                });
            } else if (url === null) {
                url = [];
            }
            var cw = document.documentElement.clientWidth;
            var ch = document.documentElement.clientWidth;
            !show ? url && url.map(function (v, k) {
                var img_url = '' + v.url;
                var img = new Image();
                img.src = img_url;
                img.onload = function () {
                    if (img.width > img.height) {
                        v.h = "auto";
                        v.w = cw * 0.5;
                    } else {
                        v.h = ch * 0.5;
                        v.w = "auto";
                    }
                    k === url.length - 1 ? _this.setState({ url: url }) : null;
                    return v;
                };
                return v;
            }) : null;
            // this.setState({url:url});
        };

        _this.showPic = function () {
            _this.setState({ show: true });
        };

        _this.handleClose = function (e) {
            if (e.target.className.indexOf('closeBox') !== -1) {
                // 点击了区域外围
                _this.setState({ show: false });
            }
        };

        _this.state = {
            show: false,
            url: ''
        };
        return _this;
    }

    _createClass(Zoom, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.initUrl();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.initUrl();
        }
        // 初始化数据

    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _state = this.state,
                show = _state.show,
                url = _state.url;

            show ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'auto';
            var params = {
                pagination: {
                    el: '.swiper-pagination',
                    type: 'bullets',
                    clickable: true
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },
                spaceBetween: 30
            };
            return _react2.default.createElement(
                'div',
                null,
                url ? url.constructor === Array ? _react2.default.createElement(
                    'div',
                    null,
                    url && url.map(function (v, k) {
                        return _react2.default.createElement(
                            'div',
                            { key: v + k, style: { position: 'relative', display: 'inline-block', marginTop: '10px' } },
                            _react2.default.createElement('img', { src: v.url, alt: '', onClick: _this2.showPic }),
                            _this2.props.del ? _react2.default.createElement(
                                'span',
                                { style: styles.close, onClick: function onClick(e) {
                                        return _this2.props.close(k);
                                    } },
                                'X'
                            ) : null
                        );
                    })
                ) : _react2.default.createElement(_antd.Spin, { indicator: _react2.default.createElement(_antd.Icon, { type: 'loading', spin: true }) }) : null,
                show ? _react2.default.createElement(
                    'div',
                    { style: styles.div, onClick: function onClick(e) {
                            return _this2.handleClose(e);
                        } },
                    _react2.default.createElement(
                        _reactIdSwiper2.default,
                        params,
                        url && url.map(function (v, k) {
                            return _react2.default.createElement(
                                'div',
                                { style: styles.slide, key: v + k + 1, className: 'closeBox' },
                                _react2.default.createElement('img', { src: v.url, alt: '', style: {
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        height: v.h,
                                        width: v.w
                                    } })
                            );
                        })
                    )
                ) : null
            );
        }
    }]);

    return Zoom;
}(_react2.default.Component);

Zoom.defaultProps = {
    url: '', //单张图片或者数组
    del: false // 是否有删除按钮
};
exports.default = Zoom;

var styles = {
    div: {
        position: 'fixed',
        background: 'rgba(0,0,0,.5)',
        overflow: 'hidden',
        zIndex: '9999',
        height: '100vh',
        width: '100%',
        left: '0',
        top: '0'
    },
    slide: {
        height: '100vh',
        width: '60vw',
        margin: '0 auto'
    },
    img: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    close: {
        position: 'absolute',
        top: '-14px',
        right: '0',
        color: 'red',
        cursor: 'pointer',
        fontSize: '20px'
    }
};