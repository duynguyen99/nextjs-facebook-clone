import { WithId } from "mongodb"


export const toDataTransformedIds = (data: WithId<Document>[]) => {
    const res = data.map(item => {
        return {
            ...item,
            _id: item._id.toString()
        }
    });
    return res;
}