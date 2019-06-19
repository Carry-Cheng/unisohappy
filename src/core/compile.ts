import {Notes} from './enum';
export default class Compiler {
    private readonly Style;
    private readonly keyword = `abstract,as,any,async,await,
                                        break,boolean,
                                        case,catch,class,const,continue,constructor,
                                        debugger,default,delete,do,declare,
                                        else,enum,export,exports,extends,
                                        false,finally,for,function,form,
                                        get,global,
                                        if,import,in,instanceof,is,infer,
                                        keyof,
                                        module,
                                        new,null,number,namespace,never,
                                        object,of,
                                        return,require,readonly,
                                        static,super,switch,string,symbol,set,
                                        this,throw,true,try,typeof,type,
                                        unique,
                                        var,void,
                                        while,with,
                                        implements,interface,
                                        let,
                                        package,private,protected,public,
                                        yield,
                                        `;
    private readonly token = `{,},(,),[,],<,>,.,...,;,>=,=>,<=,=,==,===,!=,!===,
                                        +,-,*,/,**,%,++,--,<<,>>,<<<,&,|,!,~,
                                        &&,||,?,:,@,+=,-=,*=,/=,^`;

    constructor(Style: any) {
        this.Style = Style;
    }
    
    /**
     * 语法,词法分析转成html
    */
    public compile(code: string[]) :string {
        let content = [];
        for (let index = 0; index < code.length; index++) {
            const sentence = code[index];
            let finalSentence: string = '';
            // 判断是否有注释 单行注释还是多行注释 Multiple Single
            let notes = this.hasNotes(sentence);
            if (notes === Notes.Single) {
                let note = sentence.indexOf('//');
                let sentenceNotes: string = sentence.substring(note); // 注释语句
                let sentenceEffective: string = sentence.substring(0, note); // 有效语句
                finalSentence = this.analysis(sentenceEffective);
                // 替换空格
                let replace = sentenceNotes.replace(/ /g, '&nbsp;&nbsp;');
                finalSentence += `<span class=${this.Style['notes']}>${replace}</span>`;
            } else if(notes === Notes.Multiple) {
                let note1 = sentence.indexOf('//');
                let note2 = sentence.indexOf('/*');
            } else {
                finalSentence = this.analysis(sentence);
            }
            content.push(`<div class=${this.Style['row']}>${finalSentence}</div>`);
        }
        return content.join('');
    }

    analysis(sentence: string) :string {
        let finalSentence: string[] = [];
        let splits = sentence.split(' ');
        let es = []; // 拼接关键字、变量名、空格、方法名、符号
        splits.forEach(element => {
            es.push(this.recursionFindSentence(element));
        });
        console.info('result:', es);
        finalSentence.push(`<span class=${this.Style['normal']}>${es.join(' ')}</span>`);  
        
        return finalSentence.join(' ');
    }

    // 判断是否有注释
    // 单行注释还是多行注释
    // Multiple Single
    hasNotes(sentence: string): Notes {
        let note1 = sentence.indexOf('//');
        let note2 = sentence.indexOf('/*');
        if (note1 > -1 || (note1 > -1 && note2 > -1 && note1 < note2)) {
            return Notes.Single;
        }
        if (note2 > -1 || (note1 > -1 && note2 > -1 && note1 > note2)) {
            return Notes.Multiple;
        }
        return Notes.No;
    }

    // 判断关键字、变量名、空格、方法名、符号
    recursionFindSentence(sentence: string) {
        console.info(sentence);
        if (sentence === '') {
            return '&nbsp;&nbsp;';
        }
        // 判断是否是关键字
        if (this.isKeyword(sentence)) {
            return `<span class=${this.Style['keyword']}>${sentence}</span>`;
        }
        // 判断是否是符号
        if (this.isToken(sentence)) {
            return sentence;
        }
        // 判断是否是变量
        if (this.isVariable(sentence)) {
            return `<span class=${this.Style['variable']}>${sentence}</span>`;
        }
        // 都不是的话,根据特殊字符分割

        let splits = [];
        let t = this.token.split(',');
        t.push(','); // 所有特殊字符,(单个)
        let startIndex = 0;
        for (let index = 0; index < sentence.length; index++) {
            const element = sentence[index];
            if (t.includes(element)) {
                splits.push(sentence.substring(startIndex, index));
                splits.push(element);
                startIndex = index+1;
                // // 判断是否是连续特殊字符 最后一个特殊字符
                // if (index === sentence.length - 1 || (sentence[index+1] && !t.includes(sentence[index+1]))) {
                //     splits.push(element);
                // }
                // if (sentence[index+1] && !t.includes(sentence[index+1])) {
                //     startIndex = index+1;
                // } else {
                //     startIndex = index;
                // }
            }
        }
        // 结束没有特殊符号
        if (startIndex < sentence.length - 1) {
            splits.push(sentence.substring(startIndex+1));
        }
        console.info(splits);
        let returnHtml = [];
        splits.forEach(element => {
            returnHtml.push(this.recursionFindSentence(element));
        });
        
        return returnHtml.join('');
    }
    // 判断是否是关键字
    isKeyword(word: string) :boolean {
        if (this.keyword.indexOf(word) > -1) {
            return true;
        }
        return false;
    }
    // 判断是否是特殊符号
    isToken(token: string) :boolean {
        let t = this.token.split(',');
        t.push(',');
        if (t.indexOf(token) > -1) {
            return true;
        }
        return false;
    }
    // 判断是否是变量
    isVariable(variable: string) :boolean {
        return /^[a-zA-Z\$_][a-zA-Z\d_]*$/.test(variable);
    }

}