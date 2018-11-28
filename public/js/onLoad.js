//Export function for sorting tasks, setting session variables and delivering user info to front end
module.exports = function (allTasks, req) {
    req.session.userId = req.user.id;
    req.session.username = req.user.username;
    req.session.provinceCount = req.user.provinceCount;
    req.session.encounterCompleted = req.user.encounterCompleted;

    const personalTasks = allTasks.filter(task => task.category === "personal");
    const wellnessTasks = allTasks.filter(task => task.category === "wellness");
    const learningTasks = allTasks.filter(task => task.category === "learning");
    const creativityTasks = allTasks.filter(task => task.category === "creativity");
    const exerciseTasks = allTasks.filter(task => task.category === "exercise");
    const choresTasks = allTasks.filter(task => task.category === "chores");

    return {
        personalTasks: personalTasks,
        wellnessTasks: wellnessTasks,
        learningTasks: learningTasks,
        creativityTasks: creativityTasks,
        exerciseTasks: exerciseTasks,
        choresTasks: choresTasks,
        data: {
            username: req.user.username,
            photo: req.user.photo,
            title: req.user.title,
            castle: req.user.castle,
            provinceCount: req.user.provinceCount,
            knightCount: req.user.knightCount,
            archerCount: req.user.archerCount,
            mageCount: req.user.mageCount
        }
    }
} 