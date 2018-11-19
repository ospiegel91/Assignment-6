


var boxes = $('.box');

matrix = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];

var boxesInRow = 3;

for (var i = 0; i < ticTacToe.matrix.length; i++) {
    for (var j = 0; j < ticTacToe.matrix[i].length; j++) {
        boxes.eq(i * boxesInRow + j)
            .data("i", i)
            .data("j", j);
    }
}