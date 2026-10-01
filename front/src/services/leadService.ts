import { get, post } from "../util/http"
const api = '/lead'
export const leadService = {
  api,
  get: async({_id}:{_id:string}) =>{
    return await get({api: `${api}/get/${_id}`})
  },
  list: async() => {
    return await get({api: `${api}/`})
  },
  upsert: async(data: any) => {
    return await post({api: `${api}/upsert`, options: {data}})
  },
  getPrograms: async() => {
    return await get({api: `${api}/programs`})
  },
}

