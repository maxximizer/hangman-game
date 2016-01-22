var geusses = [];
var hangman_body = ["head", "neck", "body", "right_sleeve", "left_sleeve",
    "right_hand", "left_hand", "right_leg", "left_leg", "right_foot",
    "left_foot"
];
var counter = 0;
var correct_counter=0;
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

function testAjaxHandler(output) {
    var word = output[game_no].word.toUpperCase();
    for (i = 0; i < word.length; i++) {
        $("li[data-pos=" + (11 - (word.length - i)) + "]").css(
            "background-color", "#4D5258");
    }
    $(document).on('keyup', function(e) {
        var value = String.fromCharCode(e.keyCode);
        geusses.push(value);
        if (counter == 11 || correct_counter == word.length) {

            $(".overlay").removeClass("display");
  $(".game_over").removeClass("display");
  $(".button").removeClass("display");
        } else {
            if (word.indexOf(geusses[geusses.length - 1]) == -1) {
                var li = $("<li>").text(geusses[geusses.length - 1]);
                $("#wyniki").append(li);
                counter += 1;
                var part_of_body = $("#" + hangman_body[counter - 1]);
                part_of_body.removeClass("display");
            } else {
                for (i = 0; i < word.length; i++) {
                    if (geusses[geusses.length - 1] == word[i]) {
                        correct_counter += 1;
                        var letter = $("li[data-pos=" + (11 - (word
                            .length - i)) + "]");
                        letter.html(geusses[geusses.length - 1]);
                    }
                }
            }
        }
    });
}

function reset() {
  console.log("Aha");
    // Wyzerowanie tablicu guesses
    word = '';
    counter = 0;
    correct_counter=0;
    geusses = [];
game_no+=1;
    // Wyczyszcenie listy wcisnietych klawiszy
    $('#wyniki li').remove();

    // Usuniecie ludzika
    for(i=0; i<hangman_body.length; i++) {
        $('#' + hangman_body[i]).remove;
    }
    $(".overlay").addClass("display");
$(".game_over").addClass("display");
$(".button").addClass("display");
}

$(document).ready(function() {
    testAjax(testAjaxHandler);
    $(".button").click(reset);

});
