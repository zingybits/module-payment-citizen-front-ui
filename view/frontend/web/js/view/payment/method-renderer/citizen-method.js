/*browser:true*/
/*global define*/
define(
    [
        'Magento_Checkout/js/view/payment/default',
        'jquery',
        'ZingyBits_CitizenFrontUi/js/citizen-action',
        'mage/url',
        'Magento_Checkout/js/model/quote',
        'Magento_Customer/js/customer-data',
        'Magento_Catalog/js/price-utils',
        'Magento_Checkout/js/model/full-screen-loader',
        'Magento_Ui/js/modal/alert',
    ],
    function (
        Component,
        $,
        citizenAction,
        url,
        quote,
        customerData,
        priceUtils,
        fullScreenLoader,
        alert
    ) {
        'use strict';
        return Component.extend({
            defaults: {
                template: 'ZingyBits_CitizenFrontUi/payment/citizen',
                urlCitizenTransactionData: url.build('citizen/payment/getdata/qid/' + quote.getQuoteId()),
                cartData: customerData.get('cart'),
                citizenCheckoutConfigData: window.citizenCheckoutConfigData
            },
            redirectAfterPlaceOrder: false,

            /**
             * After place order callback
             */
            afterPlaceOrder: function () {
                $.ajax({
                    showLoader: true,
                    url: this.urlCitizenTransactionData,
                    dataType: 'json',
                    type: "GET"
                }).done(function (data, status) {
                    if (status !== 'success') {
                        fullScreenLoader.stopLoader();
                        alert({
                            content: 'Error message - ' + status + ' Please contact the support team. '
                        });
                        return false;
                    }
                    citizenAction(data);
                });
                return false;
            },

            getSubTotal: function () {
                let totals = quote.getTotals()();
                let price = (totals ? totals : quote)['grand_total'];
                return priceUtils.formatPrice(price, quote.getBasePriceFormat());
            },
            isDesktop: function () {
                return (window.screen.availWidth > 768);
            },
            getPhraseTitle: function () {
                return this.citizenCheckoutConfigData['phrase_title'];
            },
            getDesktopDesc: function () {
                return this.citizenCheckoutConfigData['desktop_desc'];
            },
            getButtonText: function () {
                return (this.isDesktop())
                    ? this.citizenCheckoutConfigData['desktop_button_text']
                    : this.citizenCheckoutConfigData['mobile_button_text']
            }
        });
    }
)
;
