
export default class Cell {
    #cellElement;
    #x;
    #y;
    #tile;
    #mergeTile;

    constructor(cellElement, x, y) {
        this.#cellElement = cellElement;
        this.#x = x;
        this.#y = y;

        cellElement.style.setProperty('--x', x);
        cellElement.style.setProperty('--y', y);
    }

    get x() {
        return this.#x;
    }

    get y() {
        return this.#y;
    }

    get tile() {
        return this.#tile;
    }

    set tile(v) {
        this.#tile = v;
        if (v == null) return;
        this.#tile.x = this.#x;
        this.#tile.y = this.#y;
    }

    get mergeTile() {
        return this.#mergeTile;
    }

    set mergeTile(v) {
        this.#mergeTile = v;
        if (v == null) return;
        this.#mergeTile.x = this.#x;
        this.#mergeTile.y = this.#y;
    }


    canAccept(tile) {
        return this.tile == null || (this.mergeTile == null && this.tile.value === tile.value);
    }

    mergeTiles() {
        if(this.tile == null || this.mergeTile == null) return;
        this.tile.value = this.tile.value + this.mergeTile.value;
        this.mergeTile.remove();
        this.mergeTile = null;
    }
}