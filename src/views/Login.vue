<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login form</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form ref="form" v-model="loginForm">
                  <v-text-field
                    prepend-icon="mdi-account"
                    name="email"
                    label="Email"
                    type="email"
                    v-model.trim="email"
                    :rules="formRules.emailRules"
                    required
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    prepend-icon="mdi-lock"
                    name="password"
                    label="Password"
                    type="password"
                    v-model.trim="password"
                    :rules="formRules.passwordRules"
                    required
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="saveUser" :disabled="!loginForm">Login</v-btn>
              </v-card-actions>
              <div
                style="
                  display: flex;
                  justify-content: center;
                  align-items: center;
                "
              >
                <p style="">
                  New User
                  <router-link to="/signup">Signup here</router-link>
                </p>
              </div>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <div class="text-center ma-2">
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
  </v-app>
</template>

<script>
import { isAuthenticated } from "../../utils/checkAuth";
export default {
  name: "Login",
  data() {
    return {
      loginForm: false,
      username: "",
      password: "",
      email: "",
      snackbar: {
        visible: false,
        errMsg: "",
        color: "",
      },
      formRules: {
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
      },
    };
  },
  methods: {
    saveUser(){
      fetch("http://localhost:3000/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: this.email,
          password: this.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(async (response) => {
          console.log(response);
          if (response.status === 401) {
            this.snackbar.errMsg = "User Email or Password does not match";
            this.snackbar.color = "error";
            this.snackbar.visible = true;
          } else if (response.status === 200) {
            const res = await response.json();
            localStorage.setItem("token", res.token);
            this.$router.push("/");
          }
        })
        .catch((err) => console.log(err));
    },
  },
  created() {
    if (localStorage.getItem("token")) {
      const authenticated = isAuthenticated();
      if (authenticated) {
        this.$router.push({ path: "/" });
      }
    }
  },
};
</script>
