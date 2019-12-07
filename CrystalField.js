

function CrystalFieldController(game,model)
{
	this.game = game;
	this.model = model;
	
	this.update = function()
	{
		var p = this.game.getObjectByTag("pacman");
		var tilepos = this.game.tileMaster.tileFromPosition(p.getPosition());
		this.model.removeCrystalAt(tilepos);
	};
}

function CrystalFieldView(game,model)
{
	this.gfxScale = game.gfxScale;
	this.tileSize = game.tileMaster.getTileSize();
	this.model = model;
	
 	this.draw = function(canvas)
 	{
 		var ctx = CanvasUtils.getCtx(canvas);
 		var tileSize = this.tileSize;
 		var gfxScale = this.gfxScale;
 		
 		var map = this.model.crystalMap;
 		for(var r = 0; r < map.length;r++)
		{
			var maxCol = map[r].length;
			for(var c = 0; c < maxCol; c++)
			{
				var crystalPresent = map[r][c];
				if(crystalPresent)
				{
					var crystalSize = 1; // l.u.
					var x = (c*tileSize+tileSize/2-crystalSize/2)*gfxScale;
					var y = (r*tileSize+tileSize/2-crystalSize/2)*gfxScale;
					ctx.fillStyle = "blue";
					ctx.fillRect(x,y,gfxScale*crystalSize,crystalSize*gfxScale);
				}
			}
		}
 	};
}


function CrystalFieldModel(game)
{
	var tileMap = game.tileMaster.getMap();
	this.initialNumCrystals = 0;
	this.remainingCrystals = 0;
	this.numEaten = 0;
	this.crystalMap = [];
	
	for(var r = 0; r < tileMap.length;r++)
	{
		var maxCol = tileMap[r].length;
		this.crystalMap[r] = [];
		for(var c = 0; c < maxCol; c++)
		{
			var tileType = tileMap[r][c];
			if(0 == tileType)
			{
				this.crystalMap[r][c] = 1;
				this.initialNumCrystals++;
			}
			else
			{
				this.crystalMap[r][c] = 0;
			}
		}
	} 
	
	this.remainingCrystals = this.initialNumCrystals;
	
	this.removeCrystalAt = function(tilepos)
	{
		var r = tilepos.r;
		var c = tilepos.c;
		if(this.crystalMap[r][c])
		{
			this.crystalMap[r][c] = 0;
			this.remainingCrystals--;
			this.numEaten++;
			this.emit("crystalgone",{remaining:this.remainingCrystals,initialNum:this.initialNumCrystals,numEaten:this.numEaten});
		}
	}
}

function CrystalField(game)
{
	EventEmitter.call(this);
	GameObject.call(this);
	CrystalFieldModel.call(this,game);
	this.setTag("crystalfield");
	
	this.controller = new CrystalFieldController(game,this);
	this.view = new CrystalFieldView(game,this);	
	
	this.update = function()
	{
		this.controller.update();
	};
	
	this.draw = function(canvas)
	{
		this.view.draw(canvas);
	};
}

extend(CrystalField,EventEmitter);