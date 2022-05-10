export const locInitialState = {
  singleLocForm: {
    routeId: {
      value: "",
      valid: false,
      validation: {
        required: true,
      },
      validationError: "Required",
      touched: false,
    },
    origin: {
      value: "",
      valid: false,
      validation: {
        required: true,
      },
      validationError: "Required",
      touched: false,
    },
    MISC: {
      value: "",
      valid: false,
      validation: {
        required: true,
      },
      validationError: "Required",
      touched: false,
    },

    filed1: {
      value: "",
      valid: false,
      validation: {
        required: true,
      },
      validationError: "Required",
      touched: false,
    },
    filed2: {
      value: "",
      valid: false,
      validation: {
        required: true,
      },
      validationError: "Required",
      touched: false,
    },
    filed3: {
      value: "",
      valid: false,
      validation: {
        required: true,
      },
      validationError: "Required",
      touched: false,
    },
    origin_status: {
      value: "unassigned",
      valid: false,
      validation: {
        required: true,
      },
      validationError: "Required",
      touched: false,
    },
  },

  dualLocForm: {
    routeId: {
      value: "",
      valid: false,
      validation: {
        required: true,
      },
      validationError: "Required",
      touched: false,
    },
    origin_status: {
      value: "unassigned",
      valid: false,
      validation: {
        required: true,
      },
      validationError: "Required",
      touched: false,
    },
    destination_status: {
      value: "unassigned",
      valid: false,
      validation: {
        required: true,
      },
      validationError: "Required",
      touched: false,
    },
    cableOrigin: {
      value: "",
      valid: false,
      validation: {
        required: true,
      },
      validationError: "Required",
      touched: false,
    },
    filed1Origin: {
      value: "",
      valid: false,
      validation: {
        required: true,
      },
      validationError: "Required",
      touched: false,
    },
    filed2Origin: {
      value: "",
      valid: false,
      validation: {
        required: true,
      },
      validationError: "Required",
      touched: false,
    },
    filed3Origin: {
      value: "",
      valid: false,
      validation: {
        required: true,
      },
      validationError: "Required",
      touched: false,
    },

    cableDestination: {
      value: "",
      valid: false,
      validation: {
        required: true,
      },
      validationError: "Required",
      touched: false,
    },
    filed1Destination: {
      value: "",
      valid: false,
      validation: {
        required: true,
      },
      validationError: "Required",
      touched: false,
    },
    filed2Destination: {
      value: "",
      valid: false,
      validation: {
        required: true,
      },
      validationError: "Required",
      touched: false,
    },
    filed3Destination: {
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
        // isNumber: true,
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

  loading: false,

  singleLocs: [],
  dualLocs: [],
  loadingLocs: false,

  loadDelete: false,

  specificLoc: {},
  loadSpecificLoc: false,

  searchSingleLocs: [],
  searchDualLocs: [],
  loadEdit: false,

  renderedItem: "locs",

  loadUpload: false,
};
