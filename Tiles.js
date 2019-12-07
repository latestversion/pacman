var Tiles = {};

Tiles.tileSize = 8;

Tiles.directions = {};
Tiles.directions.WEST = 0;
Tiles.directions.NORTH = 1;
Tiles.directions.EAST = 2;
Tiles.directions.SOUTH = 3;
Tiles.directions.NODIRECTION = 4;

Tiles.isLegitDirection = function(dir)
{
	for(dirkey in Tiles.directions)
	{
		if (Tiles.directions[dirkey] == dir)
		{
			return true;
		}
	}
	
	return false;
}
