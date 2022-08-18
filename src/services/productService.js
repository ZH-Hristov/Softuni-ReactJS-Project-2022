import * as request from './requester'

const baseUrl = 'http://localhost:3030/data/products'

export const getAll = () => request.get(baseUrl)

export const create = (productData) => request.post(baseUrl, productData)