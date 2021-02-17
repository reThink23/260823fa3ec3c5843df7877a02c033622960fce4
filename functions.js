function getDeviceCategory() {
	// xs(for phones - screens less than 768 px wide)
	// sm(for tablets - screens equal to or greater than 768 px wide)
	// md(for small laptops - screens equal to or greater than 992 px wide)
	// lg(for laptops and desktops - screens equal to or greater than 1200 px wide)
	var match = window.matchMedia || window.msMatchMedia;
	if (match) {
		if (match("(max-width: 767px)")) {
			return "xs";
		} else if (match("(min-width: 768px) and (max-width: 991px)")) {
			return "sm";
		} else if (match("(min-width: 992px) and (max-width: 1199px)")) {
			return "md";
		} else if (match("(min-width: 1200px)")) {
			return "lg";
		}
	}
}

Object.prototype.toArr = function() {
	return Array.from(this)
}

String.prototype.toTitleCase = function () {
	return this.charAt(0).toUpperCase() + this.substr(1).toLowerCase();
}

function TitleCaseAll(string) {
	array = string.split(" ")
	array.map(el => el.toTitleCase())
	return array.join(" ")
}

Array.prototype.insert = function(item, pos) {
	return this.splice(pos,0,item)
}

Array.prototype.replace = function(item, pos) {
	return this.splice(pos,1,item)
}

function remove(array, array2) {
	res = array.filter(n => {
		!array2.includes(n)
	})
	return res
}

function iter(obj, dest = 0, recursive = true) {
	var array = [];
	for (var k in obj) {
		if (typeof (obj[k]) == "object" && obj[k] !== null && recursive) {
			array.insert(dest, obj[k])
			iter(obj[k]);
		} else {
			array.insert(dest, obj[k])
		}
	}
}

function ObjToArr(object) {
	return Array.from(object)
}

//////////////////////// new ////////////////////////////////////

function existParam(key, url=null) {
	nURL = ((url) ? url : window.location.href)
	params = nURL.split("?")[1]
	urlParams = new URLSearchParams(params);
	return urlParams.has(key);
}
function getParam(key, url=null) {
	nURL = ((url) ? url : window.location.href)
	params = nURL.split("?")[1]
	urlParams = new URLSearchParams(params);
	return urlParams.has(key) ? urlParams.get(key) : false;
}

function countParams(url=null) {
	nURL = ((url) ? url : window.location.href)
	params = nURL.split("?")[1]
	urlParams = new URLSearchParams(params)
	arr = Array.from(urlParams)
	return arr.length
}

function getParams(url=null) {
	arr = {}
	params = ""
	nURL = ((url) ? url : window.location.href)
	splitUrl = nURL.split("?")
	urlBase = splitUrl[0], params = splitUrl[1]
	urlParams = new URLSearchParams(params)
	paramsArray = Array.from(urlParams)
	for (let i = 0; i < paramsArray.length; i++) {
		arr[paramsArray[i][0]] = paramsArray[i][1]
	}
	return arr
}

function setParams(obj) {
	params = ""
	for (const key in obj) {
		if (Object.hasOwnProperty.call(obj, key)) {
			params += ((params != "") ? "&" : "") + key + "=" + encodeURIComponent(obj[key]);
		}
	}
	return params
}

function setParam(key, val, url=null, redirect=true) {
	params = getParams(url)
	params[key] = val
	encoded = setParams(params)
	nURL = (url) ? url : window.location.href
	fullURL = `${nURL.split("?")[0]}?${encoded}`
	if (redirect) { window.history.replaceState(null, null, fullURL) }
	return fullURL
}

function removeParam(key, url=null, redirect=true) {
	params = getParams(url)
	delete params[key]
	encoded = setParams(params)
	nURL = (url) ? url : window.location.href
	fullURL = `${nURL.split("?")[0]}?${encoded}`
	if (redirect) { window.history.replaceState(null, null, fullURL) }
	return fullURL
}

function param(key,val=null,url=null,redirect=true) {
	if (val === -1) {
		return removeParam(key,url,redirect)
	} 
	if (val) {
			return setParam(key, val, url, redirect)
	} else {
		return getParam(key, url)
	}
}