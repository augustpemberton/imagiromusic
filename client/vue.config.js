const path = require('path');
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/scss/_variables.scss";
          @import "@/scss/_mixins.scss";
        `,
        sassOptions: {
          includePaths: [path.resolve(__dirname, './node_modules/compass-mixins/lib')]
        }
      },
    }
  }
};