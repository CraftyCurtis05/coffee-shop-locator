<!-- NavBar.vue Component -->

<template>
    <nav v-if="!$route.meta.hideNavBar">
        <article class="nav-container">

            <section class="logo-container">
                <router-link v-bind:to="{ name: 'home' }" v-if="$store.state.token != ''">
                    <img :src="logo" class="logo" alt="Jolt Logo" title="Click to Go to Home">
                    <img :src="logoResponsive" class="logo-responsive" alt="Jolt Logo" title="Click to Go to Home">
                </router-link>
            </section>    

            <section class="toggle-container">
                <button @click="isNavOpen = !isNavOpen" title="Click to Open Navigation Links">☰</button>
            </section>    
       
            <!-- link-container: Will show up only when `isNavOpen` is true -->
            <section class="link-container" :class="{ 'nav-open': isNavOpen }">
                <router-link class="link" v-bind:to="{ name: 'home' }" v-if="$store.state.token != ''" title="Click to Go to Home">
                    <h3 class="open">HOME</h3>
                </router-link>

                <div class="separator">|</div>

                <router-link class="link" v-bind:to="{ name: 'locator' }" v-if="$store.state.token != ''" title="Click to Go to Locator">
                    <h3 class="open">LOCATOR</h3>
                </router-link>

                <div class="separator">|</div>
            
                <router-link class="link" v-bind:to="{ name: 'shop' }" v-if="$store.state.token != ''" title="Click to Go to Shop">
                    <h3 class="open">SHOP</h3>
                </router-link>

                <div class="separator">|</div>

                <router-link class="link" v-bind:to="{ name: 'articles' }" v-if="$store.state.token != ''" title="Click to Go to Articles">
                    <h3 class="open">ARTICLES</h3>
                </router-link>

                <div class="separator">|</div>
        
                <router-link class="link" v-bind:to="{ name: 'aboutUs' }" v-if="$store.state.token != ''" title="Click to Go to About Us">
                    <h3 class="open">ABOUT US</h3>
                </router-link>

            </section>

            <!-- Profile -->
            <section class="profile-container" :class="{ 'nav-open': isNavOpen }">

                <router-link class="link logout" v-bind:to="{ name: 'logout' }" v-if="$store.state.token != ''" title="Click to Logout">
                    <h3>LOGOUT</h3>
                </router-link>

                <!-- Profile Picture with dynamic src -->
                 <div class="image-container" :class="{ 'nav-open': isNavOpen }">
                    <router-link v-bind:to="{ name: 'profile' }" v-if="$store.state.token != ''" title="Click to Go to Profile">
                        <!-- Fallback image used if no profile image is fetched -->
                        <img :src="imageUrl || 'src/assets/profile_view/profile_pic.png'" alt="Profile Picture" />
                    </router-link>
                </div>
            </section>

        </article>
    </nav>
</template>

<script>
// Importing the ProfileService to fetch the profile image
import ProfileService from '../services/ProfileService.js';

export default {
    name: 'NavBar',
  data() {
    return {
        isNavOpen: false, // Tracks whether the nav is open
        imageUrl: null,
        logo: 'src/assets/app/logo/jolt_logo.png',
        logoResponsive: 'src/assets/app/logo/logo_responsive.png'
    };
  },

  methods: {

    async fetchImage() {
      try {
        const imageUrl = await ProfileService.getImage();
        this.imageUrl = imageUrl;
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    }
  },

  mounted() {
    this.fetchImage();
  }
};
</script>

<style scoped>
/*** Laptop L - 1440px ***/
/* src/assets/styles.css or App.vue */
@font-face {
  font-family: 'Vonique 43';
  src: url('@/assets/app/fonts/vonique_43/Vonique 43_D.otf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

nav { 
    width: 100%;
    background-color: rgb(160, 153, 145);
    padding: 0;
    margin: 0;
}

.nav-container {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    height: 4rem;
}

.logo-container {
    display: flex;
    justify-content: flex-start;
    margin-left: 1rem;
}

.logo {
    width: 8rem;
    height: auto;
}

.logo-responsive {
    display: none;
    width: 3.5rem;
    margin: 0;
    padding: 0;
}

.toggle-container button {
    display: none; /* Initially hidden for larger screens */
}

.link-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 1.25rem;
    margin: 0 auto;
}

h3,
.link {
    font-family: 'Vonique 43', sans-serif;
    font-weight: bolder;
    font-size: 1rem;
    color: rgb(245, 242, 242);
    text-decoration: none;
    transition: all 0.3s ease-in-out;
}

h3:hover,
.link:hover {
    color: #525459;
    transform: scale(1.05);
}

.separator {
    color: #333437;
}

.profile-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    gap: .5rem;
    margin-right: 1.3rem;
}

.image-container {
    display: flex;
    justify-content: flex-end;
    width: 3.1rem; 
    height: 3.1rem; 
    overflow: hidden; 
    border-radius: 50%;
    border: .25rem #e8bb64 solid;
    transition: all 0.3s ease-in-out;
}

.image-container img { 
    width: 100%; 
    height: auto;
}

.image-container:hover {
    border: .25rem rgb(53, 37, 19) solid;
    transform: scale(1.05);
    filter: grayscale(70%);
}

/*** 4K - 2560px ***/
@media screen and (min-width: 2560px) {

    .nav-container {
        height: 6rem;
    }

    .logo-container img {
        width: 12rem;
    }

    .link-container {
        gap: 1.9rem;
    }

    h3,
    .separator {
        font-size: 1.7rem;    
    }

    .profile-container {
        gap: 1rem;
        margin-right: 1.5rem;
    }

    .image-container {
        width: 5rem;
        height: 5rem;
        border: .35rem #e8bb64 solid;
    }
}

/*** Laptop - 1024px ***/
@media screen and (max-width: 1024px) {

    .logo-container {
        margin-left: .5rem;
    }

    .link-container {
        gap: 1rem;
    }

    h3 {
        font-size: .9rem;
    }
}

/*** Tablet - 768px ***/
@media screen and (max-width: 768px) {

    .toggle-container button {
        display: block; /* Show toggle button on smaller screens */
        position: relative;
        right: 17rem;
        background-color: transparent;
        font-size: 2rem;
        color: rgb(245, 242, 242);
        border: none;
        margin: 0 10rem;
        z-index: 2;
    }

    .link-container {
        visibility: hidden;
        display: none;
        position: relative;
        background-color: rgb(160, 153, 145);
        opacity: .9;
        transition: max-height 0.3s ease-in-out, visibility 0.3s ease-in-out;
        z-index: 1;
    }

    .link-container.nav-open {
        visibility: visible;
        display: flex;
        flex-direction: column;
        position: relative;
        right: 31rem;
        max-height: 15rem;
        font-size: .7rem;
        padding: 1rem 2rem;
        top: 9rem;
    }

    .open {
        width: 6rem;
        font-size: .9rem;
        font-weight: bolder;
        color: rgb(53, 37, 19);
        border: .2rem #e8bb64ed solid;
        padding: 0;
        margin: 0;
    }

    .separator {
        display: none; /* Hide separators for mobile view */
    }

    .logo-container {
        position: relative;
        left: 16.5rem;
    }

    .profile-container {
        position: relative;
        left: 3.1rem;
    }

    .profile-container.nav-open h3,
    .image-container.nav-open {
        position: relative;
        right: 10.35rem;
    }
}

/*** Mobile L - 425px ***/
@media screen and (max-width: 425px) {

    .toggle-container button {
        right: 3.2rem;
    }

    .logo-container {
        left: 0rem;
    }

    .logo {
        display: none; /* Hide Original Logo */
    }

    .logo-responsive {
        display: block; /* Show Responsive Logo */
    }

    .link-container.nav-open {
        height: 15rem;
        top: 7.5rem;
        right: 18.4rem;
        padding: 0;
    }

    .link {
        display: flex;
        flex-direction: column;
        padding: 0 1rem;
        margin: -.3rem;
    }

    .profile-container.nav-open h3 {
        position: relative;
        width: 6rem;
        top: 13.5rem;
        right: 29.2rem;
        font-size: .9rem;
        font-weight: bolder;
        color: rgb(53, 37, 19);
        border: .2rem #e8bb64ed solid;
        padding: 0;
        margin: 0;
        opacity: .9;
        z-index: 3;
    }

    .image-container {
        position: relative;
        width: 2.9rem;
        height: 2.9rem;
        right: 15.7rem;
        contain: content;
        border: .3rem rgb(53, 37, 19) solid;
    }

    .image-container.nav-open {
        right: 25.9rem;
    }
}

/*** Mobile M - 375px ***/
@media screen and (max-width: 375px) {

    .toggle-container button {
        right: 4.6rem;
    }

    .link-container.nav-open {
        right: 19.6rem;
    }

    .profile-container.nav-open h3 {
        right: 30.4rem;
    }

    .image-container {
        right: 18.6rem;
    }

    .image-container.nav-open {
        right: 28.8rem;
    }
}

/*** Mobile S - 320px ***/
@media screen and (max-width: 320px) {

    .toggle-container button {
        right: 6.1rem;
    }

    .link-container.nav-open {
        right: 21.1rem;
    }

    .profile-container.nav-open h3 {
        right: 31.9rem;
    }

    .image-container {
        right: 21.6rem;
    }

    .image-container.nav-open {
        right: 31.8rem;
    }  
}
</style>