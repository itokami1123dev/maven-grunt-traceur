import {BaseView} from './BaseView';

export class SalaryResultView extends BaseView {
    /**
     * classのコンストラクタ
     * @param {string} cssClassNm 管理対象にするDOMをcssのclass名で指定
     * @param {Object} models
     */
    constructor(cssClassNm, models = {}) {
        super(cssClassNm, models);

        this.resultEl = this.find('js-result');
        this.salary = models.salary;
    }

    /**
     * 描画処理
     * @override
     */
    render() {
        var pay = this.salary.compute().toLocaleString();
        this.resultEl.textContent = `支給額：${pay}円`;
    }
}
