import { getFullApiUrl } from './';
import { getRandomColor, getUniqueID } from './index';

const api = 'https://lab.lectrum.io/feed';
const groupId = 'l1lz1az2m5';
const assert = 'Api and groupId should be a string';

describe('heplers', () => {
    test('getFullApiUrl should be a function', () => {
        expect(typeof getFullApiUrl).toBe('function');
    });

    test('getFullApiUrl function should throw an error if wrong non-string arguments were passed ', () => {
        function getFullApiUrlWithError () {
            getFullApiUrl(null, 1);
        }

        expect(getFullApiUrlWithError).toThrowError(assert);
    });

    test('getFullApiUrl should return full API if executed successfully', () => {
        expect(getFullApiUrl(api, groupId)).toBe(`${api}/${groupId}`);
    });


    test('getUniqueID function return a string', () => {
        expect(typeof getUniqueID(20)).toBe('string');
    });

    test('getUniqueID function return string length 20', () => {
        expect(getUniqueID(20).length).toBe(20);
    });


    test('getRandomColor function return string and length 7', () => {
        expect(typeof getRandomColor()).toBe('string');
        expect(getRandomColor().length).toBe(7);
    });

    test('getRandomColor function return has only #, number and letter', () => {
        function reg () {
            return /^#[A-f]*\d*/.test(getRandomColor())
        }
        expect(reg()).toBe(true);
    });
});
