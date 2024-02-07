export const sessionUserSettings = (req, res, next) => {
    const userSettings = req.session?.userSettings || {orderBy: 'title', orderDirection: -1, theme: 'dark'};
    const {orderBy, orderDirection, theme} = req.query;

    if (theme) {
        userSettings.theme = theme;
    }
    if (orderBy) {
        userSettings.orderBy = orderBy;
    }
    if (orderDirection) {
        userSettings.orderDirection = orderDirection;
    }
    req.userSettings = req.session.userSettings = userSettings;
    res.locals = req.userSettings; // visible within views

    next();
};
