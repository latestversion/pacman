function Text(ctx,text,fontName,fontSize,align,baseline,position,color)
{
	this.text = text;
	this.font = fontName;
	this.fontSize = fontSize;
	this.align = align;
	this.baseline = baseline;
	this.position = position;
	this.color = color;
	this.ctxFont = fontSize + "pt " + fontName;
	this.height = FontUtils.textHeightFromFontSize(fontName,fontSize);
	
	ctx.font = this.ctxFont;
	this.width = ctx.measureText(text).width;
	
	
	this.getWidth = function()
	{
		return this.width;
	}
	
	this.getHeight = function()
	{
		return this.height;
	}
	
	this.getPosition = function()
	{
		return this.position;
	}
	
	this.update = function()
	{
		
	}	
	
	this.draw = function(canvas)
	{
		var ctx = canvas.getContext("2d");
		ctx.font = this.ctxFont;
		ctx.textAlign = this.align;
		ctx.textBaseline = this.baseline;
		ctx.fillStyle = this.color;
		ctx.fillText(this.text, this.position.x, this.position.y);
	}
}