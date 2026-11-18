
/* =====================================================
   FOODWISE AI
   Knowledge-Based Restaurant Recommendation System
===================================================== */

/* 1. RESTAURANT KNOWLEDGE BASE */

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

/* 2. ADDITIONAL RESTAURANT TEMPLATES */

const additionalRestaurantTemplates = [
    { cuisine: "South Indian", price: 130, emoji: "🍛", dietary: ["Vegetarian", "Vegan", "Jain"] },
    { cuisine: "North Indian", price: 230, emoji: "🥘", dietary: ["Vegetarian", "Jain"] },
    { cuisine: "Chinese", price: 210, emoji: "🍜", dietary: ["Vegetarian", "Vegan"] },
    { cuisine: "Italian", price: 330, emoji: "🍕", dietary: ["Vegetarian"] },
    { cuisine: "Mexican", price: 280, emoji: "🌮", dietary: ["Vegetarian", "Vegan"] },
    { cuisine: "Japanese", price: 390, emoji: "🍱", dietary: ["Vegetarian", "Gluten-free"] },
    { cuisine: "Arabic", price: 310, emoji: "🥙", dietary: ["Vegetarian"] },
    { cuisine: "Continental", price: 320, emoji: "🍝", dietary: ["Vegetarian"] },
    { cuisine: "Healthy", price: 180, emoji: "🥗", dietary: ["Vegetarian", "Vegan", "Gluten-free"] },
    { cuisine: "Fast Food", price: 160, emoji: "🍔", dietary: ["Vegetarian"] }
];

const additionalRestaurantNames = [
    "Royal", "Urban", "Fresh", "Golden", "Spice",
    "Classic", "Garden", "Fusion", "Grand", "Little",
    "Tasty", "Green", "Street", "Daily", "Family"
];

const additionalRestaurantSuffixes = [
    "Kitchen", "Bites", "Corner", "House", "Cafe",
    "Delights", "Express", "Table", "Hub", "Treats"
];

const restaurantAreas = [
    "Thindal",
    "Perundurai Road",
    "Brough Road",
    "Teachers Colony",
    "Moolapalayam",
    "Gandhiji Road",
    "Surampatti",
    "Villarasampatti",
    "Erode Bus Stand"
];

/* Generate 45 additional sample restaurants */

for (let index = 0; index < 45; index++) {
    const template =
        additionalRestaurantTemplates[
            index % additionalRestaurantTemplates.length
        ];

    const prefix =
        additionalRestaurantNames[
            index % additionalRestaurantNames.length
        ];

    const suffix =
        additionalRestaurantSuffixes[
            index % additionalRestaurantSuffixes.length
        ];

    const area =
        restaurantAreas[index % restaurantAreas.length];

    restaurantKnowledgeBase.push({
        id: index + 7,
        name: `${prefix} ${template.cuisine} ${suffix}`,
        cuisine: [template.cuisine],
        location: area,
        price: template.price + ((index % 4) * 20),
        distance: Number(
            (0.8 + ((index * 7) % 45) / 10).toFixed(1)
        ),
        rating: Number(
            (4.0 + ((index * 3) % 10) / 10).toFixed(1)
        ),
        dietary: [...template.dietary],
        meals: ["Breakfast", "Lunch", "Dinner", "Snacks"],
        emoji: template.emoji,
        theme: ["green", "peach", "lavender"][index % 3]
    });
}

console.log(
    `FoodWise AI loaded ${restaurantKnowledgeBase.length} sample restaurants.`
);

/* 3. CUSTOMER KNOWLEDGE */

let customerKnowledge = {
    location: "Erode",
    preferredCuisine: "South Indian",
    dietaryRequirements: ["Vegetarian"],
    budget: 250,
    meal: "Any",
    priority: "taste"
};

/* 4. PREFERENCE LEARNING */

let learnedPreferences = {};

try {
    learnedPreferences = JSON.parse(
        localStorage.getItem("foodwisePreferences") || "{}"
    ) || {};
} catch (error) {
    console.warn("Could not read saved preferences.", error);
    learnedPreferences = {};
}

function saveLearnedPreferences() {
    localStorage.setItem(
        "foodwisePreferences",
        JSON.stringify(learnedPreferences)
    );
}

function getPreferenceWeight(restaurantId) {
    return learnedPreferences[restaurantId] || 0;
}

/* 5. KNOWLEDGE REPRESENTATION */

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
   PART 2 — KNOWLEDGE RULES & INFERENCE ENGINE
===================================================== */

/* 6. PRODUCTION RULES (IF–THEN) */

const knowledgeRules = [
    {
        id: "R1",
        name: "Cuisine Compatibility",
        description: "Restaurant cuisine must match customer preference.",
        evaluate: (restaurant, customer) =>
            customer.preferredCuisine === "Any" ||
            restaurant.cuisine.includes(customer.preferredCuisine)
    },
    {
        id: "R2",
        name: "Dietary Compatibility",
        description: "Restaurant must satisfy dietary requirements.",
        evaluate: (restaurant, customer) =>
            customer.dietaryRequirements.every(requirement =>
                restaurant.dietary.includes(requirement)
            )
    },
    {
        id: "R3",
        name: "Budget Compatibility",
        description: "Restaurant must be within the customer's budget.",
        evaluate: (restaurant, customer) =>
            customer.budget === "Any" ||
            restaurant.price <= Number(customer.budget)
    },
    {
        id: "R4",
        name: "Meal Compatibility",
        description: "Restaurant must support the selected meal.",
        evaluate: (restaurant, customer) =>
            customer.meal === "Any" ||
            restaurant.meals.includes(customer.meal)
    }
];


/* 7. INFERENCE ENGINE */

function runInferenceEngine() {
    const evaluatedRestaurants = restaurantKnowledgeBase.map(restaurant => {

        const knowledge = representKnowledge(
            customerKnowledge,
            restaurant
        );

        const firedRules = knowledgeRules
            .filter(rule =>
                rule.evaluate(restaurant, customerKnowledge)
            )
            .map(rule => ({
                id: rule.id,
                name: rule.name,
                description: rule.description
            }));

        const failedRules = knowledgeRules
            .filter(rule =>
                !rule.evaluate(restaurant, customerKnowledge)
            )
            .map(rule => rule.name);

        return {
            ...restaurant,
            knowledge,
            firedRules,
            failedRules,
            eligible: failedRules.length === 0
        };
    });

    return evaluatedRestaurants.filter(
        restaurant => restaurant.eligible
    );
}


/* 8. HEURISTIC RECOMMENDATION SCORING */

function calculateRecommendationScore(restaurant) {

    const tasteScore = restaurant.rating / 5;

    const distanceScore = Math.max(
        0,
        1 - restaurant.distance / 10
    );

    let budgetScore = 1;

    if (customerKnowledge.budget !== "Any") {
        const budget = Number(customerKnowledge.budget);

        budgetScore = Math.max(
            0,
            1 - restaurant.price / (budget * 1.5)
        );
    }

    let finalScore;

    switch (customerKnowledge.priority) {

        case "distance":
            finalScore =
                distanceScore * 0.60 +
                tasteScore * 0.25 +
                budgetScore * 0.15;
            break;

        case "budget":
            finalScore =
                budgetScore * 0.60 +
                tasteScore * 0.25 +
                distanceScore * 0.15;
            break;

        default:
            finalScore =
                tasteScore * 0.60 +
                distanceScore * 0.25 +
                budgetScore * 0.15;
    }

    // Feedback adjusts the ranking slightly.
    const feedbackBonus = Math.max(
        -10,
        Math.min(10, getPreferenceWeight(restaurant.id) * 2)
    );

    return Math.max(
        0,
        Math.min(100, Math.round(finalScore * 100) + feedbackBonus)
    );
}


/* 9. RECOMMENDATION EXPLANATION GENERATOR */

function generateExplanation(restaurant) {

    const explanations = [];

    if (
        customerKnowledge.preferredCuisine === "Any" ||
        restaurant.cuisine.includes(
            customerKnowledge.preferredCuisine
        )
    ) {
        explanations.push(
            `Matches your ${customerKnowledge.preferredCuisine} cuisine preference.`
        );
    }

    if (customerKnowledge.dietaryRequirements.length > 0) {
        explanations.push(
            `Meets your dietary requirements: ${
                customerKnowledge.dietaryRequirements.join(", ")
            }.`
        );
    }

    if (customerKnowledge.budget === "Any") {
        explanations.push(
            "Matches your flexible budget preference."
        );
    } else {
        explanations.push(
            `Costs ₹${restaurant.price}, within your ₹${customerKnowledge.budget} budget.`
        );
    }

    if (customerKnowledge.meal === "Any") {
        explanations.push(
            "Available meal options match your flexible meal preference."
        );
    } else {
        explanations.push(
            `Available for ${customerKnowledge.meal}.`
        );
    }

    explanations.push(
        `Sample listed distance: ${restaurant.distance} km.`
    );

    explanations.push(
        `Customer rating: ${restaurant.rating}/5.`
    );

    return explanations;
}


/* 10. KNOWLEDGE RULE TRACE */

function generateRuleTrace(restaurant) {

    if (!restaurant.firedRules.length) {
        return "No recommendation rules were satisfied.";
    }

    return restaurant.firedRules.map(rule =>
        `${rule.id}: ${rule.name}`
    ).join(" | ");
}


/* 11. MAIN RECOMMENDATION PIPELINE */

function getRankedRecommendations() {

    const eligibleRestaurants = runInferenceEngine();

    const rankedRestaurants = eligibleRestaurants.map(restaurant => ({
        ...restaurant,
        score: calculateRecommendationScore(restaurant),
        explanation: generateExplanation(restaurant),
        ruleTrace: generateRuleTrace(restaurant)
    }));

    rankedRestaurants.sort((a, b) => b.score - a.score);

    return rankedRestaurants;
}

/* =====================================================
   PART 3 — RESTAURANT DISPLAY & INTERACTIONS
===================================================== */

/* 12. DOM ELEMENTS */

const resultsGrid = document.getElementById("resultsGrid");
const resultCount = document.getElementById("resultCount");


/* 13. NOTIFICATION SYSTEM */

function showNotification(message) {
    const toast = document.getElementById("toastMessage");

    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}


/* 14. RESTAURANT CARD GENERATOR */

function createRestaurantCard(restaurant) {

    const dietaryTags = restaurant.dietary
        .map(tag => `<span>${tag}</span>`)
        .join("");

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
                    ${dietaryTags}
                </div>

            </div>

            <div class="restaurant-score">

                <strong>${restaurant.score}%</strong>

                <small>MATCH</small>

                <button
                    class="why-button"
                    data-explanation="${restaurant.id}">
                    Why this match? ↗
                </button>

            </div>

            <div
                class="explanation-panel"
                id="explanation-${restaurant.id}"
                hidden>

                <strong>Knowledge-Based Explanation</strong>

                <ul>
                    ${restaurant.explanation.map(reason =>
                        `<li>${reason}</li>`
                    ).join("")}
                </ul>

                <p class="rule-trace">
                    Rules fired: ${restaurant.ruleTrace}
                </p>

                <button
                    class="feedback-button"
                    data-feedback="${restaurant.id}">
                    ♡ I like this recommendation
                </button>

            </div>

        </article>
    `;
}


/* 15. DISPLAY RECOMMENDATIONS */

function displayRecommendations(recommendations) {

    if (!resultsGrid) {
        console.error("Results grid element not found.");
        return;
    }

    if (resultCount) {
        resultCount.textContent =
            `${recommendations.length} MATCHES`;
    }

    if (recommendations.length === 0) {

        resultsGrid.innerHTML = `
            <div class="results-placeholder">

                <div class="placeholder-icon">✧</div>

                <h4>No matching restaurants found</h4>

                <p>
                    Try changing your cuisine, dietary
                    requirements or increasing your budget.
                </p>

            </div>
        `;

        return;
    }

    resultsGrid.innerHTML = recommendations
        .map(createRestaurantCard)
        .join("");

    attachRecommendationEvents();
}


/* 16. EXPLANATION AND FEEDBACK EVENTS */

function attachRecommendationEvents() {

    document.querySelectorAll("[data-explanation]")
        .forEach(button => {

            button.addEventListener("click", () => {

                const id = button.dataset.explanation;

                const explanation = document.getElementById(
                    `explanation-${id}`
                );

                if (!explanation) return;

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
                    "Preference learned! Your recommendations are adapting."
                );

                refreshRecommendations();

            });

        });

}


/* 17. REFRESH RECOMMENDATIONS */

function refreshRecommendations() {

    const recommendations = getRankedRecommendations();

    displayRecommendations(recommendations);

    const heading = document.getElementById("resultHeading");

    if (heading) {
        heading.textContent =
            `Recommendations for ${customerKnowledge.location}`;
    }

    return recommendations;
}


/* 18. KNOWLEDGE ENGINE STATUS */

function displayKnowledgeStatistics() {

    console.log("========== FOODWISE AI ==========");
    console.log(
        "Total restaurant records:",
        restaurantKnowledgeBase.length
    );
    console.log(
        "Available cuisine categories:",
        [...new Set(
            restaurantKnowledgeBase.flatMap(item => item.cuisine)
        )]
    );
    console.log(
        "Active production rules:",
        knowledgeRules.length
    );
    console.log(
        "Current customer knowledge:",
        customerKnowledge
    );
    console.log("=================================");
}

/* =====================================================
   PART 4 — FORM HANDLING & INITIALIZATION
===================================================== */

/* 19. CUSTOMER PREFERENCE FORM */

function setupPreferenceForm() {

    const preferenceForm =
        document.getElementById("preferenceForm");

    if (!preferenceForm) {
        console.error("Preference form not found.");
        return;
    }

    preferenceForm.addEventListener("submit", event => {

        event.preventDefault();

        const locationInput =
            document.getElementById("locationInput");

        const budgetSelect =
            document.getElementById("budgetSelect");

        const mealSelect =
            document.getElementById("mealSelect");

        const selectedCuisine =
            document.querySelector("[data-cuisine].active");

        const selectedDietary =
            Array.from(
                document.querySelectorAll(
                    'input[name="diet"]:checked'
                )
            ).map(input => input.value);

        const selectedPriority =
            document.querySelector(
                'input[name="priority"]:checked'
            );

        customerKnowledge.location =
            locationInput?.value.trim() || "Erode";

        customerKnowledge.preferredCuisine =
            selectedCuisine?.dataset.cuisine || "Any";

        customerKnowledge.dietaryRequirements =
            selectedDietary;

        customerKnowledge.budget =
            budgetSelect?.value || "Any";

        customerKnowledge.meal =
            mealSelect?.value || "Any";

        customerKnowledge.priority =
            selectedPriority?.value || "taste";

        refreshRecommendations();

        showNotification(
            "Your restaurant recommendations are updated!"
        );

    });

}


/* 20. CUISINE BUTTON INTERACTIONS */

function setupCuisineSelection() {

    const cuisineButtons =
        document.querySelectorAll("[data-cuisine]");

    cuisineButtons.forEach(button => {

        button.addEventListener("click", () => {

            cuisineButtons.forEach(item => {
                item.classList.remove("active", "selected");
            });

            button.classList.add("active", "selected");

            selectedCuisine = button.dataset.cuisine;

            console.log(
                "Selected cuisine:",
                selectedCuisine
            );

        });

    });

}


/* 21. INITIAL CUSTOMER PREFERENCES */

function initializeDefaultPreferences() {

    const defaultCuisine = document.querySelector(
        '[data-cuisine="South Indian"]'
    );

    if (defaultCuisine) {
        defaultCuisine.classList.add("active");
    }

}


/* 22. INITIALIZE FOODWISE AI */

document.addEventListener("DOMContentLoaded", () => {

    console.log("Initializing FoodWise AI...");

    initializeDefaultPreferences();

    setupCuisineSelection();

    setupPreferenceForm();

    displayKnowledgeStatistics();

    const recommendations = refreshRecommendations();

    console.log(
        "Initial recommendations generated:",
        recommendations.length
    );

    console.log(
        "FoodWise AI successfully initialized!"
    );

});
