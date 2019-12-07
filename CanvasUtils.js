var CanvasUtils = {};

CanvasUtils.getCtx = function(canvas)
{
	return canvas.getContext("2d");
}

CanvasUtils.drawHalfWidthLine = function(canvas,color)
{
	var ctx = CanvasUtils.getCtx(canvas);
	ctx.fillStyle = color;
	ctx.fillRect(canvas.width/2,0,1,canvas.height);
}