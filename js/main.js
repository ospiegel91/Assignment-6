var minecraft = {};


$(document).ready(function () {
    var canvas = $("#canvas");
    canvas.css("display", "none");

    $("#newGameBtn").on("click", launch);

    function launch() {
        $(".mainMenu").css("display", "none");
        canvas.css("display", "flex");
        var columns = 20;
        var rows = 20;
        minecraft.initiateCanvas(rows, columns);
        var matrix = minecraft.matrix(rows, columns);
        var theme1 = minecraft.applyTheme1(matrix);
        minecraft.connectMatrixTheme(theme1, rows);
        minecraft.storePosition(matrix, rows);
        
        $("#pickaxe-container").on("click", minecraft.activatePickaxe);
        $("#shovel-container").on("click", minecraft.activateShovel);
        $("#axe-container").on("click", minecraft.activateAxe);

        $("#current-tool").on("click", minecraft.useInventory);

    }

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
minecraft.applyTheme1 = function (matrix) {
    for (var i = 0; i < 11; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            matrix[i][j] = "sky";
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

    //tree
    matrix[7][2] = "Wood";
    matrix[8][2] = "Wood";
    matrix[9][2] = "Wood";
    matrix[10][2] = "Wood";
    matrix[4][1] = "Leaves";
    matrix[4][2] = "Leaves";
    matrix[4][3] = "Leaves";
    matrix[5][1] = "Leaves";
    matrix[5][2] = "Leaves";
    matrix[5][3] = "Leaves";
    matrix[6][1] = "Leaves";
    matrix[6][2] = "Leaves";
    matrix[6][3] = "Leaves";
    matrix[7][1] = "Leaves";
    matrix[7][2] = "Leaves";
    matrix[7][3] = "Leaves";

    //goldMine
    matrix[9][7] = "Gold";
    matrix[9][8] = "Gold";
    matrix[10][7] = "Gold";
    matrix[10][8] = "Gold";
    matrix[7][7] = "Gold";
    matrix[7][8] = "Gold";
    matrix[8][7] = "Gold";
    matrix[8][8] = "Gold";
    //cloud 
    matrix[3][14] = "Cloud";
    matrix[3][15] = "Cloud";
    matrix[3][16] = "Cloud";
    matrix[4][13] = "Cloud";
    matrix[4][14] = "Cloud";
    matrix[4][15] = "Cloud";
    matrix[5][12] = "Cloud";
    matrix[5][13] = "Cloud";
    matrix[5][14] = "Cloud";
    //Water
    matrix[11][17] = "Water";
    matrix[11][18] = "Water";
    matrix[11][19] = "Water";
    matrix[12][18] = "Water";
    matrix[12][19] = "Water";
    matrix[13][19] = "Water";
    //TNT
    matrix[10][14] = "Tnt";
    matrix[10][15] = "Tnt";
    matrix[9][14] = "Tnt";
    matrix[9][15] = "Tnt";

    console.log(matrix);
    return matrix;
}
minecraft.connectMatrixTheme = function (theme1, x) {
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

minecraft.activatePickaxe = function () {
    $(".unitBox").off();
    $(".Gold").on("click", minecraft.setInventory);
    $(".Gold").on("click", minecraft.turnToSky);
}
minecraft.activateShovel = function () {
    $(".unitBox").off();
    $(".Grass").on("click", minecraft.setInventory);
    $(".Grass").on("click", minecraft.turnToSky);
    $(".Dirt").on("click", minecraft.setInventory);
    $(".Dirt").on("click", minecraft.turnToSky);
}
minecraft.activateAxe = function () {
    $(".unitBox").off();
    $(".Wood").on("click", minecraft.setInventory);
    $(".Wood").on("click", minecraft.turnToSky);
}

minecraft.setInventory = function(){
    var i = $(this).data('i');
    var j = $(this).data('j');
    var changeTo = minecraft.applyTheme1(minecraft.matrix(20,20))[i][j];
    $("#current-tool").removeClass();
    $("#current-tool").addClass("currentToolContainer");
    $("#current-tool").addClass(changeTo);
    $("#current-tool").val(changeTo);
    minecraft.applyTheme1(minecraft.matrix(20,20))[i][j]==="sky";
}

minecraft.turnToSky = function () {
    $(this).removeClass();
    $(this).addClass("unitBox");
    $(this).addClass("sky");
}

minecraft.useInventory = function () {
    var changeTo = $(this).val();
    if(changeTo==""){
        return;
    }
    $(".sky").on("click", placeTile);
    function placeTile(){
        $(this).removeClass("sky");
        $(this).addClass(changeTo);
        $("#current-tool").removeClass(changeTo);
        $("#current-tool").val(changeTo);
        $(".sky").off();
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