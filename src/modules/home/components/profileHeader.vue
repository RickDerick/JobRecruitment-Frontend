<template>
    <div>
      <v-col>
        <v-btn
          v-if="!profileComplete"
          :to="{ name: 'updateProfile' }"
          text
          color="deep-orange"
          class="mx-2"
        >
          click to Update Your profile!</v-btn
        >
        <v-chip class="mx-2 primary text-capitalize" label>
          <v-icon left>mdi-account</v-icon>
          Candidate: {{ `${profile.firstName} ${profile.lastName}` }}
        </v-chip>
        <v-menu offset-y left content-class="user-profile-menu-content">
          <template v-slot:activator="{ on, attrs }">
            <v-avatar size="60px" v-bind="attrs" v-on="on">
              <v-img :src="ProfilePicture" v-if="ProfilePicture !== ''"></v-img>
  
              <v-img :src="user.avatar" v-else-if="user.avatar !== null" />
              <v-img src="../../../assets/profile.jpg" v-else />
            </v-avatar>
          </template>
          <v-list>
            <!-- Profile -->
            <v-list-item>
              <v-list-item-content>
                <span
                  class="text-subtitle-1 font-weight-semibold mb-n1"
                  v-if="profile.firstName !== ''"
                >
                  <span
                    >{{ profile ? profile.firstName : "" }}{{ "" }}
                    {{ profile ? profile.lastName : "" }}</span
                  >
                </span>
                <span class="text-subtitle-1 font-weight-semibold mb-n1" v-else>
                  <span
                    >{{ profile ? user.firstName : "" }}{{ "" }}
                    {{ profile ? user.lastName : "" }}</span
                  >
                </span>
              </v-list-item-content>
            </v-list-item>
            <v-list-item link @click="openBio()">
              <v-list-item-icon class="me-2">
                <v-icon size="22"> mdi-account </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Profile</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
  
            <!-- Profile -->
            <v-list-item link @click="goToApplications()">
              <v-list-item-icon class="me-2">
                <v-icon size="22"> mdi-file </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title> My Applications</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <!-- Profile -->
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title
                  ><v-btn
                    color="primary"
                    text
                    @click="$store.dispatch('Auth/logout')"
                  >
                    <v-icon left>mdi-logout</v-icon>
                    Logout
                  </v-btn></v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </div>
  </template>
  
  <script>
  import AuthService from "@/modules/auth/authService";
  export default {
    name: "profileHeader",
  
    data: function () {
      return {
        dialog: false,
      };
    },
    components: {},
  
    beforeRouteEnter(to, from, next) {
      next((v) => {
        v.$store.dispatch("Profile/getBio");
        v.$store.dispatch("Profile/getContact");
      });
    },
  
    computed: {
      user() {
        return AuthService.user;
      },
      bio() {
        return this.$store.getters["Profile/bioGetters"]("bio");
      },
      profile() {
        return this.$store.getters["Profile/profileGetters"]("profile");
      },
      profileComplete() {
        return this.profile
          ? (this.bio ? this.bio.length > 0 : false) &&
              this.profile.base64ProfilePic.length > 0
          : false;
      },
      setDialog: {
        get() {
          return this.dialog;
        },
        set(val) {
          this.$emit("close-dialog", val);
        },
      },
      ProfilePicture() {
        let profile = this.profile;
        if (this.image_url) return this.image_url;
  
        return profile
          ? profile.base64ProfilePic
            ? `data:image/jpeg;base64,${profile.base64ProfilePic}` ||
              `data:image/png;base64,${profile.base64ProfilePic}`
            : ""
          : "";
      },
    },
  
    methods: {
      openBio: function () {
        this.$router.push({
          name: "updateProfile",
          // params: { code: this.$route.params.code },
        });
      },
      closeDialog: function (val) {
        this.dialog = val;
      },
      goToApplications() {
        this.$router.push({
          name: "My Applications",
        });
      },
    },
  };
  </script>
  
  <style scoped>
  .v-input__append-outer {
    margin-top: 8px;
  }
  </style>
  