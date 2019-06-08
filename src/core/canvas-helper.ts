import { Point, LineGradientColor, LineGradientConfig } from './canvas';
import CircleHelper from './circle-helper';
/**
 * CanvasHelper类
 * @export
 * @class CanvasHelper
 */
export class CanvasHelper {

	/**
	 * CanvasHelper可视区宽高倍数,默认为1倍
	 * @static
	 * @type {number}
	 * @memberof CanvasHelper
	 */
	public static times: number = 1;

	/**
	 * 设置CanvasHelper可视化区域宽高倍数
	 * @static
	 * @param {number} times
	 * @memberof CanvasHelper
	 */
	public static setTimes(times: number) {
		CanvasHelper.times = times;
	}

	/**
	 * CanvasHelper可视区宽度
	 * @static
	 * @returns {number}
	 * @memberof CanvasHelper
	 */
	public static width(): number {
		return (document.documentElement.clientWidth || document.body.clientWidth) * CanvasHelper.times;
	}

	/**
	 * CanvasHelper可视区高度
	 * @static
	 * @returns {number}
	 * @memberof CanvasHelper
	 */
	public static height(): number {
		return (document.documentElement.clientHeight || document.body.clientHeight) * CanvasHelper.times;
	}

	/**
	 * CanvasHelper 中心点坐标
	 * @static
	 * @returns {Point}
	 * @memberof CanvasHelper
	 */
	public static center(): Point {
		return {
			x: CanvasHelper.width() / 2,
			y: CanvasHelper.height() / 2
		};
	}

	public static origin(): Point {
		return {
			x: Math.round(Math.random() * CanvasHelper.width()),
			y: Math.round(Math.random() * CanvasHelper.height())
		}
		 
	}
	
}

export class SportLine {
	public points: Point[] = [];
	public color: LineGradientColor;
	public lineWidth: number;
	public lineSize: number;
	public lineSpace: number;
	constructor(config: LineGradientConfig) {
		this.color = config.color;
		this.lineWidth = config.lineWidth || 10;
		this.lineSize = config.lineSize || 30;
		this.lineSpace = config.lineSpace || 10; // 10px
		this.initPoint();
	}

	private initPoint():void {
		let origin = CanvasHelper.center();
		this.points.push(origin);
		for (let index = 0; index < this.lineSize - 1; index++) {
			let last = this.points[this.points.length - 1];
			// let current = CircleHelper.getDirectionPoint(last, 0, 360, this.lineSpace);
			let current = CircleHelper.getFirstQuadrantPoint(last);
			this.points.push(current);
		}
		console.info('origin', this.points);
	}

	public move():void {
		let lll = this.points.shift();
		// console.info(lll)
		let last = this.points[this.points.length - 1];
		// let current = CircleHelper.getDirectionPoint(last, 0, 360, this.lineSpace);
		let current = CircleHelper.getFirstQuadrantPoint(last);
		this.points.push(current);
		// console.info(this.points)
	}
}