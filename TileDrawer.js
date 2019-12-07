function TileDrawer()
{
	this.drawData = function(ctx,data,elemSize)
	{
		for(var r = 0; r < data.length;r++)
		{
			var maxcol = data[r].length;
			for(var c = 0; c < maxcol; c++)
			{
				if(data[r][c])
				{
					ctx.fillRect(c*elemSize,r*elemSize,elemSize,elemSize);
				}
			}
		}
	}
	
	this.draw = function(ctx,tileType,pos,pixelsPerUnitLength)
	{
		if(0 == tileType)
		{
			return;
		}
		
		ctx.fillStyle = "#0000FF";
		//console.log("TD drawing at " + pos.c + " " + pos.r);
		var xoff = pos.c*pixelsPerUnitLength*PacManConstants.unitLengthsPerTile;
		var yoff = pos.r*pixelsPerUnitLength*PacManConstants.unitLengthsPerTile;
		
		ctx.save();
		ctx.translate(xoff,yoff);
		//console.log("TD drawing at " + xoff + " " + yoff);
		var imgdata = PacManConstants.tileData[tileType-1];
		this.drawData(ctx,imgdata,pixelsPerUnitLength);
		
		ctx.restore();
	}
}