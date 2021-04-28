
export async function delay(timeout) {
    return new Promise(resolved => {
        setTimeout(resolved, timeout);
    });
}

export function shuffleArray(array, count = 1) {
    for (let i = 0; i < count; i++) {
        array.sort(() => Math.random() - 0.5);
    }

}