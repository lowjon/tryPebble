/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var rocky = __webpack_require__(2);

	// An object to cache our date & time values,
	// to minimize computations in the draw handler.
	var clockData = {
	  time: '',
	  date: ''
	};

	// Every minute
	// https://developer.pebble.com/docs/rockyjs/rocky/#on
	rocky.on('minutechange', function(event) {
	  // Current date/time
	  // https://developer.pebble.com/docs/rockyjs/Date/
	  var d = event.date;

	  // Get current time, based on 12h or 24h format (01:00 or 1:00 AM)
	  clockData.time = d.toLocaleTimeString().replace(/:\d+($| )/, '$1');

	  // Day of month
	  var day = d.toLocaleDateString(undefined, ({day: 'numeric'}));

	  // Month name
	  var month = d.toLocaleDateString(undefined, ({month: 'long'}));

	  // Date
	  clockData.date = (day + ' ' + month);

	  // Force screen redraw
	  rocky.requestDraw();
	});

	// Redraw the screen
	rocky.on('draw', function(event) {
	  // Drawing canvas
	  var ctx = event.context;

	  // Clear the canvas
	  // https://developer.pebble.com/docs/rockyjs/CanvasRenderingContext2D/#Canvas
	  ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);

	  // UnobstructedArea
	  // https://developer.pebble.com/docs/rockyjs/CanvasRenderingContext2D/#Canvas
	  var offsetY = (ctx.canvas.clientHeight - ctx.canvas.unobstructedHeight) / 2;
	  var centerX = ctx.canvas.unobstructedWidth / 2;

	  // Text formatting
	  ctx.fillStyle = 'white';
	  ctx.textAlign = 'center';

	  // Time font
	  // https://developer.pebble.com/docs/rockyjs/CanvasRenderingContext2D/#font
	  ctx.font = '26px bold Leco-numbers-am-pm';

	  // Time
	  ctx.fillText(clockData.time, centerX, (66 - offsetY));

	  // Date font
	  ctx.font = '18px bold Gothic';

	  // Date
	  ctx.fillText(clockData.date, centerX, (94 - offsetY));
	});


	// Send a single message to the Phone
	// https://developer.pebble.com/docs/rockyjs/rocky/#postMessage
	rocky.postMessage("This arrives on the phone via bluetooth!");


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = _rocky;


/***/ }
/******/ ]);