var config = {
    map: {
        "*": {
            "tingle": "ZingyBits_CitizenFrontUi/js/tingle",
            "sdkpayin": "ZingyBits_CitizenFrontUi/js/sdk-payin",
            "citizenwebsocket": "ZingyBits_CitizenFrontUi/js/citizen-utils-websocket"
        },

    shim: {
        'sdkpayin' :
            {
                deps: ['jquery', 'tingle']
            }
    }

    }
};
