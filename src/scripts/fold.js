/*
 * The original code uses AMD and can be 
 * found here:
 * https://github.com/MathiasPaumgarten/spread
 */

var container = null;
var orientation = {
	TOP: 0,
	RIGHT: 1,
	BOTTOM: 2,
	LEFT: 3
}

var options = {
	tileSize: 100,
	color: "#4fb0ca",
	randomColor: true
}

function r_color() {
  //var colors = {'#828953':7, '#626948':7, '#A7A65B':7, '#8D814A':7, '#AA552E':1, '#444444':2};
  var colors = {'#C2CCEF':7, '#94744E':1, '#D4A594':7, '#4D3F3E':1, '#444444':1};

  var chanceArray = []
  for (var color in colors) {
    if (Object.prototype.hasOwnProperty.call(colors, color)) {
      for (var i=0; i<colors[color]; i++) {
        chanceArray.push(color);
      }
    }
  }

  var index = chanceArray.length * Math.random();
  return chanceArray[Math.floor(index)];
}

var random = function( min, max ) {
	return min + Math.random() * ( max - min );
}

var Tile = function( x, y, color, onComplete ) {

	var div, inlay, cover;
	var neighbors = [];
	var isShown = false;

	function initUI() {

		div = document.createElement( "div" );
		div.className = "tile";
		div.style.width = options.tileSize + "px";
		div.style.height = options.tileSize + "px";
		div.style.top = y * options.tileSize + "px";
		div.style.left = x * options.tileSize + "px";

		inlay = document.createElement( "div" );
    inlay.className = "inlay";
    if (options.randomColor) {
      inlay.style.backgroundColor = r_color();
    } else {
      inlay.style.backgroundColor = options.color;
    }

		cover = document.createElement( "div" );
		cover.className = "cover";

		div.appendChild( inlay );
		inlay.appendChild( cover );

	}

	// ------
	// PUBLIC
	// ------

	this.isShown = function() {
		return isShown;
	}

	this.getElement = function() {
		return div;
	}

	this.addNeighbor = function( direction, neighbor ) {
		neighbors[ direction ] = neighbor;
	}

	this.fromTop = function() {
		div.classList.add( "from-top" );
		show();
	}

	this.fromBottom = function() {
		div.classList.add( "from-bottom" );
		show();
	}

	this.fromRight = function() {
		div.classList.add( "from-right" );
		show();
	}

	this.fromLeft = function() {
		div.classList.add( "from-left" );
		show();
	}

	function onTransitionEnd() {

		for ( var i = 0; i < neighbors.length; i++ ) {

			if ( neighbors[ i ] && ! neighbors[ i ].isShown() ) {

				neighbors[ i ][ getFunctionName( i ) ]();

				setTimeout( onTransitionEnd, random( 10, 200 ) );
				break;

			}

		}

	}

	// -------
	// PRIVATE
	// -------

	function getFunctionName( index ) {
		return [ "fromBottom", "fromLeft", "fromTop", "fromRight" ][ index ];
	}

	function show() {
		isShown = true;

		setTimeout( function() {

			inlay.classList.add( "show" );

			setTimeout( onTransitionEnd, random( 200, 300 ) );
			setTimeout( onComplete, 300 );

		}, 50 );
	}

	initUI();

}

var Controller = function( container, size, position ) {

	var width = Math.ceil( size.width / options.tileSize );
	var height = Math.ceil( size.height / options.tileSize );
	var tiles = [];
	var onComplete = null;
	var completeCount = 0;
	var tileColor = options.color;

	function init() {
		fillScreen();
		snowball();
	}

	// ------
	// PUBLIC
	// ------

	this.onComplete = function( closure ) {
		onComplete = closure
	}

	this.getColor = function() {
		return tileColor;
	}

	// -------
	// PRIVATE
	// -------

	function fillScreen() {

		var tile;
		var length = width * height;

		for ( var y = 0; y < height; y++ ) {
			for ( var x = 0; x < width; x++ ) {

				tile = new Tile( x, y, tileColor, tileComplete );

				container.appendChild( tile.getElement() );

				tiles.push( tile );

			}
		}

		for ( var i = 0; i < length; i++ ) {

			tile = tiles[ i ];
			var row = ~~( i / width );
			var col = i % width;

			if ( col < width - 1 )
				tile.addNeighbor( orientation.RIGHT, tiles[ i + 1 ] );

			if ( col > 0 )
				tile.addNeighbor( orientation.LEFT, tiles[ i - 1 ] );

			if ( row > 0 )
				tile.addNeighbor( orientation.TOP, tiles[ i - width ] );

			if ( row < height - 1 )
				tile.addNeighbor( orientation.BOTTOM, tiles[ i + width ] );
		}
	}

	function snowball() {
    
		var row = ~~( position.y / options.tileSize );
		var col = ~~( position.x / options.tileSize );
    
		tiles[ col + row * width ].fromTop();
	}

	function tileComplete() {
		completeCount++;

		if ( completeCount === tiles.length && onComplete ) {
			onComplete();
		}
	}

	init();

}

function initListeners() {

	container.addEventListener( "click", onClick, false );
	container.addEventListener( "touchstart", onTouchEnd, false );

}

function onClick( event ) { 

	var div = document.createElement( "div" );

	var size = {
		width: window.innerWidth,
		height: window.innerHeight
	}

	var position = {
		x: event.pageX,
		y: event.pageY
	}

  div.classList.add("tiles");
	var controller = new Controller( div, size, position );

	controller.onComplete( function() {
    div.classList.add("tiles-done");
    while (window.$('.tiles-done').length > 1) {
      window.$('.tiles-done')[0].remove();
    }

	} );

	container.appendChild( div );

}

function onTouchEnd( event ) {

	var touch = event.touches[ 0 ];

	event.pageX = touch.pageX;
	event.pageY = touch.pageY;

	onClick( event );
}

function start() {
  container = document.getElementById( "foldable" );
  var event = {
    pageX: window.innerWidth / 2,
    pageY: window.innerHeight / 2
  }
  
  onClick( event );
}


var fold = {
  init(id, startDelay = 1000) {
    container = document.getElementById(id);
    initListeners();
    setTimeout(start, startDelay);
  }
}

export default fold;