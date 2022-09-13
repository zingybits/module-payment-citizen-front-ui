/*browser:true*/
/*global define*/
define([], function () {
        'use strict';

        return function (citizenData) {
            return new Promise((resolve) => {
                    const header = document.getElementsByTagName('head')[0]
                    const scriptElement = document.createElement('script')
                    scriptElement.type = 'text/javascript'

                    scriptElement.src = citizenData.urlSdk
                    scriptElement.dataset['apiKey'] = citizenData.publicApiKey
                    scriptElement.onload = () => {
                        // here the CITIZEN_PAYIN has already populated
                        CITIZEN_PAYIN.ready().then(() => {
                            resolve(true)
                        })

                    }
                    header.appendChild(scriptElement)
                });
        }
    }
);
