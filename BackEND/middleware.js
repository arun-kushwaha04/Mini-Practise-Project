const middleware = (request, response, next) => {
    console.log(request.url);
    // response.send("I run Before every request");
    console.log("I run Before every request 123");
    next();
}

module.exports = middleware;