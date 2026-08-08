document.addEventListener("DOMContentLoaded", function () {
    const button = document.querySelector("button");

    button.addEventListener("click", function () {

        document.body.innerHTML = `
            <div style="
                min-height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
                background: #0b1220;
                font-family: Arial, sans-serif;
                padding: 20px;
                box-sizing: border-box;
            ">

                <div style="
                    background: #24344d;
                    padding: 35px 25px;
                    border-radius: 25px;
                    width: 100%;
                    max-width: 500px;
                    text-align: center;
                    color: white;
                    box-sizing: border-box;
                ">

                    <h1>🧠 Challenge 1</h1>

                    <p id="question">
                        Remember this number:
                    </p>

                    <h2 id="number" style="
                        font-size: 50px;
                        margin: 25px 0;
                    ">
                        7392
                    </h2>

                    <button id="startGame" style="
                        padding: 15px 30px;
                        border: none;
                        border-radius: 30px;
                        font-size: 18px;
                        cursor: pointer;
                    ">
                        I'm Ready
                    </button>

                    <div id="gameArea"></div>

                </div>
            </div>
        `;

        document
            .getElementById("startGame")
            .addEventListener("click", function () {

                const number = document.getElementById("number");
                const question = document.getElementById("question");
                const startButton = document.getElementById("startGame");
                const gameArea = document.getElementById("gameArea");

                number.style.display = "none";

                question.textContent = "What was the number?";

                startButton.style.display = "none";

                gameArea.innerHTML = `
                    <input
                        id="answer"
                        type="number"
                        placeholder="Enter number"
                        style="
                            padding: 15px;
                            border-radius: 10px;
                            border: none;
                            font-size: 18px;
                            width: 80%;
                            margin: 15px;
                            box-sizing: border-box;
                        "
                    >

                    <br>

                    <button id="submit" style="
                        padding: 12px 25px;
                        border: none;
                        border-radius: 25px;
                        font-size: 18px;
                        cursor: pointer;
                    ">
                        Submit
                    </button>

                    <p id="result" style="
                        font-size: 20px;
                        margin-top: 20px;
                    "></p>
                `;

                document
                    .getElementById("submit")
                    .addEventListener("click", function () {

                        const answer =
                            document.getElementById("answer").value;

                        const result =
                            document.getElementById("result");

                        if (answer === "7392") {
                            result.textContent =
                                "🎉 Correct! Great memory!";
                        } else {
                            result.textContent =
                                "❌ Not quite! The answer was 7392.";
                        }
                    });
            });
    });
});
