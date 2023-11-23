'use strict';

import { onEvent, select, selectAll, create, print } from "./utils.js";

import author, { Shape } from "./Shape.js";

const createBtn = select('.create');
const shapeOption = select('.shape');
const colorOption = select('.color');
const gridContainer = select('.grid-container');
const factoryInfo = select('.factory-info');
const STORAGE = 24;
let array = [];
let count = 0;

function getSelectedText(element) {
    if (element.selectedIndex !== -1) {
        return element.options[element.selectedIndex].text;
    }
}

function createShapeObj() {
    let colorText = getSelectedText(colorOption);
    let newShape = new Shape(shapeOption.value, colorText);
    array.push(newShape);
}

function createShape() {
    count++;

    let newShape = create('div');
    if (shapeOption.value == "circle") {
        newShape.classList.add('circle');
    }
    newShape.style.backgroundColor = `#${colorOption.value}`;
    newShape.classList.add(`item-${count}`);
    gridContainer.appendChild(newShape);
}

function optionsValid() {
    if (shapeOption.value !== "" && colorOption.value !== "") {
        return true;
    } else {
        factoryInfo.innerText = `Please, select a shape and a color`;
        return false;
    }
}

onEvent('click', createBtn, () => {
    clickClear();
    if (array.length < STORAGE && optionsValid()) {
        createShapeObj();
        createShape();
    } else if (array.length === STORAGE) {
        clear();
        factoryInfo.innerText = `Storage is full!`;
    }
});

function getUnit(ele) {
    let className = ele[ele.length - 1];
    let classArr = className.split('-');
    let unit = classArr[classArr.length - 1];
    return unit;
}

function setInfo(unit, info) {
    factoryInfo.innerText = `Unit ${unit}: ${info}`;
}

onEvent('click', window, (event) => {
    if (gridContainer.hasChildNodes()) {
        gridContainer.childNodes.forEach(node => {
            if (node.contains(event.target)) {
                let unit = getUnit(node.classList);
                let info = array[unit - 1].getInfo();
                setInfo(unit, info);
            }
        });
    }
});

function clear() {
    createBtn.classList.add('clear');
    createBtn.value = 'Clear';
}

function clickClear() {
    if (createBtn.value == 'Clear') {
        location.reload();
    }
}