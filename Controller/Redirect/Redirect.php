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
use Magento\Framework\Controller\Result\JsonFactory;
use Magento\Sales\Model\OrderFactory;
use Magento\Quote\Model\QuoteFactory;
use Magento\Quote\Model\MaskedQuoteIdToQuoteIdInterface;
use Psr\Log\LoggerInterface as Logger;
use ZingyBits\CitizenCore\Model\Order\LoadOrder;
use ZingyBits\CitizenCore\Model\Order\OrderStatus;

class Redirect extends \Magento\Framework\App\Action\Action
{
    public const LOGGER_PREFIX = 'citizen_payment_gateway::Redirect/Redirect - ';

    public const ORDER_INCREMENT_ID_PARAM = 'orderId';
    public const QUOTE_ID_PARAM = 'qid';

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

    /**
     * @param Logger $logger
     * @param Context $context
     * @param OrderFactory $orderFactory
     * @param QuoteFactory $quoteFactory
     * @param MaskedQuoteIdToQuoteIdInterface $maskToQuoteId
     * @param LoadOrder $loadOrder
     * @param OrderStatus $orderStatus
     * @param JsonFactory $jsonResultFactory
     */
    public function __construct(
        Logger                          $logger,
        Context                         $context,
        OrderFactory                    $orderFactory,
        QuoteFactory                    $quoteFactory,
        MaskedQuoteIdToQuoteIdInterface $maskToQuoteId,
        LoadOrder                       $loadOrder,
        OrderStatus                     $orderStatus,
        JsonFactory                     $jsonResultFactory
    ) {
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

        $request = $this->getRequest();
        $order = $this->loadOrder->getOrder($request);

        $redirectPageUrl = $this->orderStatus->getRedirectPageUrl($order);
        $resultData['redirectUrl'] = $redirectPageUrl;

        if (! $redirectPageUrl) {
            $this->logger->error(static::LOGGER_PREFIX . 'redirect page url is null');
        }

        $result = $this->jsonResultFactory->create();
        $result->setData($resultData);

        return $result;
    }
}
