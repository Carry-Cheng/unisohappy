
import React, { Component } from 'react';
import { CanvasProps, CanvasState } from './canvas.d';
import { Point, LineGradientConfig } from '../../core/canvas.d';
import { CanvasHelper, SportLine } from '../../core/canvas-helper';
import CircleHelper from '../../core/circle-helper';
import Color from '../../core/color';

const Style = require('./canvas.less');

CanvasHelper.setTimes(2);

export default class Canvas extends Component<CanvasProps, CanvasState> {
	// canvas instance
	canvas: HTMLCanvasElement = undefined;
	context: CanvasRenderingContext2D = undefined;

	linePoints: Point[] = [];
	sportLines: SportLine[] = [];

	constructor(props: CanvasProps) {
		super(props);
		this.state = {
			canvasWidth: CanvasHelper.width(),
			canvasHeight: CanvasHelper.height()
		};
	}

	render() {
		return (
			<div className={Style['canvas']}>
				{/* operating area */}
				{/* <div className={Style['operating']}>
					<button onClick={this.canvasToBlob}>toBlob</button>
					<button onClick={this.canvasDownload}>canvasDownload</button>
				</div> */}
				{/* canvas */}
				<canvas id="canvas" width={this.state.canvasWidth} height={this.state.canvasHeight}></canvas>
			</div>
		)
	}

	componentDidMount() {
		this.initCanvas();
		this.drawFreeMovementLint();
	}

	initCanvas = () => {
		this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
		this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;
		window.addEventListener('resize', this.windowResizeEvent);
	}

	// clear canvas
	clearCanvas = () => {
		this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;
		this.context.beginPath();
		this.context.clearRect(0, 0, this.state.canvasWidth, this.state.canvasHeight);
	}

	windowResizeEvent = () => {
		this.setState(() => {
			return {
				canvasWidth: CanvasHelper.width(),
				canvasHeight: CanvasHelper.height()
			}
		}, () => {
			this.clearCanvas();
			this.drawFreeMovementLint();
		});
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.windowResizeEvent);
	}

	// 绘制一条自由运动的曲线
	drawFreeMovementLint = () => {
		let timessssss = 1;
		let sx = 0;
		let ex = CanvasHelper.width();
		let intervalsssss = setInterval(() => {
			this.clearCanvas();
			let gradient = this.context.createLinearGradient(sx, 100*timessssss, ex, 100*timessssss);
			gradient.addColorStop(0, '#ff0000');
			gradient.addColorStop(1, '#0080ff');
			this.context.lineWidth = 10;
			this.context.lineCap = 'round';
			this.context.strokeStyle = gradient;
			this.context.moveTo(sx, 100*timessssss);
			this.context.lineTo(ex, 100*timessssss);
			this.context.stroke();
			timessssss++;
			if(timessssss > 10) {
				clearInterval(intervalsssss);
				intervalsssss = null;
			}
		}, 1000)



		return
		let colors = Color.customLineGradientColors(); // 190 = 19+18+...+1
		for (let index = 0; index < 1; index++) {
			const color = colors[index];
			const config:LineGradientConfig = {
				color: color,
				lineWidth: undefined,
				lineSize: undefined,
				lineSpace: undefined
			} 
			const line = new SportLine(config);
			this.sportLines.push(line);
		}
		// draw
		let times = 0;
		let interval = setInterval(() => {
			this.clearCanvas();
			this.sportLines.forEach(element => {
				element.move();
				let points = element.points;
				let s = points[0], e = points[points.length - 1 ];
				console.info(s)
				let gradient = this.context.createLinearGradient(s.x, s.y, e.x, e.y);
				gradient.addColorStop(0, element.color.begin);
				gradient.addColorStop(1, element.color.end);
				this.context.lineWidth = element.lineWidth;
				this.context.lineCap = 'round';
				this.context.strokeStyle = gradient;
				this.context.moveTo(s.x, s.y);
				for (let index = 1; index < points.length; index++) {
					this.context.lineTo(points[index].x, points[index].y);
				}
				this.context.stroke();
			});
			times++;
			if(times === 10) {
				clearInterval(interval);
				interval = null;
			}
		}, 200)
	}

	canvasToBlob = () => {
		this.canvas.toBlob((result) => {
			console.info(result);
			alert('ok toBlob:' + result.size + '-' + result.type);
		});
	}

	canvasDownload = () => {
		this.canvas.toBlob((result) => {
			this.download(result, 'canvas.png');
		});
	}

	// download
	download = (blob: Blob, fileName: string) => {
		// only IE10, it's most usage of jquery.
		if (window.navigator.msSaveBlob != null) {
			window.navigator.msSaveBlob(blob, fileName);
		} else {
			let a = document.createElement('a');
			let url = window.URL.createObjectURL(blob);
			if ('download' in a) {
				a.download = fileName;
				a.style.display = 'none';
				a.href = url;
				document.body.appendChild(a);
				a.click();
				document.body.removeChild(a);
				window.URL.revokeObjectURL(url);
			} else {
				// alert('不支持本地下载呀.');
				window.open(url);
				window.URL.revokeObjectURL(url);
			}
		}
	} 

}
