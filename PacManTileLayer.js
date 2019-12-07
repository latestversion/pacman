function PacManTileLayer(tileMap,gfxScale)
{
	this.gfxScale = gfxScale;
	this.tileSize = 8;
	
	this.tileMap = tileMap;
	this.mapSize = {r:tileMap.length,c:tileMap[0].length};
	this.tileDrawer = new TileDrawer();
	
	this.directions = {};
	this.directions.EAST = 2;
	this.directions.SOUTH = 3;
	this.directions.WEST = 0;
	this.directions.NORTH = 1;
	this.directions.NODIRECTION = 4;
	
	this.draw = function(ctx)
	{
		var data = this.tileMap;
		var elemSize = this.tileSize*this.gfxScale;

		// And what follows is an optimization. Sort of.
		// I'm hardcoding knowledge about the tile map into these reset routines
		// because it took forever drawing a black rectangle on very tile... :P
		
		ctx.fillStyle = "black";
		
		var fromRow = 10; var fromCol = 5; var numRows = 3; var numCols = 0;
		ctx.fillRect(fromCol*elemSize,fromRow*elemSize,numCols*elemSize,numRows*elemSize);
		
		var fromRow = 3; var fromCol = 0; var numRows = 10; var numCols = 28;
		ctx.fillRect(fromCol*elemSize,fromRow*elemSize,numCols*elemSize,numRows*elemSize);
		var fromRow = 13; var fromCol = 5; var numRows = 3; var numCols = 18;
		ctx.fillRect(fromCol*elemSize,fromRow*elemSize,numCols*elemSize,numRows*elemSize);
		
		var fromRow = 16; var fromCol = 0; var numRows = 3; var numCols = 28;
		ctx.fillRect(fromCol*elemSize,fromRow*elemSize,numCols*elemSize,numRows*elemSize);
		
		var fromRow = 19; var fromCol = 5; var numRows = 3; var numCols = 18;
		ctx.fillRect(fromCol*elemSize,fromRow*elemSize,numCols*elemSize,numRows*elemSize);

		var fromRow = 22 ; var fromCol = 0; var numRows = 12; var numCols = 28;
		ctx.fillRect(fromCol*elemSize,fromRow*elemSize,numCols*elemSize,numRows*elemSize);
					
		for(var r = 0; r < data.length;r++)
		{
			var maxCol = data[r].length;
			for(var c = 0; c < maxCol; c++)
			{
				var tiletype = data[r][c];
				
				if(tiletype > -1)
				{
					this.tileDrawer.draw(ctx,tiletype,{r:r,c:c},this.gfxScale);
				}
			}
		}
	}
	
	this.getMap = function()
	{
		return this.tileMap;
	}
	
	this.getMapSize = function()
	{
		return this.mapSize;
	}
	
	this.getTileSize = function()
	{
		return this.tileSize;
	}
	
	this.getTilePixelSize = function()
	{
		return this.getTileSize()*this.gfxScale;
	}
	
	this.centerForATileInUnitLengths = function()
	{
		return {r:5,c:4};
	}
	
	this.centerForTileInUnitLengths = function(tilerow,tilecol)
	{
		center = this.centerForATileInUnitLengths();
		return {r:tilerow*this.tileSize+center.r,c:tilecol*this.tileSize+center.c};
	}
	
	this.getReverseDirection = function(dir)
	{
		var dirs = this.directions;
		if(dir == dirs.EAST)
		{
			return dirs.WEST;
		}
		
		if(dir == dirs.WEST)
		{
			return dirs.EAST;
		}
		
		if(dir == dirs.NORTH)
		{
			return dirs.SOUTH;
		}
		
		return dirs.NORTH;
		
		throw "Unknown direction in TileLayer!";	
	}
	
	this.areOppositeDirections = function(dir1,dir2)
	{
		var dirs = this.directions;
		if(dir1 == dirs.EAST)
		{
			if(dir2 == dirs.WEST)
			{
				return true;
			}
			return false;
		}
		
		if(dir1 == dirs.WEST)
		{
			if(dir2 == dirs.EAST)
			{
				return true;
			}
			return false;
		}
		
		if(dir1 == dirs.NORTH)
		{
			if(dir2 == dirs.SOUTH)
			{
				return true;
			}
			return false;
		}
		
		if(dir2 == dirs.NORTH)
		{
			return true;
		}
		
		return false;
	}
	
	this.positionIsMiddleOfTile = function(pos)
	{
		var center = this.centerForATileInUnitLengths();
		var tile = this.getTileFromWorldPosition(pos);
		if( (center.r == Math.floor(pos.r-tile.r*this.tileSize)) && center.c == Math.floor(pos.c-tile.c*this.tileSize)) 
		{
			return true;
		}
		
		return false;
	}
	
	this.isTileWalkable = function(tilePos)
	{
		var type = this.tileMap[tilePos.r][tilePos.c] 
		if(type == 0 || type == 33)
		{
			return true;
		}
		
		return false;
	}
	
	this.getTileFromWorldPosition = function(pos)
	{
		var r = Math.floor(pos.r/this.tileSize);
		var c = Math.floor(pos.c/this.tileSize);
		return {r:r,c:c};
	}

	this.tileFromPosition = function(pos)
	{
		var r = Math.floor(pos.r/this.tileSize);
		var c = Math.floor(pos.c/this.tileSize);
		return {r:r,c:c};
	}
	
	this.movePossible = function(pos,direction)
	{
		var tilePos = this.getTileFromWorldPosition(pos);
		var tileDelta = this.deltaSignsForDirection(direction);
		var newTilePos = {r:tilePos.r+tileDelta.r,c:tilePos.c+tileDelta.c};
		return this.isTileWalkable(newTilePos);
	}
	
	this.deltaSignsForDirection = function(dir)
	{
		var directions = this.directions;
		var ddir = {r:0,c:0};
		switch(dir)
		{
			case directions.WEST:
				ddir.c = -1;
			break;
			case directions.EAST:
				ddir.c = 1;
			break;
			case directions.NORTH:
				ddir.r = -1;
			break;
			case directions.SOUTH:
				ddir.r = 1;
			break;
		}
		
		return ddir;
	}
	
	this.getAReallyBigDistance = function()
	{
			return 90000000;
	}
	
	this.getExitsFromTile = function(tile,excludeDir)
	{
		var exits = [];
		for(var dirIndex in this.directions)
		{
			var dir = this.directions[dirIndex];
			if(dir != excludeDir && dir != this.directions.NODIRECTION)
			{
				var d = this.deltaSignsForDirection(dir);
				var checkTile = {r:tile.r+d.r,c:tile.c+d.c};
				
				if(this.isTileWalkable(checkTile))
				{
					exits.push(dir);
				}
			}
		}
		
		if(!exits.length)
		{
			throw "Dead end detected";
		}
		
		return exits;
		
	}
	
	this.distanceBetweenTiles = function(t1,t2)
	{
		var r = t2.r-t1.r;
		r = r*r;
		var c = t2.c-t1.c;
		c = c*c;
		return Math.sqrt(r+c);
	}
	
	this.pixelPositionForMapPosition = function(pos)
	{
		var x = this.gfxScale*pos.c;
		var y = this.gfxScale*pos.r;
		return {x:x,y:y};
	}
	
	this.pixelPositionForTilePosition = function(pos)
	{
		var x = this.gfxScale*this.tileSize*pos.c;
		var y = this.gfxScale*this.tileSize*pos.r;
		return {x:x,y:y};
	}
	
	this.tilePositionForPixelPosition = function(pos)
	{
		var r = Math.floor(pos.y/(this.gfxScale*this.tileSize));
		var c = Math.floor(pos.x/(this.gfxScale*this.tileSize));
		return {r:r,c:c};
	}
	
	this.adjustCanvasToMapSize = function(canvas)
	{
		var mapSize = this.getMapSize();
		var tileSize = this.getTileSize();
	
		canvas.width = mapSize.c*tileSize*gfxScale;
		canvas.height = mapSize.r*tileSize*gfxScale;
	}
		
}