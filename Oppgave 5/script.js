const body = document.getElementsByTagName ('body');
const main = document.createElement('main');
let p = document.createElement('p');
const select = document.createElement('select');
const testBtn = document.createElement('button');
const resetBtn = document.createElement('button');
const array = [{id: 1, name: "Option 1"}, {id: 2, name: "Option 2"}, {id: 3, name: "Option 3"}];
const selectStyle = 'display: block; margin: 0 auto; top: 50%; width: 50%; max-width: 500px;';
const ul = document.createElement('ul');
const liTags = ['li', 'li', 'li', 'li'];

const populateSelectBox = () => {
    array.forEach((object) => { 
        const option = document.createElement('option');
        option.innerHTML = object.name;
        select.appendChild(option);
    });
}

const removeLetter = (str) => { 

    const splitStr = str.split(' ');
    let cutSplitStr = splitStr.map(s => s.substring(1));
    return cutSplitStr.join(' ');
}

const reverseString = (str) => { return str.split('').reverse().join(''); }

const printParagraph = () => { p.innerHTML = removeLetter(reverseString(p.innerHTML)); }

const createLiElements = () => { return liTags.map(tag => document.createElement(tag)); }

const deleteListElement = (event) => {
    const selectedElement = event.target.parentNode;
    ul.removeChild(selectedElement);
}

const addListElements = (elements) => {
    elements.forEach((element) => {
        const button = document.createElement('button');
        button.innerHTML = "Delete";
        button.addEventListener('click', deleteListElement);
        element.appendChild(button);
        ul.appendChild(element);
    });
}

const resetList = () => {
    ul.innerHTML = "";
    addListElements(createLiElements());
}

try{
    body[0].appendChild(main);
    p.innerHTML = "Jeg trener på javascript";
    p.classList.add("paragraph");
    main.appendChild(p);
    populateSelectBox();
    main.appendChild(select);
    select.style.cssText = selectStyle;
    testBtn.innerHTML = "Test";
    resetBtn.innerHTML = "Reset";
    main.after(testBtn);
    main.after(resetBtn);
    testBtn.addEventListener('click', printParagraph);
    main.appendChild(ul);
    addListElements(createLiElements());
    resetBtn.addEventListener('click', resetList);


} catch (error) {
    console.log(error);
  }
