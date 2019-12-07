
function PacManController(game,model)
{
	this.game = game;
	this.model = model;
	
	this.noDirection = -1;
	this.wantedDirection = this.noDirection;
	
	this.playerWantsToMove = function(wantedDirection)
	{
		this.wantedDirection = wantedDirection;
	}

	this.game.on("playerwantstomove",this.playerWantsToMove.bind(this));
	
	this.update = function()
	{
		var m = this.model;
		var mpos = this.model.getPosition();
		var mdir = m.getDirection();
		var tileMaster = this.game.tileMaster;
		
		if(this.wantedDirection == this.noDirection)
		{
			return;
		}
		
		var wantedDirOK = false;
		
		if(this.wantedDirection != mdir)
		{
			if(tileMaster.areOppositeDirections(this.wantedDirection,mdir))
			{
				wantedDirOK = true;
			}
			else
			{
				if(tileMaster.positionIsMiddleOfTile(mpos))
				{
					if(tileMaster.movePossible(mpos,this.wantedDirection))
					{
						wantedDirOK = true;
					}
				}
			}
			
			if(wantedDirOK)
			{
				m.setDirection(this.wantedDirection)
				mdir = this.wantedDirection;
			}
		}
		
		if(!tileMaster.movePossible(mpos,mdir) && tileMaster.positionIsMiddleOfTile(mpos))
		{
			return;
		}
		
		var v = m.getVelocity();
		
		dpos = tileMaster.deltaSignsForDirection(mdir);
		
		dpos.r = dpos.r * v;
		dpos.c = dpos.c * v;
		
		this.model.move(dpos);
	}
}

function PacManView(game,model,color)
{
	this.game = game;
	this.model = model;
	this.color = color;
	this.gfxScale = game.gfxScale;
	this.walkState = new WalkState();
	 
	this.drawer = new PacManDrawer();

	this.draw = function(canvas)
	{
		var ctx = canvas.getContext("2d");
		var gfxScale = this.gfxScale;		
		
		var pos = this.model.getPosition();
		var pixelPos = {};
		pixelPos.x = Math.floor(pos.c*this.gfxScale);
		pixelPos.y = Math.floor(pos.r*this.gfxScale);
		
		var direction = this.model.getDirection();

		var walkState = this.walkState.getState();
		var color = this.color;
		
		this.drawer.draw(ctx,gfxScale,pixelPos,direction,walkState,color,true);
		
		//console.log("drawing with " + gfxScale + " " + pixelPos.x + " " + pixelPos.y + " " + direction + " " + walkState + " " + color);
	}
	
	this.getDrawer = function()
	{
		return this.drawer;
	}
}

function PacManModel()
{
	GameObject.call(this);
	this.states = {};
	this.states.STILL = 0;
	this.states.MOVING = 1;
	
	this.setState(this.states.STILL);
	this.setVelocity(0.9);
}

function PacMan(game,color,position,dir)
{
	PacManModel.call(this);
	this.setTag("pacman");
	this.setPosition(position);
	this.setDirection(dir);
	
	this.controller = new PacManController(game,this);
	this.view = new PacManView(game,this,color);

	this.update = function()
	{
		this.controller.update();
	};
	
	this.draw = function(canvas)
	{
		this.view.draw(canvas);
	}
}

