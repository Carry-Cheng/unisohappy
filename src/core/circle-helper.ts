import { Point } from './canvas';

/**
 * 圆类
 * @export
 * @class CircleHelper
 */
export default class CircleHelper {

	public static getFirstQuadrantPoint(origin: Point, radius: number = 10): Point {
		// 0° ~ 90°
		let radian = Math.PI*2 / 360 * (Math.random() * 90);
		return {
			x: origin.x + radius * Math.cos(radian),
			y: origin.y - radius * Math.sin(radian)
		}
	}
	public static getSecondQuadrantPoint(origin: Point, radius: number = 10): Point {
		// 90° ~ 180°
		let radian = Math.PI*2 / 360 * (Math.random() * 90 + 90);
		return {
			x: origin.x + radius * Math.cos(radian),
			y: origin.y - radius * Math.sin(radian)
		}
	}
	public static getThirdQuadrantPoint(origin: Point, radius: number = 10): Point {
		// 180° ~ 270°
		let radian = Math.PI*2 / 360 * (Math.random() * 90 + 180);
		return {
			x: origin.x + radius * Math.cos(radian),
			y: origin.y - radius * Math.sin(radian)
		}
	}
	public static getFourthQuadrantPoint(origin: Point, radius: number = 10): Point {
		// 270° ~ 360°
		let radian = Math.PI*2 / 360 * (Math.random() * 90 + 270);
		return {
			x: origin.x + radius * Math.cos(radian),
			y: origin.y - radius * Math.sin(radian)
		}
	}
	// 自定义方向
	public static getDirectionPoint(origin: Point, startRadian: number, endRadian: number, radius: number = 10): Point {
		let radian = Math.PI*2 / 360 * (Math.random() * endRadian + (endRadian - startRadian));
		return {
			x: origin.x + Math.round(radius * Math.cos(radian)),
			y: origin.y + Math.round(radius * Math.sin(radian))
		}
	} 

}