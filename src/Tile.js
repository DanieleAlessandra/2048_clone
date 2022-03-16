import {c} from "./Utils";

export default class Tile {
    #x;
    #y;
    #tileElement;
    #value;

    constructor(gameBoard, value = Math.random() < .5 ? 2 : 4) {
        this.#tileElement = c('div', '', ['tile']);
        gameBoard.appendChild(this.#tileElement);
        this.value = value;
    }

    remove() {
        this.#tileElement.remove();
    }

    waitForTransition(animation = false) {
        return new Promise(resolve => {
            this.#tileElement.addEventListener(animation ? 'animationend' : 'transitionend', resolve, {once: true})
        })
    }

    set value(v) {
        this.#value = v;
        this.#tileElement.textContent = v;
        const power = Math.log2(v);
        const backgroundLightness = 100 - power * 9;
        this.#tileElement.style.setProperty('--background-lightness', `${backgroundLightness}%`);
        this.#tileElement.style.setProperty('--text-lightness', `${backgroundLightness <= 50 ? 90 : 10}%`);
    }

    get value() {
        return this.#value;
    }

    set x(v) {
        console.log(v);
        this.#x = v;
        this.#tileElement.style.setProperty('--x', this.#x);
    }

    set y(v) {
        this.#y = v;
        this.#tileElement.style.setProperty('--y', this.#y);
    }
}