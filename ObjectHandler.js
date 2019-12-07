function ObjectHandler()
{
	this.objects = [];
	
	this.addObject = function(o)
	{
		this.objects.push(o);
	}
	
	this.removeObject = function(o)
	{
		for(var i = 0;i < this.objects.length;i++)
		{
			if(this.objects[i] == o)
			{
				this.objects.splice(i,1);
				return;
			}
		}
	}
	
	this.getObjects = function()
	{
		return this.objects;
	}
	
	this.getObjectByTag = function(tag)
	{
		for(var i = 0;i < this.objects.length;i++)
		{
			if(this.objects[i].getTag() == tag)
			{
				return this.objects[i];
			}
		}
	}
}