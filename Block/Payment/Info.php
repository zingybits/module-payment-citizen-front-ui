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

namespace ZingyBits\CitizenFrontUi\Block\Payment;

use Magento\Framework\View\Element\Template;
use Magento\Framework\View\Element\Template\Context;
use ZingyBits\CitizenCore\Model\Config;

class Info extends Template
{
    /**
     * @param Context $context
     * @param Config $config
     * @param array $data
     */
    public function __construct(
        Context $context,
        Config $config,
        array $data = []
    ) {
        parent::__construct($context, $data);
        $this->config = $config;
    }

    /**
     * Return data for js
     *
     * @return array
     */
    public function getCheckoutInfo(): array
    {
        $data = [
            'title' => $this->config->getCheckoutTitle(),
            'phrase_title' => $this->config->getCheckoutPhraseTitle(),
            'desktop_desc' => $this->config->getCheckoutDesktopDesc(),
            'desktop_button_text' => $this->config->getCheckoutDesktopButtonText(),
            'mobile_button_text' => $this->config->getCheckoutMobileButtonText(),
            'public_api_key' => $this->config->getPublicKey(),
        ];

        return $data;
    }

    /**
     * Return config value
     *
     * @return string
     */
    public function isProduction(): string
    {
        return $this->config->isProduction();
    }
}
