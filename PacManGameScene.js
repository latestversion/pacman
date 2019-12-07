function PacManGameScene(sceneHandler,canvas,gfxScale)
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
	
	var sky = new StarrySky(this.canvas,5000,this.gfxScale,0.5);
	this.stars = sky;

	var crystals = new CrystalField(this);
	this.addObject(crystals);

	var pos = this.tileLayer.centerForTileInUnitLengths(4,1);	
	var p = new PacMan(this,"yellow",pos,this.tileMaster.directions.EAST);
	this.player = p;
	this.addObject(p);

	var frozen = true;
	var g = GhostFactory.produce(this,"blinky",true);
	this.addObject(g);
	var g = GhostFactory.produce(this,"pinky",true);
	this.addObject(g);
	var g = GhostFactory.produce(this,"inky",true);
	this.addObject(g);
	var g = GhostFactory.produce(this,"clyde",true);
	this.addObject(g);
	
	var gt = new TransitionControl(this);
	this.addObject(gt);
	
	var t = new Teleporter(this);
	var entranceTile1 = {r:17,c:3};
	var entranceTile2 = {r:17,c:24};
	t.addEntrance(new TeleporterEntrance(entranceTile1,Tiles.directions.WEST,entranceTile2));
	t.addEntrance(new TeleporterEntrance(entranceTile2,Tiles.directions.EAST,entranceTile1));
	this.addObject(t);
	
	this.update = function()
	{
		this.stars.update();
		var os = this.getObjects();
		for(var i = 0;i < os.length;i++)
		{
			os[i].update(this.ctx);
		}
	}
	
	this.layerSort = function(o1,o2)
	{
		return o1.getLayer()- o2.getLayer();
	}
	
	this.draw = function()
	{
		// Stars
		this.ctx.fillStyle = "black";
		this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
		
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

	}
	
	this.keyPressed = function(key)
	{
		var arrowKeysOffset = 37;
		var dir = key-arrowKeysOffset;
		if(Tiles.isLegitDirection(dir))
		{
			this.emit("playerwantstomove",dir);
		}
	}
	
	this.sceneHandler.on("keypress",this.keyPressed.bind(this));
}

extend(PacManGameScene,EventEmitter);