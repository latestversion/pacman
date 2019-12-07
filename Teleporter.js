

function TeleporterEntrance(enterTile,enterDirection,exitTile)
{
	this.enterTile = enterTile;
	this.enterDirection = enterDirection;
	this.exitTile = exitTile;
	
	console.log("teleprot entracne " + enterTile + " " + enterDirection + " " + exitTile);
}

function TeleporterController(game,model)
{
	this.game = game;
	this.model = model;
	
	this.update = function()
	{
		var game = this.game;
		var tileMaster = game.tileMaster;
		var os = game.getObjects();
		var es = this.model.entrances;
		
		for(var i = 0; i < os.length;i++)
		{
			var o = os[i];
			
			for(var j = 0; j < es.length; j++)
			{
				var e = es[j];
				if(e.enterDirection == o.getDirection())
				{

					var objectTile = tileMaster.tileFromPosition(o.getPosition());
					if(e.enterTile.r == objectTile.r && e.enterTile.c == objectTile.c)
					{
						console.log("teleporting!! " + e.exitTile.r);
						var newPos = tileMaster.centerForTileInUnitLengths(e.exitTile.r,e.exitTile.c);
						console.log("the new pos : " + newPos.r + " " + newPos.c);
						o.setPosition(newPos);						
					}
				}
			}			
		}
		
	}
}

function TeleporterModel(game)
{
	
}

function TeleporterView(game,model)
{
	this.game = game;
	this.model = model;
	this.gfxScale =game.gfxScale;
	this.tileSize = game.tileMaster.getTileSize();
	
	this.draw = function(canvas)
	{
		var ctx = CanvasUtils.getCtx(canvas);
		entrances = this.model.entrances;
		ctx.save();
		ctx.globalAlpha = 0.5;
		ctx.fillStyle = ("AAAAFF");
		var tileSizeInPixels = this.tileSize*this.gfxScale;
		for(var i = 0; i < entrances.length; i++)
		{
			var e = entrances[i];
			var pos = e.enterTile;
			var pp = this.game.tileMaster.pixelPositionForTilePosition(pos);
			ctx.fillRect(pp.x,pp.y,tileSizeInPixels,tileSizeInPixels);
		}
		ctx.restore();
	}
}

function Teleporter(game)
{
	GameObject.call(this);
	this.controller = new TeleporterController(game,this);
	this.view = new TeleporterView(game,this);
	this.entrances = [];
	
	this.addEntrance = function(entrance)
	{
		this.entrances.push(entrance);
	}
	
	this.update = function()
	{
		this.controller.update();
	}
	
	this.draw = function(canvas)
	{
		this.view.draw(canvas);
	}
}