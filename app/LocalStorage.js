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

export async function getList(key: string) : Promise<Array<any>> {
    const listString = await AsyncStorage.getItem(key);
    if (listString === null) {
        return [];
    }

    return JSON.parse(listString);
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