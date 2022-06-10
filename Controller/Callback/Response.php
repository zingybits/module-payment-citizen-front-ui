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
use Magento\Sales\Model\OrderFactory;
use Magento\Quote\Model\MaskedQuoteIdToQuoteIdInterface;
use Magento\Quote\Model\QuoteRepository;
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

    public function __construct(
        LoggerInterface                 $logger,
        Http                            $request,
        MaskedQuoteIdToQuoteIdInterface $maskedQuoteIdToQuoteId,
        QuoteRepository                 $quoteRepository,
        OrderStatus                     $orderStatus,
        OrderFactory                    $orderFactory,
        Config                          $config,
        ResultFactory                   $resultFactory
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
    }

    public function execute()
    {
        // get data response
        $response = $this->request->getPostValue();
        if (isset($response) && isset($response['data'])) {
            $data = $response['data'];
        } else {
            $this->logger->error(static::LOGGER_PREFIX . 'Not have response');
        }

        // todo hash param change
        if (!$hash = $this->request->getParam(GatewayConfig::INTERNAL_QUOTE_MASK_ID_CODE)) {
            $this->logger->error(static::LOGGER_PREFIX . 'No parameter hash');
        }

        $quoteId = $this->maskedQuoteIdToQuoteId->execute($hash);
        $quote = $this->quoteRepository->get($quoteId);

        if ($quote->getId() && $quote->getReservedOrderId()) {
            $orderIncrementId = $quote->getReservedOrderId();
            $order = $this->orderFactory->create()->loadByIncrementId($orderIncrementId);
        } else {
            $this->logger->error(self::LOGGER_PREFIX . 'unable to load quote or get its order id', ['quote ID' => $quoteId]);
        }

//        $paymentStatus = $data[Config::GATEWAY_RESPONSE_PAYMENT_STATUS];

        // todo - test statuses, delete when done
//        $paymentStatus = 'PENDING_USER_AUTHORISATION';
        $paymentStatus = 'ACCEPTED';
//        $paymentStatus = 'PAYMENT_CANCELLED';
//        $paymentStatus = 'REJECTED_BY_ASPSP';
//        $paymentStatus = 'FAILED';

        if (in_array($paymentStatus, Enum::TERMINAL_STATUSES)) {
            $isChangedStatus = $this->orderStatus->changeStatus($order, $paymentStatus);
            $redirectPageUrl = (in_array($paymentStatus, Enum::TERMINAL_STATUSES_SUCCESS_PAGE))
                ? $this->config->getSuccessPage()
                : $this->config->getFailurePage();
        } else {
            $this->logger->error(static::LOGGER_PREFIX . 'Incorrect status in response');
            $redirectPageUrl = 'noroute';
        }



        $resultRedirect = $this->resultFactory->create(ResultFactory::TYPE_REDIRECT);
        $resultRedirect->setPath($redirectPageUrl);
        return $resultRedirect;

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

