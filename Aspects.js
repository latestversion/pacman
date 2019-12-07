function HasControllersAspect(controllers)
{

	this.control = {};
	this.control.controllers = controllers;
	this.control.controller = {idx:0,instance:null};
	
	this.getNumControllers = function()
	{
		var len = this.control.controllers.length;
		return len;
	}	
	
	this.hasControllers = function()
	{
		if(this.getNumControllers() > 0)
		{
			return true;
		}
		return false;
	}
	
	this.getControllers = function()
	{
		return this.control.controllers;
	}	
	
	this.getCurrentController = function()
	{
		return this.control.controller.instance;
	}
	
	this.setAndInitController = function(idx)
	{
		this.control.controller.idx = idx;
		this.control.controller.instance = this.control.controllers[idx];
		this.control.controller.instance.init(this);
	}	
	
	this.initControllerChain = function()
	{
		this.setAndInitController(0);
	}
	
	this.advanceController = function()
	{
		if(this.hasNextController())
		{
			this.setNextController();
		}
		else
		{
			// return to maker....
		}
	}
	
	
	this.setNextController = function()
	{
		this.setAndInitController(this.getCurrentControllerIdx()+1);
	}
	
	this.getCurrentControllerIdx = function()
	{
		return this.control.controller.idx;
	}	
	
	this.hasNextController = function()
	{
		var idx = this.getCurrentControllerIdx();
		var controllernumber = idx + 1;
		var numcontrollers = this.getNumControllers();
		if(controllernumber == numcontrollers)
		{
			return false;
		}
		
		return true;
	}
}

function HasObjectsAspect()
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
	
	this.getObjectByTag(tag)
	{
		console.log("meh");
		for(var i = 0;i < this.objects.length;i++)
		{
				console.log("tag: " + this.objects.getTag());
			if(this.objects[i].getTag() == tag)
			{
				return this.objects[i];

			}
		}
		throw "NO tag " + tag;
	}
}

function HasStatesAspect(numstates)
{
	this.statedata = [];
	this.state = 0;
	this.maxstate = numstates;
	this.states = {};
	
	for(var i = 0;i < this.maxstate;i++)
	{
		this.statedata[i] = new Object();
	}
	
	
}

function ActivityControlAspect(activities)
{
	this.activities = activities;
	
	this.toggleActivity = function(activity)
	{
		for(availableactivity in this.activities)
		{
			if(availableactivity == activity)
			{
				this.activities[activity] = !this.activities[activity];
			}
		}
	}
	
	this.activityIsGoingOn = function(activity)
	{
		return this.activities[activity];
	}
}

function ProgressMakerAspect()
{
	this.progress = {};
	this.progress.done = 0;
	this.progress.total = 0;
	this.updateProgress = function(done,total)
	{
		this.progress.done = done;
		this.progress.total = total;
	}
	this.getProgressDone = function()
	{
		return this.progress.done;
	}
	
	this.updateProgressDone = function(done)
	{
		this.progress.done = done;
	}
	
	this.getAllProgressToDo = function()
	{
		return this.progress.total;
	}
	
	this.isFinished = function()
	{
		if(this.getProgressDone() >= this.getAllProgressToDo())
		{
			return true;
		}
		return false;
	}
}


