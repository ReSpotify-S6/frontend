export function toSentenceCase(str: string) {
    return str && [...str].map((char, index) => {
        if(index === 0) {
            return char.toUpperCase();
        }
        if(str[index - 1] === ' ') {
            return char.toUpperCase();
        }
        if(isUpperCase(char) && isLowerCase(str[index - 1])) {
            return ' ' + char;
        }
        return char.toLowerCase();
    }).join('');
}

function isUpperCase (char: string) {
    return char === char.toUpperCase();
}

function isLowerCase (char: string) {
    return char === char.toLowerCase();
}
