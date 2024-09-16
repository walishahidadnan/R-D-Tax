document.addEventListener('DOMContentLoaded', function() {
    const spendInput = document.querySelector('.spend-input');
    const belowBtn = document.querySelector('.below-btn');
    const aboveBtn = document.querySelector('.above-btn');
    const offsetResult = document.querySelector('.offset-result');
    const errorMessage = document.createElement('p'); // Create a paragraph for the error message
    errorMessage.style.color = 'red';
    errorMessage.style.display = 'none'; // Hidden by default
    spendInput.parentElement.appendChild(errorMessage); // Add error message below the input

    let currentRate = 0.435; // Default is Below $20M

    // Function to calculate the R&D tax offset
    function calculateOffset() {
        const spendValue = parseFloat(spendInput.value);
        
        // Only calculate if input is a valid number
        if (!isNaN(spendValue) && spendValue > 0) {
            const result = (spendValue * currentRate).toFixed(2);
            offsetResult.textContent = `$${result}`;
            errorMessage.style.display = 'none'; // Hide error if valid input
        } else {
            offsetResult.textContent = '$0';
        }
    }

    // Function to check for invalid input
    function validateInput() {
        const inputValue = spendInput.value;

        // Regular expression to allow only numeric values
        const isValid = /^\d*\.?\d*$/.test(inputValue);

        if (!isValid) {
            // If invalid, clear the input, show error, and reset the result
            spendInput.value = '';
            errorMessage.textContent = 'Please enter a valid numeric value.';
            errorMessage.style.display = 'block';
            offsetResult.textContent = '$0';
        } else {
            errorMessage.style.display = 'none'; // Hide error if valid input
        }
    }

    // Event listener for spend input (on input change)
    spendInput.addEventListener('input', function() {
        validateInput(); // Validate input first
        calculateOffset(); // Then calculate the offset if valid
    });

    // Button click event for Below $20M
    belowBtn.addEventListener('click', function() {
        currentRate = 0.435;
        belowBtn.classList.add('active');
        aboveBtn.classList.remove('active');
        calculateOffset(); // Recalculate on button click
    });

    // Button click event for Above $20M
    aboveBtn.addEventListener('click', function() {
        currentRate = 0.385;
        aboveBtn.classList.add('active');
        belowBtn.classList.remove('active');
        calculateOffset(); // Recalculate on button click
    });
});
