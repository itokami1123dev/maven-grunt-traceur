export class ApiService {
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

