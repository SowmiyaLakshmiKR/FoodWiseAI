
/* =====================================================
   FOODWISE AI — KNOWLEDGE-BASED RECOMMENDATION SYSTEM
   Expanded sample restaurant knowledge base
===================================================== */

// 1. RESTAURANT KNOWLEDGE BASE
const restaurants = [
    {
        id: 1, name: "Green Bowl Kitchen", cuisine: ["Healthy", "South Indian"],
        location: "Perundurai Road", price: 180, distance: 1.2,
        rating: 4.7, dietary: ["Vegetarian", "Vegan", "Gluten-free"],
        meals: ["Breakfast", "Lunch"], emoji: "🥗", theme: "green"
    },
    {
        id: 2, name: "Annapoorna Veg House", cuisine: ["South Indian"],
        location: "Thindal", price: 140, distance: 2.1,
        rating: 4.5, dietary: ["Vegetarian", "Jain"],
        meals: ["Breakfast", "Lunch", "Dinner"], emoji: "🍛", theme: "peach"
    },
    {
        id: 3, name: "Wok & Roll", cuisine: ["Chinese"],
        location: "Brough Road", price: 230, distance: 3.4,
        rating: 4.4, dietary: ["Vegetarian"],
        meals: ["Lunch", "Dinner"], emoji: "🍜", theme: "lavender"
    },
    {
        id: 4, name: "Olive & Oregano", cuisine: ["Italian", "Continental"],
        location: "Teachers Colony", price: 380, distance: 4.1,
        rating: 4.6, dietary: ["Vegetarian"],
        meals: ["Lunch", "Dinner"], emoji: "🍕", theme: "peach"
    },
    {
        id: 5, name: "Saffron Table", cuisine: ["North Indian"],
        location: "Moolapalayam", price: 260, distance: 2.7,
        rating: 4.3, dietary: ["Vegetarian", "Jain"],
        meals: ["Lunch", "Dinner"], emoji: "🥘", theme: "green"
    },
    {
        id: 6, name: "Dosa Stories", cuisine: ["South Indian"],
        location: "Thindal", price: 110, distance: 1.6,
        rating: 4.6, dietary: ["Vegetarian", "Vegan", "Jain"],
        meals: ["Breakfast", "Snacks", "Dinner"], emoji: "🥞", theme: "lavender"
    },
    {
        id: 7, name: "Spice Route", cuisine: ["North Indian"],
        location: "Perundurai Road", price: 290, distance: 2.4,
        rating: 4.5, dietary: ["Vegetarian"],
        meals: ["Lunch", "Dinner"], emoji: "🍲", theme: "peach"
    },
    {
        id: 8, name: "Tokyo Bento", cuisine: ["Japanese"],
        location: "Brough Road", price: 420, distance: 4.8,
        rating: 4.8, dietary: ["Vegetarian", "Gluten-free"],
        meals: ["Lunch", "Dinner"], emoji: "🍱", theme: "lavender"
    },
    {
        id: 9, name: "Mexican Fiesta", cuisine: ["Mexican"],
        location: "Teachers Colony", price: 320, distance: 3.8,
        rating: 4.4, dietary: ["Vegetarian", "Vegan"],
        meals: ["Lunch", "Dinner"], emoji: "🌮", theme: "peach"
    },
    {
        id: 10, name: "Arabian Nights", cuisine: ["Arabic"],
        location: "Moolapalayam", price: 350, distance: 3.1,
        rating: 4.6, dietary: ["Vegetarian"],
        meals: ["Lunch", "Dinner"], emoji: "🥙", theme: "green"
    }
];

// Generate additional sample restaurants from curated combinations.
const restaurantTemplates = [
    { cuisine: "South Indian", emoji: "🍛", base: 130, dietary: ["Vegetarian", "Vegan", "Jain"] },
    { cuisine: "North Indian", emoji: "🥘", base: 240, dietary: ["Vegetarian", "Jain"] },
    { cuisine: "Chinese", emoji: "🍜", base: 220, dietary: ["Vegetarian", "Vegan"] },
    { cuisine: "Italian", emoji: "🍕", base: 350, dietary: ["Vegetarian"] },
    { cuisine: "Mexican", emoji: "🌮", base: 300, dietary: ["Vegetarian", "Vegan"] },
    { cuisine: "Japanese", emoji: "🍱", base: 400, dietary: ["Vegetarian", "Gluten-free"] },
    { cuisine: "Arabic", emoji: "🥙", base: 320, dietary: ["Vegetarian"] },
    { cuisine: "Continental", emoji: "🍝", base: 340, dietary: ["Vegetarian"] },
    { cuisine: "Healthy", emoji: "🥗", base: 180, dietary: ["Vegetarian", "Vegan", "Gluten-free"] },
    { cuisine: "Fast Food", emoji: "🍔", base: 160, dietary: ["Vegetarian"] }
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
    "Erode Bus Stand",
    "Veerappanchatram"
];

const restaurantPrefixes = [
    "Royal", "Urban", "Classic", "Fresh", "Golden",
    "Spice", "Little", "Grand", "Daily", "Family",
    "Fusion", "Taste", "Garden", "Urban Spoon", "Foodie"
];

const restaurantSuffixes = [
    "Kitchen", "Bites", "Corner", "House", "Hub",
    "Delights", "Cafe", "Express", "Treats", "Table"
];

for (let i = 0; i < 45; i++) {
    const template = restaurantTemplates[i % restaurantTemplates.length];
    const area = restaurantAreas[i % restaurantAreas.length];
    const prefix = restaurantPrefixes[i % restaurantPrefixes.length];
    const suffix = restaurantSuffixes[i % restaurantSuffixes.length];

    restaurants.push({
        id: i + 11,
        name: `${prefix} ${template.cuisine} ${suffix}`,
        cuisine: [template.cuisine],
        location: area,
        price: template.base + ((i % 5) * 20),
        distance: Number((0.8 + ((i * 7) % 45) / 10).toFixed(1)),
        rating: Number((4.0 + ((i * 3) % 10) / 10).toFixed(1)),
        dietary: template.dietary,
        meals: ["Breakfast", "Lunch", "Dinner"],
        emoji: template.emoji,
        theme: ["green", "peach", "lavender"][i % 3]
    });
}

// Total: 55 sample restaurant records.
// These are synthetic demo records, not verified real businesses.


// 2. CUSTOMER KNOWLEDGE
const customerKnowledge = {
    location: "Erode",
    cuisine: "South Indian",
    dietary: ["Vegetarian"],
    budget: 250,
    meal: "Any",
    priority: "taste"
};

let selectedCuisine = "South Indian";


// 3. KNOWLEDGE REPRESENTATION
function representKnowledge() {
    return {
        customer: {
            preferredCuisine: customerKnowledge.cuisine,
            location: customerKnowledge.location,
            dietaryRequirements: customerKnowledge.dietary,
            maximumBudget: Number(customerKnowledge.budget),
            preferredMeal: customerKnowledge.meal,
            priority: customerKnowledge.priority
        },
        restaurantFacts: restaurants.length
    };
}


// 4. KNOWLEDGE RULES
const knowledgeRules = [
    {
        id: "R1",
        name: "Dietary Compatibility",
        description: "Restaurant must satisfy the customer's dietary requirements.",
        evaluate: (restaurant, customer) =>
            customer.dietary.every(item => restaurant.dietary.includes(item))
    },
    {
        id: "R2",
        name: "Cuisine Matching",
        description: "Restaurant must match the selected cuisine.",
        evaluate: (restaurant, customer) =>
            customer.cuisine === "Any" ||
            restaurant.cuisine.includes(customer.cuisine)
    },
    {
        id: "R3",
        name: "Budget Compatibility",
        description: "Restaurant price must be within the customer's budget.",
        evaluate: (restaurant, customer) =>
            customer.budget === "Any" ||
            restaurant.price <= Number(customer.budget)
    },
    {
        id: "R4",
        name: "Meal-Time Compatibility",
        description: "Restaurant must support the selected meal.",
        evaluate: (restaurant, customer) =>
            customer.meal === "Any" ||
            restaurant.meals.includes(customer.meal)
    }
];


// 5. INFERENCE ENGINE
function runInferenceEngine() {
    const customer = {
        ...customerKnowledge,
        cuisine: customerKnowledge.cuisine,
        budget: customerKnowledge.budget
    };

    return restaurants.map(restaurant => {
        const firedRules = knowledgeRules
            .filter(rule => rule.evaluate(restaurant, customer))
            .map(rule => rule.id);

        return {
            ...restaurant,
            firedRules,
            eligible: firedRules.length === knowledgeRules.length
        };
    }).filter(restaurant => restaurant.eligible);
}


// 6. PREFERENCE SCORING
function calculateRecommendationScore(restaurant) {
    const budget = customerKnowledge.budget === "Any"
        ? 500
        : Number(customerKnowledge.budget);

    const tasteScore = restaurant.rating / 5;
    const distanceScore = Math.max(0, 1 - restaurant.distance / 10);
    const budgetScore = Math.max(0, 1 - restaurant.price / (budget * 1.5));

    let score;

    if (customerKnowledge.priority === "distance") {
        score = distanceScore * 0.6 + tasteScore * 0.25 + budgetScore * 0.15;
    } else if (customerKnowledge.priority === "budget") {
        score = budgetScore * 0.6 + tasteScore * 0.25 + distanceScore * 0.15;
    } else {
        score = tasteScore * 0.6 + distanceScore * 0.25 + budgetScore * 0.15;
    }

    return Math.round(score * 100);
}


// 7. EXPLANATION GENERATOR
function generateExplanation(restaurant) {
    const reasons = [];

    if (
        customerKnowledge.cuisine === "Any" ||
        restaurant.cuisine.includes(customerKnowledge.cuisine)
    ) {
        reasons.push(`Matches your ${customerKnowledge.cuisine} cuisine preference`);
    }

    if (customerKnowledge.dietary.every(item => restaurant.dietary.includes(item))) {
        reasons.push("Meets your dietary requirements");
    }

    if (
        customerKnowledge.budget === "Any" ||
        restaurant.price <= Number(customerKnowledge.budget)
    ) {
        reasons.push("Fits within your budget");
    }

    if (
        customerKnowledge.meal === "Any" ||
        restaurant.meals.includes(customerKnowledge.meal)
    ) {
        reasons.push("Available for your selected meal");
    }

    reasons.push(`Sample listed distance: ${restaurant.distance} km`);

    return reasons;
}


// 8. DISPLAY RECOMMENDATIONS
function displayRecommendations(recommendations) {
    const resultsGrid = document.getElementById("resultsGrid");
    const resultCount = document.getElementById("resultCount");
    const resultHeading = document.getElementById("resultHeading");

    if (!resultsGrid) return;

    if (resultCount) {
        resultCount.textContent = recommendations.length;
    }

    if (resultHeading) {
        resultHeading.textContent =
            `Recommendations for ${customerKnowledge.location}`;
    }

    if (recommendations.length === 0) {
        resultsGrid.innerHTML = `
            <div class="empty-state">
                <div style="font-size:48px">🔍</div>
                <h3>No matching restaurants found</h3>
                <p>Try changing your cuisine, budget or dietary preferences.</p>
            </div>
        `;
        return;
    }

    resultsGrid.innerHTML = recommendations.map(restaurant => {
        const reasons = generateExplanation(restaurant);

        return `
            <article class="restaurant-card">
                <div class="food-visual ${restaurant.theme}">
                    <span>${restaurant.emoji}</span>
                    <div class="restaurant-score">
                        ${restaurant.score}% Match
                    </div>
                </div>

                <div class="restaurant-info">
                    <div class="restaurant-heading">
                        <h3>${restaurant.name}</h3>
                        <span>⭐ ${restaurant.rating}</span>
                    </div>

                    <p>📍 ${restaurant.location}</p>

                    <p>🍽️ ${restaurant.cuisine.join(" / ")}</p>

                    <p>📏 ${restaurant.distance} km · ₹${restaurant.price}</p>

                    <div class="restaurant-tags">
                        ${restaurant.dietary.map(tag =>
                            `<span>${tag}</span>`
                        ).join("")}
                    </div>

                    <button class="why-button"
                        onclick="toggleExplanation(${restaurant.id})">
                        Why recommended?
                    </button>

                    <div class="explanation-panel"
                        id="explanation-${restaurant.id}" hidden>
                        <strong>Knowledge-based explanation</strong>
                        <ul>
                            ${reasons.map(reason =>
                                `<li>${reason}</li>`
                            ).join("")}
                        </ul>
                        <p>Rules fired: ${restaurant.firedRules.join(", ")}</p>
                    </div>

                    <button class="feedback-button"
                        onclick="recordFeedback(${restaurant.id}, 'like')">
                        👍 Like this recommendation
                    </button>
                </div>
            </article>
        `;
    }).join("");
}


// 9. EXPLANATION TOGGLE
function toggleExplanation(id) {
    const panel = document.getElementById(`explanation-${id}`);

    if (panel) {
        panel.hidden = !panel.hidden;
    }
}


// 10. FEEDBACK KNOWLEDGE
function recordFeedback(id, feedback) {
    const key = "foodwisePreferences";

    const existing = JSON.parse(localStorage.getItem(key) || "{}");

    existing[id] = (existing[id] || 0) + (feedback === "like" ? 1 : -1);

    localStorage.setItem(key, JSON.stringify(existing));

    showToast("Your preference feedback has been saved!");

    updateRecommendations();
}


// 11. MAIN RECOMMENDATION PIPELINE
function updateRecommendations() {
    const candidates = runInferenceEngine();

    const feedback = JSON.parse(
        localStorage.getItem("foodwisePreferences") || "{}"
    );

    const ranked = candidates.map(restaurant => ({
        ...restaurant,
        score: Math.max(
            0,
            Math.min(
                100,
                calculateRecommendationScore(restaurant) +
                Math.min(10, (feedback[restaurant.id] || 0) * 2)
            )
        )
    }));

    ranked.sort((a, b) => b.score - a.score);

    displayRecommendations(ranked);

    console.log("Knowledge representation:", representKnowledge());
    console.log("Eligible restaurants:", ranked.length);
    console.log("Inference rules:", knowledgeRules);
}


// 12. FORM INPUT HANDLING
function setupForm() {
    const form = document.getElementById("preferenceForm");

    if (!form) return;

    form.addEventListener("submit", event => {
        event.preventDefault();

        const location = document.getElementById("locationInput");
        const budget = document.getElementById("budgetSelect");
        const meal = document.getElementById("mealSelect");

        customerKnowledge.location = location?.value.trim() || "Erode";
        customerKnowledge.budget = budget?.value || "Any";
        customerKnowledge.meal = meal?.value || "Any";

        customerKnowledge.cuisine = selectedCuisine || "Any";

        customerKnowledge.dietary = Array.from(
            document.querySelectorAll('input[name="diet"]:checked')
        ).map(input => input.value);

        const priority = document.querySelector(
            'input[name="priority"]:checked'
        );

        customerKnowledge.priority = priority?.value || "taste";

        updateRecommendations();

        showToast("Your recommendations have been updated!");
    });

    document.querySelectorAll("[data-cuisine]").forEach(button => {
        button.addEventListener("click", () => {
            document.querySelectorAll("[data-cuisine]").forEach(item =>
                item.classList.remove("active")
            );

            button.classList.add("active");
            selectedCuisine = button.dataset.cuisine;
        });
    });
}


// 13. TOAST MESSAGE
function showToast(message) {
    const toast = document.getElementById("toastMessage");

    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}


// 14. INITIALIZATION
document.addEventListener("DOMContentLoaded", () => {
    setupForm();
    updateRecommendations();

    console.log("FoodWise AI initialized successfully!");
    console.log("Total sample restaurants:", restaurants.length);
});
