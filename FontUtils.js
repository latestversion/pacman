var FontUtils = {};

// thank you Felix Kling of stackoverflow
function createContext(width, height) {
    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    return canvas;
}

FontUtils.canvas = createContext(1,1); 
FontUtils.ctx = FontUtils.canvas.getContext("2d");

FontUtils.fontSizeAndTextWidthFromAvailableWidth = function(text,fontName,availableWidth)
{
	var fontSizes = [144, 100, 72, 64, 60, 56, 52, 48, 42, 36, 32, 28, 24, 20, 18, 14, 12, 10, 7, 5, 2];
	var textDimensions,i = 0;

	do
	{
		FontUtils.ctx.font = fontSizes[i++] + 'pt ' + fontName;
		textDimensions = FontUtils.ctx.measureText(text);        
	}
	while(textDimensions.width >= availableWidth);
	
	textDimensions.fontSize = fontSizes[--i];
	return textDimensions;
}

FontUtils.makeHtmlFontStyle = function(family,size)
{
	var size = size + "pt";
    var style = "font-family: " + family + "; font-size: " + size + "; " + "margin: 0px; padding: 0px; border:0px;";
	return style;
}

FontUtils.textHeightFromFontSize = function(fontName,fontSize)
{
	var fontStyle = FontUtils.makeHtmlFontStyle(fontName,fontSize);
	var body = document.getElementsByTagName("body")[0];
	var dummy = document.createElement("div");
	var dummyText = document.createTextNode("Mg");
	dummy.appendChild(dummyText);
	dummy.setAttribute("style", fontStyle);
	body.appendChild(dummy);
	var result = dummy.offsetHeight;
	body.removeChild(dummy);
	return result;
}

FontUtils.wrapText = function(phrase,maxPxLength,textStyle)
{
    var wa=phrase.split(" "),
        phraseArray=[],
        lastPhrase=wa[0],
        l=maxPxLength,
        measure=0,
        ctx = FontUtils.ctx;

   ctx.font = textStyle;
	//console.log("Words in paragraph: " + wa.length);
	//console.log("Available width: " + l); 
	
	if(wa.length == 1)
	{
		phraseArray.push(lastPhrase);
		return phraseArray;
	}
   
    for (var i=1;i<wa.length;i++)
    {
        var w=wa[i];
        var testPhrase = lastPhrase + " " + w;
        
        measure = ctx.measureText(testPhrase).width;

        //console.log("testphrase " + testPhrase + " was measured: " + measure);
        
        if (measure<l)
        {
	        lastPhrase = testPhrase;
        }
        else
        {
            phraseArray.push(lastPhrase);
            lastPhrase=w;
        }
        if (i==wa.length-1)
        {
            phraseArray.push(lastPhrase);
            break;
        }
    }
    return phraseArray;
}

FontUtils.wrapTextOrg = function(phrase,maxPxLength,textStyle)
{
    var wa=phrase.split(" "),
        phraseArray=[],
        lastPhrase=wa[0],
        l=maxPxLength,
        measure=0,
        ctx = FontUtils.ctx;

   ctx.font = textStyle;
	console.log("Words in paragraph: " + wa.length);
	console.log("Available width: " + l); 
   
    for (var i=1;i<wa.length;i++)
    {
        var w=wa[i];
        var testPhrase = lastPhrase + " " + w;
        
        measure=ctx.measureText(testPhrase).width;

        console.log("testphrase " + testPhrase + " was measured: " + measure);
        
        if (measure<l)
        {
	        lastPhrase += testPhrase;
        }
        else
        {
            phraseArray.push(lastPhrase);
            lastPhrase=w;
        }
        if (i==wa.length-1)
        {
            phraseArray.push(lastPhrase);
            break;
        }
    }
    return phraseArray;
}

FontUtils.defaultFontName = "CommodoreFont";

// Thank you alex of StackOverflow
// http://stackoverflow.com/questions/10099226/determine-width-of-string-in-html5-canvas
function getFontSizeForFontForTextForWidth(ctx,font,text,width)
{
	var fontSizes = [144,72, 36, 28, 24,14, 12, 10, 5, 2];
	var textDimensions,i = 0;

	do
	{
		ctx.font = fontSizes[i++] + 'px ' + font;
		textDimensions = ctx.measureText(text);        
	}
	while(textDimensions.width >= width);
	
	textDimensions.fontSize = fontSizes[--i];
	return textDimensions;
}

// Thank you ellisbben of Stack Overflow
// http://stackoverflow.com/questions/1134586/how-can-you-find-the-height-of-text-on-an-html-canvas

function makeHtmlFontStyle(family,size)
{
	var size = size + "pt";
    var style = "font-family: " + family + "; font-size: " + size + ";";
	return style;
}

var determineFontHeight = function(family,size) {
  var fontStyle = makeHtmlFontStyle(family,size);
  var body = document.getElementsByTagName("body")[0];
  var dummy = document.createElement("div");
  var dummyText = document.createTextNode("M");
  dummy.appendChild(dummyText);
  dummy.setAttribute("style", fontStyle);
  body.appendChild(dummy);
  var result = dummy.offsetHeight;
  body.removeChild(dummy);
  return result;
};

