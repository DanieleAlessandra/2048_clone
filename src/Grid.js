import {c} from "./Utils";
import Cell from "./Cell";

const GRID_SIZE = 4;
const CELL_SIZE = 20;
const CELL_GAP = 2;

export default class Grid {
    #cells;

    constructor(gridElement) {
        {
            gridElement.style.setProperty('--grid-size', GRID_SIZE);
            gridElement.style.setProperty('--cell-size', `${CELL_SIZE}vmin`);
            gridElement.style.setProperty('--cell-gap', `${CELL_GAP}vmin`);
            this.#cells = createCellElements(gridElement).map((cellElement, index) => {
                return new Cell(cellElement, index % GRID_SIZE, Math.floor(index / GRID_SIZE));
            });
        }
    }

    get cellsByColumn() {
        return this.#cells.reduce((cellGrid, cell) => {
            cellGrid[cell.x] = cellGrid[cell.x] || [];
            cellGrid[cell.x][cell.y] = cell;
            return cellGrid;
        }, []);
    }

    get cellsByRow() {
        return this.#cells.reduce((cellGrid, cell) => {
            cellGrid[cell.y] = cellGrid[cell.y] || [];
            cellGrid[cell.y][cell.x] = cell;
            return cellGrid;
        }, []);
    }

    get #emptyCells() {
        return this.#cells.filter(cell => cell.tile == null);
    }

    get cells() {
        return this.#cells;
    }

    randomEmptyCell() {
        const emptyCells = this.#emptyCells;
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        return emptyCells[randomIndex];
    }

}

function createCellElements(gridElement) {
    const cells = [];
    for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
        const cell = c('div', '', ['cell']);
        cells.push(cell);
        gridElement.append(cell);
    }
    return cells;
}