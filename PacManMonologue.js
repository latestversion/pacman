function PacManMonologue(game,pixelPosition,fontName,maxTextWidth,changeDelay)
{
	this.game = game;
	this.pos = pixelPosition;
	this.fontName = fontName;
	this.availableWidth = maxTextWidth;
	this.textChangeDelay = changeDelay;
	this.currentTextIndex = 0;
	this.currentFont = "";
	var d = new Date();
	var t = d.getTime();
	this.textStartTime = t;
	this.color = "#FFFF00";
	
	this.thingsToSay = [
		"Honk honk!",
		"HONK!",
		"Any pacwomen here!?",
		"Let's get drunk!",
		"HOOONK!!",
		"Hooonk honk!",
		"He he he...",
		"Let's blow up a planet!",
		"Let's burn some fuel!",
		"I break for nobody!",
		"Uh huh...",
		"HONK!",
		"Honk honk!",
		"Zap you with my laser gun!",
		"Out of my way!",
		"H-o-o-o-n-k!",
		"Deal with it!",
		"Not my problem!",
		"Packie FTW!",
		
	];
	
	this.fontSizes = [];
	
	this.initText = function()
	{
		var currIdx = this.currentTextIndex;
		 
		if(!this.fontSizes[currIdx])
		{
			var text = this.thingsToSay[currIdx];
			var fontSize = FontUtils.fontSizeAndTextWidthFromAvailableWidth(text,this.fontName,this.availableWidth).fontSize;
			this.fontSizes[currIdx] = fontSize;
		}
	}
	
	this.checkForTextSwitch = function()
	{
		var d = new Date();
		var t = d.getTime();
		if(this.textStartTime + this.textChangeDelay < t)
		{
			var newIndex = this.currentTextIndex;
			while(newIndex == this.currentTextIndex)
			{
				newIndex = Arrays.getRandomIndex(this.thingsToSay);
			}
			
			this.currentTextIndex = newIndex;
			this.initText();
			this.textStartTime = t;
		}
	}
		
	
	this.update = function()
	{
		this.checkForTextSwitch();
	}
	
	this.draw = function(canvas)
	{
		var ctx = CanvasUtils.getCtx(canvas);
		var currIdx = this.currentTextIndex;
		var text = this.thingsToSay[currIdx];
		var fontSize = this.fontSizes[currIdx];
		ctx.font = fontSize + "pt " + this.fontName;
		ctx.textAlign = "left";
		ctx.textBaseline = "middle";
		ctx.fillStyle = this.color;
		ctx.fillText(text,this.pos.x,this.pos.y);
	}
	
	this.initText();
	
}