SystemJS.config({
  production: true,
  paths: {
    "github:": "jspm_packages/github/",
    "npm:": "jspm_packages/npm/",
    "vis/": "src/"
  },
  browserConfig: {
    "baseURL": "/"
  },
  devConfig: {
    "map": {
      "typescript": "npm:typescript@1.8.10",
      "os": "github:jspm/nodelibs-os@0.2.0-alpha"
    },
    "packages": {
      "npm:typescript@1.8.10": {
        "map": {}
      },
      "github:jspm/nodelibs-os@0.2.0-alpha": {
        "map": {
          "os-browserify": "npm:os-browserify@0.2.1"
        }
      }
    }
  },
  transpiler: "typescript",
  map: {
    "css": "github:systemjs/plugin-css@0.1.22",
    "giphy": "npm:giphy@0.0.4",
    "giphy-api": "npm:giphy-api@1.1.16"
  },
  packages: {
    "vis": {
      "main": "main.js"
    },
    "npm:asn1@0.1.11": {
      "map": {
        "sys": "github:jspm/nodelibs-util@0.2.0-alpha"
      }
    },
    "npm:assert-plus@0.1.5": {
      "map": {}
    },
    "npm:async@0.9.2": {
      "map": {
        "systemjs-json": "github:systemjs/plugin-json@0.1.2"
      }
    },
    "npm:aws-sign2@0.5.0": {
      "map": {}
    },
    "npm:boom@0.4.2": {
      "map": {
        "hoek": "npm:hoek@0.9.1"
      }
    },
    "npm:combined-stream@0.0.7": {
      "map": {
        "delayed-stream": "npm:delayed-stream@0.0.5"
      }
    },
    "npm:cryptiles@0.2.2": {
      "map": {
        "boom": "npm:boom@0.4.2"
      }
    },
    "npm:ctype@0.5.3": {
      "map": {}
    },
    "npm:delayed-stream@0.0.5": {
      "map": {}
    },
    "npm:forever-agent@0.5.2": {
      "map": {}
    },
    "npm:form-data@0.1.4": {
      "map": {
        "async": "npm:async@0.9.2",
        "combined-stream": "npm:combined-stream@0.0.7",
        "mime": "npm:mime@1.2.11"
      }
    },
    "npm:giphy-api@1.1.16": {
      "map": {}
    },
    "npm:giphy@0.0.4": {
      "map": {
        "request": "npm:request@2.40.0"
      }
    },
    "npm:hawk@1.1.1": {
      "map": {
        "boom": "npm:boom@0.4.2",
        "cryptiles": "npm:cryptiles@0.2.2",
        "hoek": "npm:hoek@0.9.1",
        "sntp": "npm:sntp@0.2.4",
        "systemjs-json": "github:systemjs/plugin-json@0.1.2"
      }
    },
    "npm:hoek@0.9.1": {
      "map": {}
    },
    "npm:http-signature@0.10.1": {
      "map": {
        "asn1": "npm:asn1@0.1.11",
        "assert-plus": "npm:assert-plus@0.1.5",
        "ctype": "npm:ctype@0.5.3"
      }
    },
    "npm:mime-types@1.0.2": {
      "map": {
        "systemjs-json": "github:systemjs/plugin-json@0.1.2"
      }
    },
    "npm:mime@1.2.11": {
      "map": {}
    },
    "npm:node-uuid@1.4.7": {
      "map": {}
    },
    "npm:oauth-sign@0.3.0": {
      "map": {}
    },
    "npm:qs@1.0.2": {
      "map": {}
    },
    "npm:request@2.40.0": {
      "map": {
        "aws-sign2": "npm:aws-sign2@0.5.0",
        "forever-agent": "npm:forever-agent@0.5.2",
        "form-data": "npm:form-data@0.1.4",
        "hawk": "npm:hawk@1.1.1",
        "http-signature": "npm:http-signature@0.10.1",
        "json-stringify-safe": "npm:json-stringify-safe@5.0.1",
        "mime-types": "npm:mime-types@1.0.2",
        "node-uuid": "npm:node-uuid@1.4.7",
        "oauth-sign": "npm:oauth-sign@0.3.0",
        "qs": "npm:qs@1.0.2",
        "stringstream": "npm:stringstream@0.0.5",
        "tough-cookie": "npm:tough-cookie@2.2.2",
        "tunnel-agent": "npm:tunnel-agent@0.4.3"
      }
    },
    "npm:sntp@0.2.4": {
      "map": {
        "hoek": "npm:hoek@0.9.1"
      }
    },
    "npm:stringstream@0.0.5": {
      "map": {}
    },
    "npm:tough-cookie@2.2.2": {
      "map": {
        "systemjs-json": "github:systemjs/plugin-json@0.1.2"
      }
    },
    "npm:tunnel-agent@0.4.3": {
      "map": {}
    }
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json",
    "github:*/*.json"
  ],
  map: {
    "bluebird": "npm:bluebird@3.4.0",
    "browser-request": "npm:browser-request@0.3.3",
    "jquery": "npm:jquery@2.2.4",
    "page": "npm:page@1.7.1",
    "process": "github:jspm/nodelibs-process@0.2.0-alpha",
    "underscore": "npm:underscore@1.8.3"
  },
  packages: {
    "npm:bluebird@3.4.0": {
      "map": {}
    },
    "npm:browser-request@0.3.3": {
      "map": {}
    },
    "npm:page@1.7.1": {
      "map": {
        "path-to-regexp": "npm:path-to-regexp@1.2.1"
      }
    },
    "npm:path-to-regexp@1.2.1": {
      "map": {
        "isarray": "npm:isarray@0.0.1"
      }
    }
  }
});
