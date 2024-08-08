function requireUser(req, res, next) {
    if (!req.user || !req.user.user_id) {
        return res.status(401).send("You must be logged in to do that");
    }
    next();
}

function checkReviewData(req, res, next) {
    const {score, txt} = req.body;
    if(!score || !txt) {
        return res.status(404).send("Please provide a rating and some text");
    }
    next();
}

module.exports = {requireUser, checkReviewData}