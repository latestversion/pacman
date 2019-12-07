function DemoGhostController(game,model)
{
	this.model = model;
	
	this.model.setDirection(Tiles.directions.EAST);
	
	this.update = function()
	{

	}
}

function DemoGhostView(model,gfxScale,rect,ghostBodyColor)
{
	this.walkState = new WalkState();
	this.drawer = new GhostDrawer();
	this.rect = rect;
	this.color = ghostBodyColor;
	
	this.draw = function(canvas)
	{
		var ctx = canvas.getContext("2d");
	
		var direction = Tiles.directions.EAST;
		var walkState = this.walkState.getState();
		var eyeColor = "white";
		var pupilColor = "#7777FF";
		
		this.drawer.drawInRectangle(ctx,this.rect,direction,walkState,this.color,eyeColor,pupilColor);
	}
	
}

function DemoGhost(game,rect,ghostBodyColor)
{
	GameObject.call(this);
	this.rect = rect;
		
	this.controller = new DemoGhostController(game,this);
	this.view = new DemoGhostView(this,game.gfxScale,rect,ghostBodyColor);

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
