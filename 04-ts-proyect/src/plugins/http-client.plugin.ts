import axios from 'axios';

const httpClientPlugin = {
    get: async (url) => {
        try {
            // const resp = await fetch(url)
            // return resp.ok ? await resp.json() : null;  
            // return resp            
            const resp = await axios.get(url);
            return resp.data
        } catch (error) {
            return null;
        }
    },

    post: async (url, body) => { },
    put: async (url, body) => { },
    delete: async (url, body) => { },
}


module.exports = {
    httpPlugin: httpClientPlugin
}