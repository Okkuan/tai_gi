
import axios from 'axios';

const url="https://b345-61-222-207-205.ngrok-free.app";

const api = axios.create({
  baseURL: url,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Fetch all items
export const getAll = (item) => {
  return new Promise((resolve, reject) => {
    api.get(`/${item}`)
      .then(response => resolve(response.data))
      .catch(error => reject(error));
  });
};
export const getProjectPage = (item,grade,page,pageSize,stage) => {
  return new Promise
  ((resolve, reject) => {
    api.get(`/${item}/grade/${grade}/stage/${stage}/currentpage/${page - 1}/size/${pageSize}`)
      .then(response => resolve(response.data))
      .catch(error => reject(error));
  });
};

// Fetch a specific item by ID
export const getItemById = (item,itemId) => {
  return new Promise((resolve, reject) => {
    api.get(`/${item}/${itemId}`)
      .then(response => resolve(response.data))
      .catch(error => reject(error));
  });
};
export const getAudioCombine = (itemId) => {
  return new Promise((resolve, reject) => {
    api.get(`/subtitle/audioCombine/${itemId}`)
      .then(response => resolve(response.data))
      .catch(error => reject(error));
  });
};

// Create a new item
export const createItem = (item,itemData) => {
  return new Promise((resolve, reject) => {
    api.post(`${item}`, itemData)
      .then(response => resolve(response.data))
      .catch(error => reject(error));
  });
};

// Update an existing item
export const updateItem = (item,itemId, itemData) => {
  return new Promise((resolve, reject) => {
    api.put(`/${item}/${itemId}`, itemData)
      .then(response => resolve(response.data))
      .catch(error => reject(error));
  });
};
export const updateAudio = (itemId, itemData) => {
  return new Promise((resolve, reject) => {
    api.put(`/subtitle/audio/${itemId}`, { base64Data: itemData }, {
      headers: {
        "Content-Type": "application/json"
      }})
      .then(response => resolve(response.data))
      .catch(error => reject(error));
  });
};


// Delete an item
export const deleteItem = (itemId) => {
  return new Promise((resolve, reject) => {
    api.delete(`/items/${itemId}`)
      .then(response => resolve(response.data))
      .catch(error => reject(error));
  });
};
