export class Doramon {
    /**
     * こんすとらくたー
     * @param {string} classNm
     */
    constructor(classNm) {
        this.el = document.
            getElementsByClassName(classNm)[0];
    }

    /**
     * めそっど
     * @param {string} msg
     */
    say(msg) {
        this.el.textContent = msg + "!";
    }
}
