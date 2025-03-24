function getYear() {
    return new Date().getFullYear();
}
function calculateExperience(startYear, endYear = getYear()) {
    return endYear - startYear;
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("lua-experience").textContent = calculateExperience(2016, 2018);
    document.getElementById("cpp-experience").textContent = calculateExperience(2017);
    document.getElementById("godot-experience").textContent = calculateExperience(2019);
    document.getElementById("unreal-experience").textContent = calculateExperience(2021);
});
