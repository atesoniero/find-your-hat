const prompt = require('prompt-sync')({
    sigint: true
});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field) {
        this.field = field;
        this.endGame = false;
        this.patchIndex = [];
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

    welcomeMessage() {
        console.log(" ");
        console.log("Find the hat!");
        console.log("Use the keys h,j,k,l to move around the board.");
        console.log(
            "Find the hat(*) and win. Fall in a hole (O) or move out of bound and loose."
        );
        console.log(" ");
    }
    print() {
        for (let i = 0; i < this.field.length; i++) {
            console.log(this.field[i].join(""));
        }
    }

    getDirection() {
        let direction = "";
        let whichWay = false;
        while (!whichWay) {
            direction = prompt('Which direction?').toLocaleLowerCase();
            switch (direction) {
                case "h":
                    this.patchIndex[0] -= 1;
                    whichWay = true;
                    break;
                case "l":
                    this.patchIndex[0] += 1;
                    whichWay = true;
                    break;
                case "k":
                    this.patchIndex[1] -= 1;
                    whichWay = true;
                    break;
                case "j":
                    this.patchIndex[1] += 1;
                    whichWay = true;
                    break;
                default:
                    console.log("Invalid choice: Direction (hjkl)");
                    break;
            }
        }
        return direction;
    }

    findPatch() {
        for (let i = 0; i < this.field.length; i++) {
            if (this.field[i].indexOf("*") != -1) {
                this.patchIndex = [i, this.field[i].indexOf("*")];
                break;
            }
        }
    }

    movePatch() {
        this.field[this.patchIndex[1]][this.patchIndex[0]] = '*';
    };

    winOrLose() {
        // winning and losing conditions
        if (this.patchIndex[1] < 0 || this.patchIndex[1] > this.field.length ||
            this.patchIndex[0] < 0 || this.patchIndex[0] > this.field[0].length) {
            console.log('Ouch!')
            console.log('You fell Out of Bound!')
            this.endGame = true;
        } else if (this.field[this.patchIndex[1]][this.patchIndex[0]] === hole) {
            console.log('OOOOoooooOOOOOOooooooOOOOOoooooOOOOOooooOOOOOooooOOO')
            console.log('You stamped on a hole and fell in it');
            this.endGame = true;
        } else if (this.field[this.patchIndex[1]][this.patchIndex[0]] === hat) {
            console.log('CONGRATULATIONS!!!!!')
            console.log('You found you hat! :)')
            this.endGame = true;
        } else {
            this.endGame = false;
        }
    }

    playGame() {
        this.welcomeMessage();
        this.print();
        this.findPatch();
        this.getDirection();
        while (!this.endGame) {
            this.winOrLose();
            if (!this.endGame) {
                this.movePatch();
                this.print();
                this.getDirection();
            }
        }
    }

}


const firstField = Field.generateField(15, 21, 30);
const newField = new Field(firstField);
newField.playGame();