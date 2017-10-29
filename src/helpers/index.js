export const parseDate = (date) => {
    const m = date.getMonth();
    const d = date.getDate();
    const addZero = (v) => v < 10 ? `0${v}` : v;

    return `${addZero(d)}.${addZero(m)}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
};
