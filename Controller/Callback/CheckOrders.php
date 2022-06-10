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


use Magento\Framework\App\Action\HttpGetActionInterface;
use Magento\Framework\App\CsrfAwareActionInterface;
use Magento\Framework\App\Request\Http;
use Magento\Framework\App\Request\InvalidRequestException;
use Magento\Framework\App\RequestInterface;
use Magento\Framework\Controller\ResultFactory;
use Magento\Payment\Gateway\Command\CommandPoolInterface;
use Magento\Payment\Gateway\Data\PaymentDataObjectFactory;
use Magento\Reports\Model\ResourceModel\Order\CollectionFactory;
use Magento\Sales\Model\Order;
use Magento\Sales\Model\OrderFactory;
use Magento\Quote\Model\MaskedQuoteIdToQuoteIdInterface;
use Magento\Quote\Model\QuoteRepository;
use Magento\Framework\Api\SearchCriteriaBuilderFactory;
use Magento\Sales\Api\OrderRepositoryInterface;
use Magento\Framework\Controller\Result\RawFactory;
use Psr\Log\LoggerInterface;
use ZingyBits\CitizenCore\Gateway\Config\Config as GatewayConfig;
use ZingyBits\CitizenCore\Model\Order\OrderStatus;
use ZingyBits\CitizenCore\Gateway\Config\Enum;
use ZingyBits\CitizenCore\Model\Config;
use ZingyBits\CitizenCore\Gateway\Config\Enum\Response\PaymentStatus;


/**
 * Class Response
 * @package ZingyBits\CitizenDebug\Controller\Callback
 */
class CheckOrders implements HttpGetActionInterface, CsrfAwareActionInterface
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
     * @var SearchCriteriaBuilderFactory
     */
    private $searchCriteriaBuilderFactory;

    /**
     * @var CommandPoolInterface
     */
    private $commandPool;

    /**
     * @var PaymentDataObjectFactory
     */
    private $paymentDataObjectFactory;

    /**
     * @var RawFactory
     */
    private RawFactory $resultRawFactory;


    public function __construct(
        LoggerInterface                 $logger,
        Http                            $request,
        MaskedQuoteIdToQuoteIdInterface $maskedQuoteIdToQuoteId,
        QuoteRepository                 $quoteRepository,
        OrderRepositoryInterface        $orderRepository,
        OrderStatus                     $orderStatus,
        OrderFactory                    $orderFactory,
        Config                          $config,
        ResultFactory                   $resultFactory,
        SearchCriteriaBuilderFactory    $searchCriteriaBuilderFactory,
        CollectionFactory               $orderCollectionFactory,
        CommandPoolInterface            $commandPool,
        PaymentDataObjectFactory        $paymentDataObjectFactory,
        RawFactory                      $resultRawFactory
    )
    {
        $this->logger = $logger;
        $this->request = $request;
        $this->maskedQuoteIdToQuoteId = $maskedQuoteIdToQuoteId;
        $this->quoteRepository = $quoteRepository;
        $this->orderRepository = $orderRepository;
        $this->orderStatus = $orderStatus;
        $this->orderFactory = $orderFactory;
        $this->config = $config;
        $this->resultFactory = $resultFactory;
        $this->searchCriteriaBuilderFactory = $searchCriteriaBuilderFactory;
        $this->orderCollectionFactory = $orderCollectionFactory;
        $this->commandPool = $commandPool;
        $this->paymentDataObjectFactory = $paymentDataObjectFactory;
        $this->resultRawFactory = $resultRawFactory;
    }

    public function execute()
    {

        $paymentMethod = 'citizen';
        $orderList = $this->getOrderCollectionPaymentMethod($paymentMethod);

        $orderListItems = $orderList->getItems();

        // debug
        $count = 0;
        $statusesChanged = [];

        foreach ($orderListItems as $order) {

            $payment = $order->getPayment();

            $buildSubject = [
                'order' => $order,
                'payment' => $this->paymentDataObjectFactory->create($payment),
            ];

            if ($payment->getCcTransId()) {
                $response = $this->commandPool->get('check')->execute($buildSubject);
            } else {
                continue;
            }
            $response = json_decode($response['response'][0], true);
            if (!isset($response) || !isset($response[GatewayConfig::GATEWAY_RESPONSE_TRANSACTION_STATUS])) {
                $this->logger->error(static::LOGGER_PREFIX . 'Not have response');
                continue;
            }

            $paymentStatus = $response[GatewayConfig::GATEWAY_RESPONSE_TRANSACTION_STATUS];
            $paymentStatusGateway = Enum::TERMINAL_STATUSES_MAPPING[$paymentStatus];
            $oldStatus = $order->getStatus();


            if (
                $paymentStatus != ENUM::TERMINAL_STATUSES_ERROR &&
                in_array($paymentStatus, Enum::TERMINAL_STATUSES) &&
                $oldStatus != $paymentStatusGateway
            ) {
                if ($this->orderStatus->changeStatus($order, $paymentStatus)) {
                    $count++;
                    $statusesChanged[] = [$oldStatus => $paymentStatusGateway];
                }

            } else {
                $this->logger->error(static::LOGGER_PREFIX . 'Incorrect status in response');
            }

        }

        $result = $this->resultRawFactory->create();

        if ($count != 0) {
            $result->setContents("Order statuses changed - {$count} " . json_encode($statusesChanged));
        } else {
            $result->setContents('<p>Order statuses not changed</p>');
        }

        return $result;

    }

    public function getOrderCollectionPaymentMethod($paymentMethod)
    {
        $orders = $this->orderCollectionFactory->create();
        $orders->addFieldToFilter(
            'state', [Order::STATE_NEW, Order::STATE_PROCESSING]
        );
        $orders->getSelect()->joinLeft(
            ['sop' => 'sales_order_payment'],
            'sop.parent_id = main_table.entity_id',
            'method'
        )->where('method = ?', $paymentMethod);;
        return $orders;
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

