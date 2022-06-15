<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Signup form</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form ref="form" v-model="signupForm">
                  <v-text-field
                    prepend-icon="mdi-email"
                    name="email"
                    label="Email"
                    type="email"
                    v-model.trim="email"
                    required
                  ></v-text-field>
                  <v-text-field
                    prepend-icon="mdi-account"
                    name="username"
                    label="Username"
                    type="text"
                    v-model.trim="username"
                    required
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    prepend-icon="mdi-lock"
                    name="password"
                    label="Password"
                    type="password"
                    v-model.trim="password"
                    required
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    prepend-icon="mdi-lock"
                    name="confirm_password"
                    label="Confirm Password"
                    type="password"
                    v-model.trim="confirmPassword"
                    required
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" to="/">Signup</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
export default {
  name: "Signup",
  data() {
    return {
      confirmPassword: "",
      username: "",
      password: "",
      email: "",
    };
  },
};
</script>
