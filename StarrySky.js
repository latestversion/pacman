
var StarDrawer = {
	draw: function(ctx,gfxScale,star)
	{
		ctx.strokeStyle = star.color;
		ctx.fillStyle = star.color;
		ctx.beginPath();
		ctx.moveTo(star.pos.x-star.size/2,star.pos.y-star.size/2);
		ctx.lineTo(star.pos.x+star.size/2,star.pos.y+star.size/2);
		ctx.moveTo(star.pos.x-star.size/2,star.pos.y+star.size/2);
		ctx.lineTo(star.pos.x+star.size/2,star.pos.y-star.size/2);
		ctx.stroke();
		ctx.closePath();
		ctx.globalAlpha = 0.7;
		ctx.beginPath();
		ctx.arc(star.pos.x,star.pos.y,star.size*0.6,0,2*Math.PI);
		ctx.fill();
		ctx.globalAlpha = 1;
	}
}

function Star(sky)
{
	var maxSize = 4;
	this.pos = {};
	this.pos.x = Math.floor(Math.random()*sky.width);
	this.pos.y = Math.floor(Math.random()*sky.height);
	this.size = Math.random()*maxSize;
	
	this.color = "#ffffff";
}

function StarrySky(canvas,rarityOfStars,gfxScale,speed)
{
	GameObject.call(this);
	this.width = canvas.width;
	this.height = canvas.height;
	this.gfxScale = gfxScale;
	this.speed = speed;
	
	this.stars = [];
	
	this.lastMove = Dates.time();
	this.moveInterval = 100;
	
	var area = this.width*this.height;
	var numStars = Math.floor(area/rarityOfStars);
	
	for(var i = 0; i < numStars; i++)
	{
		this.stars.push(new Star(this));
	}

	this.update = function()
	{
		if(this.speed <= 0)
		{
			return;
		}
		
		var t = Dates.time();
		
		if(this.lastMove + this.moveDelay > t)
		{
			return;
		}
		
		for(var i = 0; i < this.stars.length; i++)
		{
			var star = this.stars[i];
			star.pos.y += this.speed*star.size;
			if(star.pos.y > this.height)
			{
				var newstar = new Star(this);
				newstar.pos.y = -1*newstar.size;
				this.stars[i] = newstar;
			}
		}
		
		this.lastMove = t;
	}
	
	this.draw = function(canvas)
	{
		var ctx = CanvasUtils.getCtx(canvas);
		for(var i = 0; i < this.stars.length; i++)
		{
			StarDrawer.draw(ctx,this.gfxScale,this.stars[i]);
		}
	}
}