function setup_facebook_sharing(qualtrics, force) {
    // Add hidden HTML that says we are waiting for the user to complete the nomination
    var wait_div = jQuery('<div id="waiting" style="display: none" class="QuestionText">Waiting for you to share the survey on Facebook.</div>')
    wait_div.insertAfter('#' + qualtrics.questionId);

    var question_div = jQuery('#' + qualtrics.questionId);

    if (force) {
        // Do not let the user advance
        qualtrics.hideNextButton();
    }

    // Add a handler
    jQuery('#QR\\~' + qualtrics.questionId + '\\~1').click(function () {
        // Hide the question
        question_div.hide();
        wait_div.show();
        // Show popup
        FB.ui({
            method: 'share',
            mobile_iframe: true,
            href: 'https:/tillahoffmann.github.io/survey_assets/index.html?token=${e://Field/uid}',
        }, function (response) {
            if (typeof (response) === 'undefined') {
                // Restore the original layout and reset the question
                question_div.show();
                wait_div.hide();
                qualtrics.setChoiceValue('1', 0);
                // Notify the user
                if (force) {
                    alert('Please share the survey on Facebook to complete the survey.');
                }
                else {
                    alert('Please share the survey on Facebook or click the next button to continue without sharing.')
                }
            // Finish the survey
            } else {
                qualtrics.clickNextButton();
            }
        });
    })
}
