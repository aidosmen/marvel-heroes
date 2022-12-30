import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import mockHeroes from "../mock";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface MarvelHero {
  id: string;
  name: string;
  description?: string;
  image?: string;
  tags: Array<string>;
  isAddedManualy?: boolean;
}

export enum StatusEnum {
  PENDING = "pending",
  RESOLVED = "resolved",
  FAILED = "failed",
}

export interface MarvelHeroState {
  heroes: Array<MarvelHero>;
  status: StatusEnum;
  error: any;
  heroById: MarvelHero | null;
}

const initialState: MarvelHeroState = {
  heroes: [],
  status: StatusEnum.PENDING,
  error: null,
  heroById: null,
};

const simulateGetHeroesHttp = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(mockHeroes);
  }, 300);
  setTimeout(function () {
    reject("Promise Rejected");
  }, 500);
});

const simulateGetHeroesByIdHttp = new Promise(function (resolve, reject) {
  setTimeout(function (id: string) {
    resolve("Promised resolved");
  }, 300);
  setTimeout(function () {
    reject("Promise Rejected");
  }, 500);
});

const simulateSearchHero = new Promise(function (resolve, reject) {
  setTimeout(function (searchParam: string) {
    resolve("Resolved Search Request");
  }, 300);
  setTimeout(function () {
    reject("Promise Rejected");
  }, 500);
});

export const fetchHeroes = createAsyncThunk(
  "heroes/fetchHeroes",
  async function () {
    try {
      const response = await simulateGetHeroesHttp;
      const data = await response;
      return data;
    } catch (e) {
      console.log("error ", e);
    }
  }
);

export const fetchHeroesById = createAsyncThunk(
  "heroes/fetchHeroesById",
  async function (id: string) {
    try {
      const response = await simulateGetHeroesByIdHttp;
      const data = await response;
      // responded data comes from data and then passes to reducer as we simulate we return id to find correct one
      return id;
    } catch (e) {
      console.log("error ", e);
    }
  }
);

export const searchHeroes = createAsyncThunk(
  "heroes/searchHeroes",
  async function (searchParam: string) {
    try {
      const response = await simulateSearchHero;
      const data = await response;
      // responded data comes from data and then passes to reducer as we simulate we return searchParam to find correct one
      return searchParam;
    } catch (e) {
      console.log("error ", e);
    }
  }
);

export const heroesSlice = createSlice({
  name: "heroes",
  initialState,
  reducers: {
    setHeroes: (state, action: PayloadAction<Array<MarvelHero>>) => {
      state.heroes = action.payload;
    },
    addHero: (state) => {
      const heroStr = localStorage.getItem("newHero");
      if (heroStr) {
        const hero = JSON.parse(heroStr);
        state.heroById = hero;
        state.heroes.push({ ...hero, id: new Date().toISOString() });
        localStorage.setItem("cachedHeroes", JSON.stringify(state.heroes));
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchHeroes.pending, (state) => {
      state.status = StatusEnum.PENDING;
      state.error = null;
    });
    builder.addCase(fetchHeroes.fulfilled, (state, action: any) => {
      state.status = StatusEnum.RESOLVED;
      const cachedHeroesStr = localStorage.getItem("cachedHeroes");
      if (cachedHeroesStr) {
        state.heroes = JSON.parse(cachedHeroesStr);
      } else {
        state.heroes = action.payload;
      }
      localStorage.setItem("cachedHeroes", JSON.stringify(state.heroes));
    });
    builder.addCase(fetchHeroesById.pending, (state) => {
      state.status = StatusEnum.PENDING;
    });
    builder.addCase(fetchHeroesById.fulfilled, (state, action) => {
      // action.payload response form server with hero id here we manualy find user as simulating http
      state.status = StatusEnum.RESOLVED;
      const cachedHeroesStr = localStorage.getItem("cachedHeroes");
      if (cachedHeroesStr) {
        const foundHero = JSON.parse(cachedHeroesStr).find(
          (hero: MarvelHero) => hero.id === action.payload
        );
        state.heroById = foundHero;
      }
    });
    builder.addCase(searchHeroes.pending, (state) => {
      state.status = StatusEnum.PENDING;
    });
    builder.addCase(searchHeroes.fulfilled, (state, action) => {
      // action.payload response form server with searched hero here we manualy find user as simulating http
      state.status = StatusEnum.RESOLVED;
      const cachedHeroesStr = localStorage.getItem("cachedHeroes");
      if (cachedHeroesStr) {
        const searchParam = action.payload || "";
        const filteredList = JSON.parse(cachedHeroesStr).filter(
          (hero: MarvelHero) => {
            return (
              hero.name.toLowerCase().includes(searchParam) ||
              hero.tags
                ?.filter((item) => item.toLowerCase().includes(searchParam))[0]
                ?.includes(searchParam)
            );
          }
        );
        state.heroes = filteredList;
      }
    });
  },
});

// Action creators are generated for each case reducer function
export const { setHeroes, addHero } = heroesSlice.actions;

export default heroesSlice.reducer;
