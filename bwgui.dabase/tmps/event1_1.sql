update  bwgui_processor.objects_events set query='
select json_build_object(
''objId_parent'',''appbody'',
''objId'',''splitter'',
''view'', (select to_json(body) from bwgui_processor.html h where h.html = 1001),
''css'', (select to_json(body) from bwgui_processor.style s where s.style = 1001)
)
' where app=0 and event =1 and object =1;
