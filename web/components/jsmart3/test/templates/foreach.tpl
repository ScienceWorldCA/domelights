{foreach $o as $k => $v}
	[{$v@index}] {$k}:{$v}
{/foreach}
------------------------------------------
{foreach $o as $v}
	[{$v@index}] {$v@key}:{$v}
{/foreach}
------------------------------------------
{foreach		
	$o		as		$k		=>		$v}
	[{$v@index}] {$k}:{$v}
{/foreach}
------------------------------------------
{$v@index}
{$k}
{$v}
------------------------------------------
{foreach $a as $vvv}
	|{$vvv}|
{/foreach}
------------------------------------------
{foreach $a as $vvv}
	{$vvv@key}:|{$vvv}|
{/foreach}
------------------------------------------
{foreach $a as $i}{$i}{foreachelse}
error
{/foreach}

{foreach $aEmpty as $k => $v}
	error
{foreachelse}
	no array
{/foreach}

{foreach $aEmpty as $k => $v}error{foreachelse}no array{/foreach}

{foreach $ob as $k => $v}
	{if $v@index eq 1}   {* this is object *}
		{if $v.bool_true}
			[{$v.txt}]
		{/if}
	{/if}
	
	{if $v@iteration == 2}
		{foreach $v as $vv}
			{$vv}
		{/foreach}
	{/if}
	
	{if $v@first}
		this is first
	{/if}
	
	{if $v@last}
		this is last
	{/if}
	
{/foreach}

{if $v@show}
	foreach was shown
{/if}


index:[{$v@index}]
iteration:[{$v@iteration}]
total:[{$v@total}]


{foreach $a as $k => $v}
	{$k+1}: {$v}
{/foreach}

this is just@total text@index


{assign var="idx" value=$v@total}

idx:[{$idx}]

============================================
{foreach from=$a key=mykey item=myitem}
	[{$mykey}]:[{$myitem}]
{/foreach}
============================================

{foreach from=$o item=myitem}
	[{$myitem}]
{/foreach}


{foreach from=$a key='mykey' item='myitem'}
	[{$mykey}]:[{$myitem}]
{/foreach}

{foreach from=$a item="myiiii" name='smarty2'}
	{$smarty.foreach.smarty2.index}|{$smarty.foreach.smarty2.iteration}|{$smarty.foreach.smarty2.first}|{$smarty.foreach.smarty2.last} [{$myiiii}]
{/foreach}

[{$smarty.foreach.smarty2.show}] [{$smarty.foreach.smarty2.total}]

______________________________ not array ________________________

{foreach from=$num item='myitem'}
	[{$myitem}]
{/foreach}

{foreach $num as $k => $v}
	[{$v@index}] {$k}:{$v}
{/foreach}

{foreach from=$num key='k' item='myitem'}
	[{$k}: {$myitem}]
{/foreach}

{foreach from=777 item='myitem'}
	[{$myitem}]
{/foreach}

{foreach from='abcdef' item='myitem'}
	[{$myitem}]
{/foreach}

{foreach from=ghijkl item='myitem'}
	[{$myitem}]
{/foreach}

{$Question = ['Answers' => ['one','two']]}
{foreach from=$Question.Answers key="aid" item="answer" name="Loop"}{$aid}: {$answer}{/foreach}

---------------------
{$colors = ['black'=>'#000', 'blue'=>'#00F', 'green'=>'#0F0', 'red'=>'#F00', 'white'=>'#FFF']}
{foreach $colors as $color_name=>$color_code}
	{if $color_name == "red"}
		{continue}
	{/if}
	<span style="color:{$color_code}">[{$color_code@index}][{$color_code@iteration}][{$color_code@first}][{$color_code@last}][{$color_code@total}] {$color_name}</span>
{/foreach}
[{$color_code@show}] [{$color_code@total}]
---------------------
{foreach $colors as $color_name=>$color_code}
	{if $color_name == "red"}
		{break}
	{/if}
	<span style="color:{$color_code}">[{$color_code@index}][{$color_code@iteration}][{$color_code@first}][{$color_code@last}][{$color_code@total}] {$color_name}</span>
{/foreach}
[{$color_code@show}] [{$color_code@total}]
---------------------

{$numbers = ['1', '2', '3', '4', '5']}
{foreach $numbers as $num}
	-----
	{if $num == "2"}
		{continue}
	{/if}
	{if $num == "4"}
		{break}
	{/if}
	[{$num@index}][{$num@iteration}][{$num@first}][{$num@last}][{$num@total}] {$num}
{/foreach}
[{$num@show}] [{$num@total}]