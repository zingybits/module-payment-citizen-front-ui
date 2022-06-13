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

declare(strict_types=1);

namespace ZingyBits\CitizenFrontUi\Controller\Callback;

use Magento\Checkout\Model\Session;
use Magento\Framework\App\Action\HttpGetActionInterface;
use Magento\Framework\App\CsrfAwareActionInterface;
use Magento\Framework\App\Request\Http;
use Magento\Framework\App\Request\InvalidRequestException;
use Magento\Framework\App\RequestInterface;
use Magento\Framework\Controller\ResultFactory;
use Magento\Framework\Controller\Result\RedirectFactory;
use Magento\Payment\Gateway\Command\CommandPoolInterface;
use Magento\Payment\Gateway\Data\PaymentDataObjectFactory;
use Magento\Sales\Model\Order;
use Magento\Sales\Model\OrderFactory;
use Magento\Quote\Model\MaskedQuoteIdToQuoteIdInterface;
use Magento\Quote\Model\QuoteRepository;
use Magento\Reports\Model\ResourceModel\Order\CollectionFactory;
use Psr\Log\LoggerInterface;
use ZingyBits\CitizenCore\Gateway\Config\Config as GatewayConfig;
use ZingyBits\CitizenCore\Model\Order\OrderStatus;
use ZingyBits\CitizenCore\Gateway\Config\Enum;
use ZingyBits\CitizenCore\Model\Config;

/**
 * Class Response
 * @package ZingyBits\CitizenDebug\Controller\Callback
 */
class Response implements HttpGetActionInterface, CsrfAwareActionInterface
{
    public const LOGGER_PREFIX = 'Citizen_FrontUi::Callback/Response - ';

    /**
     * @var LoggerInterface
     */
    private $logger;

    /**
     * @var Http
     */
    private $request;

    /**
     * @var MaskedQuoteIdToQuoteIdInterface
     */
    private $maskedQuoteIdToQuoteId;

    /**
     * @var QuoteRepository
     */
    private $quoteRepository;

    /**
     * @var OrderStatus
     */
    private $orderStatus;

    /**
     * @var Config
     */
    private $config;

    /**
     * @var ResultFactory
     */
    private $resultFactory;

    /**
     * @var PaymentDataObjectFactory
     */
    private $paymentDataObjectFactory;

    /**
     * @var CommandPoolInterface
     */
    private $commandPool;

    /**
     * @var CollectionFactory
     */
    private $paymentCollectionFactory;

    /**
     * @var Session
     */
    private $checkoutSession;


    public function __construct(
        LoggerInterface                 $logger,
        Http                            $request,
        MaskedQuoteIdToQuoteIdInterface $maskedQuoteIdToQuoteId,
        QuoteRepository                 $quoteRepository,
        OrderStatus                     $orderStatus,
        OrderFactory                    $orderFactory,
        Config                          $config,
        ResultFactory                   $resultFactory,
        PaymentDataObjectFactory        $paymentDataObjectFactory,
        CommandPoolInterface            $commandPool,
        CollectionFactory               $paymentCollectionFactory,
        Session                         $checkoutSession
    )
    {
        $this->logger = $logger;
        $this->request = $request;
        $this->maskedQuoteIdToQuoteId = $maskedQuoteIdToQuoteId;
        $this->quoteRepository = $quoteRepository;
        $this->orderStatus = $orderStatus;
        $this->orderFactory = $orderFactory;
        $this->config = $config;
        $this->resultFactory = $resultFactory;
        $this->paymentDataObjectFactory = $paymentDataObjectFactory;
        $this->commandPool = $commandPool;
        $this->paymentCollectionFactory = $paymentCollectionFactory;
        $this->checkoutSession = $checkoutSession;
    }

    public function execute()
    {
        // get data response
        $transactionId = $this->request->getParam('paymentId');

        if (!$transactionId) {
            $this->logger->error(static::LOGGER_PREFIX . 'Not have transactionId');
            return false;
        }

        $order = $this->getPaymentByTransId($transactionId);
        $payment = $order->getPayment();

        $buildSubject = [
            'order' => $order,
            'payment' => $this->paymentDataObjectFactory->create($payment),
        ];

        if ($payment->getCcTransId()) {
            $response = $this->commandPool->get('check')->execute($buildSubject);
        } else {
            $this->logger->error(self::LOGGER_PREFIX . 'not have status in response');
        }

        $response = ($response['response'][0])
            ? json_decode($response['response'][0], true)
            : null;

        if (!isset($response) || !isset($response[GatewayConfig::GATEWAY_RESPONSE_TRANSACTION_STATUS])) {
            $this->logger->error(static::LOGGER_PREFIX . 'Not have response');
        }

        $paymentStatus = $response[GatewayConfig::GATEWAY_RESPONSE_TRANSACTION_STATUS];
        $paymentStatusGateway = Enum::TERMINAL_STATUSES_MAPPING[$paymentStatus];
        $oldStatus = $order->getStatus();

        if ($paymentStatus != ENUM::TERMINAL_STATUSES_ERROR &&
            in_array($paymentStatus, Enum::TERMINAL_STATUSES)
        ) {
            if ($oldStatus != $paymentStatusGateway) {
                $this->orderStatus->changeStatus($order, $paymentStatus);
            }

            if (in_array($paymentStatus, Enum::TERMINAL_STATUSES_SUCCESS_PAGE)) {
                $redirectPageUrl = $this->config->getSuccessPage();
                $this->checkoutSession->setLastSuccessQuoteId($order->getQuoteId());
                $this->checkoutSession->setLastQuoteId($order->getQuoteId());
                $this->checkoutSession->setLastOrderId($order->getEntityId());
            } else {
                $redirectPageUrl = $this->config->getFailurePage();
            }

        } else {
            $this->logger->error(static::LOGGER_PREFIX . 'Incorrect status in response');
            $redirectPageUrl = 'noroute';
        }


        $resultRedirect = $this->resultFactory->create(ResultFactory::TYPE_REDIRECT);

        return $resultRedirect->setPath($redirectPageUrl);

    }

    public function getPaymentByTransId($transId)
    {
        $orders = $this->paymentCollectionFactory->create();

        $orders->getSelect()->joinLeft(
            ['sop' => 'sales_order_payment'],
            'sop.parent_id = main_table.entity_id',
            'method'
        )->where('cc_trans_id = ?', $transId);;
        return $orders->getLastItem();
    }

    public function createCsrfValidationException(RequestInterface $request): ?InvalidRequestException
    {
        return null;
    }

    public function validateForCsrf(RequestInterface $request): ?bool
    {
        return true;
    }
}

