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

namespace ZingyBits\CitizenFrontUi\Model\Ui;

use Magento\Checkout\Model\ConfigProviderInterface;

class ConfigProvider implements ConfigProviderInterface
{
    public const CODE = 'citizen';
    public const PROCESS_TRANSACTION_URL = '/citizen/redirect/process/';

    /**
     * Retrieve assoc array of checkout configuration
     *
     * @return array
     */
    public function getConfig(): array
    {
        return [
            'payment' => [
                self::CODE => [
                    'redirectToGatewayUrl' => self::PROCESS_TRANSACTION_URL
                ]
            ]
        ];
    }

    /**
     * Return redirect URL for method
     *
     * @return string
     */
    protected function getMethodRedirectUrl(): string
    {
        return self::PROCESS_TRANSACTION_URL;
    }
}
