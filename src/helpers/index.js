export const getUniqueID = (length) => {
    let text = '';
    const possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
};

export const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
};


export const getFullApiUrl = (api, groupID) => {
    if (typeof api !== 'string' || typeof groupID !== 'string') {
        throw new Error('Api and groupId should be a string');
    }

    return `${api}/${groupID}`;
};

export const parseDate = (date) => {
    const m = date.getMonth();
    const d = date.getDate();
    const addZero = (v) => v < 10 ? `0${v}` : v;

    return `${addZero(d)}.${addZero(m)}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
};
