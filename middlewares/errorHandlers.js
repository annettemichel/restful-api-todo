function notFound(req, res, next) {
    res.status(404).send("Route existiert nicht! 404 Error");
}

function errorHandler(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Etwas ist schiefgelaufen!');
}

module.exports = {notFound, errorHandler};
