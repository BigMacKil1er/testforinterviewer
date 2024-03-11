import { itemObj } from "../../app/types"

export function deleteDouble(items:itemObj[]) {
    const map = new Map()
    for (const item of items) {
        map.set(item.id, item)
    }
    // const uniqueItems = {
    //     result: Array.from(map.values())
    // }
    return Array.from(map.values())
}