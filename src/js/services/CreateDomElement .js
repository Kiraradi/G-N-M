export default function createDomElement(tag, elementClass ) {
    const elementDom = document.createElement(tag);
    elementDom.classList.add(elementClass);
    return elementDom;
}