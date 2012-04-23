/*
 * Izilla Media Query Debugger v1.0
 * Adds the viewport width and height as a :before pseudo element on the body to help with obtaining values for responsive breakpoints if a url parameter of mqdebug=true exists.
 *
 * eg. rwd.html?mqdebug=true
 * Needs to be referenced after opening <body> tag
 * 
 * Copyright (c) 2012 Izilla Partners Pty Ltd
 *
 * http://www.izilla.com.au
 *
 * Licensed under the MIT license
 *
 */

(function() {
	var rx = /(&|\?)(\w+)=true/gi, str = window.location.href, m, s = '', gup = {};
	while (m = rx.exec(str)) {
		s += ' ' + m[2];
		gup[m[2]] = true;
	}
	
	if (gup.mqdebug === true && typeof(window.innerWidth) != 'undefined') {
		var head = document.head,
			style = document.createElement('style'),
			rules = document.createTextNode('body[data-mqd]:before {background:red;border:1px solid #900;color:#fff;content:attr(data-mqd);font-family:"Courier New",Courier,monospace;font-size:12px;left:0;line-height: 16px;padding:3px 6px 5px 6px;position:fixed;top:0;z-index:9999;}');
		
		style.type = 'text/css';
		
		if (style.styleSheet)
			style.styleSheet.cssText = rules.nodeValue;
		else
			style.appendChild(rules);
		
		head.appendChild(style);

		document.body.setAttribute('data-mqd', window.innerWidth + ' x ' + window.innerHeight);
		window.onresize = function(event) {
			document.body.setAttribute('data-mqd', window.innerWidth + ' x ' + window.innerHeight);
		};
	}
})();