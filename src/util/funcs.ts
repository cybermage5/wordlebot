export function replaceCharacterAtIndex(str: string, index: number, newChar: string) {
    if (index < 0 || index >= str.length) {
        return str; // Index out of range, return the original string
    }
    return str.slice(0, index) + newChar + str.slice(index + 1);
}
