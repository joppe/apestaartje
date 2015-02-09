<?php
/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 */

namespace Aap\Bundle\AapSiteBundle\Controller;

use \Symfony\Bundle\FrameworkBundle\Controller\Controller;
use \Symfony\Component\HttpFoundation\Response;
use \Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use \Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

class PageController extends Controller
{
    /**
     * @Route("/{name}", defaults={"name" = "foo"})
     * @Template
     *
     * @param string $name
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function indexAction($name)
    {
        return array(
            'name' => $name
        );
    }
}
