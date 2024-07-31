const { APP_NAME } = require("../../config");

const decorateHtmlResponse = (page_title) => {
  return function (req, res, next) {
    res.locals.html = true;
    res.locals.title = `${page_title} - ${APP_NAME}`;
    next()
  };
};
module.exports = decorateHtmlResponse;
