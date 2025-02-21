<template>
  <div>
    <!-- Filter Button and Count -->
    <div
      class="sticky top-0 z-30 bg-stone-200/95 backdrop-blur-sm shadow-md mb-4"
    ></div>
  </div>

  <!-- Filter Modal -->
  <div
    v-if="showFilters"
    class="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center"
  >
    <div
      class="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
    >
      <!-- Modal Header -->
      <div
        class="px-6 py-4 border-b border-gray-200 flex justify-between items-center"
      >
        <h2 class="text-xl font-semibold text-gray-800">Filter Menu</h2>
        <button
          @click="showFilters = false"
          class="text-gray-500 hover:text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- Modal Body -->
      <div class="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
        <div class="space-y-6">
          <!-- Dietary Section -->
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-4">
              Dietary Preferences
            </h3>
            <div class="grid grid-cols-2 gap-3">
              <button
                @click="vegan"
                :class="{
                  'bg-green-50 text-green-700 border-green-200':
                    activeDietaryFilter === 'vegan',
                }"
                class="text-left px-4 py-3 rounded-lg border hover:bg-green-50 hover:text-green-700 transition-colors"
              >
                Vegan
              </button>
              <button
                @click="gluten"
                :class="{
                  'bg-green-50 text-green-700 border-green-200':
                    activeDietaryFilter === 'gluten-free',
                }"
                class="text-left px-4 py-3 rounded-lg border hover:bg-green-50 hover:text-green-700 transition-colors"
              >
                Gluten-Free
              </button>
              <button
                @click="lactose"
                :class="{
                  'bg-green-50 text-green-700 border-green-200':
                    activeDietaryFilter === 'lactose-free',
                }"
                class="text-left px-4 py-3 rounded-lg border hover:bg-green-50 hover:text-green-700 transition-colors"
              >
                Lactose-Free
              </button>
              <button
                @click="noNuts"
                :class="{
                  'bg-green-50 text-green-700 border-green-200':
                    activeDietaryFilter === 'nut-free',
                }"
                class="text-left px-4 py-3 rounded-lg border hover:bg-green-50 hover:text-green-700 transition-colors"
              >
                Nut-Free
              </button>
            </div>
          </div>

          <!-- Price Section -->
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-4">Price Range</h3>
            <div class="grid grid-cols-2 gap-3">
              <button
                @click="under10"
                :class="{
                  'bg-green-50 text-green-700 border-green-200':
                    activePriceFilter === 'under10',
                }"
                class="text-left px-4 py-3 rounded-lg border hover:bg-green-50 hover:text-green-700 transition-colors"
              >
                Under €10
              </button>
              <button
                @click="under20"
                :class="{
                  'bg-green-50 text-green-700 border-green-200':
                    activePriceFilter === 'under20',
                }"
                class="text-left px-4 py-3 rounded-lg border hover:bg-green-50 hover:text-green-700 transition-colors"
              >
                €10 - €20
              </button>
            </div>
          </div>

          <!-- Allergens Section -->
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-4">Allergens</h3>
            <div class="grid grid-cols-2 gap-3">
              <button
                @click="nuts"
                :class="{
                  'bg-green-50 text-green-700 border-green-200':
                    activeAllergenFilter === 'nuts',
                }"
                class="text-left px-4 py-3 rounded-lg border hover:bg-green-50 hover:text-green-700 transition-colors"
              >
                Contains Nuts
              </button>
              <button
                @click="withgluten"
                :class="{
                  'bg-green-50 text-green-700 border-green-200':
                    activeAllergenFilter === 'gluten',
                }"
                class="text-left px-4 py-3 rounded-lg border hover:bg-green-50 hover:text-green-700 transition-colors"
              >
                Contains Gluten
              </button>
              <button
                @click="withLactose"
                :class="{
                  'bg-green-50 text-green-700 border-green-200':
                    activeAllergenFilter === 'lactose',
                }"
                class="text-left px-4 py-3 rounded-lg border hover:bg-green-50 hover:text-green-700 transition-colors"
              >
                Contains Lactose
              </button>
              <button
                @click="allergenFree"
                :class="{
                  'bg-green-50 text-green-700 border-green-200':
                    activeAllergenFilter === 'allergen-free',
                }"
                class="text-left px-4 py-3 rounded-lg border hover:bg-green-50 hover:text-green-700 transition-colors"
              >
                Allergen Free
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Footer -->
      <div class="px-6 py-4 border-t border-gray-200 flex justify-between">
        <button
          v-if="hasActiveFilters"
          @click="resetFilters"
          class="text-red-500 hover:text-red-600 font-medium"
        >
          Clear all filters
        </button>
        <button
          @click="showFilters = false"
          class="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
        >
          Apply Filters
        </button>
      </div>
    </div>
  </div>

  <!-- Menu Grid -->
  <div class="max-w-7xl mx-auto px-4">
    <div class="bg-stone-200/60 border-zinc-200 p-4 rounded-xl">
      <div class="max-w-7xl mx-auto px-4 py-3">
        <div class="flex flex-wrap items-center justify-between gap-4 pb-4">
          <div class="flex items-center gap-4">
            <button
              @click="showFilters = !showFilters"
              class="flex items-center gap-2 px-4 py-2 bg-white/80 rounded-lg hover:shadow-md transition-all duration-200 border border-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 text-green-600"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"
                />
              </svg>
              <span class="text-gray-700 font-medium">Filters</span>
              <span
                v-if="hasActiveFilters"
                class="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full"
              >
                Active
              </span>
            </button>

            <!-- Active Filter Tags -->
            <div
              v-if="activeFilterTags.length > 0"
              class="flex flex-wrap gap-2"
            >
              <div
                v-for="(tag, index) in activeFilterTags"
                :key="index"
                class="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full flex items-center gap-2"
              >
                {{ tag.label }}
                <button
                  @click="clearFilter(tag.type)"
                  class="hover:text-red-500 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-4 h-4"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div class="text-gray-600">{{ dishList.length }} items</div>
        </div>

        <!-- Empty State -->
        <div
          v-if="dishList.length === 0"
          class="flex flex-col items-center justify-center py-16 text-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-24 h-24 text-gray-400 mb-6"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M18.06 23h1.66c.84 0 1.53-.65 1.63-1.47L23 5.05h-5V1h-1.97v4.05h-4.97l.3 2.34c1.71.47 3.31 1.32 4.27 2.26c1.44 1.42 2.43 2.89 2.43 5.29V23M1 22v-1h15.03v1c0 .54-.45 1-1.03 1H2c-.55 0-1-.46-1-1m15.03-7C16.03 7 1 7 1 15h15.03M1 17h15v2H1v-2Z"
            />
          </svg>
          <h3 class="text-xl font-semibold text-gray-600 mb-2">
            No dishes found
          </h3>
          <p class="text-gray-500 mb-6 max-w-sm">
            No dishes match your current filter selections. Try adjusting your
            filters to find more options.
          </p>
          <button
            @click="resetFilters"
            class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41z"
              />
            </svg>
            Clear all filters
          </button>
        </div>

        <!-- Menu Items Grid -->
        <div
          v-else
          class="grid grid-cols-1 mobile:grid-cols-2 tablet:grid-cols-3 gap-4"
        >
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
      showFilters: false,
      showDietary: false,
      showPrice: false,
      showAllergens: false,
      dishList: {},
      chosenDetails: [],
      chosenOrders: [],
      activeFilters: [],
      activeDietaryFilter: null,
      activePriceFilter: null,
      activeAllergenFilter: null,
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
    activeFilterTags() {
      const tags = [];

      if (this.activeDietaryFilter) {
        const dietaryLabels = {
          vegan: "Vegan",
          "gluten-free": "Gluten-Free",
          "lactose-free": "Lactose-Free",
          "nut-free": "Nut-Free",
        };
        tags.push({
          type: "dietary",
          label: dietaryLabels[this.activeDietaryFilter],
        });
      }

      if (this.activePriceFilter) {
        const priceLabels = {
          under10: "Under €10",
          under20: "€10 - €20",
        };
        tags.push({
          type: "price",
          label: priceLabels[this.activePriceFilter],
        });
      }

      if (this.activeAllergenFilter) {
        const allergenLabels = {
          nuts: "Contains Nuts",
          gluten: "Contains Gluten",
          lactose: "Contains Lactose",
          "allergen-free": "Allergen Free",
        };
        tags.push({
          type: "allergen",
          label: allergenLabels[this.activeAllergenFilter],
        });
      }

      return tags;
    },
    hasActiveFilters() {
      return (
        this.activeDietaryFilter !== null ||
        this.activePriceFilter !== null ||
        this.activeAllergenFilter !== null
      );
    },
  },
  methods: {
    toggleFilters() {
      this.showFilters = !this.showFilters;
      // Close all dropdowns when toggling filters
      this.showDietary = false;
      this.showPrice = false;
      this.showAllergens = false;
    },

    applyFilters() {
      let filteredDishes = this.myData.dishes;

      // Apply dietary filter if active
      if (this.activeDietaryFilter) {
        filteredDishes = this.applyDietaryFilter(filteredDishes);
      }

      // Apply price filter if active
      if (this.activePriceFilter) {
        filteredDishes = this.applyPriceFilter(filteredDishes);
      }

      // Apply allergen filter if active
      if (this.activeAllergenFilter) {
        filteredDishes = this.applyAllergenFilter(filteredDishes);
      }

      this.dishList = filteredDishes;
    },

    applyDietaryFilter(dishes) {
      switch (this.activeDietaryFilter) {
        case "vegan":
          return dishes.filter((dish) =>
            dish.tags?.dietaryPreferences?.includes("vegetarian")
          );
        case "gluten-free":
          return dishes.filter((dish) =>
            dish.tags?.dietaryPreferences?.includes("gluten-free")
          );
        case "lactose-free":
          return dishes.filter((dish) =>
            dish.tags?.dietaryPreferences?.includes("lactose-free")
          );
        case "nut-free":
          return dishes.filter(
            (dish) => !dish.tags?.allergens?.includes("contains-nuts")
          );
        default:
          return dishes;
      }
    },

    applyPriceFilter(dishes) {
      switch (this.activePriceFilter) {
        case "under10":
          return dishes.filter((dish) => dish.price < 10);
        case "under20":
          return dishes.filter((dish) => dish.price >= 10 && dish.price <= 20);
        default:
          return dishes;
      }
    },

    applyAllergenFilter(dishes) {
      switch (this.activeAllergenFilter) {
        case "nuts":
          return dishes.filter((dish) =>
            dish.tags?.allergens?.includes("contains-nuts")
          );
        case "gluten":
          return dishes.filter((dish) =>
            dish.tags?.allergens?.includes("contains-gluten")
          );
        case "lactose":
          return dishes.filter(
            (dish) => !dish.tags?.dietaryPreferences?.includes("lactose-free")
          );
        case "allergen-free":
          return dishes.filter((dish) => dish.tags?.allergens?.length === 0);
        default:
          return dishes;
      }
    },

    vegan() {
      this.activeDietaryFilter = "vegan";
      this.applyFilters();
      this.showDietary = false;
    },

    gluten() {
      this.activeDietaryFilter = "gluten-free";
      this.applyFilters();
      this.showDietary = false;
    },

    lactose() {
      this.activeDietaryFilter = "lactose-free";
      this.applyFilters();
      this.showDietary = false;
    },

    noNuts() {
      this.activeAllergenFilter = "nut-free";
      this.applyFilters();
      this.showDietary = false;
    },

    under10() {
      this.activePriceFilter = "under10";
      this.applyFilters();
      this.showPrice = false;
    },

    under20() {
      this.activePriceFilter = "under20";
      this.applyFilters();
      this.showPrice = false;
    },

    nuts() {
      this.activeAllergenFilter = "nuts";
      this.applyFilters();
      this.showAllergens = false;
    },

    withgluten() {
      this.activeAllergenFilter = "gluten";
      this.applyFilters();
      this.showAllergens = false;
    },

    withLactose() {
      this.activeAllergenFilter = "lactose";
      this.applyFilters();
      this.showAllergens = false;
    },

    allergenFree() {
      this.activeAllergenFilter = "allergen-free";
      this.applyFilters();
      this.showAllergens = false;
    },

    goToDetails(dish) {
      this.chosenDetails = dish;
      this.$emit("go-to-details", dish);
    },

    addToOrder(dish) {
      this.chosenOrders = dish;
      this.$emit("add-to-order", dish);
    },

    resetFilters() {
      this.activeDietaryFilter = null;
      this.activePriceFilter = null;
      this.activeAllergenFilter = null;
      this.dishList = this.myData.dishes;
      this.showDietary = false;
      this.showPrice = false;
      this.showAllergens = false;
    },

    clearFilter(filterType) {
      if (filterType === "dietary") {
        this.activeDietaryFilter = null;
      } else if (filterType === "price") {
        this.activePriceFilter = null;
      } else if (filterType === "allergen") {
        this.activeAllergenFilter = null;
      }
      this.applyFilters();

      // Close filter dropdowns if no filters are active
      if (!this.hasActiveFilters) {
        this.showFilters = false;
      }
    },
  },
};
</script>
