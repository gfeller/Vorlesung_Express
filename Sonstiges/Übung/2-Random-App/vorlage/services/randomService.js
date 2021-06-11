export function getRandomList(count, min, max) {
    return [...Array(count).keys()].map(i => getRandom(min, max));
}

export function getRandom(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}
