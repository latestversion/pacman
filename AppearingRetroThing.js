var _appearing_retro_thing_imgs = [
	[
		[0,0,1,1,1,1,1,0,0],
		[0,1,1,0,1,0,1,1,0],
		[1,1,1,1,1,1,1,1,1],
		[1,0,1,1,1,1,1,0,1],
		[1,0,1,1,1,1,1,0,1],
		[1,0,1,1,1,1,1,0,1],
		[1,0,1,1,1,1,1,0,1],
		[1,0,1,1,1,1,1,0,1],
		[0,0,0,1,0,1,0,0,0],
		[0,0,1,1,0,1,1,0,0]
	],

	[
		[0,0,0,0,1,0,1,0,0,0,0],
		[0,0,0,0,0,1,0,0,0,0,0],
		[0,0,0,1,1,1,1,1,0,0,0],
		[0,0,1,0,0,0,0,0,1,0,0],
		[0,0,1,0,1,0,1,0,1,0,1],
		[1,1,1,0,0,0,0,0,1,1,1],
		[1,0,1,1,1,1,1,1,1,0,0],
		[0,0,0,1,1,1,1,1,0,0,0],
		[0,0,0,0,1,0,1,0,0,0,0],
		[0,0,0,0,1,0,1,0,0,0,0],
		[0,0,0,0,1,0,1,0,0,0,0],
		[0,0,0,0,1,0,1,0,0,0,0],
		[0,0,0,0,1,0,1,0,0,0,0],
		[0,0,0,0,1,0,1,0,0,0,0]
	],

	[
		[0,0,0,0,1,0,1,0,0,0,0],
		[0,0,0,0,0,1,0,0,0,0,0],
		[0,0,0,1,1,1,1,1,0,0,0],
		[0,0,1,0,0,0,0,0,1,0,0],
		[0,0,1,0,1,0,1,0,1,0,1],
		[1,1,1,0,0,0,0,0,1,1,1],
		[1,0,1,1,1,1,1,1,1,0,0],
		[0,0,0,1,1,1,1,1,0,0,0],
		[0,0,0,1,0,0,0,1,0,0,0],
		[0,0,0,1,0,0,0,1,0,0,0],
		[0,0,0,1,0,0,0,1,0,0,0]

	],

	[
		[0,1,1,0,1,1,0],
		[1,1,1,1,1,1,1],
		[1,1,1,1,1,1,1],
		[0,1,1,1,1,1,0],
		[0,0,1,1,1,0,0],
		[0,0,0,1,0,0,0]
	]
];



function AppearingRetroThingController(game,model,appearTime)
{
	this.game = game;
	this.model = model;
	this.totalDots = this.model.imgdata.length*this.model.imgdata[0].length;
	this.appearedDots = 0;
	var d = new Date();
	this.startTime = d.getTime();
	this.appearTime = appearTime;
	
	this.update = function()
	{
		if(this.appearedDots >= this.totalDots)
		{
			return;
		}
		
		var d = new Date();
		var t = d.getTime();
		var passedTime = t-this.startTime;
		var ratio = passedTime/this.appearTime;
		
		var shouldBeAppearing = Math.floor(ratio*this.totalDots);
		
		if(shouldBeAppearing > this.totalDots)
		{
			shouldBeAppearing = this.totalDots;
		}
		
		if(shouldBeAppearing <= this.appearedDots)
		{
			return;
		}
		
		var diff = shouldBeAppearing - this.appearedDots;
		
		for(var r = 0; r < this.model.imgdataappeared.length;r++)
		{
			for(var c = 0; c < this.model.imgdataappeared[r].length;c++)
			{
				if(!this.model.imgdataappeared[r][c])
				{
					this.model.imgdataappeared[r][c] = 1;
					diff--;
					this.appearedDots++;
				}
				if(0==diff)
				{
					break;
				}
			}
			if(0==diff)
			{
				break;
			}
		}
	}
	
	this.hasAppeared = function()
	{
		if(this.appearedDots == this.totalDots)
		{
			return true;
		}
		
		return false;
	}
}

function AppearingRetroThingView(game,model,color)
{
	this.game = game;
	this.model = model;
	this.color = color;
	
	var littlestBound = 0;
	if(this.model.bounds.width < this.model.bounds.height)
	{
		littlestBound = this.model.bounds.width;
		this.gfxScale = Math.floor(littlestBound/this.model.getColumns());
	}
	else
	{
		littlestBound = this.model.bounds.height;
		this.gfxScale = Math.floor(littlestBound/this.model.getRows());
	}
	
	this.draw = function(canvas)
	{
		var data = this.model.imgdata;
		var datactrl = this.model.imgdataappeared;
		
		ctx = canvas.getContext("2d");
		ctx.save();
		
		ctx.fillStyle = this.color;
		var pos = this.model.getPosition();
		var startXAfterCentering = pos.x - this.model.getColumns()*this.gfxScale/2;
		
		ctx.translate(startXAfterCentering,pos.y);
		
		for(var r = 0; r < this.model.getRows();r++)
		{
			for(var c = 0; c < this.model.getColumns();c++)
			{
				if(data[r][c] && datactrl[r][c])
				{
					ctx.fillRect(c*this.gfxScale,r*this.gfxScale,this.gfxScale,this.gfxScale);
				}
			}
		}
		
		ctx.restore();
	}
}


function AppearingRetroThingModel(game,imgdata,bounds)
{
	GameObject.call(this);
	this.imgdata = imgdata;
	this.imgdataappeared = [];
	this.bounds = bounds;
	this.setPosition(bounds.position);
	
	this.getRows = function()
	{
		return this.imgdata.length;
	}
	
	this.getColumns = function()
	{
		return this.imgdata[0].length;
	}
	
	for(var i = 0;i < this.getRows();i++)
	{
		this.imgdataappeared[i] = [];
		for(var j = 0; j < this.getColumns();j++)
		{
			this.imgdataappeared[i][j] = 0;
		}
	}
	
}

function AppearingRetroThing(game,color,appearTime,bounds)
{
	var imgdata = _appearing_retro_thing_imgs[Math.floor(Math.random()*_appearing_retro_thing_imgs.length)];
	AppearingRetroThingModel.call(this,game,imgdata,bounds);

	this.controller = new AppearingRetroThingController(game,this,appearTime);
	this.view = new AppearingRetroThingView(game,this,color);

	this.update = function()
	{
		this.controller.update();
	};
	
	this.draw = function(canvas)
	{
		this.view.draw(canvas);
	}
	
	this.hasAppeared = function()
	{
		return this.controller.hasAppeared();
	}
}
