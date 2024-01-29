// src/store/modules/app.ts
import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

// setup
export const useAppStore = defineStore("app", () => {
  const count = useStorage("count", 0);

  function increment() {
    count.value++;
  }

  function decrement() {
    count.value--;
  }
  return {
    count,
    increment,
    decrement,
  };
});
