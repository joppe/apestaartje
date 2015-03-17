<?php
/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 */

namespace Aap\Bundle\AapSiteBundle\Controller;

use \Symfony\Bundle\FrameworkBundle\Controller\Controller;
use \Symfony\Component\HttpFoundation\JsonResponse;
use \Symfony\Component\HttpFoundation\Response;
use \Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use \Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

/**
 * Class PageController
 *
 * @package Aap\Bundle\AapSiteBundle\Controller
 */
class PageController extends Controller
{
    /**
     * @Route("/")
     * @Template
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function indexAction()
    {
        return array();
    }

    /**
     * @Route("/crud")
     *
     * @return JsonResponse
     */
    public function crudAction()
    {
        return new JsonResponse(array('foo' => 'bar'));
    }
}