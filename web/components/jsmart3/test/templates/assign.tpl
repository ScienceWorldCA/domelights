{assign var='str'  value='test12345'}
{$str}

{assign var='num'  value=777}
{$num}

{assign var='zzz'  			value='abc'}
{$zzz}

{assign 	
	value   =   'd=ef'
	var	=	'zzz'}
{$zzz}

{assign var='zzz'  			value='it\'s OK'}
{$zzz}

{assign    var	=	'zzz' value	=	"abc\"def\tghi"}
{$zzz}

{assign var=zzz value=not_in_quotes}
{$zzz}

{assign var=zzz value=$foo|replace:'bar':'abc'|upper}
{$zzz}

{assign var=zzz value=$foo|replace:'bar':'abc'|upper}
{$zzz}

{assign var=$ob['prop1'] value="test PROP"}
{$prop1}	//$prop1 == 'test PROP' 
{$ob['prop1']}

{assign var="abc{for $ccc=1 to 3}{$ccc}{/for}" value="generate name of var!"}
{$abc123}

{assign var=$foo  value='new_value_of_foo'}
[{$foo}][{$bar}]

{ assign var='num'  value=888 }
  {    assign var='num'  value=999}
  
{
assign var='num'  value=999 
}

{	assign var='num'  value=1		}


{assign var='num'  value="111"}


{$num}

{assign var="test_with_code" value=$foo}
{$test_with_code}

{assign var="test_with_code" value="$foo"}
{$test_with_code}

{assign var="test_with_code" value='$foo'}
{$test_with_code}


{assign var="test_with_code" value="{if $foo}aaa{else}zzzz{/if}"}
{$test_with_code}


{assign var="test_with_code" value="{for $z=1 to 5}[{$z}]{/for}"}
{$test_with_code}


{assign var="test_with_code" value="| {$ob.prop2.txt} + [{$foo}]"}
{$test_with_code}


{assign var="test_with_code" value="{foreach $o as $k => $v}[{$k}]({$v}) {/foreach}"}
{$test_with_code}

{assign var="testOb" value=$ob}
[{$testOb.prop1}]

{assign var="testOb" value="$ob"}
{*[{$testOb.prop1}]*}    {* TODO *}

{assign var="testOb" value='$ob'}
[{$testOb}]

{assign var='foo' value='test'}
{$foo}

{assign var=x value='\''|replace:"'":'"'}
{$x}

{assign var="y" value=$foo|default:"no value" scope=global   nocache}
{$y}

{$x = {isEmptyStr s='abc'}}
{$x}

{assign x {isEmptyStr s='abc'}}
{$x}

{assign 'cnt' $foo|replace:"bar":"bbbar"|count_characters  scope=global  nocache}  {*short-hand*}
{$cnt}

{assign var=zzz value=[1,[8,['a',$foo]],3]}
{$zzz[1][1][1]}

{assign var=yyy value="|`$num + 3`|"}
{"`$yyy`"}