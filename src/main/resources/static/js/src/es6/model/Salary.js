import {BaseModel} from './BaseModel';

export class Salary extends BaseModel {
    constructor() {
        super();

        /**
         * 時給
         * @type {number}
         */
        this._wage = 0;

        /**
         * 勤務時間
         * @type {number}
         */
        this._time = 0;

    }

    /**
     * 給与計算
     * @returns {number}
     */
    compute() {
        return this._wage * this._time;
    }

    get time() {
        return this._time;
    }

    set time(time) {
        this._time = time;
        this.notifyListeners();
    }

    get wage() {
        return this._wage;
    }

    set wage(wage) {
        this._wage = wage;
        this.notifyListeners();
    }
}
