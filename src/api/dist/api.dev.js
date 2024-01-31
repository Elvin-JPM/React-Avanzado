"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postData = postData;
exports.getData = getData;
exports.deleteData = deleteData;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var BASE_URL = "http://127.0.0.1:3001/api";

function postData(endpoint, requestBody, headers) {
  var body, response;
  return regeneratorRuntime.async(function postData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          body = requestBody;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(_axios["default"].post(BASE_URL + endpoint, body, {
            headers: headers
          }));

        case 4:
          response = _context.sent;
          return _context.abrupt("return", response);

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](1);
          console.error("Error fetching data:", _context.t0);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 8]]);
}

function getData(endpoint, requestHeaders) {
  var headers, response;
  return regeneratorRuntime.async(function getData$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          headers = requestHeaders;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(_axios["default"].get(BASE_URL + endpoint, headers));

        case 4:
          response = _context2.sent;
          return _context2.abrupt("return", response.data);

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](1);
          console.error("Error fetching data:", _context2.t0);

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 8]]);
}

function deleteData(endpoint, requestHeaders) {
  var headers, response;
  return regeneratorRuntime.async(function deleteData$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          headers = requestHeaders;
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(_axios["default"]["delete"](BASE_URL + endpoint, headers));

        case 4:
          response = _context3.sent;
          return _context3.abrupt("return", response.data);

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](1);
          console.error("Error deleting data:", _context3.t0);

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 8]]);
}