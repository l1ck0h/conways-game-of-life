import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import { Pattern } from "@/modules/CGOL";

export const key: InjectionKey<Store<State>> = Symbol();

export type PlayState =
  | "initialized"
  | "paused"
  | "readied"
  | "started"
  | "stopped";

export type State = {
  gen: number;
  pattern: Pattern;
  playState: PlayState;
};

export const GetterTypes: {
  Gen: "Gen";
  Pattern: "Pattern";
  PlayState: "PlayState";
} = {
  Gen: "Gen",
  Pattern: "Pattern",
  PlayState: "PlayState",
};

export const ActionTypes: {
  Initialize: "Initialize";
  Ready: "Ready";
  SelectPattern: "SelectPattern";
  Stop: "Stop";
  TogglePlayPause: "TogglePlayPause";
  UpdateGen: "UpdateGen";
} = {
  Initialize: "Initialize",
  Ready: "Ready",
  SelectPattern: "SelectPattern",
  Stop: "Stop",
  TogglePlayPause: "TogglePlayPause",
  UpdateGen: "UpdateGen",
};

export const store = createStore<State>({
  state: {
    gen: 0,
    pattern: "random 0.5",
    playState: "stopped",
  },
  getters: {
    [GetterTypes.Gen](state) {
      return state.gen.toString();
    },
    [GetterTypes.Pattern](state) {
      return state.pattern;
    },
    [GetterTypes.PlayState](state) {
      return state.playState;
    },
  },
  mutations: {
    UpdateGen(state, gen: number) {
      state.gen = gen;
    },
    UpdatePattern(state, pattern: Pattern) {
      state.pattern = pattern;
    },
    UpdatePlayState(state, playState: PlayState) {
      state.playState = playState;
    },
  },
  actions: {
    [ActionTypes.Initialize]({ commit }) {
      commit("UpdatePlayState", "initialized");
    },
    [ActionTypes.Ready]({ commit }) {
      commit("UpdatePlayState", "readied");
    },
    [ActionTypes.Stop]({ commit }) {
      commit("UpdatePlayState", "stopped");
    },
    [ActionTypes.SelectPattern]({ commit }, pattern: Pattern) {
      commit("UpdatePattern", pattern);
      commit("UpdatePlayState", "stopped");
    },
    [ActionTypes.TogglePlayPause]({ commit, state }) {
      commit(
        "UpdatePlayState",
        state.playState !== "started" ? "started" : "paused"
      );
    },
    [ActionTypes.UpdateGen]({ commit }, gen: number) {
      commit("UpdateGen", gen);
    },
  },
  modules: {},
});
