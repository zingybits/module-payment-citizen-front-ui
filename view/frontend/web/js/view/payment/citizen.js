/*browser:true*/
/*global define*/
define(
    [
        'uiComponent',
        'Magento_Checkout/js/model/payment/renderer-list'
    ],
    function (Component, rendererList)
    {
        'use strict';
        rendererList.push(
            {
                type: 'citizen',
                component: 'ZingyBits_CitizenFrontUi/js/view/payment/method-renderer/citizen-method'
            }
        );
        return Component.extend({});
    }
);
