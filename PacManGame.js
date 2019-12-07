

var dejavu = false;

var PacManGame = function(canvas)
{
	EventEmitter.call(this);
	SceneHandler.call(this);

	gfxScale = Configuration.gfxScale;
	
	this.animationFrameRequestId = 0;
			
	var w = PacManConstants.tileMap[0].length*PacManConstants.unitLengthsPerTile*gfxScale;
	var h = PacManConstants.tileMap.length*PacManConstants.unitLengthsPerTile*gfxScale;
	canvas.width = w;
	canvas.height = h;

	var firstScene = null;
	
	if(!dejavu)
	{
		firstScene = new PacManLoadScene(this,canvas,gfxScale);
		dejavu = true;
	}
	else
	{
		firstScene = new PacManIntroScene(this,canvas,gfxScale);
	}
	
	this.pushScene(firstScene);
	
	this.update = function()
	{
		this.getCurrentScene().update();
		this.getCurrentScene().draw();
		requestAnimationFrame(this.update);
	}
	
	this.update = this.update.bind(this);
	
	this.onKeyPressed = function(e)
	{
		switch(e.keyCode)
		{
			case 37: case 39: case 38:  case 40: // Arrow keys
			case 32: e.preventDefault(); break; // Space
			default: break; // do not block other keys
		}
		this.getCurrentScene().keyPressed(e.keyCode);
	}
	document.onkeydown = this.onKeyPressed.bind(this);
	
	this.start = function()
	{
		this.animationFrameRequestId = requestAnimationFrame(this.update);
	}
	
	this.stop = function()
	{
		cancelAnimationFrame(this.animationFrameRequestId);
	}
}

extend(PacManGame,EventEmitter);
