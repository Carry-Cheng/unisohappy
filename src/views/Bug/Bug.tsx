import React, { Component } from 'react';
const Style = require('./bug.less');
import Compiler from '../../core/compile';
const compiler = new Compiler(Style);
export interface BugProps {
    
}
 
export interface BugState {
    bugs: any[];
}
 
class Bug extends React.Component<BugProps, BugState> {
    constructor(props: BugProps) {
        super(props);
        this.state = {
            bugs: []
        };
    }

    render() {
        return (
            <div className={Style['bug']}>
                <div className={Style['header']}>
                    <h1>逆袭之路</h1>
                    <p>写与不写你都那里，不悲不喜</p>
                </div>
                <div className={Style['container']}>
                    {
                        this.state.bugs.map((element, index) => {
                            return (
                                <div key={index} className={Style['list']}>
                                    <h2>{element.title}</h2>
                                    <h3>{element.time}</h3>
                                    <div className={Style['code']} dangerouslySetInnerHTML = {{ __html: element.content }}></div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
    
    componentDidMount() {
        let v = [];
        v.push({
            title: '测试',
            time: '2019-06-19',
            code: [
                "// 这是当行注释",
                "/*     这是 多行注释*/",
                "/* 这是多行注释",
                "       急急急急急急",
                "       WebSQL(关系数据库，通过SQL语句访问)*/",
                "let sss = new XDomainRequest();",
                "var xhr = new XDomainRequest();",
                "xhr.onload = function() {",
                "   alert(xhr.responseText);",
                "}",
                "xhr.open('get', 'url:xxxxxxxxxxx', true);",
                "xhr.send();"
            ],
            content: ''
        });
        v.push({
            title: '前端本地存储',
            time: '2019-06-17',
            code: [
                "// 一、Storage",
                "//     1. LocalStorage",
                "//     2. SessionStorage",
                "//     3. IndexedDB",
                "//     4. WebSQL(关系数据库，通过SQL语句访问)",
                "//     5. Cookie",
                "// 二、Cache",
                "//     1. Cache Storage",
                "//     2. Application Cache(manifest文件)",
                "// 三、其它",
                "//     1. IE(userData)"
            ],
            content: ''
        });
        v.push({
            title: 'IE6-9不支持CORS',
            time: '2019-06-17',
            code: [
                "// XDomainRequest ",
                "var xhr = new XDomainRequest();",
                "xhr.onload = function() {",
                "   alert(xhr.responseText);",
                "}",
                "xhr.open('get', 'url:xxxxxxxxxxx', true);",
                "xhr.send();"
            ],
            content: ''
        });
        v.push({
            title: 'JavaScript作用域的坑',
            time: '2019-06-17',
            code: [
                "// ES5只有全局作用域和函数作用域，不是块级作用域",
                "// 想要变成块级作用域必须用IIFE(匿名函数)",
                "// IIFE(Immediately-Invoked Function Expression)",
                "// 变量提升(将变量的声明提升到函数的最上面)",
                "// ES6新增块级作用域",
                "// 为什么ES6要新增let,const",
                "// 1.ES5变量提升导致内层变量可能会覆盖外层变量",
                "// 2.ES5用来计数的循环变量泄露为全局变量",
                "// let 暂时性死区（temporal dead zone）,可以解决闭包",
                "var arr = [];",
                "for(let i = 0; i < 2; i++){",
                "   arr[i] = function(){",
                "       console.log(i);",
                "   }",
                "}",
                "arr[1](); // 1",
            ],
            content: ''
        });
        v.push({
            title: 'Canvas清除画布的坑',
            time: '2019-06-12',
            code: [
                "this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;",
                "this.context.beginPath();",
                "this.context.clearRect(0, 0, this.state.canvasWidth, this.state.canvasHeight);"
            ],
            content: ''
        });
        this.convertCode(v);
        this.setState(() => ({
            bugs: v
        }));
    }

    convertCode = (v: any[]) => {
        v.forEach(element => {
            let content = compiler.compile(element.code);
            element.content = content;
        });
    }
}
 
export default Bug;