/**
 * @citizen-action
 */
define(
    [
        'sdkpayin'
    ],
    function () {
        'use strict';

        /**
         * place action on Citizen
         */
        return function (data) {
            //globalThis.tingle = tingle;
            globalThis.citizenData = data;

            window.citizenAsyncInit = function () {
                CITIZEN_PAYIN.init({
                    publicApiKey: citizenData.publicApiKey
                })
            };

            // DIRECT journey
            let sendDirectPayIn = function (citizenTransactionId) {
                window.CITIZEN_PAYIN.startPayInJourney(citizenTransactionId);
            }

            // Email journey
            let options = {
                initiatedCallback: function () {
                    console.log("This function called when the modal is about to open")
                }
            }

            let sendEmailPayIn = function (citizenTransactionId, options) {
                window.CITIZEN_PAYIN.startEmailPayInJourney(citizenTransactionId, options);
            }

            // QR code journey
            let sendQRCodePayIn = function (citizenTransactionId) {
                window.CITIZEN_PAYIN.startQRCodePayInJourney(citizenTransactionId);
            }


            window.citizenAsyncInit();
            // for phone
            sendDirectPayIn(citizenData.transactionId);

            // for desktop
            // sendQRCodePayIn(citizenData.transactionId);
            // sendEmailPayIn(citizenData.transactionId, options);


            // if (citizenData.isPhone) {
            //     sendPayIn(citizenData.transactionId);
            //     console.log('sendPayIn');
            // } else {
            //     sendQRCodePayIn(citizenData.transactionId);
            //     console.log('sendQRCodePayIn');
            // }


        };
    }
);
