<template>
  <div>
    <div class="sticky bg-white top-0 z-50">
      <div class="max-w-full mx-auto">
        <div class="flex justify-center items-center mt-5">
          1～10倍速まで設定できます
        </div>
        <div class="flex justify-center items-center py-10">
          <input class="border bg-gray-50 h-10 w-auto px-3 text-3xl" type="number" max="10" min="1" v-model="value">
          <span class="text-lg">倍速</span>
        </div>
        <div v-if="error" class="flex justify-center items-center py-2">
          <div class="bg-red-100 rounded-lg py-2 px-6 text-base text-red-700" role="alert">
            {{error}}
          </div>
        </div>
        <div class="flex justify-center items-center">
          <button @click="reflect" type="button" class="inline-flex items-center px-12 py-2 mx-3 rounded-full text-white bg-indigo-600 hover:bg-indigo-800">
            反映
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "App",
  data() {
    return {
      value: 1,
      error: "",
    }
  },
  watch: {
    value(inputNumber, old) {
      if(inputNumber == "" || Number.isInteger(inputNumber) && inputNumber >= 1 && inputNumber <= 10){
        this.value = inputNumber;
      }else{
        this.value = old;
      }
    }
  },
  methods: {
    reflect: function(){
      const event = new CustomEvent('changegamespeed', { detail: this.value });
      nw.Window.get().window.dispatchEvent(event);
    },
  },
}
</script>