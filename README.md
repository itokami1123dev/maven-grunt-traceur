HTML5+α @福岡 - 第22回 発表向け資料
================================

20:30 ECMAScript6について（仮）  
http://html5fukuoka.doorkeeper.jp/events/17567  

### 1. ECMAScript 6 ってどんなの？

> ”ECMAScript 6 は "Harmony" または "ES.next" のコードネームで呼称される、JavaScript の次期標準仕様”
https://developer.mozilla.org/ja/docs/Web/JavaScript/ECMAScript_6_support_in_Mozilla

> ”ECMAに提出する正式のリリースは2015年の6月となる予定”
http://jser.info/post/88276341744/2014-06-09-js-bluebird/

### 2. 試しにES6つかってみたいな

>各ライブラリの対応状況  
http://kangax.github.io/compat-table/es6/

#### ES6を今のブラウザで動かすためのコンパイラ
2014/11/30の時点では..
- 6to5  
  GitHubの☆1,207 / 対応度 59%  
  https://github.com/6to5/6to5  

- google/traceur-compiler  
  GitHubの☆3,703 / 対応度 60%  
  https://github.com/google/traceur-compiler  

- toshok/echo-js  
  GitHubの☆143 / 対応度 66%
  https://github.com/toshok/echo-js  

- google/closure-compiler  
  GitHubの☆786 / 対応度 30%  
  https://github.com/google/closure-compiler

今回は tracerurで試してみました。

### 3. 実際にサンプルを作って試してみました。

#### let と For-Of構文

データモデルが変更時
登録されているView(Controller)配列の
描画メソッドを呼ぶとき...  
この例では*"this.listner"*が
*"View描画メソッド"*の配列

ES5
```JavaScript
notifyListeners() {
  this.listeners.forEach(function (listener) {
    listener();
  });
}
```

ES6
```JavaScript
notifyListeners() {
  for (let listener of this.listeners) {
    listener();
  }
}
```

let はブロック内のみに有効  
for inはkey名をループするがfor ofは値でループできる

#### アロー関数

さっきのはアロー関数で書くこともできる

ES5
```JavaScript
notifyListeners() {
  this.listeners.forEach(function (listener) {
    listener();
  });
}
```

ES6
```JavaScript
notifyListeners() {
  this.listeners.forEach(
    listener => listener()
  );
}
```

今回のサンプルではDOM操作イベント登録でつかっている

```JavaScript
setEvent() {
  this.wageView.addEventListener('change',
    (event) => {
      this.salary.wage = this.wageView.value;
    }
  );

  this.timeView.addEventListener('change',
    event => this.salary.time = this.timeView.value
  );
}
```

引数のカッコや処理スコープの波カッコは省略できる


#### クラス

モデルクラスの基本となるクラスを作成  

ES5
```JavaScript
var BaseModel = function() {
    this.listner = [];
};

BaseModel.prototype.addListner = function (callback) {
  this.listner.push(callback);
}
// ....省略 ...
```

ES6
```JavaScript
class BaseModel {
  constructor() {
    this.listner = [];
  }

  addListner(callback) {
    this.listner.push(callback);
  }

  // ....省略 ...
}
```

#### モジュール

ベースとなるモデルクラスを実際に読み込みます

頭にexportをつけると他のファイルでimportできます。

BaseModel.js
```JavaScript
export class BaseModel {
  constructor() {
    this.listner = [];
  }
  // ...省略...
}
```

Salary.js
```JavaScript
import {BaseModel} from './BaseModel';
```

何故だかコンパイル結果を結合(Gruntでconcat)しないと
importで来ませんでした..外部ファイルできないのかな..調査不足...
```JavaScript
System.register("js/src/es5/model/BaseModel", [], function() {
  "use strict";
  var __moduleName = "js/src/es5/model/BaseModel";
  function require(path) {
    return $traceurRuntime.require("js/src/es5/model/BaseModel", path);
  }
  var BaseModel = function BaseModel() {
    this.listeners = [];
  };
  ($traceurRuntime.createClass)(BaseModel, {
    addListner: function(listener) {
      this.listeners.push(listener);
    },
    notifyListeners: function() {
      for (var $__1 = this.listeners[$traceurRuntime.toProperty(Symbol.iterator)](),
          $__2; !($__2 = $__1.next()).done; ) {
        var listener = $__2.value;
        {
          listener();
        }
      }
    }
  }, {});
  return {get BaseModel() {
      return BaseModel;
    }};
});
System.register("js/src/es5/model/Salary", [], function() {
  "use strict";
  var __moduleName = "js/src/es5/model/Salary";
  function require(path) {
    return $traceurRuntime.require("js/src/es5/model/Salary", path);
  }
  var BaseModel = System.get("js/src/es5/model/BaseModel").BaseModel;
  var Salary = function Salary() {
    $traceurRuntime.superConstructor($Salary).call(this);
    this._wage = 0;
    this._time = 0;
  };
  var $Salary = Salary;
  ($traceurRuntime.createClass)(Salary, {
    compute: function() {
      return this._wage * this._time;
    },
    get time() {
      return this._time;
    },
    set time(time) {
      this._time = time;
      this.notifyListeners();
    },
    get wage() {
      return this._wage;
    },
    set wage(wage) {
      this._wage = wage;
      this.notifyListeners();
    }
  }, {}, BaseModel);
  return {get Salary() {
      return Salary;
    }};
});
```


#### 継承

継承もできます。  
今回はモデルの基本機能を継承した
時給計算モデルを作成しました

ES5
```JavaScript
var Salary = function() {
  BaseModel.call(this)
  this._wage = 0;
  this._time = 0;
};
Salary.prototype = Object.create(BaseModel.prototype);
Salary.ptorotype.constructor = Salary;
Salary.ptorotype.compute = function() {
  return this._wage * this._time;
}
// ... 省略...
```

ES6
```JavaScript
class Salary extends BaseModel {
  constructor() {
    super();
    this._wage = 0;
    this._time = 0;
  }
  compute() {
    return this._wage * this._time;
  }
  // ... 省略 ...
}
```

#### 引数にデフォルトのパラメータ  

Viewクラスは第２引数を省略可能とします  
その場合ES5だと..

ES5
```JavaScript
var BaseView = function(cssClassNm, models) {
  models = models || {};
  this.el = document.getElementsByClassName(cssClassNm)[0];

  // ... 省略 ...
}
```

ES6
```JavaScript
class BaseView {
  constructor(cssClassNm, models = {}) {
    this.el = document.getElementsByClassName(cssClassNm)[0];

  // ... 省略 ...
  }
}
```

### テンプレートリテラル

バッククォートで囲った文字はテンプレートリテラルになる
文字列中に変数を埋め込めます。

ES6
```JavaScript
render() {
  var pay = this.salary.compute().toLocaleString();
  this.resultEl.textContent = `支給額：${pay}円`;
}
```

> テンプレートリテラルが実装された  
http://js-next.hatenablog.com/entry/2014/11/22/042055

### Promise

モデルの初期情報取得のAjaxのとこで
Promiseを使って見る

ES6
```JavaScript
class ApiService {
    constructor() {
    }

    call(url) {
        var xhr = new XMLHttpRequest();

        return new Promise((resolve, reject) => {
            xhr.open('GET', url)
            xhr.onreadystatechange = () => {
                if (xhr.readyState != 4 || xhr.status != 200) {
                    return;
                }
                resolve(xhr.response);
            }
            xhr.send()
        })
    }
}

var api = new ApiService();

api.call("hogehoge").then(
    (response) => {
      var {wage, time} = JSON.parse(response);
      salary.wage = wage;
      salary.time = time;
    }
);
```

こんな変数の初期化ができるみたい
ES6
```JavaScript
var {wage, time} = JSON.parse(response);
```

ES5
```JavaScript
var obj = JSON.parse(response);
var wage = obj.wage;
var time = obj.time;
```

さらにオブジェクトの作成でショートカットがあるみたい
ES6
```JavaScript
var salary = new Salary();
var models = {
  salary
};
```

ES5
```JavaScript
var salary = new Salary();
var models = {
  salary: salary
};
```


このサンプルの起動方法
-------------------
動作にはJava8とMaven、node.jsが必要です
```bash
$ mvn clean compile

$ mvn spring-boot:run
```

ブラウザで起動
http://localhost:8080/
