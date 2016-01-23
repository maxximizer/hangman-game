# HANGMAN GAME

I have made a HANGMAN GAMe that you can play in  [my website](http://joanna-sobanska.pl/HANGMAN/index.html) directory).

Main assumptions about the game:
+Using real API for fetching random word (endpoint randomWords in Wordnik), length of the words is less than 12 and any word doesn't contain chars as " ", "-" and "'"
+User has 11 lives ( with each lost there will appear part of hangman's body)
+After the game over there is possibility to play again
+Keyboar is controller

Game is written in JS, I have used also a Sass technology. Parts of hangman's body have been done in CSS,
and because of that I dind't have to worry about users with Retina screens
