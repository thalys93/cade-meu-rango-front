export function generatePass() {
    const lenght = 4;
    const charset = '0123456789';

    let pass = '';

    for (let i = 0, n = charset.length; i < lenght; ++i) {
        pass += charset.charAt(Math.floor(Math.random() * n));
    }

    return pass;
}
