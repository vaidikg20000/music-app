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
                    :rules="formRules.emailRules"
                    v-model.trim="email"
                    required
                  ></v-text-field>
                  <v-text-field
                    prepend-icon="mdi-account"
                    name="username"
                    label="Username"
                    :rules="formRules.nameRules"
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
                    :rules="formRules.passwordRules"
                    v-model.trim="password"
                    required
                  ></v-text-field>
                  <v-text-field
                    id="confirmPassword"
                    prepend-icon="mdi-lock"
                    name="confirm_password"
                    label="Confirm Password"
                    type="password"
                    v-model.trim="confirmPassword"
                    :rules="formRules.confirmPasswordRules"
                    required
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  @click="saveItems()"
                  color="primary"
                  :disabled="!signupForm"
                  >Signup</v-btn
                >
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
      signupForm: false,
      confirmPassword: "",
      username: "",
      password: "",
      email: "",
      formRules: {
        nameRules: [
          (v) => !!v || "Name is required",
          (v) =>
            (v && v.length <= 10) || "Name must be less than 10 characters",
        ],
        emailRules: [
          (v) => !!v || "E-mail is required",
          (v) =>
            /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
              v
            ) || "E-mail must be valid",
        ],
        passwordRules: [
          (v) => !!v || "Password is required",
          (v) =>
            /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(v) ||
            "Password must contain at least lowercase letter, one number, a special character and one uppercase letter",
        ],
        confirmPasswordRules: [
          (v) => !!v || "Password is required",
          (v) => v === this.password || "Passwords Doesn't match",
        ],
      },
    };
  },
  methods: {
    //redirect to home
    saveItems() {
      // e.preventDefault();
      fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        body: JSON.stringify({
          username: this.username,
          email: this.email,
          password: this.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          return data;
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
