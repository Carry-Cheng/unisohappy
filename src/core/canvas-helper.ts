import { Point } from './canvas';
/**
 * CanvasHelper类
 * @export
 * @class CanvasHelper
 */
export default class CanvasHelper {

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
	
}