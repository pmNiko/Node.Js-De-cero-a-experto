import axios from 'axios';

// const axios = require('axios');

export const httpClientPlugin = {
    get: async (url: string) => {
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

    post: async (url: string, body: {}) => { },
    put: async (url: string, body: {}) => { },
    delete: async (url: string, body: {}) => { },
}


// module.exports = {
//     httpPlugin: httpClientPlugin
// }

