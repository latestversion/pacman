function FrozenGhostController(game,model,ghostCtr)
{
	this.game = game;
	this.model = model;
	this.ghostCtr = ghostCtr;
	
	this.lastThawStep = Dates.time();
	this.thawDelay = 150;
	this.thawStep = 0.05;
	
	this.switchDelay = 1000;	
	
	this.update = function()
	{
		var m = this.model;
		
		var t = Dates.time();
		var rightState = m.getState() == m.states.THAWING;
	
		if(rightState && m.cold && this.lastThawStep + this.thawDelay < t)
		{
			
			m.cold -= this.thawStep;
			if(m.cold < 0)
			{
				m.cold = 0;
			}
			this.lastThawStep = t;
		}
		
		if(m.cold == 0 && this.lastThawStep + this.switchDelay < t)
		{
			this.game.removeObject(this.model);
			var name = this.model.getTag();
			var g = GhostFactory.produce(this.game,name,false);
			this.game.addObject(g);
		}
	}
}

function FrozenGhostView(game,model,color)
{
	this.game = game;
	this.gfxScale = game.gfxScale;
	this.model = model;
	this.thawedColor = color;
	this.frozenColor = "#888888";

	this.drawer = new GhostDrawer();
	
	this.draw = function(canvas)
	{
		var direction = this.model.getDirection();
		var walkState = 0;
		var bodyColor = this.frozenColor;
		var eyeColor = "white";
		var pupilColor = this.frozenColor;
		
		ctx = canvas.getContext("2d");
		var pos = this.model.getPosition();
		var pixelPos = {};
		pixelPos.x = Math.floor(pos.c*this.gfxScale);
		pixelPos.y = Math.floor(pos.r*this.gfxScale);
		
		this.drawer.draw(ctx,this.gfxScale,pixelPos,direction,walkState,bodyColor,"white",pupilColor,true);		
		
		bodyColor = this.thawedColor;
		pupilColor = "#7777FF";
		
		ctx.save();
		ctx.globalAlpha = 1-this.model.cold;

		this.drawer.draw(ctx,this.gfxScale,pixelPos,direction,walkState,bodyColor,eyeColor,pupilColor,true);

		ctx.restore();
	}
}

function FrozenGhostModel(game,color,position)
{
	GameObject.call(this);

	this.cold = 1;
	this.color = color;
	this.setPosition(position);
	this.setDirection(game.tileMaster.directions.NODIRECTION);

	this.states = {};
	this.states.FROZEN = 0;
	this.states.THAWING = 1;
	this.setState(this.states.FROZEN);
	
	this.beginThawing = function()
	{
		this.setState(this.states.THAWING);
	}
}


function FrozenGhost(game,position,color,ghostCtr)
{
	FrozenGhostModel.call(this,game,color,position);
	
	this.controller = new FrozenGhostController(game,this,ghostCtr);
	this.view = new FrozenGhostView(game,this,color);

	this.update = function()
	{
		this.controller.update();
	};
	
	this.draw = function(canvas)
	{
		this.view.draw(canvas);
	}
}

