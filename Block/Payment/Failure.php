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

/**
 * Class Failure
 * @package ZingyBits\CitizenFrontUi\Block\Payment
 */
class Failure extends \Magento\Framework\View\Element\Template
{
    /**
     * Return QS params
     * @return array
     */
    public function showParams(): array
    {
        $params = $this->getRequest()->getParams();

        return $params ?? [];
    }
}
