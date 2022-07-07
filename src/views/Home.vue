<!-- eslint-disable prettier/prettier -->
<template>
  <div>
    <v-card class="my-2" style="margin: 50px 40px 100px 40px">
      <v-row align="center">
        <v-col cols="4" align-self="center">
          <!-- <p style="font-size:24px" class="mx-4 my-2">Top 10 Songs</p> -->
          <v-card-title class="mx- my-2">Top 10 Songs</v-card-title>
        </v-col>
        <v-col></v-col>
        <v-col cols="3">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="2">
          <router-link to="/addSong"> <v-btn>Add Song</v-btn></router-link>
        </v-col>
      </v-row>
      <v-data-table
        :headers="songsHeaders"
        :search="search"
        :items="songsItems"
        hide-default-footer
        disable-pagination
      >
        <template v-slot:item.image="{ item }">
          <img
            :src="getUrl(item.image)"
            alt="artwork image"
            height="100px"
            width="100px"
          />
        </template>
        <template v-slot:item.date_of_release="{ item }">
          {{ moment(item.date_of_release).format("LL") }}
        </template>
        <template v-slot:item.ratings="{ item }">
          {{ item.ratings }}/5 ⭐
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn color="red" @click="deleteSong(item.song_id)">Delete</v-btn>
        </template>
      </v-data-table>
    </v-card>
    <v-card style="margin: 10px 40px 10px 40px">
      <v-row align="center">
        <v-col cols="4" align-self="center">
          <v-card-title style="padding:20px">Top 10 Artists</v-card-title>
        </v-col>
        <v-col></v-col>
        <v-col cols="3">
          <v-text-field
            v-model="artistSearch"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
            style="padding:20px"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-data-table
        :headers="artistsHeaders"
        :items="artistsItems"
        :search="artistSearch"
        hide-default-footer
        disable-pagination
      >
        <template v-slot:item.dob="{ item }">
          {{ moment(item.dob).format("LL") }}
        </template>
      </v-data-table>
    </v-card>
    <v-snackbar v-model="snackbar.visible" :color="snackbar.color">
      {{ snackbar.errMsg }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbar.visible = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
import { isAuthenticated } from "../../utils/checkAuth";
import moment from "moment";
export default {
  name: "Homepage",
  data() {
    return {
      search: "",
      artistSearch: "",
      moment: moment,
      snackbar: {
        visible: false,
        errMsg: "",
        color: "",
      },
      songsHeaders: [
        {
          text: "Artwork",
          align: "start",
          sortable: false,
          value: "image",
        },
        {
          text: "Song",
          align: "start",
          value: "name",
        },
        {
          text: "Date of Release",
          align: "start",
          value: "date_of_release",
        },
        {
          text: "Artists",
          align: "start",
          value: "artists",
        },
        {
          text: "Rate",
          align: "start",
          value: "ratings",
        },
        {
          text: "Actions",
          align: "start",
          sortable: false,
          value: "actions",
        },
      ],
      artistsHeaders: [
        {
          text: "Artists",
          align: "start",
          value: "artist_name",
        },
        {
          text: "Date of Birth",
          align: "start",
          value: "dob",
        },
        {
          text: "Songs",
          align: "start",
          value: "songs",
        },
      ],
      artistsItems: [],
      songsItems: [],
    };
  },
  methods: {
    getUrl(image) {
      try {
        return URL.createObjectURL(image);
      } catch (_) {
        return image;
      }
    },
    deleteSong(id) {
      const token = localStorage.getItem("token");
      fetch("https://music-journal-backend.herokuapp.com/songs/delete/" + id, {
        method: "DELETE",
        headers: {
          // "Content-Type": "application/json",
          token: token,
        },
      }).then(async (response) => {
        let res = await response.json();
        if (response.status === 200) {
          this.snackbar.visible = true;
          this.snackbar.color = "green";
          this.snackbar.errMsg = res;
          this.getTopSongs();
          this.getTopArtists();
        }
      });
    },
    getTopSongs() {
      const token = localStorage.getItem("token");
      fetch("https://music-journal-backend.herokuapp.com/songs/all/top", {
        method: "GET",
        headers: {
          // "Content-Type": "application/json",
          token: token,
        },
      }).then(async (response) => {
        let res = await response.json();
        console.log(res);
        this.songsItems = res;
      });
    },
    getTopArtists() {
      const token = localStorage.getItem("token");
      fetch(
        "https://music-journal-backend.herokuapp.com/songs/artists/all/top",
        {
          method: "GET",
          headers: {
            // "Content-Type": "application/json",
            token: token,
          },
        }
      ).then(async (response) => {
        let res = await response.json();
        this.artistsItems = res;
      });
    },
  },
  mounted() {
    fetch("https://music-journal-backend.herokuapp.com/")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        return data;
      })
      .catch((err) => console.log(err));
  },
  async created() {
    const token = localStorage.getItem("token");
    let authenticated = false;
    if (token) {
      authenticated = await isAuthenticated();
    }
    if (!authenticated || !token) {
      this.$router.push({ path: "/signup" });
    }
    this.getTopArtists();
    this.getTopSongs();
  },
};
</script>
