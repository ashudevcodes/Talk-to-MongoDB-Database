class apiResponse {
  constructor(statusCode, data, message = "Sucesses") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.sucesses = statusCode < 400;
  }
}

export { apiResponse };
