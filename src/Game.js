import {c} from "./Utils";
import Grid from "./Grid";
import Tile from "./Tile";

export default class Game {
    #gameBoard;
    #grid;

    constructor() {
        this.#drawStartingElements();
        this.#addTwoRandomTiles();
        this.#setupInput();
    }

    #drawStartingElements() {
        this.#gameBoard = c('div', 'game-board');
        this.#grid = new Grid(this.#gameBoard);
        document.body.appendChild(this.#gameBoard);
    }

    #addRandomTile() {
        return this.#grid.randomEmptyCell().tile = new Tile(this.#gameBoard);
    }

    #addTwoRandomTiles() {
        this.#addRandomTile();
        this.#addRandomTile();
    }

    #setupInput() {
        const _this = this;
        window.addEventListener('keydown', function (e) {
            _this.#handleInput(e).then()
        }, {once: true});
    }

    async #handleInput(e) {
        switch (e.key) {
            case 'ArrowUp':
                if (!this.#canMoveUp()) {
                    this.#setupInput();
                    return;
                }
                await this.#moveUp();
                break;
            case 'ArrowRight':
                if (!this.#canMoveRight()) {
                    this.#setupInput();
                    return;
                }
                await this.#moveRight();
                break;
            case 'ArrowDown':
                if (!this.#canMoveDown()) {
                    this.#setupInput();
                    return;
                }
                await this.#moveDown();

                break;
            case 'ArrowLeft':
                if (!this.#canMoveLeft()) {
                    this.#setupInput();
                    return;
                }
                await this.#moveLeft();
                break;
            default:
                this.#setupInput();
                return;
        }


        this.#grid.cells.forEach(cell => cell.mergeTiles());
        const newTile = this.#addRandomTile();

        if (!this.#canMoveUp() && !this.#canMoveRight() && !this.#canMoveDown() && !this.#canMoveLeft()) {
            newTile.waitForTransition(true).then(() => {
                alert('Game Over');
            })
            return;
        }

        this.#setupInput();

    }

    #moveUp() {
        return Game.#slideTiles(this.#grid.cellsByColumn);
    }

    #moveRight() {
        return Game.#slideTiles(this.#grid.cellsByRow.map(row => [...row].reverse()));
    }

    #moveDown() {
        return Game.#slideTiles(this.#grid.cellsByColumn.map(col => [...col].reverse()));
    }

    #moveLeft() {
        return Game.#slideTiles(this.#grid.cellsByRow);
    }

    #canMoveUp() {
        return this.#canMove(this.#grid.cellsByColumn);
    }

    #canMoveRight() {
        return this.#canMove(this.#grid.cellsByRow.map(row => [...row].reverse()));
    }

    #canMoveDown() {
        return this.#canMove(this.#grid.cellsByColumn.map(col => [...col].reverse()));
    }

    #canMoveLeft() {
        return this.#canMove(this.#grid.cellsByRow);
    }

    #canMove(cells) {
        return cells.some(group => {
            return group.some((cell, index) => {
                if (index === 0) return false;
                if (cell.tile == null) return false;
                const moveToCell = group[index - 1];
                return moveToCell.canAccept(cell.tile);
            })
        })
    }

    static #slideTiles(cells) {
        return Promise.all(
            cells.flatMap(group => {
                const promises = [];
                for (let i = 1; i < group.length; i++) {
                    const cell = group[i];
                    if (cell.tile == null) continue;
                    let lastValidCell = null;
                    for (let j = i - 1; j >= 0; j--) {
                        const moveToCell = group[j];
                        if (!moveToCell.canAccept(cell.tile)) break;
                        lastValidCell = moveToCell;
                    }
                    if (lastValidCell != null) {
                        promises.push(cell.tile.waitForTransition())
                        if (lastValidCell.tile != null) {
                            lastValidCell.mergeTile = cell.tile;
                        } else {
                            lastValidCell.tile = cell.tile;
                        }
                        cell.tile = null;
                    }
                }
                return promises;
            })
        )
    }
}