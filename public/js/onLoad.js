//Export function for sorting tasks
module.exports = function (allTasks, req) {
    req.session.userId = req.user.id;
    req.session.username = req.user.username;
    req.session.provinceCount = req.user.provinceCount;
    req.session.encounterCompleted = req.user.encounterCompleted;

    var personalTasks = [];
    var wellnessTasks = [];
    var learningTasks = [];
    var creativityTasks = [];
    var exerciseTasks = [];
    var choresTasks = [];
    for (var i = 0; i < allTasks.length; i++) {
        var task = allTasks[i];
        switch (task.category) {
            case 'personal':
                personalTasks.push(task);
                break;
            case 'wellness':
                wellnessTasks.push(task);
                break;
            case 'learning':
                learningTasks.push(task);
                break;
            case 'creativity':
                creativityTasks.push(task);
                break;
            case 'exercise':
                exerciseTasks.push(task);
                break;
            case 'chores':
                choresTasks.push(task);
                break;
        }
    };

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
            castle: castle,
            provinceCount: req.user.provinceCount,
            knightCount: req.user.knightCount,
            archerCount: req.user.archerCount,
            mageCount: req.user.mageCount
        }
    }
} 