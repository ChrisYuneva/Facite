function uId() {
    const hashTable: readonly string[] = [
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
    ];
    const UniversalUniqueIdentifier = [];

    for (let i = 0; i < 36; ++i) {
        if (i === 8 || i === 13 || i === 18 || i === 23) {
            UniversalUniqueIdentifier[i] = '-';
        } else {
            UniversalUniqueIdentifier[i] = hashTable[Math.ceil(Math.random() * hashTable.length - 1)];
        }
    }

    return UniversalUniqueIdentifier.join('');
}

export default uId;