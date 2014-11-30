export class BaseModel {
    constructor() {
        /**
         * 変更の通知先
         * @type {BaseCtrl[]}
         */
        this.listner = [];
    }

    /**
     * 通知先登録
     */
    addListner(callback) {
        this.listner.push(callback);
    }

    /**
     * 通知
     */
    notifyListeners() {
        this.listner.forEach(function (callback) {
            callback();
        })
    }
}
