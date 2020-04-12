update bwgui_processor.style set body='
<style>
	#splitter 
	{
		nmargin-top: 5px;
		margin-bottom: 5px;
	}
	#splitter .pane 
	{
		width: 20%;
		theight: 100%;
		float: left;
	}
	#splitter .mid_pane 
	{
		width: 60%;
		theight: 100%;
		float: left;
	}
	#splitter h2 
	{
		margin-bottom: 0;
		padding-bottom: 0;
	}
	.pane
	{
		overflow: hidden;
		background: #d6dde5 url(./js/images/ui-bg_diagonals-small_50_262626_40x40.png) no-repeat right center;
	}
	#tocPane .inner 
	{
		width: 300px;
	}
	#contentPane 
	{
		overflow: auto;
	}
	#contentPane  .inner 
	{
		padding: 0 5px;
	}
	textarea
	{
		height: 70vh;
	}
</style>
' where style=1001;
