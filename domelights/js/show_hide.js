$(document).ready(function() { 

  // bind a click handler to the buttons 
  $('#cat1, #cat2, #cat3, #cat4, #cat5, #cat6, #cat7, #cat8, #cat9').click(function(e) { 

    // find the region the button controls 
    var $region = $('#' + $(this).attr('aria-controls')); 
     
    // toggle the region 
    $region.slideToggle(100, function() { 

      if ($region.attr('aria-expanded') == 'false') { // region is collapsed 

        // update the aria-expanded attribute of the region 
        $region.attr('aria-expanded', 'true'); 

        // move focus to the region 
        $region.focus(); 

        // update the button label 
        $(this).find('span').html('Hide'); 

      } 
      else { // region is expanded 

        // update the aria-expanded attribute of the region 
        $region.attr('aria-expanded', 'false'); 

        // update the button label 
        $(this).find('span').html('Show'); 
      } 
    }); 

    e.stopPropagation(); 
    return false; 
  }); 
   
}); // end ready() 