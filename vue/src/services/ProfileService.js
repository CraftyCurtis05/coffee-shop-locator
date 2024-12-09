// ProfileService.js
import axios from 'axios';

export default {

   // This will hold the original profile data
   originalProfile: null,

  /**
   * Save or update the user's profile.
   * 
   * @param {Object} profile - The profile object containing the updated user data.
   * @returns {Promise<Object>} - A promise that resolves with the response data of the updated profile.
   * @throws {Error} - Throws an error if the request fails.
   */
  saveProfile(profile) {
    if (!this.originalProfile) {
      throw new Error("Original profile data is not set. Cannot perform save operation.");
    }
  
    // Use changedFields for comparison
    const updatedProfile = {};
  
    Object.keys(profile).forEach(key => {
      if (profile[key] !== this.originalProfile[key]) {
        updatedProfile[key] = profile[key];
      }
    });
  
    if (Object.keys(updatedProfile).length === 0) {
      console.log("No changes detected.");
      return Promise.resolve(this.originalProfile);  // No changes to save
    }
  
    return axios.put('/profile', updatedProfile)
      .then(response => {
        this.originalProfile = response.data;  // Update the original profile data
        return response.data;
      })
      .catch(error => {
        console.error("Error saving profile:", error);
        throw error;
      });
  },
  
  /**
   * Retrieve the user's profile.
   * 
   * @returns {Promise<Object>} - A promise that resolves with the response data containing the user's profile.
   * @throws {Error} - Throws an error if the request fails.
   */
  getProfile() {
    return axios.get('/profile')
      .then(response => {
        // Set the original profile data
        this.originalProfile = response.data;
        return response.data;
      })
      .catch(error => {
        console.error("Error fetching profile:", error);
        throw error;
      });
  },

  getFormSubmitted() {
    return axios.get('/profile/submit')
    .then(response => response.data)
    .catch(error => {
      console.error("Error fetching form submitted status:", error);
      throw error;
    })
  },

  /**
   * Upload a new profile image.
   * 
   * @param {FormData} image - The FormData object containing the image file to be uploaded.
   * @returns {Promise<Object>} - A promise that resolves with the response data containing the uploaded image's details.
   * @throws {Error} - Throws an error if the request fails.
   */
  saveImage(image) {
    return axios.post("/image", image, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
      .then(response => response.data)
      .catch(error => {
        console.error("Error uploading image:", error);
        throw error;
      });
  },

  /**
   * Fetch the current profile image.
   * 
   * @returns {Promise<string>} - A promise that resolves with the URL of the current profile image.
   * @throws {Error} - Throws an error if the request fails.
   */
  getImage() {
    return axios.get("/image")
      .then(response => response.data.imageUrl) // Extract and return the image URL from the response data.
      .catch(error => {
        console.error("Error fetching image:", error);
        throw error;
      });
  }
};