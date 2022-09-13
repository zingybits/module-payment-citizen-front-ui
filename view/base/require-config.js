var config = {
    shim: {
        'ZingyBits_CitizenFrontUi/js/view/payment/method-renderer/citizen-method': {
            deps: ['ZingyBits_CitizenFrontUi/js/citizen-sdk']
        },
        'ZingyBits_CitizenFrontUi/js/citizen-sdk': {
            deps: ['jquery', 'jquery-ui']
        }
    }
};
