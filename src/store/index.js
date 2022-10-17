import { createStore } from "vuex";
import { api } from "@/http/api";

export default createStore({
  state: {
    subjects: [],
    exams: [],
    pupils: [],
    createdSubject: {},
    error: false,
  },
  getters: {
    getSubjects: (state) => state.subjects,
    getExams: (state) => state.exams,
    getPupils: (state) => state.pupils,
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
    setCreatedSubject(state, payload) {
      state.createdSubject = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
  },
  actions: {
    async fetchSubjects({ commit }) {
      try {
        const resp = await api.get("/subjects");
        commit("setSubjects", resp.data);
      } catch (error) {
        console.log(error);
      }
    },
    async createSubject({ commit }, payload) {
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
        console.log(this.state.createdSubject);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchUsers({ commit }) {
      try {
        const resp = await api.get("/users");
        commit("setPupils", resp.data);
        console.log(resp.data);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchExams({ commit }) {
      try {
        const resp = await api.get('/exams')
        commit('setExams', resp.data)
      } catch (error) {
        console.log(error);
      }
    }
  },
  modules: {},
});
