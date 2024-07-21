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
            <v-img contain src="@/assets/career5.jfif" />
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
            color="accent"
            ref="search"
            v-model="search"
          />
      
        </v-card-text>

      <v-card-text>
          <v-row>
            <v-col cols="12" md="5" v-if="jobs.length !== 0">
              <v-list lines="two">
                <v-list-item
                  v-for="job in jobs"
                  :key="job.code"
                  :subtitle="job.description"
                  :title="job.fullTitle"
                ></v-list-item>
              </v-list>
            </v-col>
            <v-col cols="12" md="5" v-if="jobs.length === 0">
              <v-skeleton-loader
                type="heading, list-item-two-line, list-item-two-line, list-item-three-line, list-item-three-line, list-item-three-line, list-item-three-line"
              ></v-skeleton-loader>
            </v-col>
            <v-divider vertical></v-divider>

          </v-row>
        </v-card-text>
    </v-card>
    </v-container>
  </div>
</template>

<script>
import AuthService from "../../../modules/Auth/authService"; // Correct the import path if necessary
import { useHomeStore } from "../../../stores"; // Correct the import path if necessary
import { useGlobalStore } from "../../../stores"; // Correct the import path if necessary

export default {
  name: "jobList",
  components: {},
  
  setup() {
    const homeStore = useHomeStore();
    const globalStore = useGlobalStore();

    return {
      homeStore,
      globalStore,
    };
  },

  data() {
    return {
      search: "",
      selectedJob: undefined,
      selectedJobIndex: 0, // Track the selected job index
    };
  },
  beforeRouteEnter(to, from, next) {
    next((v) => {
      v.homeStore.getCategories();
      v.homeStore.getJobs();
    });
  },
  computed: {
    categories() {
      return this.homeStore.homeStoreGetters("categories");
    },
    jobs() {
      return this.homeStore.homeStoreGetters("allJobs");
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
    applications() {
      return this.homeStore.homeStoreGetters("applications");
    },
  },
  methods: {
    getCategory(val) {
      if (val) {
        const data = this.categories.filter((d) => d.code === val);
        return data[0].description;
      } else {
        return "";
      }
    },
    selectJobs(val) {
      this.selectedJob = this.jobs[val];
    },
  },
};
</script>

<style scoped></style>
