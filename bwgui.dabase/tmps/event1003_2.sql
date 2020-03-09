update bwgui_processor.objects_events set query ='
select json_build_object(
''clear'',1,
''objId_parent'',''contentView'',
''objId'',''accord'',
''view'', (select to_json(body) from bwgui_processor.html h where h.html = 1004),
''data'', (select json_agg(json_build_object(''txt'', row_to_json(h.*)->((($1)::json)#>>''{"param"}''))) from bwgui_processor.html h where html::text=((($1)::json)#>>''{"obj"}''))
)'
where object=1003 and event=2
;
