document.addEventListener("DOMContentLoaded", () => {
    const image = document.getElementById("hoverImage");
    const text = document.getElementById("hoverText");
    
    // Mouse enter event to trigger sliding text and image blur
    image.addEventListener("mouseenter", () => {
        text.style.display = "block";  // Show the text
        text.style.opacity = "1";  // Make it visible
        text.style.transform = "translate(-50%, -50%) translateY(0)";  // Slide in the text
        image.style.filter = "blur(5px)";  // Blur the image
    });
    
    // Mouse leave event to reset the text and image
    image.addEventListener("mouseleave", () => {
        text.style.display = "none";  // Hide the text
        text.style.opacity = "0";  // Make it invisible
        text.style.transform = "translate(-50%, -50%) translateY(20px)";  // Slide out the text
        image.style.filter = "none";  // Remove the blur from the image
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const inputField = document.getElementById("name");

    // Store the placeholder in a custom attribute
    inputField.dataset.placeholder = inputField.placeholder;

    // Remove the placeholder on mouse enter
    inputField.addEventListener("mouseenter", function () {
        inputField.placeholder = "";
    });

    // Restore the placeholder on mouse leave (only if input is empty)
    inputField.addEventListener("mouseleave", function () {
        if (inputField.value === "") {
            inputField.placeholder = inputField.dataset.placeholder;
        }
    });
});








document.addEventListener("DOMContentLoaded", function () {
    const inputField = document.getElementById("email");

    inputField.addEventListener("mouseenter", function () {
        this.dataset.placeholder = this.placeholder; // Store placeholder text
        this.placeholder = ""; // Remove placeholder
    });

    inputField.addEventListener("mouseleave", function () {
        if (this.value === "") {
            this.placeholder = this.dataset.placeholder; // Restore placeholder only if empty
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const inputField = document.getElementById("message");

    inputField.addEventListener("mouseenter", function () {
        this.dataset.placeholder = this.placeholder; // Store placeholder text
        this.placeholder = ""; // Remove placeholder
    });

    inputField.addEventListener("mouseleave", function () {
        if (this.value === "") {
            this.placeholder = this.dataset.placeholder; // Restore placeholder only if empty
        }
    });
});




