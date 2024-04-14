import client from "./client/client.js";

export default async function call (requestType, url, data=null){
    return  client[requestType](url, data);
}