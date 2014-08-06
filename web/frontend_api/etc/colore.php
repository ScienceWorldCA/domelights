<?php

/**
 * Create the general colore config array.
 */
$config['colore'] = array();

/**
 * Create the defaults array.
 */
$config['colore']['defaults'] = array();

/**
 * Specify default contexts.
 */
$config['colore']['defaults']['contexts'] = array(
	'default' => 'default',
	'error' => 'error',
);

/**
 * Set default render properties.
 */ 
$config['colore']['defaults']['render'] = array();
$config['colore']['defaults']['render']['properties'] = array();

/**
 * Set helpers.
 */
$config['colore']['helpers'] = array(
	'context' => 'ColorePHPContextHelper',
// 	'context' => 'ColoreJSONContextHelper',
	'request' => 'ColoreApachePHPRequestHelper',
);

?>