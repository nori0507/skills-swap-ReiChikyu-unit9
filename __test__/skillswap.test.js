const { filterSkillsByCategory, calculateTotalCost, matchSkillsToUser } = require('../skillswap-functions');

//skills used fot testing
const skills = [
  { title: 'Python Tutoring', category: 'Programming', price: 20 },
  { title: 'Guitar Lessons', category: 'Music', price: 15 },
  { title: 'Resume Review', category: 'Career', price: 0 },
  { title: 'Web Development', category: 'Programming', price: 25 }
];

//tests for skill filter function
describe('filter function', () =>{
    //test for 'programming' filter
    test('should show skills categorized as "Programming"', () => {
        expect(filterSkillsByCategory(skills, 'Programming')).toEqual([
            { title: 'Python Tutoring', category: 'Programming', price: 20 },
            { title: 'Web Development', category: 'Programming', price: 25 }
        ]);
    });

    //test for 'all' filter
    test('should show all the skills', () => {
        expect(filterSkillsByCategory(skills, 'All')).toEqual([
            { title: 'Python Tutoring', category: 'Programming', price: 20 },
            { title: 'Guitar Lessons', category: 'Music', price: 15 },
            { title: 'Resume Review', category: 'Career', price: 0 },
            { title: 'Web Development', category: 'Programming', price: 25 }
        ]);
    });

    //test for 'cooking' filter 
    test('should show [] for no existing category', () => {
        expect(filterSkillsByCategory(skills, 'Cooking')).toEqual([]);
    });
});

//test for price calculate function
describe('price calculate function', () =>{
    //test for $20 for 2hours
    test('shoud show $40 dollors for $20/hr lessons with 2 hours', () =>{
        expect(calculateTotalCost(20, 2)).toBe(40);
    });
    //test for $0 for 3   hours
    test('shoud show $0 dollors for $0/hr lessons with 3 hours', () =>{
        expect(calculateTotalCost(0, 3)).toBe(0);
    });
    //test for $25 for 1.5 hours
    test('shoud show $37.5 dollors for $25/hr lessons with 1.5 hours', () =>{
        expect(calculateTotalCost(25, 1.5)).toBe(37.5);
    });
    //test for $20 for 0 hours
    test('shoud show $0 dollors for $20/hr lessons with 0 hours', () =>{
        expect(calculateTotalCost(20, 0)).toBe(0);
    });
});

//test for match skill to user function
describe('match skills to  user function', () => {
    //test for programming category and under or eauql to 30 dollars
    test('should show skills that is categorized as "programming" and under or equal to 30 dollars', () =>{
        const user1Needs = { category: 'Programming', maxPrice: 30 };
        expect(matchSkillsToUser(user1Needs, skills)).toEqual([ 
            { title: 'Python Tutoring', category: 'Programming', price: 20 }, 
            { title: 'Web Development', category: 'Programming', price: 25 } 
        ]);
    });
    //test for programming category and under or eauql to 20 dollars
    test('should show skills that is categorized as "programming" and under or equal to 20 dollars', () => {
        const user2Needs = { category: 'Programming', maxPrice: 20 };
        expect(matchSkillsToUser(user2Needs, skills)).toEqual([ 
            { title: 'Python Tutoring', category: 'Programming', price: 20 }
        ]);
    });
    //test for cooking category and under or equal to 100 dollars
    test('should show skills that is categorized as "Cooking" and under or equal to 100 dollars', () => {
        const user3Needs = { category: 'Cooking', maxPrice: 100 };
        expect(matchSkillsToUser(user3Needs, skills)).toEqual([]); 
    });
    //test for career category and under or equal to 0 dollars
    test('should show skills that is categorized as "Career" and under or equal to 0 dollars', () => {
        const user4Needs = { category: 'Career', maxPrice: 0 };
        expect(matchSkillsToUser(user4Needs, skills)).toEqual([
            { title: 'Resume Review', category: 'Career', price: 0 }
        ]); // [ { title: 'Resume Review', category: 'Career', price: 0 } ]      
    });
});