class Checker {
    constructor(row, column, color) {

        this.row = row;
        this.column = column;
        this.color = color;
        this.direction = -1;
        this.king = false;
        this.selected = false;
        this.x = 0;
        this.y = 0;
        if(this.color==='BLACK'){
            this.direction = 1;
        }
    }


    calcPosition = function () {
        this.x = cellSize * (this.column);
        this.y = cellSize * (this.row);
    }
    make_king = function (win) {
        this.king = true;
    }
    draw = function () {
        this.calcPosition();
        if(this.color==="WHITE") {
            ctx.drawImage(whiteChecker, this.x, this.y, cellSize, cellSize);

        }else{
            ctx.drawImage(blackChecker, this.x, this.y, cellSize, cellSize);

        }

    }

    move = function(row,column){
        this.row = row;
        this.column = column;
        this.calcPosition();
    }


}