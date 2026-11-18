
/* =====================================================
   FOODWISE AI
   Knowledge-Based Restaurant Recommendation System
   Knowledge Engineering - 22ITE61
===================================================== */


/* =====================================================
   1. KNOWLEDGE BASE
===================================================== */

// Restaurant knowledge represented as structured facts.

const restaurantKnowledgeBase = [

    {
        id: 1,
        name: "Green Bowl Kitchen",
        cuisine: ["Healthy", "South Indian"],
        location: "Perundurai Road",
        price: 180,
        distance: 1.2,
        rating: 4.7,
        dietary: ["Vegetarian", "Vegan", "Gluten-free"],
        meals: ["Breakfast", "Lunch"],
        emoji: "🥗",
        theme: "green"
    },

    {
        id: 2,
        name: "Annapoorna Veg House",
        cuisine: ["South Indian"],
        location: "Thindal",
        price: 140,
        distance: 2.1,
        rating: 4.5,
        dietary: ["Vegetarian", "Jain"],
        meals: ["Breakfast", "Lunch", "Dinner"],
        emoji: "🍛",
        theme: "peach"
    },

    {
        id: 3,
        name: "Wok & Roll",
        cuisine: ["Chinese"],
        location: "Brough Road",
        price: 230,
        distance: 3.4,
        rating: 4.4,
        dietary: ["Vegetarian"],
        meals: ["Lunch", "Dinner"],
        emoji: "🍜",
        theme: "lavender"
    },

    {
        id: 4,
        name: "Olive & Oregano",
        cuisine: ["Italian", "Continental"],
        location: "Teachers Colony",
        price: 380,
        distance: 4.1,
        rating: 4.6,
        dietary: ["Vegetarian"],
        meals: ["Lunch", "Dinner"],
        emoji: "🍕",
        theme: "peach"
    },

    {
        id: 5,
        name: "Saffron Table",
        cuisine: ["North Indian"],
        location: "Moolapalayam",
        price: 260,
        distance: 2.7,
        rating: 4.3,
        dietary: ["Vegetarian", "Jain"],
        meals: ["Lunch", "Dinner"],
        emoji: "🥘",
        theme: "green"
    },

    {
        id: 6,
        name: "Dosa Stories",
        cuisine: ["South Indian"],
        location: "Thindal",
        price: 110,
        distance: 1.6,
        rating: 4.6,
        dietary: ["Vegetarian", "Vegan", "Jain"],
        meals: ["Breakfast", "Snacks", "Dinner"],
        emoji: "🥞",
        theme: "lavender"
    }

];


/* =====================================================
   2. CUSTOMER KNOWLEDGE
===================================================== */

// Represents the customer's current requirements.

let customerKnowledge = {

    location: "Erode",

    preferredCuisine: "South Indian",

    dietaryRequirements: ["Vegetarian"],

    budget: 250,

    meal: "Any",

    priority: "taste"

};


/* =====================================================
   3. PREFERENCE LEARNING
===================================================== */

// Stores feedback and learned preferences.

let learnedPreferences = JSON.parse(

    localStorage.getItem("foodwisePreferences")

) || {};


// Save updated knowledge.

function saveLearnedPreferences() {

    localStorage.setItem(

        "foodwisePreferences",

        JSON.stringify(learnedPreferences)

    );

}


// Retrieve previous feedback.

function getPreferenceWeight(restaurantId) {

    return learnedPreferences[restaurantId] || 0;

}


/* =====================================================
   4. KNOWLEDGE REPRESENTATION
===================================================== */

// Converts customer and restaurant information
// into facts that can be evaluated by rules.

function representKnowledge(customer, restaurant) {

    return {

        customerLocation: customer.location,

        preferredCuisine: customer.preferredCuisine,

        restaurantCuisine: restaurant.cuisine,

        requiredDiet: customer.dietaryRequirements,

        availableDiet: restaurant.dietary,

        customerBudget: customer.budget,

        restaurantPrice: restaurant.price,

        customerMeal: customer.meal,

        availableMeals: restaurant.meals,

        distance: restaurant.distance,

        rating: restaurant.rating

    };

}


/* =====================================================
   5. PRODUCTION RULES
===================================================== */

// IF-THEN rules used by the inference engine.

const knowledgeRules = [

    {

        name: "DIETARY_COMPATIBILITY",

        apply: function(facts) {

            if (facts.requiredDiet.length === 0) {

                return true;

            }

            return facts.requiredDiet.every(

                requirement =>

                    facts.availableDiet.includes(requirement)

            );

        }

    },


    {

        name: "CUISINE_MATCH",

        apply: function(facts) {

            return facts.restaurantCuisine.includes(

                facts.preferredCuisine

            );

        }

    },


    {

        name: "BUDGET_COMPATIBILITY",

        apply: function(facts) {

            if (facts.customerBudget === "any") {

                return true;

            }

            return facts.restaurantPrice <=

                Number(facts.customerBudget);

        }

    },


    {

        name: "MEAL_COMPATIBILITY",

        apply: function(facts) {

            return facts.customerMeal === "Any" ||

                facts.availableMeals.includes(

                    facts.customerMeal

                );

        }

    }

];


/* =====================================================
   6. INFERENCE ENGINE
===================================================== */

// Applies the production rules to the knowledge base.
//
// This follows a forward-chaining style:
// facts are examined, rules are fired,
// and matching restaurants become candidates.

function runInferenceEngine(customer) {

    const inferenceResults = [];

    restaurantKnowledgeBase.forEach(restaurant => {

        const facts = representKnowledge(

            customer,

            restaurant

        );

        const firedRules = [];

        const rejectedRules = [];

        knowledgeRules.forEach(rule => {

            if (rule.apply(facts)) {

                firedRules.push(rule.name);

            } else {

                rejectedRules.push(rule.name);

            }

        });

        const isCandidate =

            firedRules.length === knowledgeRules.length;

        inferenceResults.push({

            restaurant,

            facts,

            firedRules,

            rejectedRules,

            isCandidate

        });

    });

    return inferenceResults;

}


/* =====================================================
   7. RECOMMENDATION SCORING
===================================================== */

// Evaluates restaurants using multiple preference signals.

function calculateRecommendationScore(

    restaurant,

    customer

) {

    const cuisineMatch = restaurant.cuisine.includes(

        customer.preferredCuisine

    ) ? 1 : 0;


    const distanceScore = Math.max(

        0,

        1 - restaurant.distance / 8

    );


    const ratingScore = restaurant.rating / 5;


    const budgetScore = customer.budget === "any"

        ? 1

        : Math.max(

            0,

            1 - restaurant.price / Number(customer.budget)

        );


    // Priority weights.

    let weights = {

        taste: 0.50,

        distance: 0.25,

        budget: 0.25

    };


    if (customer.priority === "distance") {

        weights = {

            taste: 0.25,

            distance: 0.50,

            budget: 0.25

        };

    }


    if (customer.priority === "budget") {

        weights = {

            taste: 0.25,

            distance: 0.25,

            budget: 0.50

        };

    }


    const tasteScore =

        (cuisineMatch * 0.6) +

        (ratingScore * 0.4);


    const finalScore =

        tasteScore * weights.taste +

        distanceScore * weights.distance +

        budgetScore * weights.budget;


    // Feedback-based preference adjustment.

    const learningBonus = Math.min(

        getPreferenceWeight(restaurant.id) * 0.02,

        0.10

    );


    return Math.min(

        100,

        Math.round(

            (finalScore + learningBonus) * 100

        )

    );

}


/* =====================================================
   8. EXPLANATION GENERATOR
===================================================== */

// Explains why a restaurant is recommended.

function generateExplanation(result, customer) {

    const restaurant = result.restaurant;

    const reasons = [];


    if (

        restaurant.cuisine.includes(

            customer.preferredCuisine

        )

    ) {

        reasons.push(

            `Matches your preferred ${customer.preferredCuisine} cuisine.`

        );

    }


    if (customer.dietaryRequirements.length > 0) {

        reasons.push(

            `Matches your dietary requirements: ${customer.dietaryRequirements.join(", ")}.`

        );

    }


    if (customer.budget === "any" ||

        restaurant.price <= Number(customer.budget)) {

        reasons.push(

            `Fits your selected budget with an estimated cost of ₹${restaurant.price}.`

        );

    }


    reasons.push(

        `Located approximately ${restaurant.distance} km from the search area.`

    );


    if (getPreferenceWeight(restaurant.id) > 0) {

        reasons.push(

            "Your previous positive feedback increased its preference score."

        );

    }


    return reasons;

}


/* =====================================================
   9. RECOMMENDATION GENERATOR
===================================================== */

function generateRecommendations(customer) {

    const inferenceResults = runInferenceEngine(customer);


    const recommendations = inferenceResults

        .filter(result => result.isCandidate)

        .map(result => {

            const score = calculateRecommendationScore(

                result.restaurant,

                customer

            );


            return {

                ...result,

                score,

                explanation: generateExplanation(

                    result,

                    customer

                )

            };

        });


    // Rank restaurants by recommendation score.

    recommendations.sort(

        (a, b) => b.score - a.score

    );


    return recommendations;

}


/* =====================================================
   10. RENDER RECOMMENDATIONS
===================================================== */

const resultsGrid = document.getElementById("resultsGrid");

const resultCount = document.getElementById("resultCount");


function displayRecommendations(recommendations) {

    if (!recommendations.length) {

        resultsGrid.innerHTML = `

            <div class="results-placeholder">

                <div class="placeholder-icon">✧</div>

                <h4>No matching restaurants found</h4>

                <p>

                    Try changing your dietary requirements
                    or increasing your budget.

                </p>

            </div>

        `;

        resultCount.textContent = "0 MATCHES";

        return;

    }


    resultCount.textContent =

        `${recommendations.length} MATCHES`;


    resultsGrid.innerHTML = recommendations.map(

        (item, index) => {

            const restaurant = item.restaurant;

            return `

                <article class="restaurant-card">

                    <div class="food-visual ${restaurant.theme}">

                        ${restaurant.emoji}

                    </div>


                    <div class="restaurant-info">

                        <h4>${restaurant.name}</h4>

                        <p>

                            ${restaurant.cuisine.join(" / ")}

                            · ${restaurant.location}

                            · ${restaurant.distance} km

                        </p>


                        <div class="restaurant-tags">

                            <span>₹${restaurant.price}/person</span>

                            <span>★ ${restaurant.rating}</span>

                            <span>${restaurant.dietary[0]}</span>

                        </div>

                    </div>


                    <div class="restaurant-score">

                        <strong>${item.score}%</strong>

                        <small>MATCH</small>

                        <button

                            class="why-button"

                            data-explanation="${restaurant.id}"

                        >

                            Why this match? ↗

                        </button>

                    </div>


                    <div

                        class="explanation-panel"

                        id="explanation-${restaurant.id}"

                        hidden

                    >

                        <strong>Inference Explanation</strong>

                        <ul>

                            ${item.explanation.map(

                                reason => `<li>${reason}</li>`

                            ).join("")}

                        </ul>


                        <p class="rule-trace">

                            Rules fired:

                            ${item.firedRules.join(" · ")}

                        </p>


                        <button

                            class="feedback-button"

                            data-feedback="${restaurant.id}"

                        >

                            ♡ I like this recommendation

                        </button>

                    </div>

                </article>

            `;

        }

    ).join("");


    attachRecommendationEvents();

}


/* =====================================================
   11. EXPLANATION AND FEEDBACK EVENTS
===================================================== */

function attachRecommendationEvents() {

    document.querySelectorAll("[data-explanation]")

        .forEach(button => {

            button.addEventListener("click", () => {

                const id = button.dataset.explanation;

                const explanation = document.getElementById(

                    `explanation-${id}`

                );

                explanation.hidden = !explanation.hidden;

                button.textContent = explanation.hidden

                    ? "Why this match? ↗"

                    : "Hide explanation ↑";

            });

        });


    document.querySelectorAll("[data-feedback]")

        .forEach(button => {

            button.addEventListener("click", () => {

                const id = button.dataset.feedback;

                learnedPreferences[id] =

                    (learnedPreferences[id] || 0) + 1;


                saveLearnedPreferences();


                showNotification(

                    "Preference learned! Future recommendations will adapt."

                );


                const recommendations =

                    generateRecommendations(customerKnowledge);


                displayRecommendations(recommendations);

            });

        });

}


/* =====================================================
   12. CUISINE SELECTION
===================================================== */

let selectedCuisine = "South Indian";


document.querySelectorAll("[data-cuisine]")

    .forEach(button => {

        button.addEventListener("click", () => {

            document.querySelectorAll("[data-cuisine]")

                .forEach(item => {

                    item.classList.remove("selected");

                });


            button.classList.add("selected");

            selectedCuisine = button.dataset.cuisine;

        });

    });


/* =====================================================
   13. FORM INPUT PROCESSING
===================================================== */

const preferenceForm = document.getElementById(

    "preferenceForm"

);


preferenceForm.addEventListener("submit", event => {

    event.preventDefault();


    const location = document.getElementById(

        "locationInput"

    ).value.trim();


    const budget = document.getElementById(

        "budgetSelect"

    ).value;


    const meal = document.getElementById(

        "mealSelect"

    ).value;


    const priority = document.querySelector(

        'input[name="priority"]:checked'

    ).value;


    const dietaryRequirements = [

        ...document.querySelectorAll(

            'input[name="diet"]:checked'

        )

    ].map(input => input.value);


    // Update customer knowledge.

    customerKnowledge = {

        location,

        preferredCuisine: selectedCuisine,

        dietaryRequirements,

        budget,

        meal,

        priority

    };


    // Execute inference and ranking.

    const recommendations = generateRecommendations(

        customerKnowledge

    );


    displayRecommendations(recommendations);


    document.getElementById(

        "resultHeading"

    ).textContent = `Recommendations for ${location}`;


    showNotification(

        "Knowledge rules successfully applied!"

    );

});


/* =====================================================
   14. NOTIFICATION SYSTEM
===================================================== */

function showNotification(message) {

    const toast = document.getElementById("toastMessage");

    toast.textContent = message;

    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}


/* =====================================================
   15. INITIALIZATION
===================================================== */

// Run the knowledge engine with default preferences.

const initialRecommendations = generateRecommendations(

    customerKnowledge

);

displayRecommendations(initialRecommendations);


console.log("FoodWise AI Knowledge Engine Initialized");

console.log("Knowledge Base:", restaurantKnowledgeBase);

console.log("Production Rules:", knowledgeRules);

console.log("Initial Recommendations:", initialRecommendations);
