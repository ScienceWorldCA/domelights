{extends "child1.tpl"} 
ignored
{block name='b3'}child2 3{/block}
ignored

{block name="hello"}grandchild template{/block}
{block name='b4' prepend} whole {/block}


{block name='b6'}child2{/block}
{* broke in Smarty 3.1.21
{block name='b7'} c2.7 {/block}
{block name='b8'} c2.8 {/block}
*}
{block name='b77'} c2.77 {/block}
{block name='b88'} c2.88 {/block}
{block name='b9'} c2.9 {/block}
{block name='b10'} c2.10 {/block}


{block b5}<{$smarty.block.parent}>{/block}
{block 'b5.2'}child2 5.2 {$smarty.block.parent}{/block}
{block 'b5.3'}override all{/block}


{block 'inblock'}c2.inblock{/block}

{block name='outblock'}	
=={$smarty.block.parent}==
{/block}
