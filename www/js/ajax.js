
function getPhoneGapTest(){
	$.ajax({
		url:"http://km.logicaladvantage.com/phonegaptest.htm",
		cache: false,
		success: ajaxSuccess
	});
	
}
function ajaxSuccess(data){
	$('#divresult').html(data);
}