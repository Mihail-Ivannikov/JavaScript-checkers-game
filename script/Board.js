class Board{
    constructor(options) {
        this.board = [];
        this.selected = 0;
        this.black_left = this.white_left = 12;
        this.black_kings = this.white_kings = 0;
        this.createBoard();
    }

    drawBoard = function () {
        let x = 0;
        let y = 0;
        let state = 0;
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (state === 0) {
                    state = 1;
                    ctx.fillStyle = 'black';
                } else {
                    state = 0;
                    ctx.fillStyle = 'white';
                }
                ctx.fillRect(x, y, cellSize, cellSize);
                x += cellSize;
            }
            y += cellSize;
            x = 0;
            state = state - 1;
        }
    }

    move = function(checker, row,column, jumpOver){

        let elemToSwap = this.board[checker.row][checker.column];
        this.board[checker.row][checker.column]=this.board[row][column];
        this.board[row][column] = elemToSwap;
        if(jumpOver===1){
            const midRow = (checker.row+row)/2;
            const midColumn = (checker.column+column)/2;
            this.board[midRow][midColumn]=0;
        }
        checker.move(row, column);
        this.drawBoard();
    }
    getChecker = function(row,column){
        return this.board[row][column];
    }

    createBoard = function () {

        for (let i = 0; i < 8; i++) {
            this.board.push([]);
            for (let j = 0; j < 8; j++) {
                if (j % 2 != ((i + 1) % 2)) {
                    if (i < 3) {
                        const checker = new Checker(i, j, "BLACK");
                        this.board[i].push(checker);
                    } else if (i > 4) {
                        const checker = new Checker(i, j, "WHITE");
                        this.board[i].push(checker);
                    } else {
                        this.board[i].push(0);
                    }
                } else {
                    this.board[i].push(0);
                }
            }
        }

    }


    draw = function () {
        this.drawBoard();
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                let checker = this.board[i][j];

                if (checker && checker!=1) {
                    checker.draw();
                }
                if(checker === 1){
                    ctx.fillStyle = 'green';
                    ctx.fillRect(cellSize*j,cellSize*i,cellSize,cellSize);
                }

            }
        }
    }
    clearMoves = function(){
        for(let i =0;i<8;i++){
            for(let j=0;j<8;j++){
                if(this.board[i][j]===1){
                    this.board[i][j] = 0;
                }
            }
        }
    }
    validMoves = function(checker){
        let possibleMoves=[];
        const row = checker.row;
        const column = checker.column;
        const direction = checker.direction;

        let jumpOver = 1;

        if(row+1<8 && this.board[row+1][column+1]) {
            if (this.board[row + 1][column + 1].color != checker.color) {
                if (row+2<8 && this.board[row + 2][column + 2] === 0) {
                    const newRow = row + 2;
                    const newColumn = column + 2;
                    possibleMoves.push({newRow, newColumn, jumpOver});
                    this.board[newRow][newColumn] = 1;
                }
            }
        }
        if(row+1<8 && this.board[row+1][column-1]) {
            if (this.board[row + 1][column - 1].color != checker.color) {
                if (row+2<8 && this.board[row + 2][column - 2] === 0) {
                    const newRow = row + 2;
                    const newColumn = column - 2;
                    possibleMoves.push({newRow, newColumn, jumpOver});
                    this.board[newRow][newColumn] = 1;
                }
            }
        }
        if(row-1>-1 && this.board[row-1][column+1]) {
            if (this.board[row - 1][column + 1].color != checker.color) {
                if (row-2>-1 && this.board[row - 2][column + 2] === 0) {
                    const newRow = row - 2;
                    const newColumn = column + 2;
                    possibleMoves.push({newRow, newColumn, jumpOver});
                    this.board[newRow][newColumn] = 1;
                }
            }
        }
        if(row-1>-1 && this.board[row-1][column-1]) {
            if (this.board[row - 1][column - 1].color != checker.color) {
                if (row-2>-1 && this.board[row - 2][column - 2] === 0) {
                    const newRow = row - 2;
                    const newColumn = column - 2;
                    possibleMoves.push({newRow, newColumn, jumpOver});
                    this.board[newRow][newColumn] = 1;
                }
            }
        }

    if(possibleMoves.length===0) {
        jumpOver = 2;
        if (this.board[row + direction][column - 1] === 0) {
            const newRow = row + direction;
            const newColumn = column - 1;
            possibleMoves.push({newRow, newColumn,jumpOver});
            this.board[newRow][newColumn] = 1;
        }
        if (this.board[row + direction][column + 1] === 0) {
            const newRow = row + direction;
            const newColumn = column + 1;
            possibleMoves.push({newRow, newColumn, jumpOver});
            this.board[newRow][newColumn] = 1;
        }
    }

        return possibleMoves;
    }







}






