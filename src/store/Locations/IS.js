export const locationIs = {
  locationForm: {
    name: {
      value: "",
      valid: false,
      validation: {
        required: true,
      },
      validationError: "Required",
      touched: false,
    },
    lat: {
      value: "",
      valid: false,
      validation: {
        required: true,
      },
      validationError: "Required must be a number",
      touched: false,
    },
    long: {
      value: "",
      valid: false,
      validation: {
        required: true,
      },
      validationError: "Required must be a number",
      touched: false,
    },
    radius: {
      value: "",
      valid: false,
      validation: {
        required: true,
      },
      validationError: "Required must be a number",
      touched: false,
    },
  },
  loadAdding: false,

  specificLocation: {},
  loadSpacificLocation: false,

  locations: [],
  loadLocations: false,

  loadEditLocation: false,

  selectedEditLocation: {},

  loadDelete: false,

  searchForm: {
    textVal: {
      value: "",
      valid: false,
      validation: {
        // required: true,
        isEmail: true,
      },
      validationError: "Required",
      touched: false,
    },
  },

  searchResult: [],
  loadSearch: false,

  renderedItem: "locations",
};
