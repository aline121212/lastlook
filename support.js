const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {

        // Close every other FAQ
        faqItems.forEach(other => {

            if(other !== item){
                other.classList.remove("active");
            }

        });

        // Toggle clicked FAQ
        item.classList.toggle("active");

    });

});