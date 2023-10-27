<template>
  <div>
    <div
      class="grid justify-items-center gap-4 w-full mt-2 bg-stone-200 bg-opacity-60 rounded-t-xl"
    >
      <div class="flex relative self-center w-fit text-center">
        <div
          @mouseover="showBagtip = true"
          @mouseleave="showBagtip = false"
          class="h-fit"
        >
          <button @click="toggleBar" class="headerbtn">
            <h1 v-if="showBagtip" class="tooltip">Filter</h1>

            <h1 v-else class="tooltip">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"
                />
              </svg>
            </h1>
          </button>
        </div>

        <!--Filter bar-->
        <div class="bar">
          <!--drop down categories-->
          <div class="place-self-center w-fit h-fit">
            <div class="grid gap-20 m-1">
              <div
                class="flex flex-col mobile:flex-row justify-center mt-2 gap-8"
              >
                <div class="grid relative">
                  <div
                    class="filtertitleblock"
                    @click="showDietary = !showDietary"
                  >
                    <h1 class="filtertitle">Dietary Preferences</h1>
                    <svg
                      class="w-2.5 h-2.5 ml-2.5 translate-y-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </div>

                  <ul class="dropdown">
                    <li class="list" v-if="showDietary" @click="vegan">
                      vegan
                    </li>
                    <li class="list" v-if="showDietary" @click="gluten">
                      Gluten-Free
                    </li>
                    <li class="list" v-if="showDietary" @click="lactose">
                      Lactose-Free
                    </li>
                    <li class="list" v-if="showDietary" @click="noNuts">
                      Nut-Free
                    </li>
                  </ul>
                </div>

                <div class="grid relative">
                  <div class="filtertitleblock" @click="showPrice = !showPrice">
                    <h1 class="filtertitle">Price Range</h1>
                    <svg
                      class="w-2.5 h-2.5 ml-2.5 translate-y-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </div>
                  <ul class="dropdown">
                    <li class="list" v-if="showPrice" @click="under10">
                      Under €10
                    </li>
                    <li class="list" v-if="showPrice" @click="under20">
                      €10 - €20
                    </li>
                  </ul>
                </div>

                <div class="grid relative justify-items-center">
                  <div
                    class="filtertitleblock"
                    @click="showAllergens = !showAllergens"
                  >
                    <h1 class="filtertitle">Allergens</h1>
                    <svg
                      class="w-2.5 h-2.5 ml-2.5 translate-y-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </div>
                  <ul class="dropdown">
                    <li class="list" v-if="showAllergens" @click="nuts">
                      Contains Nuts
                    </li>
                    <li class="list" v-if="showAllergens" @click="withgluten">
                      Contains Gluten
                    </li>
                    <li class="list" v-if="showAllergens" @click="withLactose">
                      Contains lactose
                    </li>
                    <li class="list" v-if="showAllergens" @click="allergenFree">
                      Allergen Free
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="grid bg-stone-200 bg-opacity-60 border-zinc-200 p-4 rounded-b-xl"
    >
      <div class="grid grid-cols-1 mobile:grid-cols-2 tablet:grid-cols-3 gap-2">
        <displayMenu
          v-for="dish in dishList"
          :dish="dish"
          :key="dish.id"
          @add-to-order="addToOrder"
          @go-to-details="goToDetails"
        >
        </displayMenu>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import displayMenu from "../components/displayMenu.vue";

export default {
  components: {
    displayMenu,
  },
  props: {
    showDishes: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      myData: {},
      showBar: false,
      showDietary: false,
      showPrice: false,
      showAllergens: false,
      showVegan: false,
      dishList: {},
      filteredList: {},
      glutenFree: {},
      lactoseFree: {},
      nutFree: {},
      filterprice1: false,
      filterprice2: false,
      containNuts: {},
      containsGluten: {},
      containsLactose: {},
      allergenfree: {},
      chosenDetails: [],
      chosenOrders: [],
      showBagtip: false,
    };
  },
  created() {
    axios
      .get("/db.json")
      .then((response) => {
        this.myData = response.data;
        this.dishList = this.myData.dishes;
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  },
  computed: {
    pricerange1() {
      return this.filterprice1
        ? this.dishList.filter((dish) => dish.price < 10)
        : this.dishList;
    },
    pricerange2() {
      return this.filterprice2
        ? this.dishList.filter((dish) => dish.price > 10)
        : this.dishList;
    },
  },
  methods: {
    toggleBar() {
      this.showBar = !this.showBar;
    },
    vegan() {
      this.vegetarianDishes = this.myData.dishes.filter((dish) => {
        return (
          dish.tags &&
          dish.tags.dietaryPreferences &&
          dish.tags.dietaryPreferences.includes("vegetarian")
        );
      });

      this.dishList = this.vegetarianDishes;
      console.log(this.dishList);
    },
    gluten() {
      this.glutenFree = this.myData.dishes.filter((dish) => {
        return (
          dish.tags &&
          dish.tags.dietaryPreferences &&
          dish.tags.dietaryPreferences.includes("gluten-free")
        );
      });

      this.dishList = this.glutenFree;
      console.log(this.dishList);
    },
    lactose() {
      this.lactoseFree = this.myData.dishes.filter((dish) => {
        return (
          dish.tags &&
          dish.tags.dietaryPreferences &&
          dish.tags.dietaryPreferences.includes("lactose-free")
        );
      });

      this.dishList = this.lactoseFree;
      console.log(this.dishList);
    },

    noNuts() {
      this.nutFree = this.myData.dishes.filter((dish) => {
        return !(
          dish.tags &&
          dish.tags.allergens &&
          dish.tags.allergens.includes("contains-nuts")
        );
      });

      this.dishList = this.nutFree;
      console.log(this.dishList);
    },

    under10() {
      this.dishList = this.myData.dishes;
      this.filterprice2 = false;
      this.filterprice1 = !this.filterprice1;

      if (this.filterprice1) {
        this.dishList = this.pricerange1;
      } else {
        // Reset to the original list
        this.dishList = this.myData.dishes;
      }
    },
    under20() {
      this.dishList = this.myData.dishes;
      this.filterprice1 = false;
      this.filterprice2 = !this.filterprice2;

      if (this.filterprice2) {
        this.dishList = this.pricerange2;
      } else {
        // Reset to the original list
        this.dishList = this.myData.dishes;
      }
    },

    nuts() {
      this.containNuts = this.myData.dishes.filter((dish) => {
        return (
          dish.tags &&
          dish.tags.allergens &&
          dish.tags.allergens.includes("contains-nuts")
        );
      });

      this.dishList = this.containNuts;
      console.log(this.dishList);
    },

    withgluten() {
      this.containsGluten = this.myData.dishes.filter((dish) => {
        return (
          dish.tags &&
          dish.tags.allergens &&
          dish.tags.allergens.includes("contains-gluten")
        );
      });

      this.dishList = this.containsGluten;
      console.log(this.dishList);
    },

    withLactose() {
      this.containsLactose = this.myData.dishes.filter((dish) => {
        return !(
          dish.tags &&
          dish.tags.dietaryPreferences &&
          dish.tags.dietaryPreferences.includes("lactose-free")
        );
      });

      this.dishList = this.containsLactose;
    },

    allergenFree() {
      this.allergenfree = this.myData.dishes.filter((dish) => {
        return (
          dish.tags &&
          dish.tags.allergens &&
          Array.isArray(dish.tags.allergens) &&
          dish.tags.allergens.length === 0
        );
      });

      this.dishList = this.allergenfree;
    },

    goToDetails(dish) {
      console.log(dish);
      this.chosenDetails = dish;
      console.log(this.chosenDetails);
      this.$emit("go-to-details", dish);
    },
    addToOrder(dish) {
      console.log(dish);
      this.chosenOrders = dish;

      this.$emit("add-to-order", dish);
    },
  },
};
</script>
