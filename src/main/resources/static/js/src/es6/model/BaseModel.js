export class BaseModel {
    constructor() {
        /**
         * 変更の通知先
         * @type {BaseView[]}
         */
        this.listeners = [];
    }

    /**
     * 通知先登録
     * @param {function} listener
     */
    addListner(listener) {
        this.listeners.push(listener);
    }

    /**
     * 通知
     */
    notifyListeners() {
        for (let listener of this.listeners) {
            listener();
        }
    }
}
