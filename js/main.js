var minecraft = {};


$(document).ready(function () {
    var canvas = $("#canvas");
    canvas.css("display", "none");
    $("#newGameBtn").on("click", launch);

    function launch() {
        $(".mainMenu").css("display", "none");
        canvas.css("display", "flex");
        minecraft.initiateCanvas();
        var matrix = minecraft.matrix;
        minecraft.connectMatrixTheme(matrix);
        minecraft.storePosition(matrix);
        $("#pickaxe-container").on("click", minecraft.activatePickaxe);
        $("#pickaxe-container").on("click", minecraft.activeToolColor);
        $("#shovel-container").on("click", minecraft.activateShovel);
        $("#shovel-container").on("click", minecraft.activeToolColor);
        $("#axe-container").on("click", minecraft.activateAxe);
        $("#axe-container").on("click", minecraft.activeToolColor);
        $("#torch-container").on("click", minecraft.activateTorch);
        $("#torch-container").on("click", minecraft.activeToolColor);
        $("#current-tool").on("click", minecraft.useInventory);
        
    }

});

minecraft.initiateCanvas = function () {
    var y = 20;
    var x = 20;

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

minecraft.matrix = [
    ["sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky"],
    ["sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky"],
    ["sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky"],
    ["sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "Cloud", "Cloud", "Cloud", "sky", "sky", "sky"],
    ["sky", "Leaves", "Leaves", "Leaves", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "Cloud", "Cloud", "Cloud", "sky", "sky", "sky", "sky"],
    ["sky", "Leaves", "Leaves", "Leaves", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "Cloud", "Cloud", "Cloud", "sky", "sky", "sky", "sky", "sky"],
    ["sky", "Leaves", "Leaves", "Leaves", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky"],
    ["sky", "Leaves", "Leaves", "Leaves", "sky", "sky", "sky", "Gold", "Gold", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky"],
    ["sky", "sky", "Wood", "sky", "sky", "sky", "sky", "Gold", "Gold", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky"],
    ["sky", "sky", "Wood", "sky", "sky", "sky", "sky", "Gold", "Gold", "sky", "sky", "sky", "sky", "sky", "Tnt", "Tnt", "sky", "sky", "sky", "sky"],
    ["sky", "sky", "Wood", "sky", "sky", "sky", "sky", "Gold", "Gold", "sky", "sky", "sky", "sky", "sky", "Tnt", "Tnt", "sky", "sky", "sky", "sky"],
    ["Grass", "Grass", "Grass", "Grass", "Grass", "Grass", "Grass", "Grass", "Grass", "Grass", "Grass", "Grass", "Grass", "Grass", "Grass", "Grass", "Grass", "Water", "Water", "Water"],
    ["Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Water", "Water"],
    ["Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Water"],
    ["Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt"],
    ["Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt"],
    ["Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt"],
    ["Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt"],
    ["Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt"],
    ["Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt", "Dirt"]
];

minecraft.connectMatrixTheme = function (matrix) {
    var x = 20;
    var cells = $(".unitBox");
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            cells.eq(i * x + j)
                .addClass(matrix[i][j]);
        }
    }
    return;
}

minecraft.storePosition = function (matrix) {
    var x = 20;
    var cells = $(".unitBox");
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            cells.eq(i * x + j)
                .data("i", i)
                .data("j", j);
        }
    }
}
minecraft.activeToolColor = function(){
    $(".tool-container").css("background-color","crimson");
    $(this).css("background-color","rgb(90, 255, 57)");
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

minecraft.activateTorch = function () {
    $(".unitBox").off();
    $(".Tnt").on("click", minecraft.setInventory);
    $(".Tnt").on("click", minecraft.turnToDust);
    $(".Leaves").on("click", minecraft.burnTree);
}

minecraft.setInventory = function () {
    var i = $(this).data('i');
    var j = $(this).data('j');
    var changeTo = minecraft.matrix[i][j];
    $("#current-tool").removeClass();
    $("#current-tool").addClass("currentToolContainer");
    if (changeTo === "Leaves" || changeTo === "Tnt") {
        minecraft.matrix[i][j] = "outOfPlay";
        $("#current-tool").val("");
    } else {
        minecraft.matrix[i][j] = "sky";
        $("#current-tool").val(changeTo);
        $("#current-tool").addClass(changeTo);

    }

}

minecraft.turnToSky = function () {
    $(this).removeClass();
    $(this).addClass("unitBox");
    $(this).addClass("sky");
}

minecraft.turnToDust = function () {
    $(".Tnt").addClass("Black");
    $(".Black").removeClass("Tnt");
    $(".Cloud").addClass("Darkgrey");
    $(".Darkgrey").removeClass("Cloud");
}

minecraft.burnTree = function () {
    var numOfLeaves = $(".Leaves").length;
    var i = 0;
    setTimeout(pollute, 3000);
    function fire() {
        var leaves = $(".Leaves");
        leaves.eq(0)
            .addClass("Fire")
            .removeClass("Leaves");
        i++;
        if (i < numOfLeaves) {
            setTimeout(fire, 500);
        }
    }
    fire();
    function pollute() {
        $(".Cloud").addClass("Darkgrey");
        $(".Darkgrey").removeClass("Cloud");
    }
}


minecraft.useInventory = function () {
    var changeTo = $(this).val();
    if (changeTo == "") {
        return;
    }
    $(".sky").on("click", placeTile);
    function placeTile() {
        var i = $(this).data('i');
        var j = $(this).data('j');
        minecraft.matrix[i][j] = changeTo;
        $(this).removeClass("sky");
        $(this).addClass(changeTo);
        $("#current-tool").removeClass(changeTo);
        $("#current-tool").val("");
        $(".sky").off();
    }
}


