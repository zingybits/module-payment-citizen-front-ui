define(
    [
        'Magento_Checkout/js/view/payment/default',
        'jquery',
        'tingle',
        'ZingyBits_CitizenFrontUi/js/citizen-action',
        'mage/url',
        'Magento_Checkout/js/model/quote',
        'Magento_Customer/js/customer-data'
    ],
    function (Component, $, tingle, citizenAction, url, quote, customerData) {
        'use strict';
        return Component.extend({
            defaults: {
                template: 'ZingyBits_CitizenFrontUi/payment/citizen',
                getCitizenTransactionId: url.build('citizen/payment/getdata/qid/' + quote.getQuoteId()),
                cartData : customerData.get('cart')
            },
            getMailingAddress: function () {
                return window.checkoutConfig.payment.checkmo.mailingAddress;
            },
            getInstructions: function () {
                return window.checkoutConfig.payment.instructions[this.item.method];
            },

            redirectAfterPlaceOrder: false,

            /**
             * After place order callback
             */
            afterPlaceOrder: function () {
                $.ajax({
                    showLoader: true,
                    url: this.getCitizenTransactionId,
                    type: "GET"
                }).done(function (data) {
                    globalThis.tingle = tingle;
                    citizenAction(data);
                });
                return false;
            }


        });
    }
);
