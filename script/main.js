let main = document.querySelector('#main');
let ctx = main.getContext('2d');
let canvasSize = main.width;
let cellSize = canvasSize/8;

let blackChecker = new Image();
blackChecker.src = 'img/black-checker.png';
let whiteChecker = new Image();
whiteChecker.src = 'img/white-checker.png';

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const row = ~~(y/cellSize);
    const column = ~~(x/cellSize);
    console.log(row, column);
    return {row, column};
}
function isDirectionValid(moves, row,column){
    for(const move of moves){
        const jumpOver = move.jumpOver;
        if(move.newRow === row && move.newColumn === column){
            return jumpOver;
        }
    }
    return false;
}

whiteChecker.onload=()=>{
         const board = new Board();
        const game = new Game(board, main);
        play();

}

function play(){
    if(play){
        const board = new Board();
        const game = new Game(board);
        board.draw();
        let checker = 0;
        let position;
        let state = 1;
        let moves=[];
        main.addEventListener('mousedown', function(e) {
            console.log()
            position = getCursorPosition(main, e);
            const {row, column} = position;
            if(state === 1){
                checker = board.getChecker(position.row, position.column);
                if(checker.color === game.turn) {
                    moves = board.validMoves(checker);
                    console.log(moves.length);
                    for (let i = 0; i < moves.length; i++) {
                        console.log(moves[i]);
                    }
                    //console.log(position);

                    state = 2;
                }
            }else{
                if(checker!=0){
                    const valid =  isDirectionValid(moves,row,column);
                    if(checker.color === game.turn && valid) {
                        board.move(checker, row, column, valid);
                        game.changeTurn();
                    }
                    moves = [];
                    checker = 0;
                    state = 1;
                }
            }
            game.update();
        });
    }
}


