import { LineGradientColor } from './canvas.d';
export default class Color {
    private static readonly customColor: string[] = [
        '#ff0000',
        '#eb4310',
        '#f6941d',
        '#fbb417',
        '#ffff00',
        '#cdd541',
        '#99cc33',
        '#3f9337',
        '#219167',
        '#239676',
        '#24998d',
        '#1f9baa',
        '#0080ff',
        '#3366cc',
        '#333399',
        '#003366',
        '#800080',
        '#a1488e',
        '#c71585',
        '#bd2158'
    ]
    public static customLineGradientColors(): LineGradientColor[] {
        const v:LineGradientColor[] = []
        for (let b = 0; b < Color.customColor.length; b++) {
            const begin = Color.customColor[b];
            for (let e = b + 1; e < Color.customColor.length; e++) {
                const end = Color.customColor[e];
                v.push({
                    begin: begin,
                    end: end
                })
            }
        }
        return v;
    }
}