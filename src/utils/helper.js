// const _MS_PER_DAY = 1000 * 60 * 60 * 24;
module.exports.stayedTime = (a, b) => {
    const msA = Date.parse(a)
    const msB = Date.parse(b)
    const diff = b - a;
    return miliSecondTo_(diff)
}

const miliSecondTo_ = (ms) => {
    let seconds = parseInt(ms/1000);
    let minutes = parseInt(seconds/60);
    let totalHours = parseInt(minutes/60)
    let days = parseInt(totalHours/24)
    let hours = totalHours - days*24;
    return {
        totalHours: totalHours,
        hours: hours,
        days: days
    }
}