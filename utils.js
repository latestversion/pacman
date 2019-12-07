
/**
 * Does the prototype-based inheritance as described in chapter 1.
 * @param subclass the constructor function of the subclass
 * @param superclass the constructor function of the superclass
 */
function extend(subConstructor, superConstructor) {
    subConstructor.prototype = Object.create(superConstructor.prototype, {
        constructor: {
            value: subConstructor,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
}

/**
 * Checks if we're working with the touchscreen or with the
 * regular desktop browser. Used to determine, what kind of events should we use:
 * mouse events or touch events.
 */
function isTouchDevice() {
    return ('ontouchstart' in document.documentElement);
}



if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
        if (typeof this !== "function") {
            // closest thing possible to the ECMAScript 5 internal IsCallable function
            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        }

        var fSlice = Array.prototype.slice,
            aArgs = fSlice.call(arguments, 1),
            fToBind = this,
            fNOP = function () {},
            fBound = function () {
                return fToBind.apply(this instanceof fNOP
                    ? this
                    : oThis || window,
                    aArgs.concat(fSlice.call(arguments)));
            };

        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();

        return fBound;
    };
}

var Arrays = {
    remove: function(obj, arr) {
        var index = arr.indexOf(obj);
        if (index != -1)
            arr.splice(index, 1);
    },

    contains: function(obj, arr) {
        return arr.indexOf(obj) > -1;
    },

    addIfAbsent: function(obj, arr) {
        if (!Arrays.contains(obj, arr)) {
            arr.push(obj);
        }
    },
    
    getRandomElement: function(arr) {
    	var n = this.getRandomIndex(arr);
    	return arr[n];
    },
	    
    getRandomIndex: function(arr) {
   	var n = Math.floor((Math.random()*arr.length));
    	return n;
	}

};


var Drawers = {
   drawData : function(ctx,data,gfxScale)
	{
		var elemSize = gfxScale;
		for(var r = 0; r < data.length;r++)
		{
			var maxcol = data[r].length;
			for(var c = 0; c < maxcol; c++)
			{
				if(data[r][c])
				{
					ctx.fillRect(c*elemSize,r*elemSize,elemSize,elemSize);
				}
			}
		}
	}
};

var Dates = {
   time : function()
	{
		var d = new Date();
		return d.getTime();
	}
};

// Thank you Tim Down of Stack Overflow
//http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
var Conversions = {
	hexToRgb: function(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
	}
};
