var SpeakScene = function(sceneHandler,canvas,gfxScale,actor,texts)
{
	ObjectHandler.call(this);
	this.canvas = canvas;
	this.ctx = canvas.getContext("2d");
	this.sceneHandler = sceneHandler;
	this.actor = actor;
	this.texts = texts;
	this.gfxScale = gfxScale;
	this.textInfo = {};
	this.actorInfo = {};
	
	this.tileMaster = new PacManTileLayer(PacManConstants.tileMap,this.gfxScale);

	var halfCanvasWidth = this.canvas.width/2;	
	var tilePixelSize = this.tileMaster.getTileSize()*this.gfxScale; 
	var startY = 5*tilePixelSize;
	
	
	var actorStartX = 1*tilePixelSize;

	var textStartX = halfCanvasWidth;
	var textAvailableWidth = halfCanvasWidth-1*tilePixelSize;;	
	
	var actorAvailableWidth = halfCanvasWidth-2*tilePixelSize;
	
	var actorPosition = {x:actorStartX,y:startY};
	var textPosition = {x:textStartX,y:startY};
	
	var info = this.actorInfo;
	info.position = actorPosition;
	info.width = actorAvailableWidth;
	info.height = this.canvas.width;
	
	actor.setRect(info);
	
	var referenceText  = "AAA AAA AAA AAA";
	var fontName = FontUtils.defaultFontName;
	var dimensionsInfo = FontUtils.fontSizeAndTextWidthFromAvailableWidth(referenceText,fontName,textAvailableWidth);
	var fontSize = dimensionsInfo.fontSize;
	var textHeight = FontUtils.textHeightFromFontSize(fontName,fontSize); 
	
	info = this.textInfo;
	info.position = textPosition;
	info.availableWidth = textAvailableWidth;
	info.textHeight = textHeight;
	info.fontSize = fontSize;
	info.fontName = fontName;
	info.font = info.fontSize + "pt " + info.fontName; 
	
	var sky = new StarrySky(this.canvas,5000,this.gfxScale,0);
	this.addObject(sky);
	this.addObject(actor);

	this.installText = function(t)
	{
		this.lines = [];
		var paragraphs = t.split("\n");
		
		for (var i = 0; i < paragraphs.length;i++)
		{
			
			if(i > 0)
			{
				this.lines.push("")
			}
			var text = paragraphs[i];
			
			var lines = FontUtils.wrapText(text,this.textInfo.availableWidth,this.textInfo.font);
			
			for(var j = 0; j < lines.length; j++)
			{
				this.lines.push(lines[j]);
			}
		}
	}
	
	this.installText(this.texts.shift());
	
	this.update = function()
	{
		
	}
	
	this.draw = function()
	{
		var ctx = this.ctx;
		ctx.fillStyle = "black";
		ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
		
		var os = this.getObjects();
		for(var i = 0;i < os.length;i++)
		{
			os[i].draw(this.canvas);
		}

		var drawBoxes = false;
		
		if(drawBoxes)
		{
			ctx.globalAlpha = 0.5;
			ctx.fillStyle = "pink";
			ctx.fillRect(this.actorInfo.position.x,this.actorInfo.position.y,this.actorInfo.width,this.canvas.height);
			
			ctx.fillStyle = "blue";
			ctx.fillRect(this.textInfo.position.x,this.textInfo.position.y,this.textInfo.availableWidth,this.canvas.height);
			ctx.globalAlpha = 1;
		}
		
		var lines = this.lines;
		for (var i = 0;i < lines.length;i++)
		{
			ctx.fillStyle = "yellow";
			ctx.font = this.textInfo.font;
			ctx.textBaseline = "top";
			ctx.textAlign = "left";
			ctx.fillText(lines[i], this.textInfo.position.x, this.textInfo.position.y+i*this.textInfo.textHeight);
		}
	}

	this.keyPressed = function(key)
	{
		var ESC_KEY = 27;
		var SPACE_KEY = 32;
		var NUM_ZERO_KEY = 96				;
		var CR = 13;
		var LF = 10;
		
		switch(key)
		{
			case SPACE_KEY:
			case NUM_ZERO_KEY:
			case CR:
			case LF:
				var t = this.texts.shift();
				if(t)
				{ 
					this.installText(t);
				}
				else
				{
					this.sceneHandler.popScene();
				}
			break;
			case ESC_KEY:
				this.sceneHandler.popScene();
			break;
			default:
				//console.log("The key was in fact: " + key);
			break;
		}
	}
	
}


function PacManSpeakScene(sceneHandler,canvas,gfxScale,texts)
{
	var actor = new DemoPacMan(this,null);
	SpeakScene.call(this,sceneHandler,canvas,gfxScale,actor,texts);
}

function PacManSpeakScenePreGame(sceneHandler,canvas,gfxScale)
{
	var texts = ["I just found an abandoned spaceship, ready for looting!\nBoy am I gonna get rich!",
				"Take control of my clone and collect all the energy crystals you can find on the ship!",
				"I'll be in the sauna while you do the hard work, he he he.",
				"HONK!\nHONK!"];
	PacManSpeakScene.call(this,sceneHandler,canvas,gfxScale,texts);
}

function PacManSpeakSceneCommentsOnCrewStillThere(sceneHandler,canvas,gfxScale)
{
	var texts = ["Ooops!\nLooks like the crew is still there!",
				"Get the energy crystals before they wake up from their cryosleep!\nThey won't notice anything, hehe!"];
	PacManSpeakScene.call(this,sceneHandler,canvas,gfxScale,texts);
}

function PacManSpeakSceneAngryWithLosingClone(sceneHandler,canvas,gfxScale)
{
	var texts = ["Noo!\nWhy did you let them ruin my precious clone!?\nYou owe me a million space dollars!!",
				"Start working hard or I'll flog you!",
				"HOOONK!"];
	PacManSpeakScene.call(this,sceneHandler,canvas,gfxScale,texts);
}

function PacManSpeakSceneHappyForWinAgain(sceneHandler,canvas,gfxScale)
{
	var texts = ["Let's head over to the Eroticon V nebula and get me some drinks and hoes!",
				"HOOONK!"];
	PacManSpeakScene.call(this,sceneHandler,canvas,gfxScale,texts);
}

function PacManSpeakSceneHappyForWin(sceneHandler,canvas,gfxScale)
{
	var texts = ["Oh yeah!\nEvery single crystal looted from those freaks!\nI'll be so rich!"];
	PacManSpeakScene.call(this,sceneHandler,canvas,gfxScale,texts);
}

function ShipComputerSpeakSceneEnergyLevelsSinking(sceneHandler,canvas,gfxScale)
{
	var texts = ["[Ship computer]\nEnergy levels sinking...\nDeactivating cryosleep..."];
	var actor = new ShipComputer(this,null);
	SpeakScene.call(this,sceneHandler,canvas,gfxScale,actor,texts);
}

function GhostSpeakSceneIAwake(sceneHandler,canvas,gfxScale,bodyColor)
{
	var texts = ["I awake...\nHave we arrived already? Is our long journey at an end?","An intruder!\nThe crystals!\nI must stop this creature before it's too late."];
	var actor = new DemoGhost(this,null,bodyColor);
	SpeakScene.call(this,sceneHandler,canvas,gfxScale,actor,texts);
}

function GhostSpeakSceneLamentingTheGreedOfPacMan(sceneHandler,canvas,gfxScale,bodyColor)
{
	var texts = ["We fled the wars and famine of our origin world...\nFor ages we have traveled the solar systems in search of a new home.",
	"With the energy crystals stolen, our ship will falter.",
	"We will drift endlessly through the empty void, slowly fading into oblivion...\nThe greed of the Pac Man has doomed us.",
	"Only darkness remains..."];
	var actor = new DemoGhost(this,null,bodyColor);
	SpeakScene.call(this,sceneHandler,canvas,gfxScale,actor,texts);
}


