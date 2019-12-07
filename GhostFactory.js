function blinkyChaseTargetTileCallback(game)
{
	var p = game.getObjectByTag("pacman");
	return game.tileMaster.tileFromPosition(p.getPosition());
}

function pinkyChaseTargetTileCallback(game)
{
	var p = game.getObjectByTag("pacman");
	var d = game.tileMaster.deltaSignsForDirection(p.getDirection());
	var pTile = game.tileMaster.tileFromPosition(p.getPosition());
	var targetTile = {r:pTile.r+4*d.r,c:pTile.c+4*d.c};
	return targetTile;
}

function inkyChaseTargetTileCallback(game)
{
	var p = game.getObjectByTag("pacman");
	var d = game.tileMaster.deltaSignsForDirection(p.getDirection());
	var pTile = game.tileMaster.tileFromPosition(p.getPosition());
	var refTile = {r:pTile.r+2*d.r,c:pTile.c+2*d.c};
	
	var blinky = game.getObjectByTag("blinky");
	var blinkyTile = game.tileMaster.tileFromPosition(blinky.getPosition());
	
	var dr = refTile.r - blinkyTile.r;
	var dc = refTile.c - blinkyTile.c;
	
	var targetTile = {r:refTile.r + dr,c:refTile.c+dc}  	
	
	return targetTile;
}

function clydeChaseTargetTileCallback(game)
{
	var pacman = game.getObjectByTag("pacman");
	var pacmanTile = game.tileMaster.tileFromPosition(pacman.getPosition());
	var clyde = game.getObjectByTag("clyde");
	var clydeTile = game.tileMaster.tileFromPosition(clyde.getPosition());	
	
	var distance = game.tileMaster.distanceBetweenTiles(pacmanTile,clydeTile);
	if(distance > 8)
	{
		return pacmanTile;
	}
	
	return clyde.controller.scatterTargetTile;
}

var GhostData = 
{
	blinky:
	{
		scatterTargetTile : {r:0,c:0},
		color : "red",
		tile : {r:14,c:13},
		dir : Tiles.directions.EAST,
		nextDir : Tiles.directions.EAST,
		chaseTargetTileCallback: blinkyChaseTargetTileCallback
	},
	pinky:
	{
		scatterTargetTile : {r:0,c:0},
		color : "pink",
		tile : {r:17,c:18},
		dir : Tiles.directions.NORTH,
		nextDir : Tiles.directions.SOUTH,
		chaseTargetTileCallback: pinkyChaseTargetTileCallback
	},
	inky:
	{
		scatterTargetTile : {r:0,c:0},
		color : "cyan",
		tile : {r:20,c:13},
		dir : Tiles.directions.WEST,
		nextDir : Tiles.directions.WEST,
		chaseTargetTileCallback: inkyChaseTargetTileCallback
	},
	clyde:
	{
		scatterTargetTile : {r:100,c:-1},
		color : "orange",
		tile : {r:17,c:9},
		dir : Tiles.directions.WEST,
		nextDir : Tiles.directions.WEST,
		chaseTargetTileCallback: clydeChaseTargetTileCallback
	},
	ghostNames:["blinky","pinky","inky","clyde"]
}

var GhostFactory = 
{
	produce: function(game,name,frozen)
	{
		switch(name)
		{
			case "blinky":
			case "pinky":
			case "inky":
			case "clyde":
				var ghostdata = GhostData[name];
				var gd = ghostdata;
		 
				var tileMaster = game.tileMaster;
				var position = tileMaster.centerForTileInUnitLengths(gd.tile.r,gd.tile.c);
				
				var g; 
				
				if(frozen)
				{
					g = new FrozenGhost(game,position,gd.color);
				}
				else
				{
					g = new Ghost(game,gd.color,gd.scatterTargetTile,gd.chaseTargetTileCallback,position,gd.dir,gd.nextDir);
				}
				g.setTag(name);
				return g;
			break;
			default:
				throw "unknown ghost name " + name;
			break;
		}
	}
}