exports.notAuthorizedPage = async (req, res) => {
    return res.render("401", {
        csrfToken: req.csrfToken()
    });
}

exports.notFoundPage = async (req, res) => {
    return res.render("404", {
        csrfToken: req.csrfToken()
    });
}