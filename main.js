function buttonClicked() {
    var meal = document.getElementById("meal_input").value;
  
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
      .then((response) => response.json())
      .then((data) => {
        // Check if meals array is not empty
        if (data.meals && data.meals.length > 0) {
          var firstMeal = data.meals[0];
  
          var food_area = firstMeal.strArea;
          var category = firstMeal.strCategory;
          var meal_name = firstMeal.strMeal;
          var source = firstMeal.strSource;
          var video_link = firstMeal.strYoutube;
  
          document.getElementById("display").innerHTML = `
            <b> Country :</b> ${food_area}<br>
            <b> Category :</b> ${category}<br>
            <b> Meal Name :</b> ${meal_name}<br>
            <b> Source :</b> <a href="${source}" target = "_blank" style="black">"${source}</a><br>
            <b> Video Link :</b> <a href="${video_link}" target = "_blank" style="black">"${video_link}</a><br>
            <button type="button" class="details" onclick=" redirectToDetailsPage('${firstMeal.idMeal}')">Details</button>
          `;
        } else {
          document.getElementById("display").innerHTML = "No matching meal found.";
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

function buttonClicked2() {
  
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
      .then((response) => response.json())
      .then((data) => {
        // Check if meals array is not empty
        if (data.meals && data.meals.length > 0) {
          var firstMeal = data.meals[0];
  
          var food_area = firstMeal.strArea;
          var category = firstMeal.strCategory;
          var meal_name = firstMeal.strMeal;
          var source = firstMeal.strSource;
          var video_link = firstMeal.strYoutube;
  
          document.getElementById("display").innerHTML = `
            <b> Origin :</b> ${food_area}<br>
            <b> Category :</b> ${category}<br>
            <b> Meal Name :</b> ${meal_name}<br>
            <b> Source :</b> <a href="${source}" target = "_blank">"${source}</a><br>
            <b> Video Link :</b> <a href="${video_link}" target = "_blank">"${video_link}</a><br>
            <button type="button" class="details" onclick=" redirectToDetailsPage('${firstMeal.idMeal}')">Details</button>
          `;
        } else {
          document.getElementById("display").innerHTML = "No matching meal found.";
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
//-------------------------------------------------------------------------------------------------------------------------------------------
function viewDetails(mealId) {
    // Fetch detailed information based on the meal ID
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then((response) => response.json())
        .then((data) => {
            // Handle the detailed information about the meal
            var detailedInfo = data.meals[0];
    
            var mealName = detailedInfo.strMeal;
            var instruction = detailedInfo.strInstructions;
            var ingredients = [];
            var strMealThumb = detailedInfo.strMealThumb;

            // Collect ingredients from the response
            for (let i = 1; i <= 20; i++) {
                var ingredient = detailedInfo[`strIngredient${i}`];
                var measure = detailedInfo[`strMeasure${i}`];

                // Check if ingredient is present
                if (ingredient) {
                    ingredients.push(`${measure} ${ingredient}`);
                } else {
                    break; // Stop when no more ingredients are found
                }
            }

            // Display the detailed information on details.html
            document.getElementById("mealName").innerText = mealName;
            document.getElementById("instructions").innerText = instruction;

            // Display the image
            var mealImage = document.createElement("img");
            mealImage.src = strMealThumb;
            mealImage.alt = detailedInfo.idMeal;
            document.getElementById("imageContainer").appendChild(mealImage);

            var ingredientsList = document.getElementById("ingredients");
            ingredientsList.innerHTML = ingredients.map(ingredient => `<li>${ingredient}</li>`).join('');

        })
        .catch((error) => {
            console.error("Error fetching detailed data:", error);
        });
}



// Call viewDetails function on page load if there is a mealId parameter in the URL
window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const mealId = urlParams.get('mealId');

    if (mealId) {
        viewDetails(mealId);
    }
}

function redirectToDetailsPage(mealId) {
    window.location.href = `details.html?mealId=${mealId}`;
}

//-------------------------------------------------------------------------------------------------------------------------------------------

