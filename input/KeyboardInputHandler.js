function KeyboardInputHandler(element) {
    EventEmitter.call(this);

    // The DOM element
    this._element = element;

    this._moving = false;
    this._lastMoveCoordinates = null;
    this._moveThreshold = 10;
    this._stopDomEvents = true;
}

extend(KeyboardInputHandler, EventEmitter);

_p = KeyboardInputHandler.prototype;

_p.onKeyDown = function(e)
{
	console.log("key presseed!" + e.keyCode);
}