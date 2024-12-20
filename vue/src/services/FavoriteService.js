// FavoriteService.js

import axios from 'axios';

export default {

    // POST a new favorite
    createFavorite(favorite) {
        return axios.post('/favorites', favorite)
        .then(response => response.data)
        .catch(error => {
            console.error("There was an error creating the favorite!", error);
            throw error;
        });
    },

    // GET all favorites for the logged-in user
    getFavorites() {
        return axios.get('/favorites')
        .then(response => response.data)
        .catch(error => {
            console.error("There was an error fetching favorites!", error);
            throw error;
        });
    },

    // DELETE a favorite from user profile
    deleteFavorite(favoriteId) {
        return axios.delete(`/favorites/${favoriteId}`)
        .then(response => response.data)
        .catch(error => {
            console.error("There was an error deleting this favorite!", error);
            throw error;
        });
    }
};