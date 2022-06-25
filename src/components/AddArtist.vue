<!-- eslint-disable prettier/prettier -->
<template>
  <v-row justify="center">
    <v-dialog v-model="showDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Add Artist</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form v-model="artistForm">
              <v-row>
                <v-col>
                  <v-text-field
                    label="Artist's name *"
                    v-model.trim="postBody.artistName"
                    persistent
                    required
                    prepend-icon="mdi-account"
                    :rules="formRules.artistsRules"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :return-value.sync="postBody.birthDate"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="postBody.birthDate"
                        label="Date of Birth *"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        :rules="formRules.dateRules"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="postBody.birthDate"
                      no-title
                      scrollable
                    >
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menu = false">
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.menu.save(postBody.birthDate)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
              <v-col>
                <v-textarea label="Bio" :value="postBody.bio"> </v-textarea>
              </v-col>
            </v-form>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog()">
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            :disabled="!artistForm"
            @click="saveArtist()"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  name: "AddArtist",
  props: ["showDialog"],
  data: () => ({
    dialog: false,
    artistForm: false,
    menu: false,
    formRules: {
      artistsRules: [(v) => !!v || "Artists Name is required"],
      dateRules: [(v) => !!v || "Date is required"],
    },
    postBody: {
      artistName: "",
      birthDate: "",
      bio: "",
    },
  }),
  methods: {
    closeDialog() {
      this.postBody.artistName = "";
      this.postBody.birthDate = "";
      this.postBody.bio = "";
      this.showDialog = false;
      this.$emit("closeDialog", this.showDialog);
    },
    saveArtist() {
      console.log(this.postBody);
      const token = localStorage.getItem("token");
      fetch("http://localhost:3000/songs/artists/add", {
        method: "POST",
        body: JSON.stringify({
          artistName: this.postBody.artistName,
          birthDate: this.postBody.birthDate,
          bio: this.postBody.bio,
        }),
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      })
        .then(async (response) => {
          console.log(response);
          if (response.status === 200) {
            const res = await response.json();
            this.closeDialog();

            console.log(res);
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
