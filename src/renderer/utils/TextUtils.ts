import voca from "voca";

const AVERAGE_READ_SPEED = 220; // words per minute

export function calculateReadTime(wordsCount: number) {
    return Math.ceil(wordsCount / AVERAGE_READ_SPEED);
}

export function countWords(str: string): number {
    return voca.countWords(str);
}
