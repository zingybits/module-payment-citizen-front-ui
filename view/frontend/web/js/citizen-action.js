/*browser:true*/
/*global define*/
define(['ZingyBits_CitizenFrontUi/js/citizen-sdk', 'Magento_Checkout/js/model/full-screen-loader'], function (citizenSdk, fullScreenLoader) {
        'use strict';
        /**
         * place action on Citizen
         */

        function placeAction(citizenData) {
            window.sendDirectPayIn = function (citizenTransactionId) {
                window.CITIZEN_PAYIN.startPayInJourney(citizenTransactionId);
            }

            // QR code journey
            window.sendQRCodePayIn = function (citizenTransactionId) {
                window.CITIZEN_PAYIN.startQRCodePayInJourney(citizenTransactionId);
            }

            // for phone
            if (window.screen.availWidth > 768) {
                window.sendQRCodePayIn(citizenData.transactionId);
            } else {
                window.sendDirectPayIn(citizenData.transactionId);
            }
            return true;
        }

        return function (citizenData) {
            citizenSdk(citizenData).then(() => {
                placeAction(citizenData)
                fullScreenLoader.stopLoader();
            })

        };
    }
);
