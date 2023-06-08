class Game{
    constructor(board , main){
        this.selected=0;
        this.board = board;
        this.turn = 'WHITE';
        this.main = main;
        this.valid_moves = {};


    }
    update = function(){
        this.board.draw();
        this.board.clearMoves();

    }
    reset = function(){
        this.selected = false;
        this.board = Board();
        this.turn = 'WHITE';
        this.valid_moves = {};
    }



    changeTurn = function(){
        if(this.turn ==='BLACK'){
            this.turn = 'WHITE';
        }else{
            this.turn = 'BLACK';
        }
    }






}