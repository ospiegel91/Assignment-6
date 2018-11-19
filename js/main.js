var minecraft = {};


$(document).ready(function () {
    var columns = 20;
    var rows = 20;
    minecraft.initiateCanvas(rows, columns);
    var matrix = minecraft.matrix(rows, columns);
    var theme1 = minecraft.applyTheme1(matrix);
    minecraft.connectMatrixTheme(theme1, rows);
    minecraft.storePosition(matrix, rows);


});

minecraft.initiateCanvas = function (x, y) {
    var canvas = $("#canvas");
    for (var i = 0; i < x; i++) {
        var row = $("<div></div>");
        canvas.append(row);
        row.css("height", ((100 / x) + "%"));
        row.addClass("rowContainer");
        for (var j = 0; j < y; j++) {
            var box = $("<div></div>");
            row.append(box);
            box.css("width", ((100 / y) + "%"));
            box.addClass("unitBox");
        }
    }
}
minecraft.matrix = function (x, y) {
    var arrOfArrs = [];
    for (var i = 0; i < x; i++) {
        arrOfArrs[i] = [];
        for (var j = 0; j < y; j++) {
            arrOfArrs[i][j] = "";
        }
    }
    console.log(arrOfArrs);
    return arrOfArrs;

}
minecraft.applyTheme1 = function(matrix){
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            matrix[i][j] = "sky";
        }
    }
    for (var i = 8; i < 11; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            matrix[i][j] = "Gold";
        }
    }
    for (var i = 11; i < 12; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            matrix[i][j] = "Grass";
        }
    }
    for (var i = 12; i < 20; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            matrix[i][j] = "Dirt";
        }
    }
    console.log(matrix);
    return matrix;
}
minecraft.connectMatrixTheme = function(theme1, x){
    var cells = $(".unitBox");
    for (var i = 0; i < theme1.length; i++) {
        for (var j = 0; j < theme1[i].length; j++) {
            cells.eq(i * x + j)
                .addClass(theme1[i][j]);
        }
    }
    return;
}

minecraft.storePosition = function (matrix, x) {
    var cells = $(".unitBox");
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            cells.eq(i * x + j)
                .data("i", i)
                .data("j", j);
        }
    }
}


// minecraft.matrix = [
//     ["", "", "", "", "","", "", "", "", "","", "", "", "", "","", "", "", "", ""],
//     ["", "", "", "", "","", "", "", "", "","", "", "", "", "","", "", "", "", ""],
//     ["", "", "", "", "","", "", "", "", "","", "", "", "", "","", "", "", "", ""],
//     ["", "", "", "", "","", "", "", "", "","", "", "", "", "","", "", "", "", ""],
//     ["", "", "", "", "","", "", "", "", "","", "", "", "", "","", "", "", "", ""],
//     ["", "", "", "", "","", "", "", "", "","", "", "", "", "","", "", "", "", ""],
//     ["", "", "", "", "","", "", "", "", "","", "", "", "", "","", "", "", "", ""],
//     ["", "", "", "", "","", "", "", "", "","", "", "", "", "","", "", "", "", ""],
//     ["", "", "", "", "","", "", "", "", "","", "", "", "", "","", "", "", "", ""],
//     ["", "", "", "", "","", "", "", "", "","", "", "", "", "","", "", "", "", ""],
//     ["", "", "", "", "","", "", "", "", "","", "", "", "", "","", "", "", "", ""],
//     ["", "", "", "", "","", "", "", "", "","", "", "", "", "","", "", "", "", ""],
//     ["", "", "", "", "","", "", "", "", "","", "", "", "", "","", "", "", "", ""],
//     ["", "", "", "", "","", "", "", "", "","", "", "", "", "","", "", "", "", ""],
//     ["", "", "", "", "","", "", "", "", "","", "", "", "", "","", "", "", "", ""],
//     ["", "", "", "", "","", "", "", "", "","", "", "", "", "","", "", "", "", ""],
//     ["", "", "", "", "","", "", "", "", "","", "", "", "", "","", "", "", "", ""],
//     ["", "", "", "", "","", "", "", "", "","", "", "", "", "","", "", "", "", ""],
//     ["", "", "", "", "","", "", "", "", "","", "", "", "", "","", "", "", "", ""],
//     ["", "", "", "", "","", "", "", "", "","", "", "", "", "","", "", "", "", ""]
// ];