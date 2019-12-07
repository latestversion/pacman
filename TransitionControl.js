function TransitionControl(game)
{
	GameObject.call(this);
	this.game = game;
	this.crystalField = null;
	this.listening = false;
	

	this.update = function()
	{
		if(!this.listening)
		{
			var cf = this.game.getObjectByTag("crystalfield");
			if(cf)
			{
				cf.on("crystalgone",this.crystalGoneCallback);
				this.crystalField = cf;
				this.listening = true;
			}
		}
		
		// Lose condition
		var p = this.game.getObjectByTag("pacman");
		var ppos = p.getPosition();
		var pTile = this.game.tileMaster.tileFromPosition(ppos);
		
		for (var i = 0; i < GhostData.ghostNames.length;i++)
		{
			var ghostName = GhostData.ghostNames[i];
			var ghost = this.game.getObjectByTag(ghostName);
			var gpos = ghost.getPosition();	
			var gTile = this.game.tileMaster.tileFromPosition(gpos);
			if(gTile.r == pTile.r && gTile.c== pTile.c)
			{
				var s = new LoseScene(this.game.sceneHandler,this.game.canvas,this.game.gfxScale,true);
				this.game.sceneHandler.pushScene(s);
				s = new PacManSpeakSceneAngryWithLosingClone(this.game.sceneHandler,this.game.canvas,this.game.gfxScale,true);
				this.game.sceneHandler.pushScene(s);
			}
			//console.log(gTile.r + " "+ pTile.r + " " + gTile.c + " " +  pTile.c);
		}
	}
	
	this.thaw = function(name)
	{
		if(name)
		{
			var g = this.game.getObjectByTag(name);
			if(g)
			{
				//console.log("thawing "  + name);
				g.beginThawing();
			}
		}
	}	
	
	this.crystalGoneCallback = function(e)
	{
		//console.log("numremaining: " + e.remaining);
		var numEaten = e.numEaten;
		
		var name = false;
		var pacmanCommentsOnCrewStillThereLimit = 4;
		var blinkyLimit = 10;
		var pinkyLimit = 30;
		var inkyLimit = 45;
		var clydeLimit = 56;
		
		switch(numEaten)
		{
			case pacmanCommentsOnCrewStillThereLimit:
				if(Configuration.storyModeOn)
				{
					var ss = new PacManSpeakSceneCommentsOnCrewStillThere(this.game.sceneHandler,this.game.canvas,this.game.gfxScale);
					this.game.sceneHandler.pushScene(ss);
				}
			break;
			case blinkyLimit:
				this.thaw("blinky");
				if(Configuration.storyModeOn)
				{	
					var color = GhostData["blinky"].color;
					var ss = new GhostSpeakSceneIAwake(this.game.sceneHandler,this.game.canvas,this.game.gfxScale,color);
					this.game.sceneHandler.pushScene(ss);
					ss = new ShipComputerSpeakSceneEnergyLevelsSinking(this.game.sceneHandler,this.game.canvas,this.game.gfxScale);
					this.game.sceneHandler.pushScene(ss);
				}
		break;
			case pinkyLimit:
				this.thaw("pinky");
			break;
			case inkyLimit:
				this.thaw("inky");
			break;
			case clydeLimit:
				this.thaw("clyde");
				var cf = this.crystalField;
			break;
		}
		
		// Win condition
		var winRemaining = 0;
		//console.log(e.remaining);
		if(winRemaining == e.remaining)
		{
			var s = new WinScene(this.game.sceneHandler,this.game.canvas,this.game.gfxScale);
			this.game.sceneHandler.pushScene(s);
			s = new PacManSpeakSceneHappyForWinAgain(this.game.sceneHandler,this.game.canvas,this.game.gfxScale);
			this.game.sceneHandler.pushScene(s);
			s = new GhostSpeakSceneLamentingTheGreedOfPacMan(this.game.sceneHandler,this.game.canvas,this.game.gfxScale,GhostData["blinky"].color);
			this.game.sceneHandler.pushScene(s);
			s = new PacManSpeakSceneHappyForWin(this.game.sceneHandler,this.game.canvas,this.game.gfxScale);
			this.game.sceneHandler.pushScene(s);
		}
	}
	
	this.crystalGoneCallback = this.crystalGoneCallback.bind(this);
		
	this.draw = function(canvas)
	{
	}
}