

export function c(tagName, idName, classList, content) {
    tagName = tagName || 'div';
    idName = idName || '';
    classList = classList || [];
    content = content || '';

    const element = document.createElement(tagName);
    if (!!idName) {
        element.id = idName;
    }
    for (let className of classList) {
        element.classList.add(className);
    }
    element.innerHTML = content;

    return element;
}