export function generateRandomPassword() {
    return Math.random().toString(36).substring(2, 10);
}
