<?php

/**
 * Citizen payment gateway by ZingyBits - Magento 2 extension
 *
 * NOTICE OF LICENSE
 *
 * Unauthorized copying of this file, via any medium, is strictly prohibited
 * Proprietary and confidential
 *
 * @category ZingyBits
 * @package ZingyBits_CitizenFrontUi
 * @copyright Copyright (c) 2022 ZingyBits s.r.o.
 * @license http://www.zingybits.com/business-license
 * @author ZingyBits s.r.o. <support@zingybits.com>
 */

namespace ZingyBits\CitizenFrontUi\Controller\Payment;

use Exception;
use Magento\Framework\App\Action\Context;
use Magento\Payment\Gateway\Command\CommandPoolInterface;
use Magento\Payment\Gateway\Data\PaymentDataObjectFactory;
use Magento\Sales\Api\Data\OrderInterface;
use Psr\Log\LoggerInterface as Logger;
use Magento\Framework\Controller\ResultFactory;
use ZingyBits\CitizenCore\Api\ConfigInterface;
use ZingyBits\CitizenCore\Model\Order\LoadOrder;
use Magento\Sales\Api\OrderPaymentRepositoryInterface;
use Magento\Framework\HTTP\Header;


class Process extends \Magento\Framework\App\Action\Action
{

    const LOGGER_PREFIX = 'citizen_payment_gateway::Payment/Process - ';

    /**
     * @var Logger
     */
    private $logger;

    /**
     * @var CommandPoolInterface
     */
    private $commandPool;

    /**
     * @var OrderInterface
     */
    protected $order;

    /**
     * @var PaymentDataObjectFactory
     */
    private $paymentDataObjectFactory;

    /**
     * @var ConfigInterface
     */
    private $config;

    /**
     * @var Header
     */
    private $httpHeader;


    public function __construct(
        Logger                          $logger,
        Context                         $context,
        CommandPoolInterface            $commandPool,
        PaymentDataObjectFactory        $paymentDataObjectFactory,
        ConfigInterface                 $config,
        LoadOrder                       $loadOrder,
        OrderPaymentRepositoryInterface $orderPaymentRepository,
        Header                          $httpHeader
    )
    {
        $this->logger = $logger;
        $this->commandPool = $commandPool;
        $this->paymentDataObjectFactory = $paymentDataObjectFactory;
        $this->config = $config;
        $this->loadOrder = $loadOrder;
        $this->orderPaymentRepository = $orderPaymentRepository;
        $this->httpHeader = $httpHeader;
        parent::__construct($context);
    }

    /**
     * @inheritdoc
     */
    public function execute()
    {
        $request = $this->getRequest();

        $transactionId = $request->getParam('transaction_id');
        $publicApiKey = $this->config->getPublicKey();

        if (!$transactionId) {
            echo "Not have require param";
            return;
        }

        $content = <<<XYZ
            <!doctype html>
            <html lang="en">
            <body>

            <script>

                let citizenTransactionId = "$transactionId";
                let publicApiKey = "$publicApiKey";

                window.citizenAsyncInit = function () {
                    CITIZEN_PAYIN.init({
                        publicApiKey: publicApiKey
                    })
                };

                // DIRECT journey
                let sendDirectPayIn = function (citizenTransactionId) {
                    window.CITIZEN_PAYIN.startPayInJourney(citizenTransactionId);
                }

                // Email journey
                let options = {
                    initiatedCallback: function(){
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



            </script>
            <script src="http://test-sdk.paywithcitizen.com/v5/sdk/sdk-payin.js"></script>
            <script>
            setTimeout(function() {
                window.citizenAsyncInit();

                if(window.screen.availWidth > 768 ) {
                    sendQRCodePayIn(citizenTransactionId);
                } else {
                    sendDirectPayIn(citizenTransactionId);
                }
                //        sendEmailPayIn(citizenTransactionId, options);
                }, 700);
            </script>
            </body>
            </html>

        XYZ;

        echo $content;

    }


}
