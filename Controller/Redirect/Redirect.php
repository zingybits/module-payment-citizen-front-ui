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

namespace ZingyBits\CitizenFrontUi\Controller\Redirect;

use Magento\Framework\App\Action\Context;
use Magento\Framework\Controller\ResultFactory;
use Magento\Sales\Model\OrderFactory;
use Psr\Log\LoggerInterface as Logger;
use Magento\Quote\Model\QuoteFactory;
use Magento\Quote\Model\MaskedQuoteIdToQuoteIdInterface;
use ZingyBits\CitizenCore\Model\Order\LoadOrder;
use ZingyBits\CitizenCore\Model\Order\OrderStatus;
use Magento\Framework\Controller\Result\JsonFactory;


class Redirect extends \Magento\Framework\App\Action\Action
{
    const LOGGER_PREFIX = 'citizen_payment_gateway::Redirect/Redirect - ';

    const ORDER_INCREMENT_ID_PARAM = 'orderId';
    const QUOTE_ID_PARAM = 'qid';

    /**
     * @var Logger
     */
    private $logger;

    /**
     * @var OrderFactory
     */
    private $orderFactory;

    /**
     * @var QuoteFactory
     */
    private $quoteFactory;

    /**
     * @var MaskedQuoteIdToQuoteIdInterface
     */
    private $maskToQuoteId;

    /**
     * @var LoadOrder
     */
    private $loadOrder;

    /**
     * @var OrderStatus
     */
    private $orderStatus;

    /**
     * @var JsonFactory
     */
    private $jsonResultFactory;


    public function __construct(
        Logger                          $logger,
        Context                         $context,
        OrderFactory                    $orderFactory,
        QuoteFactory                    $quoteFactory,
        MaskedQuoteIdToQuoteIdInterface $maskToQuoteId,
        LoadOrder                       $loadOrder,
        OrderStatus                     $orderStatus,
        JsonFactory                     $jsonResultFactory
    )
    {
        $this->logger = $logger;
        $this->orderFactory = $orderFactory;
        $this->quoteFactory = $quoteFactory;
        $this->maskToQuoteId = $maskToQuoteId;
        $this->loadOrder = $loadOrder;
        $this->orderStatus = $orderStatus;
        $this->jsonResultFactory = $jsonResultFactory;
        parent::__construct($context);
    }

    /**
     * @inheritdoc
     */
    public function execute()
    {
        $resultData = [
            'redirectUrl' => null
        ];

        // /citizen/redirect/redirect/qid/pImbAulWZyVbghf7lfP2NCap0N2kZib9
        $request = $this->getRequest();
        $order = $this->loadOrder->getOrder($request);

        $redirectPageUrl = $this->orderStatus->getRedirectPageUrl($order);
        $resultData['redirectUrl'] = $redirectPageUrl;

        if (!$redirectPageUrl) {
            $this->logger->error(static::LOGGER_PREFIX . 'redirect page url null');
        }


        $result = $this->jsonResultFactory->create();
        $result->setData($resultData);
        return $result;
    }

}
