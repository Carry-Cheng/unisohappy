import React, { Component } from 'react';
const Style = require('./bug.less');
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
            let code = [];
            element.code.forEach(row => {
                code.push(`
                    <div class=${Style['row']}>${row}</div>
                `);
            });
            element.content = code.join('');
        });
    }
}
 
export default Bug;