# Integrating Jeopardy

![The Jeopardy board](https://upload.wikimedia.org/wikipedia/commons/d/d8/Jeopardy_game_board.png)

### :warning: Read the submission guidelines at the bottom of this page first.

1. Refactor your Jeopardy app to use your Grid and Cell classes, and to be organized in terms of categories and difficulty values (dollar values), just like in the real game. *(10 points)*
2. When retrieving Jeopardy questions, validate that neither the question nor the answer are empty (2 points) and that they don't contain HTML artifacts (1 point). If they are invalid, skip and find another (1 point). It's easier than trying to remove the HTML. You can use this RegEx function to test for HTML tags and HTML entities: `const containsHTML = text => /(<.+?>)|(&.{1,6}?;)/.test(text);`. *(4 points)*
3. Notice that jService accepts feedback from users to increment an "invalid_count" property on their questions. (They have an `/api/invalid?id=` endpoint just for this reporting, which we're not going to use.) Anything with an `invalid_count` should be skipped, too. *(2 point)*
4. Escaped characters (e.g. `\"`) are easy to deal with, so just remove the slash from these strings. *(4 points)*

# Submission Guidelines
1. Fork this repo and clone it to your machine.
2. Enable GitHub Pages for your repo.
3. Add your code, per the instructions above.
4. Push your completed code to your own repo.
5. Submit a pull request to the *original* repo.
6. On the PR, add a comment with a link to your GitHub Page for your project.
7. On Canvas, submit a link to your PR.
