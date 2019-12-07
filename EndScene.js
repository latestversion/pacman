var EndScene = function(sceneHandler,canvas,gfxScale)
{
	ObjectHandler.call(this);
	this.canvas = canvas;
	this.ctx = canvas.getContext("2d");
	this.sceneHandler = sceneHandler;
	this.actor = actor;
	this.texts = texts;
	this.gfxScale = gfxScale;
	this.textInfo = {};
	
	this.tileMaster = new PacManTileLayer(PacManConstants.tileMap,this.gfxScale);
	
	var availableWidth = 0.6*this.canvas.width;

	var referenceText  = "You win";
	var fontName = FontUtils.defaultFontName;
	var dimensionsInfo = FontUtils.fontSizeAndTextWidthFromAvailableWidth(referenceText,fontName,textAvailableWidth);
	var fontSize = dimensionsInfo.fontSize;
	var textHeight = FontUtils.textHeightFromFontSize(fontName,fontSize); 
	
	var textPosition = {x:this.canvas.width/2,y:this.canvas.height/2};
	
	info = this.textInfo;
	info.position = textPosition;
	info.availableWidth = textAvailableWidth;
	info.textHeight = textHeight;
	info.fontSize = fontSize;
	info.fontName = fontName;
	info.font = info.fontSize + "pt " + info.fontName;
	info.text = referenceText;  
	
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
		
		ctx.fillStyle = "yellow";
		ctx.textAlign = "center";
		ctx.fillText(this.textInfo.text, this.textInfo.position.x, this.textInfo.position.y);
	}

	this.keyPressed = function(key)
	{
		var ESC_KEY = 27;
		var t = this.texts.shift();
		

		//this.sceneHandler.popScene();

	}
	
}
