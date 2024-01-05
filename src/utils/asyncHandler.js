const asyncHandler = (fun) => {
  return (req, res, next) => {
    Promise.resolve(fun()).catch((err) => next(err));
  };
};

export { asyncHandler };
