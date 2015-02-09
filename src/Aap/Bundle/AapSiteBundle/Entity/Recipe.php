<?php
/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 */

namespace Aap\Bundle\AapSiteBundle\Entity;

use \Doctrine\ORM\Mapping as ORM;

/**
 * Class Recipe
 *
 * @package Aap\Bundle\AapSiteBundle\Entity
 *
 * @ORM\Entity
 * @ORM\ChangeTrackingPolicy("DEFERRED_EXPLICIT")
 * @ORM\Table(name="recipe")
 */
class Recipe
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="title", type="string", length=255)
     */
    private $title;

    /**
     * @var string
     *
     * @ORM\Column(name="preparation", type="text")
     */
    private $preparation;
}