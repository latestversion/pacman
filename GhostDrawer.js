
var ghost_imgdata_body = [
[0,0,0,0,0,1,1,1,1,0,0,0,0,0],
[0,0,0,1,1,1,1,1,1,1,1,0,0,0],
[0,0,1,1,1,1,1,1,1,1,1,1,0,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,0],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

var ghost_imgdata_feet0 = [
[1,1,1,1,0,1,1,1,1,0,1,1,1,1],
[0,1,1,0,0,0,1,1,0,0,0,1,1,0]
];

var ghost_imgdata_feet1 = [
[1,1,0,1,1,1,0,0,1,1,1,0,1,1],
[1,0,0,0,1,1,0,0,1,1,0,0,0,1]
];

var ghost_imgdata_eyes = [
[0,1,1,0,0,0,0,1,1,0],
[1,1,1,1,0,0,1,1,1,1],
[1,1,1,1,0,0,1,1,1,1],
[1,1,1,1,0,0,1,1,1,1],
[0,1,1,0,0,0,0,1,1,0]
];

var ghost_imgdata_eyes_offset = [
[3,1], // West
[1,2], // North
[3,3], // East
[4,2], // South
[3,2], // No dir
];

var ghost_imgdata_pupils = [
[1,1,0,0,0,0,1,1],
[1,1,0,0,0,0,1,1]
];

var ghost_imgdata_pupils_offset = [
[2,0], // West
[0,1], // North,
[2,2], // East
[3,1], // South
[2,1] // No dir
];

var GhostDrawer = function()
{
	this.bounds = {};
	this.bounds.r = ghost_imgdata_body.length + ghost_imgdata_feet0.length;
	this.bounds.c = ghost_imgdata_body[0].length;;
	
	this.drawOrg = function(ctx,pos)
	{
		ctx.fillStyle = this._bodyColor;
		var gfxScale = this._pixelsPerLengthUnit;
		
		pos.x = (pos.c-7)*gfxScale;
		pos.y = (pos.r-8)*gfxScale;		
		
		ctx.save();
		ctx.translate(Math.floor(pos.x),Math.floor(pos.y));
			
		// Draw body
		ctx.fillStyle = this._color;
	
		var imgdata = ghost_imgdata_body;
		Drawers.drawData(ctx,imgdata,gfxScale);
				
		// Draw feet
		var feetrowoffset = imgdata.length;
		//console.log("feetrowoffset " + feetrowoffset);
		ctx.save();
		ctx.translate(0,feetrowoffset*gfxScale);
		if(this.getWalkState())
		{
			imgdata = ghost_imgdata_feet0;
		}
		else
		{
			imgdata = ghost_imgdata_feet1;
		}
		
		Drawers.drawData(ctx,imgdata,gfxScale);
		ctx.restore();
		
		// Draw eyes
		var eyerowoffset = ghost_imgdata_eyes_offset[this._direction][0];
		var eyecoloffset = ghost_imgdata_eyes_offset[this._direction][1];
		ctx.save();
		ctx.translate(eyecoloffset*gfxScale,eyerowoffset*gfxScale);
		imgdata = ghost_imgdata_eyes;
		ctx.fillStyle = this._eyeColor;
		Drawers.drawData(ctx,imgdata,gfxScale);
				
		// Draw Pupils
		var rowoffset = ghost_imgdata_pupils_offset[this._direction][0];
		var coloffset = ghost_imgdata_pupils_offset[this._direction][1];
		ctx.translate(coloffset*gfxScale,rowoffset*gfxScale);
		imgdata = ghost_imgdata_pupils;
		ctx.fillStyle = this._eyePupilColor;
		Drawers.drawData(ctx,imgdata,gfxScale);
		
		ctx.restore(); // Eyes + pupils
		
		ctx.restore(); // All
	}
	
	this.draw = function(ctx,gfxScale,pixelPos,direction,walkState,bodyColor,eyeColor,pupilColor,centerGfxFlag)
	{
		var anchoredPos = {};
		anchoredPos.x = pixelPos.x;
		anchoredPos.y = pixelPos.y;
		
		if(centerGfxFlag)
		{
			anchoredPos.x = pixelPos.x-7*gfxScale;
			anchoredPos.y = pixelPos.y-8*gfxScale;
		}		
		
		ctx.save();
		ctx.translate(Math.floor(anchoredPos.x),Math.floor(anchoredPos.y));
			
		// Draw body
		ctx.fillStyle = bodyColor;
	
		var imgdata = ghost_imgdata_body;
		Drawers.drawData(ctx,imgdata,gfxScale);
				
		// Draw feet
		var feetrowoffset = imgdata.length;

		ctx.save();
		ctx.translate(0,feetrowoffset*gfxScale);
		if(walkState)
		{
			imgdata = ghost_imgdata_feet0;
		}
		else
		{
			imgdata = ghost_imgdata_feet1;
		}
		
		Drawers.drawData(ctx,imgdata,gfxScale);
		ctx.restore();
		
		// Draw eyes
		ctx.save();
		var eyerowoffset = ghost_imgdata_eyes_offset[direction][0];
		var eyecoloffset = ghost_imgdata_eyes_offset[direction][1];
		ctx.translate(eyecoloffset*gfxScale,eyerowoffset*gfxScale);
		imgdata = ghost_imgdata_eyes;
		ctx.fillStyle = eyeColor;
		Drawers.drawData(ctx,imgdata,gfxScale);
				
		// Draw Pupils
		var rowoffset = ghost_imgdata_pupils_offset[direction][0];
		var coloffset = ghost_imgdata_pupils_offset[direction][1];
		ctx.translate(coloffset*gfxScale,rowoffset*gfxScale);
		imgdata = ghost_imgdata_pupils;
		ctx.fillStyle = pupilColor;
		
		Drawers.drawData(ctx,imgdata,gfxScale);
		
		ctx.restore(); // Eyes + pupils
		
		ctx.restore(); // All
	}
	
	this.drawInRectangle = function(ctx,rect,direction,walkState,color,eyeColor,pupilColor)
	{
		var gfxScale = 0;
		if(rect.width < rect.height)
		{
			gfxScale = rect.width/this.bounds.c;
		}
		else
		{
			gfxScale = rect.height/this.bounds.r;
		}
		
		this.draw(ctx,gfxScale,rect.position,direction,walkState,color,eyeColor,pupilColor,false);
	}
	
	
}