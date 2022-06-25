<!-- eslint-disable prettier/prettier -->
<template>
  <div>
    <v-row>
      <v-col>
        <h2 class="mx-2 my-2">Add a new Song</h2>
      </v-col>
    </v-row>
    <v-form v-model="songForm">
      <v-row>
        <v-col cols="4">
          <v-text-field
            label="Song name"
            v-model.trim="postBody.songName"
            persistent
            class="mx-4"
            prepend-icon="mdi-text"
            :rules="formRules.songnameRules"
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <!-- Date Picker -->
      <v-row>
        <v-col cols="4">
          <v-dialog
            ref="dialog"
            v-model="dateModal"
            :return-value.sync="postBody.songDate"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model.trim="postBody.songDate"
                label="Release Date"
                prepend-icon="mdi-calendar"
                class="mx-4"
                readonly
                v-bind="attrs"
                v-on="on"
                :rules="formRules.dateRules"
                required
              ></v-text-field>
            </template>
            <v-date-picker v-model="postBody.songDate" scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="dateModal = false">
                Cancel
              </v-btn>
              <v-btn text color="primary" @click="$refs.dialog.save(postBody.songDate)">
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
            accept="image/*"
            dense
            class="mx-4"
            required
            :rules="formRules.imageRules"
            v-model.trim="postBody.image"
          ></v-file-input>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <v-select
            :items="artistsItems"
            v-model.trim="postBody.artistsName"
            label="Select Artists"
            class="mx-4"
            multiple
            prepend-icon="mdi-account"
            required
            :rules="formRules.artistsRules"
          ></v-select>
        </v-col>
        <v-col cols="2">
          <v-btn class="my-2" @click="openDialog">Add Artists</v-btn>
        </v-col>
      </v-row>
    </v-form>
    <v-row>
      <v-col cols="1" class="mx-4"
        ><v-btn dark @click="redirectBack()">Cancel</v-btn></v-col
      >
      <v-col cols="1"><v-btn :disabled="!songForm" @click="saveNewSong">save</v-btn></v-col>
    </v-row>
    <AddArtist
      :showDialog="showDialog"
      @closeDialog="(data) => (showDialog = data)"
    />
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
      songForm: false,
      formRules: {
        songnameRules: [(v) => !!v || "Name is required"],
        dateRules: [(v) => !!v || "Date is required"],
        imageRules: [(v) => !!v || "Image is required"],
        artistsRules: [
          (v) => (v && v.length > 0) || "Artists Name is required",
        ],
      },
      postBody:{
        songName: "",
        songDate: null,
        image: "",
        artistsName: [],
      },
    };
  },
  methods: {
    openDialog() {
      this.showDialog = true;
    },
    redirectBack() {
      this.$router.push("/");
    },
    saveNewSong(){
      console.log(this.postBody);
    }
  },
};
</script>
