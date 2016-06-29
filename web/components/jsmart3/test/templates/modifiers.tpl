{"foo"|upper}
{"it\"s O\"K for double quotes"|upper}
{'foo'|upper}
{'it\'s O\'K for single quotes'|upper}
{$foo|upper}
{$ob.prop2.txt|upper}
{$ob['prop2']['txt']|upper}

{strayFunc($foo|upper,'THIS SHOULD BE IN \'LOWER\' CASE'|lower)} -

{strayFunc("this should be in \"upper\" case"|upper,$foo|lower)} -

{$onlyNumbers=123456789}
{$onlyNumbers|upper}
	
Long text contains [{$long_text|count_paragraphs}] paragraphs
{$onlyNumbers} has {$onlyNumbers|count_paragraphs} paragraphs

Long text contains [{$long_text|count_sentences}] sentences
{$onlyNumbers} has {$onlyNumbers|count_sentences} sentences

single word has {'one'|count_words} words
Long text words [{$long_text|count_words}] words
{$onlyNumbers} has [{$onlyNumbers|count_words}] words

Long text words [{$long_text|count_characters}] characters
{$onlyNumbers} has [{$onlyNumbers|count_characters}] characters

Long text words [{$long_text|count_characters:true}] characters with whitespaces

Long text with line breaks converted to BRs [{$long_text|nl2br}]

{$onlyNumbers|nl2br} {'123456789'|nl2br}

{"should remain lower"|upper|lower}

{"MUST REMAIN UPPER"|upper|lower|upper|lower|upper}
{$onlyNumbers|lower}

[{'spacifyme'|spacify}]
[{'spacifyme'|spacify:"^^"}]
[{'spacifyme with underscores'|spacify:"_"|upper}]

{"next x-men film, x3, delayed last7"|capitalize}
{"next x-men film, x3, delayed last7"|capitalize:true}

{"1st num8er 3x 3zz 3numbers1n1word"|capitalize:true}	{*"3numbers1n1word"|capitalize  - Smarty renders this capitalized, bug?*}

{strayFunc($long_text|capitalize:false|spacify:"_",'word with num8ers so! try@ ot#er s%mbols aa^bb cc&dd eee*f (parentheses)'|capitalize:false)} -
{strayFunc($long_text|capitalize:false|spacify:"_",'word with num8ers so! try@ ot#er s%mbols aa^bb cc&dd eee*f (parentheses)'|capitalize:true)} -

{$onlyNumbers|spacify:'|'}

{$onlyNumbers|capitalize}

{$foo|cat:' yesterday.'|cat:"add another"|cat}
{$onlyNumbers|cat:'-digits'|cat:'777'} {7|cat:'- is a lucky number'} {'123'|cat:456}

{$foo|default:'no value'}
{$nullVar|default:'this variable is null'}
{$sEmpty|default:'empty string'}
{'abc'|default:'def'}
{"abc"|default:"def"}
{$noSuchVal|default:'no such value'}
{$ob.prop7|default:'no such property'}
{$onlyNumbers|default:'no'}

{$long_text|indent:4:'-'}
{$foo|indent:2:'-'}
{$onlyNumbers|indent:2:'-'}

{$foo|regex_replace:'/b/':'z'}
{'Abcdef abcdefabcAbc'|regex_replace:'/abc/i':'ZZZ'}
{$long_text|regex_replace:'/\\s/':'_'}
{$ob.prop2.num|regex_replace:'/\\d/':'X'}

{$foo|replace:'b':'z'}
{$long_text|replace:'sentence':'short sentence'}
{$t = 'abc|def:ghi'}
{$t|replace:'abc|d':'abc:d'}
{'abcd\'|abcd'|replace:'d':'x'}
{'$fake|replace:f:c'}
{'aaaaaa'|replace:'a':'z'}

{$long_text|strip}
{$long_text|strip:'-'}

{'Woman Gets <font face="helvetica">New Kidney</font> from Dad she Hasn\'t Seen in <b>years</b>.'|strip_tags}
{'Woman Gets <font face="helvetica">New Kidney</font> from Dad she Hasn\'t Seen in <b>years</b>.'|strip_tags:false}

{$long_text|truncate:10:"---":true}
{'Two Sisters Reunite after Eighteen Years at Checkout Counter.'|truncate:30}
{'Two Sisters Reunite after Eighteen Years at Checkout Counter.'|truncate:30:""}
{'Two Sisters Reunite after Eighteen Years at Checkout Counter.'|truncate:30:"":true}
{'Two Sisters Reunite after Eighteen Years at Checkout Counter.'|truncate:30:"---":true}
{'Two Sisters Reunite after Eighteen Years at Checkout Counter.'|truncate:30:"..":true:true}
{'Two Sisters Reunite after Eighteen Years at Checkout Counter.'|truncate:30:".":true:true}
{$long_text|truncate:14:"...":true:true}
{'aaaa'|truncate:3:".....":true}
{$long_text|truncate:10}
{$onlyNumbers|truncate:3}

{'Two Sisters Reunite after Eighteen Years at Checkout Counter.'|wordwrap:10:"|\n"}
{$long_text|wordwrap:20}
-
{$verylongtxt = 'Smarty is a template engine for PHP. More specifically, it facilitates a manageable way to separate application logic and content from its presentation. This is best described in a situation where the application programmer and the template designer play different roles, or in most cases are not the same person.'}
{$verylongtxt|wordwrap:40:'ZZZ'}

{$verylongtxt|wordwrap:40:"\n"}

{$verylongtxt|wordwrap:40:"\n":true}

{$vlword = 'A very long woooooooooooord.'}
[{$vlword|wordwrap:8:"\n":false}]
[{$vlword|wordwrap:8:"\n":true}]
{$onlyNumbers|wordwrap}

{strayFunc('b','ar')|replace:'b,ar':'bar'|replace:'bar':'zar'}
{strayNoArgs()|replace:'bar':'zar'}
{strayNoArgs()|replace:strayNoArgs():'zar'}


{'&"\'<>'|escape}
{'<b>"te&xt"</b>'|escape:html:''}
{'<b>"double&encode"</b>'|escape:html:'':true}
{"<b>'no double&encode'</b>"|escape:html:'':0}



{$verylongtxt|count}
{$arr = ['a','b','c']}
{$arr|count}
{$pers = ['name'=>['first'=>'John','last'=>'Doe'],'age'=>36]}
{$pers|count}
{$pers|count:1}