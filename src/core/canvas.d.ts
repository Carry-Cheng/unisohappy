
export declare interface Point {
	x: number;
	y: number;
}

export declare interface LineGradientColor {
	begin: string;
	end: string;
}

export declare interface LineGradientConfig {
	color: LineGradientColor;
	lineWidth?: number;
	lineSize?: number;
	lineSpace?: number;
}