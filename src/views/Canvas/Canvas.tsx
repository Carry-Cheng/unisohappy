
import React, { Component } from 'react';
import { CanvasProps, CanvasState } from './canvas.d';
import { Point } from '../../core/canvas.d';
import CanvasHelper from '../../core/canvas-helper';
import CircleHelper from './../../core/circle-helper';

const Style = require('./canvas.less');

CanvasHelper.setTimes(2);

export default class Canvas extends Component<CanvasProps, CanvasState> {
	// canvas instance
	canvas: HTMLCanvasElement = undefined;
	context: CanvasRenderingContext2D = undefined;

	linePoints: Point[] = [];

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
				<canvas id="canvas" width={this.state.canvasWidth} height={this.state.canvasHeight}></canvas>
			</div>
		)
	}

	componentDidMount() {
		this.initCanvas();
		// this.drawQuadraticCurve();
		// this.drawQuadraticCurveHigh();
		// this.drawSportLine();
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
			// this.drawQuadraticCurveHigh();
			// this.drawSportLine();
			this.drawFreeMovementLint();
		});
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.windowResizeEvent);
	}

	// 绘制一条自由运动的曲线
	drawFreeMovementLint = () => {
		let gradient = this.context.createLinearGradient(0, 0, this.state.canvasWidth, this.state.canvasHeight);
		gradient.addColorStop(0, '#FCCF31');
		gradient.addColorStop(1, '#F55555');
		this.context.lineWidth = 3;
		this.context.lineCap = 'round';
		this.context.strokeStyle = gradient;
		this.linePoints = [];
		this.linePoints.push({ x: CanvasHelper.center().x, y: CanvasHelper.center().y});
		let interval = setInterval(() => {
			let last = this.linePoints[this.linePoints.length - 1];
			let current = CircleHelper.getDirectionPoint(last, 0, 360);
			this.linePoints.push(current);
			if (this.linePoints.length === 50) {
				this.linePoints.splice(0,1);
			}
			this.context.moveTo(this.linePoints[0].x, this.linePoints[0].y);
			this.linePoints.forEach(element => {
				this.context.lineTo(element.x, element.y);
			});
			this.context.stroke();
			if (this.linePoints.length === 10000) {
				clearInterval(interval);
				interval = null;
			}
		}, 100);
	}

	// 二次贝塞尔曲线
	drawQuadraticCurve = () => {
		this.context.strokeStyle = "#ff0000";
		this.context.beginPath();
		this.context.moveTo(100, 500);
		this.context.quadraticCurveTo(300, 300, 500, 500);
		this.context.stroke();
	}

	// 二次贝塞尔高阶曲线
	drawQuadraticCurveHigh = () => {
		let points: Point[] = [
			{x: 60, y: 200},{x: 100, y: 320},{x: 160, y: 20},{x: 260, y: 100},{x: 360, y: 250},
			{x: 460, y: 600},{x: 520, y: 300},{x: 660, y: 500},{x: 860, y: 400},{x: 1060, y: 200}
		];
		// 绘制折线
		this.context.strokeStyle = "#ff0000";
		this.context.beginPath();
		points.forEach((element, index) => {
			if (index === 0) {
				this.context.moveTo(element.x, element.y);
			} else {
				this.context.lineTo(element.x, element.y);
			}
		});
		this.context.stroke();
		// 绘制贝塞尔曲线
		this.context.strokeStyle = "#ffff00";
		this.context.beginPath();
		for (let index = 0; index < points.length - 1; index++) {
			const element = points[index];
			const next = points[index+1];
			const controlPoint = this.getControlPoint(element, next);
			this.context.moveTo(element.x, element.y);
			this.context.quadraticCurveTo(controlPoint.x, controlPoint.y, next.x, next.y);
		}
		this.context.stroke();
	}
	
	// get control point
	getControlPoint = (p1: Point, p2: Point): Point => {
		return {
			x: p1.x + (p2.x - p1.x)/2 - 50,
			y: p1.y + (p2.y - p1.y)/2 - 50
		}
	}

	// 绘制一条运动的线条
	drawSportLine = () => {
		let gradient = this.context.createLinearGradient(0, 0, this.state.canvasWidth, this.state.canvasHeight);
		gradient.addColorStop(0, '#FCCF31');
		gradient.addColorStop(1, '#F55555');
		this.context.lineWidth = 3;
		this.context.lineCap = 'round';
		this.context.strokeStyle = gradient;
		this.linePoints = [];
		this.linePoints.push({ x: CanvasHelper.center().x, y: CanvasHelper.center().y});
		this.context.moveTo(CanvasHelper.center().x, CanvasHelper.center().y);
		this.testIphone();
		return;
		let interval = setInterval(() => {
			let over = this.startSportLine();
			if (over) {
				clearInterval(interval);
				interval = null;
			}
		}, 50);
	}

	startSportLine = (): boolean => {
		let last = this.linePoints[this.linePoints.length - 1];
		// 朝第一象限运动
		let current = CircleHelper.getFirstQuadrantPoint(last);
		this.linePoints.push(current);
		if (this.linePoints.length > 100) {
			this.linePoints.splice(0,1);
		}
		this.context.moveTo(this.linePoints[0].x, this.linePoints[0].y);
		this.linePoints.forEach(element => {
			this.context.lineTo(element.x, element.y);
		});
		this.context.stroke();
		
		if (this.linePoints.length === 100) {
			return true;
		} else {
			return false;
		}
	}

	testIphone = () => {
		let lll = 0;
		setInterval(() => {
			alert(lll);
			lll++;
		}, 1000);
		return 
		let kkk = 0;
		let interval1 = setInterval(() => {
			this.context.lineTo(CanvasHelper.center().x + 10* kkk, CanvasHelper.center().y + 10* kkk);
			this.context.stroke();
			kkk++;
			if (kkk === 100) {
				clearInterval(interval1);
				interval1 = null;
			}
		}, 100);
		return
		let interval = setInterval(() => {
			let last = this.linePoints[this.linePoints.length - 1];
			// 朝第一象限运动
			let current = CircleHelper.getFirstQuadrantPoint(last);
			this.linePoints.push(current);
			if (this.linePoints.length > 100) {
				this.linePoints.splice(0,1);
			}
			this.context.moveTo(this.linePoints[0].x, this.linePoints[0].y);
			this.linePoints.forEach(element => {
				this.context.lineTo(element.x, element.y);
			});
			this.context.stroke();

			if (this.linePoints.length === 100) {
				clearInterval(interval);
				interval = null;
			}
		}, 50);
	}

}
