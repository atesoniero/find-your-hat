const prompt = require('prompt-sync')({
    sigint: true
});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field) {
        this._field = field;
    }

    static generateField(width, height, percentage) {
        let board = [];
        let boardWidth = [];
        for (let i = 0; i < width; i++) {
            boardWidth.push(fieldCharacter);
        }
        for (let i = 0; i < height; i++) {
            board.push(boardWidth.slice());
        }

        // Add starting point (top-left corner)
        board[0][0] = pathCharacter;

        //Add Hat (pick random position)
        let x = Math.floor(Math.random() * height);
        let y = Math.floor(Math.random() * width);
        // make sure the hat is not on the starting point position.
        while (board[x][y] === pathCharacter) {
            x = Math.floor(Math.random() * height);
            y = Math.floor(Math.random() * width);
        }
        board[x][y] = hat;

        // Add Holes
        const numOfHoles = Math.round((width * height * percentage) / 100);
        let holes = 0;
        while (holes < numOfHoles) {
            x = Math.floor(Math.random() * height);
            y = Math.floor(Math.random() * width);
            if (board[x][y] === fieldCharacter) {
                board[x][y] = hole;
                holes += 1;
            }
        }
        return board;
    }

    print() {
        for (let i = 0; i < this._field.length; i++) {
            console.log(this._field[i].join(""));
        }
    }
}


const firstField = Field.generateField(8,7,30);
const newField = new Field(firstField);
newField.print()