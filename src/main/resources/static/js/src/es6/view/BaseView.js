export class BaseView {

    /**
     * コンストラクタ
     * @param {string} cssClassNm 管理する対象のcssのclass名
     * @param {Object} models Viewに反映するデータモデル
     */
    constructor(cssClassNm, models = {}) {
        /**
         * 管理するViewのDOM
         * @type {HTMLElement}
         */
        this.el = document.getElementsByClassName(cssClassNm)[0];

        // データモデルの変更時にControllerに変更を通知する
        Object.keys(models).forEach(
                key => models[key].addListner(this.render.bind(this))
        );
    }

    /**
     * コンストラクタ
     * @param {string} cssClassNm 管理DOMの中から検索するcssのclass名
     */
    find(cssClassNm) {
        return this.el.getElementsByClassName(cssClassNm)[0];
    }

    /**
     * 描画処理(継承したクラスはこのメソッドをオーバーライドする)
     */
    render() {
        throw new Error("please override method render");
    }

}
