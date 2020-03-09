update bwgui_processor.objects_events set query ='
select json_build_object(
''objId_parent'',''contentView'',
''objId'',''accord'',
''view'', (select to_json(body) from bwgui_processor.html h where h.html = 1004),
''data'', (select json_agg(json_object(''{txt, привет}'')))

)
' where object=1004 and event=1 and App=0;
