export const bugs = [
    {
        title: '测试',
        time: '2019-06-19',
        code: `
            // 这是当行注释
            /*     这是 多行注释*/
            /* 这是多行注释
                急急急急急急
                WebSQL(关系数据库，通过SQL语句访问)*/
            let sss = new XDomainRequest();
            var xhr = new XDomainRequest();
            xhr.onload = function() {
                alert(xhr.responseText);
            }
            xhr.open('get', 'url:xxxxxxxxxxx', true);
            xhr.send();
        `,
        content: ''
    }
]