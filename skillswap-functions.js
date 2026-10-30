//function for the skill filter
function filterSkillsByCategory(skills, category){
    //when the filter is "All", return all the skills
    if (category === 'All') {
        return skills;
    }
    //result will be stored in an array
    const result = [];

    for (const skill of skills) {
        if (skill.category === category) {
            result.push(skill); // adding skills into an array when it matches
        }
    }

    return result;
}

// function to calculate the total session cost based on price per hour and hours of the session
function calculateTotalCost(price, hours){
    return price*hours
}

// function for matching the skills with the user needs
function matchSkillsToUser(userNeeds, skills){
    const result =[];
    for(const skill of skills){
        if (userNeeds.category === 'All') { //case where category is all
            if(userNeeds.maxPrice >= skill.price){ //checking the price requirement
                result.push(skill);
            }
        }
        else if(userNeeds.category === skill.category){ // case where category matches
            if(userNeeds.maxPrice >= skill.price){ // checkingthe price requirement
                result.push(skill);
            }
        }
    }
    
    return result;
}

module.exports = {filterSkillsByCategory, calculateTotalCost, matchSkillsToUser};