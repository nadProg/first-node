import colors from 'colors';

export const error = (msg) => console.log(colors.bgRed.black(msg));

export const warn = (msg) => console.log(colors.bgYellow.black(msg));

export const info = (msg) => console.log(colors.bgWhite.black(msg));

export const success = (msg) => console.log(colors.bgGreen.black(msg));
