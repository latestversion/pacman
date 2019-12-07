function GameObject()
{
	this._direction = Tiles.directions.NODIRECTION;	
	this._tag = 0;
	this._tileNumber = 0;
	this._state = 0;
	this._states = {};
	this._substate = 0;
	this._position = 0;
	this._velocity = 0;
	this._layer = 0;
	
	
	this.setPosition = function(pos)
	{
		this._position = pos;
	}
	this.getPosition = function()
	{
		return this._position;
	}

	this.setDirection = function(dir)
	{
		this._direction = dir;
	}
	this.getDirection = function()
	{
		return this._direction;
	}
	
	this.setTag = function(tag)
	{
		this._tag = tag;
	}
	
	this.getTag = function()
	{
		return this._tag;
	}
	
	this.setTileNumber = function(tile)
	{
		this._tileNumber = tile;
	}
	
	this.getTileNumber = function()
	{
		return this._tileNumber;
	}
	
	this.setState = function(state)
	{
		this._state = state;
	}
	
	this.getState = function()
	{
		return this._state;
	}
	
	this.setVelocity = function(v)
	{
		this._velocity = v;
	}
	
	this.getVelocity = function()
	{
		return this._velocity;
	}
	
	this.setLayer = function(layer)
	{
		this._layer = layer;
	}
	this.getLayer = function()
	{
		return this._layer;
	}
	
	this.move = function(delta)
	{
		this._position.r += delta.r;
		this._position.c += delta.c;
		//console.log("New pos: ("+this._position.r + ","+this._position.c);
	}
}