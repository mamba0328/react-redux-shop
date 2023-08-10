import axios from 'axios'

const get = async (url, params = {}) => {
    const response = await axios.get(url, { params });
    return response
}

export { get }