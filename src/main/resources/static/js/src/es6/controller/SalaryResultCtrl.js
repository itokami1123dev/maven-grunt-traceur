import {BaseCtrl} from './BaseCtrl';

export class SalaryResultCtrl extends BaseCtrl {
    /**
     * classのコンストラクタ
     * @param {string} cssClassNm 管理対象にするDOMをcssのclass名で指定
     * @param {Object} models
     */
    constructor(cssClassNm, models = {}) {
        super(cssClassNm, models);

        this.resultView = this.find('js-result');
        this.salary = models.salary;
    }

    /**
     * 描画処理
     * @override
     */
    render() {
        this.resultView.textContent =
            (this.salary.compute()).toLocaleString();
    }
}
