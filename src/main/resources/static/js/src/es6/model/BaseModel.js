export class BaseModel {
    constructor() {
        /**
         * 変更の通知先
         * @type {BaseView[]}
         */
        this.listner = [];
    }

    /**
     * 通知先登録
     * @param {function} callback
     */
    addListner(callback) {
        this.listner.push(callback);
    }

    /**
     * 通知
     */
    notifyListeners() {
        this.listner.forEach(callback=>callback());
    }
}
