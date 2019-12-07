var PacManLoadScene = function(sceneHandler,canvas,gfxScale)
{
	ObjectHandler.call(this);
	MetaWorld.backgroundColor = "white";
	Configuration.hideUI();
	this.sceneHandler = sceneHandler;
	this.canvas = canvas;
	this.ctx = canvas.getContext("2d");
	this.gfxScale = gfxScale;
	this.color = "red";
	this.tileMaster = new PacManTileLayer(PacManConstants.tileMap,gfxScale);
	
	this.tileMaster.adjustCanvasToMapSize(canvas);
	
	this.states = {};
	this.states.INIT = -1;
	this.states.APPEARING = 0;
	this.states.TEXTING = 2;
	this.states.WAIT1 = 3;
	this.states.WAIT2 = 4;
	this.state = this.states.INIT;
	
	this.startLoadingAssets = function()
	{
		var ctx = this.ctx;
		ctx.font = '8px PacManFont';
		ctx.fillText('Rebecka', 0, 270);
		ctx.font = '8px CommodoreFont';
		ctx.fillText('is the cutie', 1, 1);
	}
	
	this.startLoadingAssets();
	
	var tilePixelSize = this.tileMaster.getTilePixelSize();
	var yOffset = 3*tilePixelSize;
	var gfxRect = {position:{x:this.canvas.width/2,y:yOffset},width:this.canvas.width,height:3*yOffset};
	this.gfxRect = gfxRect;

	var text = "SYSTEM OK";
	var ctx = this.ctx;
	var fontName = FontUtils.defaultFontName;
	var availableWidth = 0.5*this.canvas.width;
	var fontSize = FontUtils.fontSizeAndTextWidthFromAvailableWidth(text,fontName,availableWidth).fontSize;
	var align = "center";
	var baseline = "top";
	var position = {x:this.canvas.width/2,y:yOffset+gfxRect.height+tilePixelSize};
	var color = this.color;
	
	this.okTextObject = new Text(ctx,text,fontName,fontSize,align,baseline,position,color);
	
	ctx.fillStyle = "white";
	ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
	
	this.update = function()
	{
		switch(this.state)
		{
			case this.states.INIT:
				var appearTime = 3200;
				var appearThing = new AppearingRetroThing(this,this.color,appearTime,this.gfxRect);
				this.addObject(appearThing);
				this.appearThing = appearThing;
				this.state = this.states.APPEARING;
			break;
			case this.states.APPEARING:
				if(this.appearThing.hasAppeared())
				{
					this.state = this.states.WAIT1;
				}
				else
				{
					this.appearThing.update();
				}
			break;
			case this.states.WAIT1:
				var d = new Date();
				var t = d.getTime();
				
				if(!this.waitStart)
				{
					this.waitStart = t;
					this.waitDelay = 500;
				}
				else
				{
					if(this.waitStart+this.waitDelay < t)
					{
						this.waitStart = 0;
						this.state = this.states.TEXTING;
					}
				}
			break;
			case this.states.TEXTING:
				this.okTextObject.draw(this.canvas);
				this.state = this.states.WAIT2;
			break;
			case this.states.WAIT2:
				var d = new Date();
				var t = d.getTime();
				
				if(!this.waitStart)
				{
					this.waitStart = t;
					this.waitDelay = 1500;
				}
				else
				{
					if(this.waitStart+this.waitDelay < t)
					{
						var gsh = new PacManIntroScene(this.sceneHandler,this.canvas,this.gfxScale);
						this.sceneHandler.pushScene(gsh);
					}
				}
			break;
		}
	}
	
	this.update = this.update.bind(this);
	
	this.draw = function()
	{
		var os = this.getObjects();
		for(var i = 0;i < os.length;i++)
		{
			os[i].draw(this.canvas);
		}

	}
	
	this.keyPressed = function(){};

}