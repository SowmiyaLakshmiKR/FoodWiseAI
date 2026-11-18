# 🍽️ FoodWise AI
### A Knowledge-Based Restaurant Recommendation System

FoodWise AI is an intelligent restaurant recommendation prototype that uses **Knowledge Representation, Ontologies, Rule-Based Reasoning, and Preference-Based Scoring** to recommend restaurants according to customer requirements.

## 🎯 Problem Statement

A food-delivery application wants to recommend restaurants based on cuisine, location, dietary requirements, previous orders, and customer preferences. How can knowledge representation support this recommendation?

FoodWise AI demonstrates how customer preferences and restaurant information can be represented as structured knowledge and processed using an inference engine to generate relevant recommendations.

## ✨ Features

- Cuisine-based restaurant recommendations
- Dietary preference filtering
- Budget-based filtering
- Meal-time preferences
- Distance-aware scoring using sample restaurant data
- Rule-based inference engine
- Explanation of recommendation results
- Preference feedback stored locally
- Responsive user interface

## 🧠 Knowledge Engineering Concepts

| Concept | Implementation |
|---|---|
| Knowledge Representation | Structured customer and restaurant facts |
| Ontology | Representation of customers, restaurants, cuisines, locations, and dietary requirements |
| Rule-Based Reasoning | IF–THEN rules for filtering restaurants |
| Inference Engine | Applies rules to identify suitable restaurants |
| Heuristic Scoring | Ranks eligible restaurants based on preferences |
| Preference Learning | Uses local feedback to adjust future rankings |

## ⚙️ How It Works

1. The customer enters their preferences.
2. The system represents the input as structured knowledge.
3. The inference engine applies the recommendation rules.
4. Eligible restaurants are identified.
5. A scoring mechanism ranks the eligible restaurants.
6. The system displays recommendations with explanations.
7. Customer feedback is stored locally to influence subsequent rankings.

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript
- LocalStorage

## 📁 Project Structure

```text
FoodWise-AI/
├── index.html
├── style.css
├── script.js
└── README.md
```

## 🚀 Run the Project

1. Clone this repository:
   ```bash
   git clone https://github.com/YOUR-USERNAME/FoodWise-AI.git
   ```
2. Open the project folder.
3. Open `index.html` in your browser.

No backend or additional installation is required for this prototype.

## 📌 Prototype Scope and Limitations

- Restaurant records and distances are sample demonstration data.
- Location is used as a search-area preference; live GPS-based distance calculation is not implemented.
- Preference feedback is stored in browser LocalStorage and is not machine-learning model training.
- Dietary labels are illustrative and do not verify ingredients or allergen safety.
- Recommendation scores are heuristic rankings, not statistical probabilities.

## 🎓 Academic Relevance

This project demonstrates how Knowledge Engineering techniques can support intelligent decision-making in a food-delivery recommendation scenario through structured knowledge, ontological concepts, production rules, and inference.

---

**FoodWise AI — Smarter Recommendations Through Knowledge Engineering.**