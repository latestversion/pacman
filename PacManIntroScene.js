var PacManIntroScene = function(sceneHandler,canvas,gfxScale)
{
	MetaWorld.backgroundColor = "black";
	Configuration.showUI();
	ObjectHandler.call(this);
	this.canvas = canvas;
	this.ctx = canvas.getContext("2d");
	this.sceneHandler = sceneHandler;

	this.count = 0;
	this.gfxScale = gfxScale;
	
	this.tileMaster = new PacManTileLayer(PacManConstants.tileMap,this.gfxScale);
	
	var mapSize = this.tileMaster.getMapSize();
	var tileSize = this.tileMaster.getTileSize();
	
	this.canvas.width = mapSize.c*tileSize*gfxScale;
	this.canvas.height = mapSize.r*tileSize*gfxScale;
	
	this.ctx.fillStyle = "black";
	this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
	
	var sky = new StarrySky(this.canvas,5000,this.gfxScale,0);
	this.addObject(sky);
	
	var threeTilesDownY = 3*tileSize*gfxScale;
	var tileSizeInPixels = tileSize*gfxScale;
	var halfCanvasX = this.canvas.width/2;
	
	var text = "PAC MAN";
	var fontName = "PacManFont";
	var availableWidth = Math.floor(this.canvas.width*0.8);
	var fontSize = FontUtils.fontSizeAndTextWidthFromAvailableWidth(text,fontName,availableWidth).fontSize;
	var position = {x:halfCanvasX,y:threeTilesDownY};
	var text1 = new Text(this.ctx,text,fontName,fontSize,"center","top",position,"yellow");
	this.addObject(text1);
	
	text = "*** Space Trucker ***";
	fontName = FontUtils.defaultFontName;
	availableWidth = Math.floor(this.canvas.width*0.6);
	fontSize = FontUtils.fontSizeAndTextWidthFromAvailableWidth(text,fontName,availableWidth).fontSize;
	position = {x:halfCanvasX,y:threeTilesDownY+text1.getHeight()+threeTilesDownY/3};
	var text2 = new Text(this.ctx,text,fontName,fontSize,"center","top",position,"yellow");
	this.addObject(text2);
	
	var tileRowAfterText2 = this.tileMaster.tilePositionForPixelPosition({x:0,y:text2.getPosition().y+text2.getHeight()}).r;
	
	// PACMAN
	// Pacman is situated in the left half of a rectangular area called the "stage"
	// Pacman is sort of 2 tiles high. And he's like 2 tiles wide.
	// We want to enlarge pacman a number of times that is equal to pacManScale.
	var pacManScale = 3;
	var stageMargin = 3; // some space between pacman and the text would be nice
	var pacManHeightInTiles = 2;
	var pacManWidthInTiles = 2;
	var stageHeightInTiles = pacManScale*pacManHeightInTiles+stageMargin;

	var halfStageHeightInTiles = Math.floor(stageHeightInTiles/2);
	
	var halfStageWidthInTiles = Math.floor(this.tileMaster.getMapSize().c/2);
	
	var stageStartTileRow = tileRowAfterText2 + 1;
	
	var drawrect = {pos:{x:0,y:0,},width:0,height:0};
	drawrect.position = this.tileMaster.pixelPositionForTilePosition({r:stageStartTileRow,c:1}); 
	drawrect.width = halfCanvasX-tileSizeInPixels;
	drawrect.height = stageHeightInTiles*tileSizeInPixels; // I want the 
	
	var pacman = new DemoPacMan(this,drawrect);
	this.addObject(pacman);
	
	// PACMAN MONOLOGUE
	
	var pacManMonologueTile = {r:tileRowAfterText2 + halfStageHeightInTiles,c:halfStageWidthInTiles};
	var pacManMonologuePixelPosition = this.tileMaster.pixelPositionForTilePosition(pacManMonologueTile);	
	var halfStageWidthInPixels = Math.floor(halfStageWidthInTiles*this.tileMaster.tileSize*this.gfxScale);
	//var pacManRant = new PacManMonologue(game,pixelPosition,fontName,maxTextWidth,changeDelay);
	var fontName = FontUtils.defaultFontName;
	var pacManRant = new PacManMonologue(this,pacManMonologuePixelPosition,fontName,halfStageWidthInPixels,2000);
	this.addObject(pacManRant);
	
	// TEXT 3	
	
	var text3Tile = tileRowAfterText2 + stageHeightInTiles + 3;
	var text3Y = text3Tile*this.tileMaster.getTileSize()*this.gfxScale; 	
	
	text = "Press any key to play!";
	fontName = FontUtils.defaultFontName;
	availableWidth = Math.floor(this.canvas.width*0.6);
	fontSize = FontUtils.fontSizeAndTextWidthFromAvailableWidth(text,fontName,availableWidth).fontSize;
	position = {x:halfCanvasX,y:text3Y};
	var text3 = new Text(this.ctx,text,fontName,fontSize,"center","top",position,"yellow");
	this.addObject(text3);
	
	var endY = text3Y + text3.getHeight()+threeTilesDownY;
	
	this.canvas.height = endY;
	
	this.update = function()
	{
		var os = this.getObjects();
		for(var i = 0;i < os.length;i++)
		{
			os[i].update(this.ctx);
		}
		//console.log("updating");
		
	}

	this.draw = function()
	{
		var ctx = this.ctx;
		ctx.fillStyle = "black";
		ctx.fillRect(0,0,this.canvas.width,this.canvas.height);

		if(false)
		{			
			var ctx = this.ctx;
			ctx.fillStyle = "white";
			// Middle line
			ctx.fillRect(this.canvas.width/2,0,1,this.canvas.height);
			// Text 1 lines
			ctx.fillRect(0,text1.getPosition().y,this.canvas.width,1);
			ctx.fillRect(0,text1.getPosition().y+text1.getHeight(),this.canvas.width,1);
			// Text 2 lines
			ctx.fillRect(0,text2.getPosition().y,this.canvas.width,1);
			ctx.fillRect(0,text2.getPosition().y+text2.getHeight(),this.canvas.width,1);
			// Text 3 lines
			ctx.fillRect(0,text3.getPosition().y,this.canvas.width,1);
			ctx.fillRect(0,text3.getPosition().y+text3.getHeight(),this.canvas.width,1);
		}
		
		var os = this.getObjects();
		for(var i = 0;i < os.length;i++)
		{
			os[i].draw(this.canvas);
		}
	}
	
	this.keyPressed = function(key)
	{
		Configuration.hideUI();
		var gsh = new PacManGameScene(this.sceneHandler,this.canvas,this.gfxScale);
		this.sceneHandler.pushScene(gsh);
		if(Configuration.storyModeOn)
		{
			var ss = new PacManSpeakScenePreGame(this.sceneHandler,this.canvas,this.gfxScale);
			this.sceneHandler.pushScene(ss);
		}
	}
}