// @flow

import { AsyncStorage } from 'react-native';

export async function storeList(key: string, list: Array<any>) : Promise<boolean> {
    const currentList = await getList(key);
    const combined = currentList.concat(list);
    try {
        await AsyncStorage.setItem(key, JSON.stringify(combined));
        return true;
    } catch (e) {
        return false;
    }
}

export function getList(key: string) : Promise<Array<any>> {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(key).then((listString) => {
            if (listString === null) {
                resolve([]);
            }

            resolve(JSON.parse(listString));
        }, err => reject(err));
    });
}

export async function storeListItem(key: string, item: any) : Promise<boolean> {
    let list = await getList(key);
    list.push(item);
    const listString = JSON.stringify(list);

    try {
        await AsyncStorage.setItem(key, listString);
        return true;
    } catch (e) {
        return false;
    }
}