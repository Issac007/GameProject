var mount;
var highScore = 0;
var arrTopScores = [];
var isGameOver = false;
var gameHolderCopy;
$(document).ready(function() {
    gameHolderCopy = $("#gameholder").html();
    gameStart();

    function gameStart() {
        $("#gameholder div").each(function() {
            if ($(this).attr("id") != "title") {
                $(this).css("display", "none");
            }
        });

        $("#btnStart").on("click", function() {
            $(this).unbind("click");
            $(this).fadeOut(500);
            $("#ddlDifficulty").fadeOut(500);
            $("#title").hide();
            setUpMound();
        });

        $("body").on("keypress", function(event) {
            $("body").unbind("keypress");
            if (event.which === 13) {
                $("#btnStart").fadeOut(1000);
                $("#title").fadeOut(1000);
                $("#ddlDifficulty").fadeOut(500);
                setUpMound();
            }
        });
        $("#gameholder div").mousedown(function(e) {
            if ($(this).attr("id") != "title") {
                $(this).unbind("mousedown");
                gameHandler(this);
            }
        });
    }

    function setUpMound() {
        var counter = 0;
        $("#gameholder div").each(function() {

            if ($(this).attr("id") != "title") {

                if ($("#ddlDifficulty").val() == 1) {
                    $("#gameholder").css("width", "600px");
                    if (counter < 9) {
                        counter++;
                        $(this).addClass("gameObj");
                        $(this).fadeIn(1000);
                    }
                } else if ($("#ddlDifficulty").val() == 2) {
                    $("#gameholder").css("width", "1200px");
                    $(this).addClass("gameObj");
                    $(this).fadeIn(1000);
                }

            }
        });
        var gameObjs = $(".gameObj");
        for (var i = 0; i < gameObjs.length; i++) {
            var target = Math.floor(Math.random() * gameObjs.length - 1) + 1;
            var target2 = Math.floor(Math.random() * gameObjs.length - 1) + 1;
            gameObjs.eq(target).before(gameObjs.eq(target2));
        }
    }

    function gameHandler(elem) {
        $("#score").css("display", "block");
        var bgImg = $(elem).css("background-image");
        $(elem).css("background-image", bgImg);
        if ($(elem).attr("id") != "yeti" && $(elem).attr("id") != "yeti1") {
            highScore += 1;
            $("#score").html("Your score : " + highScore);
            //  hideItem($(elem));

            if ((highScore == 8 && $("#ddlDifficulty").val() == 1) || (highScore == 16 && $("#ddlDifficulty").val() == 2)) {
                playAudio('../sounds/gameWin.mp3');
                isGameOver = true;
                $("#gameholder").fadeOut(1500);
                $("#txtMessage").fadeIn(1500);
                $("#txtMessage").html("Hurrayy!! You won");
                $("#score").html("Your score : " + highScore);
                $("#score").fadeIn(1500);

            } else {
                playAudio('../sounds/voiceClick.mp3');
            }
        } else {
            playAudio('../sounds/lost.mp3');
            isGameOver = true;
            $("#gameholder").fadeOut(1500);
            $("#txtMessage").fadeIn(1500);
            $("#txtMessage").html("Uff!! You are dead");
            $("#score").fadeIn(1500);
            $("#score").html("Your score : " + highScore);
            //hideItem($(elem));

        }
        if (isGameOver == true) {

            arrTopScores.push(highScore);
            arrTopScores = arrTopScores.sort();
            arrTopScores.reverse();
            var topScoresHtml = $("#topScore");
            topScoresHtml.html("<h3>Top Scores</h3>");
            var length = 3;
            if (arrTopScores.length < 3) {
                length = arrTopScores.length;
            }
            for (var i = 0; i < length; i++) {
                var order = i + 1;
                topScoresHtml.append("<span>" + order + ".</span>" + "<label> " + arrTopScores[i] + "</label><br>");
            }
            $("#topScore").fadeIn(2000);
            $("#btnRestart").fadeIn(2000);
            $("#btnNew").fadeIn(2000);
        }
    }

    function playAudio(url) {
        var audio = new Audio(url);
        audio.currentTime = 0;
        audio.play();
    }

    $("#btnRestart").on("click", function() {

        $("#gameholder div").each(function() {
            if ($(this).attr("id") != "title") {
                $(this).attr("onmousedown", "gameHandler()");
            }
        });

        $("#gameholder").html(gameHolderCopy);
        $("#title").css("display", "none");
        $("#txtMessage").fadeOut(1000);
        $("#score").fadeOut(1000);
        $("#topScore").fadeOut(1000);
        $("#btnRestart").fadeOut(1000);
        $("#btnNew").fadeOut(2000);
        gameStart();
        setUpMound();
        highScore = 0;
        isGameOver = false;
        $("#gameholder").css("display", "block");
    });
    $("#btnNew").on("click", function() {

        location.reload();
    });

});