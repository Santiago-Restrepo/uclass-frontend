export function truncate(str: string, length: number): string {
    if (str.length > length) {
        return str.substring(0, length) + '...';
    }
    return str;
}
