<?php

interface ColoreRequestHelper {
	public function __get( $requestVariable );
	public function __set( $requestVariable, $requestValue );
	public function __isset( $requestVariable );
	public function __unset( $requestVariable );
	public function getRequestArguments();
	public function getRequestArgument( $requestArgumentName );
	public function setRequestArgument( $requestArgument, $requestArgumentValue );
	public function getRequestProperties();
	public function getRequestProperty( $requestProperty );
	public function setRequestProperty( $requestProperty, $requestValue );
	public function getRenderProperties();
	public function getRenderProperty( $renderProperty );
	public function setRenderProperty( $renderProperty, $renderValue );
	public function getSessionProperties();
	public function getSessionProperty( $sessionProperty );
	public function setSessionProperty( $sessionProperty, $sessionValue );
	public function unsetSessionProperty( $sessionProperty );
	public function getContext();
	public function loadContext( $contextName );
	public function hasException();
	public function doException();
	public function getLogic();
	public function getNextLogic();
	public function appendLogic( array $logic );
	public function insertLogic( array $logic );
	public function getRenderEngine();
	public function setRenderEngine( $renderEngine );
	public function getRenderPath();
	public function setRenderPath( $renderPath );
}
