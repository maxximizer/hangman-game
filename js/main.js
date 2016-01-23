var geusses = [];
var hangman_body = ["head", "neck", "body", "right_sleeve", "left_sleeve",
    "right_hand", "left_hand", "right_leg", "left_leg", "right_foot",
    "left_foot"
];
var counter = 0;
var correct_counter = 0;
var game_no = 0;

function testAjax(testAjaxHandler) {
    var baseUrl = "http://api.wordnik.com/v4/word.json/";
    var apiKey = "3eadb43693cb0032e40000ab6b60bc79d8fc9f9dfd7795e35";
    var url =
        "http://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=false&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&limit=10&api_key=" +
        apiKey;
    $.ajax({
        url: url,
        data: {
            format: 'json'
        },
        error: function() {
            console.log("An error has occurred");
        },
        dataType: 'jsonp',
        success: function(data) {
            testAjaxHandler(data);
        },
        type: 'GET'
    });
}

function hasNumbers(t) {
    var regex = /\d/g;
    return regex.test(t);
}

function testAjaxHandler(output) {
    var array1 = [];
    for (i = 0; i < output.length - 1; i++) {
        if (output[i].word.length <= 11 & output[i].word.indexOf("-") == -1 &
            output[i].word.indexOf(" ") == -1 & output[i].word.indexOf("'") ==
            -1) {
            array1.push(output[i].word);
        }
    }
    for (i = 0; i < 11; i++) {
        $("li[data-pos=" + i + "]").css("background-color", "#E6E6E8");
    }
    $(document).on('keyup', function(e) {
        var word_to_guess = array1[game_no].toUpperCase();
        geusses.push(value);
        var value = String.fromCharCode(e.keyCode);
        if (!hasNumbers(value) & geusses.indexOf(value) == -1) {
            for (i = 0; i < word_to_guess.length; i++) {
                $("li[data-pos=" + (11 - (word_to_guess.length - i)) +
                    "]").css("background-color", "#4D5258");
            }
            geusses.push(value);
            if (word_to_guess.indexOf(geusses[geusses.length - 1]) ==
                -1) {
                var li = $("<li>").text(geusses[geusses.length - 1]);
                $("#missed").append(li);
                counter += 1;
                var part_of_body = $("#" + hangman_body[counter - 1]);
                part_of_body.removeClass("display");
                if (counter == 11) {
                    $(".overlay").removeClass("display");
                    $(".game_over").removeClass("display");
                    $(".button").removeClass("display");
                }
            } else {
                for (i = 0; i < word_to_guess.length; i++) {
                    if (geusses[geusses.length - 1] ==
                        word_to_guess[i]) {
                        correct_counter += 1;
                        var letter = $("li[data-pos=" + (11 - (
                                word_to_guess.length - i)) +
                            "]");
                        letter.html(geusses[geusses.length - 1]);
                    }
                }
                if (correct_counter == word_to_guess.length) {
                    $(".overlay").removeClass("display");
                    $(".game_over").removeClass("display");
                    $(".button").removeClass("display");
                }
            }
        }
    });
}

function reset() {
    // Wyzerowanie tablicu guesses
    word_to_guess = '';
    counter = 0;
    correct_counter = 0;
    geusses = [];
    output = [];
    game_no += 1;
    // Wyczyszcenie listy wcisnietych klawiszy
    $('#missed li').remove();
    // Usuniecie ludzika
    for (i = 0; i < hangman_body.length; i++) {
        $('#' + hangman_body[i]).addClass("display");
    }
    for (i = 0; i < 11; i++) {
        $("li[data-pos=" + i + "]").empty();
    }
    testAjax(testAjaxHandler);
    $(".overlay").addClass("display");
    $(".game_over").addClass("display");
    $(".button").addClass("display");
}
$(document).ready(function() {
    testAjax(testAjaxHandler);
    $(".button").click(reset);
});
