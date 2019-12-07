function GhostController(game,model,scatterTargetTile,getChaseTargetTileCallback,dir,nextDir)
{
	this.game = game;
	this.model = model;
	this.scatterTargetTile = scatterTargetTile;
	this.getChaseTargetTileCallback = getChaseTargetTileCallback;
	
	this.noDirection = -1;//this.game.tileMaster.directions.NODIRECTION;
	this.currentDir = dir;
	this.nextDir = nextDir;
	this.canReverseDir = false;
	
	this.update = function()
	{
		var m = this.model;
		var mpos = m.getPosition();
		var mdir = m.getDirection();
		var tileMaster = this.game.tileMaster;
		
		var isInMiddlePreMove = tileMaster.positionIsMiddleOfTile(m.getPosition());
		
		if(isInMiddlePreMove)
		{
			if(!tileMaster.movePossible(mpos,mdir))
			{
				throw "Ghost moving towards impassable terrain ";
			}
		}
		
		var v = m.getVelocity();
		
		dpos = tileMaster.deltaSignsForDirection(mdir);
		
		dpos.r = dpos.r * v;
		dpos.c = dpos.c * v;
		
		this.model.move(dpos);
		
		var isInMiddlePostMove = tileMaster.positionIsMiddleOfTile(m.getPosition());
		
		if(!isInMiddlePreMove && isInMiddlePostMove)
		{
			this.currentDir = this.nextDir;
			this.model.setDirection(this.currentDir);
			
			var targetTile = this.chooseTargetTile();
			
			var d = tileMaster.deltaSignsForDirection(this.currentDir);
			var currentTile = tileMaster.tileFromPosition(m.getPosition());
			var nextTile = {r:currentTile.r+d.r,c:currentTile.c+d.c};
			
			var excludeDir;
			if(this.canReverseDir)
			{
				excludeDir = this.noDirection;
			}
			else
			{
				 excludeDir = tileMaster.getReverseDirection(this.currentDir);
			}
			
			var exits = tileMaster.getExitsFromTile(nextTile,excludeDir);

			if(1 == exits.length)
			{
				this.nextDir = exits[0];
			}
			else
			{
				var maxDistance = tileMaster.getAReallyBigDistance();
				var leastDistanceIndex = 0;
				
				for(var i = 0;i < exits.length;i++)
				{
					var d = tileMaster.deltaSignsForDirection(exits[i]);
					var candidateTile = {r:nextTile.r+d.r,c:nextTile.c+d.c};
					var targetDistance = tileMaster.distanceBetweenTiles(targetTile,candidateTile);
					if(targetDistance < maxDistance)
					{
						leastDistanceIndex = i;
						maxDistance = targetDistance;
					}
				}
				
				this.nextDir = exits[leastDistanceIndex];
				//console.log("this is " + this.model.getTag());
				//console.log("next dir: " + this.nextDir);
			}
		}
	}
	
	this.chooseTargetTile = function()
	{
		var m = this.model;
		
		switch(m.getState())
		{
			case m.states.SCATTER:
				return this.scatterTargetTile;
			break;
			case m.states.CHASE:
				return this.getChaseTargetTileCallback(this.game);
			break;
			case m.states.FLEE:
				return this.scatterTargetTile;
			break;
			default:
				throw "Unknown state in Ghost controller";
			break; 
		}
	}
}


function GhostView(game,model,color)
{
	this.game = game;
	this.model = model;
	this.color = color;
	this.walkState = new WalkState();
	this.gfxScale = game.gfxScale;
	 
	this.drawer = new GhostDrawer();
	
	this.draw = function(canvas)
	{
		var direction = this.model.getDirection();
		var walkState = this.walkState.getState();
		var bodycolor = this.color;
		
		ctx = canvas.getContext("2d");
		var pos = this.model.getPosition();
		var pixelPos = {};
		pixelPos.x = Math.floor(pos.c*this.gfxScale);
		pixelPos.y = Math.floor(pos.r*this.gfxScale);		
		
		this.drawer.draw(ctx,this.gfxScale,pixelPos,direction,walkState,bodycolor,"white","#7777FF",true);
	}
}


function GhostModel()
{
	GameObject.call(this);

	this.states = {};
	this.states.SCATTER = 0;
	this.states.CHASE = 1;
	this.states.FLEE = 2;
	this.setState(this.states.CHASE);
	
	var velocity = 0.6;
	if(Configuration.slowGhosts)
	{
		velocity = 0.4;
	}
	this.setVelocity(velocity);
}

function Ghost(game,color,scatterTargetTile,getChaseTargetTileCallback,position,dir,nextDir)
{
	GhostModel.call(this);
	this.setPosition(position);
	this.setDirection(dir);
	
	this.controller = new GhostController(game,this,scatterTargetTile,getChaseTargetTileCallback,dir,nextDir);
	this.view = new GhostView(game,this,color);

	this.update = function()
	{
		this.controller.update();
	};
	
	this.draw = function(canvas)
	{
		this.view.draw(canvas);
	}
}

