const appendChild = (parent, child) => {
	if (Array.isArray(child)) {
		child.forEach((nestedChild) => appendChild(parent, nestedChild));
	} else if (parent.tagName === "TEMPLATE") {
		parent.content.appendChild(child.nodeType ? child : document.createTextNode(child));
	} else {
		parent.appendChild(child.nodeType ? child : document.createTextNode(child));
	}
};

export const createElement = (tag, props, ...children) => {
	const element = document.createElement(tag);
	Object.entries(props || {}).forEach(([name, value]) => {
		if (name.startsWith("on") && name.toLocaleLowerCase() in window) {
			element.addEventListener(name.toLowerCase().substring(2), value);
		} else {
			element.setAttribute(name, value.toString());
		}
	});

	children.forEach((child) => {
		appendChild(element, child);
	});

	return element
};

export const createFragment = (props, ...children) => children
