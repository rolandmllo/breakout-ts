import '../public/style/style.css'

import Brain from "./Brain.ts";
import UI from "./Ui.ts";

function validateIndexHtml() {
    if (document.querySelectorAll("#container").length !== 1) {
        throw Error("Validation");
    }
}

function uiDrawRepeater(ui: UI, brain: Brain): void {
    brain.playGame();
    ui.draw();

    requestAnimationFrame(() => {
        uiDrawRepeater(ui, brain);
    });
}

function main(): void {
    validateIndexHtml()
    const appDiv = document.querySelector<HTMLDivElement>("#container")!;

    const brain = new Brain();
    const ui = new UI(brain, appDiv);

    document.addEventListener('keydown', (e): void => {
        switch (e.key) {
            case 'ArrowRight':
                brain.startMovePaddle(-1);
                break;
            case 'ArrowLeft':
                brain.startMovePaddle(1);
                break;
            case ' ':
                brain.togglePause();
                break;
        }
    });

    document.addEventListener('keyup', () => {
        brain.stopMovePaddle();
    });

    requestAnimationFrame(() => {
        uiDrawRepeater(ui, brain);
    });
}


//================main=================//
console.log("App startup...")

main();