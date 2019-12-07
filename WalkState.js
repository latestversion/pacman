
function WalkState()
{
	var d = new Date();
	this.lastWalkStateChange = d.getTime();
	this.lastWalkStateChangeDelay = 300;
	this.walkStates = {};
	this.walkStates.STATE1 = 0;
	this.walkStates.STATE2 = 1;
	this.walkState = this.walkStates.STATE1;
	
	this.getState = function()
	{
		var d = new Date();
		var t = d.getTime();
		
		if(this.lastWalkStateChange + this.lastWalkStateChangeDelay < t)
		{
			if(this.walkState == this.walkStates.STATE1)
			{
				this.walkState = this.walkStates.STATE2;
			}
			else
			{
				this.walkState = this.walkStates.STATE1;
			}
			this.lastWalkStateChange = t;
		}
		
		return this.walkState;		
	}

}