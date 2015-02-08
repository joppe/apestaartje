<?php
/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 */

namespace Aap\Bundle\AapSiteBundle\Controller;

use \Symfony\Bundle\FrameworkBundle\Controller\Controller;
use \Symfony\Component\HttpFoundation\Response;
use \Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

class PageController extends Controller
{
    /**
     * @Route("/hello/{name}", name="hello")
     *
     * @param string $name
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function indexAction($name)
    {
        return new Response('index ' . $name);
    }
}
