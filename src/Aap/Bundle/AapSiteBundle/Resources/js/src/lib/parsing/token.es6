export class Token {
    /**
     * @param {number} type
     * @param {string} text
     * @param {Lexer} lexer
     */
    constructor(type, text, lexer) {
        this.type = type;
        this.text = text;
        this.lexer = lexer;
    }

    /**
     * @returns {string}
     */
    toString() {
        let name = this.lexer.getTokenName(this.type);

        return '<"' + this.text + '", "' + name + '">';
    }
}