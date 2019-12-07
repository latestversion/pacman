function WinScene(sceneHandler,canvas,gfxScale)
{
	ObjectHandler.call(this);
	EventEmitter.call(this);
	
	this.sceneHandler = sceneHandler;
	this.canvas = canvas;
	this.ctx = canvas.getContext("2d");

	this.pixelsPerUnitLength = gfxScale;
	this.gfxScale = gfxScale;
	
	this.tileLayer = new PacManTileLayer(PacManConstants.tileMap,gfxScale);
	this.tileMaster = this.tileLayer;
	
	var mapSize = this.tileMaster.getMapSize();
	var tileSize = this.tileMaster.getTileSize();
	
	this.canvas.width = mapSize.c*tileSize*gfxScale;
	this.canvas.height = mapSize.r*tileSize*gfxScale;
	
	var sky = new StarrySky(this.canvas,5000,this.gfxScale,0.3);
	this.stars = sky;


	var frozen = true;
	var g = GhostFactory.produce(this,"blinky",true);
	this.addObject(g);
	var g = GhostFactory.produce(this,"pinky",true);
	this.addObject(g);
	var g = GhostFactory.produce(this,"inky",true);
	this.addObject(g);
	var g = GhostFactory.produce(this,"clyde",true);
	this.addObject(g);

	
	var t = new Teleporter(this);
	var entranceTile1 = {r:17,c:3};
	var entranceTile2 = {r:17,c:24};
	t.addEntrance(new TeleporterEntrance(entranceTile1,Tiles.directions.WEST,entranceTile2));
	t.addEntrance(new TeleporterEntrance(entranceTile2,Tiles.directions.EAST,entranceTile1));
	this.addObject(t);
	
	
	var textAvailableWidth = 0.6*this.canvas.width;
	var info = {};
	info.position = {x:this.canvas.width/2,y:this.canvas.height/3};	
	info.text = "You win!";
	info.fontName = FontUtils.defaultFontName;
	info.fontSize = FontUtils.fontSizeAndTextWidthFromAvailableWidth(info.text,info.fontName,textAvailableWidth).fontSize;
	info.font = info.fontSize + "pt " + info.fontName;
	
	this.textInfo = info; 

	
	this.update = function()
	{
		this.stars.update();
		var os = this.getObjects();
		for(var i = 0;i < os.length;i++)
		{
			os[i].update(this.ctx);
		}
	}
	
	this.draw = function()
	{
		var ctx = this.ctx;
		// Stars
		ctx.fillStyle = "black";
		ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
		
		// Stars
		this.stars.draw(this.canvas);
		
		// Tiles
		this.tileLayer.draw(this.ctx);
		
		// Objects
		var os = this.getObjects();
		for(var i = 0;i < os.length;i++)
		{
			os[i].draw(this.canvas);
		}
		
		ctx.globalAlpha = 0.4;
		
		ctx.fillStyle = "black";
		ctx.fillRect(0,0,this.canvas.width,this.canvas.height);		
		
		ctx.globalAlpha = 1;		
		
		ctx.font = this.textInfo.font;
		ctx.fillStyle = "yellow";
		ctx.textAlign = "center";
		ctx.fillText(this.textInfo.text, this.textInfo.position.x, this.textInfo.position.y);
		
	}
	
	this.keyPressed = function(key)
	{
		restartTheGame();
	}
	
	this.sceneHandler.on("keypress",this.keyPressed.bind(this));
}
