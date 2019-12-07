function DemoPacManController(game,model)
{
	this.model = model;
	
	this.model.setDirection(Tiles.directions.EAST);
	
	this.update = function()
	{

	}
}

function DemoPacManView(model,gfxScale,rect)
{
	this.model = model;
	this.gfxScale = gfxScale;
	this.walkState = new WalkState();
	this.drawer = new PacManDrawer();
	this.rect = rect;
	
	this.draw = function(canvas)
	{
		var ctx = canvas.getContext("2d");
	
		var direction = this.model.getDirection();
		var walkState = this.walkState.getState();
		var color = "#FFFF00";
		
		this.drawer.drawInRectangle(ctx,this.rect,direction,walkState,color)
	}
	
}

// A pacman with a view gfxScale that differs from the tile/positioning gfxscale and a simple controller.

function DemoPacMan(game,rect)
{
	PacManModel.call(this);
	this.rect = rect;
		
	this.controller = new DemoPacManController(game,this);
	this.view = new DemoPacManView(this,game.gfxScale,rect);

	this.update = function()
	{
		this.controller.update();
	};
	
	this.draw = function(canvas)
	{
		this.view.draw(canvas);
	}
	
	this.setRect = function(rect)
	{
		this.view.rect = rect;
	}
}
