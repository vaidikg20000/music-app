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
        hide-default-footer
        disable-pagination
      >
      </v-data-table>
    </v-card>
    <v-card style="margin: 10px 40px 10px 40px">
      <v-card-title>Top 10 Artists</v-card-title>
      <v-data-table
        :headers="artistsHeaders"
        hide-default-footer
        disable-pagination
      >
      </v-data-table>
    </v-card>
  </div>
</template>
<script>
import { isAuthenticated } from "../../utils/checkAuth";
export default {
  name: "Homepage",
  data() {
    return {
      search: "",
      songsHeaders: [
        {
          text: "Artwork",
          align: "start",
          sortable: false,
          value: "imageURL",
        },
        {
          text: "Song",
          align: "start",
          value: "name",
        },
        {
          text: "Date of Release",
          align: "start",
          value: "date_release",
        },
        {
          text: "Artists",
          align: "start",
          value: "artists",
        },
        {
          text: "Rate",
          align: "start",
          value: "rate",
        },
      ],
      artistsHeaders: [
        {
          text: "Artists",
          align: "start",
          value: "artists",
        },
        {
          text: "date",
          align: "start",
          value: "date_birth",
        },
        {
          text: "Songs",
          align: "start",
          value: "songs",
        },
      ],
    };
  },
  mounted() {
    fetch("http://localhost:3000/")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        return data;
      })
      .catch((err) => console.log(err));
    // console.log(res);
  },
  async created() {
    const token = localStorage.getItem("token");
    let authenticated = false;
    if (token) {
      authenticated = await isAuthenticated();
    }
    if (!authenticated || !token) {
      // this.$router.push({ path: "/login" });
    }
  },
};
</script>
