var LoseScene = function(sceneHandler,canvas,gfxScale)
{
	ObjectHandler.call(this);
	this.canvas = canvas;
	this.ctx = canvas.getContext("2d");
	this.sceneHandler = sceneHandler;
	this.gfxScale = gfxScale;
	
	
	var textAvailableWidth = 0.6*this.canvas.width;
	var info = {};
	info.position = {x:this.canvas.width/2,y:this.canvas.height/3};	
	info.text = "You lose";
	info.fontName = FontUtils.defaultFontName;
	info.fontSize = FontUtils.fontSizeAndTextWidthFromAvailableWidth(info.text,info.fontName,textAvailableWidth).fontSize;
	info.font = info.fontSize + "pt " + info.fontName;
	
	this.textInfo = info;  
	
	var sky = new StarrySky(this.canvas,5000,this.gfxScale,0);
	this.addObject(sky);

	this.update = function()
	{
		
	}
	
	this.draw = function()
	{
		var ctx = this.ctx;
		ctx.fillStyle = "black";
		ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
		
		var os = this.getObjects();
		for(var i = 0;i < os.length;i++)
		{
			os[i].draw(this.canvas);
		}
		
		ctx.font = this.textInfo.font;
		ctx.fillStyle = "yellow";
		ctx.textAlign = "center";
		ctx.fillText(this.textInfo.text, this.textInfo.position.x, this.textInfo.position.y);
	}

	this.keyPressed = function(key)
	{
		console.log("JEEYEYEY KEYPRESSS");
		restartTheGame();
	}
	
}