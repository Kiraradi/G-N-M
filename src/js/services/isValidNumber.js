export function isValidNumber(numberString) {
    if (numberString.length < 4) {
        return false;
    }

    const nubbers = numberString.trim().split('-');
    if (nubbers.length !== 2 || nubbers[0].trim().length > 0 || nubbers[1].trim().length > 0) {
        return false;
    }
    
    return `[${nubbers[0].trim()} - ${nubbers[1].trim()}]`
    
}