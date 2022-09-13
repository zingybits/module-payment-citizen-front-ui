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

class GetData extends \Magento\Framework\App\Action\Action
{
    const LOGGER_PREFIX = 'citizen_payment_gateway::Payment/GetData - ';

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

    /**
     * @param Logger $logger
     * @param Context $context
     * @param CommandPoolInterface $commandPool
     * @param PaymentDataObjectFactory $paymentDataObjectFactory
     * @param ConfigInterface $config
     * @param LoadOrder $loadOrder
     * @param OrderPaymentRepositoryInterface $orderPaymentRepository
     * @param Header $httpHeader
     */
    public function __construct(
        Logger                          $logger,
        Context                         $context,
        CommandPoolInterface            $commandPool,
        PaymentDataObjectFactory        $paymentDataObjectFactory,
        ConfigInterface                 $config,
        LoadOrder                       $loadOrder,
        OrderPaymentRepositoryInterface $orderPaymentRepository,
        Header                          $httpHeader
    ) {
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

        if (!$this->order) {
            $order = $this->loadOrder->getOrder($request);
        }

        $payment = $order->getPayment();

        $buildSubject = [
            'order' => $order,
            'payment' => $this->paymentDataObjectFactory->create($payment),
        ];

        $response = $this->commandPool->get('initialize')->execute($buildSubject)['response'][0];

        $resultArr = json_decode($response,1 );
        if ($resultArr == null) {
            $transactionId = $response;
        } else {
            $this->logger->error(static::LOGGER_PREFIX .
                'Error code - ' . $resultArr['status'] . ', Error message - ' . $resultArr['message']);
        }

        if (isset($transactionId)) {
            $this->orderPaymentRepository->save($payment);

            $response = [
                'transactionId' => $transactionId,
                'publicApiKey' => $this->config->getPublicKey(),
                'isProd' => $this->config->isProduction(),
                'urlSdk' => $this->config->isProduction()
                    ? $this->config->getUrlProdSdk()
                    : $this->config->getUrlTestSdk()
            ];

        } else {
            $this->logger->error(static::LOGGER_PREFIX . 'Not having transactionId');
        }

        $resultJson = $this->resultFactory->create(ResultFactory::TYPE_JSON);
        $resultJson->setData($response);

        return $resultJson;
    }
}
