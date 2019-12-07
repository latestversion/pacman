function TileMarker(game,tilePosition,color)
{
	this.color = color;
	this.game = game;
	this.pos = tilePosition;
	
	this.update = function()
	{
	}	
	
	this.draw = function(canvas)
	{
		var ctx = canvas.getContext("2d");
		ctx.fillStyle = this.color;
		var tileSizeInPixels = this.game.tileMaster.tileSize*this.game.gfxScale;
		var x = this.pos.c * tileSizeInPixels;
		var y = this.pos.r * tileSizeInPixels;
		
		ctx.fillRect(x,y,tileSizeInPixels,tileSizeInPixels);
		
	}
}
