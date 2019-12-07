var SceneHandler = function()
{
	this._scenes = [];
	this.pushScene = function(scene)
	{
		this._scenes.push(scene);
	}
	this.popScene = function()
	{
		return this._scenes.pop();
	}
	this.clearScenes = function()
	{
		this._scenes = [];
	}
	this.getCurrentScene  = function()
	{
		var numScenes = this._scenes.length;
		if(numScenes)
		{
			return this._scenes[numScenes-1];
		}
		
		return null;
	}
}