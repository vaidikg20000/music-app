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
            <v-row>
              <v-col>
                <v-text-field
                  label="Artist's name *"
                  v-model.trim="artistName"
                  persistent
                  hide-details
                  prepend-icon="mdi-account"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="birthDate"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="birthDate"
                      label="Date of Birth *"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="birthDate" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false">
                      Cancel
                    </v-btn>
                    <v-btn text color="primary" @click="$refs.menu.save(birthDate)">
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
            <v-col>
                <v-textarea
                 label="Bio"
                 :value="bio"
                >

                </v-textarea>
            </v-col>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog()">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="closeDialog()">
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
    artistName: "",
    menu: false,
    birthDate: "",
    bio: "",
  }),
  methods: {
    closeDialog() {
      this.showDialog = false;
      this.$emit("closeDialog", this.showDialog);
    },
  },
};
</script>
