function requireUser(req, res, next) {
    if (!req.user || !req.user.user_id) {
        return res.status(401).send("You must be logged in to do that");
    }
    next();
}

function checkItemData(req, res, next) {
    const {name, description} = req.body;
    if(!name || !description) {
        return res.status(404).send("Please provide name and a description");
    }
    next();
}

module.exports = {requireUser, checkItemData}