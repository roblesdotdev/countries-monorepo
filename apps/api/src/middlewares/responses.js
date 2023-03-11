/**
 * Extend Response object with custom error builder.
 *
 * res.jsonError("Ups invalid form", 400)
 *
 */
function errorBuilder(_req, res, next) {
  res.jsonError = function (message = "Something went wrong", status = 400) {
    return res.status(status).json({
      success: false,
      status,
      error: {
        message,
      },
    });
  };

  next();
}

/**
 * Extend Response object with custom success builder.
 *
 * res.jsonSuccess({ name: 'foo' }, 201)
 *
 */
function successBuilder(_req, res, next) {
  res.jsonSuccess = function (data, status = 200) {
    return res.status(status).json({
      success: true,
      status,
      data: data,
    });
  };

  next();
}

module.exports = {
  errorBuilder,
  successBuilder,
};
