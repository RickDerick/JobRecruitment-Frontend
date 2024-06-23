<template>
    <div>
      <v-container>
        <v-card flat class="pa-5">
          <v-row>
            <v-col cols="12" md="7">
              <v-card tile flat class="py-3">
                <h1 class="mb-2">Life’s not about a job, it’s about purpose.</h1>
                <h5 class="subtitle-1 mb-5">
                  Join our passionate community of solvers. Help organizations
                  build trust and deliver sustained outcomes
                </h5>
  
                <v-btn color="primary" tile @click="$refs.search.focus()">
                  Search jobs
                  <v-icon right>mdi-magnify</v-icon>
                </v-btn>
              </v-card>
            </v-col>
            <v-col cols="12" md="5">
              <v-img contain src="/src/assets/career5.jfif" />
            </v-col>
          </v-row>
        </v-card>
      </v-container>
  
      <v-container>
        <v-card flat class="pa-5" id="search-jobs">
          <v-card-text>
            <v-text-field
              outlined
              label="Search"
              placeholder="Search by Title or keyword"
              color="primary"
              ref="search"
              v-model="search"
            />
          </v-card-text>
  
          <!-- <v-card-text>
            <v-row>
              <v-col cols="12" md="5" v-if="jobs.length !== 0">
                <v-list>
                  <v-list-item-group @change="selectJobs" color="primary">
                    <template
                      v-for="(item, index) in search.length > 0
                        ? filteredItems
                        : jobs"
                    >
                      <v-list-item three-line :key="item.code">
                        <template v-slot:default="{ active }">
                          <v-list-item-content>
                            <v-list-item-title
                              class="font-weight-bold primary--text overline"
                              >{{ item.fullTitle }}</v-list-item-title
                            >
                            <v-list-item-subtitle>
                              {{ item.location }}
                            </v-list-item-subtitle>
                            <v-list-item-subtitle class="caption">
                              {{ getCategory(item.category) }}
                            </v-list-item-subtitle>
                          </v-list-item-content>
  
                          <v-list-item-action>
                            <v-list-item-action-text class="mb-5 primary--text">
                              {{ item.contractType }}
                            </v-list-item-action-text>
                            <v-btn
                              :text="!active"
                              :to="{
                                name: 'Job',
                                params: { code: item.code },
                              }"
                            >
                              View Job
                              <v-icon right>mdi-arrow-right</v-icon>
                            </v-btn>
                          </v-list-item-action>
                        </template>
                      </v-list-item>
                      <v-divider
                        v-if="index < jobs.length - 1"
                        :key="index"
                      ></v-divider>
                    </template>
                  </v-list-item-group>
                </v-list>
              </v-col>
              <v-col cols="12" md="5" v-if="jobs.length === 0">
                <v-skeleton-loader
                  type="card-heading, list-item-two-line, list-item-two-line, list-item-three-line, list-item-three-line, list-item-three-line, list-item-three-line"
                ></v-skeleton-loader>
              </v-col>
              <v-divider vertical></v-divider>
  
              <v-col cols="12" md="7">
                <selectedJobCard
                  :specificJob="selectedJob ? selectedJob : jobs[0]"
                />
              </v-col>
            </v-row>
          </v-card-text> -->
        </v-card>
      </v-container>
    </div>
  </template>
  
  <script>
  // import selectedJobCard from "./selectedJobCard";
  //  import AuthService from "../../../modules/Auth";
   import {useHomeStore} from "../../../stores";
   import {useGlobalStore} from "../../../stores";

  export default {
    name: "jobList",
    components: {
      // selectedJobCard,
    },

    setup(){
      const homeStore = useHomeStore();
      const globalStore = useGlobalStore();

      return {
        homeStore,
        globalStore,
    };
    },
  
    data: function () {
      return {
        // departments: [],
        index: 0,
        search: "",
        edit: true,
        selectedJob: undefined,
      };
    },
    beforeRouteEnter(to, from, next) {
      next((v) => {
        v.homeStore.getCategories();
        // v.homeStore.getJobs();
        // v.$store.dispatch("Landing/getCompanyInfo");
        // if (AuthService.check()) {
        //   v.$store.dispatch("Home/getApplications", v.user.profileID);
        // }
      });
    },
    computed: {
      categories: function () {
        return this.homeStore.homeStoreGetters("categories");
      },
      jobs: function () {
        // return this.departments.length > 0
          // ? this.$store.getters["Home/homeGetters"]("jobs").filter((el) => {
          //     return this.departments.find((item) => item.code === el.category);
          //   })
          return this.homeStore.homeStoreGetters("jobs");
      },
      filteredItems() {
        const data = this.jobs.filter((item) => {
          if (!this.search) return this.jobs;
          return (
            item.fullTitle.toLowerCase().includes(this.search.toLowerCase()) ||
            item.description.toLowerCase().includes(this.search.toLowerCase()) ||
            item.category.toLowerCase().includes(this.search.toLowerCase())
          );
        });
        return data;
      },
      user() {
        return AuthService.user;
      },
      applications: function () {
        return this.$store.getters["Home/homeGetters"]("applications");
      },
      checkIfUserIsLoggedIn() {
        return AuthService.check();
      },
      indexOfSelectedJob() {
        return this.jobs.findIndex((item) =>
          item.code === this.selectedJob
            ? this.selectedJob.code
            : this.jobs[0].code
        );
      },
    },
  
    methods: {
      buttonClick: function () {
        alert("button click");
      },
  
      listClick: function () {
        alert("List click");
      },
  
      getCategory(val) {
        if (val) {
          const data = this.categories.filter((d) => d.code === val);
          return data[0].description;
        } else {
          return "";
        }
      },
      filterJobs(val) {
        if (val.length > 0) {
          this.departments = val.map((el) => this.categories[el]);
        } else {
          this.departments = [];
          this.selectedJob = undefined;
        }
      },
      selectJobs(val) {
        this.selectedJob = this.jobs[val];
      },
    },
  };
  </script>
  
  <style scoped></style>
  