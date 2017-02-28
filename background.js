/**
 * Listen for when tabs are activated, check if XDebug icon should be active.
 */
chrome.tabs.onActivated.addListener(function(tabId, changeInfo, tab) {
	chrome.tabs.query({
		active: true,
		currentWindow: true
	}, function(tabs) {
		checkXDebug(tabs[0]);
	});
});

/**
 * Toggle XDebug cookie and icon state on click.
 */
chrome.browserAction.onClicked.addListener(function(tab) {
	toggleXDebug(tab);
});

/**
 * Wrapper to handle retrieval of XDebug cookie.
 */
function getCookie(domain, name, callback) {
	chrome.cookies.get({'url': domain, 'name': name}, function(cookie) {
		if (callback && typeof cookie !== 'undefined' && cookie !== null) {
			callback(cookie.value);
		} else {
			callback(false);
		}
	});
}

/**
 * Wrapper to handle setting of XDebug cookie.
 */
function setCookie(domain, name, value, callback) {
	chrome.cookies.set({'url': domain, 'name': name, 'value': value}, function(cookie) {
		if (callback && typeof cookie !== 'undefined' && cookie !== null) {
			callback(cookie.value);
		} else {
			callback(false);
		}
	});
}

/**
 * Get the base domain from a provided URL.
 */
function getCookieDomain(url) {
	url = new URL(url);
	return url.protocol + '//' + url.hostname;
}

/**
 * Check if XDebug Cookie is active/inactive based on provided tab object.
 */
function checkXDebug(tab) {
	var domain = getCookieDomain(tab.url);

	getCookie(domain, 'xdebug', function(value) {
		if (value === 'on') {
			chrome.browserAction.setIcon({path:"icon-active.png"});
			chrome.browserAction.setTitle({title:"Pilothouse XDebug - ACTIVE"});
		} else {
			chrome.browserAction.setIcon({path:"icon-inactive.png"});
			chrome.browserAction.setTitle({title:"Pilothouse XDebug - INACTIVE"});
		}
	});
}

/**
 * Handle switching XDebug to Active/Inactive.
 */
function toggleXDebug(tab) {
	var domain = getCookieDomain(tab.url);

	getCookie(domain, 'xdebug', function(value) {
		if (value !== 'on') {
			// Toggle the XDebug cookie off if it's currently on, for this domain.
			setCookie(domain, 'xdebug', 'on', function(value) {
				if (value === 'on') {
					chrome.browserAction.setIcon({path:"icon-active.png"});
					chrome.browserAction.setTitle({title:"Pilothouse XDebug - ACTIVE"});
				}
			});
		} else {
			// Toggle the XDebug cookie on if it's currently off, for this domain.
			setCookie(domain, 'xdebug', '', function(value) {
				if (value !== 'on') {
					chrome.browserAction.setIcon({path:"icon-inactive.png"});
					chrome.browserAction.setTitle({title:"Pilothouse XDebug - INACTIVE"});
				}
			});
		}
	});
}
