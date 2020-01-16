update bwgui_processor.objects_events set query ='
select json_build_object(
''objId_parent'',''view'',
''objId'',''dst'',
''view'', (select to_json(body) from bwgui_processor.html h where h.html = 1005),
''data'', (select json_agg(json_object(''{txt, привет}'')))

)
' where object=1004 and event=2 and App=0;
