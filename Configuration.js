var DefaultConfiguration = {};
var Configuration = {};

DefaultConfiguration.storyModeOn = true;
DefaultConfiguration.gfxScale = 3;
DefaultConfiguration.slowGhosts = false;

Configuration.slowGhosts = DefaultConfiguration.slowGhosts;
Configuration.storyModeOn = DefaultConfiguration.storyModeOn;
Configuration.gfxScale = DefaultConfiguration.gfxScale;

Configuration.hideUI = function()
{
	var ui = document.getElementById("configui");
	ui.style.display = "none";
}

Configuration.showUI = function()
{
	var ui = document.getElementById("configui");
	ui.style.display = "inline";
}