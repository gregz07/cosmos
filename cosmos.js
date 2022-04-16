var bodyTemplateState = "";

document.addEventListener("DOMContentLoaded", function(event) {
	bodyTemplateState = document.body.innerHTML.toString();

	Object.freeze(bodyTemplateState)
	
	replaceTemplates(cosmos_pt)
});

function changeLang(lang) {
	switch (lang.value) {
		case "pt": 
			document.body.innerHTML = bodyTemplateState
			document.getElementById("languages").value = "pt";
			replaceTemplates(cosmos_pt)
			break
		case "en": 
			document.body.innerHTML = bodyTemplateState
			document.getElementById("languages").value = "en";
			replaceTemplates(cosmos_en)
			break
	}
}

function resolve(path, obj) {
	return path.split(".").reduce(function(prev, curr) {
			return prev ? prev[curr] : null
	}, obj || self)
}

function replaceTemplates (src) {
	const elements = [...document.querySelectorAll("div")]
	
	const divs = elements.filter(function(e){
		return e.innerText.match(/{{(.*)}}/)
	});
		
	divs.forEach(function(div) {
		const matches = [...div.innerHTML.matchAll(/{{(.*)}}/g)]

		let html = div.innerHTML.replaceAll(/{{(.*)}}/g, function(str, ...match) {
			const value = resolve(match[0], src)
			return value
		})

		div.innerHTML = html
	})
}