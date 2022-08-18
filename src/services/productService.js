import * as request from './requester'

const baseUrl = 'http://localhost:3030/data/products'

export const getAll = () => request.get(baseUrl)

export const getOne = (productID) => request.get(`${baseUrl}/${productID}`)

export const create = (productData) => request.post(baseUrl, productData)

export const edit = (productID, productData) => request.put(`${baseUrl}/${productID}`, productData)