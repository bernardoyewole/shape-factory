'use strict';

export default 'Shape';

export class Shape {
    _name;
    _color;

    constructor(name, color) {
        this._name = name;
        this._color = color;
    }

    getInfo() {
        return `${this._color} ${this._name}`;
    }

    get name() {
        return this._name;
    }

    get color() {
        return this._color;
    }
}