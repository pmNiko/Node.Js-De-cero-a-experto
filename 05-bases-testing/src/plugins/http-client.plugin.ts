import axios from 'axios';


export const httpClientPlugin = {
    get: async (url: string) => {
        try {
            const resp = await axios.get(url);
            return resp.data
        } catch (error) {
            return null;
        }
    },

    post: async (url: string, body: {}) => { throw new Error('Not implemented') },
    put: async (url: string, body: {}) => { throw new Error('Not implemented') },
    delete: async (url: string, body: {}) => { throw new Error('Not implemented') },
}

