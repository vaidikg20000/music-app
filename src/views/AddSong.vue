<!-- eslint-disable prettier/prettier -->
<template>
  <div>
    <v-row>
      <v-col>
        <h2 class="mx-2 my-2">Add a new Song</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <v-text-field
          label="Song name"
          v-model.trim="songName"
          persistent
          class="mx-4"
          hide-details
					prepend-icon="mdi-text"
        ></v-text-field>
      </v-col>
    </v-row>

    <!-- Date Picker -->
    <v-row>
      <v-col cols="4">
        <v-dialog
          ref="dialog"
          v-model="dateModal"
          :return-value.sync="songDate"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="songDate"
              label="Release Date"
              prepend-icon="mdi-calendar"
              class="mx-4"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="songDate" scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="modal = false"> Cancel </v-btn>
            <v-btn text color="primary" @click="$refs.dialog.save(songDate)">
              OK
            </v-btn>
          </v-date-picker>
        </v-dialog>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <v-file-input
          label="Add Image"
          prepend-icon="mdi-camera"
          dense
          class="mx-4"
        ></v-file-input>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <v-select
          :items="artistsItems"
          label="Select Artists"
          hide-details
          class="mx-4"
          multiple
					prepend-icon="mdi-account"
        ></v-select>
      </v-col>
      <v-col cols="2">
        <v-btn class="my-2" @click="openDialog">Add Artists</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="1" class="mx-4"><v-btn dark>Cancel</v-btn></v-col>
      <v-col cols="1"><v-btn>save</v-btn></v-col>
    </v-row>
    <AddArtist :showDialog="showDialog" @closeDialog="(data)=>showDialog=data"/>
  </div>
</template>
<script>
import AddArtist from "../components/AddArtist";
export default {
  name: "addSong",
  components: {
    AddArtist,
  },
  data() {
    return {
      songName: "",
      dateModal: false,
      songDate: null,
      artistsItems: ["weeknd", "travis"],
      showDialog: false,
    };
  },
  methods: {
    openDialog() {
      this.showDialog = true;
    },
  },
};
</script>
