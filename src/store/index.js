import { createStore } from "vuex";
import { api } from "@/plugins/api";

export default createStore({
  state: {
    subjects: [],
    exams: [],
    pupils: [],
    loading: false,
    createdSubject: {},
    error: false,
  },
  getters: {
    getSubjects: (state) => state.subjects,
    getExams: (state) => state.exams,
    getPupils: (state) => state.pupils,
    getLoading: (state) => state.loading,
    getCreatedSubject: (state) => state.createdSubject,
    getError: (state) => state.error,
  },
  mutations: {
    setSubjects(state, payload) {
      state.subjects = payload;
    },
    setExams(state, payload) {
      state.exams = payload;
    },
    setPupils(state, payload) {
      state.pupils = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setCreatedSubject(state, payload) {
      state.createdSubject = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
  },
  actions: {
    async fetchSubjects({ commit }) {
      commit("setLoading", true);
      try {
        const resp = await api.get("/subjects");
        commit("setSubjects", resp.data);
        commit("setLoading", false);
      } catch (error) {
        commit("setLoading", false);
        console.log(error);
      }
    },
    async createSubject({ commit }, payload) {
      commit("setLoading", true);
      try {
        const resp = await api.post(
          "/subjects/create",
          {
            name: payload.name,
            classNum: payload.classNum,
            questions: payload.questions,
          },
          {
            onUploadProgress: (progressEvent) => {
              console.log(
                "Uploaded: " +
                  Math.round(
                    (progressEvent.loaded / progressEvent.total) * 100
                  ) +
                  "%"
              );
            },
          }
        );
        if (resp.data.status !== "ok") {
          commit("setError", true);
        }
        console.log(resp.data);
        commit("setCreatedSubject", resp.data);
        commit("setLoading", false);
        console.log(this.state.createdSubject);
      } catch (error) {
        commit("setLoading", false);
        console.log(error);
      }
    },
  },
  modules: {},
});
